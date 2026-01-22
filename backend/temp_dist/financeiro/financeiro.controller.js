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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceiroController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var FinanceiroController = function () {
    var _classDecorators = [(0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Controller)('financeiro')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createPlanoContas_decorators;
    var _findAllPlanoContas_decorators;
    var _updatePlanoContas_decorators;
    var _removePlanoContas_decorators;
    var _createLancamento_decorators;
    var _findAllLancamentos_decorators;
    var _baixar_decorators;
    var _getFluxoCaixa_decorators;
    var FinanceiroController = _classThis = /** @class */ (function () {
        function FinanceiroController_1(financeiroService) {
            this.financeiroService = (__runInitializers(this, _instanceExtraInitializers), financeiroService);
        }
        FinanceiroController_1.prototype.createPlanoContas = function (req, data) {
            return this.financeiroService.createPlanoContas(__assign(__assign({}, data), { empresa: { connect: { id: req.user.empresaId } } }));
        };
        FinanceiroController_1.prototype.findAllPlanoContas = function (req) {
            return this.financeiroService.findAllPlanoContas(req.user.empresaId);
        };
        FinanceiroController_1.prototype.updatePlanoContas = function (req, id, data) {
            return this.financeiroService.updatePlanoContas(id, req.user.empresaId, data);
        };
        FinanceiroController_1.prototype.removePlanoContas = function (req, id) {
            return this.financeiroService.removePlanoContas(id, req.user.empresaId);
        };
        FinanceiroController_1.prototype.createLancamento = function (data) {
            return this.financeiroService.createLancamento(data);
        };
        FinanceiroController_1.prototype.findAllLancamentos = function (filters) {
            return this.financeiroService.findAllLancamentos(filters);
        };
        FinanceiroController_1.prototype.baixar = function (id, dataPagamento) {
            return this.financeiroService.baixarLancamento(id, dataPagamento);
        };
        FinanceiroController_1.prototype.getFluxoCaixa = function (req, startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.financeiroService.getFluxoCaixa(req.user.empresaId, startDate, endDate)];
                });
            });
        };
        return FinanceiroController_1;
    }());
    __setFunctionName(_classThis, "FinanceiroController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createPlanoContas_decorators = [(0, common_1.Post)('plano-contas')];
        _findAllPlanoContas_decorators = [(0, common_1.Get)('plano-contas')];
        _updatePlanoContas_decorators = [(0, common_1.Patch)('plano-contas/:id')];
        _removePlanoContas_decorators = [(0, common_1.Delete)('plano-contas/:id')];
        _createLancamento_decorators = [(0, common_1.Post)('lancamentos')];
        _findAllLancamentos_decorators = [(0, common_1.Get)('lancamentos')];
        _baixar_decorators = [(0, common_1.Patch)('lancamentos/:id/baixar')];
        _getFluxoCaixa_decorators = [(0, common_1.Get)('fluxo-caixa')];
        __esDecorate(_classThis, null, _createPlanoContas_decorators, { kind: "method", name: "createPlanoContas", static: false, private: false, access: { has: function (obj) { return "createPlanoContas" in obj; }, get: function (obj) { return obj.createPlanoContas; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAllPlanoContas_decorators, { kind: "method", name: "findAllPlanoContas", static: false, private: false, access: { has: function (obj) { return "findAllPlanoContas" in obj; }, get: function (obj) { return obj.findAllPlanoContas; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updatePlanoContas_decorators, { kind: "method", name: "updatePlanoContas", static: false, private: false, access: { has: function (obj) { return "updatePlanoContas" in obj; }, get: function (obj) { return obj.updatePlanoContas; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removePlanoContas_decorators, { kind: "method", name: "removePlanoContas", static: false, private: false, access: { has: function (obj) { return "removePlanoContas" in obj; }, get: function (obj) { return obj.removePlanoContas; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createLancamento_decorators, { kind: "method", name: "createLancamento", static: false, private: false, access: { has: function (obj) { return "createLancamento" in obj; }, get: function (obj) { return obj.createLancamento; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAllLancamentos_decorators, { kind: "method", name: "findAllLancamentos", static: false, private: false, access: { has: function (obj) { return "findAllLancamentos" in obj; }, get: function (obj) { return obj.findAllLancamentos; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _baixar_decorators, { kind: "method", name: "baixar", static: false, private: false, access: { has: function (obj) { return "baixar" in obj; }, get: function (obj) { return obj.baixar; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getFluxoCaixa_decorators, { kind: "method", name: "getFluxoCaixa", static: false, private: false, access: { has: function (obj) { return "getFluxoCaixa" in obj; }, get: function (obj) { return obj.getFluxoCaixa; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FinanceiroController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FinanceiroController = _classThis;
}();
exports.FinanceiroController = FinanceiroController;
