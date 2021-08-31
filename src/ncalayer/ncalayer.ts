export enum MethodName {
  None = "none",
  BrowseKeyStore = "browseKeyStore",
  ShowFileChooser = "showFileChooser",
  GetKeys = "getKeys",
  GetSubjectDN = "getSubjectDN",
}

interface Payload {
  method: MethodName;
  args: any[];
}

export default class NCALayer {
  private ws: WebSocket;

  constructor(ws: WebSocket) {
    this.ws = ws;
  }

  public BrowseKeyStore(
    storageName: string,
    fileExtension: string,
    currentDirectory: string
  ): MethodName {
    const data: Payload = {
      method: MethodName.BrowseKeyStore,
      args: [storageName, fileExtension, currentDirectory],
    };
    return this.send(data);
  }

  public ShowFileChooser(
    fileExtension: string,
    currentDirectory: string
  ): MethodName {
    const data: Payload = {
      method: MethodName.ShowFileChooser,
      args: [fileExtension, currentDirectory],
    };
    return this.send(data);
  }

  public GetKeys(
    storageName: string,
    storagePath: string,
    password: string,
    type: string
  ): MethodName {
    const data: Payload = {
      method: MethodName.GetKeys,
      args: [storageName, storagePath, password, type],
    };
    return this.send(data);
  }

  public GetSubjectDN(
    storageName: string,
    storagePath: string,
    keyAlias: string,
    password: string
  ): MethodName {
    const data: Payload = {
      method: MethodName.GetSubjectDN,
      args: [storageName, storagePath, keyAlias, password],
    };
    return this.send(data);
  }

  private send(data: Payload): MethodName {
    this.ws.send(JSON.stringify(data));
    return data.method;
  }
}
