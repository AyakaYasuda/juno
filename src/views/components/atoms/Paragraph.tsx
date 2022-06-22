import { FC } from 'react';

type Props = {
  text: string;
  customClassName?: string;
};

const Paragraph: FC<Props> = (props) => {
  const { text, customClassName } = props;
  console.log('customClassName', customClassName);

  // FIXME: create base-style for Paragraph
  return <p className={`${customClassName}`}>{text}</p>;
};

export default Paragraph;
