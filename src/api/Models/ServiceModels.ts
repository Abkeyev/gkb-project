export interface Request {
  id: number;
  client: Client;
  client_comment: string;
  client_doc: number[];
  client_user: number[];
  service_category: number;
  name_uid: number;
  reg_date: Date;
  fulfill_date: Date;
  service_type: number;
  request_status: number;
  responsible_user: number;
  request_stepper: number;
  is_model_contract: boolean;
  counterparty_signer_user: number;
  manager_signer_user: number;
}

export interface Agree {
  user_name: number[];
  process_type: "Sequential" | "Parallel";
  process_number: number;
}

export interface AgreeResult {
  review_data: Result[];
  process_type: "Sequential" | "Parallel";
  process_number: number;
}

export interface Result {
  is_approved: boolean | null;
  user_id: number;
}

export interface ClientUsers {
  id: number;
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
  id: number;
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

export interface ServiceCommon {
  id: number;
  name: string;
}

export interface DocCategory {
  id: number;
  name: string;
  doc_type: number;
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
  id: number;
  doc_name: string;
  doc_link: string;
  doc_status: string;
  is_draft: boolean;
  comments: string;
  is_signed_by_agent: boolean;
  is_signed_by_both: boolean;
  client: number;
  doc_category: number;
  doc_type: number;
  service_type: number;
  version: number;
}

export interface Categories {
  id: number;
  name: string;
  doc_type: string;
  documents: Documents[];
}
