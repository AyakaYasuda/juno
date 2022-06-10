import React from 'react';
import Button from '../atoms/Button';
import Navbar from '../molecules/Navbar';
import Card from '../atoms/Card';

type Props = {
  title: string;
  bride_name: string;
  groom_name: string;
  date_ceremony: number | string;
  time_ceremony: number | string;
  date_reception: number | string;
  time_reception: number | string;
  address: string;
  message: string;
  ctaTxt: string;
};

const EventLayout: React.FC<Props> = ({
  title,
  bride_name,
  groom_name,
  date_ceremony,
  time_ceremony,
  date_reception,
  time_reception,
  address,
  message,
  ctaTxt,
}) => {
  return (
    <>
      <Navbar />
      <section className="w-full py-28 md:py-0 FlexCenter flex-col bg-gradient-to-b from-Pink-lighter to-Pink-default md:h-screen relative text-Pink-default">
        <h2 className="mb-2">{title}</h2>
        <div className="w-4/5">
          <Card>
            <form className="flex flex-col md:flex-row p-4 md:gap-6">
              <div className="md:basis-1/2 flex flex-col">
                <label className="mb-1">Bride name</label>
                <input type="text" value={bride_name} className="InputDark" />
                <label>Groom name</label>
                <input type="text" value={groom_name} className="InputDark" />
                <label>Date and Time of Wedding Ceremony</label>
                <input
                  type="date"
                  value={date_ceremony}
                  className="InputDark"
                />
                <input
                  type="time"
                  value={time_ceremony}
                  className="InputDark"
                />
                <label>Date and Time of Wedding Reception</label>
                <input
                  type="date"
                  value={date_reception}
                  className="InputDark"
                />
                <input
                  type="time"
                  value={time_reception}
                  className="InputDark"
                />
              </div>
              <div className="md:basis-1/2 flex flex-col">
                <label className="mb-1">Address</label>
                <input type="address" value={address} className="InputDark" />
                <label>Message</label>
                <input
                  type="textarea"
                  value={message}
                  className="InputDark h-48 mb-8"
                />
                <ul className="w-10/12 mx-auto md:flex">
                  <li className="mb-4 md:mb-0 md:mr-4 basis-1/2">
                    <Button styleButton="bg-Pink-default text-White-default">
                      {ctaTxt}
                    </Button>
                  </li>
                  <li className="basis-1/2">
                    <Button styleButton="text-Pink-default border-2 border-Pink-default">
                      Cancel
                    </Button>
                  </li>
                </ul>
              </div>
            </form>
          </Card>
        </div>
        <small className="absolute bottom-5 text-center">
          &copy; Sho, Kyosuke, Fumina, Ayaka 2022 / All Rights Reserved
        </small>
      </section>
    </>
  );
};

export default EventLayout;
