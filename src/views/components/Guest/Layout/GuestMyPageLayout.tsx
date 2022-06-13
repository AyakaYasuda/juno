import React from 'react';
import GuestBaseLayout from 'views/components/Guest/Layout/GuestBaseLayout';
import Title from 'views/components/atomic/atoms/Title';
import CardWeddingInfo from 'views/components/Guest/CardWeddingInfo/index';
import FormAttendance from 'views/components/Guest/FormAttendance';

const GuestMyPageLayout = () => {
  return (
    <GuestBaseLayout>
      <div className="flex flex-col w-screen h-full md:h-screen mb-8">
        <div className="flex justify-between">
          <Title classTitle="" textColor="text-Yellow-dark">
            Juno
          </Title>
          <button className="text-Yellow-dark">Logout</button>
        </div>
        <div className="flex flex-col md:flex-row md:justify-center md:items-center md:h-screen">
          <div className="flex flex-col items-center">
            <Title classTitle="" textColor="text-white">
              Event Info
            </Title>
            <CardWeddingInfo spacing="mx-4 p-4 md:w-3/4 md:p-10" />
          </div>

          <div className="w-full ">
            <FormAttendance
              sectionTitleColor="text-white"
              sectionTitle="Your Reply"
              classInput="InputLight"
              textButton="Edit your reply"
              styleButton="buttonWhite"
              spacing="md:w-11/12"
            />
          </div>
        </div>
      </div>
    </GuestBaseLayout>
  );
};

export default GuestMyPageLayout;
