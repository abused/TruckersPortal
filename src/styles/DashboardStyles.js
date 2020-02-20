let MaterialDashboardStyles = theme => ({
    content: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
    },
    contentGrid: {
        width: '100%',
        height: '100%',
        paddingTop: 20
    },
    infoItemGrid: {
        height: 'auto',
        [theme.breakpoints.up('xs')]: {
            width: '80%'
        },
        [theme.breakpoints.up('sm')]: {
            width: 600 / 2
        },
        [theme.breakpoints.up('md')]: {
            width: 960 / 4
        },
        [theme.breakpoints.up('lg')]: {
            width: 1280 / 4
        }
    },
    infoCard: {
        width: '100%',
        height: '100%',
        display: 'flex',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoIcon: {
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        color: theme.palette.text.secondary,
        [theme.breakpoints.up('xs')]: {
            width: 30,
            height: 30
        },
        [theme.breakpoints.up('sm')]: {
            width: 40,
            height: 40
        },
        [theme.breakpoints.up('md')]: {
            width: 30,
            height: 30
        },
        [theme.breakpoints.up('lg')]: {
            width: 40,
            height: 40
        }
    },
    infoData: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    blueGradient: {
        background: `linear-gradient(40deg, ${theme.palette.primary.blue.left} 0%, ${theme.palette.primary.blue.right} 100%)`
    },
    orangeGradient: {
        background: `linear-gradient(40deg, ${theme.palette.primary.orange.left} 0%, ${theme.palette.primary.orange.right} 100%)`
    },
    redGradient: {
        background: `linear-gradient(40deg, ${theme.palette.primary.red.left} 0%, ${theme.palette.primary.red.right} 100%)`
    },
    greenGradient: {
        background: `linear-gradient(40deg, ${theme.palette.primary.green.left} 0%, ${theme.palette.primary.green.right} 100%)`
    },
    tableGrid: {
        width: '80%',
        [theme.breakpoints.up('md')]: {
            width: '75%'
        }
    },
    driverTable: {
        boxShadow: `1px 1px 21px 0px rgba(0, 0, 0, 0.4)`
    },
    tableHead: {
        background: `linear-gradient(40deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`
    },
    tableCell: {
        color: theme.palette.text.secondary
    },
    driving: {
        backgroundColor: theme.palette.success.main
    },
    sitting: {
        backgroundColor: theme.palette.warning.main
    }
});

export {MaterialDashboardStyles};