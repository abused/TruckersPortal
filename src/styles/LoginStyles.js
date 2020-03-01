let LoginStyles = {
    body: {
        flexGrow: 1,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/assets/images/login_bg.svg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

let MaterialLoginStyles = theme => ({
    loginCard: {
        width: '80%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: theme.palette.primary.navBar.main,
        [theme.breakpoints.up('md')]: {
            width: '20%',
        }
    },
    loginForm: {
        textAlign: 'center'
    },
    textField: {
        width: '100%',
        marginTop: 10,
        '& label.Mui-focused': {
            color: theme.palette.text.secondary
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.success.light
        },
        '&:hover .MuiInput-underline:before': {
            borderColor: theme.palette.success.dark
        }
    },
    textProps: {
        color: theme.palette.text.secondary
    },
    loginBtn: {
        backgroundColor: theme.palette.success.main,
        marginTop: 20,
        width: '40%',
        '&:hover': {
            backgroundColor: theme.palette.success.light
        }
    }
});

export {LoginStyles, MaterialLoginStyles}