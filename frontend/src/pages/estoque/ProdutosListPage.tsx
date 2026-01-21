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
    Chip,
    Card,
    CardContent,
    Grid,
    Tooltip,
    Menu,
    MenuItem
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Inventory as InventoryIcon,
    Category as CategoryIcon,
    Storage as StorageIcon,
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    History as HistoryIcon,
    FilterList as FilterListIcon,
    CompareArrows as CompareArrowsIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { estoqueService } from '../../services/estoqueService';
import type { Produto } from '../../services/estoqueService';

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

export default function ProdutosListPage() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [filteredProdutos, setFilteredProdutos] = useState<Produto[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const navigate = useNavigate();
    const openMenu = Boolean(anchorEl);

    // Stats Calculation with extreme defensiveness
    const stats = useMemo(() => {
        if (!Array.isArray(produtos)) return { totalItems: 0, categories: 0, totalStock: '0' };

        const totalItems = produtos.length;
        const categories = new Set(produtos.map(p => p?.categoria).filter(Boolean)).size;

        const stockSum = produtos.reduce((acc, p) => {
            const rowStock = Array.isArray(p?.estoques)
                ? p.estoques.reduce((s, e) => s + (Number(e?.quantidade) || 0), 0)
                : 0;
            return acc + rowStock;
        }, 0);

        return {
            totalItems,
            categories,
            totalStock: stockSum.toLocaleString('pt-BR')
        };
    }, [produtos]);

    useEffect(() => {
        loadProdutos();
    }, []);

    useEffect(() => {
        if (!Array.isArray(produtos)) return;
        const lowerSearch = searchTerm.toLowerCase();
        const filtered = produtos.filter(p =>
            p?.nome?.toLowerCase().includes(lowerSearch) ||
            p?.codigo?.toLowerCase().includes(lowerSearch) ||
            p?.categoria?.toLowerCase().includes(lowerSearch)
        );
        setFilteredProdutos(filtered);
    }, [searchTerm, produtos]);

    const loadProdutos = async () => {
        try {
            const data = await estoqueService.getProdutos();
            const safeData = Array.isArray(data) ? data : [];
            setProdutos(safeData);
            setFilteredProdutos(safeData);
        } catch (error) {
            console.error('Erro ao carregar produtos', error);
            setProdutos([]);
            setFilteredProdutos([]);
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

    const handleEdit = () => {
        if (selectedId) navigate(`/estoque/produtos/${selectedId}`);
        handleMenuClose();
    };

    const handleMovimentacao = () => {
        if (selectedId) navigate(`/estoque/movimentacoes?produtoId=${selectedId}`);
        handleMenuClose();
    };

    const handleDelete = async () => {
        if (selectedId && window.confirm('Tem certeza que deseja excluir este produto?')) {
            // Logic for deletion if implemented in service
            handleMenuClose();
        }
    };

    const columns: GridColDef<Produto>[] = [
        {
            field: 'nome', headerName: 'Descrição/Material', flex: 1.5, minWidth: 250,
            renderCell: (params: GridRenderCellParams<Produto>) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <Typography variant="body2" fontWeight="600" color="text.primary">
                        {params.value || 'Sem nome'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Cód: {params.row?.codigo || '-'}
                    </Typography>
                </Box>
            )
        },
        {
            field: 'categoria',
            headerName: 'Categoria',
            width: 150,
            renderCell: (params) => (
                <Chip
                    label={String(params.value || 'Geral')}
                    size="small"
                    sx={{
                        bgcolor: 'rgba(44, 85, 48, 0.08)',
                        color: '#2C5530',
                        fontWeight: 600,
                        fontSize: '0.7rem'
                    }}
                />
            )
        },
        { field: 'unidadeMedida', headerName: 'UM', width: 80, align: 'center' },
        {
            field: 'saldoTotal',
            headerName: 'Saldo em Estoque',
            width: 150,
            align: 'right',
            renderCell: (params) => {
                const total = Array.isArray(params.row?.estoques)
                    ? params.row.estoques.reduce((acc, curr) => acc + (Number(curr?.quantidade) || 0), 0)
                    : 0;
                return (
                    <Typography
                        variant="body2"
                        fontWeight="700"
                        color={total > 0 ? 'primary.main' : 'error.main'}
                    >
                        {total.toLocaleString('pt-BR')} {params.row?.unidadeMedida || ''}
                    </Typography>
                );
            }
        },
        {
            field: 'actions',
            headerName: '',
            width: 60,
            align: 'center',
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams<Produto>) => (
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
                        ESTOQUE E LOGÍSTICA
                    </Typography>
                    <Typography variant="h4" fontWeight="800" sx={{ color: '#1a1a1a', mb: 1 }}>
                        Catálogo de Produtos
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Gerencie o mestre de materiais e controle volumétrico de itens.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<HistoryIcon />}
                        onClick={() => navigate('/estoque/movimentacoes')}
                        sx={{
                            borderRadius: 3,
                            textTransform: 'none',
                            fontWeight: 600,
                            color: '#2C5530',
                            borderColor: '#2C5530'
                        }}
                    >
                        Histórico
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/estoque/produtos/novo')}
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
                        Novo Produto
                    </Button>
                </Box>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Itens no Catálogo"
                        value={stats.totalItems}
                        icon={<InventoryIcon />}
                        color="#2C5530"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Categorias Ativas"
                        value={stats.categories}
                        icon={<CategoryIcon />}
                        color="#2E7D32"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Volume em Estoque"
                        value={stats.totalStock}
                        icon={<StorageIcon />}
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
                        placeholder="Buscar produto ou código..."
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
                        rows={filteredProdutos}
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
                <MenuItem onClick={handleMovimentacao} sx={{ py: 1.5, px: 2.5 }}>
                    <CompareArrowsIcon fontSize="small" sx={{ mr: 1.5, color: '#1976D2' }} /> Lançar Movimentação
                </MenuItem>
                <MenuItem onClick={handleEdit} sx={{ py: 1.5, px: 2.5 }}>
                    <EditIcon fontSize="small" sx={{ mr: 1.5, color: 'primary.main' }} /> Detalhes / Editar
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ py: 1.5, px: 2.5, color: 'error.main' }}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1.5 }} /> Excluir
                </MenuItem>
            </Menu>
        </Box>
    );
}
