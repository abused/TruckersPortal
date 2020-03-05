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
import {connect} from "react-redux";
import {MaterialDashboardStyles} from "../styles/DashboardStyles";
import {defaultTheme} from "../styles/Theme";
import {converToMoney} from "../utils/NumberUtils";
import {getAnnualRevenue, getCompletedLoads, getCurrentLoads, getDrivers, getUnpaidRevenue} from "../utils/ServerUtils";

class DashboardScreen extends React.Component {

    state = {
        annualRevenue: 0,
        unpaidLoads: 0,
        currentLoads: 0,
        completedLoads: 0,
        drivers: [],
        loaded: false
    };

    componentDidMount() {
        let token = this.props.tokenState.token;

        if(token) {
            getAnnualRevenue(token).then(data => this.setState({annualRevenue: data.data.getTotalRevenue.revenue}));
            getUnpaidRevenue(token).then(data => this.setState({unpaidLoads: data.data.getUnpaidLoads.revenue}));
            getCurrentLoads(token).then(data => this.setState({currentLoads: data.data.getCurrentLoads.loads}));
            getCompletedLoads(token).then(data => this.setState({completedLoads: data.data.getCompletedLoads.loads}));
            getDrivers(token).then(data => this.setState({drivers: data.data.getDrivers}, () => {
                this.setState({loaded: true});

            }));
        }
    }
    
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
        let {annualRevenue, unpaidLoads, currentLoads, completedLoads, drivers, loaded} = this.state;
        let {classes} = this.props;
        if(!loaded) {
            return <div className='loaderContainer'><div className='loader'>Loading...</div></div>;
        }

        return (
            <MuiThemeProvider theme={defaultTheme}>
                <div className={classes.content}>
                    <Grid container spacing={4} className={classes.contentGrid} direction='row' justify='center' wrap='wrap'>
                        {this.renderInfoCard(AccountBalanceWallet, 'Annual Revenue', converToMoney(annualRevenue), classes.blueGradient)}
                        {this.renderInfoCard(MoneyOff, 'Unpaid Loads', converToMoney(unpaidLoads), classes.redGradient)}
                        {this.renderInfoCard(LocalShipping, 'Current Loads', currentLoads, classes.orangeGradient)}
                        {this.renderInfoCard(PlaylistAddCheck, 'Completed Loads', completedLoads, classes.greenGradient)}

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
                                        {drivers.map(driver => (
                                            <TableRow key={driver.name}>
                                                <TableCell>{driver.name}</TableCell>
                                                <TableCell align='center'>{driver.loadsComplete.length}</TableCell>
                                                <TableCell align='center'>{driver.payCut}%</TableCell>
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

const mapStateToProps = state => {
    return {
        tokenState: state.token
    };
};

export default withStyles(MaterialDashboardStyles, {withTheme: true, defaultTheme})(connect(mapStateToProps)(DashboardScreen));