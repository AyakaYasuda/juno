import React from 'react';
import Button from '../../components/atomic/atoms/Button';
import Navbar from '../../components/atomic/molecules/Navbar';

const AdminEventManage = () => {
  return (
    <>
      <Navbar />
      <section className="w-full h-screen FlexCenter flex-col bg-gradient-to-b from-Pink-lighter to-Pink-default relative">
        <div className="w-4/5 flex flex-row gap-14 text-white">
          <div className="basis-1/2">
            <h2 className="mb-2">Event info</h2>
            <form>
              <div className="flex flex-col mb-4">
                <label className="flex flex-row justify-between items-center mb-3">
                  <span className="basis-1/4">Event URL</span>
                  <input className="InputLighter basis-3/4" />
                </label>
                <label className="flex flex-row justify-between items-center mb-3">
                  <span className="basis-1/4">Event URL</span>
                  <input className="InputLighter basis-3/4" />
                </label>
                <label className="flex flex-row justify-between items-center">
                  <span className="basis-1/4">Event URL</span>
                  <input className="InputLighter basis-3/4" />
                </label>
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-1">
                  Date and Time of Wedding Ceremony
                </label>
                <input className="InputLighter mb-2" />
                <label className="mb-1">
                  Date and Time of Wedding Reception
                </label>
                <input className="InputLighter mb-2" />
                <label className="mb-1">Message</label>
                <input className="InputLighter mb-2 h-28" />
              </div>
              <ul className="w-4/5 mx-auto flex gap-4">
                <li className="basis-1/2">
                  <Button styleButton="border-2 border-White-default">
                    Set uneditable
                  </Button>
                </li>
                <li className="basis-1/2">
                  <Button styleButton="border-2 border-White-default">
                    Edit event info
                  </Button>
                </li>
              </ul>
            </form>
          </div>
          <div className="hidden md:block md:basis-1/2">
            <h2 className="mb-2">Guests list</h2>
            <ul>
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
