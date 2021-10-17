import { action, computed, makeAutoObservable, runInAction, toJS } from 'mobx';
import {
  Request,
  Documents,
  Categories,
  ClientUsers,
  Client,
  User,
  AuthPerson,
  Contact,
  Address,
  AddressTypes,
  BankDetail,
  ClientService,
  ServiceCommon,
  Agree,
  AgreeResult,
  Result,
  ServiceDesk,
} from '../api/Models/ServiceModels';
import { signWithBase64 } from '../ncaLayer';
import api from '../api/Api';
import { downloadBlob } from '../utils/utils';

class RequestStore {
  // custom
  step: number = 1;
  tab: number = 0;
  tabIndexReq: number = 0;
  tabIndexPar: number = 0;
  agreement: boolean = false;
  agreementPar: boolean = false;
  notTypical: boolean = false;
  ready: boolean = false;
  step1: boolean = false;
  step2: boolean = false;
  step3: boolean = false;
  step1status: boolean = false;
  step2status: boolean = false;
  signStep: number = 0;
  agreeTwoStep: number = 0;
  agreeParStep: number = 0;
  signTwoStep: number = 0;
  signTwoUsers: number[] = [];
  addedFiles: number[] = [];
  agreeUsers: number[] = [];
  agreeGroup: Agree[] = [];
  requestId: number | null = null;
  base64file: string = '';
  service: string = '';
  data: any | null = null;
  signType: boolean = true;
  signNotType: boolean = false;
  agreeNotType: boolean = true;
  testKey: Documents | null = null;
  prodKey: Documents | null = null;
  testAct: Documents | null = null;
  testProt: Documents | null = null;

  private requests: Request[] | [];
  private reviews: AgreeResult[] | [];
  private mineRequests: Request[] | [];
  private voteRequests: Request[] | [];
  private documents: Documents[] | [];
  private dogovors: Documents[] | [];
  private doc: Documents | null;
  private tempDoc: Documents | null;
  private request: Request | null;
  private clientTypes: ClientTypes[];
  private clients: Client[];
  private clientUsers: Client[] | [];
  private serviceUsers: ClientUsers[] | [];
  private clientDocs: Documents[] | [];
  private clientUsersForAdd: ClientUsers[] | [];
  private client: Client | null;
  private someClient: Client | null;
  private authPersons: AuthPerson[] | [];
  private authPerson: AuthPerson | null;
  private contacts: Contact[] | [];
  private address: Address[] | [];
  private addressTypes: AddressTypes[] | [];
  private bankDetails: BankDetail[] | [];
  private signingAuthority: ServiceCommon[] | [];
  private personStatus: ServiceCommon[] | [];
  private manUser: User | null;
  private conSigner: User | null;
  private manSigner: User | null;
  private clientUser: ClientUsers[] | [];
  private clientService: ClientService[] | [];
  private clientServiceById: ClientService | null;
  private user: User | null;
  private users: User[] | [];
  private allUsers: User[] | [];
  private clientServiceType: ServiceCommon[] | [];
  private position: ServiceCommon[] | [];
  private signingAuth: ServiceCommon[] | [];
  private types: ServiceCommon[] | [];
  private categories: Categories[] | [];
  private requestStatus: ServiceCommon[] | [];
  private signers: any[] | [];
  private serviceDesk: ServiceDesk[] | [];
  private getDocCategories: Categories[] | [];

