let MaterialLoadsStyles = theme => ({
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
    },

    //Loads Create Screen
    createContainer: {
        width: '80%',
        height: '80%',
        marginTop: '5%',
        marginBottom: '5%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.table.main,
        boxShadow: `2px 2px 15px -6px rgba(0, 0, 0, 0.75)`,
        paddingTop: 20,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 10
    },
    inputField: {
        marginBottom: 20
    },
    textFieldProps: {
        color: theme.palette.text.primary
    },
    inputLabel: {
      color: theme.palette.text.primary
    },
    selectMenu: {
        '& .MuiMenu-paper':{
            backgroundColor: theme.palette.background.default
        }
    },
    selectItem: {
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
        },
        '&.Mui-selected': {
            backgroundColor: 'transparent',
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }
        }
    },
    submitBtn: {
        backgroundColor: theme.palette.success.main,
        width: 'auto',
        padding: 10,
        '&:hover': {
            backgroundColor: theme.palette.success.light
        }
    },
    uploadLabel: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    btnContainer: {
        width: '100%',
        textAlign: 'right'
    },
    backButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        color: theme.palette.secondary.main,
        marginTop: 10,
        marginLeft: 10
    }
});

export {MaterialLoadsStyles};