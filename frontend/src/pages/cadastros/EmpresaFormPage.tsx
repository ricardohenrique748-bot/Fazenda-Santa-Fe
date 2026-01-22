import { useState, useEffect } from 'react';
import type { SyntheticEvent } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography, Paper, Tabs, Tab, FormControlLabel, Checkbox, Divider, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { empresasService } from '../../services/empresasService';

const empresaSchema = z.object({
    codigo: z.string().optional(),
    ativo: z.boolean().optional(),
    razaoSocial: z.string().min(3, 'Razão Social é obrigatória'),
    nomeFantasia: z.string().optional(),
    cnpj: z.string().optional(),
    cpf: z.string().optional(),
    inscricaoEstadual: z.string().optional(),
    inscricaoMunicipal: z.string().optional(),
    cei: z.string().optional(),
    cnaeFiscal: z.string().optional(),
    cfop: z.string().optional(),

    // Flags
    ignorarCaixaFinanceiro: z.boolean().optional(),
    ignorarEstoque: z.boolean().optional(),

    // Endereço Principal
    logradouro: z.string().optional(),
    numero: z.string().optional(),
    complemento: z.string().optional(),
    bairro: z.string().optional(),
    cidade: z.string().optional(),
    estado: z.string().optional(),
    cep: z.string().optional(),

    // Contato
    telefone: z.string().optional(),
    email: z.string().email('Email inválido').optional().or(z.literal('')),
    site: z.string().optional(),

    // Endereço Correspondência
    correspondenciaLogradouro: z.string().optional(),
    correspondenciaNumero: z.string().optional(),
    correspondenciaBairro: z.string().optional(),
    correspondenciaCidade: z.string().optional(),
    correspondenciaEstado: z.string().optional(),
    correspondenciaCep: z.string().optional(),

    // Fiscal
    lotacaoTributaria: z.string().optional(),
    codigoFpas: z.string().optional(),
    codigoGps: z.string().optional(),
    outrasEntidades: z.string().optional(),
    codigoFap: z.string().optional(),
    codigoSimples: z.string().optional(),
    aliquotaRat: z.coerce.number().optional(),
});

type EmpresaFormInputs = z.infer<typeof empresaSchema>;

