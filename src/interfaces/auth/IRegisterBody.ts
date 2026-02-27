export interface IRegisterBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  phoneNumber: string;
  organization: string;
  enableEmailNotifications: boolean;
}