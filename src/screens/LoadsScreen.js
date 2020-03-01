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
    Snackbar
} from "@material-ui/core"
import {Alert} from "@material-ui/lab";
import {connect} from "react-redux";
import {defaultTheme} from "../styles/Theme";
import {MaterialLoadsStyles} from "../styles/LoadsStyles";
import {converToMoney} from "../utils/NumberUtils";
import {TablePaginationActions, rowsPerPage} from "../utils/TableUtils";
import LoadsCreateScreen from "./LoadsCreateScreen";
import {getLoads} from "../utils/ServerUtils";

class LoadsScreen extends React.Component {

    state = {
        page: 0,
        filter: 'All',
        addLoad: false,
        loads: [],
        showSuccess: false,
        loaded: false
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

    render() {
        let {page, addLoad, filter, loads, showSuccess, loaded} = this.state;
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
                                    <TableCell><Typography variant='h6'>Load Number</Typography></TableCell>
                                    <TableCell align='left'><Typography variant='h6'>Broker</Typography></TableCell>
                                    <TableCell align='left'><Typography variant='h6'>Rate</Typography></TableCell>
                                    <TableCell align='left'><Typography variant='h6'>Detention</Typography></TableCell>
                                    <TableCell align='left'><Typography variant='h6'>Driver</Typography></TableCell>
                                    <TableCell align='center'><Typography variant='h6'>Status</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.filterData().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(load => (
                                    <TableRow key={load.loadNumber} className='loadItem'>
                                        <TableCell>#{load.loadNumber}</TableCell>
                                        <TableCell align='left'>{load.brokerName}</TableCell>
                                        <TableCell align='left'>{converToMoney(load.rate)}</TableCell>
                                        <TableCell align='left'>{converToMoney(load.detention)}</TableCell>
                                        <TableCell align='left'>{load.driver}</TableCell>
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

                    <Snackbar
                        open={showSuccess}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        onClose={this.closeSnackbar}
                        autoHideDuration={6000}
                    >
                        <Alert onClose={this.closeSnackbar} severity='success'>Successfully Added Load!</Alert>
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