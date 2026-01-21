import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import MainLayout from './components/layout/MainLayout';
import ModulePlaceholder from './components/ui/ModulePlaceholder';
import EmpresasListPage from './pages/cadastros/EmpresasListPage';
import EmpresaFormPage from './pages/cadastros/EmpresaFormPage';
import FazendasListPage from './pages/cadastros/FazendasListPage';
import FazendaFormPage from './pages/cadastros/FazendaFormPage';
import UsuariosListPage from './pages/cadastros/UsuariosListPage';
import UsuarioFormPage from './pages/cadastros/UsuarioFormPage';
import UnidadesNegocioListPage from './pages/cadastros/UnidadesNegocioListPage';
import UnidadeNegocioFormPage from './pages/cadastros/UnidadeNegocioFormPage';
import LocalizacoesListPage from './pages/cadastros/LocalizacoesListPage';
import LocalizacaoFormPage from './pages/cadastros/LocalizacaoFormPage';
import DepositosListPage from './pages/cadastros/DepositosListPage';
import DepositoFormPage from './pages/cadastros/DepositoFormPage';
import MunicipiosListPage from './pages/cadastros/MunicipiosListPage';
import MunicipioFormPage from './pages/cadastros/MunicipioFormPage';
import CulturasListPage from './pages/cadastros/CulturasListPage';
import CulturaFormPage from './pages/cadastros/CulturaFormPage';
import AtividadesListPage from './pages/cadastros/AtividadesListPage';
import AtividadeFormPage from './pages/cadastros/AtividadeFormPage';
import FuncionariosListPage from './pages/rh/FuncionariosListPage';
import FuncionarioFormPage from './pages/rh/FuncionarioFormPage';
import ApontamentosListPage from './pages/rh/ApontamentosListPage';
import ApontamentoFormPage from './pages/rh/ApontamentoFormPage';
import RelatoriosRHPage from './pages/rh/RelatoriosRHPage';
import VeiculosListPage from './pages/mecanizacao/VeiculosListPage';
import VeiculoFormPage from './pages/mecanizacao/VeiculoFormPage';
import ManutencoesListPage from './pages/mecanizacao/ManutencoesListPage';
import ManutencaoFormPage from './pages/mecanizacao/ManutencaoFormPage';
import GruposEquipamentoListPage from './pages/mecanizacao/GruposEquipamentoListPage';
import GrupoEquipamentoFormPage from './pages/mecanizacao/GrupoEquipamentoFormPage';
import RelatoriosMecanizacaoPage from './pages/mecanizacao/RelatoriosMecanizacaoPage';
import ProdutosListPage from './pages/estoque/ProdutosListPage';
import ProdutoFormPage from './pages/estoque/ProdutoFormPage';
import MovimentacaoFormPage from './pages/estoque/MovimentacaoFormPage';
import SaldosPorDepositoPage from './pages/estoque/SaldosPorDepositoPage';
import TransferenciaFormPage from './pages/estoque/TransferenciaFormPage';
import ConferenciaEstoquePage from './pages/estoque/ConferenciaEstoquePage';
import GruposListPage from './pages/estoque/GruposListPage';
import FabricantesListPage from './pages/estoque/FabricantesListPage';
import ContasListPage from './pages/financeiro/ContasListPage';
import LancamentoFormPage from './pages/financeiro/LancamentoFormPage';
import FluxoCaixaDashboard from './pages/financeiro/FluxoCaixaDashboard';
import PlanoContasPage from './pages/financeiro/PlanoContasPage';
import PlanejamentoFormPage from './pages/planejamento/PlanejamentoFormPage';
import SafraListPage from './pages/planejamento/SafraListPage';
import SafraFormPage from './pages/planejamento/SafraFormPage';
import PlanejamentoListPage from './pages/planejamento/PlanejamentoListPage';
import EpiListPage from './pages/seguranca/EpiListPage';
import EpiFormPage from './pages/seguranca/EpiFormPage';
import ExamesListPage from './pages/seguranca/ExamesListPage';
import ExameFormPage from './pages/seguranca/ExameFormPage';
import ClientesListPage from './pages/comercial/ClientesListPage';
import ClientesFormPage from './pages/comercial/ClientesFormPage';
import PedidosVendaListPage from './pages/comercial/PedidosVendaListPage';
import PedidosVendaFormPage from './pages/comercial/PedidosVendaFormPage';
import PedidosListPage from './pages/compras/PedidosListPage';
import PedidosCompraFormPage from './pages/compras/PedidosCompraFormPage';
import ContratosListPage from './pages/compras/ContratosListPage';
import DashboardGeralPage from './pages/relatorios/DashboardGeralPage';
import { Box, Typography } from '@mui/material';

