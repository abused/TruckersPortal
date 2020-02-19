import {createMuiTheme} from "@material-ui/core";

let defaultTheme = createMuiTheme({
    palette: {
        primary: {
            light: '#2196f3',
            main: '#1976D2'
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
            paper: '#343E4A',
            default: '#eceff1'
        },
        text: {
            primary: '#000',
            secondary: '#FFFFFF'
        }
    }
});

let Theme = {
    backgroundColor: '#eceff1',
};

export {Theme, defaultTheme};