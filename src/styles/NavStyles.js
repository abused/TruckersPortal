let sideNavWidth = 240;

let NavStyles = {
    body: {
        flexGrow: 1
    }
};

let MaterialNavStyles = theme => ({
    desktopUser: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex'
        }
    },
    mobileUser: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    screenTitle: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    sideNav: {
        width: sideNavWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        '& .MuiDrawer-paper': {
            backgroundColor: theme.palette.primary.navBar.main
        }
    },
    sideNavOpen: {
        width: sideNavWidth,
        overflow: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    sideNavClose: {
        width: theme.spacing(7) + 1,
        overflow: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1
        }
    },
    navListItem: {
        '&.Mui-selected': {
            borderLeft: `4px solid ${theme.palette.primary.light}`
        }
    },
    topNav: {
        width: `calc(100% - ${theme.spacing(7) + 1}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    topNavShift: {
        marginLeft: sideNavWidth,
        width: `calc(100% - ${sideNavWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'center'
    },
    logo: {
        width: '20%',
    },
    logoShift: {
        width: '80%',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    content: {
        flexGrow: 1,
        margin: 0,
        width: `calc(100% - ${theme.spacing(7) + 1})`,
        marginLeft: theme.spacing(7) + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    contentShift: {
        marginLeft: sideNavWidth,
        width: `calc(100% - ${sideNavWidth})`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    dropdownMenu: {
        '& .MuiMenu-paper': {
            backgroundColor: theme.palette.background.default,
            boxShadow: `1px 1px 21px 0px rgba(0, 0, 0, 0.4)`
        }
    },
    menuItems: {
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }
    },
    logoutMenuItem: {
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }
    }
});

export {NavStyles, MaterialNavStyles};