  get _getRequests() {
    return this.requests;
  }
  get _getDocCategories() {
    return this.getDocCategories;
  }
  get _getDogovors() {
    return this.dogovors;
  }
  get _getServiceDesk() {
    return this.serviceDesk;
  }
  get _getReviews() {
    return this.reviews;
  }
  get _getMineRequests() {
    return this.mineRequests;
  }
  get _getVoteRequests() {
    return this.voteRequests;
  }
  get _getClientUsersForAdd() {
    return this.clientUsersForAdd;
  }
  get _getServiceUsers() {
    return this.serviceUsers;
  }
  get _getAllUsers() {
    return this.allUsers;
  }
  get _getSigners() {
    return this.signers;
  }
  get _getSigningAuthority() {
    return this.signingAuthority;
  }
  get _getDocuments() {
    return this.documents;
  }
  get _getDoc() {
    return this.doc;
  }
  get _getTempDoc() {
    return this.tempDoc;
  }
  get _getCategories() {
    return this.categories;
  }
  get _getTypes() {
    return this.types;
  }
  get _getRequest() {
    return this.request;
  }
  get _getClientTypes() {
    return this.clientTypes;
  }
  get _getClients() {
    return this.clients;
  }
  get _getSomeClient() {
    return this.someClient;
  }
  get _getClient() {
    return this.client;
  }
  get _getAuthPersons() {
    return this.authPersons;
  }
  get _getContacts() {
    return this.contacts;
  }
  get _getAddress() {
    return this.addressTypes;
  }
  get _getBankDetails() {
    return this.bankDetails;
  }
  get _getPersonStatus() {
    return this.personStatus;
  }
  get _getClientUser() {
    return this.clientUser;
  }
  get _getClientService() {
    return this.clientService;
  }
  get _getClientServiceById() {
    return this.clientServiceById;
  }
  get _getClientServiceType() {
    return this.clientServiceType;
  }
  get _getUser() {
    return this.user;
  }
  // Organization and ContractorsInner
  get _getUsers() {
    return this.users;
  }
  get _getPosition() {
    return this.position;
  }
  get _getSigningAuth() {
    return this.signingAuth;
  }
  get _getRequestStatus() {
    return this.requestStatus;
  }
  get _getManUser() {
    return this.manUser;
  }
  get _getAuthPerson() {
    return this.manUser;
  }
  get _getConSigner() {
    return this.conSigner;
  }
  get _getManSigner() {
    return this.manSigner;
  }
  get _getClientUsers() {
    return this.clientUsers;
  }
  get _getClientDocs() {
    return this.clientDocs;
  }
  get _getClientAddress() {
    return this.address;
  }

  get getAgreeStatus() {
    let temp = true;
    if (this.reviews.length === 0) {
      return false;
    } else {
      this.reviews.map((r: AgreeResult) =>
        r.review_data.map((u: Result) => {
          if (!u.is_approved) temp = false;
        })
      );
    }
    return temp;
  }

  get getLastVersion() {
    let lastVersion = 1;
    this._getDogovors &&
      this._getDogovors.map((d: Documents) => {
        if (d.version > lastVersion) lastVersion = d.version;
      });
    return ++lastVersion;
  }

  setManUser(manUser: User | null) {
    if (manUser) this.manUser = manUser;
  }

  setStep(step: number) {
    this.step = step;
  }

  setSignStep(step: number) {
    this.signStep = step;
  }

  setSignTwoStep(signTwoStep: number) {
    this.signTwoStep = signTwoStep;
  }

  setNotTypical(notTypical: boolean) {
    this.notTypical = notTypical;
  }

  setAgreement(agreement: boolean) {
    this.agreement = agreement;
  }

  setAgreementPar(agreementPar: boolean) {
    this.agreementPar = agreementPar;
  }

  setManSigner(manSigner: User | null) {
    this.manSigner = manSigner;
  }

  async getRequests() {
    await api.service.getRequests().then((r: Request[]) => {
      this.requests = r;
      this.request = null;
      this.setStep(1);
    });
  }

  async getServiceDesk() {
    await api.service.getServiceDesk().then((r: ServiceDesk[]) => {
      this.serviceDesk = r;
    });
  }

  async getClientRequests(id: number) {
    await api.service
      .getClientRequests(id)
      .then((r: Request[]) => (this.requests = r));
  }

  async getMineRequest(id: number) {
    await api.service
      .getMineRequest(id)
      .then((r: Request[]) => (this.mineRequests = r));
  }

