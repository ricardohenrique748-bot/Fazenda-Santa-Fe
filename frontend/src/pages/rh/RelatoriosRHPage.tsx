import { useEffect, useState, useMemo } from 'react';
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
    Legend
} from 'recharts';
import {
    People as PeopleIcon,
    QueryBuilder as HourIcon,
    Agriculture as FarmIcon,
    TrendingUp as TrendIcon
} from '@mui/icons-material';
import { funcionariosService } from '../../services/funcionariosService';
import { apontamentosService } from '../../services/apontamentosService';
import type { Funcionario } from '../../services/funcionariosService';
import type { Apontamento } from '../../services/apontamentosService';
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

export default function RelatoriosRHPage() {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [apontamentos, setApontamentos] = useState<Apontamento[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [fData, aData] = await Promise.all([
                    funcionariosService.getAll(),
                    apontamentosService.getAll()
                ]);
                setFuncionarios(fData);
                setApontamentos(aData);
            } catch (error: any) {
                console.error('Erro ao carregar dados para relatórios', error);
                if (error.response?.status === 401) {
                    alert('Sessão expirada. Por favor, faça login novamente.');
                    authService.logout();
                }
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // --- Data Processing for Charts ---

    // 1. Distribution by Position
    const positionData = useMemo(() => {
        const counts: Record<string, number> = {};
        funcionarios.forEach(f => {
            if (f.ativo) {
                counts[f.cargo] = (counts[f.cargo] || 0) + 1;
            }
        });
        return Object.keys(counts).map(cargo => ({ name: cargo, value: counts[cargo] }));
    }, [funcionarios]);

    // 2. Hours per Farm
    const hoursPerFarmData = useMemo(() => {
        const data: Record<string, number> = {};
        apontamentos.forEach(a => {
            const farmName = a.fazenda?.nome || 'Não Definida';
            data[farmName] = (data[farmName] || 0) + (a.quantidade || 0);
        });
        return Object.keys(data).map(fazenda => ({ name: fazenda, total: data[fazenda] }));
    }, [apontamentos]);

    // 3. Labor Trend (Last 7 days - simplified)
    const laborTrendData = useMemo(() => {
        const last7Days: any[] = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

            const totalHours = apontamentos
                .filter(a => new Date(a.data).toLocaleDateString() === d.toLocaleDateString())
                .reduce((acc, a) => acc + (a.quantidade || 0), 0);

            last7Days.push({ date: dateStr, horas: totalHours });
        }
        return last7Days;
    }, [apontamentos]);

    const COLORS = [theme.palette.primary.main, theme.palette.secondary.main, '#FFBB28', '#FF8042', '#00C49F', '#0088FE'];

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const totalAtivos = funcionarios.filter(f => f.ativo).length;
    const totalHoras = apontamentos.reduce((acc, a) => acc + (a.quantidade || 0), 0);
    const mediaHoras = totalAtivos > 0 ? (totalHoras / totalAtivos).toFixed(1) : 0;

    return (
        <Box sx={{ maxWidth: 1600, margin: '0 auto' }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="overline" color="primary" fontWeight="700" letterSpacing={1.2}>
                    RH / RELATÓRIOS E DASHBOARD
                </Typography>
                <Typography variant="h4" fontWeight="800" sx={{ color: '#1a1a1a', mb: 1 }}>
                    Indicadores de Mão de Obra
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Análise macro do quadro de colaboradores e eficiência operativa.
                </Typography>
            </Box>

            {/* Stats Summary */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Efetivo Ativo"
                        value={totalAtivos}
                        icon={<PeopleIcon />}
                        color={theme.palette.primary.main}
                        subtitle="Colaboradores em campo"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Acúmulo de Labor"
                        value={`${totalHoras}h`}
                        icon={<HourIcon />}
                        color="#2E7D32"
                        subtitle="Total de horas apontadas"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Média Horas/Colab"
                        value={mediaHoras}
                        icon={<TrendIcon />}
                        color="#1976D2"
                        subtitle="Intensidade de trabalho"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Fazendas Atendidas"
                        value={new Set(apontamentos.map(a => a.fazendaId).filter(Boolean)).size}
                        icon={<FarmIcon />}
                        color="#D32F2F"
                        subtitle="Cobertura operacional"
                    />
                </Grid>
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={3}>
                {/* Labor Trend */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Paper sx={{ p: 3, borderRadius: 4, height: 400 }}>
                        <Typography variant="h6" fontWeight="700" gutterBottom>
                            Evolução de Horas (Últimos 7 Dias)
                        </Typography>
                        <ResponsiveContainer width="100%" height="90%">
                            <LineChart data={laborTrendData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="horas"
                                    stroke={theme.palette.primary.main}
                                    strokeWidth={3}
                                    dot={{ r: 6 }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Distribution by Position */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Paper sx={{ p: 3, borderRadius: 4, height: 400 }}>
                        <Typography variant="h6" fontWeight="700" gutterBottom>
                            Equipe por Cargo
                        </Typography>
                        <ResponsiveContainer width="100%" height="90%">
                            <PieChart>
                                <Pie
                                    data={positionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {positionData.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Hours per Farm */}
                <Grid size={{ xs: 12 }}>
                    <Paper sx={{ p: 3, borderRadius: 4, height: 450 }}>
                        <Typography variant="h6" fontWeight="700" gutterBottom>
                            Alocação de Esforço por Fazenda/Unidade
                        </Typography>
                        <ResponsiveContainer width="100%" height="90%">
                            <BarChart data={hoursPerFarmData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={150} />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="total"
                                    fill={theme.palette.secondary.main}
                                    radius={[0, 4, 4, 0]}
                                    barSize={30}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
