import { server } from "../axios";
import { baseURL } from "../const";

export class ServiceController {
  // Documents
  async getDocuments(): Promise<any> {
    return server.get(`/documents`, {
      baseURL,
    });
  }
  async getDocumentById(id: string): Promise<any> {
    return server.get(`/documents/${id}`, {
      baseURL,
    });
  }
  async createDocument(data: any): Promise<any> {
    return server.post(
      `/documents`,
      {
        data,
      },
      {
        baseURL,
      }
    );
  }
  async editDocument(data: any): Promise<any> {
    return server.put(
      `/documents`,
      {
        data,
      },
      {
        baseURL,
      }
    );
  }
  async deleteDocument(id: string): Promise<any> {
    return server.delete(`/documents/${id}`, {
      baseURL,
    });
  }
  // Services
  async getServices(): Promise<any> {
    return server.get(`/services`, {
      baseURL,
    });
  }
  async getServiceById(id: string): Promise<any> {
    return server.get(`/services/${id}`, {
      baseURL,
    });
  }
  async createService(data: any): Promise<any> {
    return server.post(
      `/services`,
      {
        data,
      },
      {
        baseURL,
      }
    );
  }
  // Requests
  async getRequests(): Promise<any> {
    return server.get(`/requests`, {
      baseURL,
    });
  }
  async getRequestById(id: string): Promise<any> {
    return server.get(`/requests/${id}`, {
      baseURL,
    });
  }
  async createRequest(data: any): Promise<any> {
    return server.post(
      `/requests`,
      {
        data,
      },
      {
        baseURL,
      }
    );
  }
  async editRequest(data: any): Promise<any> {
    return server.put(
      `/requests`,
      {
        data,
      },
      {
        baseURL,
      }
    );
  }
  // Addresses
  async getAddresses(): Promise<any> {
    return server.get(`/addresses`, {
      baseURL,
    });
  }
  async getAddressById(id: string): Promise<any> {
    return server.get(`/addresses/${id}`, {
      baseURL,
    });
  }
  async createAddress(data: any): Promise<any> {
    return server.post(
      `/addresses`,
      {
        data,
      },
      {
        baseURL,
      }
    );
  }
  async editAddress(data: any): Promise<any> {
    return server.put(
      `/addresses`,
      {
        data,
      },
      {
        baseURL,
      }
    );
  }
  async deleteAddress(id: string): Promise<any> {
    return server.delete(`/addresses/${id}`, {
      baseURL,
    });
  }
  //   Contacts
  async getContacts(): Promise<any> {
    return server.get(`/contacts`, {
      baseURL,
    });
  }
  async getContactById(id: string): Promise<any> {
    return server.get(`/contacts/${id}`, {
      baseURL,
    });
  }
  async createContact(data: any): Promise<any> {
    return server.post(
      `/contacts`,
      {
        data,
      },
      {
        baseURL,
      }
    );
  }
  async editContact(data: any): Promise<any> {
    return server.put(
      `/contacts`,
      {
        data,
      },
      {
        baseURL,
      }
    );
  }
  async deleteContact(id: string): Promise<any> {
    return server.delete(`/contacts/${id}`, {
      baseURL,
    });
  }
  //   Bank Details
  async getBankDetails(): Promise<any> {
    return server.get(`/bank_details`, {
      baseURL,
    });
  }
  async getBankDetailsById(id: string): Promise<any> {
    return server.get(`/bank_details/${id}`, {
      baseURL,
    });
  }
  async createBankDetails(data: any): Promise<any> {
    return server.post(
      `/bank_details`,
      {
        data,
      },
      {
        baseURL,
      }
    );
  }
  async editBankDetails(data: any): Promise<any> {
    return server.put(
      `/bank_details`,
      {
        data,
      },
      {
        baseURL,
      }
    );
  }
  async deleteBankDetails(id: string): Promise<any> {
    return server.delete(`/bank_details/${id}`, {
      baseURL,
    });
  }
}
