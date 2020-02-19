import React from 'react';
import {CssBaseline, MuiThemeProvider, withStyles} from "@material-ui/core";
import {NavStyles} from './../styles/NavStyles';
import {defaultTheme} from "./../styles/Theme";
import {MaterialLoginStyles} from "../styles/LoginStyles";

class LoginPage extends React.Component {

    state = {
        email: '',
        password: ''
    };

    render() {
        let {classes} = this.props;

        return (
            <MuiThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <div style={NavStyles.body}>
                    Hello World
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(MaterialLoginStyles, {withTheme: true, defaultTheme})(LoginPage);