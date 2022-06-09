import { Link } from 'react-router-dom';
import Button from '../components/atoms/Button';
import TopLayout from '../components/templates/TopLayout';

function AdminHome() {
  return (
    <TopLayout>
      <div className="mb-48 md:mb-24">
        <h1 className="font-allura text-white md:pt-20">Juno</h1>
        <h3 className="hidden md:block text-white ">
          Online Wedding Invitations <br /> &amp; RSVP management
        </h3>
      </div>
      <ul className="w-3/5 my-0 mx-auto">
        <li className="mb-6">
          <Button bgColor="bg-White-default" txtColor="text-Pink-default">
            <Link to="/register">Get Started</Link>
          </Button>
        </li>
        <li>
          <Button bgColor="bg-White-default" txtColor="text-Pink-default">
            <Link to="/login">Log In</Link>
          </Button>
        </li>
      </ul>
    </TopLayout>
  );
}

export default AdminHome;