  async getVoteRequest(id: number) {
    await api.service
      .getVoteRequest(id)
      .then((r: Request[]) => (this.voteRequests = r));
  }

  async getDogovor(id: number) {
    await api.service.getDogovor(id).then((d: Documents[]) => {
      this.dogovors = d;
    });
  }

  async downloadSignedFile(id: number) {
    await api.service
      .downloadSignedFile(id)
      .then(() =>
        runInAction(
          async () =>
            this._getRequest && (await this.getDogovor(this._getRequest.id))
        )
      );
  }

  async getRequest(id: number, clientId: number | null = null) {
    this.manUser = null;
    await api.service.getRequest(id).then((r: Request) => {
      r.client && this.getClient(r.client.id);
      r.client && this.getDocuments(r.client.id);
      r.responsible_user && this.getManUser(r.responsible_user);
      r.counterparty_signer_user &&
        this.getConSigner(r.counterparty_signer_user);
      r.manager_signer_user && this.getManSigner(r.manager_signer_user);
      clientId && this.getSigners(clientId);
      !r.is_model_contract && this.getReview(r.id);
      r.client && this.getClientAllUsers(r.client.id);
      console.log(r.client_user, 'r.client_user');
      r.client_user && this.getClientUsers(r.client_user);
      r.client_doc && this.getClientDocs(r.client_doc, r);
      this.getDogovor(id);
      r.request_stepper > 1 && this.setStep(r.request_stepper);
      if (
        r.request_status === 5 ||
        r.request_status === 6 ||
        r.request_status === 9
      ) {
        this.agreeNotType = false;
        this.signNotType = true;
        this.signType = true;
      } else {
        this.signType = true;
        this.agreeNotType = true;
        this.signNotType = false;
      }
      this.request = r;
    });
  }
  // Client User Пользователи
  async regClientUser(data: any) {
    await api.client
      .regClientUser(data)
      .then(() =>
        runInAction(async () => await this.getClientUsersForAdd(data.client))
      );
  }

  async editClientUser(id: number, data: any) {
    await api.client
      .editClientUser(id, data)
      .then(() =>
        runInAction(async () => await this.getClientUsersForAdd(data.client))
      );
  }

  async deleteClientUser(clientId: number, id: number) {
    await api.client
      .deleteClientUser(id)
      .then(() =>
        runInAction(async () => await this.getClientUsersForAdd(clientId))
      );
  }
  // User Пользователи
  async getUsers() {
    await api.service.getUsers().then((r: User[]) => (this.allUsers = r));
  }
  async addUser(data: any) {
    await api.client
      .addUser(data)
      .then(() =>
        runInAction(async () => await this.getClientAllUsers(data.client))
      );
  }
  async editUser(id: number, data: any) {
    await api.client
      .editUser(id, data)
      .then(() =>
        runInAction(async () => await this.getClientAllUsers(data.client_id))
      );
  }

  async deleteUser(clientId: number, id: number) {
    await api.client
      .deleteUser(id)
      .then(() =>
        runInAction(async () => await this.getClientAllUsers(clientId))
      );
  }

  async getClientUsersForAdd(id: number) {
    await api.service
      .getClientUsersForAdd(id)
      .then((res) => (this.clientUsersForAdd = res));
  }

  async getRequestStatus() {
    await api.service
      .getRequestStatus()
      .then((r: ServiceCommon[]) => (this.requestStatus = r));
  }

  async addRequest(data: any) {
    await api.service.addRequest(data).catch((err) => console.error(err));
  }

  async updateUser(id: number, fields: any) {
    await api.service.updateProfile(id, fields).then(() => {
      this.getUser(id);
    });
  }

  async getUser(id: number) {
    await api.service.getUser(id).then((r: User) => (this.user = r));
  }

  async getSigners(id: number) {
    await api.service
      .getSigners(id)
      .then((signers: any[]) => (this.signers = signers));
  }

