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
    Button
} from "@material-ui/core";
import {defaultTheme} from "../styles/Theme";
import {MaterialLoadsStyles} from "../styles/LoadsStyles";
import {converToMoney} from "../utils/NumberUtils";
import {TablePaginationActions, rowsPerPage} from "../utils/TableUtils";
import LoadsCreateScreen from "./LoadsCreateScreen";

let loads = [
    {
        loadNumber: '6876760',
        brokerName: 'XPO Logistics',
        rate: '3000',
        driver: 'Driver 1',
        detention: '0',
        status: 'Complete'
    },
    {
        loadNumber: '5158351',
        brokerName: 'TQL',
        rate: '2200',
        driver: 'Driver 2',
        detention: '350',
        status: 'In Progress'
    },
    {
        loadNumber: '2147251',
        brokerName: 'TQL',
        rate: '1200',
        driver: 'Driver 1',
        detention: '0',
        status: 'Canceled'
    },
    {
        loadNumber: '354183',
        brokerName: 'LandStar',
        rate: '3600',
        driver: 'Driver 1',
        detention: '0',
        status: 'Complete'
    },
    {
        loadNumber: '2145156',
        brokerName: 'AMZN Logistics',
        rate: '2600',
        driver: 'Driver 2',
        detention: '0',
        status: 'Complete'
    }
];

class LoadsScreen extends React.Component {

    state = {
        page: 0,
        filter: 'All',
        addLoad: false
    };

    constructor(props) {
        super(props);
        this.handleCreateLoad = this.handleCreateLoad.bind(this);
    }

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };

    setFilter = (filterType) => {
        this.setState({filter: filterType});
    };

    filterData = () => {
        let {filter} = this.state;

        return loads.filter((load) => {
            if(filter === 'All')
                return true;

            return load.status === filter;
        }).slice(0).reverse();
    };

    handleCreateLoad = () => {
        this.setState({addLoad: !this.state.addLoad});
    };

    render() {
        let {page, addLoad, filter} = this.state;
        let {classes} = this.props;
        let emptyRows = rowsPerPage - Math.min(rowsPerPage, loads.length - page * rowsPerPage);
        if(addLoad) {
            return <LoadsCreateScreen  handleCreateLoad={this.handleCreateLoad}/>;
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
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(MaterialLoadsStyles, {withTheme: true, defaultTheme})(LoadsScreen);