"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalizacoesModule = void 0;
const common_1 = require("@nestjs/common");
const localizacoes_controller_1 = require("./localizacoes.controller");
const localizacoes_service_1 = require("./localizacoes.service");
const municipios_module_1 = require("./municipios.module");
const culturas_module_1 = require("./culturas.module");
const prisma_module_1 = require("../prisma/prisma.module");
let LocalizacoesModule = class LocalizacoesModule {
};
exports.LocalizacoesModule = LocalizacoesModule;
exports.LocalizacoesModule = LocalizacoesModule = __decorate([
    (0, common_1.Module)({
        controllers: [localizacoes_controller_1.LocalizacoesController],
        providers: [localizacoes_service_1.LocalizacoesService],
        imports: [municipios_module_1.MunicipiosModule, culturas_module_1.CulturasModule, prisma_module_1.PrismaModule],
        exports: [localizacoes_service_1.LocalizacoesService],
    })
], LocalizacoesModule);
//# sourceMappingURL=localizacoes.module.js.map