  async getDocuments(id: number) {
    await api.service
      .getDocuments(id)
      .then(
        (r: Documents[]) =>
          r &&
          (this.documents = r.filter(
            (rr: Documents) => rr.doc_status !== 'Archive'
          ))
      )
      .then(() => runInAction(async () => await this.getDocumentsCategories()));
  }

  // Используеться: in all components
  async getClientTypes() {
    await api.service
      .getClientTypes()
      .then((r: ClientTypes[]) => (this.clientTypes = r));
  }

  async addClientTypes(data: any, callBack?: any) {
    await api.service
      .addClientTypes(data)
      .then(() => runInAction(async () => await this.getClientTypes()));
    if (callBack) {
      await callBack();
    }
  }

  async getPosition() {
    await api.service
      .getPosition()
      .then((r: ServiceCommon[]) => (this.position = r));
  }

  async addPosition(data: any, callBack?: any) {
    await api.service
      .addPosition(data)
      .then(() => runInAction(async () => await this.getPosition()));
    if (callBack) {
      await callBack();
    }
  }

  async getClients() {
    await api.service.getClients().then((r: Client[]) => (this.clients = r));
  }

  //Используется: Organization and Profile

  async getClient(id: number) {
    await api.service.getClient(id).then((r: Client) => (this.client = r));
  }

  async editClient(id: number, data: any) {
    await api.service
      .editClient(id, data)
      .then((r: Client) => (this.client = r));
  }

  async getManUser(id: number) {
    await api.service.getUser(id).then((r: User) => (this.manUser = r));
  }

  async getConSigner(id: number) {
    await api.service.getUser(id).then((u: User) => (this.conSigner = u));
  }

  async getManSigner(id: number) {
    await api.service.getUser(id).then((u: User) => (this.manSigner = u));
  }

  async getSomeClient(id: number) {
    await api.service.getClient(id).then((r: Client) => r);
  }

  // Используеться: Organization.tsx
  async getAuthPersons(id: number) {
    await api.service
      .getAuthPersons(id)
      .then((r: AuthPerson[]) => (this.authPersons = r));
  }

  async setAuthPersons(id: number, data: any) {
    await api.service
      .setAuthPersons(id, data)
      .then(() =>
        runInAction(async () => await this.getAuthPersons(data.client))
      );
  }

  async getAuthPerson(id: number) {
    await api.service
      .getAuthPerson(id)
      .then((r: AuthPerson) => (this.authPerson = r));
  }

  // Используються в Organization.tsx
  async getClientContact(id: number) {
    await api.service
      .getClientContact(id)
      .then(
        (r: Contact[]) => (this.contacts = r.filter((c: Contact) => c.is_main))
      );
  }

  async editClientContact(id: number, data: any) {
    await api.service.editClientContact(id, data).then(() =>
      runInAction(async () => {
        data.client && (await this.getClientContact(data.client));
      })
    );
  }

  async addClientContact(data: any) {
    await api.service.addClientContact(data).then(() =>
      runInAction(async () => {
        data.client && (await this.getClientContact(data.client));
      })
    );
  }

  // Используюtься в Organization.tsx
  async getClientAddress(id: number) {
    await api.service
      .getClientAddress(id)
      .then((r: Address[]) => (this.address = r));
  }

  async editClientAddress(id: number, data: any) {
    await api.service.editClientAddress(id, data).then(() =>
      runInAction(async () => {
        this.getClientAddressTypes();
        (await data.id) && this.getClientAddress(data.id);
      })
    );
  }

  // Используються в Organization.tsx
  async getClientAddressTypes() {
    await api.service
      .getClientAddressTypes()
      .then((r: AddressTypes[]) => (this.addressTypes = r));
  }

  // Используються в Organization.tsx
  async getClientBankDetails(id: number) {
    await api.service
      .getClientBankDetails(id)
      .then((r: BankDetail[]) => (this.bankDetails = r));
  }

  async editClientBankDetails(id: number, data: any) {
    await api.service.editClientBankDetails(id, data).then(() =>
      runInAction(async () => {
        await this.getClientBankDetails(data.client);
      })
    );
  }

