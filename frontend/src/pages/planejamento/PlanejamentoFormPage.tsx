import { useEffect, useState, useMemo } from 'react';
import {
    Box, Typography, Paper, Grid, TextField, Button, MenuItem,
    Table, TableBody, TableCell, TableHead, TableRow, IconButton,
    InputAdornment, Divider, Card, CardContent
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Save as SaveIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { planejamentoService } from '../../services/planejamentoService';
import { fazendasService } from '../../services/fazendasService';
import { estoqueService } from '../../services/estoqueService';
import { culturasService } from '../../services/culturasService';
import { localizacoesService } from '../../services/localizacoesService';
import type { Safra } from '../../services/planejamentoService';
import type { Fazenda } from '../../services/fazendasService';
import type { Produto } from '../../services/estoqueService';
import type { Cultura } from '../../services/culturasService';
import type { Localizacao } from '../../services/localizacoesService';

// Enum for Stages
const ETAPAS_AGRICOLAS = [
    { label: 'Preparo de Solo', value: 'PREPARO_SOLO' },
    { label: 'Plantio', value: 'PLANTIO' },
    { label: 'Tratos Culturais', value: 'TRATOS_CULTURAIS' },
    { label: 'Colheita', value: 'COLHEITA' },
];

interface PlanejamentoFormData {
    culturaId: string;
    safraId: string;
    fazendaId: string;
    talhaoId: string;
    areaHectares: number;
    metaProdutividade: number;
    unidadeProdutividade: string;
    itens: { produtoId: string; doseHa: number; custoUnitario?: number }[];
    atividades: { descricao: string; dataPrevista: string; etapa: string }[];
}

export default function PlanejamentoFormPage() {
    const navigate = useNavigate();
    const [safras, setSafras] = useState<Safra[]>([]);
    const [fazendas, setFazendas] = useState<Fazenda[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [culturas, setCulturas] = useState<Cultura[]>([]);
    const [talhoes, setTalhoes] = useState<Localizacao[]>([]); // All talhoes or filtered

    const { register, control, handleSubmit, watch, formState: { errors } } = useForm<PlanejamentoFormData>({
        defaultValues: {
            culturaId: '',
            safraId: '',
            fazendaId: '',
            talhaoId: '',
            areaHectares: 0,
            metaProdutividade: 0,
            unidadeProdutividade: 'sc/ha',
            itens: [],
            atividades: []
        }
    });

    const { fields: itemFields, append: appendItem, remove: removeItem } = useFieldArray({
        control,
        name: "itens"
    });

    const { fields: ativFields, append: appendAtiv, remove: removeAtiv } = useFieldArray({
        control,
        name: "atividades"
    });

    // Watchers
    const watchFazendaId = watch('fazendaId');
    const watchArea = watch('areaHectares');
    const watchItens = watch('itens');

    // Filter Talhoes based on selected Fazenda
    const filteredTalhoes = useMemo(() => {
        return talhoes.filter(t => t.fazendaId === watchFazendaId);
    }, [watchFazendaId, talhoes]);

    // Calculate Estimated Budget
    const custoEstimadoTotal = useMemo(() => {
        return watchItens.reduce((acc, item) => {
            // Basic calculation: Dose * Area * Unit Cost (mock 0 if undefined)
            // In real app, unit cost should come from product catalog or user input
            // For now assume user can input or we default.
            const custo = (item.doseHa || 0) * (watchArea || 0) * (item.custoUnitario || 0);
            return acc + custo;
        }, 0);
    }, [watchItens, watchArea]);

    const custoPorHa = useMemo(() => {
        return watchArea > 0 ? custoEstimadoTotal / watchArea : 0;
    }, [custoEstimadoTotal, watchArea]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [sData, fData, pData, cData, tData] = await Promise.all([
                planejamentoService.getSafras(),
                fazendasService.getAll(),
                estoqueService.getProdutos(),
                culturasService.getAll(),
                localizacoesService.getAll()
            ]);
            setSafras(sData);
            setFazendas(fData);
            setProdutos(pData);

            // Map types if necessary or use as is if compatible
            setCulturas(cData);
            setTalhoes(tData);

        } catch (error) {
            console.error('Erro ao carregar dados iniciais', error);
        }
    };

    const onSubmit = async (data: any) => {
        try {
            await planejamentoService.createPlanejamento({
                ...data,
                custoEstimadoTotal,
                custoPorHa
            });
            navigate('/planejamento');
        } catch (error) {
            console.error('Erro ao salvar planejamento:', error);
            alert('Erro ao salvar. Verifique o console.');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold" color="primary">Novo Planejamento de Safra</Typography>
                    <Typography variant="body1" color="text.secondary">Definição de cultura, área, insumos e calendário por talhão.</Typography>
                </Box>
                <Button variant="contained" size="large" startIcon={<SaveIcon />} type="submit" sx={{ borderRadius: 3 }}>
                    Salvar Planejamento
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* 1. Definição da Área e Cultura */}
                <Grid size={{ xs: 12 }}>
                    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, mb: 2 }}>
                            1. Definição da Safra e Local
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Safra Agrícola"
                                    {...register('safraId', { required: true })}
                                    error={!!errors.safraId}
                                >
                                    {safras.map(s => <MenuItem key={s.id} value={s.id}>{s.nome}</MenuItem>)}
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Fazenda / Unidade"
                                    {...register('fazendaId', { required: true })}
                                    error={!!errors.fazendaId}
                                >
                                    {fazendas.map(f => <MenuItem key={f.id} value={f.id}>{f.nome}</MenuItem>)}
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Talhão"
                                    {...register('talhaoId')} // Optional initially if not strict
                                    disabled={!watchFazendaId}
                                >
                                    <MenuItem value=""><em>Selecione o Talhão</em></MenuItem>
                                    {filteredTalhoes.map(t => <MenuItem key={t.id} value={t.id}>{t.nome}</MenuItem>)}
                                    {filteredTalhoes.length === 0 && <MenuItem disabled>Nenhum talhão cadastrado</MenuItem>}
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Cultura"
                                    {...register('culturaId', { required: true })}
                                    error={!!errors.culturaId}
                                >
                                    {culturas.map(c => <MenuItem key={c.id} value={c.id}>{c.nome} ({c.cicloDias} dias)</MenuItem>)}
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Área Plantada (ha)"
                                    {...register('areaHectares', { required: true, min: 0.1 })}
                                    error={!!errors.areaHectares}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">ha</InputAdornment>,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* 2. Metas e Orçamento */}
                <Grid size={{ xs: 12 }}>
                    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, mb: 2 }}>
                            2. Metas de Produtividade e Orçamento
                        </Typography>
                        <Grid container spacing={3} alignItems="center">
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Meta de Produtividade"
                                    {...register('metaProdutividade')}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Unidade"
                                    defaultValue="sc/ha"
                                    {...register('unidadeProdutividade')}
                                >
                                    <MenuItem value="sc/ha">Sacas / ha</MenuItem>
                                    <MenuItem value="t/ha">Toneladas / ha</MenuItem>
                                    <MenuItem value="kg/ha">Kg / ha</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Budget Display Card */}
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Card variant="outlined" sx={{ bgcolor: '#f5f5f5' }}>
                                    <CardContent sx={{ py: 1.5, display: 'flex', justifyContent: 'space-around', alignItems: 'center', '&:last-child': { pb: 1.5 } }}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">Custo Estimado Total</Typography>
                                            <Typography variant="h6" color="primary" fontWeight="bold">
                                                {custoEstimadoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            </Typography>
                                        </Box>
                                        <Divider orientation="vertical" flexItem />
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">Custo por Hectare</Typography>
                                            <Typography variant="h6" color="secondary" fontWeight="bold">
                                                {custoPorHa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} / ha
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* 3. Planejamento de Insumos */}
                <Grid size={{ xs: 12 }}>
                    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6">3. Planejamento de Insumos</Typography>
                            <Button startIcon={<AddIcon />} variant="outlined" size="small" onClick={() => appendItem({ produtoId: '', doseHa: 0, custoUnitario: 0 })}>
                                Adicionar Insumo
                            </Button>
                        </Box>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#f9fafb' }}>
                                    <TableCell>Produto / Insumo</TableCell>
                                    <TableCell sx={{ width: 130 }}>Dose (/ha)</TableCell>
                                    <TableCell sx={{ width: 130 }}>Custo Un. (Est.)</TableCell>
                                    <TableCell sx={{ width: 150 }}>Qtd. Total</TableCell>
                                    <TableCell sx={{ width: 150 }}>Custo Total</TableCell>
                                    <TableCell sx={{ width: 50 }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {itemFields.map((field, index) => {
                                    const dose = watch(`itens.${index}.doseHa`) || 0;
                                    const custoUn = watch(`itens.${index}.custoUnitario`) || 0;
                                    return (
                                        <TableRow key={field.id} hover>
                                            <TableCell>
                                                <TextField
                                                    select
                                                    fullWidth
                                                    size="small"
                                                    variant="standard"
                                                    {...register(`itens.${index}.produtoId` as const)}
                                                >
                                                    {produtos.map(p => (
                                                        <MenuItem key={p.id} value={p.id}>
                                                            {p.nome} ({p.unidadeMedida})
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    type="number"
                                                    size="small"
                                                    variant="standard"
                                                    {...register(`itens.${index}.doseHa` as const)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    type="number"
                                                    size="small"
                                                    variant="standard"
                                                    InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
                                                    {...register(`itens.${index}.custoUnitario` as const)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {(dose * watchArea).toLocaleString()}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="bold">
                                                    {(dose * watchArea * custoUn).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton size="small" color="error" onClick={() => removeItem(index)}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {itemFields.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                                            Nenhum insumo planejado. Adicione itens acima.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>

                {/* 4. Calendário Agrícola */}
                <Grid size={{ xs: 12 }}>
                    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6">4. Calendário Agrícola (Etapas)</Typography>
                            <Button startIcon={<AddIcon />} variant="outlined" size="small" onClick={() => appendAtiv({ descricao: '', dataPrevista: '', etapa: 'PLANTIO' })}>
                                Adicionar Etapa
                            </Button>
                        </Box>
                        <Grid container spacing={2}>
                            {ativFields.map((field, index) => (
                                <Grid size={{ xs: 12, md: 6 }} key={field.id}>
                                    <Card variant="outlined" sx={{ p: 1.5, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            <Box sx={{ display: 'flex', gap: 2 }}>
                                                <TextField
                                                    select
                                                    label="Etapa"
                                                    size="small"
                                                    sx={{ width: 180 }}
                                                    {...register(`atividades.${index}.etapa` as const)}
                                                >
                                                    {ETAPAS_AGRICOLAS.map(e => (
                                                        <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
                                                    ))}
                                                </TextField>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    label="Descrição da Atividade"
                                                    placeholder="Ex: Aplicação de Herbicida"
                                                    {...register(`atividades.${index}.descricao` as const)}
                                                />
                                            </Box>
                                            <TextField
                                                type="date"
                                                size="small"
                                                label="Data Prevista"
                                                InputLabelProps={{ shrink: true }}
                                                fullWidth
                                                {...register(`atividades.${index}.dataPrevista` as const)}
                                            />
                                        </Box>
                                        <IconButton color="error" onClick={() => removeAtiv(index)} sx={{ mt: 1 }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
