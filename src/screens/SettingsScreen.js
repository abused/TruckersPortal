import React from "react";
import {
    withStyles,
    MuiThemeProvider,
    Typography,
    TextField,
    InputLabel,
    Input,
    FormControl,
    Button,
    FormControlLabel,
    Checkbox
} from "@material-ui/core";
import {defaultTheme} from "../styles/Theme";
import {MaterialSettingsStyles} from "../styles/SettingsStyles";
import {CustomTextMask} from "../utils/TableUtils";

class SettingsScreen extends React.Component {

    state = {
        carrierName: 'Truckers Portal',
        carrierStreet: '1111 Some Street',
        carrierCity: 'Some City',
        carrierState: 'MI',
        carrierZipCode: '48135',
        carrierEmail: 'truckersportal@gmail.com',
        carrierNumber: '(313) 215-3515',

        notFactoring: true,
        factoringName: '',
        factoringStreet: '',
        factoringCity: '',
        factoringState: '',
        factoringZipCode: ''
    };

    renderFactoringOptions = () => {
        let {factoringName, factoringStreet, factoringCity, factoringState, factoringZipCode} = this.state;
        let {classes} = this.props;

        return (
            <div>
                <TextField
                    className={classes.inputField}
                    InputLabelProps={{className: classes.textFieldProps}}
                    label='Factoring Company Name'
                    value={factoringName}
                    id='standard-basic'
                    variant='outlined'
                    onChange={(event) => this.setState({factoringName: event.target.value})}
                />

                <TextField
                    className={classes.inputField}
                    InputLabelProps={{className: classes.textFieldProps}}
                    label='Street'
                    value={factoringStreet}
                    id='standard-basic'
                    variant='outlined'
                    onChange={(event) => this.setState({factoringStreet: event.target.value})}
                />

                <TextField
                    className={classes.inputField}
                    InputLabelProps={{className: classes.textFieldProps}}
                    label='City'
                    value={factoringCity}
                    id='standard-basic'
                    variant='outlined'
                    onChange={(event) => this.setState({factoringCity: event.target.value})}
                />

                <TextField
                    className={classes.inputField}
                    InputLabelProps={{className: classes.textFieldProps}}
                    label='State'
                    value={factoringState}
                    id='standard-basic'
                    variant='outlined'
                    onChange={(event) => this.setState({factoringState: event.target.value})}
                />

                <TextField
                    className={classes.inputField}
                    InputLabelProps={{className: classes.textFieldProps}}
                    label='Zip Code'
                    value={factoringZipCode}
                    id='standard-basic'
                    variant='outlined'
                    onChange={(event) => this.setState({factoringZipCode: event.target.value})}
                />
            </div>
        );
    };

    render() {
        let {carrierName, carrierStreet, carrierCity, carrierState, carrierZipCode, carrierNumber, carrierEmail, notFactoring} = this.state;
        let {classes} = this.props;

        return (
            <MuiThemeProvider theme={defaultTheme}>
                <div className={classes.content}>
                    <div className={classes.settingsCard}>
                        <Typography variant='h6' color='textPrimary' style={{marginBottom: 20}}>Carrier Information</Typography>

                        <TextField
                            className={classes.inputField}
                            InputLabelProps={{className: classes.textFieldProps}}
                            label='Carrier Name'
                            value={carrierName}
                            id='standard-basic'
                            variant='outlined'
                            onChange={(event) => this.setState({carrierName: event.target.value})}
                        />

                        <TextField
                            className={classes.inputField}
                            InputLabelProps={{className: classes.textFieldProps}}
                            label='Carrier Email'
                            value={carrierEmail}
                            id='standard-basic'
                            variant='outlined'
                            onChange={(event) => this.setState({carrierEmail: event.target.value})}
                        />

                        <FormControl fullWidth className={classes.inputField}>
                            <InputLabel htmlFor="formatted-text-mask-input" className={classes.inputColor}>Carrier Number</InputLabel>
                            <Input
                                value={carrierNumber}
                                onChange={(event) => this.setState({carrierNumber: event.target.value})}
                                id="formatted-text-mask-input"
                                inputComponent={CustomTextMask}
                            />
                        </FormControl>

                        <div className={classes.streetInfo}>
                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.textFieldProps}}
                                label='Street'
                                value={carrierStreet}
                                id='standard-basic'
                                variant='outlined'
                                onChange={(event) => this.setState({carrierStreet: event.target.value})}
                            />

                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.textFieldProps}}
                                label='City'
                                value={carrierCity}
                                id='standard-basic'
                                variant='outlined'
                                onChange={(event) => this.setState({carrierCity: event.target.value})}
                            />

                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.textFieldProps}}
                                label='State'
                                value={carrierState}
                                id='standard-basic'
                                variant='outlined'
                                onChange={(event) => this.setState({carrierState: event.target.value})}
                            />

                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.textFieldProps}}
                                label='Zip Code'
                                value={carrierZipCode}
                                id='standard-basic'
                                variant='outlined'
                                onChange={(event) => this.setState({carrierZipCode: event.target.value})}
                            />
                        </div>

                        <input type='file' id='contained-button-file' accept='image/*' style={{display: 'none'}} />
                        <label htmlFor='contained-button-file' className={classes.uploadLabel}>
                            <Button variant='contained' color='secondary' component='span'>
                                Upload Logo
                            </Button>

                            <Typography style={{marginLeft: 10}}>No file selected...</Typography>
                        </label>

                        <div className={classes.btnContainer}>
                            <Button color='primary' variant='contained'>Save</Button>
                        </div>
                    </div>

                    <div className={classes.settingsCard}>
                        <Typography variant='h6' color='textPrimary'>Factoring Company Information</Typography>
                        <FormControlLabel
                            control={
                                <Checkbox className={classes.checkBox} checked={notFactoring} onChange={() => this.setState({notFactoring: !notFactoring})} />
                            }
                            label='Not Factoring'
                        />

                        {notFactoring ? null : this.renderFactoringOptions()}

                        <div className={classes.btnContainer}>
                            <Button color='primary' variant='contained'>Save</Button>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(MaterialSettingsStyles, {withTheme: true, defaultTheme})(SettingsScreen);