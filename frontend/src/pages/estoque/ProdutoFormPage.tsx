import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography, Paper, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { estoqueService } from '../../services/estoqueService';

const produtoSchema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório'),
    codigo: z.string().optional(),
    unidadeMedida: z.string().min(1, 'Unidade de medida é obrigatória'),
    categoria: z.string().optional(),
    grupoId: z.string().optional(),
    fabricanteId: z.string().optional(),
});

type ProdutoFormInputs = z.infer<typeof produtoSchema>;

export default function ProdutoFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id && id !== 'novo';
    const [grupos, setGrupos] = useState<any[]>([]);
    const [fabricantes, setFabricantes] = useState<any[]>([]);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ProdutoFormInputs>({
        resolver: zodResolver(produtoSchema) as any,
        defaultValues: {
            nome: '',
            unidadeMedida: 'UN',
            categoria: '',
            grupoId: '',
            fabricanteId: ''
        }
    });

    useEffect(() => {
        loadDependencies();
        if (isEditing) loadProduto(id);
    }, [id]);

    const loadDependencies = async () => {
        try {
            const [gruposData, fabricantesData] = await Promise.all([
                estoqueService.getGrupos(),
                estoqueService.getFabricantes()
            ]);
            setGrupos(gruposData);
            setFabricantes(fabricantesData);
        } catch (error) {
            console.error('Erro ao carregar dependências', error);
        }
    };

    const loadProduto = async (prodId: string) => {
        try {
            const data = await estoqueService.getProdutoById(prodId);
            reset(data); // Ensure data matches schema keys (grupoId, fabricanteId)
        } catch (error) {
            console.error('Erro ao carregar produto', error);
        }
    };

    const onSubmit: SubmitHandler<ProdutoFormInputs> = async (data) => {
        try {
            if (isEditing) {
                // await estoqueService.updateProduto(id, data); // To be implemented
            } else {
                await estoqueService.createProduto(data);
            }
            navigate('/estoque/produtos');
        } catch (error) {
            console.error('Erro ao salvar produto', error);
            alert('Erro ao salvar produto');
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {isEditing ? 'Editar Produto' : 'Novo Produto'}
            </Typography>
            <Paper sx={{ p: 4, maxWidth: 600 }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'grid', gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Nome do Produto/Insumo"
                            error={!!errors.nome}
                            helperText={errors.nome?.message}
                            {...register('nome')}
                        />
                        <TextField
                            fullWidth
                            label="Código de Barras / Interno"
                            {...register('codigo')}
                        />
                        <TextField
                            fullWidth
                            label="Unidade de Medida"
                            placeholder="Ex: KG, L, UN, SC"
                            error={!!errors.unidadeMedida}
                            helperText={errors.unidadeMedida?.message}
                            {...register('unidadeMedida')}
                        />
                        <TextField
                            fullWidth
                            label="Categoria"
                            placeholder="Ex: Fertilizante, Peça, Combustível"
                            {...register('categoria')}
                        />

                        <TextField
                            select
                            fullWidth
                            label="Grupo"
                            defaultValue=""
                            inputProps={register('grupoId')}
                            error={!!errors.grupoId}
                            helperText={errors.grupoId?.message}
                        >
                            <MenuItem value=""><em>Nenhum</em></MenuItem>
                            {grupos.map((grupo) => (
                                <MenuItem key={grupo.id} value={grupo.id}>
                                    {grupo.nome}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            fullWidth
                            label="Fabricante"
                            defaultValue=""
                            inputProps={register('fabricanteId')}
                            error={!!errors.fabricanteId}
                            helperText={errors.fabricanteId?.message}
                        >
                            <MenuItem value=""><em>Nenhum</em></MenuItem>
                            {fabricantes.map((fab) => (
                                <MenuItem key={fab.id} value={fab.id}>
                                    {fab.nome}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                            Salvar
                        </Button>
                        <Button variant="outlined" size="large" onClick={() => navigate('/estoque/produtos')}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
