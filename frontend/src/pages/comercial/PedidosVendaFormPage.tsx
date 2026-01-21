import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import {
    Box, Button, Container, Grid, Paper, TextField, Typography, MenuItem,
    Table, TableHead, TableRow, TableCell, TableBody, IconButton, Alert
} from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { comercialService } from '../../services/comercialService';
import type { PedidoVenda, Cliente } from '../../services/comercialService';
import { estoqueService } from '../../services/estoqueService';
import type { Produto } from '../../services/estoqueService';

export default function PedidosVendaFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [error, setError] = useState<string | null>(null);

    const { register, control, handleSubmit, setValue, watch, formState: { } } = useForm<PedidoVenda>({
        defaultValues: {
            status: 'ABERTO',
            itens: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "itens"
    });

    const watchItens = watch('itens');

    const totalCalculado = useMemo(() => {
        return (watchItens || []).reduce((acc, item) => {
            return acc + (Number(item.quantidade || 0) * Number(item.valorUnitario || 0));
        }, 0);
    }, [watchItens]);

    useEffect(() => {
        loadDependencies();
        if (id && id !== 'novo') {
            loadPedido(id);
        }
    }, [id]);

    const loadDependencies = async () => {
        try {
            const [cData, pData] = await Promise.all([
                comercialService.getClientes(),
                estoqueService.getProdutos()
            ]);
            setClientes(cData);
            setProdutos(pData);
        } catch (err) {
            console.error(err);
        }
    };

    const loadPedido = async (id: string) => {
        try {
            const data = await comercialService.getPedidoById(id);
            if (data) {
                setValue('clienteId', data.clienteId);
                setValue('dataPedido', data.dataPedido ? data.dataPedido.split('T')[0] : '');
                setValue('status', data.status);
                setValue('observacoes', data.observacoes);
                // Map items if necessary
                setValue('itens', data.itens);
            }
        } catch (err) {
            console.error(err);
            setError('Erro ao carregar pedido');
        }
    };

    const onSubmit = async (data: PedidoVenda) => {
        try {
            const payload = {
                ...data,
                valorTotal: totalCalculado,
                itens: data.itens.map(item => ({
                    ...item,
                    produtoId: item.produtoId,
                    quantidade: Number(item.quantidade),
                    valorUnitario: Number(item.valorUnitario),
                    subtotal: Number(item.quantidade) * Number(item.valorUnitario)
                }))
            };

            if (id && id !== 'novo') {
                await comercialService.updatePedido(id, payload);
            } else {
                await comercialService.createPedido(payload);
            }
            navigate('/comercial/pedidos-venda');
        } catch (err) {
            console.error(err);
            setError('Erro ao salvar pedido');
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/comercial/pedidos-venda')}>
                    Voltar
                </Button>
                <Typography variant="h4" fontWeight="bold">
                    {id && id !== 'novo' ? 'Editar Pedido' : 'Novo Pedido de Venda'}
                </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Paper component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4, borderRadius: 3 }}>
                <Grid container spacing={3}>
                    {/* Header */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            select
                            fullWidth
                            label="Cliente"
                            {...register('clienteId', { required: true })}
                            defaultValue=""
                        >
                            {clientes.map(c => (
                                <MenuItem key={c.id} value={c.id}>{c.razaoSocial}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Data do Pedido"
                            InputLabelProps={{ shrink: true }}
                            {...register('dataPedido', { required: true })}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <TextField
                            select
                            fullWidth
                            label="Status"
                            {...register('status')}
                            defaultValue="ABERTO"
                        >
                            <MenuItem value="ABERTO">Aberto</MenuItem>
                            <MenuItem value="APROVADO">Aprovado</MenuItem>
                            <MenuItem value="FATURADO">Faturado</MenuItem>
                            <MenuItem value="CANCELADO">Cancelado</MenuItem>
                        </TextField>
                    </Grid>

                    {/* Items Section */}
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 2 }}>
                            <Typography variant="h6">Itens do Pedido</Typography>
                            <Button startIcon={<AddIcon />} variant="outlined" onClick={() => append({ produtoId: '', quantidade: 1, valorUnitario: 0 } as any)}>
                                Adicionar Item
                            </Button>
                        </Box>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Produto</TableCell>
                                    <TableCell width={150}>Qtd</TableCell>
                                    <TableCell width={150}>Valor Un.</TableCell>
                                    <TableCell width={150}>Subtotal</TableCell>
                                    <TableCell width={50}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {fields.map((field, index) => {
                                    const qtd = Number(watch(`itens.${index}.quantidade`) || 0);
                                    const val = Number(watch(`itens.${index}.valorUnitario`) || 0);

                                    return (
                                        <TableRow key={field.id}>
                                            <TableCell>
                                                <TextField
                                                    select
                                                    fullWidth
                                                    size="small"
                                                    {...register(`itens.${index}.produtoId` as const, { required: true })}
                                                    defaultValue=""
                                                >
                                                    {produtos.map(p => (
                                                        <MenuItem key={p.id} value={p.id}>{p.nome}</MenuItem>
                                                    ))}
                                                </TextField>
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    type="number"
                                                    fullWidth
                                                    size="small"
                                                    {...register(`itens.${index}.quantidade` as const, { required: true, min: 1 })}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    type="number"
                                                    fullWidth
                                                    size="small"
                                                    {...register(`itens.${index}.valorUnitario` as const, { required: true })}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                R$ {(qtd * val).toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => remove(index)} color="error">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Grid>

                    {/* Footer / Total */}
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                            <Typography variant="h5" fontWeight="bold">
                                Total: R$ {totalCalculado.toFixed(2)}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Observações"
                            {...register('observacoes')}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="outlined" onClick={() => navigate('/comercial/pedidos-venda')}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
                            Salvar Pedido
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
