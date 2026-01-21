import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, TextField, Button } from '@mui/material';
import { TrendingUp, TrendingDown, AccountBalance, Schedule } from '@mui/icons-material';
import { financeiroService } from '../../services/financeiroService';
import { startOfMonth, endOfMonth, format, subMonths } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function FluxoCaixaDashboard() {
    const [resumo, setResumo] = useState<any>(null);
    const [startDate, setStartDate] = useState(format(startOfMonth(new Date()), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(endOfMonth(new Date()), 'yyyy-MM-dd'));

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadResumo();
    }, []);

    const loadResumo = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await financeiroService.getFluxoCaixa(startDate, endDate);
            setResumo(data);
        } catch (error: any) {
            console.error('Erro ao carregar resumo financeiro', error);
            setError(error.response?.data?.message || error.message || 'Erro ao carregar dados');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Typography>Carregando...</Typography>;
    if (error) return (
        <Box sx={{ p: 3 }}>
            <Typography color="error" variant="h6" gutterBottom>Erro ao carregar dados</Typography>
            <Typography color="error">{error}</Typography>
            <Button variant="outlined" startIcon={<TrendingUp />} onClick={loadResumo} sx={{ mt: 2 }}>
                Tentar Novamente
            </Button>
        </Box>
    );
    if (!resumo) return <Typography>Nenhum dado disponível.</Typography>;

    const cards = [
        { title: 'Entradas Previstas', value: resumo.entradas, icon: <TrendingUp color="success" />, color: 'success.light' },
        { title: 'Saídas Previstas', value: resumo.saidas, icon: <TrendingDown color="error" />, color: 'error.light' },
        { title: 'Saldo Realizado (Caixa)', value: resumo.realizado, icon: <AccountBalance color="primary" />, color: 'info.light' },
        { title: 'Saldo Pendente', value: resumo.pendente, icon: <Schedule color="warning" />, color: 'warning.light' },
    ];

    const chartData = [
        {
            name: 'Fluxo',
            Entradas: resumo.entradas,
            Saidas: resumo.saidas,
        }
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Fluxo de Caixa</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
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
                    <Button variant="contained" onClick={loadResumo}>Filtrar</Button>
                </Box>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                {cards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex' }}>
                        <Card sx={{ borderLeft: 5, borderColor: card.color, width: '100%' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography color="textSecondary" variant="subtitle2">{card.title}</Typography>
                                    {card.icon}
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(card.value)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Comparativo Receitas x Despesas</Typography>
                <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value as number)} />
                            <Legend />
                            <Bar dataKey="Entradas" fill="#4caf50" />
                            <Bar dataKey="Saidas" fill="#f44336" />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </Paper>
        </Box>
    );
}