  async getDocumentsCategories() {
    await api.service.getDocumentCategories().then((res: Categories[]) => {
      this.categories = res;
      runInAction(async () => {
        await this.getDocumentsType();
      });
    });
  }

  async getDocumentsType() {
    await api.service.getDocumentTypes().then((res: []) => {
      this.types = res;
      this.__getDocCategories();
    });
  }

  async __getDocCategories() {
    await (this.getDocCategories = this.categories.map((c: Categories) => ({
      ...c,
      doc_type: c.doc_type.map((t: number) =>
        this.documents.find(
          (d: Documents) => d.doc_status === 'Active' && d.doc_type === t
        )
          ? {
              name: this.types.find((tt: any) => tt.id === t)?.name,
              file: this.documents.find(
                (d: Documents) => d.doc_status === 'Active' && d.doc_type === t
              ),
            }
          : {
              name: this.types.find((tt: any) => tt.id === t)?.name,
              file: null,
            }
      ),
    })));
  }

  async addDocument(id: number, data: any) {
    await api.service.addDocument(id, data).then((r) => {
      if (r && r.id) this.addedFiles = [...this.addedFiles, r.id];
      runInAction(async () => {
        await this.getDocuments(r.client);
        await this.__getDocCategories();
      });
    });
  }

  async addDogovor(id: number, data: any) {
    await api.service.addDogovor(id, data).then((r) => {
      this.getDogovor(id);
    });
  }

  async deleteDocument(clientId: number, data: any) {
    await api.service.deleteDocument(data.id, data).then((r) => {
      runInAction(async () => {
        await this.getDocuments(clientId);
        await this.__getDocCategories();
      });
    });
  }

  async addKey(id: number, data: any) {
    await api.service.uploadKeys(id, data).then((r) => {
      runInAction(async () => {
        await this.getRequest(id);
      });
    });
  }

  async getPersonStatus() {
    await api.service.getPersonStatus().then((res) => {
      this.personStatus = res;
    });
  }

  async getClientAllUsers(id: number) {
    await api.service.getClientUsers(id).then((res) => {
      this.users = res && res.filter((r: User) => r.person_status === 1);
    });
  }

  async getClientUsers(ids: number[]) {
    let users: Client[] = [];
    let promises: any[] = [];
    (await (ids.length > 0)) &&
      ids.map((id: number) =>
        promises.push(
          api.service.getClientUser(id).then((res: Client) => {
            users.push(res);
          })
        )
      );
    Promise.all(promises).then(() => (this.clientUsers = users));
  }

  async getServiceUsers(ids: number[]) {
    let users: ClientUsers[] = [];
    let promises: any[] = [];
    (await (ids.length > 0)) &&
      ids.map((id: number) =>
        promises.push(
          api.service.getClientUser(id).then((res: ClientUsers) => {
            users.push(res);
          })
        )
      );
    Promise.all(promises).then(() => (this.serviceUsers = users));
  }

  async getClientDocs(ids: number[], r: Request | null = null) {
    let docs: Documents[] = [];
    let promises: any[] = [];
    (await (ids.length > 0)) &&
      ids.map((id: number, index: number) =>
        promises.push(
          api.service.getDocument(id).then((res: Documents) => {
            if (res.doc_status !== 'Active') return;
            if (res.doc_type === 11) {
              this.testKey = res;
            } else if (res.doc_type === 10) {
              this.prodKey = res;
            } else if (
              res.doc_type === 8 &&
              res.is_signed_by_both &&
              r &&
              r.request_stepper > 2
            ) {
              this.testAct = res;
              docs.push(res);
            } else if (res.doc_type === 8) {
              this.testAct = res;
              docs.push(res);
            } else if (res.doc_type === 9) {
              this.testProt = res;
              docs.push(res);
            } else if (
              res.doc_type === 1 &&
              res.is_signed_by_both &&
              r &&
              r.request_stepper > 2
            ) {
              this.doc = res;
              docs.push(res);
            } else if (res.doc_type === 1) {
              this.doc = res;
              docs.push(res);
            } else {
              docs.push(res);
            }
            // if (r) {
            //   if (r.request_stepper > 2 && index === ids.length - 1)
            //     this.downloadSignedFile(r.id);
            //   else {
            //     if (index === ids.length - 1) {
            //       this.doc = res;
            //     }
            //   }
            // }
          })
        )
      );
    Promise.all(promises).then(() => (this.clientDocs = docs));
  }

