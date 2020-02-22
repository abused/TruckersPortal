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
    InputAdornment
} from "@material-ui/core";
import {defaultTheme} from "../styles/Theme";
import {MaterialDriversStyles} from "../styles/DriversStyles";
import {converToMoney} from "../utils/NumberUtils";
import {TablePaginationActions, rowsPerPage, CustomTextMask} from "../utils/TableUtils";

let driverData = [
    {
        name: 'Driver 1',
        loadsCompleted: '2',
        payCut: '20%',
        earnings: '5400',
        phoneNumber: '(313) 315-1514',
        status: 'Driving'
    },
    {
        name: 'Driver 2',
        loadsCompleted: '0',
        payCut: '20%',
        earnings: '0',
        phoneNumber: '(734) 321-6528',
        status: 'Sitting'
    },
    {
        name: 'Driver 3',
        loadsCompleted: '1',
        payCut: '15%',
        earnings: '2200',
        phoneNumber: '(313) 315-1514',
        status: 'Driving'
    },
    {
        name: 'Driver 4',
        loadsCompleted: '6',
        payCut: '20%',
        earnings: '16350',
        phoneNumber: '(734) 321-1258',
        status: 'Driving'
    }
];

class DriversScreen extends React.Component {

    state = {
        filter: 'All',
        page: 0,
        addDriver: false,
        driverName: '',
        payCut: '',
        numberMask: '(   )    -    ',
        emptyFields: false
    };

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };

    setFilter = (filterType) => {
        this.setState({filter: filterType});
    };

    filterData = () => {
        let {filter} = this.state;

        return driverData.filter((driver) => {
            if(filter === 'All')
                return true;

            return driver.status === filter;
        }).slice(0).reverse();
    };

    toggleAddDriver = () => {
        this.setState({addDriver: !this.state.addDriver});
    };

    addDriver = () => {
        let {driverName, payCut, numberMask} = this.state;
        if(!driverName.replace(/ /g, '') || !payCut.replace(/ /g, '') || !numberMask.replace(/ /g, '').replace('-', '').replace('(', '').replace(')', '')) {
            this.setState({emptyFields: true});
            return;
        }
    };

    render() {
        let {page, filter, addDriver, driverName, payCut, numberMask, emptyFields} = this.state;
        let {classes} = this.props;
        let emptyRows = rowsPerPage - Math.min(rowsPerPage, driverData.length - page * rowsPerPage);

        return (
            <MuiThemeProvider theme={defaultTheme}>
                <div className={classes.content}>
                    <Dialog PaperProps={{className: classes.dialogPaper}} disableBackdropClick disableEscapeKeyDown open={addDriver} onClose={this.toggleAddDriver}>
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
                            <Button onClick={this.addDriver} color="primary">Add Driver</Button>
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
                                    <TableRow key={driver.name} className='loadItem'>
                                        <TableCell align='left'>{driver.name}</TableCell>
                                        <TableCell align='left'>{driver.loadsCompleted}</TableCell>
                                        <TableCell align='left'>{driver.payCut}</TableCell>
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
                                        count={driverData.length}
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

export default withStyles(MaterialDriversStyles, {withTheme: true, defaultTheme})(DriversScreen);