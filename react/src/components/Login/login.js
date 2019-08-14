import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { Redirect } from 'react-router-dom';


const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user, pass) => dispatch({ type: 'LOGIN', payload: { user, pass } })
    }
}

class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    changeUserName(event) {
        this.setState({
            username: event.target.value
        })
    }
    changePassWord(event) {
        this.setState({
            password: event.target.value
        })
    }
    useStyles = makeStyles(theme => ({
        '@global': {
            body: {
                backgroundColor: theme.palette.common.white,
            },
        },
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


    loginAttempt() {
        const user = this.state.username
        const pass = this.state.password
        this.props.login(user, pass)
    }
    render() {
        const classes = this.useStyles;
        // Redirect if user is not empty
        const userEmpty = isEmpty(this.props.user)
        if (!userEmpty) {
            return <Redirect to="/tickets" />;
        }

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email "
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={this.state.username}
                        onChange={(event) => this.changeUserName.bind(this)(event)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={(event) => this.changePassWord.bind(this)(event)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => this.loginAttempt()}
                    >LogIn</Button>
                </div>

            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);