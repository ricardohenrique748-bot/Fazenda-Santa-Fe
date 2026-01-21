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
exports.ManutencoesController = void 0;
const common_1 = require("@nestjs/common");
const manutencoes_service_1 = require("./manutencoes.service");
const client_1 = require("@prisma/client");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ManutencoesController = class ManutencoesController {
    manutencoesService;
    constructor(manutencoesService) {
        this.manutencoesService = manutencoesService;
    }
    create(req, data) {
        const empresaId = req.user?.empresaId;
        if (!empresaId)
            throw new common_1.UnauthorizedException('Empresa não identificada.');
        return this.manutencoesService.create(empresaId, data);
    }
    findAll(req) {
        const empresaId = req.user?.empresaId;
        if (!empresaId)
            throw new common_1.UnauthorizedException('Empresa não identificada.');
        return this.manutencoesService.findAll(empresaId);
    }
    findOne(req, id) {
        const empresaId = req.user?.empresaId;
        if (!empresaId)
            throw new common_1.UnauthorizedException('Empresa não identificada.');
        return this.manutencoesService.findOne(empresaId, id);
    }
    update(req, id, data) {
        const empresaId = req.user?.empresaId;
        if (!empresaId)
            throw new common_1.UnauthorizedException('Empresa não identificada.');
        return this.manutencoesService.update(empresaId, id, data);
    }
    remove(req, id) {
        const empresaId = req.user?.empresaId;
        if (!empresaId)
            throw new common_1.UnauthorizedException('Empresa não identificada.');
        return this.manutencoesService.remove(empresaId, id);
    }
};
exports.ManutencoesController = ManutencoesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ManutencoesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ManutencoesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ManutencoesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ManutencoesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ManutencoesController.prototype, "remove", null);
exports.ManutencoesController = ManutencoesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('manutencoes'),
    __metadata("design:paramtypes", [manutencoes_service_1.ManutencoesService])
], ManutencoesController);
//# sourceMappingURL=manutencoes.controller.js.map