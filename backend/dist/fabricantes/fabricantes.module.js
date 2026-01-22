"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FabricantesModule = void 0;
const common_1 = require("@nestjs/common");
const fabricantes_service_1 = require("./fabricantes.service");
const fabricantes_controller_1 = require("./fabricantes.controller");
const prisma_service_1 = require("../prisma/prisma.service");
let FabricantesModule = class FabricantesModule {
};
exports.FabricantesModule = FabricantesModule;
exports.FabricantesModule = FabricantesModule = __decorate([
    (0, common_1.Module)({
        controllers: [fabricantes_controller_1.FabricantesController],
        providers: [fabricantes_service_1.FabricantesService, prisma_service_1.PrismaService],
    })
], FabricantesModule);
//# sourceMappingURL=fabricantes.module.js.map