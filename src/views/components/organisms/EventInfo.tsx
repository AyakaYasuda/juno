import React from 'react';
import { Link } from 'react-router-dom';
import { IEvent } from 'types/EventData.type';
import Button from '../atoms/Button';
import Paragraph from '../atoms/Paragraph';

type Props = {
  event: IEvent;
  showInfoStyle: string;
};

const GUEST_PAGE_ROOT_URL = process.env.REACT_APP_GUEST_PAGE_ROOT_URL;

const EventInfo = (props: Props) => {
  const { event, showInfoStyle } = props;

  return (
    <div className={`${showInfoStyle} md:block md:basis-1/2`}>
      <h2 className="hidden md:block mb-2">Event info</h2>
      <div className="flex flex-col mb-8 md:mb-4">
        <div className="flex flex-row justify-between items-center mb-3">
          <span className="basis-1/4">Event URL</span>
          {/* FIXME: create base-style for Paragraph */}
          <Paragraph
            text={`${GUEST_PAGE_ROOT_URL}/guests/invitation/${event.SK}`}
            customClassName="InputLighter basis-3/4 px-2"
          />
        </div>
        <div className="flex flex-row justify-between items-center mb-3">
          <span className="basis-1/4">Bride</span>
          <Paragraph
            text={event.bride}
            customClassName="InputLighter basis-3/4 px-2"
          />
        </div>
        <div className="flex flex-row justify-between items-center mb-3">
          <span className="basis-1/4">Groom</span>
          <Paragraph
            text={event.groom}
            customClassName="InputLighter basis-3/4 px-2"
          />
        </div>
      </div>
      <div className="flex flex-col mb-8 md:mb-4">
        <h4 className="mb-1">Date and Time of Wedding Ceremony</h4>
        <Paragraph
          text={event.dateWedding}
          customClassName={'InputLighter mb-2 px-2'}
        />
        <h4 className="mb-1">Date and Time of Wedding Reception</h4>
        <Paragraph
          text={event.dateWeddingReception}
          customClassName={'InputLighter mb-2 px-2'}
        />
        <h4 className="mb-1">Message</h4>
        <Paragraph
          text={event.message}
          customClassName={'InputLighter mb-2 px-2 h-28'}
        />
      </div>
      <ul className="w-4/5 mx-auto md:flex md:gap-4">
        <li className="hidden md:block md:basis-1/2">
          <Button customStyle="border-2 border-White-default">
            Set uneditable
          </Button>
        </li>
        <li className="md:basis-1/2">
          <Button customStyle="border-2 border-White-default">
            <Link to="/admin/edit">Edit event info</Link>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default EventInfo;
