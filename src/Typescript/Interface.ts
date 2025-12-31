export interface LoginFormData {
  email: string;
  password: string;
}

export interface AddStudentFormData {
  fName: string;
  lName: string;
  class: string;
  rNumber: string;
  email: string;
}

export interface StudentData {
  $id: string;
  firstName: string;
  lastName: string;
  class: string;
  roll: string;
  email: string;
}


export interface PersonalInfo {
  fullName: string;
  dob: string;
  gender: string;
}

export interface AddressDetails {
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  linkedin?: string;
}

export interface Education {
  id?: string;
  level: string;
  schoolOrCollege: string;
  passingYear: string;
  marks: string;
}

export interface Experience {
  id?: string;
  companyName: string;
  jobRole: string;
  startDate?: string;
  endDate?: string;
}

export interface ApplyFor {
  jobRole: string;
  lastSalary: string;
  expectedSalary: string;
}

export interface FormData {
  personalInfo: PersonalInfo;
  addressDetails: AddressDetails;
  contactInfo: ContactInfo;
  education: Education[];
  experience: Experience[];
  applyFor: ApplyFor;
  termsAccepted: boolean;
}