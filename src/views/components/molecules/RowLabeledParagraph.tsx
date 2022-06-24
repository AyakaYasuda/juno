import FlexRowBox from '../atoms/FlexRowBox';
import Paragraph from '../atoms/Paragraph';

type Props = {
  label: string;
  text: string;
  className?: string;
};

const RowLabeledParagraph = (props: Props) => {
  const { label, text, className } = props;

  return (
    <FlexRowBox className={className ? className : ''}>
      <span className="basis-1/4">{label}</span>
      {/* FIXME: create base-style for Paragraph */}
      <Paragraph text={text} customClassName="InputLighter basis-3/4 px-2" />
    </FlexRowBox>
  );
};

export default RowLabeledParagraph;
