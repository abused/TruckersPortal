import {createMuiTheme} from "@material-ui/core";

let defaultTheme = createMuiTheme({
    palette: {
        primary: {
            light: '#2196f3',
            main: '#1976D2',
            blue: {
                left: '#0892D3',
                right: '#25C5DA'
            },
            red: {
                left: '#FF5455',
                right: '#F48DAE'
            },
            orange: {
                left: '#FF8108',
                right: '#FFC827'
            },
            green: {
                left: '#42A24A',
                right: '#25DAA0'
            },
            table: {
                main: '#FFFFFF'
            }
        },
        secondary: {
            main: '#dc004e'
        },
        error: {
            main: '#ff1744'
        },
        warning: {
            main: '#ffc107'
        },
        success: {
            main: '#4caf50'
        },
        background: {
            paper: '#343F4A',
            default: '#eceff1'
        },
        text: {
            primary: '#000',
            secondary: '#FFFFFF'
        },
        action: {
            hover: '#515962',
            selected: '#515962'
        }
    }
});

export {defaultTheme};