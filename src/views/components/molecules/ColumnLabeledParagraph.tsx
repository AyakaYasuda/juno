import FlexColumnBox from '../atoms/FlexColumnBox';
import Paragraph from '../atoms/Paragraph';

type Props = {
  label: string;
  text: string;
  className?: string;
  textStyle?: string;
};

const ColumnLabeledParagraph = (props: Props) => {
  const { label, text, className, textStyle } = props;

  return (
    <FlexColumnBox className={className ? className : ''}>
      <h4 className="mb-2">{label}</h4>
      <Paragraph text={text} customClassName={`mb-2 px-2 ${textStyle}`} />
    </FlexColumnBox>
  );
};

export default ColumnLabeledParagraph;
