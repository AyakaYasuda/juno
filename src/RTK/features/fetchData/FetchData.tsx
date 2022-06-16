import React from 'react';
import { fetchData } from 'OLD_RTK/features/fetchData/fetchDataSlice';
import { useAppSelector, useAppDispatch } from 'OLD_RTK/app/hooks';

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
      <div>{data.allergy}</div>
    </div>
  );
}
