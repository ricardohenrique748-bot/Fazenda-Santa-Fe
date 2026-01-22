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
exports.EstoqueController = void 0;
const common_1 = require("@nestjs/common");
const estoque_service_1 = require("./estoque.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let EstoqueController = class EstoqueController {
    estoqueService;
    constructor(estoqueService) {
        this.estoqueService = estoqueService;
    }
    create(data, req) {
        const usuarioId = req.user.userId;
        const empresaId = req.user.empresaId;
        return this.estoqueService.createMovimentacao({ ...data, usuarioId, empresaId });
    }
    transferir(data, req) {
        const usuarioId = req.user.userId;
        const empresaId = req.user.empresaId;
        return this.estoqueService.transferirProduto({ ...data, usuarioId, empresaId });
    }
    conferencia(data, req) {
        const usuarioId = req.user.userId;
        const empresaId = req.user.empresaId;
        return this.estoqueService.processarConferencia({ ...data, usuarioId, empresaId });
    }
    findAllMovimentacoes(req) {
        return this.estoqueService.findAllMovimentacoes(req.user.empresaId);
    }
    getSaldos(req) {
        return this.estoqueService.getSaldos(req.user.empresaId);
    }
};
exports.EstoqueController = EstoqueController;
__decorate([
    (0, common_1.Post)('movimentacoes'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EstoqueController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('transferencias'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EstoqueController.prototype, "transferir", null);
__decorate([
    (0, common_1.Post)('conferencia'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EstoqueController.prototype, "conferencia", null);
__decorate([
    (0, common_1.Get)('movimentacoes'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EstoqueController.prototype, "findAllMovimentacoes", null);
__decorate([
    (0, common_1.Get)('saldos'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EstoqueController.prototype, "getSaldos", null);
exports.EstoqueController = EstoqueController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('estoque'),
    __metadata("design:paramtypes", [estoque_service_1.EstoqueService])
], EstoqueController);
//# sourceMappingURL=estoque.controller.js.map