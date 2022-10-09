import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import moneySVG from "../../img/money.svg";

import DisabledButton from "../../components/DisabledButton";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";

import { useFormik } from 'formik'
import * as yup from 'yup'

import { createExpenseAction } from "../../redux/slices/expenses/expensesSlice";

// expLoading : expenseData


// Create our yup Schema: Form Validation
const formSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  amount: yup.number().required('Amount is required')
})


const AddExpense = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


    // Formik Form Hook
    const formik = useFormik({
      // What we want to be sending to the frontend
      initialValues: {
        title: '',
        description: '',
        amount: ''
      },
      onSubmit: (values) => {
        dispatch(createExpenseAction(values))
      },
      validationSchema: formSchema
    })

        // Data retrieval from store
        const expenseData = useSelector(state => state.expenses)

        // Destructuring what we retrieved
        const {expLoading, expenseCreated, expAppErr, expServerErr, isExpCreated} = expenseData

        // Redirect
        useEffect(() => {
          if(isExpCreated) navigate('/expenses')
        }, [dispatch, isExpCreated])


  return (
    <>
      <section className="py-5 bg-danger vh-100">
        <div className="container text-center">
          <a className="d-inline-block mb-5">
            <img
              className="img-fluid"
              src={moneySVG}
              alt="SVGeXPENSES"
              width="200"
            />
          </a>
          <div className="row mb-4">
            <div className="col-12 col-md-8 col-lg-5 mx-auto">
              <div className="p-4 shadow-sm rounded bg-white">
                <form onSubmit={formik.handleSubmit}>
                  <span className="text-muted">Expense</span>
                  <h2 className="mb-4 fw-light">Record New Expense</h2>
                  {/* Display income Err */}
                  {expServerErr || expAppErr ? (
                    <ErrorDisplayMessage>{expServerErr} {expAppErr}</ErrorDisplayMessage>
                  ) : null}
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.title}
                      onBlur={formik.handleBlur("title")}
                      onChange={formik.handleChange("title")}
                      className="form-control"
                      type="text"
                      placeholder="Enter Title"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.title && formik.errors.title}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.description}
                      onBlur={formik.handleBlur("description")}
                      onChange={formik.handleChange("description")}
                      className="form-control"
                      type="text"
                      placeholder="Enter Description"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.description && formik.errors.description}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.amount}
                      onBlur={formik.handleBlur("amount")}
                      onChange={formik.handleChange("amount")}
                      className="form-control"
                      type="number"
                      placeholder="Enter Amount"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.amount && formik.errors.amount}
                  </div>
                  {expLoading ? (
                    <DisabledButton />
                  ) : (
                    <button type="submit" className="btn btn-danger mb-4 w-100">
                      Record Expense
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddExpense;



