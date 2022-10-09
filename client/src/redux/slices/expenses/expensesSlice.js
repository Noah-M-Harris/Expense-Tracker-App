import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import axios from 'axios'
import {expensesBaseURL} from '../../../utils/baseURL'

// expLoading : expenseData : expenseList


// Action for redirect
export const resetExpenseCreated = createAction('expense/create/reset')

// Action for redirect
export const resetExpenseUpdate = createAction('expense/update/reset')

// Create Expense Action
export const createExpenseAction = createAsyncThunk('expense/create', async (payload, {rejectWithValue, getState, dispatch}) => {
    
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
        const {data} = await axios.post(`${expensesBaseURL}/`, payload, config) /* expensesBaseURL + '/' */

        dispatch(resetExpenseCreated())

        return data
    } catch (error) {
        if(!error?.response) {
            throw error
        }

        return rejectWithValue(error?.repsonse?.data)
    }
})


// View Expense Reports (fetchAll) Action
export const fetchAllExpenses = createAsyncThunk('expense/fetch', async (payload, {rejectWithValue, getState, dispatch}) => {
    
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
        const {data} = await axios.get(`${expensesBaseURL}/?page=${payload}`, config) /* expensesBaseURL + `/?page=${payload}` */

        dispatch(resetExpenseUpdate())

        return data
    } catch (error) {
        if(!error?.response) {
            throw error
        }

        return rejectWithValue(error?.repsonse?.data)
    }
})



// Update Expense Action
export const updateExpenseAction = createAsyncThunk('expense/update', async (payload, {rejectWithValue, getState, dispatch}) => {
    
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
        const {data} = await axios.put(`${expensesBaseURL}/${payload?.id}`, payload, config) /* expensesBaseURL + `/${payload?.id}` */
        return data
    } catch (error) {
        if(!error?.response) {
            throw error
        }

        return rejectWithValue(error?.repsonse?.data)
    }
})


const expenseSlice = createSlice({
    name: 'expenses',
    initialState: {

    },
    extraReducers: (builder) => {
        // Create Expense
        builder.addCase(createExpenseAction.pending, (state, action) => {
            state.expLoading = true
        })
        // reset action
        builder.addCase(resetExpenseCreated, (state, action) => {
            state.isExpCreated = true
        })
        builder.addCase(createExpenseAction.fulfilled, (state, action) => {
            state.expLoading = false
            state.expenseCreated = action?.payload
            state.expAppErr = undefined
            state.expServerErr = undefined
            state.isExpCreated = false
        })
        builder.addCase(createExpenseAction.rejected, (state,action) => {
            state.expLoading = false
            state.expAppErr = action?.payload?.message
            state.expServerErr = action?.payload?.message
        })
        // Fetch All Expenses
        builder.addCase(fetchAllExpenses.pending, (state, action) => {
            state.expLoading = true
        })
        builder.addCase(fetchAllExpenses.fulfilled, (state, action) => {
            state.expLoading = false
            state.expenseList = action?.payload
            state.expAppErr = undefined
            state.expServerErr = undefined
        })
        builder.addCase(fetchAllExpenses.rejected, (state,action) => {
            state.expLoading = false
            state.expAppErr = action?.payload?.message
            state.expServerErr = action?.payload?.message
        })
        // Update Expense
        builder.addCase(updateExpenseAction.pending, (state, action) => {
            state.expLoading = true
        })
        // reset action
        builder.addCase(resetExpenseUpdate, (state, action) => {
            state.isExpUpdated = true
        })
        builder.addCase(updateExpenseAction.fulfilled, (state, action) => {
            state.expLoading = false
            state.expenseUpdated = action?.payload
            state.expAppErr = undefined
            state.expServerErr = undefined
            state.isExpUpdated = true
        })
        builder.addCase(updateExpenseAction.rejected, (state,action) => {
            state.expLoading = false
            state.expAppErr = action?.payload?.message
            state.expServerErr = action?.payload?.message
        })
    }
})


export default expenseSlice.reducer