  async getClientUser(id: number) {
    await api.service.getClientUser(id).then((res) => {
      this.clientUser = res;
    });
  }

  async getClientService() {
    await api.service.getClientService().then((res) => {
      this.clientService = res;
    });
  }

  async getClientServices(id: number) {
    await api.service.getClientServices(id).then((res) => {
      this.clientService = res;
    });
  }

  async getClientServiceById(id: number) {
    await api.service.getClientServiceById(id).then((res) => {
      this.clientServiceById = res;
      res.client_user && this.getServiceUsers(res.client_user);
      res.client_doc && this.getClientDocs(res.client_doc);
    });
  }

  async getSigningAuth() {
    await api.service.getSigningAuth().then((res) => {
      this.signingAuth = res;
    });
  }

  async addSigningAuth(data: any) {
    await api.service
      .addSigningAuth(data)
      .then(() => runInAction(async () => await this.getSigningAuth()));
  }

  async getClientServiceType() {
    await api.service.getClientServiceType().then((res) => {
      this.clientServiceType = res;
    });
  }
  async sendType() {
    this._getRequest &&
      (await api.service.sendType(this._getRequest).then((res) => {
        runInAction(async () => {
          this._getRequest && (await this.getRequest(this._getRequest.id));
          this.agreeGroup = [];
          this.agreeUsers = [];
        });
      }));
  }
  async endRequest(request: Request, comment: string) {
    await api.service.endRequest(request, comment).then((res) => {
      runInAction(async () => {
        await this.getRequest(request.id);
      });
    });
  }
  async nextRequest(request: Request) {
    await api.service.nextRequest(request).then((res) => {
      runInAction(async () => {
        await this.getRequest(request.id);
        this.prodKey = null;
        this.testKey = null;
        this.testAct = null;
        this.testProt = null;
      });
    });
  }
  async nextRequestStatus(id: number) {
    this._getRequest &&
      (await api.service
        .nextRequestStatus(this._getRequest.id, id)
        .then((res) => {
          runInAction(async () => {
            this._getRequest && (await this.getRequest(this._getRequest.id));
          });
        }));
  }
  async updateRequest(data: any) {
    this._getRequest &&
      (await api.service.updateRequest(this._getRequest, data).then(() => {
        runInAction(async () => {
          this._getRequest && (await this.getRequest(this._getRequest.id));
        });
      }));
  }
  async toSign(isType: boolean) {
    if (isType) {
      this._getDoc &&
        this._getRequest &&
        (await api.service
          .toSign(this._getDoc.id, this._getRequest.id)
          .then(() => {
            runInAction(async () => {
              this._getRequest && (await this.getRequest(this._getRequest.id));
            });
          }));
    } else {
      this._getDoc &&
        this._getRequest &&
        (await api.service
          .toSign(this._getDoc.id, this._getRequest.id)
          .then(() => {
            runInAction(async () => {
              this._getRequest && (await this.getRequest(this._getRequest.id));
            });
          }));
    }
  }
  async signDocGkb(isType: boolean) {
    if (isType) {
      this._getDoc &&
        this._getRequest &&
        (await api.service
          .signDoc(this._getDoc.id, this._getRequest.id)
          .then(() => {
            runInAction(async () => {
              this._getRequest && (await this.getRequest(this._getRequest.id));
            });
          }));
    } else {
      this._getDoc &&
        this._getRequest &&
        (await api.service
          .signDoc(this._getDoc.id, this._getRequest.id)
          .then(() => {
            runInAction(async () => {
              this._getRequest && (await this.getRequest(this._getRequest.id));
            });
          }));
    }
  }
  async toReview(id: number, data: any) {
    this._getRequest &&
      (await api.service.sendAgree(this._getRequest).then((res) => {
        runInAction(async () => {
          await api.service.toReview(id, data);
          await this.getRequest(id);
        });
      }));
  }
  async getReview(id: number) {
    await api.service.getReview(id).then((res) => {
      this.reviews = res;
    });
  }
  async addReview(id: number, data: Result) {
    await api.service.addReview(id, data).then((res) => {
      runInAction(async () => {
        await this.getReview(id);
        await this.getRequest(id);
      });
    });
  }

