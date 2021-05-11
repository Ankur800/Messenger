import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    <NavLink to='/'>
                        <Typography
                            style={{ color: '#fff' }}
                            variant='h4'
                            className={classes.title}
                        >
                            Messenger
                        </Typography>
                    </NavLink>

                    <NavLink to='/login'>
                        <Button style={{ color: '#fff' }}>Login</Button>
                    </NavLink>

                    <NavLink style={{ color: '#fff' }} to='/register'>
                        <Button color='inherit'>Register</Button>
                    </NavLink>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
