import { server } from "../axios";
import { baseURL } from "../const";
import { Documents, Request } from "../Models/ServiceModels";

export class ServiceController {
  // ДОКУМЕНТЫ
  async getDocuments(id: number): Promise<any> {
    return server.get(`/client_document/${id}`, {
      baseURL,
    });
  }
  async getDocument(id: number): Promise<any> {
    return server.get(`/client/document/${id}`, {
      baseURL,
    });
  }
  async getDogovor(id: number): Promise<any> {
    return server.get(`/request/${id}/document`, {
      baseURL,
    });
  }
  async addDogovor(id: number, data: any): Promise<any> {
    return server.post(`/request/${id}/document`, data, {
      baseURL,
    });
  }
  async getDocumentCategories(): Promise<any> {
    return server.get(`/doc/category`, {
      baseURL,
    });
  }
  async getDocumentTypes(): Promise<any> {
    return server.get(`/doc/type`, {
      baseURL,
    });
  }
  async downloadDocument(id: number): Promise<any> {
    return server.get(`/download_file/${id}`, {
      responseType: "blob",
      baseURL,
    });
  }
  async downloadKeys(doc: Documents): Promise<any> {
    return server.get(
      `/request/${doc.id}/keys/download?doc_type=${doc.doc_type}`,
      {
        responseType: "blob",
        baseURL,
      }
    );
  }
  async addDocument(id: number, data: any): Promise<any> {
    return server.post(`/client_document/${id}`, data, {
      baseURL,
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
  }
  async deleteDocument(id: number, data: any): Promise<any> {
    return server.put(`/client/document/${id}`, data, {
      baseURL,
    });
  }
  async uploadKeys(id: number, data: any): Promise<any> {
    return server.post(`/request/${id}/keys/upload`, data, {
      baseURL,
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
  }
  // КЛИЕНТ
  async getClientTypes(): Promise<any> {
    return server.get(`/client_type`, {
      baseURL,
    });
  }
  async addClientTypes(data: any): Promise<any> {
    return server.post(`/client_type`, data, {
      baseURL,
    });
  }

  async getClients(): Promise<any> {
    return server.get(`/client`, {
      baseURL,
    });
  }

  async editClient(id: number, data: any): Promise<any> {
    return server.put(`/client/${id}`, data, {
      baseURL,
    });
  }

  async getClient(id: number): Promise<any> {
    return server.get(`/client/${id}`, {
      baseURL,
    });
  }
  async getAuthPersons(id: number) {
    return server.get(`/client/${id}/auth_person`, {
      baseURL,
    });
  }
  async setAuthPersons(id: number, data: any) {
    return server.put(`/client/auth_person/${id}`, data, {
      baseURL,
    });
  }
  async getAuthPerson(id: number) {
    return server.get(`/client/auth_person/${id}`, {
      baseURL,
    });
  }
  async getClientUser(id: number) {
    return server.get(`/client/user/${id}`, {
      baseURL,
    });
  }
  async getClientUsersForAdd(id: number) {
    return server.get(`/client/${id}/user`, {
      baseURL,
    });
  }
  async getClientService() {
    return server.get(`/client_service`, {
      baseURL,
    });
  }
  async getClientServices(id: number) {
    return server.get(`/client/${id}/service`, {
      baseURL,
    });
  }
  async getClientServiceById(id: number) {
    return server.get(`/client_service/${id}`, {
      baseURL,
    });
  }
  async getClientContact(id: number) {
    return server.get(`/client/${id}/contact`, {
      baseURL,
    });
  }
  async addClientContact(data: any) {
    return server.post(`/client/contact`, data, {
      baseURL,
    });
  }
  async editClientContact(id: number, data: any) {
    return server.put(`/client/contact/${id}`, data, {
      baseURL,
    });
  }
  async getClientAddress(id: number) {
    return server.get(`/client/${id}/address`, {
      baseURL,
    });
  }
  async editClientAddress(id: number, data: any) {
    return server.put(`/client/address/${id}`, data, {
      baseURL,
    });
  }

  async getClientBankDetails(id: number) {
    return server.get(`/client/${id}/bank_details`, {
      baseURL,
    });
  }
  async editClientBankDetails(id: number, data: any) {
    return server.put(`/client/bank_details/${id}`, data, {
      baseURL,
    });
  }
  // ПОЛЬЗОВАТЕЛЬ
  async getClientUsers(id: number) {
    return server.get(`/user/client/${id}`, {
      baseURL,
    });
  }
  async getUser(id: number) {
    return server.get(`/user/${id}`, {
      baseURL,
    });
  }
  async getUsers() {
    return server.get(`/user`, {
      baseURL,
    });
  }
  async updateProfile(id: number, fields: any): Promise<any> {
    return server.put(
      `/user/${id}`,
      {
        ...fields,
      },
      {
        baseURL,
      }
    );
  }
  async getSigners(id: number): Promise<any> {
    return server.get(`/user/signing_auth/${id}`, {
      baseURL,
    });
  }
  // СПРАВОЧНИК
  async getPosition(): Promise<any> {
    return server.get(`/position`, {
      baseURL,
    });
  }

  async addPosition(data: any): Promise<any> {
    return server.post(`/position`, data, {
      baseURL,
    });
  }

  async getSigningAuth(): Promise<any> {
    return server.get(`/signing_authority`, {
      baseURL,
    });
  }

  async addSigningAuth(data: any): Promise<any> {
    return server.post(`/signing_authority`, data, {
      baseURL,
    });
  }

  async getClientServiceType() {
    return server.get(`/service/type`, {
      baseURL,
    });
  }
  async getClientAddressTypes() {
    return server.get(`/address_type`, {
      baseURL,
    });
  }
  async getPersonStatus() {
    return server.get(`/person_status`, {
      baseURL,
    });
  }
  // ЗАЯВКИ
  async getRequests(): Promise<any> {
    return server.get(`/client_request`, {
      baseURL,
    });
  }
  async getClientRequests(id: number): Promise<any> {
    return server.get(`/client/${id}/request`, {
      baseURL,
    });
  }
  async getRequestStatus(): Promise<any> {
    return server.get(`/request/status`, {
      baseURL,
    });
  }
  async getRequest(id: number): Promise<any> {
    return server.get(`/client_request/${id}`, {
      baseURL,
    });
  }
  async getMineRequest(id: number): Promise<any> {
    return server.get(`/request/mine/${id}`, {
      baseURL,
    });
  }
  async addRequest(data: any): Promise<any> {
    return server.post(`/client_request`, data, {
      baseURL,
    });
  }
  async sendAgree(request: Request): Promise<any> {
    return server.put(
      `/client_request/${request.id}`,
      {
        ...request,
        request_status: 11,
      },
      {
        baseURL,
      }
    );
  }
  async sendType(request: Request): Promise<any> {
    return server.put(
      `/client_request/${request.id}`,
      {
        ...request,
        client: request.client.id,
        is_model_contract: !request.is_model_contract,
        request_status: 2,
      },
      {
        baseURL,
      }
    );
  }
  async updateRequest(request: Request, data: object): Promise<any> {
    return server.put(
      `/client_request/${request.id}`,
      {
        ...request,
        client: request.client.id,
        ...data,
      },
      {
        baseURL,
      }
    );
  }
  // ПРОЦЕСС ЗАЯВКИ
  async endRequest(request: Request, comment: string): Promise<any> {
    return server.post(
      `/request/${request.id}/decline`,
      { comment },
      {
        baseURL,
      }
    );
  }
  async getServiceDesk(): Promise<any> {
    return server.get(`/service_desk/dashboard`, {
      baseURL,
    });
  }
  async nextRequest(request: Request): Promise<any> {
    return server.get(`/client_request/next_step/${request.id}`, {
      baseURL,
    });
  }
  async nextRequestStatus(id: number, userId: number): Promise<any> {
    return server.post(
      `/request/${id}/next_status`,
      {
        responsible_user: userId,
      },
      {
        baseURL,
      }
    );
  }
  async toSign(id: number, request_id: number): Promise<any> {
    return server.get(`/request/to_sign/${id}?request_id=${request_id}`, {
      baseURL,
    });
  }
  async signDoc(id: number, request_id: number): Promise<any> {
    return server.get(`/doc/${id}/sign?request_id=${request_id}`, {
      baseURL,
    });
  }
  // ПРОЦЕСС СОГЛАСОВАНИЯ
  async toReview(id: number, data: any): Promise<any> {
    return server.post(
      `/request/start_review/${id}`,
      { data },
      {
        baseURL,
      }
    );
  }
  async addReview(id: number, data: any): Promise<any> {
    return server.post(
      `/request/user_review/${id}`,
      { data },
      {
        baseURL,
      }
    );
  }
  async getReview(id: number): Promise<any> {
    return server.get(`/request/review_result/${id}`, {
      baseURL,
    });
  }
  // ПОДПИСАНИЕ ФАЙЛА BASE64
  async uploadSignedFile(id: number, data: any): Promise<any> {
    return server.post(`/request/${id}/upload_signed_file`, data, {
      baseURL,
    });
  }
  async downloadFileForSign(id: number): Promise<any> {
    return server.get(`/request/${id}/download_file_for_sign`, {
      baseURL,
    });
  }
  async downloadSignedFile(id: number): Promise<any> {
    return server.get(`/request/${id}/download_signed_file`, {
      baseURL,
    });
  }
}
