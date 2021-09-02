import { makeAutoObservable } from "mobx";

export default class MainStore {
  logged: boolean = false;
  loginState: "login" | "ecp" | "" = "";
  login: string = "";
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
    console.log("action");
    this.logged = true;
  };

  setLogin = (login: string) => {
    this.login = login;
  };

  setLoginState = (loginState: "login" | "ecp" | "") => {
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
