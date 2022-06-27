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
    <div className="pt-16 flex flex-row justify-center gap-14 mb-6 lg:hidden">
      <div
        onClick={toggleHandler}
        className={isEventInfoShown ? 'border-b-2 border-white' : ''}
      >
        <h2 className="basis-1/2 text-4xl cursor-pointer">Event info</h2>
      </div>
      <div
        onClick={toggleHandler}
        className={!isEventInfoShown ? 'border-b-2 border-white' : ''}
      >
        <h2 className="basis-1/2 text-4xl cursor-pointer">Guests list</h2>
      </div>
    </div>
  );
};

export default MobileToggleSectionHeaders;
