import { action, makeAutoObservable, runInAction, computed } from "mobx";
import api from "../api/Api";
import Cookies from "../utils/cookies";

export enum CheckState {
  NotValidated = "notValidated",
  Failed = "failed",
  OK = "ok",
}

export interface ClientData {
  auth_person_id: number | null;
  client_id: number | null;
  user_id: number | null;
  bin: string;
  fio: string;
  name: string;
}

class MainStore {
  logged: boolean = false;
  isReg: boolean = false;
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

  private role: string;
  private _clientData: ClientData;
  private _accessToken: string | null;
  private _refreshToken: string | null;

  constructor() {
    this.role = "";
    this._refreshToken = null;
    this._accessToken = null;
    this._clientData = {
      auth_person_id: null,
      client_id: null,
      user_id: null,
      bin: "",
      fio: "",
      name: "",
    };
    this.logged = false;
    if (
      Cookies.get("refresh") &&
      Cookies.get("refresh").length > 10 &&
      Cookies.get("access") &&
      Cookies.get("access").length > 10 &&
      Cookies.get("clientData") &&
      Cookies.get("clientData").length > 5 &&
      Cookies.get("role") &&
      Cookies.get("role").length > 4
    ) {
      this.role = Cookies.get("role");
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
      ecpData: computed,
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

  get ecpData() {
    return {
      bin: this._clientData.bin,
      fio: this._clientData.fio,
      name: this._clientData.name,
    };
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

  setEcpDate = (bin: string, fio: string, name: string) => {
    this._clientData.bin = bin;
    this._clientData.fio = fio;
    this._clientData.name = name;
  };

  logout(reload: boolean = false) {
    Cookies.remove("refresh");
    Cookies.remove("access");
    Cookies.remove("clientData");
    this._accessToken = null;
    this._refreshToken = null;
    this._clientData = {
      auth_person_id: null,
      client_id: null,
      user_id: null,
      bin: "",
      fio: "",
      name: "",
    };
    this.logged = false;
    if (reload == true) document.location.href = "/login";
  }

  private async setTokens(r: any) {
    this._clientData = {
      ...r.client_data,
      bin: this._clientData.bin,
      fio: this._clientData.fio,
      name: this._clientData.name,
    };
    this.role = r.role;
    this._accessToken = r.token_data.access;
    this._refreshToken = r.token_data.refresh;
    this.isReg = r.message === "User registration successfull" ? true : false;

    Cookies.set("refresh", r.token_data.refresh, { expires: 7 });
    Cookies.set("access", r.token_data.access, { expires: 7 });
    Cookies.set("role", r.role, { expires: 7 });
    Cookies.set("clientData", await JSON.stringify(this._clientData), {
      expires: 7,
    });
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
          await this.setEcpDate(bin, fio, name);
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
}

export default new MainStore() as MainStore;
