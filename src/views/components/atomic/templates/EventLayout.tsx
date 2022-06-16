import React from 'react';
import Button from '../atoms/Button';
import Navbar from '../molecules/Navbar';
import Card from '../atoms/Card';

type Props = {
  title: string;
  bride: string;
  groom: string;
  dateWedding: string;
  startingTimeWedding: string;
  endingTimeWedding: string;
  dateWeddingReception: string;
  startingTimeReception: string;
  endingTimeReception: string;
  address: string;
  message: string;
  handleChange: any;
  submitHandler: any;
  ctaTxt: string;
};

const EventLayout: React.FC<Props> = ({
  title,
  bride,
  groom,
  dateWedding,
  startingTimeWedding,
  endingTimeWedding,
  dateWeddingReception,
  startingTimeReception,
  endingTimeReception,
  address,
  message,
  handleChange,
  submitHandler,
  ctaTxt,
}) => {
  return (
    <>
      <Navbar />
      <section className="w-full py-28 md:py-0 FlexCenter flex-col bg-gradient-to-b from-Pink-lighter to-Pink-default md:h-screen relative text-Pink-default">
        <h2 className="mb-2">{title}</h2>
        <div className="w-4/5">
          <Card>
            <form
              onSubmit={submitHandler}
              className="flex flex-col md:flex-row p-4 md:gap-6"
            >
              <div className="md:basis-1/2 flex flex-col">
                <label className="mb-1">Bride name</label>
                <input
                  type="text"
                  name="bride"
                  value={bride}
                  onChange={handleChange}
                  className="InputDark"
                />
                <label>Groom name</label>
                <input
                  type="text"
                  name="groom"
                  value={groom}
                  onChange={handleChange}
                  className="InputDark"
                />
                <label>Date and Time of Wedding Ceremony</label>
                <input
                  type="date"
                  name="dateWedding"
                  value={dateWedding}
                  onChange={handleChange}
                  className="InputDark"
                />
                <ul className="flex flex-row gap-6">
                  <li className="basis-1/2">
                    <span>Start</span>
                    <input
                      type="time"
                      name="startingTimeWedding"
                      value={startingTimeWedding}
                      onChange={handleChange}
                      className="InputDark w-full"
                    />
                  </li>
                  <li className="basis-1/2">
                    <span>End</span>
                    <input
                      type="time"
                      name="endingTimeWedding"
                      value={endingTimeWedding}
                      onChange={handleChange}
                      className="InputDark w-full"
                    />
                  </li>
                </ul>
                <label>Date and Time of Wedding Reception</label>
                <input
                  type="date"
                  name="dateWeddingReception"
                  value={dateWeddingReception}
                  onChange={handleChange}
                  className="InputDark"
                />
                <ul className="flex flex-row gap-6">
                  <li className="basis-1/2">
                    <span>Start</span>
                    <input
                      type="time"
                      name="startingTimeReception"
                      value={startingTimeReception}
                      onChange={handleChange}
                      className="InputDark w-full"
                    />
                  </li>
                  <li className="basis-1/2">
                    <span>End</span>
                    <input
                      type="time"
                      name="endingTimeReception"
                      value={endingTimeReception}
                      onChange={handleChange}
                      className="InputDark w-full"
                    />
                  </li>
                </ul>
              </div>
              <div className="md:basis-1/2 flex flex-col">
                <label className="mb-1">Address</label>
                <input
                  type="address"
                  name="address"
                  value={address}
                  onChange={handleChange}
                  className="InputDark"
                />
                <label>Message</label>
                <input
                  type="textarea"
                  name="message"
                  value={message}
                  onChange={handleChange}
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
