import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import axios from 'axios'
import {statsBaseURL} from '../../../utils/baseURL'


// accountDetails

// View Expense Reports (fetchAll) Action
export const fetchAccountStats = createAsyncThunk('account/fetch', async (payload, {rejectWithValue, getState, dispatch}) => {
    
    // Retrieve user token from store
    const user = getState()?.users?.userAuth?.token

    // What we are sending to the server as JSON
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user}`
        }
    }
    try {
        // Make HTTP call
        const {data} = await axios.get(`account/account-statistics`, config) /* statsBaseURL + '/account-statistics' */

        return data
        
    } catch (error) {
        if(!error?.response) {
            throw error
        }

        return rejectWithValue(error?.repsonse?.data)
    }
})



const accountStatSlice = createSlice({
    name: 'account',
    initialState: {

    },
    extraReducers: (builder) => {
        // Fetch All Expenses
        builder.addCase(fetchAccountStats.pending, (state, action) => {
            state.isLoading= true
        })
        builder.addCase(fetchAccountStats.fulfilled, (state, action) => {
            state.isLoading = false
            state.accountDetails = action?.payload
            state.isAppErr = undefined
            state.isServerErr = undefined
        })
        builder.addCase(fetchAccountStats.rejected, (state,action) => {
            state.isLoading = false
            state.isAppErr = action?.payload?.message
            state.isServerErr = action?.payload?.message
        })
    }
})


export default accountStatSlice.reducer