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
    ThemeProvider,
    Drawer,
    List,
    Divider
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {AccountCircle} from "@material-ui/icons";
import {NavStyles, MaterialNavStyles} from './styles/NavStyles';
import {defaultTheme} from "./styles/Theme";
import {renderNavigation} from "./utils/Navigation";
import clsx from "clsx";

class App extends React.Component {

    state = {
        userMenu: null,
        sideNavOpen: true
    };

    renderUserMenu = () => {
        let {userMenu} = this.state;

        return (
            <Menu
                open={Boolean(userMenu)}
                anchorEl={userMenu}
                id='primary-search-account-menu'
                onClose={() => this.setState({userMenu: null})}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{vertical: 'bottom'}}
                transformOrigin={{vertical: 'top'}}
            >
                <MenuItem onClick={() => console.log("Click!")}>My Account</MenuItem>
                <MenuItem onClick={() => console.log("Click!")}>Logout</MenuItem>
            </Menu>
        );
    };

    render() {
        let {sideNavOpen} = this.state;
        let {classes} = this.props;

        return (
            <ThemeProvider theme={defaultTheme}>
                <div style={NavStyles.body}>
                    <AppBar position='fixed' className={clsx(classes.topNav, {[classes.topNavShift]: sideNavOpen})}>
                        <Toolbar>
                            <IconButton edge='start' color='inherit' onClick={() => this.setState({sideNavOpen: !sideNavOpen})}>
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant='h6' noWrap>
                                Dashboard
                            </Typography>

                            <div style={{flexGrow: 1}}/>
                            <div className={classes.desktopUser}>
                                <Button color='inherit' style={{textTransform: 'none'}}
                                        onClick={(event) => this.setState({userMenu: event.currentTarget})}>
                                    <AccountCircle style={{marginRight: 5}}/>
                                    <Typography variant='h6' noWrap color='inherit'>
                                        Mohammad
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
                            <img className={clsx(classes.logo, {[classes.logoShift]: !sideNavOpen})} src='/assets/images/logo.svg' alt=''/>
                            {sideNavOpen ? ' Truckers Portal' : null}
                        </Typography>
                        <Divider />

                        <List>
                            {renderNavigation()}
                        </List>
                    </Drawer>

                    <div className={clsx(classes.content, {[classes.contentShift]: sideNavOpen})}>
                        <div className={classes.header} />
                        <Typography paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                            facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                            gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                            donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                            Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                            imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                            arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                            donec massa sapien faucibus et molestie ac.
                        </Typography>
                        <Typography paragraph>
                            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                            facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                            tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                            consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                            vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
                            hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
                            tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
                            nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
                        </Typography>
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}

export default withStyles(MaterialNavStyles)(App);