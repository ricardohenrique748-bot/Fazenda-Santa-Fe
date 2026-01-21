import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type EmpresaModel = runtime.Types.Result.DefaultSelection<Prisma.$EmpresaPayload>;
export type AggregateEmpresa = {
    _count: EmpresaCountAggregateOutputType | null;
    _min: EmpresaMinAggregateOutputType | null;
    _max: EmpresaMaxAggregateOutputType | null;
};
export type EmpresaMinAggregateOutputType = {
    id: string | null;
    nome: string | null;
    cnpj: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EmpresaMaxAggregateOutputType = {
    id: string | null;
    nome: string | null;
    cnpj: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EmpresaCountAggregateOutputType = {
    id: number;
    nome: number;
    cnpj: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type EmpresaMinAggregateInputType = {
    id?: true;
    nome?: true;
    cnpj?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EmpresaMaxAggregateInputType = {
    id?: true;
    nome?: true;
    cnpj?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EmpresaCountAggregateInputType = {
    id?: true;
    nome?: true;
    cnpj?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type EmpresaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmpresaWhereInput;
    orderBy?: Prisma.EmpresaOrderByWithRelationInput | Prisma.EmpresaOrderByWithRelationInput[];
    cursor?: Prisma.EmpresaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EmpresaCountAggregateInputType;
    _min?: EmpresaMinAggregateInputType;
    _max?: EmpresaMaxAggregateInputType;
};
export type GetEmpresaAggregateType<T extends EmpresaAggregateArgs> = {
    [P in keyof T & keyof AggregateEmpresa]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEmpresa[P]> : Prisma.GetScalarType<T[P], AggregateEmpresa[P]>;
};
export type EmpresaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmpresaWhereInput;
    orderBy?: Prisma.EmpresaOrderByWithAggregationInput | Prisma.EmpresaOrderByWithAggregationInput[];
    by: Prisma.EmpresaScalarFieldEnum[] | Prisma.EmpresaScalarFieldEnum;
    having?: Prisma.EmpresaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EmpresaCountAggregateInputType | true;
    _min?: EmpresaMinAggregateInputType;
    _max?: EmpresaMaxAggregateInputType;
};
export type EmpresaGroupByOutputType = {
    id: string;
    nome: string;
    cnpj: string;
    createdAt: Date;
    updatedAt: Date;
    _count: EmpresaCountAggregateOutputType | null;
    _min: EmpresaMinAggregateOutputType | null;
    _max: EmpresaMaxAggregateOutputType | null;
};
type GetEmpresaGroupByPayload<T extends EmpresaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EmpresaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EmpresaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EmpresaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EmpresaGroupByOutputType[P]>;
}>>;
export type EmpresaWhereInput = {
    AND?: Prisma.EmpresaWhereInput | Prisma.EmpresaWhereInput[];
    OR?: Prisma.EmpresaWhereInput[];
    NOT?: Prisma.EmpresaWhereInput | Prisma.EmpresaWhereInput[];
    id?: Prisma.StringFilter<"Empresa"> | string;
    nome?: Prisma.StringFilter<"Empresa"> | string;
    cnpj?: Prisma.StringFilter<"Empresa"> | string;
    createdAt?: Prisma.DateTimeFilter<"Empresa"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Empresa"> | Date | string;
    fazendas?: Prisma.FazendaListRelationFilter;
    usuarios?: Prisma.UsuarioListRelationFilter;
};
export type EmpresaOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    cnpj?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    fazendas?: Prisma.FazendaOrderByRelationAggregateInput;
    usuarios?: Prisma.UsuarioOrderByRelationAggregateInput;
};
export type EmpresaWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    cnpj?: string;
    AND?: Prisma.EmpresaWhereInput | Prisma.EmpresaWhereInput[];
    OR?: Prisma.EmpresaWhereInput[];
    NOT?: Prisma.EmpresaWhereInput | Prisma.EmpresaWhereInput[];
    nome?: Prisma.StringFilter<"Empresa"> | string;
    createdAt?: Prisma.DateTimeFilter<"Empresa"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Empresa"> | Date | string;
    fazendas?: Prisma.FazendaListRelationFilter;
    usuarios?: Prisma.UsuarioListRelationFilter;
}, "id" | "cnpj">;
export type EmpresaOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    cnpj?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.EmpresaCountOrderByAggregateInput;
    _max?: Prisma.EmpresaMaxOrderByAggregateInput;
    _min?: Prisma.EmpresaMinOrderByAggregateInput;
};
export type EmpresaScalarWhereWithAggregatesInput = {
    AND?: Prisma.EmpresaScalarWhereWithAggregatesInput | Prisma.EmpresaScalarWhereWithAggregatesInput[];
    OR?: Prisma.EmpresaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EmpresaScalarWhereWithAggregatesInput | Prisma.EmpresaScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Empresa"> | string;
    nome?: Prisma.StringWithAggregatesFilter<"Empresa"> | string;
    cnpj?: Prisma.StringWithAggregatesFilter<"Empresa"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Empresa"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Empresa"> | Date | string;
};
export type EmpresaCreateInput = {
    id?: string;
    nome: string;
    cnpj: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    fazendas?: Prisma.FazendaCreateNestedManyWithoutEmpresaInput;
    usuarios?: Prisma.UsuarioCreateNestedManyWithoutEmpresaInput;
};
export type EmpresaUncheckedCreateInput = {
    id?: string;
    nome: string;
    cnpj: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    fazendas?: Prisma.FazendaUncheckedCreateNestedManyWithoutEmpresaInput;
    usuarios?: Prisma.UsuarioUncheckedCreateNestedManyWithoutEmpresaInput;
};
export type EmpresaUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fazendas?: Prisma.FazendaUpdateManyWithoutEmpresaNestedInput;
    usuarios?: Prisma.UsuarioUpdateManyWithoutEmpresaNestedInput;
};
export type EmpresaUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fazendas?: Prisma.FazendaUncheckedUpdateManyWithoutEmpresaNestedInput;
    usuarios?: Prisma.UsuarioUncheckedUpdateManyWithoutEmpresaNestedInput;
};
export type EmpresaCreateManyInput = {
    id?: string;
    nome: string;
    cnpj: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EmpresaUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmpresaUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmpresaCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    cnpj?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EmpresaMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    cnpj?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EmpresaMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    cnpj?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EmpresaScalarRelationFilter = {
    is?: Prisma.EmpresaWhereInput;
    isNot?: Prisma.EmpresaWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type EmpresaCreateNestedOneWithoutFazendasInput = {
    create?: Prisma.XOR<Prisma.EmpresaCreateWithoutFazendasInput, Prisma.EmpresaUncheckedCreateWithoutFazendasInput>;
    connectOrCreate?: Prisma.EmpresaCreateOrConnectWithoutFazendasInput;
    connect?: Prisma.EmpresaWhereUniqueInput;
};
export type EmpresaUpdateOneRequiredWithoutFazendasNestedInput = {
    create?: Prisma.XOR<Prisma.EmpresaCreateWithoutFazendasInput, Prisma.EmpresaUncheckedCreateWithoutFazendasInput>;
    connectOrCreate?: Prisma.EmpresaCreateOrConnectWithoutFazendasInput;
    upsert?: Prisma.EmpresaUpsertWithoutFazendasInput;
    connect?: Prisma.EmpresaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EmpresaUpdateToOneWithWhereWithoutFazendasInput, Prisma.EmpresaUpdateWithoutFazendasInput>, Prisma.EmpresaUncheckedUpdateWithoutFazendasInput>;
};
export type EmpresaCreateNestedOneWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.EmpresaCreateWithoutUsuariosInput, Prisma.EmpresaUncheckedCreateWithoutUsuariosInput>;
    connectOrCreate?: Prisma.EmpresaCreateOrConnectWithoutUsuariosInput;
    connect?: Prisma.EmpresaWhereUniqueInput;
};
export type EmpresaUpdateOneRequiredWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.EmpresaCreateWithoutUsuariosInput, Prisma.EmpresaUncheckedCreateWithoutUsuariosInput>;
    connectOrCreate?: Prisma.EmpresaCreateOrConnectWithoutUsuariosInput;
    upsert?: Prisma.EmpresaUpsertWithoutUsuariosInput;
    connect?: Prisma.EmpresaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EmpresaUpdateToOneWithWhereWithoutUsuariosInput, Prisma.EmpresaUpdateWithoutUsuariosInput>, Prisma.EmpresaUncheckedUpdateWithoutUsuariosInput>;
};
export type EmpresaCreateWithoutFazendasInput = {
    id?: string;
    nome: string;
    cnpj: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    usuarios?: Prisma.UsuarioCreateNestedManyWithoutEmpresaInput;
};
export type EmpresaUncheckedCreateWithoutFazendasInput = {
    id?: string;
    nome: string;
    cnpj: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    usuarios?: Prisma.UsuarioUncheckedCreateNestedManyWithoutEmpresaInput;
};
export type EmpresaCreateOrConnectWithoutFazendasInput = {
    where: Prisma.EmpresaWhereUniqueInput;
    create: Prisma.XOR<Prisma.EmpresaCreateWithoutFazendasInput, Prisma.EmpresaUncheckedCreateWithoutFazendasInput>;
};
export type EmpresaUpsertWithoutFazendasInput = {
    update: Prisma.XOR<Prisma.EmpresaUpdateWithoutFazendasInput, Prisma.EmpresaUncheckedUpdateWithoutFazendasInput>;
    create: Prisma.XOR<Prisma.EmpresaCreateWithoutFazendasInput, Prisma.EmpresaUncheckedCreateWithoutFazendasInput>;
    where?: Prisma.EmpresaWhereInput;
};
export type EmpresaUpdateToOneWithWhereWithoutFazendasInput = {
    where?: Prisma.EmpresaWhereInput;
    data: Prisma.XOR<Prisma.EmpresaUpdateWithoutFazendasInput, Prisma.EmpresaUncheckedUpdateWithoutFazendasInput>;
};
export type EmpresaUpdateWithoutFazendasInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usuarios?: Prisma.UsuarioUpdateManyWithoutEmpresaNestedInput;
};
export type EmpresaUncheckedUpdateWithoutFazendasInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usuarios?: Prisma.UsuarioUncheckedUpdateManyWithoutEmpresaNestedInput;
};
export type EmpresaCreateWithoutUsuariosInput = {
    id?: string;
    nome: string;
    cnpj: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    fazendas?: Prisma.FazendaCreateNestedManyWithoutEmpresaInput;
};
export type EmpresaUncheckedCreateWithoutUsuariosInput = {
    id?: string;
    nome: string;
    cnpj: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    fazendas?: Prisma.FazendaUncheckedCreateNestedManyWithoutEmpresaInput;
};
export type EmpresaCreateOrConnectWithoutUsuariosInput = {
    where: Prisma.EmpresaWhereUniqueInput;
    create: Prisma.XOR<Prisma.EmpresaCreateWithoutUsuariosInput, Prisma.EmpresaUncheckedCreateWithoutUsuariosInput>;
};
export type EmpresaUpsertWithoutUsuariosInput = {
    update: Prisma.XOR<Prisma.EmpresaUpdateWithoutUsuariosInput, Prisma.EmpresaUncheckedUpdateWithoutUsuariosInput>;
    create: Prisma.XOR<Prisma.EmpresaCreateWithoutUsuariosInput, Prisma.EmpresaUncheckedCreateWithoutUsuariosInput>;
    where?: Prisma.EmpresaWhereInput;
};
export type EmpresaUpdateToOneWithWhereWithoutUsuariosInput = {
    where?: Prisma.EmpresaWhereInput;
    data: Prisma.XOR<Prisma.EmpresaUpdateWithoutUsuariosInput, Prisma.EmpresaUncheckedUpdateWithoutUsuariosInput>;
};
export type EmpresaUpdateWithoutUsuariosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fazendas?: Prisma.FazendaUpdateManyWithoutEmpresaNestedInput;
};
export type EmpresaUncheckedUpdateWithoutUsuariosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fazendas?: Prisma.FazendaUncheckedUpdateManyWithoutEmpresaNestedInput;
};
export type EmpresaCountOutputType = {
    fazendas: number;
    usuarios: number;
};
export type EmpresaCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    fazendas?: boolean | EmpresaCountOutputTypeCountFazendasArgs;
    usuarios?: boolean | EmpresaCountOutputTypeCountUsuariosArgs;
};
export type EmpresaCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaCountOutputTypeSelect<ExtArgs> | null;
};
export type EmpresaCountOutputTypeCountFazendasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FazendaWhereInput;
};
export type EmpresaCountOutputTypeCountUsuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UsuarioWhereInput;
};
export type EmpresaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nome?: boolean;
    cnpj?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    fazendas?: boolean | Prisma.Empresa$fazendasArgs<ExtArgs>;
    usuarios?: boolean | Prisma.Empresa$usuariosArgs<ExtArgs>;
    _count?: boolean | Prisma.EmpresaCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["empresa"]>;
