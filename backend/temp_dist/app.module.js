"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var auth_module_1 = require("./auth/auth.module");
var users_module_1 = require("./users/users.module");
var prisma_module_1 = require("./prisma/prisma.module");
var empresas_module_1 = require("./empresas/empresas.module");
var fazendas_module_1 = require("./fazendas/fazendas.module");
var funcionarios_module_1 = require("./funcionarios/funcionarios.module");
var apontamentos_module_1 = require("./apontamentos/apontamentos.module");
var veiculos_module_1 = require("./veiculos/veiculos.module");
var manutencoes_module_1 = require("./manutencoes/manutencoes.module");
var depositos_module_1 = require("./depositos/depositos.module");
var produtos_module_1 = require("./produtos/produtos.module");
var estoque_module_1 = require("./estoque/estoque.module");
var financeiro_module_1 = require("./financeiro/financeiro.module");
var planejamento_module_1 = require("./planejamento/planejamento.module");
var seguranca_module_1 = require("./seguranca/seguranca.module");
var compras_module_1 = require("./compras/compras.module");
var relatorios_module_1 = require("./relatorios/relatorios.module");
var unidades_negocio_module_1 = require("./cadastros/unidades-negocio.module");
var localizacoes_module_1 = require("./cadastros/localizacoes.module");
var municipios_module_1 = require("./cadastros/municipios.module");
var culturas_module_1 = require("./cadastros/culturas.module");
var atividades_module_1 = require("./cadastros/atividades.module");
var grupos_equipamento_module_1 = require("./grupos-equipamento/grupos-equipamento.module");
var grupos_module_1 = require("./grupos/grupos.module");
var fabricantes_module_1 = require("./fabricantes/fabricantes.module");
var clientes_module_1 = require("./comercial/clientes/clientes.module");
var pedidos_venda_module_1 = require("./comercial/pedidos/pedidos-venda.module");
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
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
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
