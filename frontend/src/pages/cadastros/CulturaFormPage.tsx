import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    FormControlLabel,
    Checkbox,
    MenuItem,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { culturasService } from '../../services/culturasService';

const UNITS = ['GRA', 'KG', 'LTS', 'PES', 'SC', 'TON', 'UN'] as const;

const schema = z.object({
    nome: z.string().min(3, 'Nome é obrigatório'),
    variedade: z.string().optional(),
    cicloDias: z.number().optional(),
    multicultura: z.boolean().optional(),
    unidadeCaptacao: z.string().optional(),
    unidadeSaida: z.string().optional(),
    controlaPlantio: z.boolean().optional(),
    exigirEspacamento: z.boolean().optional(),
});

type FormInputs = z.infer<typeof schema>;

export default function CulturaFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id && id !== 'novo';

    const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm<FormInputs>({
        resolver: zodResolver(schema),
        defaultValues: {
            multicultura: false,
            controlaPlantio: false,
            exigirEspacamento: false
        }
    });

    useEffect(() => {
        if (isEditing) {
            loadData();
        }
    }, [id]);

    const loadData = async () => {
        try {
            if (id) {
                const data = await culturasService.getById(id);
                // Ensure default values for booleans if undefined
                reset({
                    ...data,
                    multicultura: data.multicultura ?? false,
                    controlaPlantio: data.controlaPlantio ?? false,
                    exigirEspacamento: data.exigirEspacamento ?? false
                });
            }
        } catch (error) {
            console.error('Erro ao carregar dados', error);
        }
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            if (isEditing) {
                await culturasService.update(id, data);
            } else {
                await culturasService.create(data);
            }
            navigate('/cadastros/culturas');
        } catch (error) {
            console.error('Erro ao salvar', error);
            alert('Erro ao salvar');
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                {isEditing ? 'Editar Cultura' : 'Nova Cultura'}
            </Typography>
            <Paper sx={{ p: 4, maxWidth: 800 }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>

                    {/* Header: Nome and Multicultura */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' }, gap: 2, alignItems: 'center', mb: 3 }}>
                        <TextField
                            fullWidth
                            label="Nome"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.nome}
                            helperText={errors.nome?.message}
                            {...register('nome')}
                        />
                        <Controller
                            name="multicultura"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={<Checkbox {...field} checked={!!field.value} />}
                                    label="Multicultura"
                                />
                            )}
                        />
                    </Box>

                    {/* Group Box: Configurações de Unidade e Plantio */}
                    <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: '#f8f9fa' }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Configurações
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                            <Controller
                                name="unidadeCaptacao"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        select
                                        fullWidth
                                        label="UN. Captação"
                                        InputLabelProps={{ shrink: true }}
                                        {...field}
                                        value={field.value ?? ''}
                                    >
                                        <MenuItem value=""><em>Selecione</em></MenuItem>
                                        {UNITS.map((unit) => (
                                            <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                            <Controller
                                name="unidadeSaida"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        select
                                        fullWidth
                                        label="UN. Saída"
                                        InputLabelProps={{ shrink: true }}
                                        {...field}
                                        value={field.value ?? ''}
                                    >
                                        <MenuItem value=""><em>Selecione</em></MenuItem>
                                        {UNITS.map((unit) => (
                                            <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                            <Controller
                                name="controlaPlantio"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Checkbox {...field} checked={!!field.value} />}
                                        label="Controla Plantio"
                                    />
                                )}
                            />
                            <Controller
                                name="exigirEspacamento"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Checkbox {...field} checked={!!field.value} />}
                                        label="Exigir Espaçamento"
                                    />
                                )}
                            />
                        </Box>
                    </Paper>

                    {/* Original Fields: Variedade and Ciclo */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Variedade"
                            InputLabelProps={{ shrink: true }}
                            {...register('variedade')}
                        />
                        <TextField
                            fullWidth
                            label="Ciclo (Dias)"
                            type="number"
                            InputLabelProps={{ shrink: true }}
                            {...register('cicloDias', { valueAsNumber: true })}
                        />
                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                            Salvar
                        </Button>
                        <Button variant="outlined" size="large" onClick={() => navigate('/cadastros/culturas')}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
