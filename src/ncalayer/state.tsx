import { MethodName } from "./ncalayer";

export enum CheckState {
  NotValidated = "notValidated",
  Failed = "failed",
  OK = "ok",
}

interface AppState {
  method: MethodName;
  alias: string;
  path: string;
  password: string;
  keyType: string;
  keyAlias: string;
  keys: string[];
  subjectDN: string;
  // cms signature form file
  cmsFilePath: string;
  cmsFileSignatureFlag: boolean;
  cmsFileSignatureSigned: string;
  cmsFileSignatureValid: CheckState;
  cmsFileSignatureMessage: string;
  // custom
  logged: boolean;
  isOpenModal: boolean;
  modalType: number;
  modalManager: boolean;
  decline: boolean;
  declineReason: string;
  tab: number;
  step: number;
  agreement: boolean;
  agreementPar: boolean;
  notTypical: boolean;
  ready: boolean;
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step1status: boolean;
  step2status: boolean;
  signStep: number;
  signStepPar: number;
  agreeTwoStep: number;
  agreeParStep: number;
  signTwoStep: number;
  signTwoStepPar: number;
  signTwoUsers: number[];
  agreeUsers: number[];
  agreeGroup: number[];
}

export const initAppState = (): AppState => {
  return {
    method: MethodName.None,
    alias: "PKCS12",
    path: "",
    password: "",
    keyType: "AUTH",
    keyAlias: "",
    keys: [""],
    subjectDN: "",
    // cms signature form file
    cmsFilePath: "",
    cmsFileSignatureFlag: false,
    cmsFileSignatureSigned: "",
    cmsFileSignatureValid: CheckState.NotValidated,
    cmsFileSignatureMessage: "Не проверено",
    logged: false,
    isOpenModal: false,
    modalType: 0,
    modalManager: false,
    decline: false,
    declineReason: "",
    tab: 0,
    step: 0,
    agreement: false,
    agreementPar: false,
    notTypical: false,
    ready: false,
    step1: false,
    step1status: false,
    step2: false,
    step3: false,
    step2status: false,
    signStep: 0,
    signStepPar: 1,
    agreeTwoStep: 0,
    agreeParStep: 1,
    signTwoStep: 0,
    signTwoStepPar: 1,
    agreeUsers: [],
    signTwoUsers: [],
    agreeGroup: [0],
  };
};

export default AppState;
