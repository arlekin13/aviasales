import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    transfers: {
        all: true,
        noTransfers: true,
        oneTransfers: true,
        twoTransfers: true,
        threeTransfers: true,
    }
}
export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setAllTransfers: (state, action) => {
            const payload = action.payload;
            state.transfers.all = payload;
            state.transfers.noTransfers = payload;
            state.transfers.oneTransfers = payload;
            state.transfers.twoTransfers = payload;
            state.transfers.threeTransfers = payload;
        },
        setTransfer: (state, action) => {
            const { transfer, value } = action.payload;
            state.transfers[transfer] = value;

            if (!value) {
                state.transfers.all = false;
            } else {
                // Если все фильтры включены, включаем "Все"
                if (state.transfers.noTransfers &&
                    state.transfers.oneTransfers &&
                    state.transfers.twoTransfers &&
                    state.transfers.threeTransfers) {
                    state.transfers.all = true;
                }
            }
        },
    },
});
export const { setAllTransfers, setTransfer } = filterSlice.actions;
export default filterSlice.reducer;

