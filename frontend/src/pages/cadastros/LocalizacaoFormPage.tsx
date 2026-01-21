import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography, Paper, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { localizacoesService } from '../../services/localizacoesService';
import { fazendasService } from '../../services/fazendasService';
import type { Fazenda } from '../../services/fazendasService';

// Mock fazendasService if it doesn't exist yet, but I assume it does based on the menu.
// If it doesn't, I might need to create it. I'll check after this block.

const schema = z.object({
    nome: z.string().min(3, 'Nome é obrigatório'),
    descricao: z.string().optional(),
    fazendaId: z.string().min(1, 'Selecione uma fazenda'),
});

type FormInputs = z.infer<typeof schema>;

export default function LocalizacaoFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id && id !== 'novo';
    const [fazendas, setFazendas] = useState<Fazenda[]>([]);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            // Need to ensure fazendasService exists and has getAll
            const fazendasData = await fazendasService.getAll();
            setFazendas(fazendasData);

            if (isEditing) {
                const data = await localizacoesService.getById(id);
                reset(data);
            }
        } catch (error) {
            console.error('Erro ao carregar dados', error);
        }
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            if (isEditing) {
                await localizacoesService.update(id, data);
            } else {
                await localizacoesService.create(data);
            }
            navigate('/cadastros/localizacoes');
        } catch (error) {
            console.error('Erro ao salvar', error);
            alert('Erro ao salvar');
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                {isEditing ? 'Editar Localização' : 'Nova Localização'}
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

                        <TextField
                            select
                            fullWidth
                            label="Fazenda"
                            defaultValue=""
                            inputProps={register('fazendaId')}
                            error={!!errors.fazendaId}
                            helperText={errors.fazendaId?.message}
                            sx={{ gridColumn: '1 / -1' }}
                        >
                            {fazendas.map((fazenda) => (
                                <MenuItem key={fazenda.id} value={fazenda.id}>
                                    {fazenda.nome}
                                </MenuItem>
                            ))}
                        </TextField>

                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                            Salvar
                        </Button>
                        <Button variant="outlined" size="large" onClick={() => navigate('/cadastros/localizacoes')}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
