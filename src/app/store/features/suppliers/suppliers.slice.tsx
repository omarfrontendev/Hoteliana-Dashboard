import { createSlice } from "@reduxjs/toolkit";
import { fetchSuppliers } from "./supliersThunk";

interface UsersState {
    suppliers: any[];
    loading: boolean;
    error: string | null;
    total: number;
}

const initialState: UsersState = {
    suppliers: [],
    loading: false,
    error: null,
    total: 0,
};

export const suppliersSlice = createSlice({
    name: "suppliers",
    initialState,
    reducers: {
        updateSupplierStatus: (state, action: { payload: { id: number; isActive: boolean } }) => {
            const { id, isActive } = action.payload;
            const supplier = state.suppliers.find(s => s.supplierId === id);
            if (supplier) {
                supplier.isActive = isActive;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuppliers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSuppliers.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.suppliers = action.payload?.data?.suppliers as any[];
                state.total = action.payload?.data?.meta?.total || 0;
            })
            .addCase(fetchSuppliers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export const { updateSupplierStatus } = suppliersSlice.actions;
export default suppliersSlice.reducer;
