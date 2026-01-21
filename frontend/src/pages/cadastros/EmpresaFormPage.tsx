import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { empresasService } from '../../services/empresasService';

const empresaSchema = z.object({
    razaoSocial: z.string().min(3, 'Razão Social é obrigatória'),
    nomeFantasia: z.string().optional(),
    cnpj: z.string().min(14, 'CNPJ inválido'),
    inscricaoEstadual: z.string().optional(),
    logradouro: z.string().optional(),
    numero: z.string().optional(),
    complemento: z.string().optional(),
    bairro: z.string().optional(),
    cidade: z.string().optional(),
    estado: z.string().optional(),
    cep: z.string().optional(),
    telefone: z.string().optional(),
    email: z.string().email('Email inválido').optional().or(z.literal('')),
    site: z.string().optional(),
});

type EmpresaFormInputs = z.infer<typeof empresaSchema>;

export default function EmpresaFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id && id !== 'novo';

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EmpresaFormInputs>({
        resolver: zodResolver(empresaSchema),
    });

    useEffect(() => {
        if (isEditing) {
            loadEmpresa(id);
        }
    }, [id]);

    const loadEmpresa = async (empresaId: string) => {
        try {
            const data = await empresasService.getById(empresaId);
            reset(data);
        } catch (error) {
            console.error('Erro ao carregar empresa', error);
            alert('Erro ao carregar dados da empresa');
        }
    };

    const onSubmit: SubmitHandler<EmpresaFormInputs> = async (data) => {
        try {
            if (isEditing) {
                await empresasService.update(id, data);
            } else {
                await empresasService.create(data);
            }
            navigate('/cadastros/empresas');
        } catch (error) {
            console.error('Erro ao salvar empresa', error);
            alert('Erro ao salvar empresa');
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {isEditing ? 'Editar Empresa' : 'Nova Empresa'}
            </Typography>
            <Paper sx={{ p: 4 }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>

                        <TextField
                            fullWidth
                            label="Razão Social"
                            error={!!errors.razaoSocial}
                            helperText={errors.razaoSocial?.message}
                            {...register('razaoSocial')}
                        />

                        <TextField
                            fullWidth
                            label="Nome Fantasia"
                            {...register('nomeFantasia')}
                        />

                        <TextField
                            fullWidth
                            label="CNPJ"
                            error={!!errors.cnpj}
                            helperText={errors.cnpj?.message}
                            {...register('cnpj')}
                        />

                        <TextField
                            fullWidth
                            label="Inscrição Estadual"
                            {...register('inscricaoEstadual')}
                        />

                        {/* Endereço Title */}
                        <Box sx={{ gridColumn: '1 / -1', mt: 2 }}>
                            <Typography variant="h6">Endereço</Typography>
                        </Box>

                        <TextField fullWidth label="CEP" {...register('cep')} />
                        <TextField fullWidth label="Logradouro" {...register('logradouro')} />
                        <TextField fullWidth label="Número" {...register('numero')} />
                        <TextField fullWidth label="Bairro" {...register('bairro')} />
                        <TextField fullWidth label="Cidade" {...register('cidade')} />
                        <TextField fullWidth label="Estado" {...register('estado')} />

                        {/* Contato Title */}
                        <Box sx={{ gridColumn: '1 / -1', mt: 2 }}>
                            <Typography variant="h6">Contato</Typography>
                        </Box>

                        <TextField fullWidth label="Telefone" {...register('telefone')} />
                        <TextField fullWidth label="Email" error={!!errors.email} helperText={errors.email?.message} {...register('email')} />
                        <TextField fullWidth label="Site" {...register('site')} />

                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                            Salvar
                        </Button>
                        <Button variant="outlined" size="large" onClick={() => navigate('/cadastros/empresas')}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
