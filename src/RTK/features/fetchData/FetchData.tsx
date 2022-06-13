import React from 'react';
import { fetchData } from 'RTK/features/fetchData/fetchDataSlice';
import { useAppSelector, useAppDispatch } from 'RTK/app/hooks';

export function FetchData() {
  const dispatch = useAppDispatch();
  const { data, loading, hasErrors } = useAppSelector(
    (state) => state.fetchData
  );

  const handleFetch = () => {
    dispatch(fetchData());
  };

  if (loading) {
    return <p>loading</p>;
  }
  if (hasErrors) {
    return <p>cannot read data</p>;
  }

  return (
    <div>
      <div>
        <button onClick={handleFetch}>Fetch and Set data redux toolkit</button>
      </div>
      <div>{data.name}</div>
    </div>
  );
}
