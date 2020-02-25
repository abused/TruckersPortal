import React from 'react';
import {
    CssBaseline,
    MuiThemeProvider,
    withStyles,
    Card,
    CardContent,
    Typography,
    TextField,
    Button
} from "@material-ui/core";
import {Redirect} from 'react-router-dom'
import {defaultTheme} from "./../styles/Theme";
import {LoginStyles, MaterialLoginStyles} from "../styles/LoginStyles";
import {authenticateUser} from "../utils/ServerUtils";
import {connect} from "react-redux";
import {setLoggedIn, setToken} from "../redux/reducers/TokenReducer";

class LoginPage extends React.Component {

    state = {
        email: '',
        password: '',
        incorrectDetails: false
    };

    login = () => {
        let {email, password} = this.state;

        authenticateUser(email, password).then(result => {
            if(result.data.authenticateUser) {
                this.props.setToken(result.data.authenticateUser.token);
                this.props.setLoggedIn(true);
            }else {
                this.setState({incorrectDetails: true})
            }
        });
    };

    render() {
        let {email, password, incorrectDetails} = this.state;
        let {classes} = this.props;

        if(this.props.tokenState.loggedIn) {
            return <Redirect to='/panel' />
        }

        return (
            <MuiThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <div style={LoginStyles.body}>
                    <Card className={classes.loginCard}>
                        <CardContent style={{textAlign: 'center'}}>
                            <Typography variant='h4' color='textSecondary' noWrap>Login</Typography>
                            {incorrectDetails ? <Typography variant='h6' color='error' noWrap={false}>Invalid Email or Password</Typography> : null}

                            <form className={classes.loginForm}>
                                <TextField
                                    className={classes.textField}
                                    inputProps={{className: classes.textProps}}
                                    label='Email'
                                    value={email}
                                    id='standard-basic'
                                    error={incorrectDetails}
                                    onChange={(event) => this.setState({email: event.target.value})}
                                />

                                <TextField
                                    className={classes.textField}
                                    inputProps={{className: classes.textProps}}
                                    label='Password'
                                    value={password}
                                    type='password'
                                    id='standard-adornment-password'
                                    error={incorrectDetails}
                                    onChange={(event) => this.setState({password: event.target.value})}
                                />

                                <Button variant='contained' color='secondary' className={classes.loginBtn} onClick={this.login}>Login</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        tokenState: state.token
    };
};

export default withStyles(MaterialLoginStyles, {withTheme: true, defaultTheme})(connect(mapStateToProps, {
    setToken,
    setLoggedIn
})(LoginPage));