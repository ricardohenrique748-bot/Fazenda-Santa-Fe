import { useState, useEffect } from 'react';
import type { SyntheticEvent, ReactNode } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography, Paper, Tabs, Tab, FormControlLabel, Checkbox, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { empresasService } from '../../services/empresasService';
import type { Fazenda } from '../../services/fazendasService';

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

const SectionTitle = ({ children }: { children: ReactNode }) => (
    <Box sx={{ mb: 1, borderBottom: '1px solid #e0e0e0', pb: 0.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {children}
        </Typography>
    </Box>
);

export default function EmpresaFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id && id !== 'novo';
    const [tabValue, setTabValue] = useState(0);
    const [fazendas, setFazendas] = useState<Fazenda[]>([]);

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
        const loadEmpresa = async (empresaId: string) => {
            try {
                const data = await empresasService.getById(empresaId);
                if (data.fazendas) {
                    setFazendas(data.fazendas);
                }
                // Ensure boolean fields are boolean
                reset({
                    ...data,
                    ativo: data.ativo ?? true, // Default to true if null/undefined
                });
            } catch (error) {
                console.error('Erro ao carregar empresa', error);
                alert('Erro ao carregar dados da empresa');
            }
        };

        if (isEditing && id) {
            loadEmpresa(id);
        }
    }, [id, isEditing, reset]);

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
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                {isEditing ? 'Cadastro de Empresa' : 'Nova Empresa'}
            </Typography>

            <Paper sx={{ p: 2 }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
                        <Tab label="Cadastro Básico" />
                        <Tab label="E-social" />
                    </Tabs>

                    {/* TAB 0 - CADASTRO BÁSICO */}
                    <div role="tabpanel" hidden={tabValue !== 0}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(12, 1fr)' }, gap: 2 }}>

                            {/* ROW 1: DADOS BÁSICOS (Left 8) + DEFINIÇÕES (Right 4) */}
                            <Box sx={{ gridColumn: { xs: '1 / -1', lg: 'span 8' }, display: 'grid', gap: 2 }}>
                                <Paper variant="outlined" sx={{ p: 2 }}>
                                    <SectionTitle>Dados Básicos</SectionTitle>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 4fr', gap: 2, mb: 2 }}>
                                        <TextField
                                            label="Código"
                                            {...register('codigo')}
                                            disabled
                                            size="small"
                                            slotProps={{ input: { placeholder: 'Auto' }, inputLabel: { shrink: true } }}
                                        />
                                        <TextField
                                            label="Nome (Razão Social)"
                                            required
                                            size="small"
                                            error={!!errors.razaoSocial}
                                            helperText={errors.razaoSocial?.message}
                                            {...register('razaoSocial')}
                                        />
                                    </Box>
                                    <Box sx={{ mb: 2 }}>
                                        <TextField label="Fantasia" fullWidth size="small" {...register('nomeFantasia')} />
                                    </Box>

                                    <Box sx={{ display: 'grid', gridTemplateColumns: '4fr 1fr', gap: 2, mb: 2 }}>
                                        <TextField label="Endereço" size="small" {...register('logradouro')} />
                                        <TextField label="Nº" size="small" {...register('numero')} />
                                    </Box>

                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 2, mb: 2 }}>
                                        <TextField label="Telefone" size="small" {...register('telefone')} />
                                        <TextField label="E-mail" size="small" fullWidth {...register('email')} />
                                    </Box>

                                    <Box sx={{ mb: 2 }}>
                                        <TextField label="Bairro" size="small" fullWidth {...register('bairro')} />
                                    </Box>

                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr 2fr', gap: 2 }}>
                                        <TextField label="UF" size="small" {...register('estado')} />
                                        <TextField label="Município" size="small" {...register('cidade')} />
                                        <TextField label="CEP" size="small" {...register('cep')} />
                                    </Box>
                                </Paper>
                            </Box>

                            <Box sx={{ gridColumn: { xs: '1 / -1', lg: 'span 4' } }}>
                                <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                                    <SectionTitle>Definições para Empresa</SectionTitle>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Controller
                                                name="ativo"
                                                control={control}
                                                render={({ field }) => (
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={!field.value}
                                                                onChange={(e) => field.onChange(!e.target.checked)}
                                                            />
                                                        }
                                                        label="Inativar"
                                                    />
                                                )}
                                            />
                                        </Box>
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
                                        <Box sx={{ mt: 2 }}>
                                            <TextField label="CFOP" size="small" fullWidth {...register('cfop')} />
                                        </Box>
                                    </Box>
                                </Paper>
                            </Box>

                            {/* ROW 2: CONTROLE + CORRESPONDENCIA (Left 6) | FAZENDAS (Right 6) */}
                            <Box sx={{ gridColumn: { xs: '1 / -1', lg: 'span 6' }, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {/* Controle de Empresa */}
                                <Paper variant="outlined" sx={{ p: 2 }}>
                                    <SectionTitle>Controle de Empresa</SectionTitle>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                        <TextField label="CNPJ" size="small" {...register('cnpj')} />
                                        <TextField label="CPF" size="small" {...register('cpf')} />
                                        <TextField label="Inscrição Estadual" size="small" {...register('inscricaoEstadual')} />
                                        <TextField label="Inscrição Municipal" size="small" {...register('inscricaoMunicipal')} />
                                        <TextField label="CEI" size="small" {...register('cei')} />
                                        <TextField label="CNAE Fiscal" size="small" {...register('cnaeFiscal')} />
                                    </Box>
                                </Paper>

                                {/* Correspondência */}
                                <Paper variant="outlined" sx={{ p: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Checkbox size="small" /> {/* Placeholder for "Copiar Endereço" or similar logic if needed */}
                                        <SectionTitle>Correspondência / Cobrança</SectionTitle>
                                    </Box>

                                    <Box sx={{ display: 'grid', gridTemplateColumns: '4fr 1fr', gap: 2, mb: 2 }}>
                                        <TextField label="Endereço" size="small" {...register('correspondenciaLogradouro')} />
                                        <TextField label="Nº" size="small" {...register('correspondenciaNumero')} />
                                    </Box>
                                    <Box sx={{ mb: 2 }}>
                                        <TextField label="Bairro" size="small" fullWidth {...register('correspondenciaBairro')} />
                                    </Box>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr 2fr', gap: 2 }}>
                                        <TextField label="UF" size="small" {...register('correspondenciaEstado')} />
                                        <TextField label="Município" size="small" {...register('correspondenciaCidade')} />
                                        <TextField label="CEP" size="small" {...register('correspondenciaCep')} />
                                    </Box>
                                </Paper>
                            </Box>

                            <Box sx={{ gridColumn: { xs: '1 / -1', lg: 'span 6' } }}>
                                <Paper variant="outlined" sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                        <SectionTitle>Fazendas da Empresa</SectionTitle>
                                        <Button variant="outlined" size="small" onClick={() => navigate('/cadastros/fazendas')}>
                                            Fazenda
                                        </Button>
                                    </Box>
                                    <Box sx={{ flexGrow: 1, border: '1px solid #eee', p: 1, overflowY: 'auto', minHeight: '200px' }}>
                                        {fazendas.length === 0 ? (
                                            <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
                                                Nenhuma fazenda cadastrada.
                                            </Typography>
                                        ) : (
                                            fazendas.map((fazenda) => (
                                                <Box key={fazenda.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <Checkbox size="small" checked disabled />
                                                    <Typography variant="body2">{fazenda.nome}</Typography>
                                                </Box>
                                            ))
                                        )}
                                    </Box>
                                </Paper>
                            </Box>

                            {/* ROW 3: FISCAL (Full width) */}
                            <Box sx={{ gridColumn: '1 / -1' }}>
                                <Paper variant="outlined" sx={{ p: 2 }}>
                                    <SectionTitle>FISCAL / SEFIP</SectionTitle>
                                    <Box sx={{ mt: 2, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
                                        <TextField label="Lotação Tributária" size="small" {...register('lotacaoTributaria')} sx={{ gridColumn: '1 / -1' }} />
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <TextField label="Cód FPAS" size="small" {...register('codigoFpas')} />
                                            <TextField label="Cód GPS" size="small" {...register('codigoGps')} />
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <TextField label="Outras Ent." size="small" {...register('outrasEntidades')} />
                                            <TextField label="Cód FAP" size="small" {...register('codigoFap')} />
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                            <TextField
                                                label="Alíquota RAT"
                                                size="small"
                                                type="number"
                                                inputProps={{ step: "0.1" }}
                                                sx={{ width: '100px' }}
                                                {...register('aliquotaRat')}
                                            />
                                        </Box>

                                        <TextField
                                            label="Código SIMPLES"
                                            select
                                            size="small"
                                            defaultValue=""
                                            inputProps={register('codigoSimples')}
                                            sx={{ gridColumn: { md: 'span 2' } }}
                                        >
                                            <MenuItem value="">Selecione</MenuItem>
                                            <MenuItem value="1">1 - Não Optante</MenuItem>
                                            <MenuItem value="2">2 - Optante (Até 1.2M)</MenuItem>
                                            <MenuItem value="3">3 - Optante (&gt; 1.2M)</MenuItem>
                                        </TextField>
                                    </Box>
                                </Paper>
                            </Box>

                        </Box>
                    </div>

                    {/* TAB 1 - E-SOCIAL (Placeholder) */}
                    <div role="tabpanel" hidden={tabValue !== 1}>
                        <Box sx={{ p: 4, textAlign: 'center' }}>
                            <Typography color="text.secondary">Configurações do E-social (Em breve)</Typography>
                        </Box>
                    </div>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end', borderTop: 1, borderColor: 'divider', pt: 2 }}>
                        <Button variant="outlined" onClick={() => navigate('/cadastros/empresas')}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                            Gravar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
