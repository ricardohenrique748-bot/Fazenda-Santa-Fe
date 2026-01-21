import { useEffect, useState } from 'react';
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
    MenuItem
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    Category as CategoryIcon,
    Agriculture as AgricultureIcon,
    Info as InfoIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { gruposEquipamentoService } from '../../services/gruposEquipamentoService';
import type { GrupoEquipamento } from '../../services/gruposEquipamentoService';
import { authService } from '../../services/api';

const StatCard = ({ title, value, icon, color }: any) => (
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

export default function GruposEquipamentoListPage() {
    const [grupos, setGrupos] = useState<GrupoEquipamento[]>([]);
    const [filteredGrupos, setFilteredGrupos] = useState<GrupoEquipamento[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const navigate = useNavigate();
    const openMenu = Boolean(anchorEl);

    useEffect(() => {
        loadGrupos();
    }, []);

    useEffect(() => {
        const lowerSearch = searchTerm.toLowerCase();
        const filtered = grupos.filter(g =>
            g.nome?.toLowerCase().includes(lowerSearch) ||
            g.descricao?.toLowerCase().includes(lowerSearch)
        );
        setFilteredGrupos(filtered);
    }, [searchTerm, grupos]);

    const loadGrupos = async () => {
        try {
            const data = await gruposEquipamentoService.getAll();
            setGrupos(Array.isArray(data) ? data : []);
            setFilteredGrupos(Array.isArray(data) ? data : []);
        } catch (error: any) {
            console.error('Erro ao carregar grupos', error);
            if (error.response?.status === 401) {
                authService.logout();
            }
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
        if (selectedId) navigate(`/mecanizacao/grupos/${selectedId}`);
        handleMenuClose();
    };

    const handleDelete = async () => {
        if (selectedId && window.confirm('Tem certeza que deseja excluir este grupo?')) {
            try {
                await gruposEquipamentoService.delete(selectedId);
                loadGrupos();
            } catch (error: any) {
                alert(error.response?.data?.message || 'Erro ao excluir grupo.');
            }
        }
        handleMenuClose();
    };

    const columns: GridColDef<GrupoEquipamento>[] = [
        {
            field: 'nome', headerName: 'Nome do Grupo', flex: 1.2, minWidth: 250,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
                    <CategoryIcon sx={{ color: '#2C5530' }} />
                    <Typography variant="body2" fontWeight="600">
                        {params.value}
                    </Typography>
                </Box>
            )
        },
        {
            field: 'descricao',
            headerName: 'Descrição',
            flex: 1.5,
            minWidth: 300
        },
        {
            field: '_count',
            headerName: 'Equipamentos',
            width: 150,
            align: 'center',
            valueGetter: (value: any) => value?.veiculos || 0,
            renderCell: (params) => (
                <Typography variant="body2" fontWeight="700" color="primary">
                    {params.value} un.
                </Typography>
            )
        },
        {
            field: 'actions',
            headerName: '',
            width: 60,
            align: 'center',
            sortable: false,
            renderCell: (params) => (
                <IconButton onClick={(e) => handleMenuClick(e, params.row.id)} size="small">
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            ),
        },
    ];

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <Typography variant="overline" color="primary" fontWeight="700">
                        Mecanização / Cadastros
                    </Typography>
                    <Typography variant="h4" fontWeight="800">Grupos de Equipamentos</Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/mecanizacao/grupos/novo')}
                    sx={{ borderRadius: 3, px: 3, background: 'linear-gradient(135deg, #2C5530 0%, #1B3A1E 100%)' }}
                >
                    Novo Grupo
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard title="Total de Grupos" value={grupos.length} icon={<CategoryIcon />} color="#2C5530" />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                        title="Equipamentos Vinculados"
                        value={grupos.reduce((acc: number, g) => acc + (g._count?.veiculos || 0), 0)}
                        icon={<AgricultureIcon />}
                        color="#2E7D32"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard title="Sugestões de Manutenção" value="0" icon={<InfoIcon />} color="#FFA000" />
                </Grid>
            </Grid>

            <Paper sx={{ borderRadius: 4, overflow: 'hidden' }}>
                <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
                    <TextField
                        placeholder="Buscar grupo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        size="small"
                        sx={{ maxWidth: 300 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={filteredGrupos}
                        columns={columns}
                        pageSizeOptions={[5, 10]}
                        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                        disableRowSelectionOnClick
                    />
                </Box>
            </Paper>

            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
                <MenuItem onClick={handleEdit}><EditIcon fontSize="small" sx={{ mr: 1 }} /> Editar</MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}><DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Excluir</MenuItem>
            </Menu>
        </Box>
    );
}
