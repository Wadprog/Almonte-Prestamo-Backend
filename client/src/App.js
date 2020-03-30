import React, { useEffect } from 'react';

import SideNav from './component/layout/SideNav';

import Home from './pages/Home';
import Clients from './pages/Clients';
import Loan from './pages/Loan';
import Client from './pages/Client';
import Alert from './component/Alert';

import Login from './pages/Login';
import Loading from './component/layout/Loading';
import Register from './pages/Register';
import NewLoan from './pages/NewLoan';
import Payment from './pages/Payment';
import NewPlan from './pages/NewPlan';
import Plans from './pages/Plans';
import Cities from './pages/Cities';
import NewCity from './pages/NewCity';
import Expenses from './pages/Expenses';
import NewExpense from './pages/NewExpense';
import Users from './pages/Users';
import NewUser from './pages/NewUser';
import LoanId from './pages/LoanId';
import NewClient from './pages/NewClient';
import Instruction from './pages/Instruction';
import LateLoans from './pages/LateLoans';

//Routing ..

import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './component/PrivateRoute';

//Redux ..

import './App.css';
import { loadProfiles } from './redux/actions/profile';
import { loadLoans } from './redux/actions/loans';
import { loadCities } from './redux/actions/city';
import { loadPlan } from './redux/actions/plan';
import { loadPayment } from './redux/actions/payment';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './redux/actions/auth';
import { loadUsers } from './redux/actions/user';
import { loadRoutina } from './redux/actions/routina';
import { loadStatistic } from './redux/actions/statistic';
import { loadExpenses } from './redux/actions/expenses';

import { Provider } from 'react-redux';
import store from './redux/store';
function App() {
	useEffect(() => {
		store.dispatch(loadUser());
		store.dispatch(loadProfiles());
		store.dispatch(loadLoans());
		store.dispatch(loadCities());
		store.dispatch(loadPlan());
		store.dispatch(loadPayment());
		store.dispatch(loadUsers());
		store.dispatch(loadRoutina());
		store.dispatch(loadStatistic());
		store.dispatch(loadExpenses());
	}, []);

	if (localStorage.token) setAuthToken(localStorage.token);
	const { Fragment } = React;
	return (
		<Provider store={store}>
			<Fragment>
				<div className="page-wrapper chiller-theme">
					<a id="show-sidebar" className="btn btn-sm btn-dark" href="#">
						<i className="fa fa-bars" />
					</a>
					<SideNav />
					<main className="page-content">
						<div class="container-fluid">
						
								<Alert />
								<Switch>
									<PrivateRoute exact path="/" component={Home} />
									<PrivateRoute exact path="/clients" component={Clients} />
									<PrivateRoute exact path="/loan" component={Loan} />
									<PrivateRoute path="/client/:id" component={Client} />

									<Route path="/login" component={Login} />
									<Route path="/instruction" component={Instruction} />
									<Route path="/sidenav" component={SideNav} />
									<Route path="/load" component={Loading} />
									<PrivateRoute path="/cities" component={Cities} />
									<PrivateRoute path="/newClient" component={NewClient} />
									<PrivateRoute path="/newcity" component={NewCity} />
									<PrivateRoute path="/expense" component={Expenses} />
									<PrivateRoute path="/newexpense" component={NewExpense} />
									<PrivateRoute path="/newloan/:id" component={NewLoan} />
									<PrivateRoute path="/city" component={Cities} />
									<PrivateRoute path="/loan/:id" component={LoanId} />
									<PrivateRoute path="/payment/:id" component={Payment} />
									<PrivateRoute path="/users" component={Users} />
									<PrivateRoute path="/newuser" component={NewUser} />
									<PrivateRoute path="/plan" component={Plans} />
									<PrivateRoute path="/newplan" component={NewPlan} />
									<PrivateRoute path="/register" component={Register} />
									<PrivateRoute path="/lateLoan" component={LateLoans} />
								</Switch>
						
						</div>
					</main>
				</div>
			</Fragment>
		</Provider>
	);
}

export default App;