  async sendReviews(id: number, is_approved: boolean) {
    this._getRequest &&
      this.addReview(this._getRequest.id, {
        user_id: id,
        is_approved: is_approved,
      });
  }

  async setDoc(doc: Documents | null) {
    this.doc = doc;
  }
  async setTempDoc(tempDoc: Documents | null) {
    this.tempDoc = tempDoc;
  }

  getDocTypes() {
    const doc_cat = this.categories.find(
      (c: Categories) => c.name === 'Заявка'
    );
    return doc_cat
      ? this.types.filter((c: ServiceCommon) => c.id === +doc_cat.doc_type)
      : [];
  }

  getAddressTypes() {
    return this.addressTypes.map((c: AddressTypes) => ({
      ...c,
      address:
        this.address &&
        this.address.filter((d: Address) => d.address_type === c.id),
    }));
  }

  async downloadDocument(doc: Documents) {
    await api.service.downloadDocument(doc.id).then((r) => {
      const blob = new Blob([r]);
      if (blob) {
        downloadBlob(blob, doc.doc_name);
      }
    });
  }

  async downloadKeys(doc: Documents) {
    await api.service.downloadKeys(doc).then((r) => {
      const blob = new Blob([r]);
      if (blob) {
        downloadBlob(blob, doc.doc_name);
      }
    });
  }

  async getBase64() {
    this.request &&
      (await api.service
        .downloadFileForSign(this.request.id)
        .then((response: any) => {
          runInAction(async () => {
            if (response && response.base64) {
              this.base64file = response.base64;
              await this.signDoc();
            }
          });
        }));
  }

  async signDoc() {
    console.log(this.base64file, '64');
    if (this.base64file.length) {
      await signWithBase64(this.base64file)
        .then((res) => {
          this.afterNca();
        })
        .catch((err) => console.error(err.message));
    } else console.log('no base 64');
  }

  async afterNca() {
    this.request &&
      (await api.service
        .uploadSignedFile(this.request.id, {
          signed_file: this.base64file,
        })
        .then(() => {
          runInAction(async () => {
            this.request && this.getRequest(this.request.id);
          });
        }));
  }

