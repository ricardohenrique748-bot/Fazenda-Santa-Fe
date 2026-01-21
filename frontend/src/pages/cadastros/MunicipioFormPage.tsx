import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography, Paper, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { municipiosService } from '../../services/municipiosService';

const schema = z.object({
    nome: z.string().min(3, 'Nome é obrigatório'),
    estado: z.string().length(2, 'Use a sigla do estado (Ex: SP)'),
    codigoIbge: z.string().optional(),
});

type FormInputs = z.infer<typeof schema>;

const ESTADOS = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export default function MunicipioFormPage() {
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
                const data = await municipiosService.getById(id);
                reset(data);
            }
        } catch (error) {
            console.error('Erro ao carregar dados', error);
        }
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            if (isEditing) {
                await municipiosService.update(id, data);
            } else {
                await municipiosService.create(data);
            }
            navigate('/cadastros/municipios');
        } catch (error) {
            console.error('Erro ao salvar', error);
            alert('Erro ao salvar');
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                {isEditing ? 'Editar Município' : 'Novo Município'}
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
                            select
                            fullWidth
                            label="Estado (UF)"
                            defaultValue=""
                            inputProps={register('estado')}
                            error={!!errors.estado}
                            helperText={errors.estado?.message}
                        >
                            {ESTADOS.map((uf) => (
                                <MenuItem key={uf} value={uf}>{uf}</MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            fullWidth
                            label="Código IBGE"
                            {...register('codigoIbge')}
                        />

                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                            Salvar
                        </Button>
                        <Button variant="outlined" size="large" onClick={() => navigate('/cadastros/municipios')}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
