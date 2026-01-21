import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { estoqueService } from '../../services/estoqueService';

const depositoSchema = z.object({
    nome: z.string().min(3, 'Nome é obrigatório'),
    localizacao: z.string().optional(),
});

type DepositoFormInputs = z.infer<typeof depositoSchema>;

export default function DepositoFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id && id !== 'novo';

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<DepositoFormInputs>({
        resolver: zodResolver(depositoSchema),
    });

    useEffect(() => {
        if (isEditing) {
            loadData();
        }
    }, [id]);

    const loadData = async () => {
        try {
            const data = await estoqueService.getDepositoById(id!);
            reset(data);
        } catch (error) {
            console.error('Erro ao carregar dados', error);
        }
    };

    const onSubmit: SubmitHandler<DepositoFormInputs> = async (data) => {
        try {
            if (isEditing) {
                await estoqueService.updateDeposito(id!, data);
            } else {
                await estoqueService.createDeposito(data);
            }
            navigate('/cadastros/depositos');
        } catch (error) {
            console.error('Erro ao salvar depósito', error);
            alert('Erro ao salvar depósito');
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                {isEditing ? 'Editar Depósito' : 'Novo Depósito'}
            </Typography>
            <Paper sx={{ p: 4, maxWidth: 800 }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr' }, gap: 2 }}>

                        <TextField
                            fullWidth
                            label="Nome do Depósito"
                            error={!!errors.nome}
                            helperText={errors.nome?.message}
                            placeholder="Ex: Almoxarifado Central"
                            {...register('nome')}
                        />

                        <TextField
                            fullWidth
                            label="Localização / Endereço"
                            placeholder="Ex: Galpão A, Setor Industrial"
                            {...register('localizacao')}
                        />

                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                            Salvar
                        </Button>
                        <Button variant="outlined" size="large" onClick={() => navigate('/cadastros/depositos')}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
