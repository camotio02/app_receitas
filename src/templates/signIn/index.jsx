import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as Tag from './index'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../../images/logo/logo-menu.png';
import { IconButton, InputAdornment, Input, Stack, LinearProgress, Alert, Paper, Avatar, TextField } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
export const ComponInput = ({ id,
    helperText,
    required,
    fullWidth,
    label, ...props }) => {
    return (
        <>
            <Input

                helperText={helperText}
                required={required}
                fullWidth={fullWidth}
                label={label}
                {...props} />
        </>
    )
}
export const SignIn = () => {
    const [progress, setProgress] = useState(false);
    const [showalert, setAlert] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const [datasFocos, setNameFocos] = useState({
        passwordFocos: false,
        emailFocos: false,
        lastNameFocos: false,
        nameFocos: false,
    })
    const [showPasswprd, setShowPasswprd] = useState(false)
    const handleChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
    };
    const handleChangePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
    };

    const ShowPassword = () => {
        setShowPasswprd(!showPasswprd)
    }
    const submtForum = async (e) => {
        var regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){2})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){2})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;
        e.preventDefault();

        if (email == "" ||
            email.indexOf('@') == -1 ||
            email.indexOf('.com') == -1) {
            setAlert("Preencha campo E-MAIL corretamente!");
            setNameFocos(!data?.datasFocos)
            setTimeout(() => {
                setAlert("");
            }, '3000');
            return false;
        }
        if (password.length < 8) {
            alert("A senha deve conter no minímo 8 digitos!");
            return false;
        } else if (!regex.exec(password)
        ) {
            alert("A senha deve conter no mínimo 1 caracter em maiúsculo, 2 números e 2 caractere especial!");
            return false;
        }

        const checkUserExists = async (email, password) => {
            try {
                const auth = getAuth();
                await signInWithEmailAndPassword(auth, email, password);
                return true; // O usuário existe
            } catch (error) {
                console.error('Erro ao verificar a existência do usuário:', error);
                throw error; // Ou faça algo diferente com o erro
            }
        };
        const userExists = await checkUserExists(email, password);
        if (userExists) {
            localStorage.setItem('isLoggedIn', 'true');
            console.log('logado')
            navigate('/topReview')
        } else {
            console.log('Usuário não encontrado');
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh', zIndex: "1", position: "absolute" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Stack sx={{ m: 1, bgcolor: 'transparent' }}>
                            <img src={Logo} alt="" />
                        </Stack>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Grid component="form" noValidate onSubmit={submtForum} sx={{
                            mt: 1,
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",

                            height: '100%'
                        }}>
                            <Grid mb={3} item xs={12} >
                                <TextField
                                    id="outlined-error-helper-text"
                                    helperText={showalert}
                                    required
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={handleChangeEmail}
                                    autoFocus={datasFocos?.emailFocos}
                                />
                            </Grid>
                            <Grid item xs={12}  >

                                <TextField
                                    required
                                    id="outlined-error-helper-text"
                                    helperText="Incorrect entry."
                                    fullWidth
                                    defaultValue="Hello World"
                                    placeholder="Password"
                                    name="password"
                                    type={showPasswprd ? 'text' : 'password'}
                                    value={password}
                                    onChange={handleChangePassword}
                                    autoComplete="new-password"
                                    label="password"
                                    autoFocus={datasFocos?.passwordFocos}
                                    endAdornment={
                                        <InputAdornment>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={ShowPassword}
                                            >
                                                {showPasswprd ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />

                            </Grid>

                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider >
    );
}