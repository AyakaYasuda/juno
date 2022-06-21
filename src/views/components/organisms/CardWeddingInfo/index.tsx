import InfoHeader from 'views/components/organisms/CardWeddingInfo/InfoHeader';
import InfoBasic from 'views/components/organisms/CardWeddingInfo/InfoBasic';
import InfoDetail from 'views/components/organisms/CardWeddingInfo/InfoDetail';
import DividerSection from '../DividerSection';

type CardWeddingProps = {
  spacing: string;
};

const CardWeddingInfo: React.FC<CardWeddingProps> = ({ spacing }) => {
  return (
    <div className={`"flex flex-col bg-white rounded-2xl ${spacing}`}>
      <InfoHeader />
      <DividerSection />
      <InfoBasic />
      <DividerSection />
      <InfoDetail />
    </div>
  );
};

export default CardWeddingInfo;
