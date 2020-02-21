let MaterialLoadsStyles = theme => ({
    content: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
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
    loadsTable: {
        width: '70%',
        backgroundColor: theme.palette.primary.table.main,
        boxShadow: `2px 2px 15px -6px rgba(0, 0, 0, 0.75)`
    },
    completeCell: {
        backgroundColor: theme.palette.success.main
    },
    inProgressCell: {
        backgroundColor: theme.palette.warning.main
    },
    canceledCell: {
        backgroundColor: theme.palette.error.main
    }
});

export {MaterialLoadsStyles};