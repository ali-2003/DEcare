export interface AppointmentFormData {
  patientName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  address?: string;
  appointmentDate: string;
  serviceType: string;
  reason: string;
  symptoms?: string;
  additionalNotes?: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  iconGradient: string;
  durationColor: string;
}