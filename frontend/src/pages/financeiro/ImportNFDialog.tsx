import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Divider,
    Grid,
    Alert,
    CircularProgress,
    MenuItem,
    Paper
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import * as pdfjs from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { financeiroService, TipoLancamento } from '../../services/financeiroService';
import { empresasService, type Empresa } from '../../services/empresasService';
import { estoqueService } from '../../services/estoqueService';
import type { PlanoContas } from '../../services/financeiroService';

interface ImportNFDialogProps {
    open: boolean;
    onClose: () => void;
}

interface NFData {
    chave: string;
    numero: string;
    serie: string;
    protocolo?: string;
    naturezaOperacao?: string;
    dataEmissao: string;
    dataSaidaEntrada: string;
    horaSaida: string;
    emitente: {
        nome: string;
        cnpj: string;
        ie?: string;
        endereco: string;
        cidade?: string;
        uf?: string;
    };
    destinatario: {
        nome: string;
        cnpj: string;
    };
    itens: Array<{
        cod: string;
        descricao: string;
        ncm: string;
        unidade: string;
        quantidade: number;
        valorUnitario: number;
        valorTotal: number;
    }>;
    duplicatas: Array<{
        numero: string;
        vencimento: string;
        valor: number;
    }>;
    valorTotal: number;
}

