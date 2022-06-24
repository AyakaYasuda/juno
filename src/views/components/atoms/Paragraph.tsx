import { FC } from 'react';

type Props = {
  text: string;
  customClassName?: string;
};

const Paragraph: FC<Props> = (props) => {
  const { text, customClassName } = props;

  // FIXME: create base-style for Paragraph
  return <p className={`${customClassName}`}>{text}</p>;
};

export default Paragraph;
