import { useEffect, useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography, Paper, MenuItem, Alert, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { estoqueService } from '../../services/estoqueService';
import type { Produto, Deposito } from '../../services/estoqueService';
import { CompareArrows as CompareArrowsIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

const transferenciaSchema = z.object({
    origemId: z.string().min(1, 'Origem é obrigatória'),
    destinoId: z.string().min(1, 'Destino é obrigatório'),
    produtoId: z.string().min(1, 'Produto é obrigatório'),
    quantidade: z.coerce.number().min(0.01, 'Quantidade deve ser maior que zero'),
    motivo: z.string().optional(),
}).refine(data => data.origemId !== data.destinoId, {
    message: "Origem e Destino devem ser diferentes",
    path: ["destinoId"],
});

type TransferenciaFormInputs = z.infer<typeof transferenciaSchema>;

export default function TransferenciaFormPage() {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [depositos, setDepositos] = useState<Deposito[]>([]);
    const [loading, setLoading] = useState(true);

    const { register, control, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<TransferenciaFormInputs>({
        resolver: zodResolver(transferenciaSchema) as any,
        defaultValues: { quantidade: 0, motivo: '' }
    });

    const selectedOrigemId = watch('origemId');
    const selectedProdutoId = watch('produtoId');

    const saldoOrigem = useMemo(() => {
        if (!selectedOrigemId || !selectedProdutoId) return null;
        const produto = produtos.find(p => p.id === selectedProdutoId);
        if (!produto || !produto.estoques) return 0;
        const estoque = produto.estoques.find(e => e.depositoId === selectedOrigemId);
        return estoque ? estoque.quantidade : 0;
    }, [selectedOrigemId, selectedProdutoId, produtos]);

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
        } catch (error) {
            console.error('Erro ao carregar dados', error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit: SubmitHandler<TransferenciaFormInputs> = async (data) => {
        try {
            await estoqueService.transferirProduto(data);
            navigate('/estoque/saldos');
        } catch (error: any) {
            console.error('Erro na transferência', error);
            alert(error.response?.data?.message || 'Erro na transferência');
        }
    };

    if (loading) return <Box p={4}><Skeleton variant="rectangular" height={400} /></Box>;

    return (
        <Box maxWidth={900} mx="auto">
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
                <CompareArrowsIcon fontSize="large" color="primary" />
                Transferência entre Depósitos
            </Typography>

            <Paper sx={{ p: 4, borderRadius: 4 }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'grid', gap: 3 }}>

                        {/* Origem e Destino */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto 1fr' }, gap: 2, alignItems: 'center' }}>
                            <Controller
                                name="origemId"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        fullWidth
                                        label="Depósito de Origem (Sai)"
                                        error={!!errors.origemId}
                                        helperText={errors.origemId?.message}
                                    >
                                        {depositos.map((d) => (
                                            <MenuItem key={d.id} value={d.id}>{d.nome}</MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />

                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <ArrowForwardIcon color="action" />
                            </Box>

                            <Controller
                                name="destinoId"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        fullWidth
                                        label="Depósito de Destino (Entra)"
                                        error={!!errors.destinoId}
                                        helperText={errors.destinoId?.message}
                                    >
                                        {depositos.map((d) => (
                                            <MenuItem key={d.id} value={d.id} disabled={d.id === selectedOrigemId}>
                                                {d.nome}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Box>

                        {/* Produto */}
                        <Controller
                            name="produtoId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Produto"
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

                        {/* Saldo Warning */}
                        {selectedOrigemId && selectedProdutoId && (
                            <Alert severity="info" sx={{ borderRadius: 2 }}>
                                Saldo disponível na Origem: <strong>{saldoOrigem}</strong>
                            </Alert>
                        )}

                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                            <TextField
                                fullWidth
                                label="Quantidade"
                                type="number"
                                inputProps={{ step: "0.01", min: "0" }}
                                error={!!errors.quantidade}
                                helperText={errors.quantidade?.message}
                                {...register('quantidade')}
                            />

                            <TextField
                                fullWidth
                                label="Motivo (Opcional)"
                                placeholder="Ref. Documento ou Observação"
                                {...register('motivo')}
                            />
                        </Box>

                        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                            <Button type="submit" variant="contained" size="large" fullWidth disabled={isSubmitting} sx={{ py: 1.5, fontWeight: 'bold' }}>
                                Confirmar Transferência
                            </Button>
                            <Button variant="outlined" size="large" fullWidth onClick={() => navigate(-1)} sx={{ py: 1.5 }}>
                                Cancelar
                            </Button>
                        </Box>

                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
