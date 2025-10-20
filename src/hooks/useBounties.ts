import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBounties } from '../store/bountiesSlice';
import { RootState, AppDispatch } from '../store';

export const useBounties = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, currentPage, hasNextPage } = useSelector(
    (state: RootState) => state.bounties,
  );

  useEffect(() => {
    dispatch(fetchBounties({ page: 1, limit: 10 }));
  }, [dispatch]);

  const fetchNextPage = () => {
    if (hasNextPage && !loading) {
      dispatch(fetchBounties({ page: currentPage + 1, limit: 10 }));
    }
  };

  return { data, loading, error, fetchNextPage };
};
