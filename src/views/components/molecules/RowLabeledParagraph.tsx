import FlexRowBox from '../atoms/FlexRowBox';
import Paragraph from '../atoms/Paragraph';

type Props = {
  label: string;
  text: string;
  className?: string;
  textStyle?: string;
  labelStyle?: string;
};

const RowLabeledParagraph = (props: Props) => {
  const { label, text, className, textStyle, labelStyle } = props;

  return (
    <FlexRowBox className={className ? className : ''}>
      <label className={`basis-1/4 ${labelStyle}`}>{label}</label>
      {/* FIXME: create base-style for Paragraph */}
      <Paragraph text={text} customClassName={`basis-3/4 px-2 ${textStyle}`} />
    </FlexRowBox>
  );
};

export default RowLabeledParagraph;
