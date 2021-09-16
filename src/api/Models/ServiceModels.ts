export interface Request {
  id: number;
  service_category: number;
  name_uid: number;
  reg_date: Date;
  fulfill_date: Date;
  client_data: Client;
  service_type: number;
  client_doc: number;
  request_status: number;
  responsible_user: number;
  request_stepper: number;
  client_user: number[];
}

export interface ClientUsers {
  id: string;
  first_head_full_name: string;
  deputy_head_full_name: string;
  manager_full_name: string;
  manager_contacts: string;
  full_name: string;
  iin: string;
  idcard_number: string;
  position_name: string;
  department_name: string;
  contacts: string;
  email: string;
  global_ip: string;
  client: string;
}

export interface Client {
  id: string;
  longname: string;
  name: string;
  website: string;
  bin: string;
  reg_date: string;
  client_type: number;
  person_status: number;
  oked: boolean | null;
}

export interface AuthPerson {
  id: number;
  full_name: string;
  reg_date: string;
  is_ecp: boolean;
  client: number;
  position: number | null;
  sign_auth: number;
  person_status: number;
}

export interface ClientUser {
  id: number;
  full_name: string;
  email: string;
  reg_date: string;
  client: number;
  client_auth_person: number;
  position: number | null;
  person_status: number;
  user_auth: number;
}

export interface ClientService {
  id: number;
  service_category: number;
  date_from: string;
  date_to: string;
  client: number;
  service_type: number;
  client_doc: number;
  client_user: number[];
}

export interface ClientServiceType {
  id: number;
  name: string;
}

export interface Contact {
  id: number;
  phone_number: string;
  is_main: boolean;
  client: number;
  client_auth_person: number;
}

export interface Address {
  id: number;
  full_address: string;
  street: string;
  building: string;
  is_main: boolean;
  client: number;
  address_type: number;
  kato: string | null;
}

export interface AddressTypes {
  id: number;
  name: string;
  address: Address[];
}

export interface BankDetail {
  id: number;
  iik: string;
  bik: string;
  client: number;
}

export interface ClientTypes {
  id: number;
  name: string;
}

export interface SigningAuthority {
  id: number;
  name: string;
}

export interface PersonStatus {
  id: number;
  name: string;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  reg_date: string;
  client: number;
  client_auth_person: number;
  position: number | null;
  person_status: number;
  user_auth: number;
}

export interface Documents {
  id: string;
  doc_name: string;
  doc_link: string;
  doc_status: string;
  is_draft: boolean;
  is_signed_by_agent: boolean;
  is_signed_by_both: boolean;
  client: number;
  doc_category: number;
  doc_type: number;
  service_type: number;
}

export interface Categories {
  id: string;
  name: string;
  doc_type: string;
  documents: Documents[];
}
