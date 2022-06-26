import React, { MouseEvent } from 'react';

type Props = {
  onShowInfo: React.MouseEventHandler<HTMLDivElement>;
  onShowGuests: React.MouseEventHandler<HTMLDivElement>;
};

const MobileToggleSectionHeaders = (props: Props) => {
  const { onShowInfo, onShowGuests } = props;

  const eventInfoClickHandler = (event: MouseEvent<HTMLDivElement>) => {
    onShowInfo(event);
  };

  const guestsClickHandler = (event: MouseEvent<HTMLDivElement>) => {
    onShowGuests(event);
  };

  return (
    // FIXME: add active style to header, so that user can notice it's button
    <div className="pt-16 flex flex-row justify-center gap-14 mb-6 lg:hidden">
      <div onClick={eventInfoClickHandler} className="HoverUnderLine">
        <h2 className="basis-1/2 text-4xl">Event info</h2>
      </div>
      <div onClick={guestsClickHandler} className="HoverUnderLine">
        <h2 className="basis-1/2 text-4xl">Guests list</h2>
      </div>
    </div>
  );
};

export default MobileToggleSectionHeaders;
