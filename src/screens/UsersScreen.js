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
    Checkbox,
    FormControlLabel
} from "@material-ui/core";
import {MaterialUserStyles} from "../styles/UsersStyles";
import {defaultTheme} from "../styles/Theme";
import {PERMISSIONS} from "../utils/Permissions";
import {TablePaginationActions, rowsPerPage, CustomTextMask} from "../utils/TableUtils";

let users = [
    {
        firstName: 'Mohammad',
        lastName: 'Alothman',
        email: 'techperson71@gmail.com',
        number: '(313) 247-2218',
        permissions: ['all']
    }
];

class UsersScreen extends React.Component {

    state = {
        page: 0,
        addUser: false,
        emptyFields: false,
        firstName: '',
        lastName: '',
        email: '',
        number: '(   )    -    ',
        permissions: [PERMISSIONS.ALL.key]
    };

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };

    addPermission = (event, key) => {
        let permissionsCopy = this.state.permissions;
        let checked = event.target.checked;
        let saved = permissionsCopy.indexOf(key) > -1;

        if(checked && !saved) {
            permissionsCopy.push(key);
        }else if (!checked && saved) {
            permissionsCopy.splice(permissionsCopy.indexOf(key), 1);
        }

        this.setState({permissions: permissionsCopy})
    };

    toggleAddUser = () => {
        this.setState({addUser: !this.state.addUser});
    };

    addUser = () => {
        let {firstName, lastName, email, number} = this.state;

        if(!firstName || !lastName || !email || !number.replace(/ /g, '').replace('-', '').replace('(', '').replace(')', '')) {
            this.setState({emptyFields: true});
            return;
        }
    };

    render() {
        let {page, addUser, emptyFields, firstName, lastName, email, number, permissions} = this.state;
        let {classes} = this.props;
        let emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

        return (
            <MuiThemeProvider theme={defaultTheme}>
                <div className={classes.content}>
                    <Dialog PaperProps={{className: classes.dialogPaper}} disableBackdropClick disableEscapeKeyDown open={addUser} onClose={this.toggleAddUser}>
                        <DialogTitle>
                            Add Panel User
                            {emptyFields ? <Typography className={classes.errorInput}>Please make sure all fields are filled in!</Typography> : null}
                        </DialogTitle>

                        <DialogContent className={classes.dialogContent}>
                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.inputColor}}
                                value={firstName}
                                label='First Name'
                                variant='outlined'
                                onChange={(event) => this.setState({firstName: event.target.value})}
                            />

                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.inputColor}}
                                value={lastName}
                                label='Last Name'
                                variant='outlined'
                                onChange={(event) => this.setState({lastName: event.target.value})}
                            />
                            <br />

                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.inputColor}}
                                value={email}
                                label='Email'
                                variant='outlined'
                                onChange={(event) => this.setState({email: event.target.value})}
                            />
                            <br />

                            <FormControl style={{margin: 10}}>
                                <InputLabel htmlFor="formatted-text-mask-input" className={classes.inputColor}>Phone Number</InputLabel>
                                <Input
                                    value={number}
                                    onChange={(event) => this.setState({number: event.target.value})}
                                    id="formatted-text-mask-input"
                                    inputComponent={CustomTextMask}
                                />
                            </FormControl>
                            <br />

                            {Object.keys(PERMISSIONS).map(id => (
                                <FormControlLabel
                                    key={PERMISSIONS[id].key}
                                    control={
                                        <Checkbox className={classes.checkBox} color='primary' checked={permissions.indexOf(PERMISSIONS[id].key) > -1} onChange={event => this.addPermission(event, PERMISSIONS[id].key)} value={PERMISSIONS[id].key} />
                                    }
                                    label={PERMISSIONS[id].display}
                                />
                            ))}
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.toggleAddUser} color="primary">Cancel</Button>
                            <Button onClick={this.addUser} color="primary">Add User</Button>
                        </DialogActions>
                    </Dialog>

                    <div className={classes.filterContainer}>
                        <Typography variant='h6'>Panel Users</Typography>
                        <Button variant='contained' color='primary' onClick={this.toggleAddUser}>Add User</Button>
                    </div>

                    <TableContainer className={classes.usersTable}>
                        <Table>
                            <TableHead className={classes.tableHead}>
                                <TableRow>
                                    <TableCell className={classes.tableCell} align='left'>Name</TableCell>
                                    <TableCell className={classes.tableCell} align='left'>Email</TableCell>
                                    <TableCell className={classes.tableCell} align='left'>Phone Number</TableCell>
                                    <TableCell className={classes.tableCell} align='left'>Permissions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                                    <TableRow key={user.firstName + user.lastName} className='loadItem'>
                                        <TableCell align='left'>{user.firstName + ' ' + user.lastName}</TableCell>
                                        <TableCell align='left'>{user.email}</TableCell>
                                        <TableCell align='left'>{user.number}</TableCell>
                                        <TableCell align='left'>{user.permissions.map(permission => PERMISSIONS[permission.toUpperCase()].display + ' ')}</TableCell>
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
                                        colSpan={0}
                                        count={users.length}
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

export default withStyles(MaterialUserStyles, {withTheme: true, defaultTheme})(UsersScreen);