export default function EmpresaFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id && id !== 'novo';
    const [tabValue, setTabValue] = useState(0);

    const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EmpresaFormInputs>({
        resolver: zodResolver(empresaSchema),
        defaultValues: {
            ativo: true,
            ignorarCaixaFinanceiro: false,
            ignorarEstoque: false,
        }
    });

    const handleTabChange = (event: SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

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
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="cadastro tabs">
                            <Tab label="Cadastro Básico" />
                            <Tab label="Dados Fiscais / E-social" />
                        </Tabs>
                    </Box>

                    {/* TAB 0 - DADOS BASICOS */}
                    <div role="tabpanel" hidden={tabValue !== 0}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>

                            {/* Dados Básicos */}
                            <Box sx={{ gridColumn: '1 / -1' }}>
                                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>Dados Básicos</Typography>
                            </Box>

                            <TextField label="Código" {...register('codigo')} />
                            <TextField
                                label="Razão Social"
                                required
                                error={!!errors.razaoSocial}
                                helperText={errors.razaoSocial?.message}
                                {...register('razaoSocial')}
                            />

                            <TextField label="Nome Fantasia" {...register('nomeFantasia')} sx={{ gridColumn: '1 / -1' }} />

                            {/* Checkboxes */}
                            <Box sx={{ gridColumn: '1 / -1', display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Controller
                                    name="ativo"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            control={<Checkbox {...field} checked={field.value} />}
                                            label="Ativo"
                                        />
                                    )}
                                />
                                <Controller
                                    name="ignorarCaixaFinanceiro"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            control={<Checkbox {...field} checked={field.value} />}
                                            label="Ignorar Empresa para Caixa Financeiro"
                                        />
                                    )}
                                />
                                <Controller
                                    name="ignorarEstoque"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            control={<Checkbox {...field} checked={field.value} />}
                                            label="Ignorar Empresa para Estoque"
                                        />
                                    )}
                                />
                            </Box>

                            <TextField label="CFOP" {...register('cfop')} />

                            {/* Endereço */}
                            <Box sx={{ gridColumn: '1 / -1', mt: 1 }}>
                                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>Endereço</Typography>
                                <Divider />
                            </Box>

                            <TextField label="CEP" {...register('cep')} />
                            <TextField label="Logradouro" {...register('logradouro')} sx={{ gridColumn: { md: 'span 2' } }} />
                            <TextField label="Número" {...register('numero')} />
                            <TextField label="Bairro" {...register('bairro')} />
                            <TextField label="Cidade" {...register('cidade')} />
                            <TextField label="Estado" {...register('estado')} />
                            <TextField label="Complemento" {...register('complemento')} />

                            {/* Contato */}
                            <Box sx={{ gridColumn: '1 / -1', mt: 1 }}>
                                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>Contato</Typography>
                                <Divider />
                            </Box>

                            <TextField label="Telefone" {...register('telefone')} />
                            <TextField label="Email" error={!!errors.email} helperText={errors.email?.message} {...register('email')} />
                        </Box>

                        {/* Controle de Empresa */}
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>Controle de Empresa</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                                <TextField label="CNPJ" {...register('cnpj')} />
                                <TextField label="CPF" {...register('cpf')} />
                                <TextField label="Inscrição Estadual" {...register('inscricaoEstadual')} />
                                <TextField label="Inscrição Municipal" {...register('inscricaoMunicipal')} />
                                <TextField label="CEI" {...register('cei')} />
                                <TextField label="CNAE Fiscal" {...register('cnaeFiscal')} />
                            </Box>
                        </Box>

                        {/* Correspondencia */}
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>Correspondência / Cobrança</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                                <TextField label="CEP" {...register('correspondenciaCep')} />
                                <TextField label="Logradouro" {...register('correspondenciaLogradouro')} sx={{ gridColumn: { md: 'span 2' } }} />
                                <TextField label="Número" {...register('correspondenciaNumero')} />
                                <TextField label="Bairro" {...register('correspondenciaBairro')} />
                                <TextField label="Cidade" {...register('correspondenciaCidade')} />
                                <TextField label="Estado" {...register('correspondenciaEstado')} />
                            </Box>
                        </Box>
                    </div>

                    {/* TAB 1 - DADOS FISCAIS */}
                    <div role="tabpanel" hidden={tabValue !== 1}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                            <Box sx={{ gridColumn: '1 / -1' }}>
                                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>FISCAL / SEFIP</Typography>
                                <Divider />
                            </Box>

                            <TextField label="Lotação Tributária" {...register('lotacaoTributaria')} sx={{ gridColumn: '1 / -1' }} />
                            <TextField label="Código FPAS" {...register('codigoFpas')} />
                            <TextField label="Código GPS" {...register('codigoGps')} />
                            <TextField label="Outras Entidades" {...register('outrasEntidades')} />
                            <TextField label="Código FAP" {...register('codigoFap')} />

                            <TextField label="Código SIMPLES" select defaultValue="" inputProps={register('codigoSimples')}>
                                <MenuItem value="">Selecione</MenuItem>
                                <MenuItem value="1">1 - Não Optante</MenuItem>
                                <MenuItem value="2">2 - Optante</MenuItem>
                            </TextField>

                            <TextField
                                label="Aliquota RAT"
                                type="number"
                                inputProps={{ step: "0.1" }}
                                {...register('aliquotaRat')}
                            />
                        </Box>
                    </div>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button variant="outlined" size="large" onClick={() => navigate('/cadastros/empresas')}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                            Gravar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
