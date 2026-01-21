import { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    IconButton,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import {
    DataGrid,
    GridToolbar
} from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { estoqueService } from '../../services/estoqueService';

// Schema for validation
const grupoSchema = z.object({
    nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    descricao: z.string().optional()
});

type GrupoFormData = z.infer<typeof grupoSchema>;

export default function GruposListPage() {
    const [grupos, setGrupos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<GrupoFormData>({
        resolver: zodResolver(grupoSchema)
    });

    const fetchGrupos = async () => {
        try {
            setLoading(true);
            const data = await estoqueService.getGrupos();
            setGrupos(data);
        } catch (error) {
            console.error('Erro ao buscar grupos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGrupos();
    }, []);

    const handleOpen = (grupo?: any) => {
        if (grupo) {
            setEditingId(grupo.id);
            setValue('nome', grupo.nome);
            setValue('descricao', grupo.descricao);
        } else {
            setEditingId(null);
            reset();
        }
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        reset();
    };

    const onSubmit = async (data: GrupoFormData) => {
        try {
            if (editingId) {
                await estoqueService.updateGrupo(editingId, data);
            } else {
                await estoqueService.createGrupo(data);
            }
            fetchGrupos();
            handleClose();
        } catch (error) {
            console.error('Erro ao salvar grupo:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir este grupo?')) {
            try {
                await estoqueService.deleteGrupo(id);
                fetchGrupos();
            } catch (error) {
                console.error('Erro ao excluir grupo:', error);
            }
        }
    };

    const columns: GridColDef[] = [
        { field: 'nome', headerName: 'Nome', flex: 1 },
        { field: 'descricao', headerName: 'Descrição', flex: 2 },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 120,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Box>
                    <IconButton size="small" onClick={() => handleOpen(params.row)} color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(params.row.id)} color="error">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            )
        }
    ];

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#2C5530' }}>
                    Grupos de Produtos
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                    sx={{
                        backgroundColor: '#2C5530',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#1E3A21'
                        }
                    }}
                >
                    Novo Grupo
                </Button>
            </Box>

            <Paper sx={{ flexGrow: 1, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                <DataGrid
                    rows={grupos}
                    columns={columns}
                    loading={loading}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-cell': {
                            borderBottom: '1px solid #f0f0f0'
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#F9F9F7',
                            borderBottom: '2px solid #e0e0e0'
                        }
                    }}
                />
            </Paper>

            {/* Dialog for Create/Edit */}
            <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{editingId ? 'Editar Grupo' : 'Novo Grupo'}</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nome do Grupo"
                            fullWidth
                            variant="outlined"
                            {...register('nome')}
                            error={!!errors.nome}
                            helperText={errors.nome?.message}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="dense"
                            label="Descrição"
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={3}
                            {...register('descricao')}
                        />
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={handleClose} color="inherit">Cancelar</Button>
                        <Button type="submit" variant="contained" sx={{ backgroundColor: '#2C5530' }}>
                            Salvar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}
