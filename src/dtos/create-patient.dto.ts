export interface CreatePatientDTO {
    name: string
    phone: string
    email?: string
    birthDate?: string
    address?: string
    notes?: string
}

export interface UpdatePatientDTO extends Partial<CreatePatientDTO> {}