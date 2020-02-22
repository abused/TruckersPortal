let MaterialUserStyles = theme => ({
    content: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingBottom: 40
    },
    filterContainer: {
        width: '70%',
        marginTop: 40,
        marginBottom: 40,
        padding: 10,
        backgroundColor: theme.palette.primary.table.main,
        boxShadow: `2px 2px 15px -6px rgba(0, 0, 0, 0.75)`,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    usersTable: {
        width: '70%',
        backgroundColor: theme.palette.primary.table.main,
        boxShadow: `2px 2px 15px -6px rgba(0, 0, 0, 0.75)`
    },
    tableHead: {
        background: `linear-gradient(40deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`
    },
    tableCell: {
        color: theme.palette.text.secondary
    },
    dialogPaper: {
        backgroundColor: theme.palette.primary.table.main
    },
    errorInput: {
        color: theme.palette.error.main
    },
    dialogContent: {
    },
    inputField: {
        marginBottom: 20,
        margin: 10
    },
    inputColor: {
        color: theme.palette.text.primary
    },
    checkBox: {
        color: theme.palette.text.primary
    }
});

export {MaterialUserStyles};