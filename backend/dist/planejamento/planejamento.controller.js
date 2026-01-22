"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanejamentoController = void 0;
const common_1 = require("@nestjs/common");
const safras_service_1 = require("./safras.service");
const planejamento_service_1 = require("./planejamento.service");
let PlanejamentoController = class PlanejamentoController {
    safrasService;
    planejamentoService;
    constructor(safrasService, planejamentoService) {
        this.safrasService = safrasService;
        this.planejamentoService = planejamentoService;
    }
    createSafra(data) {
        return this.safrasService.create(data);
    }
    findAllSafras() {
        return this.safrasService.findAll();
    }
    findOneSafra(id) {
        return this.safrasService.findOne(id);
    }
    updateSafra(id, data) {
        return this.safrasService.update(id, data);
    }
    removeSafra(id) {
        return this.safrasService.remove(id);
    }
    createPlanejamento(data) {
        return this.planejamentoService.create(data);
    }
    findAllPlanejamentos(safraId, fazendaId) {
        return this.planejamentoService.findAll({ safraId, fazendaId });
    }
    getCronograma(start, end) {
        return this.planejamentoService.getCronograma(start, end);
    }
    findOnePlanejamento(id) {
        return this.planejamentoService.findOne(id);
    }
    removePlanejamento(id) {
        return this.planejamentoService.remove(id);
    }
};
exports.PlanejamentoController = PlanejamentoController;
__decorate([
    (0, common_1.Post)('safras'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlanejamentoController.prototype, "createSafra", null);
__decorate([
    (0, common_1.Get)('safras'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlanejamentoController.prototype, "findAllSafras", null);
__decorate([
    (0, common_1.Get)('safras/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlanejamentoController.prototype, "findOneSafra", null);
__decorate([
    (0, common_1.Put)('safras/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PlanejamentoController.prototype, "updateSafra", null);
__decorate([
    (0, common_1.Delete)('safras/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlanejamentoController.prototype, "removeSafra", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlanejamentoController.prototype, "createPlanejamento", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('safraId')),
    __param(1, (0, common_1.Query)('fazendaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PlanejamentoController.prototype, "findAllPlanejamentos", null);
__decorate([
    (0, common_1.Get)('cronograma'),
    __param(0, (0, common_1.Query)('start')),
    __param(1, (0, common_1.Query)('end')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PlanejamentoController.prototype, "getCronograma", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlanejamentoController.prototype, "findOnePlanejamento", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlanejamentoController.prototype, "removePlanejamento", null);
exports.PlanejamentoController = PlanejamentoController = __decorate([
    (0, common_1.Controller)('planejamento'),
    __metadata("design:paramtypes", [safras_service_1.SafrasService,
        planejamento_service_1.PlanejamentoService])
], PlanejamentoController);
//# sourceMappingURL=planejamento.controller.js.map