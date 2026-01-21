import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography, Paper, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { veiculosService, TipoVeiculo, StatusVeiculo } from '../../services/veiculosService';
import { empresasService, type Empresa } from '../../services/empresasService';

const veiculoSchema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório'),
    placa: z.string().optional(),
    numeroFrota: z.string().optional(),
    tipo: z.nativeEnum(TipoVeiculo),
    marca: z.string().optional(),
    modelo: z.string().optional(),
    ano: z.coerce.number().optional(),
    empresaId: z.string().min(1, 'Empresa é obrigatória'),
    status: z.nativeEnum(StatusVeiculo),
    horimetroAtual: z.coerce.number().default(0),
    odometroAtual: z.coerce.number().default(0),
});

type VeiculoFormInputs = z.infer<typeof veiculoSchema>;

export default function VeiculoFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id && id !== 'novo';
    const [empresas, setEmpresas] = useState<Empresa[]>([]);

    const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<VeiculoFormInputs>({
        resolver: zodResolver(veiculoSchema) as any,
        defaultValues: {
            nome: '',
            tipo: TipoVeiculo.TRATOR,
            status: StatusVeiculo.ATIVO,
            horimetroAtual: 0,
            odometroAtual: 0,
            empresaId: ''
        }
    });

    useEffect(() => {
        loadEmpresas();
        if (isEditing) loadVeiculo(id);
    }, [id]);

    const loadEmpresas = async () => {
        const data = await empresasService.getAll();
        setEmpresas(data);
    };

    const loadVeiculo = async (veiculoId: string) => {
        try {
            const data = await veiculosService.getById(veiculoId);
            reset(data);
        } catch (error) {
            console.error('Erro ao carregar veículo', error);
        }
    };

    const onSubmit: SubmitHandler<VeiculoFormInputs> = async (data) => {
        try {
            if (isEditing) {
                await veiculosService.update(id, data);
            } else {
                await veiculosService.create(data);
            }
            navigate('/mecanizacao/veiculos');
        } catch (error) {
            console.error('Erro ao salvar veículo', error);
            alert('Erro ao salvar veículo');
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {isEditing ? 'Editar Veículo' : 'Novo Veículo'}
            </Typography>
            <Paper sx={{ p: 4 }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Nome/Modelo"
                            error={!!errors.nome}
                            helperText={errors.nome?.message}
                            {...register('nome')}
                        />
                        <Controller
                            name="tipo"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Tipo"
                                    error={!!errors.tipo}
                                    helperText={errors.tipo?.message}
                                >
                                    {Object.values(TipoVeiculo).map((tipo) => (
                                        <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                        <TextField fullWidth label="Placa" {...register('placa')} />
                        <TextField fullWidth label="Nº Frota" {...register('numeroFrota')} />
                        <TextField fullWidth label="Marca" {...register('marca')} />
                        <TextField fullWidth label="Modelo" {...register('modelo')} />
                        <TextField fullWidth label="Ano" type="number" {...register('ano')} />

                        <Controller
                            name="empresaId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Empresa"
                                    error={!!errors.empresaId}
                                    helperText={errors.empresaId?.message}
                                >
                                    {empresas.map((emp) => (
                                        <MenuItem key={emp.id} value={emp.id}>{emp.razaoSocial}</MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Status"
                                >
                                    {Object.values(StatusVeiculo).map((status) => (
                                        <MenuItem key={status} value={status}>{status}</MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        <TextField fullWidth label="Horímetro Inicial" type="number" {...register('horimetroAtual')} />
                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                            Salvar
                        </Button>
                        <Button variant="outlined" size="large" onClick={() => navigate('/mecanizacao/veiculos')}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
