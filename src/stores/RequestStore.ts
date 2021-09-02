import { makeAutoObservable } from "mobx";

export default class RequestStore {
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

  constructor() {
    makeAutoObservable(this);
  }

  setTabIndexReq = (tabIndexReq: number) => {
    this.tabIndexReq = tabIndexReq;
  };

  setTabIndexPar = (tabIndexPar: number) => {
    this.tabIndexPar = tabIndexPar;
  };

  setAgreement = (agreement: boolean) => {
    this.agreement = agreement;
  };

  setAgreementPar = (agreementPar: boolean) => {
    this.agreementPar = agreementPar;
  };

  setNotTypical = (notTypical: boolean) => {
    this.notTypical = notTypical;
  };

  setAgreeUsers = () => {
    this.agreeUsers = [...this.agreeUsers, 0];
  };

  setAgreeGroup = () => {
    this.agreeGroup = [...this.agreeGroup, 0];
  };

  removeAgreeUsers = () => {
    this.agreeUsers = this.agreeUsers.splice(1);
  };

  removeAgreeGroup = () => {
    this.agreeGroup = this.agreeGroup.splice(1);
  };

  setAgreeTwoStep = (agreeTwoStep: number) => {
    this.agreeTwoStep = agreeTwoStep;
  };

  setSignTwoUsers = () => {
    this.signTwoUsers = [...this.signTwoUsers, 0];
  };

  setStep = (step: number) => {
    this.step = step;
  };

  setStep1 = (step1: boolean) => {
    this.step1 = step1;
  };

  setStep2 = (step2: boolean) => {
    this.step2 = step2;
  };

  setStep3 = (step3: boolean) => {
    this.step3 = step3;
  };

  setAgreeParStep = (agreeParStep: number) => {
    this.agreeParStep = agreeParStep;
  };

  setSignStep = (signStep: number) => {
    this.signStep = signStep;
  };

  setSignTwoStep = (signTwoStep: number) => {
    this.signTwoStep = signTwoStep;
  };

  setSignTwoStepPar = (signTwoStepPar: number) => {
    this.signTwoStepPar = signTwoStepPar;
  };

  setSignStepPar = (signStepPar: number) => {
    this.signStepPar = signStepPar;
  };
}
