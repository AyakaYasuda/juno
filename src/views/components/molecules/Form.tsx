// FIXME: delete me

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button';
import Card from '../atoms/Card';

type Props = {
  ctaText: string;
  linkText: string;
  params: string;
  children?: React.ReactNode;
  submitHandler: (params: any) => any;
};

const Form: React.FC<Props> = ({
  children,
  ctaText,
  linkText,
  params,
  submitHandler,
}) => {
  return (
    <Card>
      <div className="w-full md:w-4/5 mx-auto pt-4">
        <form
          action="/admin"
          method="post"
          onSubmit={submitHandler}
          className="flex flex-col text-left mb-8"
        >
          {children}
          <ul className="w-3/4 mx-auto pt-4">
            <li className="mb-4">
              <Button styleButton="bg-Pink-default text-White-default">
                {ctaText}
              </Button>
            </li>
            <li className="text-Pink-default text-center">
              <Link to={params}>{linkText}</Link>
            </li>
          </ul>
        </form>
      </div>
    </Card>
  );
};

export default Form;
