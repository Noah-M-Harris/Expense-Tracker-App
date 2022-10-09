import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { incomeBaseURL } from '../../../utils/baseURL'


// Action for redirect
export const resetIncomeCreated = createAction('expense/create/reset')

// Action for redirect
export const resetIncomeUpdate = createAction('expense/update/reset')


// Create Income Action
export const createIncomeAction = createAsyncThunk('income/create', async (payload, {rejectWithValue, getState, dispatch}) => {
    
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
        const {data} = await axios.post(`${incomeBaseURL}/`, payload, config) /* incomeBaseURL + '/', payload */
        
        dispatch(resetIncomeCreated())
        
        return data
    } catch (error) {
        if(!error?.response) {
            throw error
        }

        return rejectWithValue(error?.repsonse?.data)
    }
})


// View Income Reports (fetchAll) Action
export const fetchAllIncome = createAsyncThunk('income/fetch', async (payload, {rejectWithValue, getState, dispatch}) => {
    
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
        const {data} = await axios.get(`${incomeBaseURL}/?page=${payload}`, config) /* incomeBaseURL + `/?page=${payload}` */
        return data
    } catch (error) {
        if(!error?.response) {
            throw error
        }

        return rejectWithValue(error?.repsonse?.data)
    }
})



// Update Income Action
export const updateIncomeAction = createAsyncThunk('income/update', async (payload, {rejectWithValue, getState, dispatch}) => {
    
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
        const {data} = await axios.put(`${incomeBaseURL}/${payload?.id}`, payload, config) /* incomeBaseURL + `/${payload?.id}` */

        dispatch(resetIncomeUpdate())
        
        return data
    } catch (error) {
        if(!error?.response) {
            throw error
        }

        return rejectWithValue(error?.repsonse?.data)
    }
})


/* incLoading, incAppErr, incServerErr, incomeList */


const incomeSlice = createSlice({
    name: 'income',
    initialState: {

    },
    extraReducers: (builder) => {
        // Create Income
        builder.addCase(createIncomeAction.pending, (state, action) => {
            state.incLoading = true
        })
        // reset action
        builder.addCase(resetIncomeCreated, (state, action) => {
            state.isIncCreated = true
        })
        builder.addCase(createIncomeAction.fulfilled, (state, action) => {
            state.incLoading = false
            state.incomeCreated = action?.payload
            state.incAppErr = undefined
            state.incServerErr = undefined
            state.isIncCreated = false
        })
        builder.addCase(createIncomeAction.rejected, (state,action) => {
            state.incLoading = false
            state.incAppErr = action?.payload?.message
            state.incServerErr = action?.payload?.message
        })
        // Fetch All Income
        builder.addCase(fetchAllIncome.pending, (state, action) => {
            state.incLoading = true
        })
        builder.addCase(fetchAllIncome.fulfilled, (state, action) => {
            state.incLoading = false
            state.incomeList = action?.payload
            state.incAppErr = undefined
            state.incServerErr = undefined
        })
        builder.addCase(fetchAllIncome.rejected, (state,action) => {
            state.incLoading = false
            state.incAppErr = action?.payload?.message
            state.incServerErr = action?.payload?.message
        })
        // Update Income
        builder.addCase(updateIncomeAction.pending, (state, action) => {
            state.incLoading = true
        })
        // reset action
        builder.addCase(resetIncomeUpdate, (state, action) => {
            state.isIncUpdated = true
        })
        builder.addCase(updateIncomeAction.fulfilled, (state, action) => {
            state.incLoading = false
            state.incenseUpdated = action?.payload
            state.incAppErr = undefined
            state.incServerErr = undefined
            state.isIncUpdated = false
        })
        builder.addCase(updateIncomeAction.rejected, (state,action) => {
            state.incLoading = false
            state.incAppErr = action?.payload?.message
            state.incServerErr = action?.payload?.message
        })
    }
})


export default incomeSlice.reducer