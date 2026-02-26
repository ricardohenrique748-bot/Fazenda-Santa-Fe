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
import ConciliacaoBancariaPage from './pages/financeiro/ConciliacaoBancariaPage';
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


function Dashboard() {
  return (
    <Box sx={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 80px)', // Compensa a altura do header
      textAlign: 'center',
      padding: 4,
      // Faz o fundo "sangrar" para as bordas, anulando o padding do pai
      margin: { xs: -2, md: -4 },
      width: { xs: 'calc(100% + 32px)', md: 'calc(100% + 64px)' },
      background: 'linear-gradient(135deg, #F9F9F7 0%, #E8EBE0 100%)',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        maxWidth: 800,
        zIndex: 2
      }}>
        <Box>
          <Typography variant="h1" sx={{
            color: '#1B3A1E',
            fontWeight: 900,
            fontSize: { xs: '4rem', md: '7rem' },
            mb: 0.5,
            textTransform: 'uppercase',
            letterSpacing: '-2px',
            lineHeight: 1
          }}>
            AgroSys
          </Typography>

          <Typography variant="h4" sx={{
            color: '#2C5530',
            fontWeight: 700,
            mb: 4,
            letterSpacing: '1px'
          }}>
            Gestão Agrícola Inteligente
          </Typography>

          <Typography variant="body1" sx={{
            color: '#546E7A',
            maxWidth: 600,
            mx: 'auto',
            fontWeight: 500,
            fontSize: { xs: '1rem', md: '1.2rem' },
            lineHeight: 1.6
          }}>
            Plataforma única para controle de frotas, finanças, colheita e RH.
            Tecnologia de precisão para resultados máximos no campo.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
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
          <Route path="/financeiro/conciliacao-bancaria" element={<ConciliacaoBancariaPage />} />

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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
