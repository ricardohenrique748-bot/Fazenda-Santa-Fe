import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, Button, Container, Grid, Paper, TextField, Typography, Switch, FormControlLabel, Alert } from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { comercialService } from '../../services/comercialService';
import type { Cliente } from '../../services/comercialService';

export default function ClientesFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Cliente>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            loadCliente(id);
        }
    }, [id]);

    const loadCliente = async (id: string) => {
        try {
            const data = await comercialService.getClienteById(id);
            if (data) {
                Object.keys(data).forEach(key => {
                    setValue(key as any, data[key as keyof Cliente]);
                });
            }
        } catch (err) {
            console.error(err);
            setError('Erro ao carregar cliente');
        }
    };

    const onSubmit = async (data: Cliente) => {
        try {
            if (id) {
                await comercialService.updateCliente(id, data);
            } else {
                await comercialService.createCliente(data);
            }
            navigate('/comercial/clientes');
        } catch (err) {
            console.error(err);
            setError('Erro ao salvar cliente');
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/comercial/clientes')}>
                    Voltar
                </Button>
                <Typography variant="h4" fontWeight="bold">
                    {id ? 'Editar Cliente' : 'Novo Cliente'}
                </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Paper component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4, borderRadius: 3 }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Razão Social / Nome Completo"
                            {...register('razaoSocial', { required: 'Campo obrigatório' })}
                            error={!!errors.razaoSocial}
                            helperText={errors.razaoSocial?.message}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Nome Fantasia"
                            {...register('nomeFantasia')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="CPF / CNPJ"
                            {...register('cpfCnpj', { required: 'Campo obrigatório' })}
                            error={!!errors.cpfCnpj}
                            helperText={errors.cpfCnpj?.message}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Inscrição Estadual"
                            {...register('inscricaoEstadual')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Telefone / Celular"
                            {...register('telefone')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            {...register('email')}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle1" sx={{ mt: 1, mb: 1, borderBottom: 1, borderColor: 'divider' }}>Endereço</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 8 }}>
                        <TextField
                            fullWidth
                            label="Endereço / Logradouro / Número"
                            {...register('endereco')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            fullWidth
                            label="Cidade"
                            {...register('cidade')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            fullWidth
                            label="Estado (UF)"
                            {...register('estado')}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <FormControlLabel
                            control={<Switch defaultChecked {...register('ativo')} />}
                            label="Cliente Ativo?"
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="outlined" onClick={() => navigate('/comercial/clientes')}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
                            Salvar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
