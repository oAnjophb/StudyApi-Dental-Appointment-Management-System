import { AppointmentStatus } from "@prisma/client";

export interface UpdateAppointmentStatusDTO {
  status: AppointmentStatus;
  notes?: string;
}
