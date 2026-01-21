import { useEffect, useState, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
    Box,
    Typography,
    Paper,
    TextField,
    InputAdornment,
    Card,
    CardContent,
    Grid,
    Tooltip,
    IconButton,
    Chip
} from '@mui/material';
import {
    Search as SearchIcon,
    FilterList as FilterListIcon,
    Storage as StorageIcon,
    Inventory as InventoryIcon,
    Store as StoreIcon
} from '@mui/icons-material';
import { estoqueService } from '../../services/estoqueService';
import type { EstoqueSaldo } from '../../services/estoqueService';

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

export default function SaldosPorDepositoPage() {
    const [saldos, setSaldos] = useState<EstoqueSaldo[]>([]);
    const [filteredSaldos, setFilteredSaldos] = useState<EstoqueSaldo[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Stats
    const stats = useMemo(() => {
        const totalVolume = saldos.reduce((acc, curr) => acc + curr.quantidade, 0);
        const uniqueProducts = new Set(saldos.map(s => s.produtoId)).size;
        const uniqueDeposits = new Set(saldos.map(s => s.depositoId)).size;

        return { totalVolume, uniqueProducts, uniqueDeposits };
    }, [saldos]);

    useEffect(() => {
        loadSaldos();
    }, []);

    useEffect(() => {
        if (!Array.isArray(saldos)) return;
        const lowerSearch = searchTerm.toLowerCase();
        const filtered = saldos.filter(s =>
            s.produto?.nome?.toLowerCase().includes(lowerSearch) ||
            s.deposito?.nome?.toLowerCase().includes(lowerSearch) ||
            s.produto?.codigo?.toLowerCase().includes(lowerSearch)
        );
        setFilteredSaldos(filtered);
    }, [searchTerm, saldos]);

    const loadSaldos = async () => {
        try {
            const data = await estoqueService.getSaldos();
            setSaldos(data);
            setFilteredSaldos(data);
        } catch (error) {
            console.error('Erro ao carregar saldos', error);
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'deposito',
            headerName: 'Local / Depósito',
            width: 250,
            renderCell: (params: GridRenderCellParams<EstoqueSaldo>) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <StoreIcon fontSize="small" color="action" />
                    <Typography variant="body2" fontWeight="500">
                        {params.row.deposito?.nome}
                    </Typography>
                </Box>
            )
        },
        {
            field: 'produto',
            headerName: 'Produto',
            flex: 1.5,
            minWidth: 300,
            renderCell: (params: GridRenderCellParams<EstoqueSaldo>) => (
                <Box>
                    <Typography variant="body2" fontWeight="600">
                        {params.row.produto?.nome}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Cód: {params.row.produto?.codigo || '-'}
                    </Typography>
                </Box>
            )
        },
        {
            field: 'quantidade',
            headerName: 'Saldo Atual',
            width: 180,
            align: 'right',
            renderCell: (params: GridRenderCellParams<EstoqueSaldo>) => (
                <Chip
                    label={`${params.value} ${params.row.produto?.unidadeMedida}`}
                    sx={{
                        fontWeight: 700,
                        bgcolor: params.value > 0 ? 'rgba(44, 85, 48, 0.1)' : 'rgba(211, 47, 47, 0.1)',
                        color: params.value > 0 ? '#2C5530' : '#d32f2f'
                    }}
                />
            )
        },
    ];

    return (
        <Box sx={{ maxWidth: 1600, margin: '0 auto' }}>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="overline" color="primary" fontWeight="700" letterSpacing={1.2}>
                    RELATÓRIOS E CONSULTAS
                </Typography>
                <Typography variant="h4" fontWeight="800" sx={{ color: '#1a1a1a', mb: 1 }}>
                    Saldos em Estoque por Depósito
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Visão consolidada da distribuição física dos materiais.
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Volume Total"
                        value={stats.totalVolume.toLocaleString('pt-BR')}
                        icon={<StorageIcon />}
                        color="#2C5530"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Produtos Distintos"
                        value={stats.uniqueProducts}
                        icon={<InventoryIcon />}
                        color="#1976D2"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Locais de Estoque"
                        value={stats.uniqueDeposits}
                        icon={<StoreIcon />}
                        color="#E65100"
                    />
                </Grid>
            </Grid>

            {/* Main Data Paper */}
            <Paper sx={{
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0px 4px 30px rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.04)'
            }}>
                {/* Toolbar */}
                <Box sx={{ p: 3, borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: 2, alignItems: 'center' }}>
                    <TextField
                        placeholder="Buscar por produto, código ou depósito..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{
                            flexGrow: 1,
                            maxWidth: 500,
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
                    <Tooltip title="Filtros Avançados">
                        <IconButton sx={{ bgcolor: '#F9F9F7', borderRadius: 2 }}>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                <DataGrid
                    rows={filteredSaldos}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel: { page: 0, pageSize: 15 } },
                    }}
                    pageSizeOptions={[15, 30, 50]}
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
            </Paper>
        </Box>
    );
}
