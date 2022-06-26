import { IUser } from 'types/UserData.type';
import Button from '../atoms/Button';

type Props = {
  guests: IUser[];
  showGuestsStyle: string;
  showModalHandler: (userId: string) => void;
};

const GuestsList = (props: Props) => {
  const { guests, showGuestsStyle, showModalHandler } = props;

  return (
    <div className={`${showGuestsStyle} md:block lg:basis-1/2`}>
      <h2 className="hidden lg:block mb-2">Guests list</h2>
      <ul className="h-4/5">
        {guests &&
          guests.map((guest) => {
            return (
              <li
                className="InputLighter FlexCenter mb-2 rounded-2xl px-4"
                key={guest.SK}
              >
                <span className="basis-3/5">{`${guest.firstName} ${guest.lastName}`}</span>
                {guest.isAttending ? (
                  <Button customStyle="basis-1/5 bg-Green-default text-white drop-shadow-md mr-2">
                    PRESENT
                  </Button>
                ) : (
                  <Button customStyle="basis-1/5 text-Green-default border-2 border-Green-default drop-shadow-md mr-2">
                    ABSENT
                  </Button>
                )}
                <button
                  onClick={() => showModalHandler(guest.userId)}
                  className="text-Pink-dark basis-1/5"
                >
                  Show Detail
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default GuestsList;
