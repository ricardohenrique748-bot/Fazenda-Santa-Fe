import { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import { useForm } from 'react-hook-form';
import { Box, Button, Checkbox, FormControlLabel, TextField, Paper, Container, Alert } from '@mui/material';
import { authService } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            setValue('email', savedEmail);
            setRememberMe(true);
        }
    }, [setValue]);

    const onSubmit = async (data: LoginFormInputs) => {
        setIsLoading(true);
        setError('');
        try {
            if (rememberMe) {
                localStorage.setItem('savedEmail', data.email);
            } else {
                localStorage.removeItem('savedEmail');
            }
            await authService.login(data.email, data.senha);
            navigate('/dashboard');
        } catch (err: any) {
            console.error('Login error:', err);
            if (err.code === 'ERR_NETWORK' || !err.response) {
                setError('Servidor indisponível. Verifique se o backend está rodando.');
            } else if (err.response?.status === 401) {
                setError('E-mail ou senha incorretos.');
            } else {
                const status = err.response?.status;
                const msg = err.response?.data?.message || 'Erro desconhecido';
                setError(`Erro no Login (${status}): ${msg}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #F9F9F7 0%, #F1F3E0 100%)'
        }}>
            <Container maxWidth="xs">
                <Paper
                    elevation={0}
                    sx={{
                        p: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 4,
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.03)',
                        border: '1px solid rgba(44, 85, 48, 0.08)'
                    }}
                >
                    <Box
                        component="img"
                        src={logo}
                        alt="Fazenda Santa Fé"
                        sx={{
                            height: 120,
                            width: 'auto',
                            mb: 4,
                            objectFit: 'contain'
                        }}
                    />

                    {error && <Alert severity="error" sx={{ width: '100%', mb: 3, borderRadius: 2 }}>{error}</Alert>}

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="E-mail"
                            autoComplete="email"
                            autoFocus
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            {...register('email')}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Senha"
                            type="password"
                            autoComplete="current-password"
                            error={!!errors.senha}
                            helperText={errors.senha?.message}
                            {...register('senha')}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />

                        <FormControlLabel
                            control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} color="primary" />}
                            label="Lembrar meu login"
                            sx={{ mt: 1, color: '#2C5530' }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={isLoading}
                            sx={{ mt: 3, mb: 2, height: 50, fontSize: '1.1rem' }}
                        >
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </Button>
                        <Button
                            fullWidth
                            color="primary"
                            size="small"
                            onClick={() => alert('Funcionalidade em desenvolvimento')}
                            sx={{ textTransform: 'none', fontWeight: 500 }}
                        >
                            Esqueceu sua senha?
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
