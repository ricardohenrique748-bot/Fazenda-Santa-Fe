import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: any;
export declare const JsonNull: any;
export declare const AnyNull: any;
export declare const ModelName: {
    readonly Empresa: "Empresa";
    readonly Fazenda: "Fazenda";
    readonly Usuario: "Usuario";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const EmpresaScalarFieldEnum: {
    readonly id: "id";
    readonly nome: "nome";
    readonly cnpj: "cnpj";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type EmpresaScalarFieldEnum = (typeof EmpresaScalarFieldEnum)[keyof typeof EmpresaScalarFieldEnum];
export declare const FazendaScalarFieldEnum: {
    readonly id: "id";
    readonly nome: "nome";
    readonly empresaId: "empresaId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FazendaScalarFieldEnum = (typeof FazendaScalarFieldEnum)[keyof typeof FazendaScalarFieldEnum];
export declare const UsuarioScalarFieldEnum: {
    readonly id: "id";
    readonly nome: "nome";
    readonly email: "email";
    readonly senha: "senha";
    readonly empresaId: "empresaId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
