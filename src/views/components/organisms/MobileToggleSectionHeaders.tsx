import React, { MouseEvent } from 'react';

type Props = {
  onToggle: () => void;
};

const MobileToggleSectionHeaders = (props: Props) => {
  const { onToggle } = props;

  const toggleHandler = (event: MouseEvent<HTMLDivElement>) => {
    onToggle();
  };

  return (
    // FIXME: add active style to header, so that user can notice it's button
    <div className="pt-16 flex flex-row justify-center gap-14 mb-6 lg:hidden">
      <div onClick={toggleHandler} className="HoverUnderLine">
        <h2 className="basis-1/2 text-4xl">Event info</h2>
      </div>
      <div onClick={toggleHandler} className="HoverUnderLine">
        <h2 className="basis-1/2 text-4xl">Guests list</h2>
      </div>
    </div>
  );
};

export default MobileToggleSectionHeaders;
