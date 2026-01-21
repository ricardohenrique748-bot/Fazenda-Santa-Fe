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
    Chip
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    Description as DescriptionIcon,
    Assignment as AssignmentIcon,
    AttachMoney as AttachMoneyIcon,
    FilterList as FilterListIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { comprasService } from '../../services/comprasService';
import type { ContratoComercial } from '../../services/comprasService';

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

export default function ContratosListPage() {
    const [contratos, setContratos] = useState<ContratoComercial[]>([]);
    const [filteredContratos, setFilteredContratos] = useState<ContratoComercial[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const navigate = useNavigate();
    const openMenu = Boolean(anchorEl);

    // Stats
    const stats = useMemo(() => {
        const activeCount = contratos.filter(c => c.status === 'ATIVO').length;
        const totalVolume = contratos.reduce((acc, c) => acc + c.quantidadeTotal, 0);
        const totalValue = contratos.reduce((acc, c) => acc + (c.quantidadeTotal * c.valorPorUnidade), 0);

        return {
            activeCount,
            totalVolume: totalVolume.toLocaleString('pt-BR'),
            totalValue: totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        };
    }, [contratos]);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (!Array.isArray(contratos)) return;
        const lowerSearch = searchTerm.toLowerCase();
        const filtered = contratos.filter(c =>
            c.cliente?.toLowerCase().includes(lowerSearch) ||
            c.cultura?.toLowerCase().includes(lowerSearch) ||
            c.safra?.toLowerCase().includes(lowerSearch)
        );
        setFilteredContratos(filtered);
    }, [searchTerm, contratos]);

    const loadData = async () => {
        try {
            const data = await comprasService.getContratos();
            const safeData = Array.isArray(data) ? data : [];
            setContratos(safeData);
            setFilteredContratos(safeData);
        } catch (error) {
            console.error('Erro ao carregar contratos', error);
            setContratos([]);
            setFilteredContratos([]);
        }
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedId(id);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedId(null);
    };

    const columns: GridColDef<ContratoComercial>[] = [
        {
            field: 'cliente', headerName: 'Cliente / Comprador', flex: 1.5, minWidth: 250,
            renderCell: (params: GridRenderCellParams<ContratoComercial>) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <Typography variant="body2" fontWeight="600" color="text.primary">
                        {params.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Safra: {params.row.safra}
                    </Typography>
                </Box>
            )
        },
        { field: 'cultura', headerName: 'Cultura', width: 130 },
        {
            field: 'quantidadeTotal',
            headerName: 'Qtde Total',
            width: 150,
            align: 'right',
            valueFormatter: (value) => `${value?.toLocaleString('pt-BR')} KG`
        },
        {
            field: 'valorPorUnidade',
            headerName: 'Vlr Unit.',
            width: 130,
            align: 'right',
            valueFormatter: (value) => value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        },
        {
            field: 'dataVencimento',
            headerName: 'Vencimento',
            width: 130,
            valueFormatter: (value) => value ? format(new Date(value), 'dd/MM/yyyy') : '-'
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    color={params.value === 'ATIVO' ? 'success' : 'default'}
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
            renderCell: (params: GridRenderCellParams<ContratoComercial>) => (
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
                        COMERCIAL E VENDAS
                    </Typography>
                    <Typography variant="h4" fontWeight="800" sx={{ color: '#1a1a1a', mb: 1 }}>
                        Contratos Comerciais
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Gestão de contratos de venda futura e fixação de preços.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    disabled
                    sx={{
                        borderRadius: 3,
                        px: 3,
                        py: 1,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        opacity: 0.7,
                        bgcolor: '#2C5530'
                    }}
                >
                    Novo Contrato (Breve)
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Contratos Ativos"
                        value={stats.activeCount}
                        icon={<DescriptionIcon />}
                        color="#2C5530"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Volume Total (KG)"
                        value={stats.totalVolume}
                        icon={<AssignmentIcon />}
                        color="#2E7D32"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Vlr. Potencial"
                        value={stats.totalValue}
                        icon={<AttachMoneyIcon />}
                        color="#1976D2"
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
                        placeholder="Buscar cliente, cultura ou safra..."
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
                    <Tooltip title="Filtros Avançados">
                        <IconButton sx={{ bgcolor: '#F9F9F7', borderRadius: 2 }}>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* Data Grid */}
                <Box sx={{ height: 600, width: '100%' }}>
                    <DataGrid
                        rows={filteredContratos}
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
                <MenuItem onClick={handleMenuClose} sx={{ py: 1.5, px: 2.5 }}>
                    <EditIcon fontSize="small" sx={{ mr: 1.5, color: 'primary.main' }} /> Visualizar Detalhes
                </MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ py: 1.5, px: 2.5, color: 'error.main' }}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1.5 }} /> Cancelar Contrato
                </MenuItem>
            </Menu>
        </Box>
    );
}
