import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import LoginPage from "./pages/LoginPage";
import PanelPage from "./pages/PanelPage";
import {setToken, setLoggedIn} from "./redux/reducers/TokenReducer";
import {authenticateToken} from "./utils/ServerUtils";

class App extends React.Component {

    componentDidMount() {
        let token = localStorage.getItem('token');

        this.props.setToken(token);
        authenticateToken(token).then(result => {
            if(result.data.authenticateToken) {
                localStorage.setItem('token', result.data.authenticateToken.token);
                this.props.setLoggedIn(true);
            }
        });
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' component={LoginPage} exact />
                    <Route path='/panel' component={PanelPage} exact />
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        tokenState: state.token
    };
};

export default connect(mapStateToProps, {
    setToken,
    setLoggedIn
})(App);