export interface ObtenerAusencias {
    idType: number;
    idEmployee: any;
    comments: string | null;
    durationType: 'HORAS' | 'UN_DIA' | 'VARIOS_DIAS';
    startDate: string;
    endDate: string | null;
    startTime: string | null;
    endTime: string | null;
    idState: number;
    idRequest: number;
    title: string;
    description: string;
    endDateResolution: string;
}