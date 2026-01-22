"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const prisma_module_1 = require("./prisma/prisma.module");
const empresas_module_1 = require("./empresas/empresas.module");
const fazendas_module_1 = require("./fazendas/fazendas.module");
const funcionarios_module_1 = require("./funcionarios/funcionarios.module");
const apontamentos_module_1 = require("./apontamentos/apontamentos.module");
const veiculos_module_1 = require("./veiculos/veiculos.module");
const manutencoes_module_1 = require("./manutencoes/manutencoes.module");
const depositos_module_1 = require("./depositos/depositos.module");
const produtos_module_1 = require("./produtos/produtos.module");
const estoque_module_1 = require("./estoque/estoque.module");
const financeiro_module_1 = require("./financeiro/financeiro.module");
const planejamento_module_1 = require("./planejamento/planejamento.module");
const seguranca_module_1 = require("./seguranca/seguranca.module");
const compras_module_1 = require("./compras/compras.module");
const relatorios_module_1 = require("./relatorios/relatorios.module");
const unidades_negocio_module_1 = require("./cadastros/unidades-negocio.module");
const localizacoes_module_1 = require("./cadastros/localizacoes.module");
const municipios_module_1 = require("./cadastros/municipios.module");
const culturas_module_1 = require("./cadastros/culturas.module");
const atividades_module_1 = require("./cadastros/atividades.module");
const grupos_equipamento_module_1 = require("./grupos-equipamento/grupos-equipamento.module");
const grupos_module_1 = require("./grupos/grupos.module");
const fabricantes_module_1 = require("./fabricantes/fabricantes.module");
const clientes_module_1 = require("./comercial/clientes/clientes.module");
const pedidos_venda_module_1 = require("./comercial/pedidos/pedidos-venda.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            empresas_module_1.EmpresasModule,
            fazendas_module_1.FazendasModule,
            funcionarios_module_1.FuncionariosModule,
            apontamentos_module_1.ApontamentosModule,
            veiculos_module_1.VeiculosModule,
            manutencoes_module_1.ManutencoesModule,
            depositos_module_1.DepositosModule,
            produtos_module_1.ProdutosModule,
            estoque_module_1.EstoqueModule,
            financeiro_module_1.FinanceiroModule,
            planejamento_module_1.PlanejamentoModule,
            seguranca_module_1.SegurancaModule,
            compras_module_1.ComprasModule,
            relatorios_module_1.RelatoriosModule,
            unidades_negocio_module_1.UnidadesNegocioModule,
            localizacoes_module_1.LocalizacoesModule,
            municipios_module_1.MunicipiosModule,
            culturas_module_1.CulturasModule,
            atividades_module_1.AtividadesModule,
            grupos_equipamento_module_1.GruposEquipamentoModule,
            grupos_module_1.GruposModule,
            fabricantes_module_1.FabricantesModule,
            clientes_module_1.ClientesModule,
            pedidos_venda_module_1.PedidosVendaModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map