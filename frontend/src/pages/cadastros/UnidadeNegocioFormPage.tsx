import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography, Paper, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { unidadesService } from '../../services/unidadesService';
import { empresasService } from '../../services/empresasService';
import type { Empresa } from '../../services/empresasService';

const unidadeSchema = z.object({
    nome: z.string().min(3, 'Nome é obrigatório'),
    codigo: z.string().optional(),
    empresaId: z.string().min(1, 'Selecione uma empresa'),
});

type UnidadeFormInputs = z.infer<typeof unidadeSchema>;

export default function UnidadeNegocioFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id && id !== 'novo';
    const [empresas, setEmpresas] = useState<Empresa[]>([]);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UnidadeFormInputs>({
        resolver: zodResolver(unidadeSchema),
    });

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            const empresasData = await empresasService.getAll();
            setEmpresas(empresasData);

            if (isEditing) {
                const data = await unidadesService.getById(id);
                reset(data);
            }
        } catch (error) {
            console.error('Erro ao carregar dados', error);
        }
    };

    const onSubmit: SubmitHandler<UnidadeFormInputs> = async (data) => {
        try {
            if (isEditing) {
                await unidadesService.update(id, data);
            } else {
                await unidadesService.create(data);
            }
            navigate('/cadastros/unidades');
        } catch (error) {
            console.error('Erro ao salvar unidade', error);
            alert('Erro ao salvar unidade');
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                {isEditing ? 'Editar Unidade' : 'Nova Unidade'}
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
                            label="Código"
                            {...register('codigo')}
                        />

                        <TextField
                            select
                            fullWidth
                            label="Empresa"
                            defaultValue=""
                            inputProps={register('empresaId')}
                            error={!!errors.empresaId}
                            helperText={errors.empresaId?.message}
                            sx={{ gridColumn: '1 / -1' }} // Full width
                        >
                            {empresas.map((empresa) => (
                                <MenuItem key={empresa.id} value={empresa.id}>
                                    {empresa.razaoSocial}
                                </MenuItem>
                            ))}
                        </TextField>

                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                            Salvar
                        </Button>
                        <Button variant="outlined" size="large" onClick={() => navigate('/cadastros/unidades')}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
