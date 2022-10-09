import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AppPagination from "../../components/AppPagination";

import { fetchAllIncome } from "../../redux/slices/income/incomeSlice";

import ContentDetails from '../../components/ContentDetails/ContentDetails'
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import LoadingComponent from "../../components/LoadingComponent";


const IncomeList = () => {

/* dataType */

  const dispatch = useDispatch()

  /* const dataType = state?.data */

  // Keep Track of our pages: Default to Page 1
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(fetchAllIncome(+page))
  }, [dispatch, page, setPage])

// Get all expenses from the store
const allIncome = useSelector(state => state.income)

// Destructuring expenses
const {incLoading, incAppErr, incServerErr, incomeList} = allIncome

  return (
    <>
      {incLoading ? (
        <LoadingComponent />
      ) : incAppErr || incServerErr ? (
        <ErrorDisplayMessage>
          {incServerErr} {incAppErr}
        </ErrorDisplayMessage>
      ) : (
        <section className="py-6">
          <div className="container-fluid">
            <div className="position-relative border rounded-2">
              <div className="pt-8 px-8 mb-8">
                <h6 className="mb-0 fs-3">Recent Income transactions</h6>
                <p className="mb-0">
                  Below is the history of your income transaction records
                </p>
                <Link to="/add-income" className="btn  btn-success me-2 m-2">
                  New Income
                </Link>
              </div>
              <table className="table">
                <thead>
                  <tr className="table-active">
                    {/* {!dataType && (
                      <th scope="col">
                        <button className="btn d-flex align-items-centerr text-uppercase">
                          <small className="text-center">Deposited By</small>
                        </button>
                      </th>
                    )} */}
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Deposited By</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Title</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Description</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Amount</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Date</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Action</small>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {incomeList?.length <= 0 ? (
                      <h2>No Income Found</h2>
                    ) : (
                      incomeList?.docs?.map(inc => (
                        <ContentDetails item={inc} key={inc?._id} />
                      ))
                    )}
                  </>
                </tbody>
              </table>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {incomeList?.docs?.length > 1 && (
              <AppPagination
                setPage={setPage}
                pageNumber={incomeList?.totalPages}
              />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default IncomeList;
