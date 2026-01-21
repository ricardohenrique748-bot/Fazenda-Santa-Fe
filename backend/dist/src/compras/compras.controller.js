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
exports.ComprasController = void 0;
const common_1 = require("@nestjs/common");
const compras_service_1 = require("./compras.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ComprasController = class ComprasController {
    comprasService;
    constructor(comprasService) {
        this.comprasService = comprasService;
    }
    getFornecedores(req) {
        return this.comprasService.getFornecedores(req.user.empresaId);
    }
    createFornecedor(data, req) {
        return this.comprasService.createFornecedor(data, req.user.empresaId);
    }
    getPedidos(req) {
        return this.comprasService.getPedidos(req.user.empresaId);
    }
    createPedido(data, req) {
        return this.comprasService.createPedido(data, req.user.empresaId);
    }
    getContratos(req) {
        return this.comprasService.getContratos(req.user.empresaId);
    }
    createContrato(data, req) {
        return this.comprasService.createContrato(data);
    }
};
exports.ComprasController = ComprasController;
__decorate([
    (0, common_1.Get)('fornecedores'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ComprasController.prototype, "getFornecedores", null);
__decorate([
    (0, common_1.Post)('fornecedores'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ComprasController.prototype, "createFornecedor", null);
__decorate([
    (0, common_1.Get)('pedidos'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ComprasController.prototype, "getPedidos", null);
__decorate([
    (0, common_1.Post)('pedidos'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ComprasController.prototype, "createPedido", null);
__decorate([
    (0, common_1.Get)('contratos'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ComprasController.prototype, "getContratos", null);
__decorate([
    (0, common_1.Post)('contratos'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ComprasController.prototype, "createContrato", null);
exports.ComprasController = ComprasController = __decorate([
    (0, common_1.Controller)('compras'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [compras_service_1.ComprasService])
], ComprasController);
//# sourceMappingURL=compras.controller.js.map