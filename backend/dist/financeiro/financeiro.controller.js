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
exports.FinanceiroController = void 0;
const common_1 = require("@nestjs/common");
const financeiro_service_1 = require("./financeiro.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const client_1 = require("@prisma/client");
let FinanceiroController = class FinanceiroController {
    financeiroService;
    constructor(financeiroService) {
        this.financeiroService = financeiroService;
    }
    createPlanoContas(req, data) {
        return this.financeiroService.createPlanoContas({
            ...data,
            empresa: { connect: { id: req.user.empresaId } }
        });
    }
    findAllPlanoContas(req) {
        return this.financeiroService.findAllPlanoContas(req.user.empresaId);
    }
    updatePlanoContas(req, id, data) {
        return this.financeiroService.updatePlanoContas(id, req.user.empresaId, data);
    }
    removePlanoContas(req, id) {
        return this.financeiroService.removePlanoContas(id, req.user.empresaId);
    }
    createLancamento(data) {
        return this.financeiroService.createLancamento(data);
    }
    findAllLancamentos(filters) {
        return this.financeiroService.findAllLancamentos(filters);
    }
    baixar(id, dataPagamento) {
        return this.financeiroService.baixarLancamento(id, dataPagamento);
    }
    async getFluxoCaixa(req, startDate, endDate) {
        return this.financeiroService.getFluxoCaixa(req.user.empresaId, startDate, endDate);
    }
};
exports.FinanceiroController = FinanceiroController;
__decorate([
    (0, common_1.Post)('plano-contas'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FinanceiroController.prototype, "createPlanoContas", null);
__decorate([
    (0, common_1.Get)('plano-contas'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinanceiroController.prototype, "findAllPlanoContas", null);
__decorate([
    (0, common_1.Patch)('plano-contas/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], FinanceiroController.prototype, "updatePlanoContas", null);
__decorate([
    (0, common_1.Delete)('plano-contas/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FinanceiroController.prototype, "removePlanoContas", null);
__decorate([
    (0, common_1.Post)('lancamentos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinanceiroController.prototype, "createLancamento", null);
__decorate([
    (0, common_1.Get)('lancamentos'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinanceiroController.prototype, "findAllLancamentos", null);
__decorate([
    (0, common_1.Patch)('lancamentos/:id/baixar'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('dataPagamento')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FinanceiroController.prototype, "baixar", null);
__decorate([
    (0, common_1.Get)('fluxo-caixa'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], FinanceiroController.prototype, "getFluxoCaixa", null);
exports.FinanceiroController = FinanceiroController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('financeiro'),
    __metadata("design:paramtypes", [financeiro_service_1.FinanceiroService])
], FinanceiroController);
//# sourceMappingURL=financeiro.controller.js.map