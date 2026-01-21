import { useEffect, useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box, Button, Typography, Paper, Chip } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { comercialService } from '../../services/comercialService';
import type { PedidoVenda } from '../../services/comercialService';
import { format } from 'date-fns';

export default function PedidosVendaListPage() {
    const [pedidos, setPedidos] = useState<PedidoVenda[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await comercialService.getPedidos();
            setPedidos(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const columns: GridColDef[] = [
        { field: 'numero', headerName: 'Nº Pedido', width: 100 },
        {
            field: 'cliente',
            headerName: 'Cliente',
            flex: 1,
            valueGetter: (params: any) => params.row.cliente?.razaoSocial || 'Cliente Removido'
        },
        {
            field: 'dataPedido',
            headerName: 'Data',
            width: 120,
            valueGetter: (params: any) => params.value ? format(new Date(params.value), 'dd/MM/yyyy') : '-'
        },
        {
            field: 'valorTotal',
            headerName: 'Valor Total',
            width: 150,
            valueGetter: (params: any) => params.value ? `R$ ${params.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'R$ 0,00'
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => (
                <Chip label={params.value} color="primary" size="small" variant="outlined" />
            )
        },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 100,
            renderCell: (params) => (
                <Button
                    startIcon={<EditIcon />}
                    size="small"
                    onClick={() => navigate(`/comercial/pedidos-venda/${params.row.id}`)}
                >
                    Abrir
                </Button>
            )
        }
    ];

    return (
        <Box sx={{ maxWidth: 1600, margin: '0 auto', p: 3 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="overline" color="primary" fontWeight="700">COMERCIAL</Typography>
                    <Typography variant="h4" fontWeight="800">Pedidos de Venda</Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/comercial/pedidos-venda/novo')}
                    sx={{ borderRadius: 3, textTransform: 'none', px: 3 }}
                >
                    Novo Pedido
                </Button>
            </Box>

            <Paper sx={{ height: 600, width: '100%', borderRadius: 3, boxShadow: 3 }}>
                <DataGrid
                    rows={pedidos}
                    columns={columns}
                    loading={loading}
                    disableRowSelectionOnClick
                    sx={{ border: 'none', '& .MuiDataGrid-columnHeaders': { bgcolor: '#F9F9F7' } }}
                />
            </Paper>
        </Box>
    );
}