import dashboardBg from './assets/dashboard-bg-refined.png';

function Dashboard() {
  return (
    <Box sx={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 65px)',
      textAlign: 'center',
      margin: { xs: -2, md: -4 },
      width: { xs: 'calc(100% + 32px)', md: 'calc(100% + 64px)' },
      backgroundImage: `url(${dashboardBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Even lighter overlay for clarity
        zIndex: 1
      }
    }}>
      <Box sx={{
        position: 'relative',
        zIndex: 2,
        p: { xs: 4, md: 8 },
        borderRadius: 6,
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        maxWidth: 850,
        mx: 2
      }}>
        <Typography variant="h1" gutterBottom sx={{
          color: '#fff',
          fontWeight: 900,
          fontSize: { xs: '2.5rem', md: '4.5rem' },
          textShadow: '0px 10px 30px rgba(0,0,0,0.3)',
          letterSpacing: '-0.02em',
          mb: 3
        }}>
          Fazenda Santa Fé
        </Typography>
        <Typography variant="h5" sx={{
          color: 'rgba(255,255,255,0.95)',
          maxWidth: 650,
          mx: 'auto',
          fontWeight: 400,
          lineHeight: 1.7,
          fontSize: { xs: '1rem', md: '1.4rem' },
          textShadow: '0px 2px 4px rgba(0,0,0,0.3)'
        }}>
          Plataforma integrada de gestão agrícola. Controle frotas, finanças, RH e colheita em um só lugar com precisão e eficiência.
        </Typography>
      </Box>
    </Box>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cadastros/empresas" element={<EmpresasListPage />} />
          <Route path="/cadastros/empresas/novo" element={<EmpresaFormPage />} />
          <Route path="/cadastros/empresas/:id" element={<EmpresaFormPage />} />

          <Route path="/cadastros/fazendas" element={<FazendasListPage />} />
          <Route path="/cadastros/fazendas/novo" element={<FazendaFormPage />} />
          <Route path="/cadastros/fazendas/:id" element={<FazendaFormPage />} />

          <Route path="/cadastros/usuarios" element={<UsuariosListPage />} />
          <Route path="/cadastros/usuarios/novo" element={<UsuarioFormPage />} />
          <Route path="/cadastros/usuarios/:id" element={<UsuarioFormPage />} />

          <Route path="/cadastros/unidades" element={<UnidadesNegocioListPage />} />
          <Route path="/cadastros/unidades/novo" element={<UnidadeNegocioFormPage />} />
          <Route path="/cadastros/unidades/:id" element={<UnidadeNegocioFormPage />} />

          <Route path="/cadastros/localizacoes" element={<LocalizacoesListPage />} />
          <Route path="/cadastros/localizacoes/novo" element={<LocalizacaoFormPage />} />
          <Route path="/cadastros/localizacoes/:id" element={<LocalizacaoFormPage />} />

          <Route path="/cadastros/depositos" element={<DepositosListPage />} />
          <Route path="/cadastros/depositos/novo" element={<DepositoFormPage />} />
          <Route path="/cadastros/depositos/:id" element={<DepositoFormPage />} />

          <Route path="/cadastros/municipios" element={<MunicipiosListPage />} />
          <Route path="/cadastros/municipios/novo" element={<MunicipioFormPage />} />
          <Route path="/cadastros/municipios/:id" element={<MunicipioFormPage />} />

          <Route path="/cadastros/culturas" element={<CulturasListPage />} />
          <Route path="/cadastros/culturas/novo" element={<CulturaFormPage />} />
          <Route path="/cadastros/culturas/:id" element={<CulturaFormPage />} />

          <Route path="/cadastros/anos-agricolas" element={<SafraListPage />} />

          <Route path="/cadastros/atividades" element={<AtividadesListPage />} />
          <Route path="/cadastros/atividades/novo" element={<AtividadeFormPage />} />
          <Route path="/cadastros/atividades/:id" element={<AtividadeFormPage />} />

          <Route path="/rh/funcionarios" element={<FuncionariosListPage />} />
          <Route path="/rh/funcionarios/novo" element={<FuncionarioFormPage />} />
          <Route path="/rh/funcionarios/:id" element={<FuncionarioFormPage />} />

          <Route path="/rh/apontamentos" element={<ApontamentosListPage />} />
          <Route path="/rh/apontamentos/novo" element={<ApontamentoFormPage />} />
          <Route path="/rh/apontamentos/:id" element={<ApontamentoFormPage />} />
          <Route path="/rh/relatorios" element={<RelatoriosRHPage />} />

          <Route path="/mecanizacao/veiculos" element={<VeiculosListPage />} />
          <Route path="/mecanizacao/veiculos/novo" element={<VeiculoFormPage />} />
          <Route path="/mecanizacao/veiculos/:id" element={<VeiculoFormPage />} />

          <Route path="/mecanizacao/manutencoes" element={<ManutencoesListPage />} />
          <Route path="/mecanizacao/manutencoes/novo" element={<ManutencaoFormPage />} />
          <Route path="/mecanizacao/manutencoes/:id" element={<ManutencaoFormPage />} />

          <Route path="/mecanizacao/grupos" element={<GruposEquipamentoListPage />} />
          <Route path="/mecanizacao/grupos/novo" element={<GrupoEquipamentoFormPage />} />
          <Route path="/mecanizacao/grupos/:id" element={<GrupoEquipamentoFormPage />} />

          <Route path="/mecanizacao/relatorios" element={<RelatoriosMecanizacaoPage />} />

          <Route path="/estoque/produtos" element={<ProdutosListPage />} />
          <Route path="/estoque/produtos/novo" element={<ProdutoFormPage />} />
          <Route path="/estoque/produtos/:id" element={<ProdutoFormPage />} />
          <Route path="/estoque/movimentacoes" element={<MovimentacaoFormPage />} />
          <Route path="/estoque/saldos" element={<SaldosPorDepositoPage />} />
          <Route path="/estoque/transferencias" element={<TransferenciaFormPage />} />
          <Route path="/estoque/conferencia" element={<ConferenciaEstoquePage />} />
          <Route path="/estoque/grupos" element={<GruposListPage />} />
          <Route path="/estoque/fabricantes" element={<FabricantesListPage />} />

          <Route path="/financeiro/plano-contas" element={<PlanoContasPage />} />
          <Route path="/financeiro/contas" element={<ContasListPage />} />
          <Route path="/financeiro/lancamentos/novo" element={<LancamentoFormPage />} />
          <Route path="/financeiro/fluxo-caixa" element={<FluxoCaixaDashboard />} />

          <Route path="/planejamento/safras" element={<SafraListPage />} />
          <Route path="/planejamento/safras/novo" element={<SafraFormPage />} />
          <Route path="/planejamento/safras/:id" element={<SafraFormPage />} />
          <Route path="/planejamento" element={<PlanejamentoListPage />} />
          <Route path="/planejamento/novo" element={<PlanejamentoFormPage />} />

          <Route path="/medicina/epis" element={<EpiListPage />} />
          <Route path="/medicina/epis/novo" element={<EpiFormPage />} />
          <Route path="/medicina/epis/:id" element={<EpiFormPage />} />
          <Route path="/medicina/exames" element={<ExamesListPage />} />
          <Route path="/medicina/exames/novo" element={<ExameFormPage />} />
          <Route path="/medicina/exames/:id" element={<ExameFormPage />} />

          <Route path="/comercial/clientes" element={<ClientesListPage />} />
          <Route path="/comercial/clientes/novo" element={<ClientesFormPage />} />
          <Route path="/comercial/clientes/:id" element={<ClientesFormPage />} />
          <Route path="/comercial/pedidos-venda" element={<PedidosVendaListPage />} />
          <Route path="/comercial/pedidos-venda/novo" element={<PedidosVendaFormPage />} />
          <Route path="/comercial/pedidos-venda/:id" element={<PedidosVendaFormPage />} />

          <Route path="/comercial/pedidos" element={<PedidosListPage />} />
          <Route path="/comercial/pedidos/novo" element={<PedidosCompraFormPage />} />
          <Route path="/comercial/pedidos/:id" element={<PedidosCompraFormPage />} />
          <Route path="/comercial/contratos" element={<ContratosListPage />} />

          {/* Fallback for other Cadastros routes */}
          <Route path="/cadastros/*" element={<ModulePlaceholder title="Cadastros" />} />
          <Route path="/rh/*" element={<ModulePlaceholder title="Recursos Humanos" />} />
          <Route path="/mecanizacao/*" element={<ModulePlaceholder title="Mecanização" />} />
          <Route path="/estoque/*" element={<ModulePlaceholder title="Estoque" />} />
          <Route path="/financeiro/*" element={<ModulePlaceholder title="Financeiro" />} />
          <Route path="/planejamento/*" element={<ModulePlaceholder title="Gestão / Planejamento" />} />
          <Route path="/medicina/*" element={<ModulePlaceholder title="Medicina e Segurança" />} />
          <Route path="/comercial/*" element={<ModulePlaceholder title="Comercial" />} />
          <Route path="/relatorios/dashboard" element={<DashboardGeralPage />} />
          <Route path="/relatorios/geral" element={<DashboardGeralPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
