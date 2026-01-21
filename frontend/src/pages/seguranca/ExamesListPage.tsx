import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    Box, Typography, Paper, Button,
    Table, TableBody, TableCell, TableHead, TableRow, Chip, IconButton
} from '@mui/material';
import { Add as AddIcon, Warning as WarningIcon, Edit as EditIcon } from '@mui/icons-material';
import { segurancaService } from '../../services/segurancaService';
import type { ExameOcupacional } from '../../services/segurancaService';
import { format, isBefore, addDays } from 'date-fns';

export default function ExamesListPage() {
    const navigate = useNavigate();
    const [exames, setExames] = useState<ExameOcupacional[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await segurancaService.getExames();
            setExames(data);
        } finally {
            setLoading(false);
        }
    };

    const getStatusChip = (vencimento: string) => {
        const dataVenc = new Date(vencimento);
        const hoje = new Date();
        const emBreve = addDays(hoje, 30);

        if (isBefore(dataVenc, hoje)) {
            return <Chip label="VENCIDO" color="error" size="small" icon={<WarningIcon />} />;
        }
        if (isBefore(dataVenc, emBreve)) {
            return <Chip label="VENCE EM BREVE" color="warning" size="small" />;
        }
        return <Chip label="EM DIA" color="success" size="small" />;
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Medicina / Exames ASO</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/medicina/exames/novo')}>
                    Novo Exame
                </Button>
            </Box>

            <Paper sx={{ p: 2 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Funcionário</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Realização</TableCell>
                            <TableCell>Vencimento</TableCell>
                            <TableCell>Resultado</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exames.map(ex => (
                            <TableRow key={ex.id}>
                                <TableCell>{ex.funcionario?.nome}</TableCell>
                                <TableCell>{ex.tipo}</TableCell>
                                <TableCell>{format(new Date(ex.dataRealizacao), 'dd/MM/yyyy')}</TableCell>
                                <TableCell>{format(new Date(ex.dataVencimento), 'dd/MM/yyyy')}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={ex.resultado}
                                        color={ex.resultado === 'APTO' ? 'success' : 'error'}
                                        variant="outlined"
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{getStatusChip(ex.dataVencimento)}</TableCell>
                                <TableCell align="center">
                                    <IconButton size="small" onClick={() => navigate(`/medicina/exames/${ex.id}`)}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {exames.length === 0 && !loading && (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                    Nenhum exame registrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
}
