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
    Avatar
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    FactCheck as FactCheckIcon,
    People as PeopleIcon,
    QueryBuilder as HourIcon,
    FilterList as FilterListIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { apontamentosService } from '../../services/apontamentosService';
import type { Apontamento } from '../../services/apontamentosService';

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

export default function ApontamentosListPage() {
    const [apontamentos, setApontamentos] = useState<Apontamento[]>([]);
    const [filteredApontamentos, setFilteredApontamentos] = useState<Apontamento[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const navigate = useNavigate();
    const openMenu = Boolean(anchorEl);

    // Stats
    const stats = useMemo(() => {
        const total = apontamentos.length;
        const totalHours = apontamentos.reduce((acc, a) => acc + (a.quantidade || 0), 0);
        const distinctStaff = new Set(apontamentos.map(a => a.funcionarioId).filter(Boolean)).size;

        return {
            total,
            totalHours,
            distinctStaff
        };
    }, [apontamentos]);

    useEffect(() => {
        loadApontamentos();
    }, []);

    useEffect(() => {
        if (!Array.isArray(apontamentos)) return;
        const lowerSearch = searchTerm.toLowerCase();
        const filtered = apontamentos.filter(a =>
            a.funcionario?.nome?.toLowerCase().includes(lowerSearch) ||
            a.tipo?.toLowerCase().includes(lowerSearch) ||
            a.fazenda?.nome?.toLowerCase().includes(lowerSearch)
        );
        setFilteredApontamentos(filtered);
    }, [searchTerm, apontamentos]);

    const loadApontamentos = async () => {
        try {
            const data = await apontamentosService.getAll();
            const safeData = Array.isArray(data) ? data : [];
            setApontamentos(safeData);
            setFilteredApontamentos(safeData);
        } catch (error) {
            console.error('Erro ao carregar apontamentos', error);
            setApontamentos([]);
            setFilteredApontamentos([]);
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
        if (selectedId) navigate(`/rh/apontamentos/${selectedId}`);
        handleMenuClose();
    };

    const handleDelete = async () => {
        if (selectedId && window.confirm('Tem certeza que deseja excluir este apontamento?')) {
            try {
                await apontamentosService.delete(selectedId);
                loadApontamentos();
            } catch (error) {
                console.error('Erro ao excluir apontamento', error);
            }
        }
        handleMenuClose();
    };

    const columns: GridColDef<Apontamento>[] = [
        {
            field: 'data', headerName: 'Data', width: 130,
            valueGetter: (_value, row) => new Date(row.data),
            valueFormatter: (value) => value ? format(value as Date, 'dd/MM/yyyy') : '-'
        },
        {
            field: 'funcionario', headerName: 'Funcionário / Colaborador', flex: 1.5, minWidth: 250,
            valueGetter: (_value, row) => row.funcionario?.nome || '-',
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.8rem' }}>
                        {String(params.value).split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </Avatar>
                    <Box>
                        <Typography variant="body2" fontWeight="600" color="text.primary">
                            {params.value}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Fazenda: {params.row.fazenda?.nome || '-'}
                        </Typography>
                    </Box>
                </Box>
            )
        },
        {
            field: 'tipo',
            headerName: 'Atividade Rural',
            width: 150,
            renderCell: (params) => (
                <Chip
                    label={params.value}
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
        {
            field: 'quantidade',
            headerName: 'Horas/Qtd',
            width: 120,
            align: 'center',
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <HourIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" fontWeight="700">
                        {params.value}
                    </Typography>
                </Box>
            )
        },
        {
            field: 'actions',
            headerName: '',
            width: 60,
            align: 'center',
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams<Apontamento>) => (
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
                        RECURSOS HUMANOS E CAMPO
                    </Typography>
                    <Typography variant="h4" fontWeight="800" sx={{ color: '#1a1a1a', mb: 1 }}>
                        Apontamentos de Labor
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Controle diário de tarefas, horas trabalhadas e produtividade.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/rh/apontamentos/novo')}
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
                    Novo Apontamento
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Registros Realizados"
                        value={stats.total}
                        icon={<FactCheckIcon />}
                        color="#2C5530"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Volume de Horas"
                        value={stats.totalHours}
                        icon={<HourIcon />}
                        color="#2E7D32"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Equipe em Atividade"
                        value={stats.distinctStaff}
                        icon={<PeopleIcon />}
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
                        placeholder="Buscar funcionário, tipo ou fazenda..."
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
                        rows={filteredApontamentos}
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
                    <EditIcon fontSize="small" sx={{ mr: 1.5, color: 'primary.main' }} /> Editar Apontamento
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ py: 1.5, px: 2.5, color: 'error.main' }}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1.5 }} /> Excluir Registro
                </MenuItem>
            </Menu>
        </Box>
    );
}
