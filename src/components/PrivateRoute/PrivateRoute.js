import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({isAuthUser, component: Component, ...rest}) => {
    return (
    <Route {...rest} render={props => (
        isAuthUser
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/singin', state: { from: props.location } }} />
    )} />
)}

const mapStateToProps = state => ({
    isAuthUser: state.userReducer.loggedIn
})

export default connect(mapStateToProps)(PrivateRoute);
