import React from "react";
import ReactDom from 'react-dom';
import {
    withStyles,
    MuiThemeProvider,
    Button,
    Typography,
    TextField
} from "@material-ui/core";
import MaterialTable from "material-table";
import {Done, Close, Edit, DeleteForever, AddBox} from "@material-ui/icons";
import {defaultTheme} from "../styles/Theme";
import {MaterialInvoiceStyles, PreviewInvoiceStyles} from "../styles/CreateInvoiceStyles";
import {makeInvoicePDF} from "../utils/InvoiceUtils";
import {converToMoney} from "../utils/NumberUtils";

let companyInfo = {
    street: '23300 Northline Rd',
    city: 'Taylor',
    state: 'MI',
    zipCode: '48180',
    phoneNumber: '(313) 325-1248',
    email: 'testcompanyemail@gmail.com'
};

class CreateInvoiceScreen extends React.Component {

    state = {
        invoiceNumber: Math.floor(100000 + Math.random() * 900000),
        loadNumber: '',
        billedToName: '',
        billedToStreet: '',
        billedToCity: '',
        billedToState: '',
        billedToZip: '',
        invoiceTotal: 0,
        itemsData: []
    };

    generatePDF = () => {
        let invoiceNumber = Math.floor(100000 + Math.random() * 900000);
        this.setState({invoiceNumber: invoiceNumber});
        makeInvoicePDF(invoiceNumber, ReactDom.findDOMNode(this).querySelector('#invoice-preview')).then(this.resetValues);
    };

    resetValues = () => {
        this.setState({invoiceNumber: Math.floor(100000 + Math.random() * 900000), loadNumber: '', billedToName: '', billedToStreet: '', billedToCity: '', billedToState: '', billedToZip: '', invoiceTotal: 0, itemsData: []});
    };

