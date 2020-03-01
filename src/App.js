import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import LoginPage from "./pages/LoginPage";
import PanelPage from "./pages/PanelPage";
import {setToken, setLoggedIn, setUserData} from "./redux/reducers/TokenReducer";
import {setCarrierData} from "./redux/reducers/CarrierReducer";
import {authenticateToken, getCarrierData} from "./utils/ServerUtils";
import {FILES_URL} from "./utils/FileUtils";
import {setCarrierLogo} from "./redux/reducers/CarrierReducer";

class App extends React.Component {

    componentDidMount() {
        let token = localStorage.getItem('token');

        this.props.setToken(token);
        authenticateToken(token).then(result => {
            if (result.data.authenticateToken) {
                this.props.setLoggedIn(true);
                this.props.setUserData({
                    id: result.data.authenticateToken.id,
                    firstName: result.data.authenticateToken.firstName,
                    lastName: result.data.authenticateToken.lastName,
                    email: result.data.authenticateToken.email,
                    phoneNumber: result.data.authenticateToken.phoneNumber
                });

                getCarrierData(token).then(data => {
                    this.props.setCarrierData(data.data.getCarrierProfile);
                });
            }
        });

        fetch(FILES_URL + 'logo.png', {method: 'GET'}).then(response => {
            if(response.ok) {
                this.props.setCarrierLogo(FILES_URL + 'logo.png');
            }else {
                this.props.setCarrierLogo('/assets/images/logo.svg');
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
        tokenState: state.token,
        carrierState: state.carrier
    };
};

export default connect(mapStateToProps, {
    setToken,
    setLoggedIn,
    setUserData,
    setCarrierData,
    setCarrierLogo
})(App);