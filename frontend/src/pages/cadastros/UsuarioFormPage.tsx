import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography, Paper, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { usuariosService, Role } from '../../services/usuariosService';
import { empresasService } from '../../services/empresasService';
import type { Empresa } from '../../services/empresasService';

const usuarioSchema = z.object({
    nome: z.string().min(3, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    senha: z.string().optional(),
    role: z.nativeEnum(Role),
    cargo: z.string().optional(),
    ativo: z.boolean().default(true),
    empresaId: z.string().min(1, 'Empresa é obrigatória'),
});

type UsuarioFormInputs = z.infer<typeof usuarioSchema>;

export default function UsuarioFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id && id !== 'novo';
    const [empresas, setEmpresas] = useState<Empresa[]>([]);

    const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UsuarioFormInputs>({
        resolver: zodResolver(usuarioSchema) as any,
        defaultValues: {
            nome: '',
            email: '',
            senha: '',
            role: Role.OPERADOR,
            cargo: '',
            ativo: true,
            empresaId: ''
        }
    });

    useEffect(() => {
        loadEmpresas();
        if (isEditing) {
            loadUsuario(id);
        }
    }, [id]);

    const loadEmpresas = async () => {
        try {
            const data = await empresasService.getAll();
            setEmpresas(data);
        } catch (error) {
            console.error('Erro ao carregar empresas', error);
        }
    };

    const loadUsuario = async (userId: string) => {
        try {
            const data = await usuariosService.getById(userId);
            reset({ ...data, senha: '' });
        } catch (error) {
            console.error('Erro ao carregar usuário', error);
        }
    };

    const onSubmit: SubmitHandler<UsuarioFormInputs> = async (data) => {
        try {
            if (isEditing) {
                const updateData = { ...data };
                if (!updateData.senha) delete updateData.senha;
                await usuariosService.update(id, updateData);
            } else {
                if (!data.senha) {
                    alert('Senha é obrigatória para novos usuários');
                    return;
                }
                await usuariosService.create(data);
            }
            navigate('/cadastros/usuarios');
        } catch (error) {
            console.error('Erro ao salvar usuário', error);
            alert('Erro ao salvar usuário');
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {isEditing ? 'Editar Usuário' : 'Novo Usuário'}
            </Typography>
            <Paper sx={{ p: 4 }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>

                        <TextField
                            fullWidth
                            label="Nome Completo"
                            error={!!errors.nome}
                            helperText={errors.nome?.message}
                            {...register('nome')}
                        />

                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            {...register('email')}
                        />

                        <TextField
                            fullWidth
                            label={isEditing ? "Nova Senha (deixe em branco para manter)" : "Senha"}
                            type="password"
                            error={!!errors.senha}
                            helperText={errors.senha?.message}
                            {...register('senha')}
                        />

                        <Controller
                            name="empresaId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Empresa"
                                    error={!!errors.empresaId}
                                    helperText={errors.empresaId?.message}
                                    value={field.value || ''}
                                >
                                    {empresas.map((empresa) => (
                                        <MenuItem key={empresa.id} value={empresa.id}>
                                            {empresa.razaoSocial}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Perfil de Acesso"
                                    error={!!errors.role}
                                    helperText={errors.role?.message}
                                    value={field.value || Role.OPERADOR}
                                >
                                    {Object.values(Role).map((role) => (
                                        <MenuItem key={role} value={role}>
                                            {role}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        <TextField fullWidth label="Cargo" {...register('cargo')} />

                        <Box sx={{ gridColumn: '1 / -1' }}>
                            <Controller
                                name="ativo"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Checkbox checked={field.value} {...field} />}
                                        label="Usuário Ativo"
                                    />
                                )}
                            />
                        </Box>

                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                            Salvar
                        </Button>
                        <Button variant="outlined" size="large" onClick={() => navigate('/cadastros/usuarios')}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
