import Title from 'views/components/atomic/atoms/Title';

const InfoHeader = () => {
  return (
    <section className="flex flex-col justify-center gap-6">
      <p className="text-Green-dark FlexJustify">
        You are cordinally invited to celebrate the marriage of
      </p>
      <div className="FlexCenter gap-4">
        <Title classTitle="" classColor="text-Yellow-dark ">
          Ross Green
        </Title>
        <p className="text-Green-dark">AND</p>
        <Title classTitle="" classColor="text-Yellow-dark ">
          Rachel Green
        </Title>
      </div>
    </section>
  );
};

export default InfoHeader;
