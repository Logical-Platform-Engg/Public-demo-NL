import React, { useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Paper, Box } from '@mui/material';
import logo from '../images/logo.jpg';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            if (res.data.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <Container 
            component="main" 
            maxWidth="xs" 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '100vh', 
                padding: 2 
            }}
        >
           

            <Paper elevation={3} sx={{ padding: 4, width: '100%', borderRadius: 2, color: '#fff' }}>
            <Box sx={{ mb: 4 }}>
                <img src={logo} alt="Company Logo" style={{ width: '150px', height: 'auto', display: 'block', margin: '0 auto' }} />
            </Box>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
                    Login
                </Typography>
                <Box component="form" noValidate sx={{ mt: 2 }}>
                    {error && <Typography variant="body2" color="error" sx={{ mb: 2, textAlign: 'center' }}>{error}</Typography>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ 
                            mt: 2, 
                            py: 1.5, 
                            fontSize: '16px', 
                            backgroundColor: 'lightgrey', 
                            color: 'black', 
                            
                            '&:hover': {
                                backgroundColor: 'grey',
                                
                            }
                        }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;
