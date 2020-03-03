import React from "react";
import {
    withStyles,
    MuiThemeProvider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableFooter,
    TablePagination,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    Snackbar,
    Menu,
    MenuItem
} from "@material-ui/core"
import {Alert} from "@material-ui/lab";
import {Description, Publish, Update, Visibility, DoneAll, NoteAdd, AssignmentTurnedIn, HourglassEmpty, Cancel} from "@material-ui/icons";
import {connect} from "react-redux";
import {defaultTheme} from "../styles/Theme";
import {MaterialLoadsStyles} from "../styles/LoadsStyles";
import {converToMoney} from "../utils/NumberUtils";
import {TablePaginationActions, rowsPerPage} from "../utils/TableUtils";
import LoadsCreateScreen from "./LoadsCreateScreen";
import {getLoads, updateLoad} from "../utils/ServerUtils";
import {FILES_URL, uploadDocument} from "../utils/FileUtils";

class LoadsScreen extends React.Component {

    state = {
        page: 0,
        filter: 'All',
        addLoad: false,
        loads: [],
        showSuccess: false,
        loaded: false,
        selectedLoad: null,
        rateConLink: '',
        bolLink: '',
        anchorEl: null
    };

    constructor(props) {
        super(props);
        this.handleCreateLoad = this.handleCreateLoad.bind(this);
    }

