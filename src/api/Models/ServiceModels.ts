export interface Document {
  doc_link: string;
  doc_category_id: string;
  doc_type_id: string;
  service_type_id: string;
  name: string;
  doc_status: string;
  is_signed_by_agent: string;
  is_signed_by_both: string;
  is_draft: string;
}

export interface Service {
  service_category: string;
  service_type_id: string;
  client_request_id: string;
  client_doc_ids: string;
  date_from: string;
  date_to: string;
  client_user_ids: string;
}

export interface Request {
  service_category: string;
  service_type_id: string;
  name: string; //name/uid/#
  client_doc_ids: string;
  reg_date: string;
  fulfill_date: string;
  request_status_id: string;
  client_user_ids: string;
}

export interface Address {
  address_type_id: string;
  full_address: string;
  post_code: string;
  region_id: string;
  district_id: string;
  city_id: string;
  street: string;
  building: string;
  is_main: string;
}

export interface Contact {
  client_auth_person_id: string;
  phone_number: string;
  is_main: string;
}

export interface BankDetail {
  iik: string;
  bik: string;
}
