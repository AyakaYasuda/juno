import InfoHeader from 'views/components/organisms/CardWeddingInfo/InfoHeader';
import InfoBasic from 'views/components/organisms/CardWeddingInfo/InfoBasic';
import InfoDetail from 'views/components/organisms/CardWeddingInfo/InfoDetail';
import SectionDivider from '../SectionDivider';

const CardWeddingInfo: React.FC = () => {
  return (
    <div className="flex flex-col bg-white rounded-2xl px-5 md:px-10 py-10">
      <InfoHeader />
      <SectionDivider />
      <InfoBasic />
      <SectionDivider />
      <InfoDetail />
    </div>
  );
};

export default CardWeddingInfo;
