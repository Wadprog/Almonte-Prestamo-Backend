import React, { useEffect } from "react";

import SideNav from "./component/layout/SideNav";

import Home from "./pages/Home";

import Landing from "./pages/Landing";
import Clients from "./pages/Clients";
import Loan from "./pages/Loan";
import Client from "./pages/Client";
import Alert from "./component/Alert";
import Customer from "./pages/Customer";
import LatePay from "./pages/LatePay";
import Login from "./pages/Login";
import Loading from "./component/layout/Loading";
import Register from "./pages/Register";
import NewLoan from "./pages/NewLoan";
import LoanRenew from "./pages/LoanRenew";
import Payment from "./pages/Payment";
import NewPlan from "./pages/NewPlan";
import Plans from "./pages/Plans";
import Cities from "./pages/Cities";
import NewCity from "./pages/NewCity";
import Expenses from "./pages/Expenses";
import NewExpense from "./pages/NewExpense";
import Users from "./pages/Users";
import NewUser from "./pages/NewUser";
import LoanId from "./pages/LoanId";
import LoanCancel from "./pages/LoanCancel";
import NewClient from "./pages/NewClient";
import Instruction from "./pages/Instruction";
import LateLoans from "./pages/LateLoans";
import Many from "./pages/Many";

//Routing ..

import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";

//Redux ..
import { loadUser } from "./redux/actions/auth";

import "./App.css";

import setAuthToken from "./utils/setAuthToken";

import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  if (localStorage.token) setAuthToken(localStorage.token);
  const { Fragment } = React;
  return (
    <Provider store={store}>
      <Fragment>
        <div className='page-wrapper chiller-theme'>
          <a id='show-sidebar' className='btn btn-sm btn-dark' href='#'>
            <i className='fa fa-bars' />
          </a>
          <SideNav />
          <main className='page-content'>
            <div class='container-fluid'>
              <Alert />
              <Switch>
                <Route exact path='/' component={Landing} />
                <PrivateRoute exact path='/home' component={Home} />
                <PrivateRoute exact path='/many/:id' component={Many} />
                <PrivateRoute exact path='/clients' component={Clients} />
                <PrivateRoute exact path='/loan' component={Loan} />
                <PrivateRoute path='/client/:id' component={Client} />

                <Route path='/instruction' component={Instruction} />
                <Route path='/sidenav' component={SideNav} />
                <Route path='/load' component={Loading} />
                <PrivateRoute path='/cities' component={Cities} />
                <PrivateRoute path='/newClient' component={NewClient} />
                <PrivateRoute path='/newcity' component={NewCity} />
                <PrivateRoute path='/expense' component={Expenses} />
                <PrivateRoute path='/newexpense' component={NewExpense} />
                <PrivateRoute path='/newloan/:id' component={NewLoan} />
                <PrivateRoute path='/city' component={Cities} />
                <PrivateRoute path='/loan/:id' component={LoanId} />
                <PrivateRoute path='/cancel/:id' component={LoanCancel} />
                <PrivateRoute path='/payment/:id' component={Payment} />
                <PrivateRoute path='/renew/:id' component={LoanRenew} />
                <PrivateRoute path='/users' component={Users} />
                <PrivateRoute path='/newuser' component={NewUser} />
                <PrivateRoute path='/plan' component={Plans} />
                <PrivateRoute path='/newplan' component={NewPlan} />
                <PrivateRoute path='/register' component={Register} />
                <PrivateRoute path='/lateLoan' component={LateLoans} />
                <Route path='/customer' component={Customer} />
                <Route path='/latePay/:id' component={LatePay} />
                <Route exact path='/login' component={Login} />
              </Switch>
            </div>
          </main>
        </div>
      </Fragment>
    </Provider>
  );
}

export default App;
