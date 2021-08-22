export interface Client {
  client_type_id: string;
  longname: string;
  name: string;
  website: string;
  bin: string;
  reg_date: string;
  person_status_id: string;
}

export interface AuthPerson {
  full_name: string;
  position_id: string;
  sign_auth_id: string;
  reg_date: string;
  person_status_id: string;
  is_ecp: string;
}

export interface BeneficialOwner {
  full_name: string;
  client_auth_person_id: string;
  share: string;
  reg_date: string;
  person_status_id: string;
  is_main: string;
}

export interface User {
  client_auth_person_id: string;
  full_name: string;
  position_id: string;
  email: string;
  reg_date: string;
  person_status_id: string;
  user_role_id: string;
}

export interface ClientUser {
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
}
