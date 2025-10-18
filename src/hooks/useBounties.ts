import { useState, useEffect, useCallback } from 'react';
import { BountiesResponse, Reward } from '../types/reward';
import apiClient from '../utils/apiClient';

interface UseBountiesOptions {
  limit?: number;
  page?: number;
}

interface UseBountiesReturn {
  data: Reward[] | null;
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount: number;
  currentPage: number;
  fetchBounties: (page?: number) => Promise<void>;
  fetchNextPage: () => Promise<void>;
  fetchPreviousPage: () => Promise<void>;
  refetch: () => Promise<void>;
}

export const useBounties = (
  options: UseBountiesOptions = {},
): UseBountiesReturn => {
  const { limit = 10, page = 1 } = options;

  const [data, setData] = useState<Reward[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);

  const fetchBounties = useCallback(
    async (pageNumber?: number) => {
      const targetPage = pageNumber ?? currentPage;
      setLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams({
          limit: String(limit),
          page: String(targetPage),
        }).toString();

        const response = await apiClient.get<BountiesResponse>(
          `clients/5189/bounties/?${queryParams}`,
        );
        const result = response.data;

        setData(result.results);
        setTotalCount(result.count);
        setHasNextPage(!!result.next);
        setHasPreviousPage(!!result.previous);
        setCurrentPage(targetPage);
      } catch (e) {
        if (
          e &&
          typeof e === 'object' &&
          'message' in e &&
          typeof (e as any).message === 'string'
        ) {
          setError((e as any).message);
        } else {
          setError('An unknown error occurred.');
        }
        console.error('Error fetching bounties:', e);
      } finally {
        setLoading(false);
      }
    },
    [limit, currentPage],
  );

  const fetchNextPage = useCallback(async () => {
    if (hasNextPage) {
      await fetchBounties(currentPage + 1);
    }
  }, [hasNextPage, currentPage, fetchBounties]);

  const fetchPreviousPage = useCallback(async () => {
    if (hasPreviousPage) {
      await fetchBounties(currentPage - 1);
    }
  }, [hasPreviousPage, currentPage, fetchBounties]);

  const refetch = useCallback(async () => {
    await fetchBounties(currentPage);
  }, [fetchBounties, currentPage]);

  useEffect(() => {
    fetchBounties();
  }, [fetchBounties]);

  return {
    data,
    loading,
    error,
    hasNextPage,
    hasPreviousPage,
    totalCount,
    currentPage,
    fetchBounties,
    fetchNextPage,
    fetchPreviousPage,
    refetch,
  };
};
