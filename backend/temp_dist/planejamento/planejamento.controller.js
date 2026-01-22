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
exports.PlanejamentoController = void 0;
var common_1 = require("@nestjs/common");
var PlanejamentoController = function () {
    var _classDecorators = [(0, common_1.Controller)('planejamento')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createSafra_decorators;
    var _findAllSafras_decorators;
    var _findOneSafra_decorators;
    var _updateSafra_decorators;
    var _removeSafra_decorators;
    var _createPlanejamento_decorators;
    var _findAllPlanejamentos_decorators;
    var _getCronograma_decorators;
    var _findOnePlanejamento_decorators;
    var _removePlanejamento_decorators;
    var PlanejamentoController = _classThis = /** @class */ (function () {
        function PlanejamentoController_1(safrasService, planejamentoService) {
            this.safrasService = (__runInitializers(this, _instanceExtraInitializers), safrasService);
            this.planejamentoService = planejamentoService;
        }
        // Safras
        PlanejamentoController_1.prototype.createSafra = function (data) {
            return this.safrasService.create(data);
        };
        PlanejamentoController_1.prototype.findAllSafras = function () {
            return this.safrasService.findAll();
        };
        PlanejamentoController_1.prototype.findOneSafra = function (id) {
            return this.safrasService.findOne(id);
        };
        PlanejamentoController_1.prototype.updateSafra = function (id, data) {
            return this.safrasService.update(id, data);
        };
        PlanejamentoController_1.prototype.removeSafra = function (id) {
            return this.safrasService.remove(id);
        };
        // Planejamentos
        PlanejamentoController_1.prototype.createPlanejamento = function (data) {
            return this.planejamentoService.create(data);
        };
        PlanejamentoController_1.prototype.findAllPlanejamentos = function (safraId, fazendaId) {
            return this.planejamentoService.findAll({ safraId: safraId, fazendaId: fazendaId });
        };
        PlanejamentoController_1.prototype.getCronograma = function (start, end) {
            return this.planejamentoService.getCronograma(start, end);
        };
        PlanejamentoController_1.prototype.findOnePlanejamento = function (id) {
            return this.planejamentoService.findOne(id);
        };
        PlanejamentoController_1.prototype.removePlanejamento = function (id) {
            return this.planejamentoService.remove(id);
        };
        return PlanejamentoController_1;
    }());
    __setFunctionName(_classThis, "PlanejamentoController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createSafra_decorators = [(0, common_1.Post)('safras')];
        _findAllSafras_decorators = [(0, common_1.Get)('safras')];
        _findOneSafra_decorators = [(0, common_1.Get)('safras/:id')];
        _updateSafra_decorators = [(0, common_1.Put)('safras/:id')];
        _removeSafra_decorators = [(0, common_1.Delete)('safras/:id')];
        _createPlanejamento_decorators = [(0, common_1.Post)()];
        _findAllPlanejamentos_decorators = [(0, common_1.Get)()];
        _getCronograma_decorators = [(0, common_1.Get)('cronograma')];
        _findOnePlanejamento_decorators = [(0, common_1.Get)(':id')];
        _removePlanejamento_decorators = [(0, common_1.Delete)(':id')];
        __esDecorate(_classThis, null, _createSafra_decorators, { kind: "method", name: "createSafra", static: false, private: false, access: { has: function (obj) { return "createSafra" in obj; }, get: function (obj) { return obj.createSafra; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAllSafras_decorators, { kind: "method", name: "findAllSafras", static: false, private: false, access: { has: function (obj) { return "findAllSafras" in obj; }, get: function (obj) { return obj.findAllSafras; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOneSafra_decorators, { kind: "method", name: "findOneSafra", static: false, private: false, access: { has: function (obj) { return "findOneSafra" in obj; }, get: function (obj) { return obj.findOneSafra; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateSafra_decorators, { kind: "method", name: "updateSafra", static: false, private: false, access: { has: function (obj) { return "updateSafra" in obj; }, get: function (obj) { return obj.updateSafra; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeSafra_decorators, { kind: "method", name: "removeSafra", static: false, private: false, access: { has: function (obj) { return "removeSafra" in obj; }, get: function (obj) { return obj.removeSafra; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createPlanejamento_decorators, { kind: "method", name: "createPlanejamento", static: false, private: false, access: { has: function (obj) { return "createPlanejamento" in obj; }, get: function (obj) { return obj.createPlanejamento; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAllPlanejamentos_decorators, { kind: "method", name: "findAllPlanejamentos", static: false, private: false, access: { has: function (obj) { return "findAllPlanejamentos" in obj; }, get: function (obj) { return obj.findAllPlanejamentos; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCronograma_decorators, { kind: "method", name: "getCronograma", static: false, private: false, access: { has: function (obj) { return "getCronograma" in obj; }, get: function (obj) { return obj.getCronograma; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOnePlanejamento_decorators, { kind: "method", name: "findOnePlanejamento", static: false, private: false, access: { has: function (obj) { return "findOnePlanejamento" in obj; }, get: function (obj) { return obj.findOnePlanejamento; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removePlanejamento_decorators, { kind: "method", name: "removePlanejamento", static: false, private: false, access: { has: function (obj) { return "removePlanejamento" in obj; }, get: function (obj) { return obj.removePlanejamento; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PlanejamentoController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PlanejamentoController = _classThis;
}();
exports.PlanejamentoController = PlanejamentoController;
