import React from 'react';
import Card from 'views/components/atomic/atoms/Card';
import Button from 'views/components/atomic/atoms/Button';
import Navbar from 'views/components/atomic/molecules/Navbar';

function AdminEventCreate() {
  return (
    <>
      <Navbar />
      <section className="w-full py-28 md:py-0 FlexCenter flex-col bg-gradient-to-b from-Pink-lighter to-Pink-default md:h-screen relative">
        <h2 className="mb-2">Create invitations</h2>
        <div className="w-4/5">
          <Card>
            <form className="flex flex-col md:flex-row p-4 md:gap-6">
              <div className="md:basis-1/2 flex flex-col">
                <label className="mb-1">Bride name</label>
                <input type="text" className="InputDark" />
                <label>Groom name</label>
                <input type="text" className="InputDark" />
                <label>Date and Time of Wedding Ceremony</label>
                <input type="date" className="InputDark" />
                <input type="time" className="InputDark" />
                <label>Date and Time of Wedding Reception</label>
                <input type="date" className="InputDark" />
                <input type="time" className="InputDark" />
              </div>
              <div className="md:basis-1/2 flex flex-col">
                <label className="mb-1">Address</label>
                <input type="address" className="InputDark" />
                <label>Message</label>
                <input type="textarea" className="InputDark h-48 mb-8" />
                <ul className="w-10/12 mx-auto md:flex">
                  <li className="mb-4 md:mb-0 md:mr-4 basis-1/2">
                    <Button styleButton="bg-Pink-default text-White-default">
                      Create invitations
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
}

export default AdminEventCreate;
