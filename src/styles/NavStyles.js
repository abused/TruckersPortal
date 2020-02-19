import {Theme} from './Theme';
let sideNavWidth = 240;

let NavStyles = {
    body: {
        flexGrow: 1,
        backgroundColor: Theme.backgroundColor
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
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    sideNavClose: {
        width: theme.spacing(7) + 1,
        overflow: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1
        }
    },
    topNav: {
        zIndex: theme.zIndex.drawer + 1,
        width: `calc(100% - ${theme.spacing(7) + 1}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    topNavShift: {
        marginLeft: sideNavWidth,
        width: `calc(100% - ${sideNavWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
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
        zIndex: theme.zIndex.drawer + 1,
        width: `calc(100% - ${theme.spacing(7) + 1}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    contentShift: {
        flexGrow: 1,
        marginLeft: sideNavWidth,
        width: `calc(100% - ${sideNavWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    }
});

export {NavStyles, MaterialNavStyles};