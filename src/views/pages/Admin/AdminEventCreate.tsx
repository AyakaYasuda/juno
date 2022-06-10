import EventLayout from 'views/components/atomic/templates/EventLayout';

function AdminEventCreate() {
  return (
    <EventLayout
      title="Create invitations"
      bride_name=""
      groom_name=""
      date_ceremony=""
      time_ceremony=""
      date_reception=""
      time_reception=""
      address=""
      message=""
      ctaTxt="Create invitations"
    />
  );
}

export default AdminEventCreate;
