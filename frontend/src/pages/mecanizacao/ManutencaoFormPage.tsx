import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography, Paper, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { manutencoesService } from '../../services/manutencoesService';
import { veiculosService, type Veiculo } from '../../services/veiculosService';

const manutencaoSchema = z.object({
    data: z.string().min(1, 'Data é obrigatória'),
    tipo: z.string().min(1, 'Tipo é obrigatório'), // Ex: Preventiva, Corretiva
    descricao: z.string().min(1, 'Descrição é obrigatória'),
    horimetroNoAto: z.coerce.number().optional(),
    odometroNoAto: z.coerce.number().optional(),
    custoTotal: z.coerce.number().min(0, 'Custo não pode ser negativo'),
    veiculoId: z.string().min(1, 'Veículo é obrigatório'),
});

type ManutencaoFormInputs = z.infer<typeof manutencaoSchema>;

export default function ManutencaoFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id && id !== 'novo';
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

    const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ManutencaoFormInputs>({
        resolver: zodResolver(manutencaoSchema) as any,
        defaultValues: {
            data: new Date().toISOString().split('T')[0],
            tipo: 'Corretiva',
            descricao: '',
            custoTotal: 0,
            veiculoId: ''
        }
    });

    useEffect(() => {
        loadVeiculos();
        if (isEditing) loadManutencao(id);
    }, [id]);

    const loadVeiculos = async () => {
        const data = await veiculosService.getAll();
        setVeiculos(data);
    };

    const loadManutencao = async (mqId: string) => {
        try {
            const data = await manutencoesService.getById(mqId);
            reset({
                ...data,
                data: new Date(data.data).toISOString().split('T')[0]
            });
        } catch (error) {
            console.error('Erro ao carregar manutenção', error);
        }
    };

    const onSubmit: SubmitHandler<ManutencaoFormInputs> = async (data) => {
        try {
            const payload = {
                ...data,
                data: new Date(data.data).toISOString(),
                // Se for criação, o backend usará connect.id conforme o serviço
                // Mas o serviço de frontend que fiz envia os dados brutos, 
                // o backend precisa adaptar ou o frontend precisa formatar.
                // Vou garantir que o backend receba o que espera.
                // Nota: O serviço de backend que fiz usa Prisma.ManutencaoCreateInput
                // que espera { veiculo: { connect: { id: ... } } }.
                // Vou ajustar o envio no frontend para ser mais simples e o backend lidar.
                // Atualmente meu backend controller recebe Body() data: Prisma.ManutencaoCreateInput.
            };

            // Ajustando payload para o formato esperado pelo Prisma Create Input no backend
            const prismaPayload: any = {
                data: payload.data,
                tipo: payload.tipo,
                descricao: payload.descricao,
                horimetroNoAto: payload.horimetroNoAto,
                odometroNoAto: payload.odometroNoAto,
                custoTotal: payload.custoTotal,
                veiculo: { connect: { id: payload.veiculoId } }
            };

            if (isEditing) {
                // No update, o formato é diferente
                await manutencoesService.update(id, {
                    ...payload,
                    veiculo: undefined // Não mudar veículo no update via este form por simplicidade
                } as any);
            } else {
                await manutencoesService.create(prismaPayload);
            }
            navigate('/mecanizacao/manutencoes');
        } catch (error) {
            console.error('Erro ao salvar manutenção', error);
            alert('Erro ao salvar manutenção');
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {isEditing ? 'Editar Manutenção' : 'Nova Manutenção'}
            </Typography>
            <Paper sx={{ p: 4 }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>

                        <Controller
                            name="veiculoId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Veículo"
                                    error={!!errors.veiculoId}
                                    helperText={errors.veiculoId?.message}
                                    disabled={isEditing}
                                >
                                    {veiculos.map((v) => (
                                        <MenuItem key={v.id} value={v.id}>
                                            {v.nome} ({v.placa || v.numeroFrota})
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        <TextField
                            fullWidth
                            label="Data"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.data}
                            helperText={errors.data?.message}
                            {...register('data')}
                        />

                        <TextField
                            fullWidth
                            label="Tipo de Manutenção"
                            placeholder="Ex: Preventiva, Corretiva, Óleo..."
                            error={!!errors.tipo}
                            helperText={errors.tipo?.message}
                            {...register('tipo')}
                        />

                        <TextField
                            fullWidth
                            label="Custo Total (R$)"
                            type="number"
                            error={!!errors.custoTotal}
                            helperText={errors.custoTotal?.message}
                            {...register('custoTotal')}
                        />

                        <TextField
                            fullWidth
                            label="Horímetro no Ato"
                            type="number"
                            {...register('horimetroNoAto')}
                        />

                        <TextField
                            fullWidth
                            label="Odômetro no Ato"
                            type="number"
                            {...register('odometroNoAto')}
                        />

                        <TextField
                            fullWidth
                            label="Descrição Técnica"
                            multiline
                            rows={3}
                            sx={{ gridColumn: 'span 2' }}
                            error={!!errors.descricao}
                            helperText={errors.descricao?.message}
                            {...register('descricao')}
                        />

                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                            Salvar
                        </Button>
                        <Button variant="outlined" size="large" onClick={() => navigate('/mecanizacao/manutencoes')}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
