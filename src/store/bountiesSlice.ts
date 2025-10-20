import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../utils/apiClient';
import { Bounty, BountiesResponse } from '../types/bounty';

export const fetchBounties = createAsyncThunk(
  'bounties/fetchBounties',
  async (
    { page = 1, limit = 10 }: { page?: number; limit?: number },
    thunkAPI,
  ) => {
    try {
      const response = await apiClient.get<BountiesResponse>(
        'clients/5189/bounties/',
        { params: { page, limit } },
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Failed to fetch');
    }
  },
);

interface BountiesState {
  data: Bounty[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount: number;
  currentPage: number;
  limit?: number;
}

const initialState: BountiesState = {
  data: [],
  loading: false,
  error: null,
  hasNextPage: false,
  hasPreviousPage: false,
  totalCount: 0,
  currentPage: 1,
  limit: 10,
};

const bountiesSlice = createSlice({
  name: 'rewards',
  initialState: initialState,
  reducers: {
    addBounties(state, action) {},
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBounties.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBounties.fulfilled, (state, action) => {
        state.loading = false;
        const { results, count, next, previous } = action.payload;
        const { arg } = action.meta;

        //Append Data for Pagination
        if (arg.page && arg.page > 1) {
          state.data = [...state.data, ...results];
        } else {
          state.data = results;
        }

        if (count) state.totalCount = count;
        state.hasNextPage = !!next;
        state.hasPreviousPage = !!previous;
        if (arg.page) state.currentPage = arg.page;
      })
      .addCase(fetchBounties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addBounties } = bountiesSlice.actions;
export default bountiesSlice.reducer;
