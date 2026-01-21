import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Box,
    Button,
    Typography,
    Paper,
    TextField,
    Grid,
    CircularProgress,
    IconButton,
    Breadcrumbs,
    Link
} from '@mui/material';
import {
    Save as SaveIcon,
    ArrowBack as ArrowBackIcon,
    Category as CategoryIcon
} from '@mui/icons-material';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { gruposEquipamentoService } from '../../services/gruposEquipamentoService';

const schema = z.object({
    nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    descricao: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function GrupoEquipamentoFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const isEdit = Boolean(id && id !== 'novo');

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (isEdit) {
            loadGrupo();
        }
    }, [id]);

    const loadGrupo = async () => {
        setLoading(true);
        try {
            const data = await gruposEquipamentoService.getById(id!);
            reset(data);
        } catch (error) {
            console.error('Erro ao carregar grupo', error);
            alert('Não foi possível carregar os dados do grupo.');
            navigate('/mecanizacao/grupos');
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data: FormData) => {
        setSaving(true);
        try {
            if (isEdit) {
                await gruposEquipamentoService.update(id!, data);
            } else {
                await gruposEquipamentoService.create(data);
            }
            navigate('/mecanizacao/grupos');
        } catch (error) {
            console.error('Erro ao salvar grupo', error);
            alert('Erro ao salvar os dados. Tente novamente.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
            <Box sx={{ mb: 3 }}>
                <Breadcrumbs sx={{ mb: 1 }}>
                    <Link component={RouterLink} to="/mecanizacao/veiculos" underline="hover" color="inherit">Mecanização</Link>
                    <Link component={RouterLink} to="/mecanizacao/grupos" underline="hover" color="inherit">Grupos</Link>
                    <Typography color="text.primary">{isEdit ? 'Editar' : 'Novo'}</Typography>
                </Breadcrumbs>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={() => navigate('/mecanizacao/grupos')} size="small">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" fontWeight="800">
                        {isEdit ? 'Editar Grupo' : 'Novo Grupo de Equipamento'}
                    </Typography>
                </Box>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0px 4px 30px rgba(0,0,0,0.05)' }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'primary.main' }}>
                                <CategoryIcon />
                                <Typography variant="h6" fontWeight="700">Informações Básicas</Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Nome do Grupo"
                                {...register('nome')}
                                error={!!errors.nome}
                                helperText={errors.nome?.message}
                                placeholder="Ex: Tratores, Colhedoras, Caminhões..."
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Descrição"
                                multiline
                                rows={4}
                                {...register('descricao')}
                                error={!!errors.descricao}
                                helperText={errors.descricao?.message}
                                placeholder="Breve descrição sobre os equipamentos deste grupo"
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/mecanizacao/grupos')}
                                disabled={saving}
                                sx={{ borderRadius: 2, px: 4 }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                                disabled={saving}
                                sx={{
                                    borderRadius: 2,
                                    px: 4,
                                    background: 'linear-gradient(135deg, #2C5530 0%, #1B3A1E 100%)'
                                }}
                            >
                                {saving ? 'Salvando...' : 'Salvar Grupo'}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </form>
        </Box>
    );
}
