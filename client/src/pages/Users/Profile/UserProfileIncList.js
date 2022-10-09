import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LoadingComponent from "../../../components/LoadingComponent";
import ErrorDisplayMessage from "../../../components/ErrorDisplayMessage";
import UserProfileContentDetails from "../../../components/UserProfileContentDetails";
import ContentDetails from "../../../components/ContentDetails/ContentDetails";



import { userProfileAction } from "../../../redux/slices/users/userSlice";



const UserProfileIncList = () => {
  const dispatch = useDispatch()
  

  useEffect(() => {
    dispatch(userProfileAction())
  }, [dispatch])


  const user = useSelector(state => state.users)
  const {ServerErr, AppErr, Loading, profile} = user

  return (
    <>
    {Loading ? <LoadingComponent /> : ServerErr || AppErr ? <ErrorDisplayMessage>{ServerErr} {AppErr}</ErrorDisplayMessage> :
        profile?.expenses?. length <= 0 ? (<h2>No income found</h2>) : (
          <section className="py-6">
        <div className="container-fluid">
          <div className="position-relative border rounded-2">
            <a className="position-absolute top-0 end-0 mt-4 me-4" href="#"></a>
            <div className="pt-8 px-8 mb-8">
              <h6 className="mb-0 fs-3">Recent income transactions</h6>
              <p className="mb-0">
                Below is the history of your income transactions records
              </p>
              <Link
                to="/add-income"
                className="btn  btn-outline-primary me-2 m-2"
              >
                New Income
              </Link>
            </div>
            <table className="table">
              <thead>
                <tr className="table-active">
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
                 {profile?.income?.map(inc => (
                   <ContentDetails item={inc} key={inc?._id} />
                 ))} 
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
        ></div>
      </section>
        )}
    </>
  );
};

export default UserProfileIncList;
