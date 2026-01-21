import { useEffect, useState, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
    Box,
    Button,
    Typography,
    Paper,
    IconButton,
    TextField,
    InputAdornment,
    Card,
    CardContent,
    Grid,
    Tooltip,
    Menu,
    MenuItem,
    Chip,
    Tabs,
    Tab
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    CheckCircle as CheckCircleIcon,
    Edit as EditIcon,
    TrendingDown as TrendingDownIcon,
    TrendingUp as TrendingUpIcon,
    AccountBalance as AccountBalanceIcon,
    FilterList as FilterListIcon,
    CalendarToday as CalendarTodayIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { financeiroService, TipoLancamento } from '../../services/financeiroService';
import type { LancamentoFinanceiro } from '../../services/financeiroService';

// --- Stat Card Component ---
const StatCard = ({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: string }) => (
    <Card sx={{ height: '100%', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', borderRadius: 3, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            p: 2,
            opacity: 0.1,
            transform: 'scale(2.5) translate(-10%, 10%)'
        }}>
            {icon}
        </Box>
        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
        </CardContent>
    </Card>
);

export default function ContasListPage() {
    const [lancamentos, setLancamentos] = useState<LancamentoFinanceiro[]>([]);
    const [filteredLancamentos, setFilteredLancamentos] = useState<LancamentoFinanceiro[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [tabValue, setTabValue] = useState(0); // 0: PAGAR, 1: RECEBER
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const navigate = useNavigate();
    const openMenu = Boolean(anchorEl);

    // Stats
    const stats = useMemo(() => {
        const totalValue = lancamentos.reduce((acc, l) => acc + (l.valor || 0), 0);
        const pendingCount = lancamentos.filter(l => l.status === 'PENDENTE').length;
        const totalBRL = totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        return {
            totalValue: totalBRL,
            pendingCount
        };
    }, [lancamentos]);

    useEffect(() => {
        loadLancamentos();
    }, [tabValue]);

    useEffect(() => {
        if (!Array.isArray(lancamentos)) return;
        const lowerSearch = searchTerm.toLowerCase();
        const filtered = lancamentos.filter(l =>
            l.descricao?.toLowerCase().includes(lowerSearch) ||
            l.planoContas?.descricao?.toLowerCase().includes(lowerSearch)
        );
        setFilteredLancamentos(filtered);
    }, [searchTerm, lancamentos]);

    const loadLancamentos = async () => {
        try {
            const tipo = tabValue === 0 ? TipoLancamento.PAGAR : TipoLancamento.RECEBER;
            const data = await financeiroService.getLancamentos({ tipo });
            const safeData = Array.isArray(data) ? data : [];
            setLancamentos(safeData);
            setFilteredLancamentos(safeData);
        } catch (error) {
            console.error('Erro ao carregar lançamentos', error);
            setLancamentos([]);
            setFilteredLancamentos([]);
        }
    };

    const handleBaixar = async (id: string) => {
        const dataPagamento = new Date().toISOString().split('T')[0];
        try {
            await financeiroService.baixarLancamento(id, dataPagamento);
            loadLancamentos();
        } catch (error) {
            console.error('Erro ao baixar conta', error);
        }
        handleMenuClose();
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedId(id);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedId(null);
    };

    const columns: GridColDef<LancamentoFinanceiro>[] = [
        {
            field: 'dataVencimento', headerName: 'Vencimento', width: 130,
            valueGetter: (_value, row) => new Date(row.dataVencimento),
            valueFormatter: (value) => value ? format(value as Date, 'dd/MM/yyyy') : '-'
        },
        {
            field: 'descricao', headerName: 'Descrição / Favorecido', flex: 1.5, minWidth: 250,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <Typography variant="body2" fontWeight="600" color="text.primary">
                        {params.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Cat: {params.row.planoContas?.descricao || 'Sem Categoria'}
                    </Typography>
                </Box>
            )
        },
        {
            field: 'valor',
            headerName: 'Valor',
            width: 150,
            align: 'right',
            renderCell: (params) => (
                <Typography sx={{ fontWeight: '800', color: params.row.tipo === 'PAGAR' ? '#D32F2F' : '#2E7D32' }}>
                    {params.value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Typography>
            )
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            align: 'center',
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    color={params.value === 'PAGO' ? 'success' : params.value === 'PENDENTE' ? 'warning' : 'default'}
                    sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                />
            )
        },
        {
            field: 'actions',
            headerName: '',
            width: 60,
            align: 'center',
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams<LancamentoFinanceiro>) => (
                <IconButton onClick={(e) => handleMenuClick(e, params.row.id as string)} size="small">
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            ),
        },
    ];

    return (
        <Box sx={{ maxWidth: 1600, margin: '0 auto' }}>
            {/* Header Section */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="overline" color="primary" fontWeight="700" letterSpacing={1.2}>
                        GESTÃO FINANCEIRA
                    </Typography>
                    <Typography variant="h4" fontWeight="800" sx={{ color: '#1a1a1a', mb: 1 }}>
                        Contas a {tabValue === 0 ? 'Pagar' : 'Receber'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Controle de fluxo de caixa, vencimentos e liquidação de títulos.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/financeiro/lancamentos/novo')}
                    sx={{
                        borderRadius: 3,
                        px: 3,
                        py: 1,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        boxShadow: '0px 8px 20px rgba(44, 85, 48, 0.25)',
                        background: 'linear-gradient(135deg, #2C5530 0%, #1B3A1E 100%)'
                    }}
                >
                    Novo Lançamento
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title={`Total a ${tabValue === 0 ? 'Pagar' : 'Receber'}`}
                        value={stats.totalValue}
                        icon={tabValue === 0 ? <TrendingDownIcon /> : <TrendingUpIcon />}
                        color={tabValue === 0 ? '#D32F2F' : '#2E7D32'}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Títulos Pendentes"
                        value={stats.pendingCount}
                        icon={<CalendarTodayIcon />}
                        color="#ED6C02"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Saldo em Conta"
                        value="R$ 145.200,00"
                        icon={<AccountBalanceIcon />}
                        color="#1976D2"
                    />
                </Grid>
            </Grid>

            {/* Tabs & Toolbar */}
            <Paper sx={{
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0px 4px 30px rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.04)',
                mb: 4
            }}>
                <Tabs
                    value={tabValue}
                    onChange={(_e, val) => setTabValue(val)}
                    variant="fullWidth"
                    sx={{
                        borderBottom: '1px solid rgba(0,0,0,0.06)',
                        '& .MuiTab-root': { py: 2, fontWeight: 700, fontSize: '0.9rem' }
                    }}
                >
                    <Tab label="Contas a Pagar" icon={<TrendingDownIcon />} iconPosition="start" />
                    <Tab label="Contas a Receber" icon={<TrendingUpIcon />} iconPosition="start" />
                </Tabs>

                <Box sx={{ p: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                    <TextField
                        placeholder="Buscar por descrição ou categoria..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{
                            flexGrow: 1,
                            maxWidth: 400,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                backgroundColor: '#F9F9F7'
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Tooltip title="Filtros por Data">
                        <IconButton sx={{ bgcolor: '#F9F9F7', borderRadius: 2 }}>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* Data Grid */}
                <Box sx={{ height: 600, width: '100%' }}>
                    <DataGrid
                        rows={filteredLancamentos}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        rowHeight={70}
                        sx={{
                            border: 'none',
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#F9F9F7',
                                color: '#5D4037',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                                letterSpacing: '0.05em'
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom: '1px solid rgba(0,0,0,0.04)',
                                color: '#455A64'
                            },
                            '& .MuiDataGrid-row:hover': {
                                backgroundColor: 'rgba(44, 85, 48, 0.02)'
                            }
                        }}
                    />
                </Box>
            </Paper>

            {/* Actions Menu */}
            <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                        mt: 1.5,
                        borderRadius: 2,
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => selectedId && handleBaixar(selectedId)} sx={{ py: 1.5, px: 2.5 }}>
                    <CheckCircleIcon fontSize="small" sx={{ mr: 1.5, color: 'success.main' }} /> Confirmar Baixa
                </MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ py: 1.5, px: 2.5 }}>
                    <EditIcon fontSize="small" sx={{ mr: 1.5, color: 'primary.main' }} /> Editar Lançamento
                </MenuItem>
            </Menu>
        </Box>
    );
}
