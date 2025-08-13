import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import { redirect } from "next/navigation";
const base_url = process.env.NEXT_PUBLIC_BASE_URL

export const FetchCompany = createAsyncThunk('/getCompany', async () => {
    try {
        const res = await axios.get(`${base_url}/api/v1/company`, { withCredentials: true })
        return res.data
    } catch (error) {
        throw error;
    }
})

const CompanySlice = createSlice({
    name: "Company",
    initialState: {
        Company: null,
        loading: false,
        error: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(FetchCompany.pending, (state) => {
                state.loading = true
            })
            .addCase(FetchCompany.fulfilled, (state, action) => {
                state.loading = false;
                state.Company = action.payload.company;
                state.error = false
            })
            .addCase(FetchCompany.rejected, (state) => {
                state.loading = false
                state.error = true
                state.Company = null
            })

    }
})

export default CompanySlice.reducer;