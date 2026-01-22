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
exports.SegurancaController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var SegurancaController = function () {
    var _classDecorators = [(0, common_1.Controller)('seguranca'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getEPIs_decorators;
    var _createEPI_decorators;
    var _getEPIById_decorators;
    var _updateEPI_decorators;
    var _deleteEPI_decorators;
    var _getEntregas_decorators;
    var _createEntrega_decorators;
    var _getExames_decorators;
    var _createExame_decorators;
    var _getExameById_decorators;
    var _updateExame_decorators;
    var _deleteExame_decorators;
    var SegurancaController = _classThis = /** @class */ (function () {
        function SegurancaController_1(segurancaService) {
            this.segurancaService = (__runInitializers(this, _instanceExtraInitializers), segurancaService);
        }
        SegurancaController_1.prototype.getEPIs = function () {
            return this.segurancaService.getEPIs();
        };
        SegurancaController_1.prototype.createEPI = function (data) {
            return this.segurancaService.createEPI(data);
        };
        SegurancaController_1.prototype.getEPIById = function (id) {
            return this.segurancaService.getEPIById(id);
        };
        SegurancaController_1.prototype.updateEPI = function (id, data) {
            return this.segurancaService.updateEPI(id, data);
        };
        SegurancaController_1.prototype.deleteEPI = function (id) {
            return this.segurancaService.deleteEPI(id);
        };
        SegurancaController_1.prototype.getEntregas = function (funcionarioId) {
            return this.segurancaService.getEntregas(funcionarioId);
        };
        SegurancaController_1.prototype.createEntrega = function (data) {
            return this.segurancaService.createEntrega(data);
        };
        SegurancaController_1.prototype.getExames = function (funcionarioId) {
            return this.segurancaService.getExames(funcionarioId);
        };
        SegurancaController_1.prototype.createExame = function (data) {
            return this.segurancaService.createExame(data);
        };
        SegurancaController_1.prototype.getExameById = function (id) {
            return this.segurancaService.getExameById(id);
        };
        SegurancaController_1.prototype.updateExame = function (id, data) {
            return this.segurancaService.updateExame(id, data);
        };
        SegurancaController_1.prototype.deleteExame = function (id) {
            return this.segurancaService.deleteExame(id);
        };
        return SegurancaController_1;
    }());
    __setFunctionName(_classThis, "SegurancaController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getEPIs_decorators = [(0, common_1.Get)('epis')];
        _createEPI_decorators = [(0, common_1.Post)('epis')];
        _getEPIById_decorators = [(0, common_1.Get)('epis/:id')];
        _updateEPI_decorators = [(0, common_1.Patch)('epis/:id')];
        _deleteEPI_decorators = [(0, common_1.Delete)('epis/:id')];
        _getEntregas_decorators = [(0, common_1.Get)('entregas')];
        _createEntrega_decorators = [(0, common_1.Post)('entregas')];
        _getExames_decorators = [(0, common_1.Get)('exames')];
        _createExame_decorators = [(0, common_1.Post)('exames')];
        _getExameById_decorators = [(0, common_1.Get)('exames/:id')];
        _updateExame_decorators = [(0, common_1.Patch)('exames/:id')];
        _deleteExame_decorators = [(0, common_1.Delete)('exames/:id')];
        __esDecorate(_classThis, null, _getEPIs_decorators, { kind: "method", name: "getEPIs", static: false, private: false, access: { has: function (obj) { return "getEPIs" in obj; }, get: function (obj) { return obj.getEPIs; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createEPI_decorators, { kind: "method", name: "createEPI", static: false, private: false, access: { has: function (obj) { return "createEPI" in obj; }, get: function (obj) { return obj.createEPI; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getEPIById_decorators, { kind: "method", name: "getEPIById", static: false, private: false, access: { has: function (obj) { return "getEPIById" in obj; }, get: function (obj) { return obj.getEPIById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateEPI_decorators, { kind: "method", name: "updateEPI", static: false, private: false, access: { has: function (obj) { return "updateEPI" in obj; }, get: function (obj) { return obj.updateEPI; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteEPI_decorators, { kind: "method", name: "deleteEPI", static: false, private: false, access: { has: function (obj) { return "deleteEPI" in obj; }, get: function (obj) { return obj.deleteEPI; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getEntregas_decorators, { kind: "method", name: "getEntregas", static: false, private: false, access: { has: function (obj) { return "getEntregas" in obj; }, get: function (obj) { return obj.getEntregas; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createEntrega_decorators, { kind: "method", name: "createEntrega", static: false, private: false, access: { has: function (obj) { return "createEntrega" in obj; }, get: function (obj) { return obj.createEntrega; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getExames_decorators, { kind: "method", name: "getExames", static: false, private: false, access: { has: function (obj) { return "getExames" in obj; }, get: function (obj) { return obj.getExames; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createExame_decorators, { kind: "method", name: "createExame", static: false, private: false, access: { has: function (obj) { return "createExame" in obj; }, get: function (obj) { return obj.createExame; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getExameById_decorators, { kind: "method", name: "getExameById", static: false, private: false, access: { has: function (obj) { return "getExameById" in obj; }, get: function (obj) { return obj.getExameById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateExame_decorators, { kind: "method", name: "updateExame", static: false, private: false, access: { has: function (obj) { return "updateExame" in obj; }, get: function (obj) { return obj.updateExame; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteExame_decorators, { kind: "method", name: "deleteExame", static: false, private: false, access: { has: function (obj) { return "deleteExame" in obj; }, get: function (obj) { return obj.deleteExame; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SegurancaController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SegurancaController = _classThis;
}();
exports.SegurancaController = SegurancaController;