  constructor() {
    this.requests = [];
    this.mineRequests = [];
    this.voteRequests = [];
    this.documents = [];
    this.dogovors = [];
    this.categories = [];
    this.request = null;
    this.clientTypes = [];
    this.clients = [];
    this.client = null;
    this.someClient = null;
    this.authPersons = [];
    this.clientUsersForAdd = [];
    this.authPerson = null;
    this.contacts = [];
    this.address = [];
    this.addressTypes = [];
    this.bankDetails = [];
    this.signingAuthority = [];
    this.personStatus = [];
    this.clientUser = [];
    this.clientService = [];
    this.clientServiceById = null;
    this.clientServiceType = [];
    this.user = null;
    this.users = [];
    this.allUsers = [];
    this.position = [];
    this.signingAuth = [];
    this.types = [];
    this.requestStatus = [];
    this.manUser = null;
    this.doc = null;
    this.tempDoc = null;
    this.signers = [];
    this.conSigner = null;
    this.manSigner = null;
    this.clientUsers = [];
    this.clientDocs = [];
    this.reviews = [];
    this.serviceDesk = [];
    this.serviceUsers = [];
    this.getDocCategories = [];

    makeAutoObservable(this, {
      getRequests: action.bound,
      getClientRequests: action.bound,
      getMineRequest: action.bound,
      getVoteRequest: action.bound,
      getRequest: action.bound,
      getDocuments: action.bound,
      getDocumentsCategories: action.bound,
      downloadDocument: action.bound,
      getDocumentsType: action.bound,
      getAddressTypes: action.bound,
      getClientTypes: action.bound,
      addClientTypes: action.bound,
      getClient: action.bound,
      getReview: action.bound,
      addReview: action.bound,
      getSomeClient: action.bound,
      getAuthPersons: action.bound,
      getAuthPerson: action.bound,
      getClientAddress: action.bound,
      getClientBankDetails: action.bound,
      getClientContact: action.bound,
      getClientAddressTypes: action.bound,
      getSigningAuth: action.bound,
      getPersonStatus: action.bound,
      getClientUser: action.bound,
      getClientService: action.bound,
      getClientServiceById: action.bound,
      getClientServiceType: action.bound,
      getPosition: action.bound,
      addPosition: action.bound,
      addSigningAuth: action.bound,
      getDocTypes: action.bound,
      addRequest: action.bound,
      addDocument: action.bound,
      getRequestStatus: action.bound,
      setManUser: action.bound,
      setNotTypical: action.bound,
      setAgreement: action.bound,
      setAgreementPar: action.bound,
      endRequest: action.bound,
      nextRequest: action.bound,
      nextRequestStatus: action.bound,
      setDoc: action.bound,
      editClient: action.bound,
      setTempDoc: action.bound,
      updateUser: action.bound,
      getClientUsers: action.bound,
      getClientDocs: action.bound,
      getSigners: action.bound,
      getUsers: action.bound,
      getClientAllUsers: action.bound,
      getClientUsersForAdd: action.bound,
      getConSigner: action.bound,
      getManSigner: action.bound,
      getClients: action.bound,
      getManUser: action.bound,
      getUser: action.bound,
      regClientUser: action.bound,
      updateRequest: action.bound,
      signDoc: action.bound,
      setManSigner: action.bound,
      toSign: action.bound,
      getServiceDesk: action.bound,
      getDogovor: action.bound,
      addDogovor: action.bound,
      getServiceUsers: action.bound,
      addKey: action.bound,
      deleteDocument: action.bound,
      _getAllUsers: computed,
      _getClientServiceById: computed,
      _getClientUsersForAdd: computed,
      _getDoc: computed,
      _getDocCategories: computed,
      _getUser: computed,
      _getDogovors: computed,
      _getTempDoc: computed,
      _getSigners: computed,
      _getRequests: computed,
      _getDocuments: computed,
      _getCategories: computed,
      _getTypes: computed,
      _getRequest: computed,
      _getClientTypes: computed,
      _getClients: computed,
      _getClient: computed,
      _getSomeClient: computed,
      _getAuthPersons: computed,
      _getAuthPerson: computed,
      _getContacts: computed,
      _getClientAddress: computed,
      _getAddress: computed,
      _getBankDetails: computed,
      _getSigningAuthority: computed,
      _getPersonStatus: computed,
      _getClientDocs: computed,
      _getClientUser: computed,
      _getClientService: computed,
      _getClientServiceType: computed,
      _getPosition: computed,
      _getSigningAuth: computed,
      _getRequestStatus: computed,
      _getManUser: computed,
      _getConSigner: computed,
      _getManSigner: computed,
      _getClientUsers: computed,
      _getUsers: computed,
      _getReviews: computed,
      _getMineRequests: computed,
      _getVoteRequests: computed,
      _getServiceDesk: computed,
      _getServiceUsers: computed,
      getAgreeStatus: computed,
      getLastVersion: computed,
    });
  }
}
export default new RequestStore() as RequestStore;
