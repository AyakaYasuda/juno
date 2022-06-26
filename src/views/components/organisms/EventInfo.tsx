import { Link } from 'react-router-dom';
import { IEvent } from 'types/EventData.type';
import Button from '../atoms/Button';
import ColumnLabeledParagraph from '../molecules/ColumnLabeledParagraph';
import RowLabeledParagraph from '../molecules/RowLabeledParagraph';

type Props = {
  event: IEvent;
  showInfoStyle: string;
};

const GUEST_PAGE_ROOT_URL = process.env.REACT_APP_GUEST_PAGE_ROOT_URL;

const EventInfo = (props: Props) => {
  const { event, showInfoStyle } = props;

  return (
    <div className={`${showInfoStyle} md:block lg:basis-1/2`}>
      <h2 className="hidden lg:block mb-2">Event info</h2>
      <div className="flex flex-col mb-8 md:mb-4">
        <RowLabeledParagraph
          label="Event URL"
          text={`${GUEST_PAGE_ROOT_URL}/guests/invitation/${event.SK}`}
          className="justify-between items-center mb-3"
        />
        <RowLabeledParagraph
          label="Bride"
          text={event.bride}
          className="justify-between items-center mb-3"
        />
        <RowLabeledParagraph
          label="Groom"
          text={event.groom}
          className="justify-between items-center mb-3"
        />
      </div>
      <div className="flex flex-col mb-8 md:mb-4">
        <ColumnLabeledParagraph
          label="Date and Time of Wedding Ceremony"
          text={event.dateWedding}
        />
        <ColumnLabeledParagraph
          label="Date and Time of Wedding Reception"
          text={event.dateWeddingReception}
        />
        <ColumnLabeledParagraph
          label="Message"
          text={event.message}
          paragraphStyle="h-28"
        />
      </div>
      <div className="w-4/5 mx-auto md:flex md:gap-4">
        <div className="hidden md:block md:basis-1/2">
          <Button customStyle="border-2 border-White-default">
            Set uneditable
          </Button>
        </div>
        <div className="md:basis-1/2">
          <Button customStyle="border-2 border-White-default">
            <Link to="/admin/edit">Edit event info</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
