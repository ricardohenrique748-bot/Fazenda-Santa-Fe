import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { Box, Button, Typography, Paper, Tooltip, IconButton } from '@mui/material';
import { Add as AddIcon, Visibility as ViewIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { planejamentoService } from '../../services/planejamentoService';
import type { Planejamento } from '../../services/planejamentoService';

export default function PlanejamentoListPage() {
    const [planos, setPlanos] = useState<Planejamento[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await planejamentoService.getPlanejamentos();
            setPlanos(data);
        } catch (error) {
            console.error('Erro ao carregar planejamentos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Deseja realmente excluir este planejamento?')) {
            await planejamentoService.deletePlanejamento(id);
            loadData();
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'fazenda',
            headerName: 'Fazenda',
            flex: 1,
            valueGetter: (params: any) => params.row.fazenda?.nome || 'N/A'
        },
        {
            field: 'talhao',
            headerName: 'Talhão',
            width: 150,
            valueGetter: (params: any) => params.row.talhao?.nome || '-'
        },
        {
            field: 'cultura',
            headerName: 'Cultura',
            width: 150,
            valueGetter: (params: any) => params.row.cultura?.nome || params.row.cultura || 'N/A'
        },
        {
            field: 'safra',
            headerName: 'Safra',
            width: 120,
            valueGetter: (params: any) => params.row.safra?.nome || 'N/A'
        },
        { field: 'areaHectares', headerName: 'Área (ha)', width: 100, type: 'number' },
        {
            field: 'metaProdutividade',
            headerName: 'Meta',
            width: 120,
            renderCell: (params: any) => {
                if (!params.row.metaProdutividade) return '-';
                return `${params.row.metaProdutividade} ${params.row.unidadeProdutividade || ''}`;
            }
        },
        {
            field: 'custoPorHa',
            headerName: 'Custo / Ha',
            width: 150,
            renderCell: (params: any) => {
                const val = params.row.custoPorHa;
                return val ? val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-';
            }
        },
        {
            field: 'custoEstimadoTotal',
            headerName: 'Custo Total',
            width: 150,
            renderCell: (params: any) => {
                const val = params.row.custoEstimadoTotal;
                return val ? val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-';
            }
        },
        {
            field: 'acoes',
            headerName: 'Ações',
            width: 100,
            sortable: false,
            renderCell: (params: any) => (
                <Box>
                    <Tooltip title="Excluir">
                        <IconButton size="small" color="error" onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            )
        }
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Programa de Insumos / Planejamento</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/planejamento/novo')}
                >
                    Novo Planejamento
                </Button>
            </Box>

            <Paper sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={planos}
                    columns={columns}
                    loading={loading}
                    disableRowSelectionOnClick
                />
            </Paper>
        </Box>
    );
}
