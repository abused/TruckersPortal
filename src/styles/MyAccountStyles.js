let MaterialAccountStyles = theme => ({
    content: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingTop: 40
    },
    accountBox: {
        width: '40%',
        backgroundColor: theme.palette.primary.table.main,
        padding: 10,
        boxShadow: `2px 2px 15px -6px rgba(0, 0, 0, 0.75)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    inputField: {
        marginBottom: 20
    },
    textFieldProps: {
        color: theme.palette.text.primary
    },
    inputColor: {
        color: theme.palette.text.primary
    },
    saveBtn: {
        marginTop: 20
    },
    breakpoint: {
        flexBasis: '100%',
        height: 0
    },
    error: {
        color: theme.palette.error.main
    }
});

export {MaterialAccountStyles};