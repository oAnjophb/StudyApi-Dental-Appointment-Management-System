import { Weekday } from "@prisma/client";

export interface CreateAvailabilityDTO {
  dentistId: number;
  weekday: Weekday;
  startTime: string; 
  endTime: string;   
}