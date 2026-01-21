
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
    MenuItem,
    Alert
} from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { segurancaService } from '../../services/segurancaService';
import { funcionariosService } from '../../services/funcionariosService';
import type { ExameOcupacional } from '../../services/segurancaService';
import type { Funcionario } from '../../services/funcionariosService';

const TIPOS_EXAME = ['Admissional', 'Periódico', 'Mudança de Função', 'Retorno ao Trabalho', 'Demissional'];
const RESULTADOS = ['APTO', 'INAPTO', 'APTO COM RESTRIÇÃO'];

export default function ExameFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm<ExameOcupacional>();
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadFuncionarios();
        if (id) {
            loadExame(id);
        }
    }, [id]);

    const loadFuncionarios = async () => {
        try {
            const data = await funcionariosService.getAll();
            setFuncionarios(data);
        } catch (err) {
            console.error('Erro ao carregar funcionários', err);
        }
    };

    const loadExame = async (id: string) => {
        try {
            const exame = await segurancaService.getExameById(id);
            if (exame) {
                setValue('funcionarioId', exame.funcionarioId);
                setValue('tipo', exame.tipo);
                setValue('dataRealizacao', exame.dataRealizacao ? exame.dataRealizacao.split('T')[0] : '');
                setValue('dataVencimento', exame.dataVencimento ? exame.dataVencimento.split('T')[0] : '');
                setValue('resultado', exame.resultado);
                setValue('medico', exame.medico);
                setValue('crm', exame.crm);
            }
        } catch (err) {
            console.error(err);
            setError('Erro ao carregar exame');
        }
    };

    const onSubmit = async (data: ExameOcupacional) => {
        try {
            // Dates to ISO handled by service or need manual? Service in frontend passes as is?
            // Service expects Partial<ExameOcupacional>.
            // Backend handles "new Date(data.dataRealizacao)".
            // So string 'YYYY-MM-DD' works if valid.
            if (id) {
                await segurancaService.updateExame(id, data);
            } else {
                await segurancaService.createExame(data);
            }
            navigate('/medicina/exames');
        } catch (err) {
            console.error(err);
            setError('Erro ao salvar exame');
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/medicina/exames')}>
                    Voltar
                </Button>
                <Typography variant="h4" fontWeight="bold">
                    {id ? 'Editar Exame' : 'Novo Exame Médico'}
                </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Paper component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4, borderRadius: 3 }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            select
                            fullWidth
                            label="Funcionário"
                            defaultValue=""
                            {...register('funcionarioId', { required: true })}
                        >
                            {funcionarios.map((f) => (
                                <MenuItem key={f.id} value={f.id}>
                                    {f.nome} ({f.cargo})
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            select
                            fullWidth
                            label="Tipo de Exame"
                            defaultValue=""
                            {...register('tipo', { required: true })}
                        >
                            {TIPOS_EXAME.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            select
                            fullWidth
                            label="Resultado"
                            defaultValue="APTO"
                            {...register('resultado', { required: true })}
                        >
                            {RESULTADOS.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Data Realização"
                            InputLabelProps={{ shrink: true }}
                            {...register('dataRealizacao', { required: true })}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Data Vencimento"
                            InputLabelProps={{ shrink: true }}
                            {...register('dataVencimento', { required: true })}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 8 }}>
                        <TextField
                            fullWidth
                            label="Nome do Médico"
                            {...register('medico')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            fullWidth
                            label="CRM"
                            {...register('crm')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="outlined" onClick={() => navigate('/medicina/exames')}>
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
