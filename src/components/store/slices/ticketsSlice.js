import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async () => {
  const response = await fetch('https://aviasales-test-api.kata.academy/search');
  if (!response.ok) {
    throw new Error(`Ошибка получения searchId: ${response.status}`);
  }
  const data = await response.json();
  return data.searchId;
});

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { getState, dispatch }) => {
  let { searchId } = getState().tickets;
  if (!searchId) {
    await dispatch(fetchSearchId());
    searchId = getState().tickets.searchId;
    if (!searchId) return [];
  }

  let allTickets = [];
  let stop = false;

  while (!stop) {
    try {
      const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
      if (!response.ok) {
        if (response.status === 500) {
          console.warn('Ошибка 500');
          return await dispatch(fetchTickets());
        }
        throw new Error(`Ошибка получения билетов: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      if (data.tickets) {
        allTickets = [...allTickets, ...data.tickets];
        dispatch(ticketsSlice.actions.addTickets(data.tickets));
      }

      if (data.stop) {
        stop = true;
      }

      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      throw error;
    }
  }
  console.log(allTickets);
  return allTickets;
});

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    loading: false,
    error: null,
    searchId: null,
    loadingMore: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addTickets: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.tickets = [...state.tickets, ...action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
      })
      .addCase(fetchTickets.pending, (state, action) => {
        state.loadingMore = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loadingMore = false;
        if (Array.isArray(action.payload)) {
          state.tickets = [...state.tickets, ...action.payload];
        }
        state.stop = action.payload.stop;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        state.error = action.error.message;
        console.error('Ошибка при загрузке билетов:', action.error.message);
      });
  },
});

export const { setTickets, setLoading, setError, addTickets } = ticketsSlice.actions;

export default ticketsSlice.reducer;
