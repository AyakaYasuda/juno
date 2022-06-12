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
AWS.config.update({
    region: 'us-east-1',
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userEventTable = 'user-event';
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
export const getUserById = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = event.pathParameters.userId;
        console.log(id);
        const params = {
            TableName: userEventTable,
            Key: {
                SK: id,
            },
        };
        const userResponseData = yield dynamodb.get(params).promise();
        response = buildResponse(200, userResponseData.Item);
        return response;
    }
    catch (err) {
        handleError(err);
    }
});
