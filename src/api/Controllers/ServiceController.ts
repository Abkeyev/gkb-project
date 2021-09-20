import { server } from "../axios";
import { baseURL } from "../const";
import { Request } from "../Models/ServiceModels";

export class ServiceController {
  // Documents
  async getDocuments(id: string): Promise<any> {
    return server.get(`/client_document/${id}`, {
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
  async downloadDocument(id: string): Promise<any> {
    return server.get(`/download_file/${id}`, {
      baseURL,
    });
  }
  async addDocument(id: string, data: any): Promise<any> {
    return server.post(`/client_document/${id}`, data, {
      baseURL,
      headers: {
        "Content-Type": `application/x-www-form-urlencoded`,
      },
    });
  }
  // Client
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

  async updateProfile(id: number, fields: any): Promise<any> {
    return server.put(`/user/${id}`, {
      ...fields
    }, {
      baseURL
    });
  }

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

  async getClient(id: string): Promise<any> {
    return server.get(`/client/${id}`, {
      baseURL,
    });
  }
  // Client Data
  async getAuthPersons(id: string) {
    return server.get(`/client/${id}/auth_person`, {
      baseURL,
    });
  }
  async getAuthPerson(id: string) {
    return server.get(`/client/auth_person/${id}`, {
      baseURL,
    });
  }
  async getUser(id: string) {
    return server.get(`/user/${id}`, {
      baseURL,
    });
  }
  async getClientUser(id: string) {
    return server.get(`/client/${id}/user`, {
      baseURL,
    });
  }
  async getClientService() {
    return server.get(`/client_service`, {
      baseURL,
    });
  }
  async getClientServiceType() {
    return server.get(`/service/type`, {
      baseURL,
    });
  }
  async sendType(request: Request): Promise<any> {
    return server.put(
      `/client_request/${request.id}`,
      {
        ...request,
        is_model_contract: !request.is_model_contract,
      },
      {
        baseURL,
      }
    );
  }
  async getClientContact(id: string) {
    return server.get(`/client/${id}/contact`, {
      baseURL,
    });
  }
  async getClientAddress(id: string) {
    return server.get(`/client/${id}/address`, {
      baseURL,
    });
  }
  async getClientAddressTypes() {
    return server.get(`/address_type`, {
      baseURL,
    });
  }
  async getClientBankDetails(id: string) {
    return server.get(`/client/${id}/bank_details`, {
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
  // Requests
  async getRequests(): Promise<any> {
    return server.get(`/client_request`, {
      baseURL,
    });
  }
  async getRequestStatus(): Promise<any> {
    return server.get(`/request/status`, {
      baseURL,
    });
  }
  async getRequest(id: string): Promise<any> {
    return server.get(`/client_request/${id}`, {
      baseURL,
    });
  }
  async addRequest(data: any): Promise<any> {
    return server.post(`/client_request`, data, {
      baseURL,
    });
  }
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
  async nextRequestStatus(): Promise<any> {
    return server.post(`/request/next_status`, {
      baseURL,
    });
  }
}
