let PreviewInvoiceStyles = {
    invoicePage: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 10,
        padding: 20,
        fontFamily: 'sans-serif',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        border: '2px dashed black'
    },
    invoiceHead: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column'
    },
    invoiceTitle: {
        padding: 0,
        margin: 0
    },
    invoiceInfo: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%'
    },
    infoItem: {
        margin: 10
    },
    parties: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cargo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    cargoHeaders: {
        fontWeight: 'bold'
    },
    itemContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0, 0, 0, 0.6)'
    },
    invoiceTotalContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    invoiceTotal: {
        fontWeight: 'bold'
    }
};

let MaterialInvoiceStyles = theme => ({
    content: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    invoiceOptions: {
        width: '80%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 40,
        marginBottom: 40,
        flexWrap: 'wrap',
        backgroundColor: theme.palette.primary.table.main,
        boxShadow: `2px 2px 15px -6px rgba(0, 0, 0, 0.75)`,
        padding: 20,
    },
    inputField: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20
    },
    textFieldProps: {
        color: theme.palette.text.primary
    },
    previewInvoice: {
        width: '80%',
        height: 'auto',
        marginBottom: 40,
        padding: 20,
        backgroundColor: theme.palette.primary.table.main,
        boxShadow: `2px 2px 15px -6px rgba(0, 0, 0, 0.75)`,
    },
    previewTitle: {
        borderBottom: `3px solid ${theme.palette.primary.main}`,
        marginBottom: 20
    }
});

export {PreviewInvoiceStyles, MaterialInvoiceStyles};