import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from "mobx-react";
import LoginPage from "./pages/LoginPage";
import PanelPage from "./pages/PanelPage";
import TokenStore from "./mobx/TokenStore";

export default class App extends React.Component {

    render() {
        return (
            <Provider tokenStore={TokenStore}>
                <Router>
                    <Switch>
                        <Route path='/' component={LoginPage} exact />
                        <Route path='/panel' component={PanelPage} exact />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}