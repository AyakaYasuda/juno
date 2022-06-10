import React, { useState } from 'react';
import Button from '../../components/atomic/atoms/Button';
import Navbar from '../../components/atomic/molecules/Navbar';

const AdminEventManage = () => {
  const [showInfoStyle, setShowInfoStyle] = useState('w-full');
  const [showGuestsStyle, setShowGuestsStyle] = useState('hidden');

  const showInfoHandler = () => {
    setShowInfoStyle('block w-full');
    setShowGuestsStyle('hidden');
  };

  const showGuestsHandler = () => {
    setShowGuestsStyle('block w-full');
    setShowInfoStyle('hidden');
  };

  return (
    <>
      <Navbar />
      <section className="w-full h-screen FlexCenter flex-col bg-gradient-to-b from-Pink-lighter to-Pink-default relative">
        <ul className="pt-16 flex flex-row justify-center gap-14 mb-6 md:hidden">
          <li onClick={showInfoHandler} className="HoverUnderLine">
            <h2 className="basis-1/2 text-4xl">Event info</h2>
          </li>
          <li onClick={showGuestsHandler} className="HoverUnderLine">
            <h2 className="basis-1/2 text-4xl">Guests list</h2>
          </li>
        </ul>
        <div className="w-4/5 h-3/4 flex flex-row gap-14 text-white">
          <div className={`${showInfoStyle} md:block md:basis-1/2`}>
            <h2 className="hidden md:block mb-2">Event info</h2>
            <form>
              <div className="flex flex-col  mb-8 md:mb-4">
                <label className="flex flex-row justify-between items-center mb-3">
                  <span className="basis-1/4">Event URL</span>
                  <input type="url" className="InputLighter basis-3/4" />
                </label>
                <label className="flex flex-row justify-between items-center mb-3">
                  <span className="basis-1/4">Bright</span>
                  <input type="text" className="InputLighter basis-3/4" />
                </label>
                <label className="flex flex-row justify-between items-center">
                  <span className="basis-1/4">Groom</span>
                  <input type="text" className="InputLighter basis-3/4" />
                </label>
              </div>
              <div className="flex flex-col mb-8 md:mb-4">
                <label className="mb-1">
                  Date and Time of Wedding Ceremony
                </label>
                <input type="text" className="InputLighter mb-2" />
                <label className="mb-1">
                  Date and Time of Wedding Reception
                </label>
                <input type="text" className="InputLighter mb-2" />
                <label className="mb-1">Message</label>
                <input type="textarea" className="InputLighter mb-2 h-28" />
              </div>
              <ul className="w-4/5 mx-auto md:flex md:gap-4">
                <li className="hidden md:block md:basis-1/2">
                  <Button styleButton="border-2 border-White-default">
                    Set uneditable
                  </Button>
                </li>
                <li className="md:basis-1/2">
                  <Button styleButton="border-2 border-White-default">
                    Edit event info
                  </Button>
                </li>
              </ul>
            </form>
          </div>
          <div className={`${showGuestsStyle} md:block md:basis-1/2`}>
            <h2 className="hidden md:block mb-2">Guests list</h2>
            <ul className="overflow-y-scroll h-4/5">
              <li className="InputLighter FlexCenter mb-2 rounded-2xl px-4">
                <span className="basis-3/5">Monica Geller</span>
                <Button styleButton="basis-1/5 bg-Green-default text-white drop-shadow-md mr-2">
                  PRESENT
                </Button>
                <button className="text-Pink-dark basis-1/5">
                  Show Detail
                </button>
              </li>
              <li className="InputLighter FlexCenter mb-2 rounded-2xl px-4">
                <span className="basis-3/5">Monica Geller</span>
                <Button styleButton="basis-1/5 bg-Green-default text-white drop-shadow-md mr-2">
                  PRESENT
                </Button>
                <button className="text-Pink-dark basis-1/5">
                  Show Detail
                </button>
              </li>
              <li className="InputLighter FlexCenter mb-2 rounded-2xl px-4">
                <span className="basis-3/5">Monica Geller</span>
                <Button styleButton="basis-1/5 bg-Green-default text-white drop-shadow-md mr-2">
                  PRESENT
                </Button>
                <button className="text-Pink-dark basis-1/5">
                  Show Detail
                </button>
              </li>
              <li className="InputLighter FlexCenter mb-2 rounded-2xl px-4">
                <span className="basis-3/5">Monica Geller</span>
                <Button styleButton="basis-1/5 bg-Green-default text-white drop-shadow-md mr-2">
                  PRESENT
                </Button>
                <button className="text-Pink-dark basis-1/5">
                  Show Detail
                </button>
              </li>
              <li className="InputLighter FlexCenter mb-2 rounded-2xl px-4">
                <span className="basis-3/5">Monica Geller</span>
                <Button styleButton="basis-1/5 bg-Green-default text-white drop-shadow-md mr-2">
                  PRESENT
                </Button>
                <button className="text-Pink-dark basis-1/5">
                  Show Detail
                </button>
              </li>
              <li className="InputLighter FlexCenter mb-2 rounded-2xl px-4">
                <span className="basis-3/5">Monica Geller</span>
                <Button styleButton="basis-1/5 bg-Green-default text-white drop-shadow-md mr-2">
                  PRESENT
                </Button>
                <button className="text-Pink-dark basis-1/5">
                  Show Detail
                </button>
              </li>
              <li className="InputLighter FlexCenter mb-2 rounded-2xl px-4">
                <span className="basis-3/5">Monica Geller</span>
                <Button styleButton="basis-1/5 border-2 border-Green-default text-Green-default drop-shadow-md mr-2">
                  ABSENT
                </Button>
                <button className="text-Pink-dark basis-1/5">
                  Show Detail
                </button>
              </li>
              <li className="InputLighter FlexCenter mb-2 rounded-2xl px-4">
                <span className="basis-3/5">Monica Geller</span>
                <Button styleButton="basis-1/5 border-2 border-Green-default text-Green-default drop-shadow-md mr-2">
                  ABSENT
                </Button>
                <button className="text-Pink-dark basis-1/5">
                  Show Detail
                </button>
              </li>
              <li className="InputLighter FlexCenter mb-2 rounded-2xl px-4">
                <span className="basis-3/5">Monica Geller</span>
                <Button styleButton="basis-1/5 border-2 border-Green-default text-Green-default drop-shadow-md mr-2">
                  ABSENT
                </Button>
                <button className="text-Pink-dark basis-1/5">
                  Show Detail
                </button>
              </li>
            </ul>
          </div>
        </div>
        <small className="absolute bottom-5 text-center">
          &copy; Sho, Kyosuke, Fumina, Ayaka 2022 / All Rights Reserved
        </small>
      </section>
    </>
  );
};

export default AdminEventManage;
