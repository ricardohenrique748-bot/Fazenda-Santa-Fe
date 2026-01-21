import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    Box, Typography, Paper, Button, Tabs, Tab,
    Table, TableBody, TableCell, TableHead, TableRow, Chip, IconButton
} from '@mui/material';
import { Add as AddIcon, AssignmentTurnedIn as DeliveryIcon, Edit as EditIcon } from '@mui/icons-material';
import { segurancaService } from '../../services/segurancaService';
import type { EPI, EntregaEPI } from '../../services/segurancaService';
import { format } from 'date-fns';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export default function EpiListPage() {
    const navigate = useNavigate();
    const [tab, setTab] = useState(0);
    const [epis, setEpis] = useState<EPI[]>([]);
    const [entregas, setEntregas] = useState<EntregaEPI[]>([]);

    useEffect(() => {
        loadData();
    }, [tab]);

    const loadData = async () => {
        if (tab === 0) {
            const data = await segurancaService.getEPIs();
            setEpis(data);
        } else {
            const data = await segurancaService.getEntregas();
            setEntregas(data);
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Segurança / EPIs</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/medicina/epis/novo')}>
                        Novo EPI
                    </Button>
                    <Button variant="contained" startIcon={<DeliveryIcon />} disabled>
                        Registrar Entrega
                    </Button>
                </Box>
            </Box>

            <Paper sx={{ width: '100%' }}>
                <Tabs value={tab} onChange={(_e, v) => setTab(v)}>
                    <Tab label="Catálogo de EPIs" />
                    <Tab label="Histórico de Entregas" />
                </Tabs>

                <CustomTabPanel value={tab} index={0}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>C.A.</TableCell>
                                <TableCell>Validade (Dias)</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {epis.map(e => (
                                <TableRow key={e.id}>
                                    <TableCell>{e.nome}</TableCell>
                                    <TableCell>{e.ca}</TableCell>
                                    <TableCell>{e.validadeDias}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={e.ativo ? 'Ativo' : 'Inativo'}
                                            color={e.ativo ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton size="small" onClick={() => navigate(`/medicina/epis/${e.id}`)}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CustomTabPanel>

                <CustomTabPanel value={tab} index={1}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Data</TableCell>
                                <TableCell>Funcionário</TableCell>
                                <TableCell>EPI</TableCell>
                                <TableCell>Qtde</TableCell>
                                <TableCell>Observação</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entregas.map(ent => (
                                <TableRow key={ent.id}>
                                    <TableCell>{format(new Date(ent.dataEntrega), 'dd/MM/yyyy')}</TableCell>
                                    <TableCell>{ent.funcionario?.nome}</TableCell>
                                    <TableCell>{ent.epi?.nome}</TableCell>
                                    <TableCell>{ent.quantidade}</TableCell>
                                    <TableCell>{ent.observacao}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CustomTabPanel>
            </Paper>
        </Box>
    );
}
