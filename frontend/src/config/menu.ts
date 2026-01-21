import type { SvgIconComponent } from "@mui/icons-material";
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export interface AppMenuItem {
    label: string;
    path?: string;
    icon?: SvgIconComponent;
    children?: AppMenuItem[];
}

export interface ModuleMenu {
    id: string;
    label: string;
    icon: SvgIconComponent;
    items: AppMenuItem[];
}

export const APP_MENU: ModuleMenu[] = [
    {
        id: 'cadastros',
        label: 'Cadastros',
        icon: BusinessIcon,
        items: [
            { label: 'Empresas', path: '/cadastros/empresas' },
            { label: 'Fazendas / Estabelecimentos', path: '/cadastros/fazendas' },
            { label: 'Unidades de Negócio', path: '/cadastros/unidades' },
            { label: 'Localizações', path: '/cadastros/localizacoes' },
            { label: 'Municípios', path: '/cadastros/municipios' },
            { label: 'Culturas / Setores', path: '/cadastros/culturas' },
            { label: 'Anos Agrícolas', path: '/cadastros/anos-agricolas' },
            { label: 'Atividades', path: '/cadastros/atividades' },
            { label: 'Usuários e Perfis', path: '/cadastros/usuarios' },
        ]
    },
    {
        id: 'rh',
        label: 'Recursos Humanos',
        icon: PeopleIcon,
        items: [
            { label: 'Funcionários', path: '/rh/funcionarios' },
            { label: 'Apontamentos de Labor', path: '/rh/apontamentos' },
            { label: 'Relatórios', path: '/rh/relatorios' }
        ]
    },
    {
        id: 'mecanizacao',
        label: 'Mecanização',
        icon: AgricultureIcon,
        items: [
            { label: 'Frota e Equipamentos', path: '/mecanizacao/veiculos' },
            { label: 'Grupo de Equipamentos', path: '/mecanizacao/grupos' },
            { label: 'Histórico de Manutenções', path: '/mecanizacao/manutencoes' },
            { label: 'Relatórios', path: '/mecanizacao/relatorios' }
        ]
    },
    {
        id: 'estoque',
        label: 'Estoque',
        icon: InventoryIcon,
        items: [
            {
                label: 'Cadastros',
                children: [
                    { label: 'Depósitos', path: '/cadastros/depositos' },
                    { label: 'Grupos e Subgrupos', path: '/estoque/grupos' },
                    { label: 'Produtos e Materiais', path: '/estoque/produtos' },
                    { label: 'Fabricantes', path: '/estoque/fabricantes' },
                ]
            },
            {
                label: 'Movimentos',
                children: [
                    { label: 'Movimentações de Estoque', path: '/estoque/movimentacoes' },
                    { label: 'Saldos em Depósitos', path: '/estoque/saldos' },
                    { label: 'Transferências', path: '/estoque/transferencias' },
                    { label: 'Conferência de Estoque', path: '/estoque/conferencia' },
                ]
            }
        ]
    },
    {
        id: 'financeiro',
        label: 'Financeiro',
        icon: AttachMoneyIcon,
        items: [
            { label: 'Plano de Contas', path: '/financeiro/plano-contas' },
            { label: 'Contas a Pagar/Receber', path: '/financeiro/contas' },
            { label: 'Fluxo de Caixa', path: '/financeiro/fluxo-caixa' },
        ]
    },
    {
        id: 'planejamento',
        label: 'Gestão/Plan.',
        icon: BarChartIcon,
        items: [
            { label: 'Gestão de Safras', path: '/planejamento/safras' },
            { label: 'Programa de Insumos', path: '/planejamento' },
        ]
    },
    {
        id: 'medicina',
        label: 'Med. e Seg.',
        icon: HealthAndSafetyIcon,
        items: [
            { label: 'EPI', path: '/medicina/epis' },
            { label: 'Exames Médicos', path: '/medicina/exames' },
        ]
    },
    {
        id: 'comercial',
        label: 'Comercial',
        icon: ShoppingCartIcon,
        items: [
            { label: 'Clientes', path: '/comercial/clientes' },
            { label: 'Pedidos de Venda', path: '/comercial/pedidos-venda' },
            { label: 'Pedidos de Compra', path: '/comercial/pedidos' },
            { label: 'Contratos Comerciais', path: '/comercial/contratos' },
        ]
    },
    {
        id: 'relatorios',
        label: 'Relatórios',
        icon: BarChartIcon,
        items: [
            { label: 'Relatórios por Módulo', path: '/relatorios/geral' },
        ]
    }
];