export type EmpresaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nome?: boolean;
    cnpj?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["empresa"]>;
export type EmpresaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nome?: boolean;
    cnpj?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["empresa"]>;
export type EmpresaSelectScalar = {
    id?: boolean;
    nome?: boolean;
    cnpj?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type EmpresaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "nome" | "cnpj" | "createdAt" | "updatedAt", ExtArgs["result"]["empresa"]>;
export type EmpresaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    fazendas?: boolean | Prisma.Empresa$fazendasArgs<ExtArgs>;
    usuarios?: boolean | Prisma.Empresa$usuariosArgs<ExtArgs>;
    _count?: boolean | Prisma.EmpresaCountOutputTypeDefaultArgs<ExtArgs>;
};
export type EmpresaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type EmpresaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $EmpresaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Empresa";
    objects: {
        fazendas: Prisma.$FazendaPayload<ExtArgs>[];
        usuarios: Prisma.$UsuarioPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        nome: string;
        cnpj: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["empresa"]>;
    composites: {};
};
export type EmpresaGetPayload<S extends boolean | null | undefined | EmpresaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EmpresaPayload, S>;
export type EmpresaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EmpresaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EmpresaCountAggregateInputType | true;
};
export interface EmpresaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Empresa'];
        meta: {
            name: 'Empresa';
        };
    };
    findUnique<T extends EmpresaFindUniqueArgs>(args: Prisma.SelectSubset<T, EmpresaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EmpresaClient<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EmpresaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EmpresaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmpresaClient<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EmpresaFindFirstArgs>(args?: Prisma.SelectSubset<T, EmpresaFindFirstArgs<ExtArgs>>): Prisma.Prisma__EmpresaClient<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EmpresaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EmpresaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmpresaClient<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EmpresaFindManyArgs>(args?: Prisma.SelectSubset<T, EmpresaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EmpresaCreateArgs>(args: Prisma.SelectSubset<T, EmpresaCreateArgs<ExtArgs>>): Prisma.Prisma__EmpresaClient<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EmpresaCreateManyArgs>(args?: Prisma.SelectSubset<T, EmpresaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends EmpresaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EmpresaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends EmpresaDeleteArgs>(args: Prisma.SelectSubset<T, EmpresaDeleteArgs<ExtArgs>>): Prisma.Prisma__EmpresaClient<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EmpresaUpdateArgs>(args: Prisma.SelectSubset<T, EmpresaUpdateArgs<ExtArgs>>): Prisma.Prisma__EmpresaClient<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EmpresaDeleteManyArgs>(args?: Prisma.SelectSubset<T, EmpresaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EmpresaUpdateManyArgs>(args: Prisma.SelectSubset<T, EmpresaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends EmpresaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EmpresaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends EmpresaUpsertArgs>(args: Prisma.SelectSubset<T, EmpresaUpsertArgs<ExtArgs>>): Prisma.Prisma__EmpresaClient<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EmpresaCountArgs>(args?: Prisma.Subset<T, EmpresaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EmpresaCountAggregateOutputType> : number>;
    aggregate<T extends EmpresaAggregateArgs>(args: Prisma.Subset<T, EmpresaAggregateArgs>): Prisma.PrismaPromise<GetEmpresaAggregateType<T>>;
    groupBy<T extends EmpresaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EmpresaGroupByArgs['orderBy'];
    } : {
        orderBy?: EmpresaGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EmpresaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmpresaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EmpresaFieldRefs;
}
export interface Prisma__EmpresaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    fazendas<T extends Prisma.Empresa$fazendasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Empresa$fazendasArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FazendaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    usuarios<T extends Prisma.Empresa$usuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Empresa$usuariosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EmpresaFieldRefs {
    readonly id: Prisma.FieldRef<"Empresa", 'String'>;
    readonly nome: Prisma.FieldRef<"Empresa", 'String'>;
    readonly cnpj: Prisma.FieldRef<"Empresa", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Empresa", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Empresa", 'DateTime'>;
}
export type EmpresaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
    where: Prisma.EmpresaWhereUniqueInput;
};
export type EmpresaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
    where: Prisma.EmpresaWhereUniqueInput;
};
export type EmpresaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
    where?: Prisma.EmpresaWhereInput;
    orderBy?: Prisma.EmpresaOrderByWithRelationInput | Prisma.EmpresaOrderByWithRelationInput[];
    cursor?: Prisma.EmpresaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmpresaScalarFieldEnum | Prisma.EmpresaScalarFieldEnum[];
};
export type EmpresaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
    where?: Prisma.EmpresaWhereInput;
    orderBy?: Prisma.EmpresaOrderByWithRelationInput | Prisma.EmpresaOrderByWithRelationInput[];
    cursor?: Prisma.EmpresaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmpresaScalarFieldEnum | Prisma.EmpresaScalarFieldEnum[];
};
export type EmpresaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
    where?: Prisma.EmpresaWhereInput;
    orderBy?: Prisma.EmpresaOrderByWithRelationInput | Prisma.EmpresaOrderByWithRelationInput[];
    cursor?: Prisma.EmpresaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmpresaScalarFieldEnum | Prisma.EmpresaScalarFieldEnum[];
};
export type EmpresaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmpresaCreateInput, Prisma.EmpresaUncheckedCreateInput>;
};
export type EmpresaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EmpresaCreateManyInput | Prisma.EmpresaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EmpresaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    data: Prisma.EmpresaCreateManyInput | Prisma.EmpresaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EmpresaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmpresaUpdateInput, Prisma.EmpresaUncheckedUpdateInput>;
    where: Prisma.EmpresaWhereUniqueInput;
};
export type EmpresaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EmpresaUpdateManyMutationInput, Prisma.EmpresaUncheckedUpdateManyInput>;
    where?: Prisma.EmpresaWhereInput;
    limit?: number;
};
export type EmpresaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmpresaUpdateManyMutationInput, Prisma.EmpresaUncheckedUpdateManyInput>;
    where?: Prisma.EmpresaWhereInput;
    limit?: number;
};
export type EmpresaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
    where: Prisma.EmpresaWhereUniqueInput;
    create: Prisma.XOR<Prisma.EmpresaCreateInput, Prisma.EmpresaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EmpresaUpdateInput, Prisma.EmpresaUncheckedUpdateInput>;
};
export type EmpresaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
    where: Prisma.EmpresaWhereUniqueInput;
};
export type EmpresaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmpresaWhereInput;
    limit?: number;
};
export type Empresa$fazendasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FazendaSelect<ExtArgs> | null;
    omit?: Prisma.FazendaOmit<ExtArgs> | null;
    include?: Prisma.FazendaInclude<ExtArgs> | null;
    where?: Prisma.FazendaWhereInput;
    orderBy?: Prisma.FazendaOrderByWithRelationInput | Prisma.FazendaOrderByWithRelationInput[];
    cursor?: Prisma.FazendaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FazendaScalarFieldEnum | Prisma.FazendaScalarFieldEnum[];
};
export type Empresa$usuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UsuarioSelect<ExtArgs> | null;
    omit?: Prisma.UsuarioOmit<ExtArgs> | null;
    include?: Prisma.UsuarioInclude<ExtArgs> | null;
    where?: Prisma.UsuarioWhereInput;
    orderBy?: Prisma.UsuarioOrderByWithRelationInput | Prisma.UsuarioOrderByWithRelationInput[];
    cursor?: Prisma.UsuarioWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UsuarioScalarFieldEnum | Prisma.UsuarioScalarFieldEnum[];
};
export type EmpresaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmpresaSelect<ExtArgs> | null;
    omit?: Prisma.EmpresaOmit<ExtArgs> | null;
    include?: Prisma.EmpresaInclude<ExtArgs> | null;
};
export {};
