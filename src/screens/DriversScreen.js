import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    withStyles,
    MuiThemeProvider,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    TableFooter,
    TablePagination,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    Snackbar,
    Menu,
    MenuItem
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {defaultTheme} from "../styles/Theme";
import {MaterialDriversStyles} from "../styles/DriversStyles";
import {converToMoney} from "../utils/NumberUtils";
import {TablePaginationActions, rowsPerPage, CustomTextMask} from "../utils/TableUtils";
import {connect} from "react-redux";
import {addDriver, updateDriverStatus, getDrivers} from "../utils/ServerUtils";
import {Cancel, Description, DriveEta, EventSeat} from "@material-ui/icons";

class DriversScreen extends React.Component {

    state = {
        filter: 'All',
        page: 0,
        addDriverDialog: false,
        driverName: '',
        payCut: '',
        numberMask: '(   )    -    ',
        emptyFields: false,
        loaded: false,
        drivers: [],
        showSuccess: false,
        anchorEl: null,
        selectedDriver: null
    };

    componentDidMount() {
        let token = this.props.tokenState.token;

        if(token) {
            getDrivers(token).then(data => this.setState({drivers: data.data.getDrivers}, () => {
                this.setState({loaded: true});
            }));
        }
    }

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };

    setFilter = (filterType) => {
        this.setState({filter: filterType});
    };

    filterData = () => {
        let {filter, drivers} = this.state;

        return drivers.filter((driver) => {
            if(filter === 'All')
                return true;

            return driver.status === filter;
        }).slice(0).reverse();
    };

    toggleAddDriver = () => {
        this.setState({addDriverDialog: !this.state.addDriverDialog});
    };

    createDriver = () => {
        let {driverName, payCut, numberMask} = this.state;
        if(!driverName.replace(/ /g, '') || !payCut.replace(/ /g, '') || !numberMask.replace(/ /g, '').replace('-', '').replace('(', '').replace(')', '')) {
            this.setState({emptyFields: true});
            return;
        }

        addDriver(this.props.tokenState.token, driverName, payCut, numberMask).then(data => {
            this.setState({addDriverDialog: false, showSuccess: true});
            this.componentDidMount();
        });
    };

    closeSnackbar = () => {
        this.setState({showSuccess: false});
    };

    selectDriver = (event, driver) => {
        this.setState({anchorEl: event.currentTarget, selectedDriver: driver});
    };

    updateStatus = (status) => {
        let {selectedDriver} = this.state;

        updateDriverStatus(this.props.tokenState.token, selectedDriver.id, status).then(data => {
            this.setState({showSuccess: true, anchorEl: null});
            this.componentDidMount();
        });
    };

    render() {
        let {page, filter, addDriverDialog, driverName, payCut, numberMask, emptyFields, loaded, drivers, showSuccess, selectedDriver, anchorEl} = this.state;
        let {classes} = this.props;
        let emptyRows = rowsPerPage - Math.min(rowsPerPage, drivers.length - page * rowsPerPage);

        if(!loaded) {
            return <div className='loaderContainer'><div className='loader'>Loading...</div></div>;
        }

        return (
            <MuiThemeProvider theme={defaultTheme}>
                <div className={classes.content}>
                    <Dialog PaperProps={{className: classes.dialogPaper}} disableBackdropClick disableEscapeKeyDown open={addDriverDialog} onClose={this.toggleAddDriver}>
                        <DialogTitle>
                            Add Driver
                            {emptyFields ? <Typography className={classes.errorInput}>Please make sure all fields are filled in!</Typography> : null}
                        </DialogTitle>
                        <DialogContent className={classes.dialogContent}>
                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.inputColor}}
                                value={driverName}
                                label='Driver Name'
                                variant='outlined'
                                onChange={(event) => this.setState({driverName: event.target.value})}
                            />

                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.inputColor}}
                                value={payCut}
                                label='Pay Cut'
                                variant='outlined'
                                InputProps={{startAdornment: <InputAdornment position='start'><Typography className={classes.inputColor}>%</Typography></InputAdornment>}}
                                onChange={(event) => this.setState({payCut: event.target.value})}
                            />

                            <FormControl>
                                <InputLabel htmlFor="formatted-text-mask-input" className={classes.inputColor}>Phone Number</InputLabel>
                                <Input
                                    value={numberMask}
                                    onChange={(event) => this.setState({numberMask: event.target.value})}
                                    id="formatted-text-mask-input"
                                    inputComponent={CustomTextMask}
                                />
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.toggleAddDriver} color="primary">Cancel</Button>
                            <Button onClick={this.createDriver} color="primary">Add Driver</Button>
                        </DialogActions>
                    </Dialog>

                    <div className={classes.filterContainer}>
                        <div className={classes.filterHeader}>
                            <Typography variant='h6'>Filter Options</Typography>
                            <Button variant='contained' color='primary' onClick={this.toggleAddDriver}>Add Driver</Button>
                        </div>

                        <List className={classes.filterOptions}>
                            <ListItem button key='All' className={classes.filterItem} selected={filter === 'All'} onClick={() => this.setFilter('All')}><ListItemText>All</ListItemText></ListItem>
                            <ListItem button key='Driving' className={classes.filterItem} selected={filter === 'Driving'} onClick={() => this.setFilter('Driving')}><ListItemText>Driving</ListItemText></ListItem>
                            <ListItem button key='Sitting' className={classes.filterItem} selected={filter === 'Sitting'} onClick={() => this.setFilter('Sitting')}><ListItemText>Sitting</ListItemText></ListItem>
                            <ListItem button key='Fired' className={classes.filterItem} selected={filter === 'Fired'} onClick={() => this.setFilter('Fired')}><ListItemText>Fired</ListItemText></ListItem>
                        </List>
                    </div>

                    <TableContainer className={classes.driverTable}>
                        <Table>
                            <TableHead className={classes.tableHead}>
                                <TableRow>
                                    <TableCell className={classes.tableCell} align='center'><Typography variant='h6'>+</Typography></TableCell>
                                    <TableCell className={classes.tableCell} align='left'>Driver</TableCell>
                                    <TableCell className={classes.tableCell} align='left'>Loads Completed</TableCell>
                                    <TableCell className={classes.tableCell} align='left'>Percentage Cut</TableCell>
                                    <TableCell className={classes.tableCell} align='left'>Earnings</TableCell>
                                    <TableCell className={classes.tableCell} align='left'>Phone #</TableCell>
                                    <TableCell className={classes.tableCell} align='center'>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.filterData().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(driver => (
                                    <TableRow key={driver.name}>
                                        <TableCell className='loadItem' align='center' onClick={event => this.selectDriver(event, driver)}><Description/></TableCell>
                                        <TableCell align='left'>{driver.name}</TableCell>
                                        <TableCell align='left'>{driver.loadsComplete.length}</TableCell>
                                        <TableCell align='left'>{driver.payCut}%</TableCell>
                                        <TableCell align='left'>{converToMoney(driver.earnings)}</TableCell>
                                        <TableCell align='left'>{driver.phoneNumber}</TableCell>
                                        <TableCell align='center' className={driver.status === 'Driving' ? classes.drivingCell : driver.status === 'Sitting' ? classes.sittingCell : classes.firedCell}>{driver.status}</TableCell>
                                    </TableRow>
                                ))}

                                {emptyRows > 0 ? <TableRow style={{height: 53 * emptyRows}}><TableCell colSpan={6} /></TableRow> : null}
                            </TableBody>

                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[]}
                                        labelDisplayedRows={() => ''}
                                        rowsPerPage={rowsPerPage}
                                        colSpan={3}
                                        count={drivers.length}
                                        page={page}
                                        onChangePage={this.handleChangePage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>

                    {
                        selectedDriver && anchorEl ?
                            <Menu
                                className={classes.dropdownMenu}
                                open={Boolean(anchorEl)}
                                keepMounted
                                onClose={() => this.setState({anchorEl: null})}
                                anchorEl={anchorEl}
                            >
                                <MenuItem className={classes.menuItems} onClick={() => this.updateStatus('Driving')}><DriveEta />   Set Driving</MenuItem>
                                <MenuItem className={classes.menuItems} onClick={() => this.updateStatus('Sitting')}><EventSeat />   Set Sitting</MenuItem>
                                <MenuItem className={classes.menuItems} onClick={() => this.updateStatus('Fired')}><Cancel />   Fire Driver</MenuItem>
                            </Menu> : null
                    }

                    <Snackbar
                        open={showSuccess}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        onClose={this.closeSnackbar}
                        autoHideDuration={6000}
                    >
                        <Alert onClose={this.closeSnackbar} severity='success'>Successfully Updated Driver!</Alert>
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

export default withStyles(MaterialDriversStyles, {withTheme: true, defaultTheme})(connect(mapStateToProps)(DriversScreen));