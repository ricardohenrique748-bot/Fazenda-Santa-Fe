"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.EstoqueController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var EstoqueController = function () {
    var _classDecorators = [(0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Controller)('estoque')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _transferir_decorators;
    var _conferencia_decorators;
    var _findAllMovimentacoes_decorators;
    var _getSaldos_decorators;
    var EstoqueController = _classThis = /** @class */ (function () {
        function EstoqueController_1(estoqueService) {
            this.estoqueService = (__runInitializers(this, _instanceExtraInitializers), estoqueService);
        }
        EstoqueController_1.prototype.create = function (data, req) {
            // Pegar o usuário logado do JWT
            var usuarioId = req.user.userId;
            var empresaId = req.user.empresaId;
            return this.estoqueService.createMovimentacao(__assign(__assign({}, data), { usuarioId: usuarioId, empresaId: empresaId }));
        };
        EstoqueController_1.prototype.transferir = function (data, req) {
            var usuarioId = req.user.userId;
            var empresaId = req.user.empresaId;
            return this.estoqueService.transferirProduto(__assign(__assign({}, data), { usuarioId: usuarioId, empresaId: empresaId }));
        };
        EstoqueController_1.prototype.conferencia = function (data, req) {
            var usuarioId = req.user.userId;
            var empresaId = req.user.empresaId;
            return this.estoqueService.processarConferencia(__assign(__assign({}, data), { usuarioId: usuarioId, empresaId: empresaId }));
        };
        EstoqueController_1.prototype.findAllMovimentacoes = function (req) {
            return this.estoqueService.findAllMovimentacoes(req.user.empresaId);
        };
        EstoqueController_1.prototype.getSaldos = function (req) {
            return this.estoqueService.getSaldos(req.user.empresaId);
        };
        return EstoqueController_1;
    }());
    __setFunctionName(_classThis, "EstoqueController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)('movimentacoes')];
        _transferir_decorators = [(0, common_1.Post)('transferencias')];
        _conferencia_decorators = [(0, common_1.Post)('conferencia')];
        _findAllMovimentacoes_decorators = [(0, common_1.Get)('movimentacoes')];
        _getSaldos_decorators = [(0, common_1.Get)('saldos')];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _transferir_decorators, { kind: "method", name: "transferir", static: false, private: false, access: { has: function (obj) { return "transferir" in obj; }, get: function (obj) { return obj.transferir; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _conferencia_decorators, { kind: "method", name: "conferencia", static: false, private: false, access: { has: function (obj) { return "conferencia" in obj; }, get: function (obj) { return obj.conferencia; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAllMovimentacoes_decorators, { kind: "method", name: "findAllMovimentacoes", static: false, private: false, access: { has: function (obj) { return "findAllMovimentacoes" in obj; }, get: function (obj) { return obj.findAllMovimentacoes; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getSaldos_decorators, { kind: "method", name: "getSaldos", static: false, private: false, access: { has: function (obj) { return "getSaldos" in obj; }, get: function (obj) { return obj.getSaldos; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EstoqueController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EstoqueController = _classThis;
}();
exports.EstoqueController = EstoqueController;
