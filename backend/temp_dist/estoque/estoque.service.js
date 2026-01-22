"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var EstoqueService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var EstoqueService = _classThis = /** @class */ (function () {
        function EstoqueService_1(prisma) {
            this.prisma = prisma;
        }
        EstoqueService_1.prototype.createMovimentacao = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var produtoId, depositoId, quantidade, tipo, motivo, usuarioId, veiculoId, empresaId, produto, deposito;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            produtoId = data.produtoId, depositoId = data.depositoId, quantidade = data.quantidade, tipo = data.tipo, motivo = data.motivo, usuarioId = data.usuarioId, veiculoId = data.veiculoId, empresaId = data.empresaId;
                            return [4 /*yield*/, this.prisma.produto.findUnique({ where: { id: produtoId } })];
                        case 1:
                            produto = _a.sent();
                            if (!produto || produto.empresaId !== empresaId) {
                                throw new common_1.BadRequestException('Produto não encontrado ou não pertence à sua empresa.');
                            }
                            return [4 /*yield*/, this.prisma.deposito.findUnique({ where: { id: depositoId } })];
                        case 2:
                            deposito = _a.sent();
                            if (!deposito || deposito.empresaId !== empresaId) {
                                throw new common_1.BadRequestException('Depósito não encontrado ou não pertence à sua empresa.');
                            }
                            return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var movimentacao, diff, updatedSaldo;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.estoqueMovimentacao.create({
                                                    data: {
                                                        tipo: tipo,
                                                        quantidade: quantidade,
                                                        motivo: motivo,
                                                        produto: { connect: { id: produtoId } },
                                                        deposito: { connect: { id: depositoId } },
                                                        usuario: { connect: { id: usuarioId } },
                                                        veiculoId: veiculoId // opcional
                                                    },
                                                })];
                                            case 1:
                                                movimentacao = _a.sent();
                                                diff = (tipo === client_1.TipoMovimentacao.ENTRADA || tipo === client_1.TipoMovimentacao.AJUSTE && quantidade > 0)
                                                    ? quantidade
                                                    : -quantidade;
                                                // Usar upsert para garantir que o registro de saldo exista
                                                return [4 /*yield*/, tx.estoqueSaldo.upsert({
                                                        where: {
                                                            produtoId_depositoId: {
                                                                produtoId: produtoId,
                                                                depositoId: depositoId,
                                                            },
                                                        },
                                                        create: {
                                                            produtoId: produtoId,
                                                            depositoId: depositoId,
                                                            quantidade: diff,
                                                        },
                                                        update: {
                                                            quantidade: {
                                                                increment: diff,
                                                            },
                                                        },
                                                    })];
                                            case 2:
                                                // Usar upsert para garantir que o registro de saldo exista
                                                _a.sent();
                                                if (!(tipo === client_1.TipoMovimentacao.SAIDA)) return [3 /*break*/, 4];
                                                return [4 /*yield*/, tx.estoqueSaldo.findUnique({
                                                        where: { produtoId_depositoId: { produtoId: produtoId, depositoId: depositoId } }
                                                    })];
                                            case 3:
                                                updatedSaldo = _a.sent();
                                                if (updatedSaldo && updatedSaldo.quantidade < 0) {
                                                    throw new common_1.BadRequestException('Saldo insuficiente no depósito');
                                                }
                                                _a.label = 4;
                                            case 4: return [2 /*return*/, movimentacao];
                                        }
                                    });
                                }); })];
                    }
                });
            });
        };
        EstoqueService_1.prototype.findAllMovimentacoes = function (empresaId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.estoqueMovimentacao.findMany({
                            where: {
                                produto: { empresaId: empresaId }
                            },
                            include: {
                                produto: { select: { nome: true, unidadeMedida: true } },
                                deposito: { select: { nome: true } },
                                usuario: { select: { nome: true } }
                            },
                            orderBy: { data: 'desc' },
                            take: 100
                        })];
                });
            });
        };
        EstoqueService_1.prototype.getSaldos = function (empresaId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.estoqueSaldo.findMany({
                            where: {
                                produto: { empresaId: empresaId }
                            },
                            include: {
                                produto: true,
                                deposito: true
                            },
                            orderBy: [
                                { produto: { nome: 'asc' } },
                                { deposito: { nome: 'asc' } }
                            ]
                        })];
                });
            });
        };
        EstoqueService_1.prototype.transferirProduto = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var produtoId, origemId, destinoId, quantidade, motivo, usuarioId, empresaId, produto, origem, destino;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            produtoId = data.produtoId, origemId = data.origemId, destinoId = data.destinoId, quantidade = data.quantidade, motivo = data.motivo, usuarioId = data.usuarioId, empresaId = data.empresaId;
                            if (origemId === destinoId) {
                                throw new common_1.BadRequestException('Origem e Destino devem ser diferentes.');
                            }
                            return [4 /*yield*/, this.prisma.produto.findUnique({ where: { id: produtoId } })];
                        case 1:
                            produto = _a.sent();
                            if (!produto || produto.empresaId !== empresaId) {
                                throw new common_1.BadRequestException('Produto não encontrado ou não pertence à empresa.');
                            }
                            return [4 /*yield*/, this.prisma.deposito.findUnique({ where: { id: origemId } })];
                        case 2:
                            origem = _a.sent();
                            return [4 /*yield*/, this.prisma.deposito.findUnique({ where: { id: destinoId } })];
                        case 3:
                            destino = _a.sent();
                            if (!origem || origem.empresaId !== empresaId || !destino || destino.empresaId !== empresaId) {
                                throw new common_1.BadRequestException('Depósitos inválidos ou não pertencem à empresa.');
                            }
                            return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var saldoOrigem, movEntrada;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.estoqueSaldo.findUnique({
                                                    where: { produtoId_depositoId: { produtoId: produtoId, depositoId: origemId } }
                                                })];
                                            case 1:
                                                saldoOrigem = _a.sent();
                                                if (!saldoOrigem || saldoOrigem.quantidade < quantidade) {
                                                    throw new common_1.BadRequestException("Saldo insuficiente na origem. Dispon\u00EDvel: ".concat((saldoOrigem === null || saldoOrigem === void 0 ? void 0 : saldoOrigem.quantidade) || 0));
                                                }
                                                // 2. Criar Saída na Origem
                                                return [4 /*yield*/, tx.estoqueMovimentacao.create({
                                                        data: {
                                                            tipo: client_1.TipoMovimentacao.SAIDA,
                                                            quantidade: quantidade,
                                                            motivo: "Transfer\u00EAncia para ".concat(destino.nome, ". ").concat(motivo || ''),
                                                            produtoId: produtoId,
                                                            depositoId: origemId,
                                                            usuarioId: usuarioId
                                                        }
                                                    })];
                                            case 2:
                                                // 2. Criar Saída na Origem
                                                _a.sent();
                                                return [4 /*yield*/, tx.estoqueSaldo.update({
                                                        where: { produtoId_depositoId: { produtoId: produtoId, depositoId: origemId } },
                                                        data: { quantidade: { decrement: quantidade } }
                                                    })];
                                            case 3:
                                                _a.sent();
                                                return [4 /*yield*/, tx.estoqueMovimentacao.create({
                                                        data: {
                                                            tipo: client_1.TipoMovimentacao.ENTRADA,
                                                            quantidade: quantidade,
                                                            motivo: "Transfer\u00EAncia de ".concat(origem.nome, ". ").concat(motivo || ''),
                                                            produtoId: produtoId,
                                                            depositoId: destinoId,
                                                            usuarioId: usuarioId
                                                        }
                                                    })];
                                            case 4:
                                                movEntrada = _a.sent();
                                                return [4 /*yield*/, tx.estoqueSaldo.upsert({
                                                        where: { produtoId_depositoId: { produtoId: produtoId, depositoId: destinoId } },
                                                        create: { produtoId: produtoId, depositoId: destinoId, quantidade: quantidade },
                                                        update: { quantidade: { increment: quantidade } }
                                                    })];
                                            case 5:
                                                _a.sent();
                                                return [2 /*return*/, movEntrada];
                                        }
                                    });
                                }); })];
                    }
                });
            });
        };
        EstoqueService_1.prototype.processarConferencia = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var itens, usuarioId, empresaId, depositoId;
                var _this = this;
                return __generator(this, function (_a) {
                    itens = data.itens, usuarioId = data.usuarioId, empresaId = data.empresaId, depositoId = data.depositoId;
                    return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                            var results, _i, itens_1, item, produtoId, diferenca, produto, tipo, quantidadeAbs, isPositive, incrementValue;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        results = [];
                                        _i = 0, itens_1 = itens;
                                        _a.label = 1;
                                    case 1:
                                        if (!(_i < itens_1.length)) return [3 /*break*/, 6];
                                        item = itens_1[_i];
                                        produtoId = item.produtoId, diferenca = item.diferenca;
                                        if (diferenca === 0)
                                            return [3 /*break*/, 5];
                                        return [4 /*yield*/, tx.produto.findUnique({ where: { id: produtoId } })];
                                    case 2:
                                        produto = _a.sent();
                                        if (!produto || produto.empresaId !== empresaId) {
                                            throw new common_1.BadRequestException("Produto ".concat(produtoId, " inv\u00E1lido."));
                                        }
                                        tipo = diferenca > 0 ? client_1.TipoMovimentacao.AJUSTE : client_1.TipoMovimentacao.AJUSTE;
                                        quantidadeAbs = Math.abs(diferenca);
                                        isPositive = diferenca > 0;
                                        // Create Movement
                                        return [4 /*yield*/, tx.estoqueMovimentacao.create({
                                                data: {
                                                    tipo: client_1.TipoMovimentacao.AJUSTE,
                                                    quantidade: quantidadeAbs, // Store absolute value
                                                    motivo: "Confer\u00EAncia: ".concat(isPositive ? 'Sobra' : 'Falta', " de estoque."),
                                                    produtoId: produtoId,
                                                    depositoId: depositoId,
                                                    usuarioId: usuarioId
                                                }
                                            })];
                                    case 3:
                                        // Create Movement
                                        _a.sent();
                                        incrementValue = diferenca;
                                        return [4 /*yield*/, tx.estoqueSaldo.upsert({
                                                where: { produtoId_depositoId: { produtoId: produtoId, depositoId: depositoId } },
                                                create: { produtoId: produtoId, depositoId: depositoId, quantidade: incrementValue > 0 ? incrementValue : 0 }, // If creating with negative... weird. Assume 0 base?
                                                update: { quantidade: { increment: incrementValue } }
                                            })];
                                    case 4:
                                        _a.sent();
                                        results.push({ produtoId: produtoId, status: 'ok' });
                                        _a.label = 5;
                                    case 5:
                                        _i++;
                                        return [3 /*break*/, 1];
                                    case 6: return [2 /*return*/, results];
                                }
                            });
                        }); })];
                });
            });
        };
        return EstoqueService_1;
    }());
    __setFunctionName(_classThis, "EstoqueService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EstoqueService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EstoqueService = _classThis;
}();
exports.EstoqueService = EstoqueService;
