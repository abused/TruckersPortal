import React from "react";
import {
    withStyles,
    MuiThemeProvider,
    Typography,
    TextField,
    InputLabel,
    Input,
    FormControl,
    Button, Snackbar
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {defaultTheme} from "../styles/Theme";
import {MaterialAccountStyles} from "../styles/MyAccountStyles";
import {CustomTextMask} from "../utils/TableUtils";
import {connect} from "react-redux";
import {updateUser, updateUserPassword} from "../utils/ServerUtils";
import {setUserData, setToken} from "../redux/reducers/TokenReducer";

class MyAccountScreen extends React.Component {

    state = {
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '(   )    -    ',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        errorCurrentPass: false,
        errorConfirmPass: false,
        emptyNewPass: false,
        emptyCurrentPass: false,
        showSuccess: false
    };

    componentDidMount() {
        this.setState({
            email: this.props.tokenState.user.email,
            firstName: this.props.tokenState.user.firstName,
            lastName: this.props.tokenState.user.lastName,
            phoneNumber: this.props.tokenState.user.phoneNumber
        });
    }

    updateAccount = () => {
        let {firstName, lastName, email, phoneNumber} = this.state;

        updateUser(this.props.tokenState.token, this.props.tokenState.user.id, firstName, lastName, email, phoneNumber).then(data => {

            if(data.data.updateUser) {
                this.props.setUserData({
                    id: data.data.updateUser.id,
                    firstName: data.data.updateUser.firstName,
                    lastName: data.data.updateUser.lastName,
                    email: data.data.updateUser.email,
                    phoneNumber: data.data.updateUser.phoneNumber
                });

                this.setState({showSuccess: true});
            }
        });
    };

    updatePassword = () => {
        let {currentPassword, newPassword, confirmPassword} = this.state;
        if(!currentPassword) {
            this.setState({emptyCurrentPass: true});
        }else {
            this.setState({emptyCurrentPass: false});
        }

        if(!newPassword || !confirmPassword) {
            this.setState({emptyNewPass: true});
            return;
        }else {
            this.setState({emptyNewPass: false});
        }

        if(newPassword !== confirmPassword) {
            this.setState({errorConfirmPass: true});
            return;
        }

        updateUserPassword(this.props.tokenState.token, this.props.tokenState.user.id, currentPassword, newPassword).then(data => {
            if(data.data.updateUserPassword.id === 'INCORRECT') {
                this.setState({errorCurrentPass: true});
                return data;
            }

            this.props.setToken(data.data.updateUserPassword.token);
            this.setState({errorCurrentPass: false, errorConfirmPass: false, showSuccess: true, emptyNewPass: false, emptyCurrentPass: false});
        });
    };

    closeSnackbar = () => {
        this.setState({showSuccess: false});
    };

    render() {
        let {email, firstName, lastName, phoneNumber, currentPassword, newPassword, confirmPassword, errorCurrentPass, errorConfirmPass, showSuccess, emptyNewPass, emptyCurrentPass} = this.state;
        let {classes} = this.props;

        return (
                <MuiThemeProvider theme={defaultTheme}>
                    <div className={classes.content}>
                        <div className={classes.accountBox}>
                            <Typography variant='h6' style={{width: '100%', marginBottom: 20}}>Manage Account Details</Typography>

                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.textFieldProps}}
                                label='First Name'
                                value={firstName}
                                id='standard-basic'
                                variant='outlined'
                                fullWidth
                                onChange={(event) => this.setState({firstName: event.target.value})}
                            />

                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.textFieldProps}}
                                label='Last Name'
                                value={lastName}
                                id='standard-basic'
                                variant='outlined'
                                fullWidth
                                onChange={(event) => this.setState({lastName: event.target.value})}
                            />

                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.textFieldProps}}
                                label='Email'
                                value={email}
                                id='standard-basic'
                                variant='outlined'
                                fullWidth
                                onChange={(event) => this.setState({email: event.target.value})}
                            />

                            <FormControl fullWidth>
                                <InputLabel htmlFor="formatted-text-mask-input" className={classes.inputColor}>Phone Number</InputLabel>
                                <Input
                                    value={phoneNumber}
                                    onChange={(event) => this.setState({phoneNumber: event.target.value})}
                                    id="formatted-text-mask-input"
                                    inputComponent={CustomTextMask}
                                />
                            </FormControl>

                            <Button className={classes.saveBtn} color='primary' variant='contained' onClick={this.updateAccount}>Save</Button>
                        </div>

                        <div className={classes.accountBox}>
                            <div style={{width: '100%', marginBottom: 20}}>
                                <Typography variant='h6'>Change Password</Typography>
                                {errorCurrentPass ? <Typography className={classes.error} variant='h6'>Incorrect Current Password!</Typography> : null}
                                {emptyCurrentPass ? <Typography className={classes.error} variant='h6'>Field cannot be empty!</Typography> : null}
                            </div>

                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.textFieldProps}}
                                label='Current Password'
                                value={currentPassword}
                                id='standard-basic'
                                variant='outlined'
                                type='password'
                                fullWidth
                                onChange={(event) => this.setState({currentPassword: event.target.value})}
                            />

                            {errorConfirmPass ? <Typography className={classes.error} variant='h6' style={{width: '100%', marginBottom: 10}}>Passwords Do Not Match!</Typography> : null}
                            {emptyNewPass ? <Typography className={classes.error} variant='h6' style={{width: '100%', marginBottom: 10}}>Field cannot be empty!</Typography> : null}
                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.textFieldProps}}
                                label='New Password'
                                value={newPassword}
                                id='standard-basic'
                                variant='outlined'
                                type='password'
                                fullWidth
                                onChange={(event) => this.setState({newPassword: event.target.value})}
                            />

                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.textFieldProps}}
                                label='Confirm New Password'
                                value={confirmPassword}
                                id='standard-basic'
                                variant='outlined'
                                type='password'
                                fullWidth
                                onChange={(event) => this.setState({confirmPassword: event.target.value})}
                            />

                            {errorConfirmPass ? null : <div className={classes.breakpoint} />}
                            <Button className={classes.saveBtn} color='primary' variant='contained' onClick={this.updatePassword}>Save</Button>
                        </div>

                        <Snackbar
                            open={showSuccess}
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            onClose={this.closeSnackbar}
                            autoHideDuration={6000}
                        >
                            <Alert onClose={this.closeSnackbar} severity='success'>Successfully Updated User!</Alert>
                        </Snackbar>
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
export default withStyles(MaterialAccountStyles, {withTheme: true, defaultTheme})(connect(mapStateToProps, {setUserData, setToken})(MyAccountScreen));