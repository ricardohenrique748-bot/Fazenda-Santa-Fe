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
exports.SegurancaController = void 0;
const common_1 = require("@nestjs/common");
const seguranca_service_1 = require("./seguranca.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let SegurancaController = class SegurancaController {
    segurancaService;
    constructor(segurancaService) {
        this.segurancaService = segurancaService;
    }
    getEPIs() {
        return this.segurancaService.getEPIs();
    }
    createEPI(data) {
        return this.segurancaService.createEPI(data);
    }
    getEPIById(id) {
        return this.segurancaService.getEPIById(id);
    }
    updateEPI(id, data) {
        return this.segurancaService.updateEPI(id, data);
    }
    deleteEPI(id) {
        return this.segurancaService.deleteEPI(id);
    }
    getEntregas(funcionarioId) {
        return this.segurancaService.getEntregas(funcionarioId);
    }
    createEntrega(data) {
        return this.segurancaService.createEntrega(data);
    }
    getExames(funcionarioId) {
        return this.segurancaService.getExames(funcionarioId);
    }
    createExame(data) {
        return this.segurancaService.createExame(data);
    }
    getExameById(id) {
        return this.segurancaService.getExameById(id);
    }
    updateExame(id, data) {
        return this.segurancaService.updateExame(id, data);
    }
    deleteExame(id) {
        return this.segurancaService.deleteExame(id);
    }
};
exports.SegurancaController = SegurancaController;
__decorate([
    (0, common_1.Get)('epis'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SegurancaController.prototype, "getEPIs", null);
__decorate([
    (0, common_1.Post)('epis'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SegurancaController.prototype, "createEPI", null);
__decorate([
    (0, common_1.Get)('epis/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SegurancaController.prototype, "getEPIById", null);
__decorate([
    (0, common_1.Patch)('epis/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SegurancaController.prototype, "updateEPI", null);
__decorate([
    (0, common_1.Delete)('epis/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SegurancaController.prototype, "deleteEPI", null);
__decorate([
    (0, common_1.Get)('entregas'),
    __param(0, (0, common_1.Query)('funcionarioId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SegurancaController.prototype, "getEntregas", null);
__decorate([
    (0, common_1.Post)('entregas'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SegurancaController.prototype, "createEntrega", null);
__decorate([
    (0, common_1.Get)('exames'),
    __param(0, (0, common_1.Query)('funcionarioId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SegurancaController.prototype, "getExames", null);
__decorate([
    (0, common_1.Post)('exames'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SegurancaController.prototype, "createExame", null);
__decorate([
    (0, common_1.Get)('exames/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SegurancaController.prototype, "getExameById", null);
__decorate([
    (0, common_1.Patch)('exames/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SegurancaController.prototype, "updateExame", null);
__decorate([
    (0, common_1.Delete)('exames/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SegurancaController.prototype, "deleteExame", null);
exports.SegurancaController = SegurancaController = __decorate([
    (0, common_1.Controller)('seguranca'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [seguranca_service_1.SegurancaService])
], SegurancaController);
//# sourceMappingURL=seguranca.controller.js.map