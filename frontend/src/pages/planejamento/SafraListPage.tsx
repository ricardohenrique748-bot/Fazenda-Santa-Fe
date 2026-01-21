import { useEffect, useState, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
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
    Menu,
    MenuItem,
    Chip,
    Avatar
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    CheckCircle as CheckCircleIcon,
    CalendarMonth as CalendarMonthIcon,
    AutoGraph as AutoGraphIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { planejamentoService } from '../../services/planejamentoService';
import type { Safra } from '../../services/planejamentoService';

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

export default function SafraListPage() {
    const [safras, setSafras] = useState<Safra[]>([]);
    const [filteredSafras, setFilteredSafras] = useState<Safra[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const navigate = useNavigate();
    const openMenu = Boolean(anchorEl);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await planejamentoService.getSafras();
            setSafras(Array.isArray(data) ? data : []);
            setFilteredSafras(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Erro ao carregar safras:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter logic
    useEffect(() => {
        const filtered = safras.filter(s =>
            s.nome?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSafras(filtered);
    }, [searchTerm, safras]);

    // Stats calculations
    const stats = useMemo(() => {
        return {
            total: safras.length,
            ativas: safras.filter(s => s.ativo).length,
            planejamentos: safras.reduce((acc, s) => acc + (s._count?.planejamentos || 0), 0)
        };
    }, [safras]);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedId(id);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedId(null);
    };

    const columns: GridColDef[] = [
        {
            field: 'nome',
            headerName: 'Nome da Safra',
            flex: 1.5,
            minWidth: 250,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#2C5530', width: 32, height: 32, fontSize: '0.8rem' }}>
                        {params.value?.substring(0, 1).toUpperCase()}
                    </Avatar>
                    <Box>
                        <Typography variant="body2" fontWeight="700" color="text.primary">
                            {params.value}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            ID: {params.row.id.substring(0, 8)}
                        </Typography>
                    </Box>
                </Box>
            )
        },
        {
            field: 'dataInicio',
            headerName: 'Período',
            flex: 1,
            minWidth: 200,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', fontWeight: 600 }}>
                        {params.row.dataInicio ? format(new Date(params.row.dataInicio), 'dd/MM/yyyy') : '-'}
                        <Typography variant="caption">até</Typography>
                        {params.row.dataFim ? format(new Date(params.row.dataFim), 'dd/MM/yyyy') : '-'}
                    </Typography>
                </Box>
            )
        },
        {
            field: 'ativo',
            headerName: 'Status',
            width: 120,
            align: 'center',
            renderCell: (params) => (
                <Chip
                    label={params.value ? 'Ativo' : 'Inativo'}
                    color={params.value ? 'success' : 'default'}
                    size="small"
                    sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                />
            )
        },
        {
            field: '_count',
            headerName: 'Planejamentos',
            width: 150,
            align: 'center',
            renderCell: (params) => (
                <Chip
                    label={`${params.row._count?.planejamentos || 0} Itens`}
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 1.5, borderColor: 'rgba(44, 85, 48, 0.2)', color: '#2C5530' }}
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
            renderCell: (params) => (
                <IconButton onClick={(e) => handleMenuClick(e, params.row.id)} size="small">
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
                        PLANEJAMENTO AGRÍCOLA
                    </Typography>
                    <Typography variant="h4" fontWeight="800" sx={{ color: '#1a1a1a', mb: 1 }}>
                        Gestão de Safras
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Acompanhe os períodos agrícolas e organize seus ciclos de plantio.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/planejamento/safras/novo')}
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
                    Nova Safra
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Total de Safras"
                        value={stats.total}
                        icon={<CalendarMonthIcon />}
                        color="#2C5530"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Safras Ativas"
                        value={stats.ativas}
                        icon={<CheckCircleIcon />}
                        color="#2E7D32"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Planejamentos Totais"
                        value={stats.planejamentos}
                        icon={<AutoGraphIcon />}
                        color="#1976D2"
                    />
                </Grid>
            </Grid>

            {/* Toolbar & Data Grid */}
            <Paper sx={{
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0px 4px 30px rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.04)'
            }}>
                <Box sx={{ p: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                    <TextField
                        placeholder="Buscar safra por nome..."
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
                </Box>

                <Box sx={{ height: 500, width: '100%' }}>
                    <DataGrid
                        rows={filteredSafras}
                        columns={columns}
                        loading={loading}
                        initialState={{
                            pagination: { paginationModel: { page: 0, pageSize: 10 } },
                        }}
                        pageSizeOptions={[5, 10, 25]}
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
                <MenuItem sx={{ py: 1.5, px: 2.5 }} onClick={() => selectedId && navigate(`/planejamento/safras/${selectedId}`)}>
                    <EditIcon fontSize="small" sx={{ mr: 1.5, color: 'primary.main' }} /> Editar Safra
                </MenuItem>
                <MenuItem sx={{ py: 1.5, px: 2.5 }} onClick={() => {
                    // Ideally implement delete logic here or open confirmation
                    // For now just console log or basic alert if needed
                    // But user typically wants full crud.
                    // The requirement is to enable Safra creation. Listing actions are bonus.
                    // I'll keep delete disabled or simple alert for now to avoid complexity unless asked.
                    // Actually, let's just enable navigation for Edit. Delete requires Service call.
                    // I will leave delete disabled but enable Edit.
                }} disabled>
                    <DeleteIcon fontSize="small" sx={{ mr: 1.5, color: 'error.main' }} /> Excluir Safra
                </MenuItem>
            </Menu>
        </Box>
    );
}
