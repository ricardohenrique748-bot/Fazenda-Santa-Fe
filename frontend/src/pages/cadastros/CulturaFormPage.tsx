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
    Grid
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
                    <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                        <Grid xs={12} sm={8}>
                            <TextField
                                fullWidth
                                label="Nome"
                                error={!!errors.nome}
                                helperText={errors.nome?.message}
                                {...register('nome')}
                            />
                        </Grid>
                        <Grid xs={12} sm={4}>
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
                        </Grid>
                    </Grid>

                    {/* Group Box: Configurações de Unidade e Plantio */}
                    <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: '#f8f9fa' }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Configurações
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="UN. Captação"
                                    {...register('unidadeCaptacao')}
                                    defaultValue=""
                                >
                                    <MenuItem value=""><em>Selecione</em></MenuItem>
                                    {UNITS.map((unit) => (
                                        <MenuItem key={unit} value={unit}>
                                            {unit}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="UN. Saída"
                                    {...register('unidadeSaida')}
                                    defaultValue=""
                                >
                                    <MenuItem value=""><em>Selecione</em></MenuItem>
                                    {UNITS.map((unit) => (
                                        <MenuItem key={unit} value={unit}>
                                            {unit}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid xs={12} sm={6}>
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
                            </Grid>
                            <Grid xs={12} sm={6}>
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
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Original Fields: Variedade and Ciclo */}
                    <Grid container spacing={2}>
                        <Grid xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Variedade"
                                {...register('variedade')}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Ciclo (Dias)"
                                type="number"
                                {...register('cicloDias', { valueAsNumber: true })}
                            />
                        </Grid>
                    </Grid>

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
