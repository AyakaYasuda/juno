import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { getEvent } from 'redux/eventThunkSlice';

import SectionDivider from './SectionDivider';

const CardWeddingInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { event } = useAppSelector((state) => state.event);
  const { SK: userId } = useAppSelector((state) => state.user.user);

  useEffect(() => {
    console.log(userId);
    if (userId) {
      dispatch(getEvent(userId));
    }
  }, [userId, dispatch]);

  console.log('event', event);

  return (
    <div className="flex flex-col bg-white rounded-2xl px-5 md:px-10 py-10">
      <section className="flex flex-col justify-center gap-6">
        <p className="text-Green-dark FlexJustifyCenter">
          You are cordially invited to celebrate the marriage of
        </p>
        <div className="FlexCenter gap-4">
          <p className="text-Yellow-dark font-allura text-4xl font-normal text-center">
            {event.groom}
          </p>
          <p className="text-Green-dark">AND</p>
          <p className="text-Yellow-dark font-allura text-4xl font-normal text-center">
          {event.bride}
          </p>
        </div>
      </section>
      <SectionDivider />
      <section className="FlexCenter flex-col gap-4">
        <h5 className="text-Green-dark">
          
        </h5>
        <h5 className="text-center text-Green-dark">
          WOODLAND FOREST INN
          <br />
          12458 redwood drive anywhere city, CA
        </h5>
        <p className="text-Green-dark">reception to follow</p>
      </section>
      <SectionDivider />
      <section className=" flex justify-center">
        <p className="w-4/5 flex text-Green-dark leading-5">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione,
          deleniti dignissimos! Laudantium ex officiis voluptate dolor, atque
          debitis fugiat dignissimos nesciunt dicta nostrum ab ut aliquid error
          amet laboriosam iste!
        </p>
      </section>
    </div>
  );
};

export default CardWeddingInfo;
