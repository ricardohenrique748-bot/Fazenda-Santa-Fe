import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { atividadesService } from '../../services/atividadesService';

const schema = z.object({
    nome: z.string().min(3, 'Nome é obrigatório'),
    descricao: z.string().optional(),
});

type FormInputs = z.infer<typeof schema>;

export default function AtividadeFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id && id !== 'novo';

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (isEditing) {
            loadData();
        }
    }, [id]);

    const loadData = async () => {
        try {
            if (id) {
                const data = await atividadesService.getById(id);
                reset(data);
            }
        } catch (error) {
            console.error('Erro ao carregar dados', error);
        }
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            if (isEditing) {
                await atividadesService.update(id, data);
            } else {
                await atividadesService.create(data);
            }
            navigate('/cadastros/atividades');
        } catch (error) {
            console.error('Erro ao salvar', error);
            alert('Erro ao salvar');
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                {isEditing ? 'Editar Atividade' : 'Nova Atividade'}
            </Typography>
            <Paper sx={{ p: 4, maxWidth: 800 }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>

                        <TextField
                            fullWidth
                            label="Nome"
                            error={!!errors.nome}
                            helperText={errors.nome?.message}
                            {...register('nome')}
                        />

                        <TextField
                            fullWidth
                            label="Descrição"
                            {...register('descricao')}
                        />

                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                            Salvar
                        </Button>
                        <Button variant="outlined" size="large" onClick={() => navigate('/cadastros/atividades')}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
