import Title from 'views/components/atoms/Title';
import GuestPageLayout from 'views/components/molecules/Layout/GuestPageLayout';
import CardWeddingInfo from 'views/components/organisms/CardWeddingInfo';

const GuestMyPage = () => {
  return (
    <div>
      <GuestPageLayout>
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center py-10 px-20">
          <div className="flex flex-col items-center">
            <Title classTitle="" textColor="text-white">
              Event Info
            </Title>

            <CardWeddingInfo padding="p-20" />
          </div>
        </div>
      </GuestPageLayout>
    </div>
  );
};

export default GuestMyPage;
