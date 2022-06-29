type Props = {
  isEventInfoShown: boolean;
  onToggle: () => void;
};

const MobileToggleSectionHeaders = (props: Props) => {
  const { isEventInfoShown, onToggle } = props;

  const toggleHandler = () => {
    onToggle();
  };

  return (
    <div className="w-full grid grid-cols-2 justify-items-center py-10 px-10 sm:px-20 lg:hidden">
      <div
        onClick={toggleHandler}
        className={isEventInfoShown ? 'border-b-2 border-white' : ''}
      >
        <h2 className="basis-1/2 cursor-pointer">Event Info</h2>
      </div>
      <div
        onClick={toggleHandler}
        className={!isEventInfoShown ? 'border-b-2 border-white' : ''}
      >
        <h2 className="basis-1/2 cursor-pointer">Guests List</h2>
      </div>
    </div>
  );
};

export default MobileToggleSectionHeaders;
