import React from "react";
import {
    withStyles,
    MuiThemeProvider,
    Typography,
    TextField,
    InputLabel,
    Input,
    FormControl,
    Button
} from "@material-ui/core";
import {defaultTheme} from "../styles/Theme";
import {MaterialAccountStyles} from "../styles/MyAccountStyles";
import {CustomTextMask} from "../utils/TableUtils";

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
        errorConfirmPass: false
    };

    componentDidMount() {
        this.setState({email: 'usersEmail@gmail.com', firstName: 'Some first name', lastName: 'Some last name', phoneNumber: '(313) 325-1325'})
    }

    render() {
        let {email, firstName, lastName, phoneNumber, currentPassword, newPassword, confirmPassword, errorCurrentPass, errorConfirmPass} = this.state;
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

                            <Button className={classes.saveBtn} color='primary' variant='contained'>Save</Button>
                        </div>

                        <div className={classes.accountBox}>
                            <div style={{width: '100%', marginBottom: 20}}>
                                <Typography variant='h6'>Change Password</Typography>
                                {errorCurrentPass ? <Typography className={classes.error} variant='h6'>Incorrect Current Password!</Typography> : null}
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
                            <Button className={classes.saveBtn} color='primary' variant='contained'>Save</Button>
                        </div>
                    </div>
                </MuiThemeProvider>
        );
    }
}

export default withStyles(MaterialAccountStyles, {withTheme: true, defaultTheme})(MyAccountScreen);