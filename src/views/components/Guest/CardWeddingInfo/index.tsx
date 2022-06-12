import InfoHeader from 'views/components/Guest/CardWeddingInfo/InfoHeader';
import InfoBasic from 'views/components/Guest/CardWeddingInfo/InfoBasic';
import InfoDetail from 'views/components/Guest/CardWeddingInfo/InfoDetail';
import DividerSection from 'views/components/Guest/DividerSection';

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
