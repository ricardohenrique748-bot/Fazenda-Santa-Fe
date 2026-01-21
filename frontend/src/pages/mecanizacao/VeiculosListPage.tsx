import { useEffect, useState } from 'react';
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
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    DirectionsCar as CarIcon,
    Build as BuildIcon,
    CheckCircle as CheckCircleIcon,
    FilterList as FilterListIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { veiculosService, StatusVeiculo } from '../../services/veiculosService';
import type { Veiculo } from '../../services/veiculosService';

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

export default function VeiculosListPage() {
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [filteredVeiculos, setFilteredVeiculos] = useState<Veiculo[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const navigate = useNavigate();
    const openMenu = Boolean(anchorEl);

    // Stats
    const stats = {
        total: veiculos?.length || 0,
        ativos: veiculos?.filter(v => v.status === StatusVeiculo.ATIVO).length || 0,
        manutencao: veiculos?.filter(v => v.status === StatusVeiculo.MANUTENCAO).length || 0
    };

    useEffect(() => {
        loadVeiculos();
    }, []);

    useEffect(() => {
        if (!Array.isArray(veiculos)) return;
        const lowerSearch = searchTerm.toLowerCase();
        const filtered = veiculos.filter(v =>
            v.nome?.toLowerCase().includes(lowerSearch) ||
            v.placa?.toLowerCase().includes(lowerSearch) ||
            v.numeroFrota?.toLowerCase().includes(lowerSearch) ||
            v.tipo?.toLowerCase().includes(lowerSearch) ||
            v.empresa?.razaoSocial?.toLowerCase().includes(lowerSearch)
        );
        setFilteredVeiculos(filtered);
    }, [searchTerm, veiculos]);

    const loadVeiculos = async () => {
        try {
            const data = await veiculosService.getAll();
            const safeData = Array.isArray(data) ? data : [];
            setVeiculos(safeData);
            setFilteredVeiculos(safeData);
        } catch (error) {
            console.error('Erro ao carregar veículos', error);
            setVeiculos([]);
            setFilteredVeiculos([]);
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
        if (selectedId) navigate(`/mecanizacao/veiculos/${selectedId}`);
        handleMenuClose();
    };

    const handleDelete = async () => {
        if (selectedId && window.confirm('Tem certeza que deseja excluir este veículo?')) {
            try {
                await veiculosService.delete(selectedId);
                loadVeiculos();
            } catch (error) {
                console.error('Erro ao excluir veículo', error);
            }
        }
        handleMenuClose();
    };

    const getStatusStyles = (status: StatusVeiculo) => {
        switch (status) {
            case StatusVeiculo.ATIVO: return { color: '#2E7D32', bg: 'rgba(76, 175, 80, 0.1)' };
            case StatusVeiculo.MANUTENCAO: return { color: '#ED6C02', bg: 'rgba(237, 108, 2, 0.1)' };
            case StatusVeiculo.INATIVO: return { color: '#D32F2F', bg: 'rgba(211, 47, 47, 0.1)' };
            default: return { color: '#757575', bg: 'rgba(0, 0, 0, 0.05)' };
        }
    };

    const columns: GridColDef<Veiculo>[] = [
        {
            field: 'nome', headerName: 'Máquina / Veículo', flex: 1.2, minWidth: 220,
            renderCell: (params: GridRenderCellParams<Veiculo>) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <Typography variant="body2" fontWeight="600" color="text.primary">
                        {params.value}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                            Frota: {params.row.numeroFrota || '-'}
                        </Typography>
                        {params.row.placa && (
                            <Chip label={params.row.placa} size="small" sx={{ height: 16, fontSize: '0.6rem', borderRadius: 0.5 }} />
                        )}
                    </Box>
                </Box>
            )
        },
        { field: 'tipo', headerName: 'Tipo', width: 150 },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => {
                const styles = getStatusStyles(params.value as StatusVeiculo);
                return (
                    <Chip
                        label={params.value as string}
                        size="small"
                        sx={{
                            bgcolor: styles.bg,
                            color: styles.color,
                            fontWeight: 700,
                            borderRadius: 1.5,
                            textTransform: 'uppercase',
                            fontSize: '0.65rem'
                        }}
                    />
                );
            }
        },
        {
            field: 'horimetroAtual',
            headerName: 'Horímetro Atual',
            width: 140,
            valueFormatter: (value) => value ? `${value} h` : '-'
        },
        {
            field: 'empresa',
            headerName: 'Empresa',
            flex: 1,
            minWidth: 150,
            valueGetter: (_value, row) => row.empresa?.razaoSocial || '-',
        },
        {
            field: 'actions',
            headerName: '',
            width: 60,
            align: 'center',
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams<Veiculo>) => (
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
                        MECANIZAÇÃO / FROTA
                    </Typography>
                    <Typography variant="h4" fontWeight="800" sx={{ color: '#1a1a1a', mb: 1 }}>
                        Veículos e Equipamentos
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Monitore a disponibilidade e manutenção da frota agrícola.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/mecanizacao/veiculos/novo')}
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
                    Novo Veículo
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Frota Total"
                        value={stats.total}
                        icon={<CarIcon />}
                        color="#2C5530"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Veículos Ativos"
                        value={stats.ativos}
                        icon={<CheckCircleIcon />}
                        color="#2E7D32"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Em Manutenção"
                        value={stats.manutencao}
                        icon={<BuildIcon />}
                        color="#ED6C02"
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
                        placeholder="Buscar veículo..."
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
                        rows={filteredVeiculos}
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
                <MenuItem onClick={handleEdit} sx={{ py: 1.5, px: 2.5 }}>
                    <EditIcon fontSize="small" sx={{ mr: 1.5, color: 'primary.main' }} /> Editar
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ py: 1.5, px: 2.5, color: 'error.main' }}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1.5 }} /> Excluir
                </MenuItem>
            </Menu>
        </Box>
    );
}
