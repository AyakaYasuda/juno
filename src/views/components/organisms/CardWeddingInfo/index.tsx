import InfoHeader from 'views/components/organisms/CardWeddingInfo/InfoHeader';
import InfoBasic from 'views/components/organisms/CardWeddingInfo/InfoBasic';
import InfoDetail from 'views/components/organisms/CardWeddingInfo/InfoDetail';
import SectionDivider from '../SectionDivider';

type Props = {
  padding?: string;
};

const CardWeddingInfo: React.FC<Props> = ({ padding }) => {
  return (
    <div className={`flex flex-col bg-white rounded-2xl ${padding}`}>
      <InfoHeader />
      <SectionDivider />
      <InfoBasic />
      <SectionDivider />
      <InfoDetail />
    </div>
  );
};

export default CardWeddingInfo;
