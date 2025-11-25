export interface CreateScheduleLockDTO {
  dentistId: number;
  startDate: string;
  endDate: string; 
  reason?: string;
}