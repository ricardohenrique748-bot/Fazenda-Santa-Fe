import { useEffect, useState } from 'react';
import {
    Box,
    Grid,
    Typography,
    Paper,
    Card,
    CardContent,
    useTheme,
    CircularProgress
} from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    Legend,
    AreaChart,
    Area
} from 'recharts';
import {
    DirectionsCar as CarIcon,
    Build as BuildIcon,
    MonetizationOn as MoneyIcon,
    CheckCircle as ActiveIcon,
    TrendingUp as TrendIcon,
    LocalShipping as TruckIcon
} from '@mui/icons-material';
import { mecanizacaoService, type MecanizacaoReportData } from '../../services/mecanizacaoService';
import { authService } from '../../services/api';

// --- Stat Card Component ---
const StatCard = ({ title, value, icon, color, subtitle }: any) => (
    <Card sx={{ height: '100%', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', borderRadius: 3 }}>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: `${color}15`,
                    color: color,
                    display: 'flex',
                    mr: 1.5
                }}>
                    {icon}
                </Box>
                <Typography variant="subtitle2" color="text.secondary" fontWeight="600">
                    {title}
                </Typography>
            </Box>
            <Typography variant="h4" fontWeight="800" color="text.primary">
                {value}
            </Typography>
            {subtitle && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    {subtitle}
                </Typography>
            )}
        </CardContent>
    </Card>
);

export default function RelatoriosMecanizacaoPage() {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<MecanizacaoReportData | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const reportData = await mecanizacaoService.getDashboardData();
                setData(reportData);
            } catch (error: any) {
                console.error('Erro ao carregar dados de mecanização', error);
                if (error.response?.status === 401) {
                    authService.logout();
                }
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const COLORS = [theme.palette.primary.main, theme.palette.secondary.main, '#FFBB28', '#FF8042', '#00C49F', '#0088FE'];

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!data) return null;

    return (
        <Box sx={{ maxWidth: 1600, margin: '0 auto' }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="overline" color="primary" fontWeight="700" letterSpacing={1.2}>
                    MECANIZAÇÃO / RELATÓRIOS E DASHBOARD
                </Typography>
                <Typography variant="h4" fontWeight="800" sx={{ color: '#1a1a1a', mb: 1 }}>
                    Painel de Performance de Frota
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Gestão de ativos, custos de manutenção e disponibilidade operacional.
                </Typography>
            </Box>

            {/* Stats Summary */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Frota Total"
                        value={data.kpis.totalVeiculos}
                        icon={<TruckIcon />}
                        color={theme.palette.primary.main}
                        subtitle="Equipamentos cadastrados"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Disponibilidade"
                        value={data.kpis.totalVeiculos > 0 ? `${Math.round((data.kpis.ativos / data.kpis.totalVeiculos) * 100)}%` : '0%'}
                        icon={<ActiveIcon />}
                        color="#2E7D32"
                        subtitle={`${data.kpis.ativos} equipamentos ativos`}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Custo Manutenção (Mes)"
                        value={`R$ ${data.kpis.custoMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                        icon={<MoneyIcon />}
                        color="#1976D2"
                        subtitle="Gasto no período atual"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Em Manutenção"
                        value={data.kpis.emManutencao}
                        icon={<BuildIcon />}
                        color="#D32F2F"
                        subtitle="Ativos fora de operação"
                    />
                </Grid>
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={3}>
                {/* Evolution of Costs */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Paper sx={{ p: 3, borderRadius: 4, height: 400 }}>
                        <Typography variant="h6" fontWeight="700" gutterBottom>
                            Evolução de Custos de Manutenção (R$)
                        </Typography>
                        <ResponsiveContainer width="100%" height="90%">
                            <AreaChart data={data.evolucaoCustos}>
                                <defs>
                                    <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.1} />
                                        <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="mes" />
                                <YAxis tickFormatter={(value) => `R$ ${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`} />
                                <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
                                <Area
                                    type="monotone"
                                    dataKey="valor"
                                    name="Custo"
                                    stroke={theme.palette.primary.main}
                                    fillOpacity={1}
                                    fill="url(#colorValor)"
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Fleet Distribution */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Paper sx={{ p: 3, borderRadius: 4, height: 400 }}>
                        <Typography variant="h6" fontWeight="700" gutterBottom>
                            Distribuição por Tipo
                        </Typography>
                        <ResponsiveContainer width="100%" height="90%">
                            <PieChart>
                                <Pie
                                    data={data.frotaPorTipo}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.frotaPorTipo.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Top 5 Most Expensive Vehicles */}
                <Grid size={{ xs: 12 }}>
                    <Paper sx={{ p: 3, borderRadius: 4, height: 450 }}>
                        <Typography variant="h6" fontWeight="700" gutterBottom>
                            Maiores Custos de Manutenção por Equipamento (Top 5)
                        </Typography>
                        <ResponsiveContainer width="100%" height="90%">
                            <BarChart data={data.topVeiculos} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis type="number" tickFormatter={(value) => `R$ ${value}`} />
                                <YAxis dataKey="nome" type="category" width={180} />
                                <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
                                <Bar
                                    dataKey="valor"
                                    name="Custo Total"
                                    fill={theme.palette.secondary.main}
                                    radius={[0, 4, 4, 0]}
                                    barSize={35}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
