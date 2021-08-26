import { MethodName } from "./ncalayer";

const defaultXML = `<?xml version="1.0" encoding="utf-8"?>
<root>
  <name>Ivan</name>
  <iin>123456789012</iin>
</root>
`;

const defaultXMLByElementId = `<?xml version="1.0" encoding="utf-8"?>
<root>
    <person id="personId">
      <name>Ivan</name>
      <iin>123456789012</iin>
    </person>
    <company id="companyId">
      <name>Company Name</name>
      <bin>123456789012</bin>
    </company>
</root>
`;

export enum CheckState {
  NotValidated = "notValidated",
  Failed = "failed",
  OK = "ok",
}

interface AppState {
  method: MethodName;
  docs: object[] | null;
  req: number;
  signDocModal: string;
  index: number;
  modal: boolean;
  version: "";
  alias: string;
  path: string;
  password: string;
  keyType: string;
  keyAlias: string;
  keys: string[];
  lang: string;
  notBefore: string;
  notAfter: string;
  subjectDN: string;
  issuerDN: string;
  oid: string;
  rdn: string;
  // plain data
  plainData: string;
  plainDataSigned: string;
  plainDataValid: CheckState;
  plainDataMessage: string;
  // cms signature
  cmsSignature: string;
  cmsSignatureFlag: boolean;
  cmsSignatureSigned: string;
  cmsSignatureValid: CheckState;
  cmsSignatureMessage: string;
  // cms signature form file
  cmsFilePath: string;
  cmsFileSignatureFlag: boolean;
  cmsFileSignatureSigned: string;
  cmsFileSignatureValid: CheckState;
  cmsFileSignatureMessage: string;
  // xml
  xml: string;
  xmlSigned: string;
  xmlValid: CheckState;
  xmlMessage: string;
  // xml by element id
  xmlNode: string;
  xmlNodeElement: string;
  xmlNodeAttribute: string;
  xmlNodeParent: string;
  xmlNodeVerifyAttribute: string;
  xmlNodeVerifyParent: string;
  xmlNodeSigned: string;
  xmlNodeValid: CheckState;
  xmlNodeMessage: string;
  // hash
  toHash: string;
  alg: string;
  hashed: string;
  logged: boolean;
  isOpenModal: boolean;
  modalType: number;
  modalManager: boolean;
  decline: boolean;
  declineReason: string;
  tab: number;
  step: number;
  agreement: boolean;
  notTypical: boolean;
  ready: boolean;
  step1: boolean;
  step2: boolean;
  step1status: boolean;
  step2status: boolean;
  signStep: number;
  agreeUsers: number[];
  agreeGroup: number[];
}

export const initAppState = (): AppState => {
  return {
    method: MethodName.None,
    docs: null,
    signDocModal: "",
    req: 0,
    index: 0,
    modal: false,
    version: "",
    alias: "PKCS12",
    path: "",
    password: "",
    keyType: "AUTH",
    keyAlias: "",
    keys: [""],
    lang: "ru",
    notBefore: "",
    notAfter: "",
    subjectDN: "",
    issuerDN: "",
    oid: "2.5.4.3",
    rdn: "",
    // plain data
    plainData: "",
    plainDataSigned: "",
    plainDataValid: CheckState.NotValidated,
    plainDataMessage: "Не проверено",
    // cms signature
    cmsSignature: "",
    cmsSignatureFlag: false,
    cmsSignatureSigned: "",
    cmsSignatureValid: CheckState.NotValidated,
    cmsSignatureMessage: "Не проверено",
    // cms signature form file
    cmsFilePath: "",
    cmsFileSignatureFlag: false,
    cmsFileSignatureSigned: "",
    cmsFileSignatureValid: CheckState.NotValidated,
    cmsFileSignatureMessage: "Не проверено",
    // xml
    xml: defaultXML,
    xmlSigned: "",
    xmlValid: CheckState.NotValidated,
    xmlMessage: "Не проверено",
    // xml by element id
    xmlNode: defaultXMLByElementId,
    xmlNodeElement: "",
    xmlNodeAttribute: "",
    xmlNodeParent: "",
    xmlNodeVerifyAttribute: "",
    xmlNodeVerifyParent: "",
    xmlNodeSigned: "",
    xmlNodeValid: CheckState.NotValidated,
    xmlNodeMessage: "Не проверено",
    // hash
    toHash: "",
    alg: "SHA1",
    hashed: "",
    logged: false,
    isOpenModal: false,
    modalType: 0,
    modalManager: false,
    decline: false,
    declineReason: "",
    tab: 0,
    step: 0,
    agreement: false,
    notTypical: false,
    ready: false,
    step1: false,
    step1status: false,
    step2: false,
    step2status: false,
    signStep: 0,
    agreeUsers: [],
    agreeGroup: [],
  };
};

export default AppState;
