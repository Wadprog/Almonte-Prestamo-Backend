import React, { useEffect } from "react";
import PageWrapper from "./component/PageWrapper";
import { LOG_IN_FAIL } from "./redux/Const";
//Routing ..
import Routes from "./component/Routes";
//Styles
import "./App.css";
//User loading
import { loadUser } from "./redux/actions/auth";
//Redux ..
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  useEffect(() => {
    const auth = store.getState().auth;
    if (auth.token) store.dispatch(loadUser());
    else if (!auth.token && auth.loading) store.dispatch({ type: LOG_IN_FAIL });
    console.log("Logging the store");
    console.log();
  }, []);

  return (
    <Provider store={store}>
      <PageWrapper>
        <Routes />
      </PageWrapper>
    </Provider>
  );
}

export default App;
