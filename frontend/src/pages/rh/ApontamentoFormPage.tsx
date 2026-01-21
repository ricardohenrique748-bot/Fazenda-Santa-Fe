import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography, Paper, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { apontamentosService, TipoApontamento } from '../../services/apontamentosService';
import { funcionariosService } from '../../services/funcionariosService';
import type { Funcionario } from '../../services/funcionariosService';
import { fazendasService } from '../../services/fazendasService';
import type { Fazenda } from '../../services/fazendasService';

const apontamentoSchema = z.object({
    data: z.string().min(1, 'Data é obrigatória'),
    funcionarioId: z.string().min(1, 'Funcionário é obrigatório'),
    tipo: z.nativeEnum(TipoApontamento),
    quantidade: z.coerce.number().min(0.1, 'Quantidade deve ser maior que 0'),
    descricao: z.string().optional(),
    fazendaId: z.string().optional()
});

type ApontamentoFormInputs = z.infer<typeof apontamentoSchema>;

export default function ApontamentoFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id && id !== 'novo';

    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [fazendas, setFazendas] = useState<Fazenda[]>([]);

    const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ApontamentoFormInputs>({
        resolver: zodResolver(apontamentoSchema) as any,
        defaultValues: {
            data: new Date().toISOString().split('T')[0],
            quantidade: 0,
            tipo: TipoApontamento.HORA_NORMAL,
            descricao: '',
            funcionarioId: '',
            fazendaId: ''
        }
    });

    useEffect(() => {
        loadResources();
        if (isEditing) {
            loadApontamento(id);
        }
    }, [id]);

    const loadResources = async () => {
        try {
            const [funcs, fazs] = await Promise.all([
                funcionariosService.getAll(),
                fazendasService.getAll()
            ]);
            setFuncionarios(funcs);
            setFazendas(fazs);
        } catch (error) {
            console.error('Erro ao carregar recursos', error);
        }
    };

    const loadApontamento = async (aptoId: string) => {
        try {
            const data = await apontamentosService.getById(aptoId);
            reset({
                ...data,
                data: new Date(data.data).toISOString().split('T')[0]
            });
        } catch (error) {
            console.error('Erro ao carregar apontamento', error);
        }
    };

    const onSubmit: SubmitHandler<ApontamentoFormInputs> = async (data) => {
        try {
            const payload = {
                ...data,
                data: new Date(data.data).toISOString()
            };

            if (isEditing) {
                await apontamentosService.update(id, payload);
            } else {
                await apontamentosService.create(payload);
            }
            navigate('/rh/apontamentos');
        } catch (error) {
            console.error('Erro ao salvar apontamento', error);
            alert('Erro ao salvar');
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {isEditing ? 'Editar Apontamento' : 'Novo Apontamento'}
            </Typography>
            <Paper sx={{ p: 4 }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>

                        <TextField
                            fullWidth
                            label="Data"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.data}
                            helperText={errors.data?.message}
                            {...register('data')}
                        />

                        <Controller
                            name="funcionarioId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Funcionário"
                                    error={!!errors.funcionarioId}
                                    helperText={errors.funcionarioId?.message}
                                    value={field.value || ''}
                                >
                                    {funcionarios.map((func) => (
                                        <MenuItem key={func.id} value={func.id}>
                                            {func.nome}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
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
                                    value={field.value || TipoApontamento.HORA_NORMAL}
                                >
                                    {Object.values(TipoApontamento).map((tipo) => (
                                        <MenuItem key={tipo} value={tipo}>
                                            {tipo}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        <TextField
                            fullWidth
                            label="Quantidade (Horas/Unid)"
                            type="number"
                            error={!!errors.quantidade}
                            helperText={errors.quantidade?.message}
                            {...register('quantidade')}
                        />

                        <Controller
                            name="fazendaId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Fazenda (Opcional)"
                                    error={!!errors.fazendaId}
                                    helperText={errors.fazendaId?.message}
                                    value={field.value || ''}
                                >
                                    <MenuItem value="">
                                        <em>Nenhuma</em>
                                    </MenuItem>
                                    {fazendas.map((faz) => (
                                        <MenuItem key={faz.id} value={faz.id}>
                                            {faz.nome}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        <TextField
                            fullWidth
                            label="Descrição / Obs"
                            {...register('descricao')}
                        />

                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                            Salvar
                        </Button>
                        <Button variant="outlined" size="large" onClick={() => navigate('/rh/apontamentos')}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
