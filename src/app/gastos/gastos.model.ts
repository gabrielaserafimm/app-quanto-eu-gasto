import { ContaBancaria } from '../conta-bancaria/conta-bancaria.model';

export interface Gasto {
    id: number;
    nome: string;
    metod_pag: MetodoPagamento;
    valor: number;
    data: Date;
    mes: Mes;
    contas: ContaBancaria[];
}

export enum MetodoPagamento{
    CARTAOCRED = 'Cartão de Crédito',
    CARTAODEB  = 'Cartao de Débito',
    DINHEIRO   = 'Dinheiro',
}

export enum Mes{
    JANEIRO   = 'Janeiro',
    FEVEREIRO = 'Fevereiro',
    MARCO     = 'Março',
    ABRIL     = 'Abril',
    MAIO      = 'Maio',
    JUNHO     = 'Junho',
    JULHO     = 'Julho',
    AGASTO    = 'Agosto',
    SETEMBRO  = 'Setembro',
    OUTUBRO   = 'Outubro',
    NOVEMBRO  = 'Novembro',
    DEZEMBRO  = 'Dezembro',
}

export interface Renda {
    id: number;
    nomeRenda: string;
    descricao: string;
    metod_pag: MetodoPagamento;
    valor: number;
    data: Date;
}