export default function ImportNFDialog({ open, onClose }: ImportNFDialogProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [nfData, setNfData] = useState<NFData | null>(null);

    // Form fields for confirmation
    const [selectedEmpresa, setSelectedEmpresa] = useState('');
    const [selectedCategoria, setSelectedCategoria] = useState('');
    const [selectedDeposito, setSelectedDeposito] = useState('');
    const [enviarParaEstoque, setEnviarParaEstoque] = useState(false);

    // Loaded data
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [categorias, setCategorias] = useState<PlanoContas[]>([]);
    const [depositos, setDepositos] = useState<any[]>([]);

    useEffect(() => {
        if (open) {
            loadInitialData();
        } else {
            resetForm();
        }
    }, [open]);

    const loadInitialData = async () => {
        try {
            const [eData, cData, dData] = await Promise.all([
                empresasService.getAll(),
                financeiroService.getPlanoContas(),
                estoqueService.getDepositos()
            ]);
            setEmpresas(eData);
            setCategorias(cData.filter(c => c.tipo === TipoLancamento.PAGAR));
            setDepositos(dData);

            if (eData.length > 0) setSelectedEmpresa(eData[0].id);
            if (dData.length > 0) setSelectedDeposito(dData[0].id);
        } catch (err) {
            console.error('Erro ao carregar dados iniciais', err);
        }
    };

    const resetForm = () => {
        setNfData(null);
        setError(null);
        setEnviarParaEstoque(false);
    };

    const parsePDF = async (file: File) => {
        setLoading(true);
        setError(null);

        try {
            // Setup worker from the pre-imported URL
            pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
            console.log('Worker configurado com:', pdfWorker);

            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const strings = content.items.map((item: any) => item.str);
                fullText += strings.join(' ') + '\n';
            }

            // Basic regex patterns for DANFE
            const chaveRegex = /\b(\d{4}\s?){10}\d{4}\b|\b\d{44}\b/;
            const numeroRegex = /(?:NÚMERO|Nº|Número)[:.\s]+(\d+(?:\.?\d+)*)/i;
            const valorTotalRegex = /(?:VALOR TOTAL|TOTAL DA NOTA|TOTAL)[:.\s]+R?\$?\s?(\d+(?:\.?\d+)*[.,]\d{2})/i;
            const cnpjRegex = /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/;

            const chaveMatch = fullText.match(chaveRegex);
            const numeroMatch = fullText.match(numeroRegex);
            const valorMatch = fullText.match(valorTotalRegex);
            const cnpjMatches = fullText.match(new RegExp(cnpjRegex, 'g'));

            const chave = chaveMatch ? chaveMatch[0].replace(/\s/g, '') : '';
            const numero = numeroMatch ? numeroMatch[1].replace(/\./g, '') : '';
            const valorTotal = valorMatch ? parseFloat(valorMatch[1].replace(/\./g, '').replace(',', '.')) : 0;
            const emitenteCnpj = cnpjMatches && cnpjMatches.length > 0 ? cnpjMatches[0] : '';

            // Tentar extrair nome do emitente de forma mais inteligente
            let emitenteNome = '';
            const emitenteHeaderRegex = /(?:RAZÃO SOCIAL|NOME|EMITENTE|FORNECEDOR)[:.\s]+([A-Z0-9\s.]{10,})/i;
            const emitMatch = fullText.match(emitenteHeaderRegex);

            if (emitMatch) {
                emitenteNome = emitMatch[1].trim().split('\n')[0].trim();
            }

            if (!emitenteNome) {
                const lines = fullText.split('\n');
                for (let i = 0; i < Math.min(lines.length, 25); i++) {
                    const line = lines[i].trim();
                    // Filtra linhas que parecem ser o nome (não são números longos, nem palavras curtas, nem DANFE)
                    if (line.length > 10 &&
                        !line.includes('DANFE') &&
                        !line.includes('PÁGINA') &&
                        !line.includes('CHAVE') &&
                        !line.match(/^\d+$/) &&
                        !line.match(/\d{11,}/)) {
                        emitenteNome = line;
                        break;
                    }
                }
            }

            // Tentar extrair duplicatas/parcelas
            const duplicatas: any[] = [];
            // Padrão de duplicata em DANFE: Data seguido de valor
            const dupRegex = /(\d{2}\/\d{2}\/\d{4})\s+R?\$?\s?(\d+(?:\.?\d+)*[.,]\d{2})/g;
            let dupMatch;
            while ((dupMatch = dupRegex.exec(fullText)) !== null) {
                const venc = dupMatch[1].split('/').reverse().join('-');
                const val = parseFloat(dupMatch[2].replace(/\./g, '').replace(',', '.'));

                // Evita duplicatas com valor total (redundante) ou irreais
                if (val > 0 && val <= valorTotal + 0.1) {
                    // Verifica se já não adicionamos essa parcela (mesmo vencimento e valor)
                    const jaExiste = duplicatas.some(d => d.vencimento === venc && Math.abs(d.valor - val) < 0.01);
                    if (!jaExiste) {
                        duplicatas.push({
                            numero: (duplicatas.length + 1).toString().padStart(3, '0'),
                            vencimento: venc,
                            valor: val
                        });
                    }
                }
            }

            // Fallback: se não achou parcelas mas tem valor, sugere vencimento único
            if (duplicatas.length === 0 && valorTotal > 0) {
                const possibleDates = fullText.match(/\d{2}\/\d{2}\/\d{4}/g) || [];
                // Pega a última data encontrada que não seja a de hoje (provavelmente vencimento)
                const today = new Date().toLocaleDateString('pt-BR');
                const vencDate = possibleDates.reverse().find(d => d !== today) || today;

                duplicatas.push({
                    numero: '001',
                    vencimento: vencDate.split('/').reverse().join('-'),
                    valor: valorTotal
                });
            }

            if (!chave && !numero) {
                throw new Error('Não foi possível extrair os dados básicos deste PDF. Verifique se é uma NF-e (DANFE) válida.');
            }

            const data: NFData = {
                chave,
                numero,
                serie: '1',
                dataEmissao: new Date().toISOString().split('T')[0],
                dataSaidaEntrada: '',
                horaSaida: '',
                emitente: {
                    nome: emitenteNome || 'Emitente extraído do PDF',
                    cnpj: emitenteCnpj,
                    endereco: 'Endereço no PDF'
                },
                destinatario: {
                    nome: '',
                    cnpj: ''
                },
                itens: [],
                duplicatas: duplicatas,
                valorTotal
            };

            setNfData(data);
            setError('Nota extraída parcialmente do PDF. Verifique os dados e as duplicatas/vencimentos sugeridos.');
        } catch (err: any) {
            console.error('Erro ao processar PDF', err);
            setError('Erro ao processar o PDF: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const parseXML = (file: File) => {
        setLoading(true);
        setError(null);
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const xmlText = e.target?.result as string;
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, "text/xml");

                const getTxt = (selector: string, parentElement?: Element | Document | null) => {
                    const p = parentElement || xmlDoc;
                    return p?.querySelector(selector)?.textContent || '';
                };

                const ide = xmlDoc.querySelector('ide');
                const emit = xmlDoc.querySelector('emit');
                const detList = Array.from(xmlDoc.querySelectorAll('det'));
                const dupList = Array.from(xmlDoc.querySelectorAll('dup'));
                const icmsTot = xmlDoc.querySelector('ICMSTot');

                if (!ide || !emit) {
                    throw new Error('Formato de XML de NF-e inválido (ide ou emit não encontrados).');
                }

                const dhEmi = getTxt('dhEmi', ide) || getTxt('dEmi', ide);
                const dhSaiEnt = getTxt('dhSaiEnt', ide) || getTxt('dSaiEnt', ide);

                const dataEmissao = dhEmi ? dhEmi.split('T')[0] : '';
                const dataSaidaEntrada = dhSaiEnt ? dhSaiEnt.split('T')[0] : '';
                const horaSaida = dhSaiEnt && dhSaiEnt.includes('T') ? dhSaiEnt.split('T')[1].substring(0, 8) : '';

                const enderEmit = emit.querySelector('enderEmit');
                const endereco = enderEmit ? `${getTxt('xLgr', enderEmit)}, ${getTxt('nro', enderEmit)} - ${getTxt('xBairro', enderEmit)}, ${getTxt('xMun', enderEmit)}/${getTxt('UF', enderEmit)}` : '';

                const items = detList.map(det => ({
                    cod: getTxt('cProd', det),
                    descricao: getTxt('xProd', det),
                    ncm: getTxt('NCM', det),
                    unidade: getTxt('uCom', det),
                    quantidade: parseFloat(getTxt('qCom', det) || '0'),
                    valorUnitario: parseFloat(getTxt('vUnCom', det) || '0'),
                    valorTotal: parseFloat(getTxt('vProd', det) || '0')
                }));

                const duplicatas = dupList.map(dup => ({
                    numero: getTxt('nDup', dup),
                    vencimento: getTxt('dVenc', dup),
                    valor: parseFloat(getTxt('vDup', dup) || '0')
                }));

                const infProt = xmlDoc.querySelector('infProt');
                const dest = xmlDoc.querySelector('dest');

                const data: NFData = {
                    chave: (xmlDoc.querySelector('infNFe')?.id || xmlDoc.querySelector('infNFe')?.getAttribute('Id') || '').replace('NFe', ''),
                    numero: getTxt('nNF', ide),
                    serie: getTxt('serie', ide),
                    protocolo: getTxt('nProt', infProt),
                    naturezaOperacao: getTxt('natOp', ide),
                    dataEmissao,
                    dataSaidaEntrada,
                    horaSaida,
                    emitente: {
                        nome: getTxt('xNome', emit),
                        cnpj: getTxt('CNPJ', emit) || getTxt('CPF', emit),
                        ie: getTxt('IE', emit),
                        endereco,
                        cidade: getTxt('xMun', enderEmit),
                        uf: getTxt('UF', enderEmit)
                    },
                    destinatario: {
                        nome: getTxt('xNome', dest),
                        cnpj: getTxt('CNPJ', dest) || getTxt('CPF', dest)
                    },
                    itens: items,
                    duplicatas,
                    valorTotal: parseFloat(getTxt('vNF', icmsTot) || '0')
                };

                setNfData(data);
            } catch (err: any) {
                setError(err.message || 'Erro ao processar o XML.');
            } finally {
                setLoading(false);
            }
        };

        reader.onerror = () => {
            setError('Erro ao ler o arquivo.');
            setLoading(false);
        };

        reader.readAsText(file);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const isXml = selectedFile.type === 'text/xml' || selectedFile.name.endsWith('.xml');
            const isPdf = selectedFile.type === 'application/pdf' || selectedFile.name.endsWith('.pdf');

            if (isXml) {
                parseXML(selectedFile);
            } else if (isPdf) {
                parsePDF(selectedFile);
            } else {
                setError('Por favor, selecione um arquivo XML ou PDF da NF-e.');
            }
        }
    };

    const handleImport = async () => {
        if (!nfData || !selectedEmpresa || !selectedCategoria) return;

        setLoading(true);
        try {
            await financeiroService.importarNF({
                nf: nfData,
                empresaId: selectedEmpresa,
                planoContasId: selectedCategoria,
                depositoId: enviarParaEstoque ? selectedDeposito : undefined,
                enviarParaEstoque
            });

            onClose();
        } catch (err: any) {
            setError('Erro ao salvar os dados importados: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ fontWeight: 800 }}>Importar Nota Fiscal (XML ou PDF)</DialogTitle>
            <DialogContent dividers>
                {error && <Alert severity={error.includes('extraída parcialmente') ? 'warning' : 'error'} sx={{ mb: 2 }}>{error}</Alert>}

                {!nfData ? (
                    <Box sx={{
                        py: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px dashed #ccc',
                        borderRadius: 4,
                        bgcolor: '#fafafa'
                    }}>
                        <CloudUploadIcon sx={{ fontSize: 60, color: 'action.active', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>Arraste o XML/PDF ou clique para selecionar</Typography>
                        <Button
                            variant="contained"
                            component="label"
                            disabled={loading}
                        >
                            Selecionar Arquivo
                            <input
                                type="file"
                                hidden
                                accept=".xml,.pdf"
                                onChange={handleFileChange}
                            />
                        </Button>
                        {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
                    </Box>
                ) : (
                    <Box>
                        <Typography variant="subtitle1" fontWeight="700" color="primary" gutterBottom>
                            Dados da Nota Fiscal Nº {nfData.numero}
                        </Typography>

                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="caption" color="text.secondary">Emitente / Fornecedor</Typography>
                                <Typography variant="body2" fontWeight="600">{nfData.emitente.nome}</Typography>
                                <Typography variant="caption">{nfData.emitente.cnpj}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="caption" color="text.secondary">Endereço do Fornecedor</Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>{nfData.emitente.endereco}</Typography>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 3 }}>
                                <Typography variant="caption" color="text.secondary">Data Emissão</Typography>
                                <Typography variant="body2">{nfData.dataEmissao.split('-').reverse().join('/')}</Typography>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 3 }}>
                                <Typography variant="caption" color="text.secondary">Data Entrada/Saída</Typography>
                                <Typography variant="body2">{nfData.dataSaidaEntrada ? nfData.dataSaidaEntrada.split('-').reverse().join('/') : '-'}</Typography>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 3 }}>
                                <Typography variant="caption" color="text.secondary">Hora Saída</Typography>
                                <Typography variant="body2">{nfData.horaSaida || '-'}</Typography>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 3 }}>
                                <Typography variant="caption" color="text.secondary">Valor Total</Typography>
                                <Typography variant="body2" fontWeight="700">
                                    {nfData.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle2" fontWeight="700" sx={{ mb: 1 }}>Itens da Nota</Typography>
                        <Box sx={{ maxHeight: 150, overflow: 'auto', mb: 2, bgcolor: '#f5f5f5', p: 1, borderRadius: 1 }}>
                            {nfData.itens.length > 0 ? nfData.itens.map((item, idx) => (
                                <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, borderBottom: '1px solid #ddd', pb: 0.5 }}>
                                    <Box sx={{ maxWidth: '70%' }}>
                                        <Typography variant="caption" sx={{ fontWeight: 600 }}>{item.descricao}</Typography>
                                        <Typography variant="caption" display="block" color="text.secondary">
                                            Qtd: {item.quantidade} {item.unidade} | Unit: {item.valorUnitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </Typography>
                                    </Box>
                                    <Typography variant="caption" fontWeight="600">
                                        {item.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </Typography>
                                </Box>
                            )) : (
                                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                    Itens não disponíveis na extração simplificada de PDF.
                                </Typography>
                            )}
                        </Box>

                        {nfData.duplicatas.length > 0 && (
                            <>
                                <Typography variant="subtitle2" fontWeight="700" sx={{ mb: 1 }}>Financeiro / Parcelas</Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                                    {nfData.duplicatas.map((dup, idx) => (
                                        <Paper key={idx} variant="outlined" sx={{ p: 1, px: 2, borderRadius: 2, bgcolor: '#e8f5e9' }}>
                                            <Typography variant="caption" color="text.secondary" display="block">Vencimento</Typography>
                                            <Typography variant="body2" fontWeight="700">{dup.vencimento.split('-').reverse().join('/')}</Typography>
                                            <Typography variant="caption" fontWeight="600">{dup.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
                                        </Paper>
                                    ))}
                                </Box>
                            </>
                        )}

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle2" fontWeight="700" sx={{ mb: 2 }}>Configurações de Importação</Typography>

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Empresa / Unidade Destino"
                                    value={selectedEmpresa}
                                    onChange={(e) => setSelectedEmpresa(e.target.value)}
                                    size="small"
                                >
                                    {empresas.map(e => <MenuItem key={e.id} value={e.id}>{e.razaoSocial}</MenuItem>)}
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Categoria Financeira"
                                    value={selectedCategoria}
                                    onChange={(e) => setSelectedCategoria(e.target.value)}
                                    size="small"
                                >
                                    {categorias.map(c => <MenuItem key={c.id} value={c.id}>{c.codigo} - {c.descricao}</MenuItem>)}
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={enviarParaEstoque}
                                            onChange={(e) => setEnviarParaEstoque(e.target.checked)}
                                            color="primary"
                                            disabled={nfData.itens.length === 0}
                                        />
                                    }
                                    label="Deseja lançar os itens no estoque?"
                                />
                                {enviarParaEstoque && (
                                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Depósito para Entrada"
                                            value={selectedDeposito}
                                            onChange={(e) => setSelectedDeposito(e.target.value)}
                                            size="small"
                                        >
                                            {depositos.map(d => <MenuItem key={d.id} value={d.id}>{d.nome}</MenuItem>)}
                                        </TextField>
                                        <Alert severity="info" sx={{ py: 0 }}>
                                            Os itens serão adicionados como entrada de estoque no depósito selecionado.
                                        </Alert>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose} color="inherit">Cancelar</Button>
                <Button
                    onClick={handleImport}
                    variant="contained"
                    disabled={!nfData || loading || !selectedEmpresa || !selectedCategoria || (enviarParaEstoque && !selectedDeposito)}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                    sx={{
                        background: 'linear-gradient(135deg, #2C5530 0%, #1B3A1E 100%)',
                        fontWeight: 700
                    }}
                >
                    Confirmar Importação
                </Button>
            </DialogActions>
        </Dialog>
    );
}
