import { useEffect, useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box, Button, Typography, Paper, IconButton, Chip, Menu, MenuItem } from '@mui/material';
import { Add as AddIcon, MoreVert as MoreVertIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { comercialService } from '../../services/comercialService';
import type { Cliente } from '../../services/comercialService';

export default function ClientesListPage() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const navigate = useNavigate();
    const openMenu = Boolean(anchorEl);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await comercialService.getClientes();
            setClientes(data);
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
        } finally {
            setLoading(false);
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

    const columns: GridColDef[] = [
        { field: 'razaoSocial', headerName: 'Razão Social / Nome', flex: 1.5, minWidth: 200 },
        { field: 'nomeFantasia', headerName: 'Nome Fantasia', flex: 1, minWidth: 150 },
        { field: 'cpfCnpj', headerName: 'CPF / CNPJ', width: 150 },
        {
            field: 'localizacao',
            headerName: 'Localização',
            width: 200,
            valueGetter: (params: any) => `${params.row.cidade || ''} - ${params.row.estado || ''}`
        },
        {
            field: 'ativo',
            headerName: 'Status',
            width: 100,
            renderCell: (params) => (
                <Chip
                    label={params.value ? 'Ativo' : 'Inativo'}
                    color={params.value ? 'success' : 'default'}
                    size="small"
                />
            )
        },
        {
            field: 'actions',
            headerName: '',
            width: 60,
            sortable: false,
            renderCell: (params) => (
                <IconButton onClick={(e) => handleMenuClick(e, params.row.id)}>
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            )
        }
    ];

    return (
        <Box sx={{ maxWidth: 1600, margin: '0 auto', p: 3 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="overline" color="primary" fontWeight="700">COMERCIAL</Typography>
                    <Typography variant="h4" fontWeight="800">Clientes</Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/comercial/clientes/novo')}
                    sx={{ borderRadius: 3, textTransform: 'none', px: 3 }}
                >
                    Novo Cliente
                </Button>
            </Box>

            <Paper sx={{ height: 600, width: '100%', borderRadius: 3, boxShadow: 3 }}>
                <DataGrid
                    rows={clientes}
                    columns={columns}
                    loading={loading}
                    initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                    pageSizeOptions={[10, 25]}
                    disableRowSelectionOnClick
                    sx={{ border: 'none', '& .MuiDataGrid-columnHeaders': { bgcolor: '#F9F9F7' } }}
                />
            </Paper>

            <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => { navigate(`/comercial/clientes/${selectedId}`); handleMenuClose(); }}>
                    <EditIcon fontSize="small" sx={{ mr: 1 }} /> Editar
                </MenuItem>
                <MenuItem onClick={() => { /* Implement delete */ handleMenuClose(); }} disabled>
                    <DeleteIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} /> Excluir
                </MenuItem>
            </Menu>
        </Box>
    );
}
