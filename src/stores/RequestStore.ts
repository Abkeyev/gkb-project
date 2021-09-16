import { action, computed, makeAutoObservable } from "mobx";
import {
  Request,
  Documents,
  Categories,
  ClientTypes,
  ClientUsers,
  Client,
  ClientUser,
  User,
  AuthPerson,
  Contact,
  Address,
  AddressTypes,
  BankDetail,
  PersonStatus,
  SigningAuthority,
  ClientServiceType,
  ClientService,
} from "../api/Models/ServiceModels";
import api from "../api/Api";

class RequestStore {
  // custom
  step: number = 0;
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
  private categories: Categories[];
  private request: Request | null;
  private clientUsers: ClientUsers[];
  private clientTypes: ClientTypes[];
  private clients: Client[];
  private client: Client | null;
  private authPersons: AuthPerson[];
  private contacts: Contact[];
  private address: Address[];
  private addressTypes: AddressTypes[];
  private bankDetails: BankDetail[];
  private signingAuthority: SigningAuthority[] | [];
  private personStatus: PersonStatus[] | [];
  private clientUser: ClientUser[] | [];
  private clientService: ClientService[] | [];
  private user: User | null;
  private clientServiceType: ClientServiceType[] | [];

  get _getRequests() {
    return this.requests;
  }
  get _getSigningAuthority() {
    return this.signingAuthority;
  }
  get _getDocuments() {
    return this.documents;
  }
  get _getCategories() {
    return this.categories;
  }
  get _getRequest() {
    return this.request;
  }
  get _getClientUsers() {
    return this.clientUsers;
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

  async getUser(id: string) {
    await api.service.getUser(id).then((r: User) => (this.user = r));
  }

  async getDocuments(id: string) {
    await api.service
      .getDocuments(id)
      .then((r: Documents[]) => (this.documents = r));
  }

  async getClientUsers(id: string) {
    await api.service
      .getClientUsers(id)
      .then((r: ClientUsers[]) => (this.clientUsers = r));
  }

  async getClientTypes() {
    await api.service
      .getClientTypes()
      .then((r: ClientTypes[]) => (this.clientTypes = r));
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
      .then((r: SigningAuthority[]) => (this.signingAuthority = r));
  }

  async getDocumentsCategories() {
    await api.service.getDocumentCategories().then((res) => {
      this.categories = res;
    });
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

  async getClientServiceType() {
    await api.service.getClientServiceType().then((res) => {
      this.clientServiceType = res;
    });
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
    this.clientUsers = [];
    this.clientTypes = [];
    this.clients = [];
    this.client = null;
    this.authPersons = [];
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

    makeAutoObservable(this, {
      getRequests: action.bound,
      getRequest: action.bound,
      getDocuments: action.bound,
      getDocumentsCategories: action.bound,
      downloadDocument: action.bound,
      getDocCategories: action.bound,
      getAddressTypes: action.bound,
      getClientTypes: action.bound,
      getClient: action.bound,
      getAuthPersons: action.bound,
      getClientAddress: action.bound,
      getClientBankDetails: action.bound,
      getClientContact: action.bound,
      getClientAddressTypes: action.bound,
      getSigningAuthority: action.bound,
      getPersonStatus: action.bound,
      getClientUser: action.bound,
      getClientService: action.bound,
      getClientServiceType: action.bound,
      _getRequests: computed,
      _getDocuments: computed,
      _getCategories: computed,
      _getRequest: computed,
      _getClientUsers: computed,
      _getClientTypes: computed,
      _getClients: computed,
      _getClient: computed,
      _getAuthPersons: computed,
      _getContacts: computed,
      _getAddress: computed,
      _getBankDetails: computed,
      _getSigningAuthority: computed,
      _getPersonStatus: computed,
      _getClientUser: computed,
      _getClientService: computed,
      _getClientServiceType: computed,
    });
  }
}
export default new RequestStore() as RequestStore;
