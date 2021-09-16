import { server } from "../axios";
import { baseURL } from "../const";

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
  async downloadDocument(id: string): Promise<any> {
    return server.get(`/download_file/${id}`, {
      baseURL,
    });
  }
  // Client
  async getClientUsers(id: string): Promise<any> {
    return server.get(`/client/${id}/client_user`, {
      baseURL,
    });
  }
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
  async getRequest(id: string): Promise<any> {
    return server.get(`/client_request/${id}`, {
      baseURL,
    });
  }
}
