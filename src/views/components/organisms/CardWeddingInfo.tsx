import { useEffect, useCallback, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { getEvent } from 'redux/eventSlice';

import SectionDivider from './SectionDivider';

const CardWeddingInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { event } = useAppSelector((state) => state.event);
  const { SK: userId } = useAppSelector((state) => state.user.user);

  const [weddingSchedule, setWeddingSchedule] = useState<string>();
  const [receptionSchedule, setReceptionSchedule] = useState<string>();

  useEffect(() => {
    if (userId) {
      dispatch(getEvent(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (
      event.dateWedding &&
      event.startingTimeWedding &&
      event.endingTimeWedding
    ) {
      const weddingDateAndTime = createDateAndTime(
        event.dateWedding,
        event.startingTimeWedding,
        event.endingTimeWedding
      );

      setWeddingSchedule(weddingDateAndTime);
    }
  }, [event]);

  useEffect(() => {
    if (
      event.dateWeddingReception &&
      event.startingTimeReception &&
      event.endingTimeReception
    ) {
      const receptionDateAndTime = createDateAndTime(
        event.dateWeddingReception,
        event.startingTimeReception,
        event.endingTimeReception
      );

      setReceptionSchedule(receptionDateAndTime);
    }
  });

  const createDateAndTime = useCallback(
    (d: string, st: string, et: string): string => {
      const year = new Date(d).getFullYear();
      const monthOrder = new Date(d).getMonth();
      const date = new Date(d).getDate();
      const dayOrder = new Date(d).getDate();

      const MonthOptions: Intl.DateTimeFormatOptions = { month: 'long' };
      const month = new Intl.DateTimeFormat('en-US', MonthOptions)
        .format(monthOrder)
        .toUpperCase();

      const DayOptions: Intl.DateTimeFormatOptions = { weekday: 'long' };
      const day = new Intl.DateTimeFormat('en-US', DayOptions)
        .format(dayOrder)
        .toUpperCase();

      const dateAndTime = `${day} ${month} ${date}, ${year}  at ${st}`;

      return dateAndTime;
    },
    [event]
  );

  return (
    <div className="flex flex-col bg-white text-center rounded-2xl px-5 md:px-10 py-10">
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
      <section className="FlexCenter flex-col gap-4 px-10">
        <h5 className="text-Green-dark">{weddingSchedule}</h5>
        <h5 className="text-center text-Green-dark">{event.address}</h5>
        {event.dateWeddingReception !== event.dateWedding ? (
          <>
            <p className="text-Green-dark font-allura text-xl">
              We will be having the reception on the following date  
            </p>
            <h5 className="text-Green-dark">{receptionSchedule}</h5>
          </>
        ) : (
          <p className="text-Green-dark font-allura text-2xl">
            Reception to follow
          </p>
        )}
      </section>
      <SectionDivider />
      <section>
        <p className="text-Green-dark">{event.message}</p>
      </section>
    </div>
  );
};

export default CardWeddingInfo;