    render() {
        let {invoiceNumber, loadNumber, billedToName, billedToStreet, billedToCity, billedToState, billedToZip, itemsData, invoiceTotal} = this.state;
        let {classes} = this.props;
        let dateObj = new Date();
        let date = ((dateObj.getMonth() > 8) ? (dateObj.getMonth() + 1) : ('0' + (dateObj.getMonth() + 1))) + '/' + ((dateObj.getDate() > 9) ? dateObj.getDate() : ('0' + dateObj.getDate())) + '/' + dateObj.getFullYear();

        return (
            <MuiThemeProvider theme={defaultTheme}>
                <div className={classes.content}>
                    <div className={classes.invoiceOptions}>
                        <Typography variant='h5' style={{marginBottom: 20}}>Add Load</Typography>

                        <TextField
                            className={classes.inputField}
                            InputLabelProps={{className: classes.textFieldProps}}
                            label='Load Number'
                            value={loadNumber}
                            id='standard-basic'
                            variant='outlined'
                            onChange={(event) => this.setState({loadNumber: event.target.value})}
                        />

                        <Typography variant='h5' style={{marginBottom: 20}}>Billed To:</Typography>
                        <div>
                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.textFieldProps}}
                                label='Company Name'
                                value={billedToName}
                                id='standard-basic'
                                variant='outlined'
                                onChange={(event) => this.setState({billedToName: event.target.value})}
                            />

                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.textFieldProps}}
                                label='Street'
                                value={billedToStreet}
                                id='standard-basic'
                                variant='outlined'
                                onChange={(event) => this.setState({billedToStreet: event.target.value})}
                            />

                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.textFieldProps}}
                                label='City'
                                value={billedToCity}
                                id='standard-basic'
                                variant='outlined'
                                onChange={(event) => this.setState({billedToCity: event.target.value})}
                            />

                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.textFieldProps}}
                                label='State'
                                value={billedToState}
                                id='standard-basic'
                                variant='outlined'
                                onChange={(event) => this.setState({billedToState: event.target.value})}
                            />

                            <TextField
                                className={classes.inputField}
                                InputLabelProps={{className: classes.textFieldProps}}
                                label='Zip Code'
                                value={billedToZip}
                                id='standard-basic'
                                variant='outlined'
                                onChange={(event) => this.setState({billedToZip: event.target.value})}
                            />
                        </div>

                        <MaterialTable
                            title='Invoice Items'
                            icons={{
                                Filter: () => <div />,
                                Add: () => <AddBox color='primary' />,
                                Edit: () => <Edit />,
                                Delete: () => <DeleteForever />,
                                Check: () => <Done />,
                                Clear: () => <Close />
                            }}
                            style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}
                            columns={[
                                {title: 'Description', field: 'name'},
                                {title: 'Price', field: 'cost'}
                            ]}
                            options={{
                                rowStyle: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.02)'
                                },
                                headerStyle: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.02)'
                                },
                                actionsCellStyle: {
                                    '&:hover': {
                                        color: 'red'
                                    }
                                },
                                search: false,
                                paging: false,
                                sorting: false
                            }}
                            localization={{
                                header: {actions: ''}
                            }}
                            data={itemsData}
                            editable={{
                                onRowAdd: newData =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                            this.setState(prevState => {
                                                const itemsData = [...prevState.itemsData];
                                                itemsData.push(newData);
                                                return{...prevState, itemsData, invoiceTotal: this.state.invoiceTotal + parseFloat(newData.cost)};
                                            });
                                        }, 600);
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                           resolve();
                                           if(oldData) {
                                               this.setState(prevState => {
                                                   const itemsData = [...prevState.itemsData];
                                                   itemsData[itemsData.indexOf(oldData)] = newData;
                                                   return {...prevState, itemsData};
                                               });
                                           }
                                        }, 600);
                                    }),
                                onRowDelete: oldData =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                            this.setState(prevState => {
                                                const itemsData = [...prevState.itemsData];
                                                itemsData.splice(itemsData.indexOf(oldData), 1);
                                                this.setState({invoiceTotal: this.state.invoiceTotal - parseFloat(oldData.cost)});
                                                return{...prevState, itemsData};
                                            })
                                        }, 600);
                                    })
                            }}
                        />

                        <Button style={{marginTop: 20}} variant='contained' color='primary' onClick={() =>this.generatePDF()}>Generate Invoice</Button>
                    </div>

                    <div className={classes.previewInvoice}>
                        <Typography variant='h5' className={classes.previewTitle}>Invoice Preview</Typography>

                        <div id='invoice-preview' style={PreviewInvoiceStyles.invoicePage}>
                            <div style={PreviewInvoiceStyles.invoiceHead}>
                                <h1 style={PreviewInvoiceStyles.invoiceTitle}>INVOICE</h1>
                                <div style={PreviewInvoiceStyles.invoiceInfo}>
                                    <span style={PreviewInvoiceStyles.infoItem}>
                                        <h5>Invoice Number</h5>
                                        <p># {invoiceNumber}</p>
                                    </span>

                                    <span style={PreviewInvoiceStyles.infoItem}>
                                        <h5>Load Number</h5>
                                        <p># {loadNumber}</p>
                                    </span>

                                    <span style={PreviewInvoiceStyles.infoItem}>
                                        <h5>Date Of Issue</h5>
                                        <p>{date}</p>
                                    </span>
                                </div>
                            </div>

                            <div style={PreviewInvoiceStyles.parties}>
                                <div>
                                    <h4>BILLED TO</h4>
                                    <p>{billedToName}<br />{billedToStreet}<br />{billedToCity}, {billedToState} {billedToZip}</p>
                                </div>

                                <div>
                                    <h4>Company Name</h4>
                                    <p>{companyInfo.street}<br />{companyInfo.city}, {companyInfo.state} {companyInfo.zipCode}<br />{companyInfo.phoneNumber}<br />{companyInfo.email}</p>
                                </div>
                            </div>

                            <br />
                            <div style={PreviewInvoiceStyles.cargo}>
                                <div style={PreviewInvoiceStyles.itemContainer}>
                                    <p style={PreviewInvoiceStyles.cargoHeaders}>DESCRIPTION</p>
                                    <p style={PreviewInvoiceStyles.cargoHeaders}>AMOUNT</p>
                                </div>

                                {itemsData.map(item => (
                                    <div key={item.name + item.cost} style={PreviewInvoiceStyles.itemContainer}>
                                        <p>{item.name}</p>
                                        <p>{converToMoney(item.cost)}</p>
                                    </div>
                                ))}

                                <div style={PreviewInvoiceStyles.invoiceTotalContainer}>
                                    <p style={PreviewInvoiceStyles.invoiceTotal}>Invoice Total:</p>
                                    <p>{converToMoney(invoiceTotal)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(MaterialInvoiceStyles, {withTheme: true, defaultTheme})(CreateInvoiceScreen);