"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComprasController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var ComprasController = function () {
    var _classDecorators = [(0, common_1.Controller)('compras'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getFornecedores_decorators;
    var _createFornecedor_decorators;
    var _getPedidos_decorators;
    var _createPedido_decorators;
    var _getContratos_decorators;
    var _createContrato_decorators;
    var ComprasController = _classThis = /** @class */ (function () {
        function ComprasController_1(comprasService) {
            this.comprasService = (__runInitializers(this, _instanceExtraInitializers), comprasService);
        }
        ComprasController_1.prototype.getFornecedores = function (req) {
            return this.comprasService.getFornecedores(req.user.empresaId);
        };
        ComprasController_1.prototype.createFornecedor = function (data, req) {
            return this.comprasService.createFornecedor(data, req.user.empresaId);
        };
        ComprasController_1.prototype.getPedidos = function (req) {
            return this.comprasService.getPedidos(req.user.empresaId);
        };
        ComprasController_1.prototype.createPedido = function (data, req) {
            return this.comprasService.createPedido(data, req.user.empresaId);
        };
        ComprasController_1.prototype.getContratos = function (req) {
            // Leaving Contratos unscoped for now if not requested, but better safe.
            // Assuming Contracts also need check? Schema: ContratoComercial has NO empresaId in snippet I saw?
            // Let's check schema snippet again... 
            // Line 347: model ContratoComercial...
            // Line 350: clienteId...
            // It has clienteRel -> Cliente -> Empresa.
            // So it is scoped. I'll scope it too.
            return this.comprasService.getContratos(req.user.empresaId);
        };
        ComprasController_1.prototype.createContrato = function (data, req) {
            return this.comprasService.createContrato(data); // Create might need handling.
        };
        return ComprasController_1;
    }());
    __setFunctionName(_classThis, "ComprasController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getFornecedores_decorators = [(0, common_1.Get)('fornecedores')];
        _createFornecedor_decorators = [(0, common_1.Post)('fornecedores')];
        _getPedidos_decorators = [(0, common_1.Get)('pedidos')];
        _createPedido_decorators = [(0, common_1.Post)('pedidos')];
        _getContratos_decorators = [(0, common_1.Get)('contratos')];
        _createContrato_decorators = [(0, common_1.Post)('contratos')];
        __esDecorate(_classThis, null, _getFornecedores_decorators, { kind: "method", name: "getFornecedores", static: false, private: false, access: { has: function (obj) { return "getFornecedores" in obj; }, get: function (obj) { return obj.getFornecedores; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createFornecedor_decorators, { kind: "method", name: "createFornecedor", static: false, private: false, access: { has: function (obj) { return "createFornecedor" in obj; }, get: function (obj) { return obj.createFornecedor; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPedidos_decorators, { kind: "method", name: "getPedidos", static: false, private: false, access: { has: function (obj) { return "getPedidos" in obj; }, get: function (obj) { return obj.getPedidos; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createPedido_decorators, { kind: "method", name: "createPedido", static: false, private: false, access: { has: function (obj) { return "createPedido" in obj; }, get: function (obj) { return obj.createPedido; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getContratos_decorators, { kind: "method", name: "getContratos", static: false, private: false, access: { has: function (obj) { return "getContratos" in obj; }, get: function (obj) { return obj.getContratos; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createContrato_decorators, { kind: "method", name: "createContrato", static: false, private: false, access: { has: function (obj) { return "createContrato" in obj; }, get: function (obj) { return obj.createContrato; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComprasController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComprasController = _classThis;
}();
exports.ComprasController = ComprasController;
