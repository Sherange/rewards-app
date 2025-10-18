import { useState, useEffect, useCallback } from 'react';
import { BountiesResponse, Bounty } from '../types/reward';

interface UseBountiesOptions {
  limit?: number;
  page?: number;
  autoFetch?: boolean;
}

interface UseBountiesReturn {
  data: Bounty[] | null;
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

const API_BASE_URL =
  'https://staging.helloagain.at/api/v1/clients/5189/bounties';

export const useBounties = (
  options: UseBountiesOptions = {},
): UseBountiesReturn => {
  const { limit = 10, page = 1, autoFetch = true } = options;

  const [data, setData] = useState<Bounty[] | null>(null);
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
        const url = `${API_BASE_URL}/?limit=${limit}&page=${targetPage}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: BountiesResponse = await response.json();

        setData(result.results);
        setTotalCount(result.count);
        setHasNextPage(!!result.next);
        setHasPreviousPage(!!result.previous);
        setCurrentPage(targetPage);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        console.error('Error fetching bounties:', err);
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
    if (autoFetch) {
      fetchBounties();
    }
  }, [autoFetch, fetchBounties]);

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
