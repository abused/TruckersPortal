import React from "react";
import {
    withStyles,
    TextField,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    Button,
    Typography,
    IconButton,
    MuiThemeProvider, Checkbox, FormControlLabel
} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";
import {connect} from "react-redux";
import {MaterialLoadsStyles} from "../styles/LoadsStyles";
import {defaultTheme} from "../styles/Theme";
import {uploadDocument} from "../utils/FileUtils";
import {addLoad, getDrivers} from "../utils/ServerUtils";

class LoadsCreateScreen extends React.Component {

    state = {
        loadNumber: '',
        broker: '',
        rate: '',
        detention: '',
        status: 'In Progress',
        driver: '',
        paid: false,
        rateCon: null,
        bol: null,
        drivers: []
    };

    componentDidMount() {
        let token = this.props.tokenState.token;

        if(token) {
            getDrivers(token).then(data => {
                this.setState({drivers: data.data.getDrivers ? data.data.getDrivers : []});
            });
        }
    }

    addLoad = () => {
        let {loadNumber, broker, rate, detention, status, driver, paid, rateCon, bol} = this.state;
        let token = this.props.tokenState.token;

        if(token) {
            addLoad(token, broker, loadNumber, rate, detention, driver, status, paid).then(data => {
                let loadId = data.data.addLoad.id;
                uploadDocument(loadId, rateCon, bol);
                this.props.handleCreateLoad();
            });
        }
    };

    render() {
        let {loadNumber, broker, rate, detention, status, driver, paid, rateCon, bol, drivers} = this.state;
        let {classes} = this.props;

        return (
            <MuiThemeProvider theme={defaultTheme}>
                <div className={classes.content}>
                    <IconButton className={classes.backButton} onClick={this.props.handleCreateLoad}>
                        <ArrowBack />
                        <Typography>Go Back</Typography>
                    </IconButton>

                    <div className={classes.createContainer}>
                        <Typography variant='h5' style={{marginBottom: 20}}>Add Load</Typography>

                        <TextField
                            className={classes.inputField}
                            InputLabelProps={{className: classes.textFieldProps}}
                            label='Load Number'
                            value={loadNumber}
                            id='standard-basic'
                            variant='outlined'
                            fullWidth
                            onChange={(event) => this.setState({loadNumber: event.target.value})}
                        />

                        <TextField
                            className={classes.inputField}
                            InputLabelProps={{className: classes.textFieldProps}}
                            label='Broker'
                            value={broker}
                            id='standard-basic'
                            variant='outlined'
                            fullWidth
                            onChange={(event) => this.setState({broker: event.target.value})}
                        />

                        <TextField
                            className={classes.inputField}
                            InputLabelProps={{className: classes.textFieldProps}}
                            label='Rate'
                            value={rate}
                            id='standard-basic'
                            variant='outlined'
                            fullWidth
                            onChange={(event) => this.setState({rate: event.target.value})}
                        />

                        <TextField
                            className={classes.inputField}
                            InputLabelProps={{className: classes.textFieldProps}}
                            label='Detention'
                            value={detention}
                            id='standard-basic'
                            variant='outlined'
                            fullWidth
                            onChange={(event) => this.setState({detention: event.target.value})}
                        />

                        <FormControl variant='filled' className={classes.inputField} fullWidth>
                            <InputLabel className={classes.inputLabel}>Driver</InputLabel>
                            <Select value={driver} onChange={(event) => this.setState({driver: event.target.value})}>
                                {drivers.map(driver => (<MenuItem key={driver.name} className={classes.selectItem} value={driver.id}>{driver.name}</MenuItem>))}
                            </Select>
                        </FormControl>

                        <FormControl variant='filled' className={classes.inputField} fullWidth>
                            <InputLabel className={classes.inputLabel}>Status</InputLabel>
                            <Select value={status} onChange={(event) => this.setState({status: event.target.value})}>
                                <MenuItem className={classes.selectItem} value='In Progress'>In Progress</MenuItem>
                                <MenuItem className={classes.selectItem} value='Complete'>Complete</MenuItem>
                                <MenuItem className={classes.selectItem} value='Canceled'>Canceled</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControlLabel
                            style={{marginBottom: 10}}
                            control={
                                <Checkbox className={classes.checkBox} checked={paid} onChange={() => this.setState({paid: !paid})} />
                            }
                            label='Has Load Been Paid?'
                        />

                        <input type='file' id='contained-button-file' accept='image/*,.pdf,.docx' style={{display: 'none'}}  onChange={event => this.setState({rateCon: event.target.files[0]})} />
                        <label htmlFor='contained-button-file' className={classes.uploadLabel}>
                            <Button variant='contained' color='primary' component='span'>
                                Upload Rate Confirmation
                            </Button>

                            <Typography style={{marginLeft: 10}}>{rateCon ? rateCon.name : 'No file selected...'}</Typography>
                        </label>

                        <input type='file' id='contained-button-file-2' accept='image/*,.pdf' style={{display: 'none'}}  onChange={event => this.setState({bol: event.target.files[0]})} />
                        <label htmlFor='contained-button-file-2' className={classes.uploadLabel} >
                            <Button variant='contained' color='secondary' component='span'>
                                Upload BOL (Optional)
                            </Button>

                            <Typography style={{marginLeft: 10}}>{bol ? bol.name : 'No file selected...'}</Typography>
                        </label>

                        <div className={classes.btnContainer}><Button variant='contained' color='secondary' className={classes.submitBtn} onClick={this.addLoad}>Submit</Button></div>
                    </div>
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
export default withStyles(MaterialLoadsStyles, {withTheme: true, defaultTheme})(connect(mapStateToProps)(LoadsCreateScreen))