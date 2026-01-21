import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography, Paper, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { financeiroService, TipoLancamento, StatusFinanceiro } from '../../services/financeiroService';
import type { PlanoContas } from '../../services/financeiroService';
import { empresasService, type Empresa } from '../../services/empresasService';

const lancamentoSchema = z.object({
    descricao: z.string().min(1, 'Descrição é obrigatória'),
    valor: z.coerce.number().min(0.01, 'Valor deve ser maior que zero'),
    dataVencimento: z.string().min(1, 'Vencimento é obrigatório'),
    tipo: z.nativeEnum(TipoLancamento),
    planoContasId: z.string().min(1, 'Categoria é obrigatória'),
    empresaId: z.string().min(1, 'Empresa é obrigatória'),
    status: z.nativeEnum(StatusFinanceiro).default(StatusFinanceiro.PENDENTE),
});

type LancamentoFormInputs = z.infer<typeof lancamentoSchema>;

export default function LancamentoFormPage() {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState<PlanoContas[]>([]);
    const [empresas, setEmpresas] = useState<Empresa[]>([]);

    const { register, control, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<LancamentoFormInputs>({
        resolver: zodResolver(lancamentoSchema) as any,
        defaultValues: {
            tipo: TipoLancamento.PAGAR,
            valor: 0,
            status: StatusFinanceiro.PENDENTE,
            dataVencimento: new Date().toISOString().split('T')[0]
        }
    });

    const tipoSelecionado = watch('tipo');

    useEffect(() => {
        loadData();
    }, [tipoSelecionado]);

    const loadData = async () => {
        const [cData, eData] = await Promise.all([
            financeiroService.getPlanoContas(),
            empresasService.getAll()
        ]);
        // Filtrar categorias pelo tipo selecionado
        setCategorias(cData.filter((c: PlanoContas) => c.tipo === tipoSelecionado));
        setEmpresas(eData);
    };

    const onSubmit: SubmitHandler<LancamentoFormInputs> = async (data) => {
        try {
            await financeiroService.createLancamento(data);
            navigate('/financeiro/contas');
        } catch (error) {
            console.error('Erro ao salvar lançamento', error);
            alert('Erro ao salvar lançamento');
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>Novo Lançamento Financeiro</Typography>
            <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>

                        <Controller
                            name="tipo"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Tipo"
                                    error={!!errors.tipo}
                                >
                                    <MenuItem value={TipoLancamento.PAGAR}>Despesa (A Pagar)</MenuItem>
                                    <MenuItem value={TipoLancamento.RECEBER}>Receita (A Receber)</MenuItem>
                                </TextField>
                            )}
                        />

                        <Controller
                            name="empresaId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Empresa / Unidade"
                                    error={!!errors.empresaId}
                                >
                                    {empresas.map(e => <MenuItem key={e.id} value={e.id}>{e.razaoSocial}</MenuItem>)}
                                </TextField>
                            )}
                        />

                        <TextField
                            fullWidth
                            sx={{ gridColumn: 'span 2' }}
                            label="Descrição / Detalhes"
                            error={!!errors.descricao}
                            helperText={errors.descricao?.message}
                            {...register('descricao')}
                        />

                        <Controller
                            name="planoContasId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Categoria (Plano de Contas)"
                                    error={!!errors.planoContasId}
                                    helperText={errors.planoContasId?.message}
                                >
                                    {categorias.map(c => <MenuItem key={c.id} value={c.id}>{c.codigo} - {c.descricao}</MenuItem>)}
                                </TextField>
                            )}
                        />

                        <TextField
                            fullWidth
                            label="Valor (R$)"
                            type="number"
                            inputProps={{ step: "0.01" }}
                            error={!!errors.valor}
                            helperText={errors.valor?.message}
                            {...register('valor')}
                        />

                        <TextField
                            fullWidth
                            label="Data de Vencimento"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.dataVencimento}
                            helperText={errors.dataVencimento?.message}
                            {...register('dataVencimento')}
                        />

                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Status Inicial"
                                    error={!!errors.status}
                                >
                                    <MenuItem value={StatusFinanceiro.PENDENTE}>Pendente</MenuItem>
                                    <MenuItem value={StatusFinanceiro.PAGO}>Já Pago/Recebido</MenuItem>
                                </TextField>
                            )}
                        />

                    </Box>

                    <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                        <Button type="submit" variant="contained" size="large" fullWidth disabled={isSubmitting}>
                            Salvar Lançamento
                        </Button>
                        <Button variant="outlined" size="large" fullWidth onClick={() => navigate(-1)}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
