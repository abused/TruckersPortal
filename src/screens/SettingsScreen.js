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
    Checkbox, Snackbar
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {defaultTheme} from "../styles/Theme";
import {MaterialSettingsStyles} from "../styles/SettingsStyles";
import {CustomTextMask} from "../utils/TableUtils";
import {uploadLogo, FILES_URL} from "../utils/FileUtils";
import {connect} from "react-redux";
import {updateCarrier} from "../utils/ServerUtils";
import {setCarrierData} from "../redux/reducers/CarrierReducer";
import {setCarrierLogo} from "../redux/reducers/CarrierReducer";

class SettingsScreen extends React.Component {

    state = {
        carrierName: '',
        carrierStreet: '',
        carrierCity: '',
        carrierState: '',
        carrierZipCode: '',
        carrierEmail: '',
        carrierNumber: '(   )    -    ',
        logo: null,

        notFactoring: true,
        factoringName: '',
        factoringStreet: '',
        factoringCity: '',
        factoringState: '',
        factoringZipCode: '',
        showSuccess: false
    };

    componentDidMount() {
        let carrierState = this.props.carrierState;

        if(carrierState) {
            this.setState({
                carrierName: carrierState.name,
                carrierStreet: carrierState.street,
                carrierCity: carrierState.city,
                carrierState: carrierState.state,
                carrierZipCode: carrierState.zipCode,
                carrierEmail: carrierState.email,
                carrierNumber: carrierState.phoneNumber,
                notFactoring: !carrierState.factoring,
                factoringName: carrierState.factoringName,
                factoringStreet: carrierState.factoringStreet,
                factoringCity: carrierState.factoringCity,
                factoringState: carrierState.factoringState,
                factoringZipCode: carrierState.factoringZip
            });
        }
    }

    updateCarrier = () => {
        let {carrierName, carrierStreet, carrierCity, carrierState, carrierZipCode, carrierNumber, carrierEmail, notFactoring, logo,
            factoringName, factoringStreet, factoringCity, factoringState, factoringZipCode} = this.state;

        updateCarrier({
            token: this.props.tokenState.token,
            name: carrierName,
            email: carrierEmail,
            phoneNumber: carrierNumber,
            street: carrierStreet,
            city: carrierCity,
            state: carrierState,
            zipCode: carrierZipCode,
            factoring: !notFactoring,
            factoringName,
            factoringStreet,
            factoringCity,
            factoringState,
            factoringZip: factoringZipCode
        }).then(data => {
            if(logo) {
                uploadLogo(logo).then(logoData => {
                    fetch(FILES_URL + '/logo.png', {method: 'GET'}).then(response => {
                        if(response.ok) {
                            this.props.setCarrierLogo(FILES_URL + 'logo.png');
                        }else {
                            this.props.setCarrierLogo('/assets/images/logo.svg');
                        }
                    });
                });
            }

            this.props.setCarrierData(data.data.updateCarrier);
            this.setState({showSuccess: true})
        });
    };

    closeSnackbar = () => {
        this.setState({showSuccess: false});
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
        let {carrierName, carrierStreet, carrierCity, carrierState, carrierZipCode, carrierNumber, carrierEmail, notFactoring, logo, showSuccess} = this.state;
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

                        <input type='file' name='file' id='contained-button-file' accept='image/*' style={{display: 'none'}} onChange={event => this.setState({logo: event.target.files[0]})} />
                        <label htmlFor='contained-button-file' className={classes.uploadLabel}>
                            <Button variant='contained' color='secondary' component='span'>
                                Upload Logo (PNG)
                            </Button>

                            <Typography style={{marginLeft: 10}}>{logo ? logo.name: 'No file selected...'}</Typography>
                        </label>

                        <div className={classes.btnContainer}>
                            <Button type='submit' color='primary' variant='contained' onClick={this.updateCarrier}>Save</Button>
                        </div>
                    </div>

                    <div className={classes.settingsCard}>
                        <Typography variant='h6' color='textPrimary'>Factoring Company Information</Typography>
                        <FormControlLabel
                            style={{marginBottom: 20}}
                            control={
                                <Checkbox className={classes.checkBox} checked={notFactoring} onChange={() => this.setState({notFactoring: !notFactoring})} />
                            }
                            label='Not Factoring'
                        />

                        {notFactoring ? null : this.renderFactoringOptions()}

                        <div className={classes.btnContainer}>
                            <Button color='primary' variant='contained' onClick={this.updateCarrier}>Save</Button>
                        </div>
                    </div>

                    <Snackbar
                        open={showSuccess}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        onClose={this.closeSnackbar}
                        autoHideDuration={6000}
                    >
                        <Alert onClose={this.closeSnackbar} severity='success'>Successfully Updated Carrier Information!</Alert>
                    </Snackbar>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        tokenState: state.token,
        carrierState: state.carrier
    };
};
export default withStyles(MaterialSettingsStyles, {withTheme: true, defaultTheme})(connect(mapStateToProps, {setCarrierData, setCarrierLogo})(SettingsScreen));