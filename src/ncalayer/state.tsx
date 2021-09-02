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
  ready: boolean;
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
    ready: false,
  };
};

export default AppState;
