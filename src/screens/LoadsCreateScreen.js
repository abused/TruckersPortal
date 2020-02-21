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
    IconButton
} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";
import {MaterialLoadsStyles} from "../styles/LoadsStyles";
import {defaultTheme} from "../styles/Theme";

class LoadsCreateScreen extends React.Component {

    state = {
        loadNumber: '',
        broker: '',
        rate: '',
        detention: '',
        status: 'In Progress',
        driver: ''
    };

    render() {
        let {loadNumber, broker, rate, detention, status, driver} = this.state;
        let {classes} = this.props;

        return (
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
                        <Select value={driver} MenuProps={{className: classes.selectMenu}} onChange={(event) => this.setState({driver: event.target.value})}>
                            <MenuItem className={classes.selectItem} value='Driver 1'>Driver 1</MenuItem>
                            <MenuItem className={classes.selectItem} value='Driver 2'>Driver 2</MenuItem>
                            <MenuItem className={classes.selectItem} value='Driver 3'>Driver 3</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant='filled' className={classes.inputField} fullWidth>
                        <InputLabel className={classes.inputLabel}>Status</InputLabel>
                        <Select value={status} MenuProps={{className: classes.selectMenu}} onChange={(event) => this.setState({status: event.target.value})}>
                            <MenuItem className={classes.selectItem} value='In Progress'>In Progress</MenuItem>
                            <MenuItem className={classes.selectItem} value='Complete'>Complete</MenuItem>
                            <MenuItem className={classes.selectItem} value='Canceled'>Canceled</MenuItem>
                        </Select>
                    </FormControl>

                    <input type='file' id='contained-button-file' accept='image/*,.pdf,.docx' style={{display: 'none'}} />
                    <label htmlFor='contained-button-file' className={classes.uploadLabel}>
                        <Button variant='contained' color='primary' component='span'>
                            Upload Rate Confirmation
                        </Button>

                        <Typography style={{marginLeft: 10}}>No file selected...</Typography>
                    </label>

                    <label htmlFor='contained-button-file' className={classes.uploadLabel}>
                        <Button variant='contained' color='secondary' component='span'>
                            Upload BOL (Optional)
                        </Button>

                        <Typography style={{marginLeft: 10}}>No file selected...</Typography>
                    </label>

                    <div className={classes.btnContainer}><Button variant='contained' color='secondary' className={classes.submitBtn} onClick={() => console.log('Adding Load')}>Submit</Button></div>
                </div>
            </div>
        );
    }
}

export default withStyles(MaterialLoadsStyles, {withTheme: true, defaultTheme})(LoadsCreateScreen)