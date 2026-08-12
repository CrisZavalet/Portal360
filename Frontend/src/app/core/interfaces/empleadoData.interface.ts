export interface EmpleadoData {
  idEmployee: number;
  dni: string;
  name: string;
  lastName: string;
  username: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  address: string | null;
  location: string | null;
  iban: string | null;
  department: string | null;
  startDate: string | null;
  position: string;
  active: boolean;
  role: string;
}
