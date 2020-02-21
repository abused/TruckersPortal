import React from "react";
import {
    withStyles,
    Grid,
    Card,
    Typography,
    MuiThemeProvider,
    Table,
    TableBody,
    TableContainer,
    TableCell,
    TableRow,
    TableHead
} from "@material-ui/core";
import {LocalShipping, PlaylistAddCheck, MoneyOff, AccountBalanceWallet} from "@material-ui/icons";
import clsx from "clsx";
import {MaterialDashboardStyles} from "../styles/DashboardStyles";
import {defaultTheme} from "../styles/Theme";
import {converToMoney} from "../utils/NumberUtils";

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

class DashboardScreen extends React.Component {

    renderInfoCard = (Icon, title, text, gradient) => {
        let {classes} = this.props;

        return (
            <Grid item className={classes.infoItemGrid}>
                <Card className={clsx(classes.infoCard, gradient)}>
                        <div className={classes.infoIcon}>
                            <Icon />
                        </div>
                        <div className={classes.infoData}>
                            <Typography color='textSecondary'>{title}</Typography>
                            <Typography color='textSecondary' variant='h6'>{text}</Typography>
                        </div>
                </Card>
            </Grid>
        );
    };

    render() {
        let {classes} = this.props;

        return (
            <MuiThemeProvider theme={defaultTheme}>
                <div className={classes.content}>
                    <Grid container spacing={4} className={classes.contentGrid} direction='row' justify='center' wrap='wrap'>
                        {this.renderInfoCard(AccountBalanceWallet, 'Annual Revenue', converToMoney('10000'), classes.blueGradient)}
                        {this.renderInfoCard(MoneyOff, 'Unpaid Loads', converToMoney('4500'), classes.redGradient)}
                        {this.renderInfoCard(LocalShipping, 'Current Loads', '3', classes.orangeGradient)}
                        {this.renderInfoCard(PlaylistAddCheck, 'Completed Loads', '24', classes.greenGradient)}

                        <Grid item className={classes.tableGrid}>
                            <TableContainer className={classes.driverTable}>
                                <Table>
                                    <TableHead className={classes.tableHead}>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Driver</TableCell>
                                            <TableCell className={classes.tableCell} align='center'>Loads Completed</TableCell>
                                            <TableCell className={classes.tableCell} align='center'>Percentage Cut</TableCell>
                                            <TableCell className={classes.tableCell} align='center'>Earnings</TableCell>
                                            <TableCell className={classes.tableCell} align='center'>Phone #</TableCell>
                                            <TableCell className={classes.tableCell} align='center'>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {driverData.map(driver => (
                                            <TableRow key={driver.name}>
                                                <TableCell>{driver.name}</TableCell>
                                                <TableCell align='center'>{driver.loadsCompleted}</TableCell>
                                                <TableCell align='center'>{driver.payCut}</TableCell>
                                                <TableCell align='center'>{converToMoney(driver.earnings)}</TableCell>
                                                <TableCell align='center'>{driver.phoneNumber}</TableCell>
                                                <TableCell align='center' className={driver.status === 'Driving' ? classes.driving : classes.sitting}>{driver.status}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(MaterialDashboardStyles, {withTheme: true, defaultTheme})(DashboardScreen);