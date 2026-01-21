import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Chip
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { financeiroService } from '../../services/financeiroService';
import type { PlanoContas } from '../../services/financeiroService';

const planoContasSchema = z.object({
    descricao: z.string().min(3, 'Descrição deve ter no mínimo 3 caracteres'),
    tipo: z.enum(['RECEBER', 'PAGAR']),
    codigo: z.string().optional()
});

type PlanoContasFormData = z.infer<typeof planoContasSchema>;

export default function PlanoContasPage() {
    const [categorias, setCategorias] = useState<PlanoContas[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<PlanoContasFormData>({
        resolver: zodResolver(planoContasSchema),
        defaultValues: {
            tipo: 'RECEBER',
            codigo: ''
        }
    });

    useEffect(() => {
        loadCategorias();
    }, []);

    const loadCategorias = async () => {
        try {
            const data = await financeiroService.getPlanoContas();
            setCategorias(data);
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
        }
    };

    const handleOpen = (categoria?: PlanoContas) => {
        if (categoria) {
            setEditingId(categoria.id);
            setValue('descricao', categoria.descricao);
            setValue('tipo', categoria.tipo);
            setValue('codigo', categoria.codigo || '');
        } else {
            setEditingId(null);
            reset({ tipo: 'RECEBER', codigo: '' });
        }
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        reset();
    };

    const onSubmit = async (data: PlanoContasFormData) => {
        try {
            if (editingId) {
                await financeiroService.updatePlanoContas(editingId, data);
            } else {
                await financeiroService.createPlanoContas(data);
            }
            loadCategorias();
            handleClose();
        } catch (error) {
            console.error('Erro ao salvar categoria:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
            try {
                await financeiroService.deletePlanoContas(id);
                loadCategorias();
            } catch (error) {
                console.error('Erro ao excluir categoria:', error);
            }
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#2C5530' }}>
                    Plano de Contas
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                    sx={{ backgroundColor: '#2C5530', color: 'white' }}
                >
                    Nova Categoria
                </Button>
            </Box>

            <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: 'success.main', fontWeight: 'bold' }}>Receitas</Typography>
                <List>
                    {categorias.filter(c => c.tipo === 'RECEBER').map(c => (
                        <ListItem
                            key={c.id}
                            secondaryAction={
                                <Box>
                                    <IconButton edge="end" onClick={() => handleOpen(c)} sx={{ mr: 1 }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => handleDelete(c.id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            }
                            sx={{ '&:hover': { backgroundColor: '#f5f5f5' }, borderRadius: 1 }}
                        >
                            <ListItemText
                                primary={c.descricao}
                                secondary={c.codigo ? `Código: ${c.codigo}` : null}
                            />
                            <Chip label="Receita" color="success" size="small" variant="outlined" />
                        </ListItem>
                    ))}
                    {categorias.filter(c => c.tipo === 'RECEBER').length === 0 && (
                        <Typography variant="body2" color="text.secondary">Nenhuma categoria cadastrada.</Typography>
                    )}
                </List>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" sx={{ mb: 2, color: 'error.main', fontWeight: 'bold' }}>Despesas</Typography>
                <List>
                    {categorias.filter(c => c.tipo === 'PAGAR').map(c => (
                        <ListItem
                            key={c.id}
                            secondaryAction={
                                <Box>
                                    <IconButton edge="end" onClick={() => handleOpen(c)} sx={{ mr: 1 }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => handleDelete(c.id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            }
                            sx={{ '&:hover': { backgroundColor: '#f5f5f5' }, borderRadius: 1 }}
                        >
                            <ListItemText
                                primary={c.descricao}
                                secondary={c.codigo ? `Código: ${c.codigo}` : null}
                            />
                            <Chip label="Despesa" color="error" size="small" variant="outlined" />
                        </ListItem>
                    ))}
                    {categorias.filter(c => c.tipo === 'PAGAR').length === 0 && (
                        <Typography variant="body2" color="text.secondary">Nenhuma categoria cadastrada.</Typography>
                    )}
                </List>
            </Paper>

            <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{editingId ? 'Editar Categoria' : 'Nova Categoria'}</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                            <TextField
                                select
                                label="Tipo"
                                fullWidth
                                defaultValue="RECEBER"
                                inputProps={register('tipo')}
                                error={!!errors.tipo}
                                helperText={errors.tipo?.message}
                            >
                                <MenuItem value="RECEBER">Receita</MenuItem>
                                <MenuItem value="PAGAR">Despesa</MenuItem>
                            </TextField>

                            <TextField
                                label="Descrição"
                                fullWidth
                                {...register('descricao')}
                                error={!!errors.descricao}
                                helperText={errors.descricao?.message}
                            />

                            <TextField
                                label="Código (Opcional)"
                                fullWidth
                                {...register('codigo')}
                                placeholder="Ex: 1.01"
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button type="submit" variant="contained" sx={{ backgroundColor: '#2C5530' }}>
                            Salvar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}
