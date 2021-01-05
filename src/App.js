import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import PrivateRoute from "components/PrivateRoute/PrivateRoute.js";
import { autoLogin } from 'actions/userActions.js'
import { history } from "history/history.js";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Singin from "layouts/Singin.js";
import "assets/css/material-dashboard-react.css?v=1.9.0";

const App = ({isAuthUser, autoLogin}) => {
    useEffect(() => {
        autoLogin();
    },[])

    return (
        <Router history={history}>
            <Switch>
                <PrivateRoute path="/admin" component={Admin} />
                <PrivateRoute path="/rtl" component={RTL} />

                <Route path="/singin" component={Singin} />
                {
                    isAuthUser==false ?
                    <Redirect from="/" to="/singin" /> : <Redirect from="/" to="/admin/dashboard" />
                }
            </Switch>
        </Router>
    )
};

const mapStateToProps = state => ({
    isAuthUser : state.userReducer.loggedIn
})

const mapDispatchToProps = (dispatch) => {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(App);
