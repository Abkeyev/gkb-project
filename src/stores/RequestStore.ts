import { action, computed, makeAutoObservable, runInAction, toJS } from "mobx";
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
  ClientUser,
} from "../api/Models/ServiceModels";
import { signWithBase64 } from "../ncaLayer";
import api from "../api/Api";
import { downloadBlob } from "../utils/utils";

class RequestStore {
  // custom
  step: number = 1;
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
  base64file: string = "";
  service: string = "";
  data: any | null = null;
  signType: boolean = true;
  signNotType: boolean = false;
  agreeNotType: boolean = true;
  testKey: Documents | null = null;
  prodKey: Documents | null = null;
  mainDoc: Documents | null = null;
  testAct: Documents | null = null;
  testProt: Documents | null = null;

  private requests: Request[] | [];
  private reviews: AgreeResult[] | [];
  private mineRequests: Request[] | [];
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

  get _getRequests() {
    return this.requests;
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
    this._getDocuments &&
      this._getDocuments.map((d: Documents) => {
        if (d.version > lastVersion) lastVersion = d.version;
      });
    return lastVersion;
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

  async getDogovor(id: number) {
    await api.service
      .getDogovor(id)
      .then((d: Documents[]) => (this.dogovors = d));
  }

  async downloadSignedFile(id: number) {
    await api.service
      .downloadSignedFile(id)
      .then((r: Documents) => (this.mainDoc = r));
  }

  async getRequest(id: number) {
    this.manUser = null;
    await api.service.getRequest(id).then((r: Request) => {
      r.client && this.getClient(r.client.id);
      r.responsible_user && this.getManUser(r.responsible_user);
      r.counterparty_signer_user &&
        this.getConSigner(r.counterparty_signer_user);
      r.manager_signer_user && this.getManSigner(r.manager_signer_user);
      r.client && this.getSigners(r.client.id);
      !r.is_model_contract && this.getReview(r.id);
      r.client && this.getClientAllUsers(r.client.id);
      r.client_user && this.getClientUsers(r.client_user);
      r.client_doc && this.getClientDocs(r.client_doc, r);
      this.getDogovor(id);
      r.request_stepper > 1 && this.setStep(r.request_stepper);
      if (
        r.request_status === 11 ||
        r.request_status === 12 ||
        r.request_status === 14
      ) {
        this.agreeNotType = false;
        this.signNotType = true;
      } else {
        this.signType = true;
        this.agreeNotType = true;
        this.signNotType = false;
      }
      this.request = r;
    });
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

  async getUsers() {
    await api.service.getUsers().then((r: User[]) => (this.allUsers = r));
  }

  async getSigners(id: number) {
    await api.service
      .getSigners(id)
      .then((signers: any[]) => (this.signers = signers));
  }

  async getDocuments(id: number) {
    await api.service
      .getDocuments(id)
      .then((r: Documents[]) => (this.documents = r));
  }

  async getClientTypes() {
    await api.service
      .getClientTypes()
      .then((r: ClientTypes[]) => (this.clientTypes = r));
  }

  async getPosition() {
    await api.service
      .getPosition()
      .then((r: ServiceCommon[]) => (this.position = r));
  }

  async getClients() {
    await api.service.getClients().then((r: Client[]) => (this.clients = r));
  }

  async getClient(id: number) {
    await api.service.getClient(id).then((r: Client) => (this.client = r));
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

  async getAuthPersons(id: number) {
    await api.service
      .getAuthPersons(id)
      .then((r: AuthPerson[]) => (this.authPersons = r));
  }

  async getAuthPerson(id: number) {
    await api.service
      .getAuthPerson(id)
      .then((r: AuthPerson) => (this.authPerson = r));
  }

  async getClientContact(id: number) {
    await api.service
      .getClientContact(id)
      .then((r: Contact[]) => (this.contacts = r));
  }

  async getClientAddress(id: number) {
    await api.service
      .getClientAddress(id)
      .then((r: Address[]) => (this.address = r));
  }

  async getClientAddressTypes() {
    await api.service
      .getClientAddressTypes()
      .then((r: AddressTypes[]) => (this.addressTypes = r));
  }

  async getClientBankDetails(id: number) {
    await api.service
      .getClientBankDetails(id)
      .then((r: BankDetail[]) => (this.bankDetails = r));
  }

  async getSigningAuthority() {
    await api.service
      .getSigningAuthority()
      .then((r: ServiceCommon[]) => (this.signingAuthority = r));
  }

  async getDocumentsCategories() {
    await api.service.getDocumentCategories().then((res: Categories[]) => {
      this.categories = res;
    });
  }

  async getDocumentsType() {
    await api.service.getDocumentTypes().then((res: []) => {
      this.types = res;
    });
  }

  async addDocument(id: number, data: any, flag: boolean = false) {
    await api.service.addDocument(id, data).then((r) => {
      if (r && r.id) this.addedFiles = [...this.addedFiles, r.id];
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
      this.users = res;
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
            if (res.doc_type === 11) {
              this.testKey = res;
            } else if (res.doc_type === 12) {
              this.prodKey = res;
            } else if (res.doc_type === 13) {
              this.testAct = res;
            } else if (res.doc_type === 14) {
              this.testProt = res;
            }
            if (r) {
              if (r.request_stepper > 2 && index === ids.length - 1)
                this.downloadSignedFile(r.id);
              else {
                if (index === ids.length - 1) {
                  this.mainDoc = res;
                }
              }
            }
            docs.push(res);
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

  async getClientServiceType() {
    await api.service.getClientServiceType().then((res) => {
      this.clientServiceType = res;
    });
  }
  async sendType() {
    this._getRequest &&
      (await api.service.sendType(this._getRequest).then((res) => {
        runInAction(async () => {
          if (this._getRequest && this._getRequest.is_model_contract) {
            this.setDoc(null);
            this.setTempDoc(null);
          }
          this._getRequest && (await this.getRequest(this._getRequest.id));
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
  async nextRequest(request: Request, isFirst: boolean = false) {
    await api.service.nextRequest(request).then((res) => {
      runInAction(async () => {
        await this.getRequest(request.id);
        isFirst && res && this.setDoc(res);
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
          console.log(res);
        }));
  }
  async updateRequest(data: any) {
    this._getRequest &&
      (await api.service.updateRequest(this._getRequest, data).then((res) => {
        this.request = res;
      }));
  }
  async toSign(isType: boolean) {
    if (isType) {
      this.mainDoc &&
        this._getRequest &&
        (await api.service
          .toSign(this.mainDoc.id, this._getRequest.id)
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
      this.mainDoc &&
        this._getRequest &&
        (await api.service
          .signDoc(this.mainDoc.id, this._getRequest.id)
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
    await api.service.toReview(id, data).then((res) => {
      runInAction(async () => {
        await this.getRequest(id);
      });
    });
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

  async sendReviews() {
    this.reviews.map((r: AgreeResult) => {
      r.review_data.map(
        (d: Result) =>
          this._getRequest &&
          this.addReview(this._getRequest.id, {
            user_id: d.user_id,
            is_approved: true,
          })
      );
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
      (c: Categories) => c.name === "Заявка"
    );
    return doc_cat
      ? this.types.filter((c: ServiceCommon) => c.id === +doc_cat.doc_type)
      : [];
  }

  getDocCategories() {
    return this.categories.map((c: Categories) => ({
      ...c,
      documents: this.documents.filter(
        (d: Documents) => d.doc_category === +c.id
      ),
    }));
  }

  getAddressTypes() {
    return this.addressTypes.map((c: AddressTypes) => ({
      ...c,
      address: this.address.filter((d: Address) => d.address_type === c.id),
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
            if (response.base64) {
              await this.signDoc(response.base64);
            }
          });
        }));
  }

  async signDoc(base64: string) {
    if (base64.length) {
      await signWithBase64(base64)
        .then((res) => {
          this.afterNca();
        })
        .catch((err) => alert(err.message));
    } else console.log("no base 64");
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

    makeAutoObservable(this, {
      getRequests: action.bound,
      getClientRequests: action.bound,
      getMineRequest: action.bound,
      getRequest: action.bound,
      getDocuments: action.bound,
      getDocumentsCategories: action.bound,
      downloadDocument: action.bound,
      getDocCategories: action.bound,
      getDocumentsType: action.bound,
      getAddressTypes: action.bound,
      getClientTypes: action.bound,
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
      getSigningAuthority: action.bound,
      getPersonStatus: action.bound,
      getClientUser: action.bound,
      getClientService: action.bound,
      getClientServiceById: action.bound,
      getClientServiceType: action.bound,
      getPosition: action.bound,
      getSigningAuth: action.bound,
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
      updateRequest: action.bound,
      signDoc: action.bound,
      setManSigner: action.bound,
      toSign: action.bound,
      getServiceDesk: action.bound,
      getDogovor: action.bound,
      getServiceUsers: action.bound,
      addKey: action.bound,
      _getAllUsers: computed,
      _getClientServiceById: computed,
      _getClientUsersForAdd: computed,
      _getDoc: computed,
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
      _getServiceDesk: computed,
      _getServiceUsers: computed,
      getAgreeStatus: computed,
      getLastVersion: computed,
    });
  }
}
export default new RequestStore() as RequestStore;