    componentDidMount() {
        let token = this.props.tokenState.token;

        if(token) {
            getLoads(token).then(data => this.setState({loads: data.data.getLoads ? data.data.getLoads : []}));
        }

        this.setState({loaded: true});
    }

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };

    setFilter = (filterType) => {
        this.setState({filter: filterType});
    };

    filterData = () => {
        let {filter, loads} = this.state;

        return loads.filter((load) => {
            if(filter === 'All')
                return true;

            return load.status === filter;
        }).slice(0).reverse();
    };

    handleCreateLoad = () => {
        let {addLoad} = this.state;
        this.setState({addLoad: !addLoad, showSuccess: addLoad});
    };

    closeSnackbar = () => {
        this.setState({showSuccess: false});
    };

    selectLoad = (event, load) => {
        fetch(FILES_URL + load.id + '-rate.pdf', {method: 'GET'}).then(response => {
            if(response.ok) {
                this.setState({rateConLink: FILES_URL + load.id + '-rate.pdf'});
            }else {
                fetch(FILES_URL + load.id + '-rate.png', {method: 'GET'}).then(pngRes => {
                    if(pngRes.ok) {
                        this.setState({rateConLink: FILES_URL + load.id + '-rate.png'});
                    }
                });
            }
        });

        fetch(FILES_URL + load.id + '-bol.pdf', {method: 'GET'}).then(response => {
            if(response.ok) {
                this.setState({bolLink: FILES_URL + load.id + '-bol.pdf'});
            }else {
                fetch(FILES_URL + load.id + '-bol.png', {method: 'GET'}).then(pngRes => {
                    if(pngRes.ok) {
                        this.setState({bolLink: FILES_URL + load.id + '-bol.png'});
                    }
                });
            }
        });

        this.setState({anchorEl: event.currentTarget, selectedLoad: load});
    };

    updateStatus = (status) => {
        let {selectedLoad} = this.state;

        updateLoad(this.props.tokenState.token, selectedLoad.id, status, selectedLoad.paid).then(data => {
            this.setState({showSuccess: true, anchorEl: null});
            this.componentDidMount();
        });
    };

    setPaid = () => {
        let {selectedLoad} = this.state;

        updateLoad(this.props.tokenState.token, selectedLoad.id, selectedLoad.status, true).then(data => {
            this.setState({showSuccess: true, anchorEl: null});
            this.componentDidMount();
        });
    };

    uploadDoc = (event, bol) => {
        let {selectedLoad} = this.state;
        let file = event.target.files[0];

        uploadDocument(selectedLoad.id, bol ? null : file, bol ? file : null);
        this.setState({showSuccess: true, anchorEl: null});
    };

    render() {
        let {page, addLoad, filter, loads, showSuccess, loaded, selectedLoad, anchorEl, rateConLink, bolLink} = this.state;
        let {classes} = this.props;
        let emptyRows = rowsPerPage - Math.min(rowsPerPage, loads.length - page * rowsPerPage);
        if(addLoad) {
            return <LoadsCreateScreen  handleCreateLoad={this.handleCreateLoad}/>;
        }

        if(!loaded) {
            return <div className='loaderContainer'><div className='loader'>Loading...</div></div>;
        }

        return (
            <MuiThemeProvider theme={defaultTheme}>
                <div className={classes.content}>
                    <div className={classes.filterContainer}>
                        <div className={classes.filterHeader}>
                            <Typography variant='h6'>Filter Options</Typography>
                            <Button variant='contained' color='primary' onClick={this.handleCreateLoad}>Add Load</Button>
                        </div>

                        <List className={classes.filterOptions}>
                            <ListItem button key='All' className={classes.filterItem} selected={filter === 'All'} onClick={() => this.setFilter('All')}><ListItemText>All</ListItemText></ListItem>
                            <ListItem button key='Complete' className={classes.filterItem} selected={filter === 'Complete'} onClick={() => this.setFilter('Complete')}><ListItemText>Complete</ListItemText></ListItem>
                            <ListItem button key='InProgress' className={classes.filterItem} selected={filter === 'In Progress'} onClick={() => this.setFilter('In Progress')}><ListItemText>In Progress</ListItemText></ListItem>
                            <ListItem button key='Canceled' className={classes.filterItem} selected={filter === 'Canceled'} onClick={() => this.setFilter('Canceled')}><ListItemText>Canceled</ListItemText></ListItem>
                        </List>
                    </div>

                    <TableContainer className={classes.loadsTable}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'><Typography variant='h6'>+</Typography></TableCell>
                                    <TableCell align='left'><Typography variant='h6'>Load Number</Typography></TableCell>
                                    <TableCell align='left'><Typography variant='h6'>Broker</Typography></TableCell>
                                    <TableCell align='left'><Typography variant='h6'>Rate</Typography></TableCell>
                                    <TableCell align='left'><Typography variant='h6'>Detention</Typography></TableCell>
                                    <TableCell align='left'><Typography variant='h6'>Driver</Typography></TableCell>
                                    <TableCell align='left'><Typography variant='h6'>Paid</Typography></TableCell>
                                    <TableCell align='center'><Typography variant='h6'>Status</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.filterData().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(load => (
                                    <TableRow key={load.loadNumber}>
                                        <TableCell className='loadItem' align='center' onClick={event => this.selectLoad(event, load)}><Description/></TableCell>
                                        <TableCell align='left'>#{load.loadNumber}</TableCell>
                                        <TableCell align='left'>{load.brokerName}</TableCell>
                                        <TableCell align='left'>{converToMoney(load.rate)}</TableCell>
                                        <TableCell align='left'>{converToMoney(load.detention)}</TableCell>
                                        <TableCell align='left'>{load.driver}</TableCell>
                                        <TableCell align='left'>{load.paid ? 'Yes' : 'No'}</TableCell>
                                        <TableCell align='center' className={load.status === 'Complete' ? classes.completeCell : load.status === 'In Progress' ? classes.inProgressCell : classes.canceledCell}>{load.status}</TableCell>
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
                                        count={loads.length}
                                        page={page}
                                        onChangePage={this.handleChangePage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>

                    {
                        selectedLoad && anchorEl ?
                            <Menu
                                className={classes.dropdownMenu}
                                open={Boolean(anchorEl)}
                                keepMounted
                                onClose={() => this.setState({anchorEl: null})}
                                anchorEl={anchorEl}
                            >
                                {rateConLink ? <MenuItem className={classes.menuItems} onClick={() => window.open(rateConLink, '_blank')}><Visibility />   Show Rate Confirmation</MenuItem> : <MenuItem className={classes.menuItems}>
                                    <input type='file' name='file' id='contained-button-file' accept='image/*,.pdf' style={{display: 'none'}} onChange={event => this.uploadDoc(event, false)} />
                                    <label htmlFor='contained-button-file'>
                                        <NoteAdd />   Upload Rate Confirmation
                                    </label>
                                </MenuItem>}
                                {bolLink ? <MenuItem className={classes.menuItems} onClick={() => window.open(bolLink, '_blank')}><Visibility />   Show BOL</MenuItem> : <MenuItem className={classes.menuItems}>
                                    <input type='file' name='file' id='contained-button-file2' accept='image/*,.pdf' style={{display: 'none'}} onChange={event => this.uploadDoc(event, true)} />
                                    <label htmlFor='contained-button-file2'>
                                        <Publish />   Upload BOL
                                    </label>
                                </MenuItem>}
                                <MenuItem className={classes.menuItems} onClick={() => this.updateStatus('Complete')}><AssignmentTurnedIn />   Set Complete</MenuItem>
                                <MenuItem className={classes.menuItems} onClick={() => this.updateStatus('In Progress')}><HourglassEmpty />   Set In Progress</MenuItem>
                                <MenuItem className={classes.menuItems} onClick={() => this.updateStatus('Canceled')}><Cancel />   Set Canceled</MenuItem>
                                {selectedLoad.paid ? null : <MenuItem className={classes.menuItems} onClick={this.setPaid}><DoneAll />   Set Paid</MenuItem>}
                            </Menu> : null
                    }

                    <Snackbar
                        open={showSuccess}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        onClose={this.closeSnackbar}
                        autoHideDuration={6000}
                    >
                        <Alert onClose={this.closeSnackbar} severity='success'>Successfully Updated Load!</Alert>
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
export default withStyles(MaterialLoadsStyles, {withTheme: true, defaultTheme})(connect(mapStateToProps)(LoadsScreen));