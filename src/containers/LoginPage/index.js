import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../actions/auth.actions';
import { Redirect } from 'react-router';

function Copyright() {
    return (
        <Typography
            style={{ fontFamily: 'Montserrat, sans-serif' }}
            variant='body2'
            color='textSecondary'
            align='center'
        >
            {'Copyright © '}
            <Link
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                color='inherit'
                href='https://material-ui.com/'
            >
                ReAnk Studio
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const LoginPage = () => {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    // useEffect(() => {
    //     if (!auth.authenticated) {
    //         dispatch(isLoggedInUser());
    //     }
    // }, []);

    // If already logged in i.e. data saved in local storage redirect to homepage
    if (auth.authenticated) {
        return <Redirect to={'/'} />;
    }

    const userLogin = (e) => {
        e.preventDefault();

        if (email == '') {
            alert('Email is required');
            return;
        }
        if (password == '') {
            alert('Password is required');
            return;
        }

        dispatch(signin({ email, password }));
    };

    return (
        <Layout style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                        component='h1'
                        variant='h5'
                    >
                        Log in
                    </Typography>
                    <form
                        onSubmit={userLogin}
                        className={classes.form}
                        noValidate
                    >
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link
                                    style={{
                                        fontFamily: 'Montserrat, sans-serif',
                                    }}
                                    href='#'
                                    variant='body2'
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    style={{
                                        fontFamily: 'Montserrat, sans-serif',
                                    }}
                                    href='./register'
                                    variant='body2'
                                >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </Layout>
    );
};

export default LoginPage;
