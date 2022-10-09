import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import { useSelector } from 'react-redux';

import Login from './pages/Users/Login/Login'
import Register from './pages/Users/Register/Register'

import Navbar from './components/Navigation/Navbar'

import AddIncome from './pages/Income/AddIncome'
import IncomeList from './pages/Income/IncomeList'
import UserProfileIncList from './pages/Users/Profile/UserProfileIncList';


import EditContent from './components/EditContent';

import AddExpense from './pages/Expenses/AddExpense'
import ExpensesList from './pages/Expenses/ExpensesList'
import UserProfileExpList from './pages/Users/Profile/UserProfileExpList';
//import EditExpense from './pages/Expenses/EditExpense'


import Profile from './pages/Users/Profile/Profile'

import ProtectedRoute from './components/Navigation/ProtectedRoute';

import NotAdmin from './components/NotAdmin/NotAdmin';

import Dashboard from './pages/Dashboard/Dashboard'

import Home from './pages/Home'

import AdminRoute from './components/Navigation/AdminRoute';

import UpdateProfile from './pages/Users/Profile/UpdateProfile';




function App() {

  // Take the user at the top level
  const user = useSelector(state => state?.users?.userAuth)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/not-found' element={<NotAdmin />} />

        <Route element={<ProtectedRoute user={user} />} >
          <Route exact path='/add-income' element={<AddIncome />} />
          <Route exact path='/income' element={<IncomeList />} />
          <Route exact path='/user-income' element={<UserProfileIncList />} />
          <Route exact path='/edit' element={<EditContent />} />
          <Route exact path='/add-expense' element={<AddExpense />} />
          <Route exact path='/user-expenses' element={<UserProfileExpList />} />
          <Route exact path='/expenses' element={<ExpensesList />} />
          {/* <Route exact path='/edit-expense' element={<EditExpense />} /> */}
          <Route exact path='/dashboard' element={<Dashboard />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/update-profile' element={<UpdateProfile />} />
        </Route>

        <Route element={<AdminRoute />} >
          <Route exact path='/dashboard' element={<Dashboard />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
