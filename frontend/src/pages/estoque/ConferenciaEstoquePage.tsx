import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Typography, Paper, TextField, MenuItem, Button, Chip, Alert, CircularProgress } from '@mui/material';
import { estoqueService } from '../../services/estoqueService';
import type { Deposito, EstoqueSaldo } from '../../services/estoqueService';
import { PlaylistAddCheck as PlaylistAddCheckIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function ConferenciaEstoquePage() {
    const navigate = useNavigate();
    const [depositos, setDepositos] = useState<Deposito[]>([]);
    const [selectedDepositoId, setSelectedDepositoId] = useState('');
    const [saldos, setSaldos] = useState<EstoqueSaldo[]>([]);
    const [contagem, setContagem] = useState<Record<string, number>>({});
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        estoqueService.getDepositos().then(setDepositos);
    }, []);

    useEffect(() => {
        if (selectedDepositoId) {
            loadSaldos();
        } else {
            setSaldos([]);
            setContagem({});
        }
    }, [selectedDepositoId]);

    const loadSaldos = async () => {
        setLoading(true);
        try {
            // Get all balances, filter by deposit client-side or assume API filters? 
            // My getSaldos returns ALL. I should filter client side for now.
            const allSaldos = await estoqueService.getSaldos();
            const filtered = allSaldos.filter(s => s.depositoId === selectedDepositoId);
            setSaldos(filtered);

            // Initialize count with current system balance (optional, or start with 0? usually 0 or empty is better for blind count)
            // But for "Adjustment" style, showing system balance is easier.
            // Let's initialize with current balance to show "Sem divergência" by default?
            // User requested "Conference". Usually blind. 
            // Let's leave empty? No, better: Initial value matches system? Or 0?
            // If I set 0, everything will look like a huge loss.
            // Let's set initial values to System Balance for convenience, user changes what is wrong.
            const initialContagem: Record<string, number> = {};
            filtered.forEach(s => {
                initialContagem[s.produtoId] = s.quantidade;
            });
            setContagem(initialContagem);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCountChange = (produtoId: string, value: string) => {
        const num = parseFloat(value);
        setContagem(prev => ({
            ...prev,
            [produtoId]: isNaN(num) ? 0 : num
        }));
    };

    const handleFinalizar = async () => {
        if (!selectedDepositoId) return;
        if (!window.confirm('Confirma a finalização da conferência? Isso gerará movimentos de AJUSTE para todas as divergências.')) return;

        setSubmitting(true);
        try {
            const ajustes = saldos.map(s => {
                const fisico = contagem[s.produtoId] ?? s.quantidade;
                const diferenca = fisico - s.quantidade;
                return { produtoId: s.produtoId, diferenca, motivo: 'Conferência de Estoque' };
            }).filter(item => item.diferenca !== 0);

            if (ajustes.length === 0) {
                alert('Nenhuma divergência encontrada.');
                setSubmitting(false);
                return;
            }

            await estoqueService.processarConferencia({
                depositoId: selectedDepositoId,
                itens: ajustes
            });

            alert('Conferência processada com sucesso!');
            navigate('/estoque/saldos');

        } catch (error) {
            console.error(error);
            alert('Erro ao processar conferência.');
        } finally {
            setSubmitting(false);
        }
    };

    const columns: GridColDef[] = [
        { field: 'produtoNome', headerName: 'Produto', flex: 1, valueGetter: (params: any) => params.row.produto?.nome },
        { field: 'codigo', headerName: 'Código', width: 120, valueGetter: (params: any) => params.row.produto?.codigo },
        {
            field: 'sistema',
            headerName: 'Saldo Sistema',
            width: 130,
            type: 'number',
            valueGetter: (params: any) => params.row.quantidade
        },
        {
            field: 'contagem',
            headerName: 'Contagem Física',
            width: 180,
            renderCell: (params: GridRenderCellParams) => (
                <TextField
                    type="number"
                    size="small"
                    value={contagem[params.row.produtoId] ?? ''}
                    onChange={(e) => handleCountChange(params.row.produtoId, e.target.value)}
                    sx={{ bgcolor: 'white' }}
                    inputProps={{ step: "0.01" }}
                />
            )
        },
        {
            field: 'diferenca',
            headerName: 'Divergência',
            width: 150,
            renderCell: (params: GridRenderCellParams) => {
                const sistema = params.row.quantidade;
                const fisico = contagem[params.row.produtoId] ?? sistema;
                const diff = fisico - sistema;

                if (diff === 0) return <Chip label="OK" color="success" size="small" variant="outlined" />;

                return (
                    <Chip
                        label={diff > 0 ? `+${diff.toFixed(2)}` : diff.toFixed(2)}
                        color={diff !== 0 ? "error" : "default"}
                        size="small"
                    />
                );
            }
        }
    ];

    return (
        <Box maxWidth={1200} mx="auto">
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
                <PlaylistAddCheckIcon fontSize="large" color="primary" />
                Conferência de Estoque
            </Typography>

            <Paper sx={{ p: 4, mb: 4, borderRadius: 4 }}>
                <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
                    <TextField
                        select
                        fullWidth
                        label="Selecione o Depósito para Conferência"
                        value={selectedDepositoId}
                        onChange={(e) => setSelectedDepositoId(e.target.value)}
                        sx={{ maxWidth: 500 }}
                    >
                        {depositos.map((d) => (
                            <MenuItem key={d.id} value={d.id}>{d.nome}</MenuItem>
                        ))}
                    </TextField>
                    {selectedDepositoId && (
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleFinalizar}
                            disabled={submitting || loading}
                            sx={{ height: 56, px: 4, fontWeight: 'bold' }}
                        >
                            {submitting ? <CircularProgress size={24} color="inherit" /> : 'Finalizar Conferência'}
                        </Button>
                    )}
                </Box>

                {selectedDepositoId ? (
                    <Box sx={{ height: 600, width: '100%' }}>
                        <DataGrid
                            rows={saldos}
                            columns={columns}
                            getRowId={(row) => row.id} // EstoqueSaldo ID
                            loading={loading}
                            disableRowSelectionOnClick
                            sx={{
                                '& .MuiDataGrid-cell': {
                                    fontSize: '1rem',
                                }
                            }}
                        />
                    </Box>
                ) : (
                    <Alert severity="info">Selecione um depósito para iniciar a contagem.</Alert>
                )}
            </Paper>
        </Box>
    );
}
