import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontFamily: 'Montserrat, sans-serif',
    },
    login: {
        position: 'absolute',
        right: '100px',
        bottom: '10px',
        [theme.breakpoints.up('sm')]: {
            right: '150px',
        },
    },
    register: {
        position: 'absolute',
        right: '10px',
        bottom: '10px',
        [theme.breakpoints.up('sm')]: {
            right: '50px',
        },
    },
    name: {
        fontFamily: 'Montserrat, sans-serif',
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%)',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
}));

const Header = (props) => {
    const classes = useStyles();

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h4' className={classes.title}>
                        Messenger
                    </Typography>

                    {!auth.authenticated ? (
                        <Fragment>
                            <NavLink to='/login'>
                                <Button
                                    className={classes.login}
                                    style={{ color: '#fff' }}
                                >
                                    Login
                                </Button>
                            </NavLink>

                            <NavLink style={{ color: '#fff' }} to='/register'>
                                <Button
                                    className={classes.register}
                                    color='inherit'
                                >
                                    Register
                                </Button>
                            </NavLink>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Typography
                                style={{ color: '#fff' }}
                                variant='h5'
                                className={classes.name}
                            >
                                {`Hi, ${auth.firstName}`}
                            </Typography>

                            <Button
                                onClick={() => {
                                    dispatch(logout());
                                }}
                                className={classes.register}
                                color='inherit'
                            >
                                Logout
                            </Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
