import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography, Paper, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { fazendasService } from '../../services/fazendasService';
import { empresasService } from '../../services/empresasService';
import type { Empresa } from '../../services/empresasService';

const fazendaSchema = z.object({
    nome: z.string().min(3, 'Nome é obrigatório'),
    codigo: z.string().optional(),
    cidade: z.string().optional(),
    estado: z.string().optional(),
    areaTotal: z.coerce.number().optional().default(0),
    areaProdutiva: z.coerce.number().optional().default(0),
    empresaId: z.string().min(1, 'Empresa é obrigatória'),
});

type FazendaFormInputs = z.infer<typeof fazendaSchema>;

export default function FazendaFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id && id !== 'novo';
    const [empresas, setEmpresas] = useState<Empresa[]>([]);

    const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FazendaFormInputs>({
        resolver: zodResolver(fazendaSchema) as any,
        defaultValues: {
            nome: '',
            codigo: '',
            cidade: '',
            estado: '',
            areaTotal: 0,
            areaProdutiva: 0,
            empresaId: '',
        },
    });

    useEffect(() => {
        loadEmpresas();
        if (isEditing) {
            loadFazenda(id);
        }
    }, [id]);

    const loadEmpresas = async () => {
        try {
            const data = await empresasService.getAll();
            setEmpresas(data);
        } catch (error) {
            console.error('Erro ao carregar empresas', error);
        }
    };

    const loadFazenda = async (fazendaId: string) => {
        try {
            const data = await fazendasService.getById(fazendaId);
            reset({
                ...data,
                areaTotal: data.areaTotal || 0,
                areaProdutiva: data.areaProdutiva || 0,
                empresaId: data.empresaId,
            });
        } catch (error) {
            console.error('Erro ao carregar fazenda', error);
            alert('Erro ao carregar dados da fazenda');
        }
    };

    const onSubmit: SubmitHandler<FazendaFormInputs> = async (data) => {
        try {
            if (isEditing) {
                await fazendasService.update(id, data);
            } else {
                await fazendasService.create(data);
            }
            navigate('/cadastros/fazendas');
        } catch (error) {
            console.error('Erro ao salvar fazenda', error);
            alert('Erro ao salvar fazenda');
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {isEditing ? 'Editar Fazenda' : 'Nova Fazenda'}
            </Typography>
            <Paper sx={{ p: 4 }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>

                        <TextField
                            fullWidth
                            label="Nome da Fazenda"
                            error={!!errors.nome}
                            helperText={errors.nome?.message}
                            {...register('nome')}
                        />

                        <Controller
                            name="empresaId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Empresa Vinculada"
                                    error={!!errors.empresaId}
                                    helperText={errors.empresaId?.message}
                                    value={field.value || ''}
                                >
                                    {empresas.map((empresa) => (
                                        <MenuItem key={empresa.id} value={empresa.id}>
                                            {empresa.razaoSocial}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        <TextField fullWidth label="Código Interno" {...register('codigo')} />

                        <Box sx={{ gridColumn: '1 / -1', mt: 2 }}>
                            <Typography variant="h6">Localização & Dados</Typography>
                        </Box>

                        <TextField fullWidth label="Cidade" {...register('cidade')} />
                        <TextField fullWidth label="Estado (UF)" {...register('estado')} />
                        <TextField fullWidth label="Área Total (ha)" type="number" {...register('areaTotal')} />
                        <TextField fullWidth label="Área Produtiva (ha)" type="number" {...register('areaProdutiva')} />

                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                            Salvar
                        </Button>
                        <Button variant="outlined" size="large" onClick={() => navigate('/cadastros/fazendas')}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
