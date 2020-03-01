import React from 'react';
import {
    AppBar,
    Toolbar,
    Menu,
    MenuItem,
    IconButton,
    Typography,
    Button,
    withStyles,
    Drawer,
    List,
    Divider,
    CssBaseline,
    MuiThemeProvider
} from "@material-ui/core";
import {Redirect} from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import {AccountCircle} from "@material-ui/icons";
import {NavStyles, MaterialNavStyles} from './../styles/NavStyles';
import {defaultTheme} from "./../styles/Theme";
import {renderNavigation, Navigation} from "./../utils/Navigation";
import clsx from "clsx";
import DashboardScreen from "./../screens/DashboardScreen";
import {connect} from "react-redux";
import {setLoggedIn, setToken} from "../redux/reducers/TokenReducer";

class PanelPage extends React.Component {

    state = {
        userMenu: null,
        sideNavOpen: true,
        //Set "Home" Defaults
        Screen: DashboardScreen,
        screenName: 'Dashboard'
    };

    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.windowResizeEvent.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResizeEvent.bind(this));
    }

    windowResizeEvent = () => {
        if(window.innerWidth < 500) {
            this.setState({sideNavOpen: false});
        }
    };

    navigate = (Screen, screenName) => {
        this.setState({Screen, screenName});
    };

    logout = () => {
        this.props.setLoggedIn(false);
    };

    renderUserMenu = () => {
        let {userMenu} = this.state;
        let {classes} = this.props;

        if(!this.props.tokenState.loggedIn) {
            return <Redirect to='/' />;
        }

        return (
            <Menu
                open={Boolean(userMenu)}
                anchorEl={userMenu}
                id='primary-search-account-menu'
                onClose={() => this.setState({userMenu: null})}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'left'}}
                className={classes.dropdownMenu}
            >
                <MenuItem className={classes.menuItems} onClick={() => {
                    let settingsOpt = Navigation[5];
                    this.navigate(settingsOpt.screen, settingsOpt.name);
                    this.setState({userMenu: null})
                }}>My Account</MenuItem>
                <MenuItem className={classes.logoutMenuItem} onClick={this.logout}>Logout</MenuItem>
            </Menu>
        );
    };

    render() {
        let {sideNavOpen, Screen, screenName} = this.state;
        let {classes} = this.props;

        return (
            <MuiThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <div style={NavStyles.body}>
                    <AppBar position='fixed' className={clsx(classes.topNav, {[classes.topNavShift]: sideNavOpen})}>
                        <Toolbar>
                            <IconButton edge='start' color='inherit' onClick={() => this.setState({sideNavOpen: !sideNavOpen})}>
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant='h6' noWrap>{screenName}</Typography>

                            <div style={{flexGrow: 1}}/>
                            <div className={classes.desktopUser}>
                                <Button color='inherit' style={{textTransform: 'none'}}
                                        onClick={(event) => this.setState({userMenu: event.currentTarget})}>
                                    <AccountCircle style={{marginRight: 5}}/>
                                    <Typography variant='h6' noWrap color='inherit'>
                                        {this.props.tokenState.user.firstName}
                                    </Typography>
                                </Button>
                            </div>

                            <div className={classes.mobileUser}>
                                <IconButton edge='start' color='inherit'>
                                    <AccountCircle style={{marginRight: 5}}/>
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>

                    {this.renderUserMenu()}

                    <Drawer
                        variant='permanent'
                        className={
                            clsx(classes.sideNav, {
                                [classes.sideNavOpen]: sideNavOpen,
                                [classes.sideNavClose]: !sideNavOpen
                            })
                        }
                        classes={{
                            paper: clsx({
                                [classes.sideNavOpen]: sideNavOpen,
                                [classes.sideNavClose]: !sideNavOpen
                            })
                        }}
                    >
                        <Typography className={classes.header} variant='h6' color='textSecondary'>
                            <img className={clsx(classes.logo, {[classes.logoShift]: !sideNavOpen})} src={this.props.carrierState.logo} alt=''/>
                            {sideNavOpen ? this.props.carrierState.name ? this.props.carrierState.name : ' Truckers Portal' : null}
                        </Typography>
                        <Divider />

                        <List>
                            {renderNavigation(this.navigate, classes, screenName)}
                        </List>
                    </Drawer>

                    <div className={clsx(classes.content, {[classes.contentShift]: sideNavOpen})}>
                        <div className={classes.header} />
                        {Screen != null ? <Screen /> : 'Unknown Screen Error'}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        tokenState: state.token,
        carrierState: state.carrier
    };
};

export default withStyles(MaterialNavStyles, {withTheme: true, defaultTheme})(connect(mapStateToProps, {
    setToken,
    setLoggedIn
})(PanelPage));