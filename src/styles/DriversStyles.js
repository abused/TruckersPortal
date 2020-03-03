let MaterialDriversStyles = theme => ({
    content: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    filterContainer: {
        width: '70%',
        marginTop: 40,
        marginBottom: 40,
        padding: 10,
        backgroundColor: theme.palette.primary.table.main,
        boxShadow: `2px 2px 15px -6px rgba(0, 0, 0, 0.75)`,
        display: 'flex',
        flexDirection: 'column'
    },
    filterHeader: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    filterOptions: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    filterItem: {
        width: 'auto',
        '&:hover.Mui-selected': {
            backgroundColor: 'transparent'
        },
        '&.Mui-selected': {
            borderBottom: `2px solid ${theme.palette.primary.light}`,
            backgroundColor: 'transparent'
        },
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    dialogPaper: {
        backgroundColor: theme.palette.primary.table.main
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    driverTable: {
        width: '70%',
        backgroundColor: theme.palette.primary.table.main,
        boxShadow: `2px 2px 15px -6px rgba(0, 0, 0, 0.75)`,
        marginBottom: 40
    },
    tableHead: {
        background: `linear-gradient(40deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`
    },
    tableCell: {
        color: theme.palette.text.secondary
    },
    drivingCell: {
        backgroundColor: theme.palette.success.main
    },
    sittingCell: {
        backgroundColor: theme.palette.warning.main
    },
    firedCell: {
        backgroundColor: theme.palette.error.main
    },
    inputField: {
        marginBottom: 20
    },
    inputColor: {
        color: theme.palette.text.primary
    },
    errorInput: {
        color: theme.palette.error.main
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
    }
});

export {MaterialDriversStyles};