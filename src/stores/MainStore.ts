import { makeAutoObservable } from "mobx";
import api from "../api/Api";

export default class MainStore {
  logged: boolean = false;
  loginState: "login" | "ecp" = "login";
  login: string = "";
  loginError: boolean = false;
  loginErrorText: string = "";
  pass: string = "";
  isOpenModal: boolean = false;
  modalType: number = 0;
  modalManager: boolean = false;
  decline: boolean = false;
  declineReason: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  logIn = () => {
    localStorage.removeItem("userContext");
    api.client
      .auth({
        username: this.login,
        password: this.pass,
      })
      .then((r) => {
        localStorage.setItem("userContext", JSON.stringify(r));
        this.logged = true;
      })
      .catch((err) => {
        this.loginError = true;
        if (err && err.detail) this.loginErrorText = err.detail;
      });
  };

  logInEcp = (data: any) => {
    localStorage.removeItem("userContext");
    api.client
      .authEcp(data)
      .then((r) => {
        localStorage.setItem("userContext", JSON.stringify(r));
        this.logged = true;
      })
      .catch((err) => {
        this.loginError = true;
        if (err && err.detail) this.loginErrorText = err.detail;
      });
  };

  setLogin = (login: string) => {
    this.login = login;
  };

  setLoginState = (loginState: "login" | "ecp") => {
    this.loginState = loginState;
  };

  setPass = (pass: string) => {
    this.pass = pass;
  };

  setModal = (isOpenModal: boolean) => {
    this.isOpenModal = isOpenModal;
  };

  setModalManager = (modalManager: boolean) => {
    this.modalManager = modalManager;
  };

  setModalType = (modalType: number) => {
    this.modalType = modalType;
  };

  setDeclineReason = (declineReason: string) => {
    this.declineReason = declineReason;
  };

  setDecline = (decline: boolean) => {
    this.decline = decline;
  };
}
