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
  collected: Bounty[];
  claimedIds: string[];
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
  collected: [],
  claimedIds: [],
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
    addCollectedBounty: (state, action) => {
      const bounty = action.payload;
      const exists = state.claimedIds.includes(bounty.id);

      if (!exists) {
        state.collected.push(bounty);
        state.claimedIds.push(bounty.id);
        state.data = state.data.map(b =>
          b.id === bounty.id ? { ...b, is_claimed: true } : b,
        );
      }
    },
    removeCollectedBounty: (state, action) => {
      const bountyId = action.payload;
      state.collected = state.collected.filter(b => b.id !== bountyId);
      state.claimedIds = state.claimedIds.filter(id => id !== bountyId);

      state.data = state.data.map(b =>
        b.id === bountyId ? { ...b, is_claimed: false } : b,
      );
    },
    clearCollectedBounties: state => {
      state.collected = [];
      state.claimedIds = [];
    },
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

        // processed each bounty with is_claimed
        const processed = results.map((bounty: any) => ({
          ...bounty,
          is_claimed: state.claimedIds.includes(bounty.id),
        }));

        //Append Data for Pagination
        if (arg.page && arg.page > 1) {
          state.data = [...state.data, ...processed];
        } else {
          state.data = processed;
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

export const {
  addCollectedBounty,
  removeCollectedBounty,
  clearCollectedBounties,
} = bountiesSlice.actions;
export default bountiesSlice.reducer;
