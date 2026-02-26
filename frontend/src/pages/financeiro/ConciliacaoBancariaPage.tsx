import { useEffect, useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    Divider,
    Chip,
    Tooltip as MuiTooltip
} from '@mui/material';
import {
    TrendingUp,
    TrendingDown,
    AccountBalance,
    Schedule,
    CheckCircle as CheckCircleIcon,
    Info as InfoIcon
} from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { financeiroService } from '../../services/financeiroService';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- Stat Card Component ---
const StatCard = ({ title, value, icon, color }: { title: string; value: number; icon: React.ReactNode; color: string }) => (
    <Card sx={{ borderLeft: 5, borderColor: color, height: '100%', boxShadow: '0px 4px 15px rgba(0,0,0,0.05)' }}>
        <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography color="textSecondary" variant="subtitle2" fontWeight="600">{title}</Typography>
                {icon}
            </Box>
            <Typography variant="h5" sx={{ fontWeight: '800', color: '#1a1a1a' }}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
            </Typography>
        </CardContent>
    </Card>
);

export default function ConciliacaoBancariaPage() {
    const [resumo, setResumo] = useState<any>(null);
    const [lancamentos, setLancamentos] = useState<any[]>([]);
    const [bankValues, setBankValues] = useState<Record<string, number>>({});
    const [observations, setObservations] = useState<Record<string, string>>({});

    const [startDate, setStartDate] = useState(format(startOfMonth(new Date()), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(endOfMonth(new Date()), 'yyyy-MM-dd'));

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [resumoData, lancamentosData] = await Promise.all([
                financeiroService.getFluxoCaixa(startDate, endDate),
                financeiroService.getLancamentos({
                    startDate,
                    endDate
                })
            ]);
            setResumo(resumoData);
            setLancamentos(Array.isArray(lancamentosData) ? lancamentosData : []);
        } catch (error: any) {
            console.error('Erro ao carregar dados financeiros', error);
        }
    };

    const handleBankValueChange = (id: string, value: string) => {
        const numValue = parseFloat(value.replace(',', '.')) || 0;
        setBankValues(prev => ({ ...prev, [id]: numValue }));
    };

    const handleObsChange = (id: string, value: string) => {
        setObservations(prev => ({ ...prev, [id]: value }));
    };

    const reconciledStats = useMemo(() => {
        if (!lancamentos.length) return { count: 0, percent: 0, diffTotal: 0 };

        let reconciledCount = 0;
        let diffSum = 0;

        lancamentos.forEach(l => {
            const bVal = bankValues[l.id] || 0;
            const diff = Math.abs(bVal - l.valor);
            if (bVal !== 0 && diff < 0.01) {
                reconciledCount++;
            }
            if (bVal !== 0) {
                diffSum += (bVal - l.valor);
            }
        });

        return {
            count: reconciledCount,
            percent: Math.round((reconciledCount / lancamentos.length) * 100),
            diffTotal: diffSum
        };
    }, [lancamentos, bankValues]);

    const columns: GridColDef[] = [
        {
            field: 'dataVencimento',
            headerName: 'Data',
            width: 110,
            valueFormatter: (value) => format(new Date(value as string), 'dd/MM/yyyy')
        },
        { field: 'descricao', headerName: 'Descrição / Fornecedor', flex: 1.5, minWidth: 200 },
        {
            field: 'valor',
            headerName: 'Valor Sistema',
            width: 130,
            align: 'right',
            renderCell: (params) => (
                <Typography variant="body2" fontWeight="600">
                    {params.value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Typography>
            )
        },
        {
            field: 'valorBanco',
            headerName: 'Valor no Banco',
            width: 150,
            renderCell: (params) => (
                <TextField
                    size="small"
                    variant="standard"
                    type="number"
                    placeholder="0,00"
                    value={bankValues[params.row.id] || ''}
                    onChange={(e) => handleBankValueChange(params.row.id, e.target.value)}
                    sx={{ width: '100%' }}
                />
            )
        },
        {
            field: 'diferenca',
            headerName: 'Diferença',
            width: 120,
            align: 'right',
            valueGetter: (_value, row) => {
                const bVal = bankValues[row.id] || 0;
                return bVal !== 0 ? (bVal - row.valor) : 0;
            },
            renderCell: (params) => {
                const diff = params.value as number;
                if (diff === 0 && !bankValues[params.row.id]) return '-';
                return (
                    <Typography
                        variant="body2"
                        fontWeight="700"
                        color={Math.abs(diff) < 0.01 ? 'success.main' : 'error.main'}
                    >
                        {diff.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </Typography>
                );
            }
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            align: 'center',
            renderCell: (params) => {
                const bVal = bankValues[params.row.id] || 0;
                const diff = Math.abs(bVal - params.row.valor);
                const isConciliated = bVal !== 0 && diff < 0.01;

                return (
                    <Chip
                        icon={isConciliated ? <CheckCircleIcon /> : <Schedule />}
                        label={isConciliated ? 'Conciliado' : 'Pendente'}
                        color={isConciliated ? 'success' : 'warning'}
                        size="small"
                        variant="outlined"
                    />
                );
            }
        },
        {
            field: 'observacao',
            headerName: 'Observação',
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <TextField
                    size="small"
                    variant="standard"
                    placeholder="Notas..."
                    value={observations[params.row.id] || ''}
                    onChange={(e) => handleObsChange(params.row.id, e.target.value)}
                    sx={{ width: '100%', fontSize: '0.8rem' }}
                />
            )
        }
    ];

    const chartData = resumo ? [
        { name: 'Fluxo', Entradas: resumo.entradas, Saidas: resumo.saidas }
    ] : [];

    return (
        <Box sx={{ maxWidth: 1600, margin: '0 auto' }}>
            {/* Header Section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 1.5 }}>
                        CONTROLE FINANCEIRO
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#1B3A1E' }}>
                        Conciliação Bancária
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <TextField
                        type="date"
                        label="Início"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <TextField
                        type="date"
                        label="Fim"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        onClick={loadData}
                        sx={{ background: 'linear-gradient(135deg, #2C5530 0%, #1B3A1E 100%)', px: 3, fontWeight: 700 }}
                    >
                        Filtrar
                    </Button>
                </Box>
            </Box>

            {/* Main Indicators Dash */}
            {resumo && (
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <StatCard title="Entradas Previstas" value={resumo.entradas} icon={<TrendingUp color="success" />} color="#4caf50" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <StatCard title="Saídas Previstas" value={resumo.saidas} icon={<TrendingDown color="error" />} color="#f44336" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <StatCard title="Saldo Realizado (Caixa)" value={resumo.realizado} icon={<AccountBalance color="primary" />} color="#1976d2" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <StatCard title="Saldo Pendente" value={resumo.pendente} icon={<Schedule color="warning" />} color="#ff9800" />
                    </Grid>
                </Grid>
            )}

            {/* Reconciliation Comparison and KPI Section */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Paper sx={{ p: 3, borderRadius: 3, height: '100%', boxShadow: '0px 4px 30px rgba(0,0,0,0.03)' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="h6" fontWeight="800" color="#2c3e50">Conferência de Extrato</Typography>
                                <MuiTooltip title="Preencha o 'Valor no Banco' para validar cada lançamento do sistema">
                                    <InfoIcon fontSize="small" color="disabled" />
                                </MuiTooltip>
                            </Box>
                        </Box>

                        <Box sx={{ height: 500, width: '100%' }}>
                            <DataGrid
                                rows={lancamentos}
                                columns={columns}
                                density="compact"
                                disableRowSelectionOnClick
                                sx={{
                                    border: 'none',
                                    '& .MuiDataGrid-columnHeaders': { bgcolor: '#f8f9fa' },
                                    '& .MuiDataGrid-cell': { borderBottom: '1px solid #f0f0f0' }
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, lg: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
                        {/* KPI Performance Card */}
                        <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#1B3A1E', color: 'white', position: 'relative', overflow: 'hidden' }}>
                            <Box sx={{ position: 'relative', zIndex: 1 }}>
                                <Typography variant="overline" sx={{ opacity: 0.8, fontWeight: 700 }}>Eficácia da Conciliação</Typography>
                                <Typography variant="h3" fontWeight="900">{reconciledStats.percent}%</Typography>
                                <Divider sx={{ my: 1.5, bgcolor: 'rgba(255,255,255,0.1)' }} />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Itens Conferidos:</Typography>
                                    <Typography variant="body2" fontWeight="700">{reconciledStats.count} / {lancamentos.length}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Divergência Total:</Typography>
                                    <Typography variant="body2" fontWeight="700">
                                        {reconciledStats.diffTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </Typography>
                                </Box>
                            </Box>
                            <CheckCircleIcon sx={{ position: 'absolute', bottom: -20, right: -20, fontSize: 180, opacity: 0.05 }} />
                        </Paper>

                        {/* Visual Chart */}
                        <Paper sx={{ p: 3, borderRadius: 3, flexGrow: 1, boxShadow: '0px 4px 30px rgba(0,0,0,0.03)' }}>
                            <Typography variant="h6" fontWeight="700" sx={{ mb: 3 }}>Volume Transacionado</Typography>
                            <Box sx={{ height: 250 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} />
                                        <Tooltip cursor={{ fill: '#f5f5f5' }} />
                                        <Legend verticalAlign="top" align="right" />
                                        <Bar dataKey="Entradas" fill="#4caf50" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="Saidas" fill="#f44336" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
            {/* Help / Tips Section */}
            <Box sx={{ mt: 2 }}>
                <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
                    <InfoIcon color="primary" />
                    <Typography variant="body2" color="text.secondary">
                        <strong>Dica de Conciliação:</strong> Valide se o Saldo Inicial do período coincide com o extrato. Divergências comuns incluem tarifas não lançadas e juros.
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
}
