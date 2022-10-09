import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import DashboardData from '../../components/Dashboard/DashboardData'
import LoadingComponent from "../../components/Loading/Loading";
import ErrorDisplayMessage from '../../components/ErrorDisplayMessage'



import { fetchAccountStats } from "../../redux/slices/accountStats/accountStatsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccountStats());
  }, [dispatch]);

  const account = useSelector(state => state.account); 

  const {isLoading, isAppErr, isServerErr, accountDetails} = account

  const exp = accountDetails?.expenseStats[0]
  const inc = accountDetails?.incomeStats[0]

  return (
    <>

      {isLoading ? (
        <LoadingComponent />
      ) : isAppErr || isServerErr ? (
        <ErrorDisplayMessage>
          {isServerErr} {isAppErr}
        </ErrorDisplayMessage>
      ) : (
        <>
          <DashboardData
            numOfTransExp={exp?.totalExpenseRecords}
            avgExp={exp?.avgExpense}
            totalExp={exp?.totalExpenses}
            minExp={exp?.minExpense}
            maxExp={exp?.maxExpense}
            numOfTransInc={inc?.totalIncomeRecords}
            avgInc={inc?.avgIncome}
            totalInc={inc?.totalIncome}
            minInc={inc?.minIncome}
            maxInc={inc?.maxIncome}
            netProfit={accountDetails?.profit}
          />
        </>
      )}
    </>
  );
};

export default Dashboard;
