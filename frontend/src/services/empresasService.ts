import api from './api';

export interface Empresa {
    id: string;
    codigo?: string;
    razaoSocial?: string;
    nomeFantasia?: string;
    cnpj?: string;
    cpf?: string;
    inscricaoEstadual?: string;
    inscricaoMunicipal?: string;
    cei?: string;
    cnaeFiscal?: string;
    cfop?: string;

    // Flags
    ativo?: boolean;
    ignorarCaixaFinanceiro?: boolean;
    ignorarEstoque?: boolean;

    // Endereço Principal
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    cep?: string;

    // Contato
    telefone?: string;
    email?: string;
    site?: string;

    // Correspondência
    correspondenciaLogradouro?: string;
    correspondenciaNumero?: string;
    correspondenciaBairro?: string;
    correspondenciaCidade?: string;
    correspondenciaEstado?: string;
    correspondenciaCep?: string;

    // Fiscal
    lotacaoTributaria?: string;
    codigoFpas?: string;
    codigoGps?: string;
    outrasEntidades?: string;
    codigoFap?: string;
    codigoSimples?: string;
    aliquotaRat?: number;

    // Relações
    fazendas?: Fazenda[];
    socios?: any[];
}

import type { Fazenda } from './fazendasService';

export const empresasService = {
    getAll: async () => {
        const response = await api.get<Empresa[]>('/empresas');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get<Empresa>(`/empresas/${id}`);
        return response.data;
    },
    create: async (data: Partial<Empresa>) => {
        const response = await api.post<Empresa>('/empresas', data);
        return response.data;
    },
    update: async (id: string, data: Partial<Empresa>) => {
        const response = await api.patch<Empresa>(`/empresas/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await api.delete(`/empresas/${id}`);
    },
};
