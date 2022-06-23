import { useAppSelector } from 'hooks/hooks';
import AlreadyHaveEvent from 'views/components/organisms/AlreadyHaveEvent';
import AdminPageLayout from 'views/components/molecules/Layout/AdminPageLayout';
import CreateEventForm from 'views/components/organisms/CreateEventForm';

const AdminEventCreate = () => {
  const { event } = useAppSelector((state) => state.event);

  let pageContent = (
    <>
      <h2 className="mb-2">Create invitations</h2>
      <CreateEventForm className="w-4/5" />
    </>
  );

  if (event.SK) {
    pageContent = <AlreadyHaveEvent />;
  }

  return <AdminPageLayout>{pageContent}</AdminPageLayout>;
};

export default AdminEventCreate;
