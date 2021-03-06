import { server } from "../axios";
import { baseURL } from "../const";

export class ClientController {
  // Client
  async auth(data: any): Promise<any> {
    return server.post(`/login`, data, {
      baseURL,
    });
  }
  async authEcp(data: any): Promise<any> {
    return server.post(`/user/auth`, data, {
      baseURL,
    });
  }
  async decileReg(id: string): Promise<any> {
    return server.delete(`/user/${id}/auth/decline`, {
      baseURL,
    });
  }
  async regClient(id: string, data: any): Promise<any> {
    return server.put(`/client/${id}`, data, {
      baseURL,
    });
  }
  async regAuthPerson(id: string, data: any): Promise<any> {
    return server.put(`/client/auth_person/${id}`, data, {
      baseURL,
    });
  }
  async getClients(): Promise<any> {
    return server.get(`/clients`, {
      baseURL,
    });
  }
  async getClientById(id: string): Promise<any> {
    return server.get(`/clients/${id}`, {
      baseURL,
    });
  }
  async createClient(bin: string): Promise<any> {
    return server.post(
      `/clients`,
      {
        bin,
      },
      {
        baseURL,
      }
    );
  }
  async editClient(data: any): Promise<any> {
    return server.put(
      `/clients`,
      {
        data,
      },
      {
        baseURL,
      }
    );
  }
  async deleteClient(id: string): Promise<any> {
    return server.delete(`/clients/${id}`, {
      baseURL,
    });
  }
  // Auth Persons
  async getAuthPersons(): Promise<any> {
    return server.get(`/auth_persons`, {
      baseURL,
    });
  }
  async getAuthPersonById(id: string): Promise<any> {
    return server.get(`/auth_persons/${id}`, {
      baseURL,
    });
  }
  async createAuthPerson(data: any): Promise<any> {
    return server.post(
      `/auth_persons`,
      {
        data,
      },
      {
        baseURL,
      }
    );
  }
  async editAuthPerson(data: any): Promise<any> {
    return server.put(
      `/auth_persons`,
      {
        data,
      },
      {
        baseURL,
      }
    );
  }
  async deleteAuthPerson(id: string): Promise<any> {
    return server.delete(`/auth_persons/${id}`, {
      baseURL,
    });
  }
  // Beneficial Owners
  async getBeneficialOwners(): Promise<any> {
    return server.get(`/beneficial_owners`, {
      baseURL,
    });
  }
  async getBeneficialOwnerById(id: string): Promise<any> {
    return server.get(`/beneficial_owners/${id}`, {
      baseURL,
    });
  }
  async createBeneficialOwner(data: any): Promise<any> {
    return server.post(
      `/beneficial_owners`,
      {
        data,
      },
      {
        baseURL,
      }
    );
  }
  async editBeneficialOwner(data: any): Promise<any> {
    return server.put(
      `/beneficial_owners`,
      {
        data,
      },
      {
        baseURL,
      }
    );
  }
  async deleteBeneficialOwner(id: string): Promise<any> {
    return server.delete(`/beneficial_owners/${id}`, {
      baseURL,
    });
  }
  // Users
  async getUsers(): Promise<any> {
    return server.get(`/users`, {
      baseURL,
    });
  }
  async getUserById(id: string): Promise<any> {
    return server.get(`/users/${id}`, {
      baseURL,
    });
  }
  async createUser(data: any): Promise<any> {
    return server.post(
      `/user`,
      {
        data,
      },
      {
        baseURL,
      }
    );
  }
  async editUser(id: number, data: any): Promise<any> {
    return server.put(`/user/${id}`, data, {
      baseURL,
    });
  }
  async deleteUser(id: number): Promise<any> {
    return server.delete(`/user/${id}`, {
      baseURL,
    });
  }
  // Client Users
  async getClientUsers(): Promise<any> {
    return server.get(`/client_users`, {
      baseURL,
    });
  }
  async getClientUserById(id: string): Promise<any> {
    return server.get(`/client_users/${id}`, {
      baseURL,
    });
  }
  async createClientUser(data: any): Promise<any> {
    return server.post(
      `/client_users`,
      {
        data,
      },
      {
        baseURL,
      }
    );
  }
  async regClientUser(data: any): Promise<any> {
    return server.post(`/client/user`, data, {
      baseURL,
    });
  }
  async editClientUser(id: number, data: any): Promise<any> {
    return server.put(`/client/user/${id}`, data, {
      baseURL,
    });
  }
  async deleteClientUser(id: number): Promise<any> {
    return server.delete(`/client/user/${id}`, {
      baseURL,
    });
  }
  async addUser(data: any): Promise<any> {
    return server.post(`/user`, data, {
      baseURL,
    });
  }
}
