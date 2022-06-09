import React from 'react';
import Card from 'views/components/atomic/atoms/Card';
import Button from 'views/components/atomic/atoms/Button';
import Navbar from 'views/components/atomic/molecules/Navbar';

function AdminEventCreate() {
  return (
    <>
      <Navbar />
      <section className="w-full h-screen FlexCenter flex-col bg-gradient-to-b from-Pink-lighter to-Pink-default">
        <h2 className="mb-4">Create invitations</h2>
        <Card>
          <form className="flex">
            <div className="flex flex-col">
              <label className="mb-1">Bride name</label>
              <input className="bg-Pink-lighter bg-opacity-50 p-2 border-none rounded-md" />
              <label>Groom name</label>
              <input className="bg-Pink-lighter bg-opacity-50 p-2 border-none rounded-md" />
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Address</label>
              <input
                type="address"
                className="bg-Pink-lighter bg-opacity-50 p-2 border-none rounded-md"
              />
              <label>Message</label>
              <input
                type="textarea"
                className="bg-Pink-lighter bg-opacity-50 p-2 border-none rounded-md"
              />
              <ul>
                <li>
                  <Button styleButton="bg-Pink-default text-White-default">
                    Create invitations
                  </Button>
                </li>
                <li>
                  <Button styleButton="text-White-default border-b-2 border-Pink-default">
                    Cancel
                  </Button>
                </li>
              </ul>
            </div>
          </form>
        </Card>
      </section>
    </>
  );
}

export default AdminEventCreate;
