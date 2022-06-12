import InfoHeader from 'views/components/Guest/CardWeddingInfo/InfoHeader';
import InfoBasic from 'views/components/Guest/CardWeddingInfo/InfoBasic';
import InfoDetail from 'views/components/Guest/CardWeddingInfo/InfoDetail';
import DividerSection from 'views/components/Guest/DividerSection';

const CardWeddingInfo = () => {
  return (
    <div className="flex flex-col">
      <InfoHeader />
      <DividerSection />
      <InfoBasic />
      <DividerSection />
      <InfoDetail />
    </div>
  );
};

export default CardWeddingInfo;
