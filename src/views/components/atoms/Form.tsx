type FormProps = {
  children: React.ReactNode;
  [key: string]: any;
};

export const Form = (props: FormProps) => {
  const { children, ...others } = props;

  return <form {...others}>{children}</form>;
};
