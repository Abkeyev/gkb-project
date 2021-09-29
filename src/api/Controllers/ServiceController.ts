import { server } from "../axios";
import { baseURL } from "../const";
import { Request } from "../Models/ServiceModels";

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
  async addDocument(id: number, data: any): Promise<any> {
    return server.post(`/client_document/${id}`, data, {
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

  async getClients(): Promise<any> {
    return server.get(`/client`, {
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
  async getClientAddress(id: number) {
    return server.get(`/client/${id}/address`, {
      baseURL,
    });
  }

  async getClientBankDetails(id: number) {
    return server.get(`/client/${id}/bank_details`, {
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

  async getSigningAuth(): Promise<any> {
    return server.get(`/signing_authority`, {
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
  async getSigningAuthority() {
    return server.get(`/signing_authority`, {
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
  async sendType(request: Request): Promise<any> {
    return server.put(
      `/client_request/${request.id}`,
      {
        ...request,
        client: request.client.id,
        is_model_contract: !request.is_model_contract,
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
