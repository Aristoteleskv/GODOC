export interface Documento {
    id?: string;
    de: number;
    idPasta: number;
    idPara: string[];
    idDp: string[];
    projecto: string;
    nRegisto: number;
    dataEntrada: string;
    rubrica: string;
    tmp_name?: string;  
}