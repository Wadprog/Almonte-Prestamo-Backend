import React, { useEffect } from 'react';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Home from './pages/Home';
import Clients from './pages/Clients';
import Loan from './pages/Loan';
import Client from './pages/Client';
import Alert from './component/Alert';
import Test from './component/Test';
import Login from './pages/Login';
import Loading from './component/layout/Loading';
import Register from './pages/Register';
import NewLoan from './pages/NewLoan';
import Payment from './pages/Payment';
import NewPlan from './pages/NewPlan';
import Plans from './pages/Plans';
import LoanId from './pages/LoanId';
import NewClient from './pages/NewClient';

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
	}, []);

	if (localStorage.token) setAuthToken(localStorage.token);
	const { Fragment } = React;
	return (
		<Provider store={store}>
			<Fragment>
				<main>
					<Navbar />
					<div className=" mt-5">
						<Alert />
						<Switch>
							<PrivateRoute exact path="/" component={Home} />
							<PrivateRoute exact path="/clients" component={Clients} />
							<PrivateRoute exact path="/loan" component={Loan} />
							<PrivateRoute path="/client/:id" component={Client} />

							<Route path="/login" component={Login} />
							<Route path="/load" component={Loading} />
							<Route path="/newClient" component={NewClient} />
							<PrivateRoute path="/newloan/:id" component={NewLoan} />
							<PrivateRoute path="/loan/:id" component={LoanId} />
							<PrivateRoute path="/payment/:id" component={Payment} />
							<PrivateRoute path="/plan" component={Plans} />
							<PrivateRoute path="/newplan" component={NewPlan} />
							<PrivateRoute path="/register" component={Register} />
							<PrivateRoute path="/test" component={Test} />
						</Switch>
					</div>
					<Footer />
				</main>
			</Fragment>
		</Provider>
	);
}

export default App;
