import { action, makeAutoObservable, runInAction, computed } from "mobx";
import api from "../api/Api";
import {
  AuthPerson,
  Client,
  ClientUsers,
  User,
} from "../api/Models/ServiceModels";
import Cookies from "../utils/cookies";

export enum CheckState {
  NotValidated = "notValidated",
  Failed = "failed",
  OK = "ok",
}

export interface ClientData {
  auth_person: AuthPerson | null;
  client: Client | null;
  user: User | null;
}

class MainStore {
  logged: boolean = false;
  isReg: boolean = false;
  clientExist: boolean = false;
  loginState: "login" | "ecp" | "ecpr" = "login";
  loginError: boolean = false;
  loginErrorText: string = "";
  isOpenModal: boolean = false;
  modalType: number = 0;
  modalManager: boolean = false;
  decline: boolean = false;
  declineReason: string = "";
  key: string = "";
  login: string = "";
  password: string = "";
  usersNew: ClientUsers[] | [] = [];

  private role: string;
  private _clientData: ClientData;
  private _accessToken: string | null;
  private _refreshToken: string | null;

  constructor() {
    this.role = "";
    this._refreshToken = null;
    this._accessToken = null;
    this._clientData = {
      auth_person: null,
      client: null,
      user: null,
    };
    this.logged = false;
    this.isReg = false;
    this.clientExist = false;
    this.usersNew = [];
    if (
      Cookies.get("refresh") &&
      Cookies.get("refresh").length > 10 &&
      Cookies.get("access") &&
      Cookies.get("access").length > 10 &&
      Cookies.get("clientData") &&
      Cookies.get("clientData").length > 5 &&
      Cookies.get("role") &&
      Cookies.get("role").length > 4 &&
      Cookies.get("isReg") &&
      Cookies.get("isReg").length > 3 &&
      Cookies.get("clientExist") &&
      Cookies.get("clientExist").length > 3
    ) {
      this.role = Cookies.get("role");
      this.isReg = Cookies.get("isReg") === "true" ? true : false;
      this.clientExist = Cookies.get("clientExist") === "true" ? true : false;
      this._refreshToken = Cookies.get("refresh");
      this._accessToken = Cookies.get("access");
      this._clientData = JSON.parse(Cookies.get("clientData"));
      this.logged = true;
    } else {
      this.logout(false);
    }
    makeAutoObservable(this, {
      logIn: action.bound,
      logout: action.bound,
      loginEcp: action.bound,
      setModal: action.bound,
      setModalType: action.bound,
      regUser: action.bound,
      setNewUsers: action.bound,
      setDeclineReason: action.bound,
      finishReg: action.bound,
      clientData: computed,
      refreshToken: computed,
      accessToken: computed,
      getRole: computed,
    });
  }

  get clientData() {
    return this._clientData;
  }

  get getRole() {
    return this.role;
  }

  get refreshToken() {
    return this._refreshToken;
  }

  get accessToken() {
    return this._accessToken;
  }

  setModal(modal: boolean) {
    this.isOpenModal = modal;
  }

  setModalType(type: number) {
    this.modalType = type;
  }

  setModalManager(modalManager: boolean) {
    this.modalManager = modalManager;
  }

  setDeclineReason(declineReason: string) {
    this.declineReason = declineReason;
  }

  setDecline(decline: boolean) {
    this.decline = decline;
  }

  setNewUsers(users: ClientUsers[]) {
    console.log(users);
    this.usersNew = users;
  }

  logout(reload: boolean = false) {
    Cookies.remove("refresh");
    Cookies.remove("access");
    Cookies.remove("clientData");
    Cookies.remove("role");
    Cookies.remove("isReg");
    Cookies.remove("clientExist");
    this._accessToken = null;
    this._refreshToken = null;
    this._clientData = {
      auth_person: null,
      client: null,
      user: null,
    };
    this.isReg = false;
    this.clientExist = false;
    this.logged = false;
    if (reload == true) document.location.href = "/";
  }

  private async setTokens(r: any) {
    this._clientData = {
      ...r.client_data,
    };
    this.role = r.role;
    this._accessToken = r.token_data.access;
    this._refreshToken = r.token_data.refresh;
    this.isReg = r.reg_flag;
    this.clientExist = r.client_exist_flag;

    Cookies.set("refresh", r.token_data.refresh, { expires: 7 });
    Cookies.set("access", r.token_data.access, { expires: 7 });
    Cookies.set("role", r.role, { expires: 7 });
    Cookies.set("isReg", r.reg_flag, { expires: 7 });
    Cookies.set("clientExist", r.client_exist_flag, { expires: 7 });
    Cookies.set("clientData", await JSON.stringify(this._clientData), {
      expires: 7,
    });
  }

  async finishReg() {
    this.isReg = false;
    this.clientExist = false;
    Cookies.set("isReg", false, { expires: 7 });
    Cookies.set("clientExist", false, { expires: 7 });
    window.location.reload();
  }

  async logIn(username: string, password: string) {
    await api.client
      .auth({
        username,
        password,
      })
      .then((r) => {
        runInAction(async () => {
          await this.setTokens(r);
          setTimeout(() => window.location.reload(), 500);
        });
      })
      .catch((err) => {
        if (err && err.detail) {
          runInAction(async () => {
            this.loginError = true;
            this.loginErrorText = err.detail;
          });
        }
      });
  }

  async loginEcp(bin: string, fio: string, name: string) {
    await api.client
      .authEcp({ bin, fio, name })
      .then((r) => {
        runInAction(async () => {
          await this.setTokens(r);
          setTimeout(() => window.location.reload(), 500);
        });
      })
      .catch((err) => {
        if (err && err.detail) {
          runInAction(async () => {
            this.loginError = true;
            this.loginErrorText = err.detail;
          });
        }
      });
  }

  async regClient(id: string, data: any) {
    await api.client.regClient(id, data);
  }

  async regUser(data: any) {
    await api.client.addUser(data);
  }

  async regAuthPerson(id: string, data: any) {
    await api.client.regAuthPerson(id, data);
  }
}

export default new MainStore() as MainStore;
