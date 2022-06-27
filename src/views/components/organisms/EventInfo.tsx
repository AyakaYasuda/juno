import { Link } from 'react-router-dom';
import { IEvent } from 'types/EventData.type';
import Button from '../atoms/Button';
import ColumnLabeledParagraph from '../molecules/ColumnLabeledParagraph';
import RowLabeledParagraph from '../molecules/RowLabeledParagraph';

type Props = {
  event: IEvent;
};

const GUEST_PAGE_ROOT_URL = process.env.REACT_APP_GUEST_PAGE_ROOT_URL;

const EventInfo = (props: Props) => {
  const { event } = props;

  return (
    <div className={`md:block lg:basis-1/2`}>
      <h2 className="hidden lg:block mb-8">Event info</h2>
      <div className="flex flex-col mb-8 md:mb-4">
        <RowLabeledParagraph
          label="Event URL"
          text={`${GUEST_PAGE_ROOT_URL}/guests/invitation/${event.SK}`}
          className="justify-between items-center mb-3"
          textStyle="InputLighter break-all"
        />
        <RowLabeledParagraph
          label="Bride"
          text={event.bride}
          className="justify-between items-center mb-3"
          textStyle="InputLighter"
        />
        <RowLabeledParagraph
          label="Groom"
          text={event.groom}
          className="justify-between items-center mb-3"
          textStyle="InputLighter"
        />
      </div>
      <div className="flex flex-col mb-8 md:mb-4">
        <ColumnLabeledParagraph
          label="Date and Time of Wedding Ceremony"
          text={event.dateWedding}
          textStyle="InputLighter"
        />
        <ColumnLabeledParagraph
          label="Date and Time of Wedding Reception"
          text={event.dateWeddingReception}
          textStyle="InputLighter"
        />
        <ColumnLabeledParagraph
          label="Message"
          text={event.message}
          textStyle="InputLighter h-28"
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
