
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    Switch,
    FormControlLabel,
    Alert
} from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { segurancaService } from '../../services/segurancaService';
import type { EPI } from '../../services/segurancaService';

export default function EpiFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm<EPI>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            loadEPI(id);
        }
    }, [id]);

    const loadEPI = async (id: string) => {
        try {
            const epi = await segurancaService.getEPIById(id);
            if (epi) {
                setValue('nome', epi.nome);
                setValue('ca', epi.ca);
                setValue('validadeDias', epi.validadeDias);
                setValue('ativo', epi.ativo);
            }
        } catch (err) {
            console.error(err);
            setError('Erro ao carregar EPI');
        }
    };

    const onSubmit = async (data: EPI) => {
        try {
            const payload = {
                ...data,
                validadeDias: data.validadeDias ? Number(data.validadeDias) : undefined
            };

            if (id) {
                await segurancaService.updateEPI(id, payload);
            } else {
                await segurancaService.createEPI(payload);
            }
            navigate('/medicina/epis');
        } catch (err) {
            console.error(err);
            setError('Erro ao salvar EPI');
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/medicina/epis')}>
                    Voltar
                </Button>
                <Typography variant="h4" fontWeight="bold">
                    {id ? 'Editar EPI' : 'Novo EPI'}
                </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Paper component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4, borderRadius: 3 }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Nome do Equipamento (EPI)"
                            placeholder="Ex: Luva de Raspa, Óculos de Proteção"
                            {...register('nome', { required: true })}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="C.A. (Certificado de Aprovação)"
                            {...register('ca')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Validade (em dias)"
                            helperText="Validade média após entrega"
                            {...register('validadeDias')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <FormControlLabel
                            control={<Switch defaultChecked {...register('ativo')} />}
                            label="Equipamento Ativo?"
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="outlined" onClick={() => navigate('/medicina/epis')}>
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
