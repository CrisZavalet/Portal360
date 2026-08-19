export interface SolicitudAusencias {
 idType: number;
  comments: string | null;
  durationType: 'HORAS' | 'UN_DIA' | 'VARIOS_DIAS';
  startDate: string;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
}