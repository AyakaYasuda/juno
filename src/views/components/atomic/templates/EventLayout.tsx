import React, { ChangeEvent } from 'react';
import Button from '../atoms/Button';
import Navbar from '../molecules/Navbar';
import Card from '../atoms/Card';
import { useNavigate } from 'react-router';
import axios from 'axios';

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
  setFormState: any;
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
  setFormState,
  ctaTxt,
}) => {
  const navigate = useNavigate();

  const submitHandler = async (e: any) => {
    e.preventDefault();

    await axios.post(
      'https://z8feue8naf.execute-api.us-east-1.amazonaws.com/prod/user/login',
      JSON.stringify({
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
      })
    );

    navigate(`/admin/event`);
  };

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
                  onChange={(e) => {
                    setFormState(e.target.value);
                  }}
                  type="text"
                  value={bride}
                  className="InputDark"
                />
                <label>Groom name</label>
                <input
                  onChange={(e) => {
                    setFormState(e.target.value);
                  }}
                  type="text"
                  value={groom}
                  className="InputDark"
                />
                <label>Date and Time of Wedding Ceremony</label>
                <input
                  onChange={(e) => {
                    setFormState(e.target.value);
                  }}
                  type="text"
                  value={dateWedding}
                  className="InputDark"
                />
                <input
                  onChange={(e) => {
                    setFormState(e.target.value);
                  }}
                  type="text"
                  value={startingTimeWedding}
                  className="InputDark"
                />
                <input
                  onChange={(e) => {
                    setFormState(e.target.value);
                  }}
                  type="text"
                  value={endingTimeWedding}
                  className="InputDark"
                />
                <label>Date and Time of Wedding Reception</label>
                <input
                  onChange={(e) => {
                    setFormState(e.target.value);
                  }}
                  type="text"
                  value={dateWeddingReception}
                  className="InputDark"
                />
                <input
                  onChange={(e) => {
                    setFormState(e.target.value);
                  }}
                  type="text"
                  value={startingTimeReception}
                  className="InputDark"
                />
                <input
                  onChange={(e) => {
                    setFormState(e.target.value);
                  }}
                  type="text"
                  value={endingTimeReception}
                  className="InputDark"
                />
              </div>
              <div className="md:basis-1/2 flex flex-col">
                <label className="mb-1">Address</label>
                <input
                  onChange={(e) => {
                    setFormState(e.target.value);
                  }}
                  type="address"
                  value={address}
                  className="InputDark"
                />
                <label>Message</label>
                <input
                  onChange={(e) => {
                    setFormState(e.target.value);
                  }}
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
