import { action, computed, makeAutoObservable, runInAction } from "mobx";
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
} from "../api/Models/ServiceModels";
import api from "../api/Api";

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
  signStepPar: number = 1;
  agreeTwoStep: number = 0;
  agreeParStep: number = 1;
  signTwoStep: number = 0;
  signTwoStepPar: number = 1;
  signTwoUsers: number[] = [];
  agreeUsers: number[] = [];
  agreeGroup: number[] = [0];

  private requests: Request[];
  private documents: Documents[];
  private doc: Documents | null;
  private request: Request | null;
  private clientTypes: ClientTypes[];
  private clients: Client[];
  private client: Client | null;
  private authPersons: AuthPerson[];
  private authPerson: AuthPerson | null;
  private contacts: Contact[];
  private address: Address[];
  private addressTypes: AddressTypes[];
  private bankDetails: BankDetail[];
  private signingAuthority: ServiceCommon[] | [];
  private personStatus: ServiceCommon[] | [];
  private manUser: ClientUsers | null;
  private clientUser: ClientUsers[] | [];
  private clientService: ClientService[] | [];
  private user: User | null;
  private clientServiceType: ServiceCommon[] | [];
  private position: ServiceCommon[] | [];
  private signingAuth: ServiceCommon[] | [];
  private types: ServiceCommon[] | [];
  private categories: Categories[] | [];
  private requestStatus: ServiceCommon[] | [];

  get _getRequests() {
    return this.requests;
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
  get _getClientServiceType() {
    return this.clientServiceType;
  }
  get _getUser() {
    return this.user;
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

  setManUser(manUser: ClientUsers | null) {
    this.manUser = manUser;
  }

  setStep(step: number) {
    this.step = step;
  }

  setSignStep(step: number) {
    this.signStep = step;
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

  setAgreeUsers() {
    this.agreeUsers = [...this.agreeUsers, 1];
  }

  async getRequests() {
    await api.service.getRequests().then((r: Request[]) => (this.requests = r));
  }

  async getRequest(id: string) {
    await api.service.getRequest(id).then((r: Request) => (this.request = r));
  }

  async getRequestStatus() {
    await api.service
      .getRequestStatus()
      .then((r: ServiceCommon[]) => (this.requestStatus = r));
  }

  async addRequest(data: any) {
    await api.service.addRequest(data);
  }

  async updateUser(id: number, fields: any) {
    await api.service.updateProfile(id, fields)
      .then((response: any) => {
        console.log(response);
      });
  }

  async getUser(id: string) {
    await api.service.getUser(id).then((r: User) => (this.user = r));
  }

  async getDocuments(id: string) {
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

  async getClient(id: string) {
    await api.service.getClient(id).then((r: Client) => (this.client = r));
  }

  async getAuthPersons(id: string) {
    await api.service
      .getAuthPersons(id)
      .then((r: AuthPerson[]) => (this.authPersons = r));
  }

  async getAuthPerson(id: string) {
    await api.service
      .getAuthPerson(id)
      .then((r: AuthPerson) => (this.authPerson = r));
  }

  async getClientContact(id: string) {
    await api.service
      .getClientContact(id)
      .then((r: Contact[]) => (this.contacts = r));
  }

  async getClientAddress(id: string) {
    await api.service
      .getClientAddress(id)
      .then((r: Address[]) => (this.address = r));
  }

  async getClientAddressTypes() {
    await api.service
      .getClientAddressTypes()
      .then((r: AddressTypes[]) => (this.addressTypes = r));
  }

  async getClientBankDetails(id: string) {
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

  async addDocument(id: string, data: any) {
    await api.service.addDocument(id, data);
  }

  async getPersonStatus() {
    await api.service.getPersonStatus().then((res) => {
      this.personStatus = res;
    });
  }

  async getClientUser(id: string) {
    await api.service.getClientUser(id).then((res) => {
      this.clientUser = res;
    });
  }

  async getClientService() {
    await api.service.getClientService().then((res) => {
      this.clientService = res;
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
  async nextRequest(request: Request) {
    await api.service.nextRequest(request).then((res) => {
      runInAction(async () => {
        await this.getRequest(request.id);
      });
    });
  }
  async nextRequestStatus() {
    await api.service.nextRequestStatus().then((res) => {
      console.log(res);
    });
  }

  setDoc(doc: Documents) {
    this.doc = doc;
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

  async downloadDocument(id: string, fileName: string) {
    await api.service.downloadDocument(id).then((r) => {
      const url = window.URL.createObjectURL(new Blob([r.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    });
  }

  constructor() {
    this.requests = [];
    this.documents = [];
    this.categories = [];
    this.request = null;
    this.clientTypes = [];
    this.clients = [];
    this.client = null;
    this.authPersons = [];
    this.authPerson = null;
    this.contacts = [];
    this.address = [];
    this.addressTypes = [];
    this.bankDetails = [];
    this.signingAuthority = [];
    this.personStatus = [];
    this.clientUser = [];
    this.clientService = [];
    this.clientServiceType = [];
    this.user = null;
    this.position = [];
    this.signingAuth = [];
    this.types = [];
    this.requestStatus = [];
    this.manUser = null;
    this.doc = null;

    makeAutoObservable(this, {
      getRequests: action.bound,
      getRequest: action.bound,
      getDocuments: action.bound,
      getDocumentsCategories: action.bound,
      downloadDocument: action.bound,
      getDocCategories: action.bound,
      getDocumentsType: action.bound,
      getAddressTypes: action.bound,
      getClientTypes: action.bound,
      getClient: action.bound,
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
      updateUser: action.bound,
      _getRequests: computed,
      _getDocuments: computed,
      _getCategories: computed,
      _getTypes: computed,
      _getRequest: computed,
      _getClientTypes: computed,
      _getClients: computed,
      _getClient: computed,
      _getAuthPersons: computed,
      _getAuthPerson: computed,
      _getContacts: computed,
      _getAddress: computed,
      _getBankDetails: computed,
      _getSigningAuthority: computed,
      _getPersonStatus: computed,
      _getClientUser: computed,
      _getClientService: computed,
      _getClientServiceType: computed,
      _getPosition: computed,
      _getSigningAuth: computed,
      _getRequestStatus: computed,
    });
  }
}
export default new RequestStore() as RequestStore;
