import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import PanelPage from "./pages/PanelPage";

export default class App extends React.Component {

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