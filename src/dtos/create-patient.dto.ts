export interface CreatePatientDTO {
  name: string;
  phone: string;
  email?: string;
  birthDate?: string;

  zipCode?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;

  notes?: string;
}

export interface UpdatePatientDTO extends Partial<CreatePatientDTO> {}
