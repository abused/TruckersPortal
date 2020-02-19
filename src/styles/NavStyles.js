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
        overflow: 'hidden'
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
            easing: theme.transitions.easing.easeIn,
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
    }
});

export {NavStyles, MaterialNavStyles};