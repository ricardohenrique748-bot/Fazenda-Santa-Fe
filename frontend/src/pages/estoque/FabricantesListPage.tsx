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
const fabricanteSchema = z.object({
    nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres')
});

type FabricanteFormData = z.infer<typeof fabricanteSchema>;

export default function FabricantesListPage() {
    const [fabricantes, setFabricantes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FabricanteFormData>({
        resolver: zodResolver(fabricanteSchema)
    });

    const fetchFabricantes = async () => {
        try {
            setLoading(true);
            const data = await estoqueService.getFabricantes();
            setFabricantes(data);
        } catch (error) {
            console.error('Erro ao buscar fabricantes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFabricantes();
    }, []);

    const handleOpen = (fabricante?: any) => {
        if (fabricante) {
            setEditingId(fabricante.id);
            setValue('nome', fabricante.nome);
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

    const onSubmit = async (data: FabricanteFormData) => {
        try {
            if (editingId) {
                await estoqueService.updateFabricante(editingId, data);
            } else {
                await estoqueService.createFabricante(data);
            }
            fetchFabricantes();
            handleClose();
        } catch (error) {
            console.error('Erro ao salvar fabricante:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir este fabricante?')) {
            try {
                await estoqueService.deleteFabricante(id);
                fetchFabricantes();
            } catch (error) {
                console.error('Erro ao excluir fabricante:', error);
            }
        }
    };

    const columns: GridColDef[] = [
        { field: 'nome', headerName: 'Nome', flex: 1 },
        {
            field: 'createdAt', headerName: 'Data de Cadastro', width: 180,
            valueFormatter: (params) => new Date(params.value).toLocaleDateString()
        },
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
                    Fabricantes
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
                    Novo Fabricante
                </Button>
            </Box>

            <Paper sx={{ flexGrow: 1, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                <DataGrid
                    rows={fabricantes}
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
                <DialogTitle>{editingId ? 'Editar Fabricante' : 'Novo Fabricante'}</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nome do Fabricante"
                            fullWidth
                            variant="outlined"
                            {...register('nome')}
                            error={!!errors.nome}
                            helperText={errors.nome?.message}
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
