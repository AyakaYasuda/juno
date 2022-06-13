var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import * as yup from 'yup';
import bcrypt from 'bcrypt';
AWS.config.update({
    region: 'us-east-1',
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userEventTable = 'user-event';
const userSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    isAdmin: yup.boolean().required(),
});
let response;
export const buildResponse = (statusCode, body) => {
    return {
        statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
};
// error handling
class HttpError extends Error {
    constructor(statusCode, body = {}) {
        super(JSON.stringify(body));
        this.statusCode = statusCode;
    }
}
const handleError = (e) => {
    if (e instanceof yup.ValidationError) {
        response = buildResponse(400, JSON.stringify({
            errors: e.errors,
        }));
        return response;
    }
    if (e instanceof SyntaxError) {
        response = buildResponse(400, JSON.stringify({
            errors: `invalid request body format : "${e.message}"`,
        }));
        return response;
    }
    if (e instanceof HttpError) {
        response = buildResponse(e.statusCode, JSON.stringify({
            errors: e.message,
        }));
        return response;
    }
    throw e;
};
/*
============================================
*/
export const createUser = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqBody = JSON.parse(event.body);
        console.log(reqBody);
        // FIXME : the reference sample was false
        yield userSchema.validate(reqBody, { abortEarly: true });
        const firstName = reqBody.firstName;
        const lastName = reqBody.lastName;
        const email = reqBody.email;
        const password = reqBody.password;
        const isAdmin = reqBody.isAdmin;
        const encryptedPW = bcrypt.hashSync(password.trim(), 10);
        const user = {
            PK: 'user',
            SK: v4(),
            firstName,
            lastName,
            email,
            password: encryptedPW,
            isAdmin,
        };
        const params = {
            TableName: userEventTable,
            Item: user,
            Expected: {
                hash: {
                    Value: 'email',
                    Exists: false,
                },
            },
        };
        yield dynamodb.put(params).promise();
        response = buildResponse(200, JSON.stringify(user.password));
        return response;
    }
    catch (err) {
        handleError(err);
    }
});
