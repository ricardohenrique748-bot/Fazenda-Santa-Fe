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
    Build as BuildIcon,
    Engineering as EngineeringIcon,
    Payments as PaymentsIcon,
    FilterList as FilterListIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { manutencoesService } from '../../services/manutencoesService';
import type { Manutencao } from '../../services/manutencoesService';

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

export default function ManutencoesListPage() {
    const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
    const [filteredManutencoes, setFilteredManutencoes] = useState<Manutencao[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const navigate = useNavigate();
    const openMenu = Boolean(anchorEl);

    // Stats
    const stats = useMemo(() => {
        const total = manutencoes.length;
        const totalCost = manutencoes.reduce((acc, m) => acc + (Number(m.custoTotal) || 0), 0);
        const correctiveCount = manutencoes.filter(m => m.tipo === 'CORRETIVA').length;

        return {
            total,
            totalCost: totalCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            correctiveCount
        };
    }, [manutencoes]);

    useEffect(() => {
        loadManutencoes();
    }, []);

    useEffect(() => {
        if (!Array.isArray(manutencoes)) return;
        const lowerSearch = searchTerm.toLowerCase();
        const filtered = manutencoes.filter(m =>
            m.veiculo?.nome?.toLowerCase().includes(lowerSearch) ||
            m.tipo?.toLowerCase().includes(lowerSearch) ||
            m.descricao?.toLowerCase().includes(lowerSearch)
        );
        setFilteredManutencoes(filtered);
    }, [searchTerm, manutencoes]);

    const loadManutencoes = async () => {
        try {
            const data = await manutencoesService.getAll();
            const safeData = Array.isArray(data) ? data : [];
            setManutencoes(safeData);
            setFilteredManutencoes(safeData);
        } catch (error) {
            console.error('Erro ao carregar manutenções', error);
            setManutencoes([]);
            setFilteredManutencoes([]);
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
        if (selectedId) navigate(`/mecanizacao/manutencoes/${selectedId}`);
        handleMenuClose();
    };

    const handleDelete = async () => {
        if (selectedId && window.confirm('Tem certeza que deseja excluir esta manutenção?')) {
            try {
                await manutencoesService.delete(selectedId);
                loadManutencoes();
            } catch (error) {
                console.error('Erro ao excluir manutenção', error);
            }
        }
        handleMenuClose();
    };

    const columns: GridColDef<Manutencao>[] = [
        {
            field: 'data', headerName: 'Data', width: 130,
            valueGetter: (_value, row) => new Date(row.data),
            valueFormatter: (value) => value ? format(value as Date, 'dd/MM/yyyy') : '-'
        },
        {
            field: 'veiculo', headerName: 'Máquina / Veículo', flex: 1.2, minWidth: 200,
            valueGetter: (_value, row) => row.veiculo?.nome || '-',
            renderCell: (params) => (
                <Typography variant="body2" fontWeight="600" color="text.primary">
                    {params.value}
                </Typography>
            )
        },
        {
            field: 'tipo',
            headerName: 'Tipo',
            width: 150,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    sx={{
                        bgcolor: params.value === 'CORRETIVA' ? 'rgba(211, 47, 47, 0.08)' : 'rgba(2, 136, 209, 0.08)',
                        color: params.value === 'CORRETIVA' ? '#D32F2F' : '#0288D1',
                        fontWeight: 600,
                        fontSize: '0.7rem'
                    }}
                />
            )
        },
        {
            field: 'custoTotal',
            headerName: 'Custo Total',
            width: 150,
            align: 'right',
            valueFormatter: (value) => value ? Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'R$ 0,00'
        },
        {
            field: 'actions',
            headerName: '',
            width: 60,
            align: 'center',
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams<Manutencao>) => (
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
                        MECANIZAÇÃO E FROTA
                    </Typography>
                    <Typography variant="h4" fontWeight="800" sx={{ color: '#1a1a1a', mb: 1 }}>
                        Registro de Manutenções
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Histórico completo de intervenções técnicas e custos de oficina.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/mecanizacao/manutencoes/novo')}
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
                    Nova Manutenção
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Intervenções Realizadas"
                        value={stats.total}
                        icon={<EngineeringIcon />}
                        color="#2C5530"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Investimento Total"
                        value={stats.totalCost}
                        icon={<PaymentsIcon />}
                        color="#1976D2"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Manutenções Corretivas"
                        value={stats.correctiveCount}
                        icon={<BuildIcon />}
                        color="#D32F2F"
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
                        placeholder="Buscar veículo, tipo ou descrição..."
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
                        rows={filteredManutencoes}
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
                    <EditIcon fontSize="small" sx={{ mr: 1.5, color: 'primary.main' }} /> Editar Manutenção
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ py: 1.5, px: 2.5, color: 'error.main' }}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1.5 }} /> Excluir Registro
                </MenuItem>
            </Menu>
        </Box>
    );
}
