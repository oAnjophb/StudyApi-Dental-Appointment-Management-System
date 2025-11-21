export interface CreateAppointmentDTO {
  patientId: number;
  dentistId: number;
  serviceId: number;
  startDateTime: string;
  notes?: string;
}