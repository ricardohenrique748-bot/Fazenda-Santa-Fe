import { useEffect, useState } from 'react';
import {
    Box, Typography, Grid, Paper, Card, CardContent,
    CircularProgress, useTheme, Divider, Button
} from '@mui/material';
import {
    TrendingUp, Construction, ShoppingCart, People,
    Landscape
} from '@mui/icons-material';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { relatoriosService } from '../../services/relatoriosService';
import type { DashboardData, ChartData } from '../../services/relatoriosService';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function DashboardGeralPage() {
    const theme = useTheme();
    const [data, setData] = useState<DashboardData | null>(null);
    const [custoData, setCustoData] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);
                const [dash, custo] = await Promise.all([
                    relatoriosService.getDashboardGeral(),
                    relatoriosService.getCustoPorCultura()
                ]);
                setData(dash);
                setCustoData(custo);
            } catch (err) {
                console.error('Erro ao carregar dashboard', err);
                setError('Falha ao carregar dados do dashboard. Verifique se o servidor está rodando.');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleRetry = () => {
        window.location.reload(); // Simplest retry for now since loadData is inside effect
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 2 }}>
                <Typography color="error" variant="h6">{error}</Typography>
                <Button variant="contained" onClick={handleRetry}>Tentar Novamente</Button>
            </Box>
        );
    }

    if (!data) return null;

    const cards = [
        {
            title: 'Financeiro (Saldo)',
            value: (data.financeiro.receitas - data.financeiro.despesas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            icon: <TrendingUp color="primary" />,
            subtitle: `Receitas: ${data.financeiro.receitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
        },
        {
            title: 'Área Total Plantada',
            value: `${data.agricola.areaTotalHectares} HA`,
            icon: <Landscape sx={{ color: '#4caf50' }} />,
            subtitle: 'Planejamento Safra Atual'
        },
        {
            title: 'Frota / Manutenção',
            value: data.frota.custoManutencao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            icon: <Construction sx={{ color: '#f44336' }} />,
            subtitle: `${data.frota.totalVeiculos} Veículos Ativos`
        },
        {
            title: 'Funcionários',
            value: data.rh.totalAtivos,
            icon: <People sx={{ color: '#2196f3' }} />,
            subtitle: 'Colaboradores Ativos'
        }
    ];

    const financeiroChartData = [
        { name: 'Receitas', valor: data.financeiro.receitas },
        { name: 'Despesas', valor: data.financeiro.despesas },
    ];

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Dashboard Estratégico</Typography>
                <Button variant="outlined" size="small" onClick={handleRetry}>Atualizar</Button>
            </Box>

            <Grid container spacing={3}>
                {cards.map((card, idx) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                        <Card elevation={2}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="subtitle2" color="textSecondary">{card.title}</Typography>
                                    {card.icon}
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{card.value}</Typography>
                                <Typography variant="caption" color="textSecondary">{card.subtitle}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Fluxo de Caixa (Realizado)</Typography>
                        <Divider sx={{ mb: 3 }} />
                        <ResponsiveContainer width="100%" height="80%">
                            <BarChart data={financeiroChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip formatter={(v: number | undefined) => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                                <Legend />
                                <Bar dataKey="valor" fill={theme.palette.primary.main} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Custos por Cultura</Typography>
                        <Divider sx={{ mb: 3 }} />
                        <ResponsiveContainer width="100%" height="80%">
                            <PieChart>
                                <Pie
                                    data={custoData as any[]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    label
                                >
                                    {custoData.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(v: number | undefined) => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Seção de Alertas e Insights */}
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>Insights e Alertas</Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ background: theme.palette.primary.dark, color: '#fff' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <ShoppingCart fontSize="large" sx={{ opacity: 0.8 }} />
                            <Box>
                                <Typography variant="h6">Suprimentos / Compras</Typography>
                                <Typography variant="body2">
                                    Existem <strong>{data.suprimentos.pedidosPendentes}</strong> pedidos de compra em aberto aguardando entrega ou cancelamento.
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ background: '#d32f2f', color: '#fff' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Construction fontSize="large" sx={{ opacity: 0.8 }} />
                            <Box>
                                <Typography variant="h6">Manutenção de Frota</Typography>
                                <Typography variant="body2">
                                    Custo total acumulado de manutenções: <strong>{data.frota.custoManutencao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>. Verifique os relatórios detalhados.
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </Box>
    );
}
