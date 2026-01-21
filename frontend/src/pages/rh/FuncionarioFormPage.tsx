import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography, Paper, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { funcionariosService } from '../../services/funcionariosService';
import { empresasService } from '../../services/empresasService';
import type { Empresa } from '../../services/empresasService';

const funcionarioSchema = z.object({
    nome: z.string().min(3, 'Nome é obrigatório'),
    cpf: z.string().min(11, 'CPF inválido'), // Add better validation/mask later
    email: z.string().email('Email inválido').optional().or(z.literal('')),
    telefone: z.string().optional(),
    cargo: z.string().min(2, 'Cargo é obrigatório'),
    dataAdmissao: z.string().min(1, 'Data de admissão é obrigatória'),
    salario: z.coerce.number().min(0, 'Salário inválido'),
    ativo: z.boolean().default(true),
    empresaId: z.string().min(1, 'Empresa é obrigatória'),
});

type FuncionarioFormInputs = z.infer<typeof funcionarioSchema>;

export default function FuncionarioFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id && id !== 'novo';
    const [empresas, setEmpresas] = useState<Empresa[]>([]);

    const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FuncionarioFormInputs>({
        resolver: zodResolver(funcionarioSchema) as any,
        defaultValues: {
            nome: '',
            cpf: '',
            cargo: '',
            salario: 0,
            ativo: true,
            empresaId: ''
        }
    });

    useEffect(() => {
        loadEmpresas();
        if (isEditing) {
            loadFuncionario(id);
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

    const loadFuncionario = async (funcId: string) => {
        try {
            const data = await funcionariosService.getById(funcId);
            // Format date for input type="date"
            const formattedDate = data.dataAdmissao ? new Date(data.dataAdmissao).toISOString().split('T')[0] : '';
            reset({ ...data, dataAdmissao: formattedDate });
        } catch (error) {
            console.error('Erro ao carregar funcionário', error);
        }
    };

    const onSubmit: SubmitHandler<FuncionarioFormInputs> = async (data) => {
        try {
            // Ensure date is ISO-8601 compatible for Prisma DateTime (appending time if needed or let backend handle)
            // Ideally backend expects DateTime (ISO string).
            const payload = { ...data, dataAdmissao: new Date(data.dataAdmissao).toISOString() };

            if (isEditing) {
                await funcionariosService.update(id, payload);
            } else {
                await funcionariosService.create(payload);
            }
            navigate('/rh/funcionarios');
        } catch (error) {
            console.error('Erro ao salvar funcionário', error);
            alert('Erro ao salvar funcionário');
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {isEditing ? 'Editar Funcionário' : 'Novo Funcionário'}
            </Typography>
            <Paper sx={{ p: 4 }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>

                        <Box sx={{ gridColumn: '1 / -1' }}><Typography variant="h6">Dados Pessoais</Typography></Box>

                        <TextField
                            fullWidth
                            label="Nome Completo"
                            error={!!errors.nome}
                            helperText={errors.nome?.message}
                            {...register('nome')}
                        />

                        <TextField
                            fullWidth
                            label="CPF"
                            error={!!errors.cpf}
                            helperText={errors.cpf?.message}
                            {...register('cpf')}
                        />

                        <TextField fullWidth label="Email" {...register('email')} />
                        <TextField fullWidth label="Telefone" {...register('telefone')} />

                        <Box sx={{ gridColumn: '1 / -1', mt: 2 }}><Typography variant="h6">Dados Contratuais</Typography></Box>

                        <TextField
                            fullWidth
                            label="Cargo"
                            error={!!errors.cargo}
                            helperText={errors.cargo?.message}
                            {...register('cargo')}
                        />

                        <TextField
                            fullWidth
                            label="Data Admissão"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.dataAdmissao}
                            helperText={errors.dataAdmissao?.message}
                            {...register('dataAdmissao')}
                        />

                        <TextField
                            fullWidth
                            label="Salário"
                            type="number"
                            error={!!errors.salario}
                            helperText={errors.salario?.message}
                            {...register('salario')}
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

                        <Box sx={{ gridColumn: '1 / -1' }}>
                            <Controller
                                name="ativo"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Checkbox checked={field.value} {...field} />}
                                        label="Funcionário Ativo"
                                    />
                                )}
                            />
                        </Box>

                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                            Salvar
                        </Button>
                        <Button variant="outlined" size="large" onClick={() => navigate('/rh/funcionarios')}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
