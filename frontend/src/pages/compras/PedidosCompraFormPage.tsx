import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    Autocomplete,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Card,
    CardContent,
    Divider
} from '@mui/material';
import {
    Save as SaveIcon,
    ArrowBack as ArrowBackIcon,
    Add as AddIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { comprasService } from '../../services/comprasService';
import { estoqueService } from '../../services/estoqueService';
import type { Produto } from '../../services/estoqueService';
import type { Fornecedor } from '../../services/comprasService';

// Schema
const schema = z.object({
    fornecedorId: z.string().min(1, 'Fornecedor é obrigatório'),
    dataPedido: z.string().min(1, 'Data é obrigatória'),
    observacoes: z.string().optional(),
    itens: z.array(z.object({
        produtoId: z.string().min(1, 'Produto é obrigatório'),
        quantidade: z.number().min(0.01, 'Quantidade inválida'),
        valorUnitario: z.number().min(0.01, 'Valor unitário inválido'),
    })).min(1, 'Adicione pelo menos um item'),
});

type FormData = z.infer<typeof schema>;

export default function PedidosCompraFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, register, watch, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            dataPedido: new Date().toISOString().split('T')[0],
            itens: [{ produtoId: '', quantidade: 1, valorUnitario: 0 }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'itens'
    });

    const watchedItens = watch('itens');

    // Calculate Total
    const totalPedido = watchedItens.reduce((acc, item) => {
        return acc + ((item.quantidade || 0) * (item.valorUnitario || 0));
    }, 0);

    useEffect(() => {
        loadAuxData();
    }, []);

    const loadAuxData = async () => {
        try {
            const [fornRes, prodRes] = await Promise.all([
                comprasService.getFornecedores(),
                estoqueService.getProdutos()
            ]);
            setFornecedores(fornRes || []);
            setProdutos(prodRes || []);
        } catch (error) {
            console.error('Erro ao carregar dados auxiliares', error);
        }
    };

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            await comprasService.createPedido(data);
            navigate('/comercial/pedidos');
        } catch (error) {
            console.error('Erro ao salvar pedido', error);
            alert('Erro ao salvar pedido.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={() => navigate('/comercial/pedidos')}>
                    <ArrowBackIcon />
                </IconButton>
                <Box>
                    <Typography variant="h4" fontWeight="800" color="#1a1a1a">
                        {isEdit ? 'Editar Pedido' : 'Novo Pedido de Compra'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Registre a aquisição de produtos e insumos.
                    </Typography>
                </Box>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    {/* Main Info */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3, borderRadius: 3 }}>
                            <Typography variant="h6" fontWeight="700" sx={{ mb: 3, color: '#2C5530' }}>
                                Dados do Pedido
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="fornecedorId"
                                        control={control}
                                        render={({ field }) => (
                                            <Autocomplete
                                                options={fornecedores}
                                                getOptionLabel={(option) => option.razaoSocial}
                                                onChange={(_, value) => field.onChange(value?.id)}
                                                value={fornecedores.find(f => f.id === field.value) || null}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Fornecedor"
                                                        error={!!errors.fornecedorId}
                                                        helperText={errors.fornecedorId?.message}
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        label="Data do Pedido"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        {...register('dataPedido')}
                                        error={!!errors.dataPedido}
                                        helperText={errors.dataPedido?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        label="Total Estimado"
                                        value={totalPedido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        fullWidth
                                        disabled
                                        sx={{ bgcolor: '#f5f5f5', borderRadius: 1 }}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Items */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3, borderRadius: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" fontWeight="700" sx={{ color: '#2C5530' }}>
                                    Itens do Pedido
                                </Typography>
                                <Button
                                    startIcon={<AddIcon />}
                                    variant="outlined"
                                    onClick={() => append({ produtoId: '', quantidade: 1, valorUnitario: 0 })}
                                >
                                    Adicionar Item
                                </Button>
                            </Box>

                            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                                <Table size="small">
                                    <TableHead sx={{ bgcolor: '#f9f9f9' }}>
                                        <TableRow>
                                            <TableCell width="40%">Produto</TableCell>
                                            <TableCell width="15%">Qtd</TableCell>
                                            <TableCell width="20%">Valor Unit.</TableCell>
                                            <TableCell width="20%">Subtotal</TableCell>
                                            <TableCell width="5%"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {fields.map((field, index) => {
                                            const item = watchedItens[index];
                                            const subtotal = (item?.quantidade || 0) * (item?.valorUnitario || 0);

                                            return (
                                                <TableRow key={field.id}>
                                                    <TableCell>
                                                        <Controller
                                                            name={`itens.${index}.produtoId`}
                                                            control={control}
                                                            render={({ field: renderField }) => (
                                                                <Autocomplete
                                                                    options={produtos}
                                                                    getOptionLabel={(opt) => `${opt.nome} (${opt.unidadeMedida})`}
                                                                    onChange={(_, val) => renderField.onChange(val?.id)}
                                                                    value={produtos.find(p => p.id === renderField.value) || null}
                                                                    renderInput={(params) => (
                                                                        <TextField
                                                                            {...params}
                                                                            placeholder="Selecione um produto"
                                                                            size="small"
                                                                            error={!!errors.itens?.[index]?.produtoId}
                                                                        />
                                                                    )}
                                                                />
                                                            )}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            type="number"
                                                            size="small"
                                                            fullWidth
                                                            inputProps={{ min: 0, step: 0.01 }}
                                                            {...register(`itens.${index}.quantidade`, { valueAsNumber: true })}
                                                            error={!!errors.itens?.[index]?.quantidade}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            type="number"
                                                            size="small"
                                                            fullWidth
                                                            InputProps={{
                                                                startAdornment: <Typography variant="caption" sx={{ mr: 1 }}>R$</Typography>
                                                            }}
                                                            inputProps={{ min: 0, step: 0.01 }}
                                                            {...register(`itens.${index}.valorUnitario`, { valueAsNumber: true })}
                                                            error={!!errors.itens?.[index]?.valorUnitario}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2" fontWeight="600">
                                                            {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton onClick={() => remove(index)} color="error" size="small">
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        {fields.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                                    Nenhum item adicionado.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {errors.itens?.root && (
                                <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                                    {errors.itens.root.message}
                                </Typography>
                            )}
                        </Paper>
                    </Grid>

                    {/* Actions */}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/comercial/pedidos')}
                            color="inherit"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            startIcon={<SaveIcon />}
                            sx={{
                                bgcolor: '#2C5530',
                                '&:hover': { bgcolor: '#1e3b21' },
                                px: 4
                            }}
                        >
                            {loading ? 'Salvando...' : 'Salvar Pedido'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
