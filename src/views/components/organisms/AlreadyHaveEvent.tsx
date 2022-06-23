import { Link } from 'react-router-dom';
import Button from '../atoms/Button';

const AlreadyHaveEvent = () => {
  return (
    <>
      <div className="text-center flex flex-col">
        <h3 className="text-Pink-dark">You already have an event!</h3>
        <Button customStyle="border-2 border-White-default text-white mt-6">
          <Link to="/admin/event">Check the event info</Link>
        </Button>
      </div>
    </>
  );
};

export default AlreadyHaveEvent;
