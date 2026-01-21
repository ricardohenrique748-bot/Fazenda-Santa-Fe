import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type FazendaModel = runtime.Types.Result.DefaultSelection<Prisma.$FazendaPayload>;
export type AggregateFazenda = {
    _count: FazendaCountAggregateOutputType | null;
    _min: FazendaMinAggregateOutputType | null;
    _max: FazendaMaxAggregateOutputType | null;
};
export type FazendaMinAggregateOutputType = {
    id: string | null;
    nome: string | null;
    empresaId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FazendaMaxAggregateOutputType = {
    id: string | null;
    nome: string | null;
    empresaId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FazendaCountAggregateOutputType = {
    id: number;
    nome: number;
    empresaId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FazendaMinAggregateInputType = {
    id?: true;
    nome?: true;
    empresaId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FazendaMaxAggregateInputType = {
    id?: true;
    nome?: true;
    empresaId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FazendaCountAggregateInputType = {
    id?: true;
    nome?: true;
    empresaId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FazendaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FazendaWhereInput;
    orderBy?: Prisma.FazendaOrderByWithRelationInput | Prisma.FazendaOrderByWithRelationInput[];
    cursor?: Prisma.FazendaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FazendaCountAggregateInputType;
    _min?: FazendaMinAggregateInputType;
    _max?: FazendaMaxAggregateInputType;
};
export type GetFazendaAggregateType<T extends FazendaAggregateArgs> = {
    [P in keyof T & keyof AggregateFazenda]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFazenda[P]> : Prisma.GetScalarType<T[P], AggregateFazenda[P]>;
};
export type FazendaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FazendaWhereInput;
    orderBy?: Prisma.FazendaOrderByWithAggregationInput | Prisma.FazendaOrderByWithAggregationInput[];
    by: Prisma.FazendaScalarFieldEnum[] | Prisma.FazendaScalarFieldEnum;
    having?: Prisma.FazendaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FazendaCountAggregateInputType | true;
    _min?: FazendaMinAggregateInputType;
    _max?: FazendaMaxAggregateInputType;
};
export type FazendaGroupByOutputType = {
    id: string;
    nome: string;
    empresaId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: FazendaCountAggregateOutputType | null;
    _min: FazendaMinAggregateOutputType | null;
    _max: FazendaMaxAggregateOutputType | null;
};
type GetFazendaGroupByPayload<T extends FazendaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FazendaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FazendaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FazendaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FazendaGroupByOutputType[P]>;
}>>;
export type FazendaWhereInput = {
    AND?: Prisma.FazendaWhereInput | Prisma.FazendaWhereInput[];
    OR?: Prisma.FazendaWhereInput[];
    NOT?: Prisma.FazendaWhereInput | Prisma.FazendaWhereInput[];
    id?: Prisma.StringFilter<"Fazenda"> | string;
    nome?: Prisma.StringFilter<"Fazenda"> | string;
    empresaId?: Prisma.StringFilter<"Fazenda"> | string;
    createdAt?: Prisma.DateTimeFilter<"Fazenda"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Fazenda"> | Date | string;
    empresa?: Prisma.XOR<Prisma.EmpresaScalarRelationFilter, Prisma.EmpresaWhereInput>;
};
export type FazendaOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    empresaId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    empresa?: Prisma.EmpresaOrderByWithRelationInput;
};
export type FazendaWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.FazendaWhereInput | Prisma.FazendaWhereInput[];
    OR?: Prisma.FazendaWhereInput[];
    NOT?: Prisma.FazendaWhereInput | Prisma.FazendaWhereInput[];
    nome?: Prisma.StringFilter<"Fazenda"> | string;
    empresaId?: Prisma.StringFilter<"Fazenda"> | string;
    createdAt?: Prisma.DateTimeFilter<"Fazenda"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Fazenda"> | Date | string;
    empresa?: Prisma.XOR<Prisma.EmpresaScalarRelationFilter, Prisma.EmpresaWhereInput>;
}, "id">;
export type FazendaOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    empresaId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FazendaCountOrderByAggregateInput;
    _max?: Prisma.FazendaMaxOrderByAggregateInput;
    _min?: Prisma.FazendaMinOrderByAggregateInput;
};
export type FazendaScalarWhereWithAggregatesInput = {
    AND?: Prisma.FazendaScalarWhereWithAggregatesInput | Prisma.FazendaScalarWhereWithAggregatesInput[];
    OR?: Prisma.FazendaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FazendaScalarWhereWithAggregatesInput | Prisma.FazendaScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Fazenda"> | string;
    nome?: Prisma.StringWithAggregatesFilter<"Fazenda"> | string;
    empresaId?: Prisma.StringWithAggregatesFilter<"Fazenda"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Fazenda"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Fazenda"> | Date | string;
};
export type FazendaCreateInput = {
    id?: string;
    nome: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    empresa: Prisma.EmpresaCreateNestedOneWithoutFazendasInput;
};
export type FazendaUncheckedCreateInput = {
    id?: string;
    nome: string;
    empresaId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FazendaUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    empresa?: Prisma.EmpresaUpdateOneRequiredWithoutFazendasNestedInput;
};
export type FazendaUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    empresaId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FazendaCreateManyInput = {
    id?: string;
    nome: string;
    empresaId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FazendaUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FazendaUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    empresaId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FazendaListRelationFilter = {
    every?: Prisma.FazendaWhereInput;
    some?: Prisma.FazendaWhereInput;
    none?: Prisma.FazendaWhereInput;
};
export type FazendaOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FazendaCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    empresaId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FazendaMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    empresaId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FazendaMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nome?: Prisma.SortOrder;
    empresaId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FazendaCreateNestedManyWithoutEmpresaInput = {
    create?: Prisma.XOR<Prisma.FazendaCreateWithoutEmpresaInput, Prisma.FazendaUncheckedCreateWithoutEmpresaInput> | Prisma.FazendaCreateWithoutEmpresaInput[] | Prisma.FazendaUncheckedCreateWithoutEmpresaInput[];
    connectOrCreate?: Prisma.FazendaCreateOrConnectWithoutEmpresaInput | Prisma.FazendaCreateOrConnectWithoutEmpresaInput[];
    createMany?: Prisma.FazendaCreateManyEmpresaInputEnvelope;
    connect?: Prisma.FazendaWhereUniqueInput | Prisma.FazendaWhereUniqueInput[];
};
export type FazendaUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: Prisma.XOR<Prisma.FazendaCreateWithoutEmpresaInput, Prisma.FazendaUncheckedCreateWithoutEmpresaInput> | Prisma.FazendaCreateWithoutEmpresaInput[] | Prisma.FazendaUncheckedCreateWithoutEmpresaInput[];
    connectOrCreate?: Prisma.FazendaCreateOrConnectWithoutEmpresaInput | Prisma.FazendaCreateOrConnectWithoutEmpresaInput[];
    createMany?: Prisma.FazendaCreateManyEmpresaInputEnvelope;
    connect?: Prisma.FazendaWhereUniqueInput | Prisma.FazendaWhereUniqueInput[];
};
export type FazendaUpdateManyWithoutEmpresaNestedInput = {
    create?: Prisma.XOR<Prisma.FazendaCreateWithoutEmpresaInput, Prisma.FazendaUncheckedCreateWithoutEmpresaInput> | Prisma.FazendaCreateWithoutEmpresaInput[] | Prisma.FazendaUncheckedCreateWithoutEmpresaInput[];
    connectOrCreate?: Prisma.FazendaCreateOrConnectWithoutEmpresaInput | Prisma.FazendaCreateOrConnectWithoutEmpresaInput[];
    upsert?: Prisma.FazendaUpsertWithWhereUniqueWithoutEmpresaInput | Prisma.FazendaUpsertWithWhereUniqueWithoutEmpresaInput[];
    createMany?: Prisma.FazendaCreateManyEmpresaInputEnvelope;
    set?: Prisma.FazendaWhereUniqueInput | Prisma.FazendaWhereUniqueInput[];
    disconnect?: Prisma.FazendaWhereUniqueInput | Prisma.FazendaWhereUniqueInput[];
    delete?: Prisma.FazendaWhereUniqueInput | Prisma.FazendaWhereUniqueInput[];
    connect?: Prisma.FazendaWhereUniqueInput | Prisma.FazendaWhereUniqueInput[];
    update?: Prisma.FazendaUpdateWithWhereUniqueWithoutEmpresaInput | Prisma.FazendaUpdateWithWhereUniqueWithoutEmpresaInput[];
    updateMany?: Prisma.FazendaUpdateManyWithWhereWithoutEmpresaInput | Prisma.FazendaUpdateManyWithWhereWithoutEmpresaInput[];
    deleteMany?: Prisma.FazendaScalarWhereInput | Prisma.FazendaScalarWhereInput[];
};
export type FazendaUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: Prisma.XOR<Prisma.FazendaCreateWithoutEmpresaInput, Prisma.FazendaUncheckedCreateWithoutEmpresaInput> | Prisma.FazendaCreateWithoutEmpresaInput[] | Prisma.FazendaUncheckedCreateWithoutEmpresaInput[];
    connectOrCreate?: Prisma.FazendaCreateOrConnectWithoutEmpresaInput | Prisma.FazendaCreateOrConnectWithoutEmpresaInput[];
    upsert?: Prisma.FazendaUpsertWithWhereUniqueWithoutEmpresaInput | Prisma.FazendaUpsertWithWhereUniqueWithoutEmpresaInput[];
    createMany?: Prisma.FazendaCreateManyEmpresaInputEnvelope;
    set?: Prisma.FazendaWhereUniqueInput | Prisma.FazendaWhereUniqueInput[];
    disconnect?: Prisma.FazendaWhereUniqueInput | Prisma.FazendaWhereUniqueInput[];
    delete?: Prisma.FazendaWhereUniqueInput | Prisma.FazendaWhereUniqueInput[];
    connect?: Prisma.FazendaWhereUniqueInput | Prisma.FazendaWhereUniqueInput[];
    update?: Prisma.FazendaUpdateWithWhereUniqueWithoutEmpresaInput | Prisma.FazendaUpdateWithWhereUniqueWithoutEmpresaInput[];
    updateMany?: Prisma.FazendaUpdateManyWithWhereWithoutEmpresaInput | Prisma.FazendaUpdateManyWithWhereWithoutEmpresaInput[];
    deleteMany?: Prisma.FazendaScalarWhereInput | Prisma.FazendaScalarWhereInput[];
};
export type FazendaCreateWithoutEmpresaInput = {
    id?: string;
    nome: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FazendaUncheckedCreateWithoutEmpresaInput = {
    id?: string;
    nome: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FazendaCreateOrConnectWithoutEmpresaInput = {
    where: Prisma.FazendaWhereUniqueInput;
    create: Prisma.XOR<Prisma.FazendaCreateWithoutEmpresaInput, Prisma.FazendaUncheckedCreateWithoutEmpresaInput>;
};
export type FazendaCreateManyEmpresaInputEnvelope = {
    data: Prisma.FazendaCreateManyEmpresaInput | Prisma.FazendaCreateManyEmpresaInput[];
    skipDuplicates?: boolean;
};
export type FazendaUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: Prisma.FazendaWhereUniqueInput;
    update: Prisma.XOR<Prisma.FazendaUpdateWithoutEmpresaInput, Prisma.FazendaUncheckedUpdateWithoutEmpresaInput>;
    create: Prisma.XOR<Prisma.FazendaCreateWithoutEmpresaInput, Prisma.FazendaUncheckedCreateWithoutEmpresaInput>;
};
export type FazendaUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: Prisma.FazendaWhereUniqueInput;
    data: Prisma.XOR<Prisma.FazendaUpdateWithoutEmpresaInput, Prisma.FazendaUncheckedUpdateWithoutEmpresaInput>;
};
export type FazendaUpdateManyWithWhereWithoutEmpresaInput = {
    where: Prisma.FazendaScalarWhereInput;
    data: Prisma.XOR<Prisma.FazendaUpdateManyMutationInput, Prisma.FazendaUncheckedUpdateManyWithoutEmpresaInput>;
};
export type FazendaScalarWhereInput = {
    AND?: Prisma.FazendaScalarWhereInput | Prisma.FazendaScalarWhereInput[];
    OR?: Prisma.FazendaScalarWhereInput[];
    NOT?: Prisma.FazendaScalarWhereInput | Prisma.FazendaScalarWhereInput[];
    id?: Prisma.StringFilter<"Fazenda"> | string;
    nome?: Prisma.StringFilter<"Fazenda"> | string;
    empresaId?: Prisma.StringFilter<"Fazenda"> | string;
    createdAt?: Prisma.DateTimeFilter<"Fazenda"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Fazenda"> | Date | string;
};
export type FazendaCreateManyEmpresaInput = {
    id?: string;
    nome: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FazendaUpdateWithoutEmpresaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FazendaUncheckedUpdateWithoutEmpresaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FazendaUncheckedUpdateManyWithoutEmpresaInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nome?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FazendaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nome?: boolean;
    empresaId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    empresa?: boolean | Prisma.EmpresaDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fazenda"]>;
export type FazendaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nome?: boolean;
    empresaId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    empresa?: boolean | Prisma.EmpresaDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fazenda"]>;
export type FazendaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nome?: boolean;
    empresaId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    empresa?: boolean | Prisma.EmpresaDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fazenda"]>;
export type FazendaSelectScalar = {
    id?: boolean;
    nome?: boolean;
    empresaId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FazendaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "nome" | "empresaId" | "createdAt" | "updatedAt", ExtArgs["result"]["fazenda"]>;
export type FazendaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    empresa?: boolean | Prisma.EmpresaDefaultArgs<ExtArgs>;
};
export type FazendaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    empresa?: boolean | Prisma.EmpresaDefaultArgs<ExtArgs>;
};
export type FazendaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    empresa?: boolean | Prisma.EmpresaDefaultArgs<ExtArgs>;
};
export type $FazendaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Fazenda";
    objects: {
        empresa: Prisma.$EmpresaPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["fazenda"]>;
    composites: {};
};
export type FazendaGetPayload<S extends boolean | null | undefined | FazendaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FazendaPayload, S>;
export type FazendaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FazendaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FazendaCountAggregateInputType | true;
};
export interface FazendaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Fazenda'];
        meta: {
            name: 'Fazenda';
        };
    };
    findUnique<T extends FazendaFindUniqueArgs>(args: Prisma.SelectSubset<T, FazendaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FazendaClient<runtime.Types.Result.GetResult<Prisma.$FazendaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FazendaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FazendaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FazendaClient<runtime.Types.Result.GetResult<Prisma.$FazendaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FazendaFindFirstArgs>(args?: Prisma.SelectSubset<T, FazendaFindFirstArgs<ExtArgs>>): Prisma.Prisma__FazendaClient<runtime.Types.Result.GetResult<Prisma.$FazendaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FazendaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FazendaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FazendaClient<runtime.Types.Result.GetResult<Prisma.$FazendaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FazendaFindManyArgs>(args?: Prisma.SelectSubset<T, FazendaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FazendaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FazendaCreateArgs>(args: Prisma.SelectSubset<T, FazendaCreateArgs<ExtArgs>>): Prisma.Prisma__FazendaClient<runtime.Types.Result.GetResult<Prisma.$FazendaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FazendaCreateManyArgs>(args?: Prisma.SelectSubset<T, FazendaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FazendaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FazendaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FazendaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FazendaDeleteArgs>(args: Prisma.SelectSubset<T, FazendaDeleteArgs<ExtArgs>>): Prisma.Prisma__FazendaClient<runtime.Types.Result.GetResult<Prisma.$FazendaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FazendaUpdateArgs>(args: Prisma.SelectSubset<T, FazendaUpdateArgs<ExtArgs>>): Prisma.Prisma__FazendaClient<runtime.Types.Result.GetResult<Prisma.$FazendaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FazendaDeleteManyArgs>(args?: Prisma.SelectSubset<T, FazendaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FazendaUpdateManyArgs>(args: Prisma.SelectSubset<T, FazendaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FazendaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FazendaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FazendaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FazendaUpsertArgs>(args: Prisma.SelectSubset<T, FazendaUpsertArgs<ExtArgs>>): Prisma.Prisma__FazendaClient<runtime.Types.Result.GetResult<Prisma.$FazendaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FazendaCountArgs>(args?: Prisma.Subset<T, FazendaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FazendaCountAggregateOutputType> : number>;
    aggregate<T extends FazendaAggregateArgs>(args: Prisma.Subset<T, FazendaAggregateArgs>): Prisma.PrismaPromise<GetFazendaAggregateType<T>>;
    groupBy<T extends FazendaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FazendaGroupByArgs['orderBy'];
    } : {
        orderBy?: FazendaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FazendaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFazendaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FazendaFieldRefs;
}
export interface Prisma__FazendaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    empresa<T extends Prisma.EmpresaDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmpresaDefaultArgs<ExtArgs>>): Prisma.Prisma__EmpresaClient<runtime.Types.Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FazendaFieldRefs {
    readonly id: Prisma.FieldRef<"Fazenda", 'String'>;
    readonly nome: Prisma.FieldRef<"Fazenda", 'String'>;
    readonly empresaId: Prisma.FieldRef<"Fazenda", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Fazenda", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Fazenda", 'DateTime'>;
}
export type FazendaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FazendaSelect<ExtArgs> | null;
    omit?: Prisma.FazendaOmit<ExtArgs> | null;
    include?: Prisma.FazendaInclude<ExtArgs> | null;
    where: Prisma.FazendaWhereUniqueInput;
};
export type FazendaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FazendaSelect<ExtArgs> | null;
    omit?: Prisma.FazendaOmit<ExtArgs> | null;
    include?: Prisma.FazendaInclude<ExtArgs> | null;
    where: Prisma.FazendaWhereUniqueInput;
};
export type FazendaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FazendaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FazendaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FazendaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FazendaSelect<ExtArgs> | null;
    omit?: Prisma.FazendaOmit<ExtArgs> | null;
    include?: Prisma.FazendaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FazendaCreateInput, Prisma.FazendaUncheckedCreateInput>;
};
export type FazendaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FazendaCreateManyInput | Prisma.FazendaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FazendaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FazendaSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FazendaOmit<ExtArgs> | null;
    data: Prisma.FazendaCreateManyInput | Prisma.FazendaCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FazendaIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FazendaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FazendaSelect<ExtArgs> | null;
    omit?: Prisma.FazendaOmit<ExtArgs> | null;
    include?: Prisma.FazendaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FazendaUpdateInput, Prisma.FazendaUncheckedUpdateInput>;
    where: Prisma.FazendaWhereUniqueInput;
};
export type FazendaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FazendaUpdateManyMutationInput, Prisma.FazendaUncheckedUpdateManyInput>;
    where?: Prisma.FazendaWhereInput;
    limit?: number;
};
export type FazendaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FazendaSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FazendaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FazendaUpdateManyMutationInput, Prisma.FazendaUncheckedUpdateManyInput>;
    where?: Prisma.FazendaWhereInput;
    limit?: number;
    include?: Prisma.FazendaIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FazendaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FazendaSelect<ExtArgs> | null;
    omit?: Prisma.FazendaOmit<ExtArgs> | null;
    include?: Prisma.FazendaInclude<ExtArgs> | null;
    where: Prisma.FazendaWhereUniqueInput;
    create: Prisma.XOR<Prisma.FazendaCreateInput, Prisma.FazendaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FazendaUpdateInput, Prisma.FazendaUncheckedUpdateInput>;
};
export type FazendaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FazendaSelect<ExtArgs> | null;
    omit?: Prisma.FazendaOmit<ExtArgs> | null;
    include?: Prisma.FazendaInclude<ExtArgs> | null;
    where: Prisma.FazendaWhereUniqueInput;
};
export type FazendaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FazendaWhereInput;
    limit?: number;
};
export type FazendaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FazendaSelect<ExtArgs> | null;
    omit?: Prisma.FazendaOmit<ExtArgs> | null;
    include?: Prisma.FazendaInclude<ExtArgs> | null;
};
export {};
