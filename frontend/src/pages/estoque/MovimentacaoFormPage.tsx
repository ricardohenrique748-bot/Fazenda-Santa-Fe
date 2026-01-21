import { useEffect, useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography, Paper, MenuItem, Alert, Skeleton } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { estoqueService, TipoMovimentacao } from '../../services/estoqueService';
import type { Produto, Deposito } from '../../services/estoqueService';

const movimentacaoSchema = z.object({
    produtoId: z.string().min(1, 'Produto é obrigatório'),
    depositoId: z.string().min(1, 'Depósito é obrigatório'),
    tipo: z.nativeEnum(TipoMovimentacao),
    quantidade: z.coerce.number().min(0.01, 'Quantidade deve ser maior que zero'),
    motivo: z.string().optional(),
});

type MovimentacaoFormInputs = z.infer<typeof movimentacaoSchema>;

export default function MovimentacaoFormPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialProdutoId = searchParams.get('produtoId');

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [depositos, setDepositos] = useState<Deposito[]>([]);
    const [loading, setLoading] = useState(true);

    const { register, control, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<MovimentacaoFormInputs>({
        resolver: zodResolver(movimentacaoSchema) as any,
        defaultValues: {
            tipo: TipoMovimentacao.ENTRADA,
            quantidade: 0,
            motivo: '',
            produtoId: initialProdutoId || '',
            depositoId: ''
        }
    });

    // Watch values to calculate balance
    const selectedProdutoId = watch('produtoId');
    const selectedDepositoId = watch('depositoId');
    const selectedTipo = watch('tipo');

    // Derived state for current balance
    const currentBalance = useMemo(() => {
        if (!selectedProdutoId || !selectedDepositoId) return null;

        const produto = produtos.find(p => p.id === selectedProdutoId);
        if (!produto || !produto.estoques) return 0;

        const estoque = produto.estoques.find(e => e.depositoId === selectedDepositoId);
        return estoque ? estoque.quantidade : 0;
    }, [selectedProdutoId, selectedDepositoId, produtos]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [pData, dData] = await Promise.all([
                estoqueService.getProdutos(),
                estoqueService.getDepositos()
            ]);
            setProdutos(pData);
            setDepositos(dData);

            // If only one deposit exists, auto-select it
            if (dData.length === 1) {
                setValue('depositoId', dData[0].id);
            }
        } catch (error) {
            console.error('Erro ao carregar dados', error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit: SubmitHandler<MovimentacaoFormInputs> = async (data) => {
        try {
            await estoqueService.createMovimentacao(data);
            navigate('/estoque/produtos');
        } catch (error: any) {
            console.error('Erro ao registrar movimentação', error);
            alert(error.response?.data?.message || 'Erro ao registrar movimentação');
        }
    };

    if (loading) {
        return <Box p={4}><Skeleton variant="rectangular" height={400} /></Box>;
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                Nova Movimentação
            </Typography>
            <Paper sx={{ p: 4, maxWidth: 700, mx: 'auto', borderRadius: 4 }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'grid', gap: 3 }}>

                        <Controller
                            name="tipo"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Tipo de Operação"
                                    error={!!errors.tipo}
                                    helperText={errors.tipo?.message}
                                >
                                    {Object.values(TipoMovimentacao).map((tipo) => (
                                        <MenuItem key={tipo} value={tipo}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                {tipo === 'ENTRADA' ? '🔼 Entrada (Compra/Devolução)' :
                                                    tipo === 'SAIDA' ? '🔽 Saída (Consumo/Venda)' :
                                                        '🔄 Ajuste (Inventário)'}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        <Controller
                            name="produtoId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Produto / Material"
                                    error={!!errors.produtoId}
                                    helperText={errors.produtoId?.message}
                                >
                                    {produtos.map((p) => (
                                        <MenuItem key={p.id} value={p.id}>
                                            {p.nome} (Cód: {p.codigo})
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        <Controller
                            name="depositoId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Depósito de Origem/Destino"
                                    error={!!errors.depositoId}
                                    helperText={errors.depositoId?.message}
                                >
                                    {depositos.map((d) => (
                                        <MenuItem key={d.id} value={d.id}>{d.nome}</MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        {/* Balance Indicator */}
                        {selectedProdutoId && selectedDepositoId && (
                            <Alert severity={currentBalance! > 0 ? "success" : "warning"} sx={{ borderRadius: 2 }}>
                                <Typography variant="subtitle2" fontWeight="bold">
                                    Saldo Atual no Depósito: {currentBalance} {produtos.find(p => p.id === selectedProdutoId)?.unidadeMedida}
                                </Typography>
                                {selectedTipo === 'SAIDA' && (currentBalance || 0) <= 0 && (
                                    <Typography variant="caption" display="block">
                                        ⚠️ Saldo insuficiente para saída.
                                    </Typography>
                                )}
                            </Alert>
                        )}

                        <TextField
                            fullWidth
                            label="Quantidade Movimentada"
                            type="number"
                            inputProps={{ step: "0.01", min: "0" }}
                            error={!!errors.quantidade}
                            helperText={errors.quantidade?.message}
                            {...register('quantidade')}
                            sx={{ mt: 1 }}
                        />

                        <TextField
                            fullWidth
                            label="Motivo / Observação / Documento"
                            placeholder="Ex: NF 1234, Requisição Interna..."
                            multiline
                            rows={3}
                            {...register('motivo')}
                        />

                    </Box>

                    <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                        <Button type="submit" variant="contained" size="large" fullWidth disabled={isSubmitting} sx={{ py: 1.5, fontWeight: 'bold' }}>
                            Confirmar Lançamento
                        </Button>
                        <Button variant="outlined" size="large" fullWidth onClick={() => navigate(-1)} sx={{ py: 1.5 }}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
