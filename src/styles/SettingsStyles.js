let MaterialSettingsStyles = theme => ({
    content: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingTop: 40,
        paddingBottom: 40
    },
    settingsCard: {
        width: '80%',
        height: 'auto',
        backgroundColor: theme.palette.primary.table.main,
        boxShadow: `2px 2px 15px -6px rgba(0, 0, 0, 0.75)`,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginBottom: 40,
        [theme.breakpoints.up('md')]: {
            width: '40%',
            marginBottom: 0
        }
    },
    inputField: {
        marginBottom: 20,
        marginRight: 10
    },
    textFieldProps: {
        color: theme.palette.text.primary
    },
    inputColor: {
        color: theme.palette.text.primary
    },
    streetInfo: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    btnContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    checkBox: {
        color: theme.palette.text.primary
    },
    uploadLabel: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    }
});

export {MaterialSettingsStyles};