import React from "react";
import { observer } from "mobx-react";
import "react-tabs/style/react-tabs.css";
import { Documents, ServiceCommon } from "../api/Models/ServiceModels";
import moment from "moment";
import { runInAction } from "mobx";
import RegistrationZeroStep from "../components/registration/RegistrationZeroStep";
import RegistrationFirstStep from "../components/registration/RegistrationFirstStep";
import RegistrationSecondStep from "../components/registration/RegistrationSecondStep";

const Registration = observer((props: any) => {
  const { main, request } = props;
  const [step, setStep] = React.useState(0);
  const [iin, setIin] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [signingAuth, setSigningAuth] = React.useState("");
  const [otherPosition, setOtherPosition] = React.useState("");
  const [otherSigningAuth, setOtherSigningAuth] = React.useState("");
  const [file1, setFile1] = React.useState<any | null>(null);
  const [file2, setFile2] = React.useState<any | null>(null);
  const [file3, setFile3] = React.useState<any | null>(null);
  const [file4, setFile4] = React.useState<any | null>(null);
  const [file5, setFile5] = React.useState<any | null>(null);
  const [file6, setFile6] = React.useState<any | null>(null);
  const [file7, setFile7] = React.useState<any | null>(null);
  React.useEffect(() => {
    request.getClientTypes();
    request.getPosition();
    request.getSigningAuth();
    request.getDocuments(main.clientData.client.id).then((res: any) => {
      if (request._getDocuments.length > 0) {
        request.addedFiles = [];
        (request._getDocuments as Documents[])
          .filter((dd: Documents) => dd.doc_status === "Active")
          .map((d: Documents) => {
            if (d.doc_type === 3 && d.doc_category === 1) {
              setFile1(d);
            } else if (d.doc_type === 4 && d.doc_category === 1) {
              setFile2(d);
            } else if (d.doc_type === 5 && d.doc_category === 1) {
              setFile3(d);
            } else if (d.doc_type === 6 && d.doc_category === 2) {
              setFile4(d);
            } else if (d.doc_type === 2 && d.doc_category === 1) {
              setFile5(d);
            } else if (d.doc_type === 12 && d.doc_category === 1) {
              setFile6(d);
            } else if (d.doc_type === 6 && d.doc_category === 2) {
              setFile7(d);
            }
          });
      }
    });
    main.clientExist ? setStep(2) : setStep(0);
  }, []);

  const handleChange = (
    e: any,
    doc_type: any,
    doc_category: any,
    index: number
  ) => {
    e.preventDefault();
    const file = e && e.target && e.target.files && e.target.files[0];
    if (file && file.size < 5000000) {
      if (index === 1) setFile1(file);
      else if (index === 2) setFile2(file);
      else if (index === 3) setFile3(file);
      else if (index === 4) setFile4(file);
      else if (index === 5) setFile5(file);
      else if (index === 6) setFile6(file);
      else if (index === 7) setFile7(file);
      var bodyFormData = new FormData();
      bodyFormData.append("file", file);
      bodyFormData.append("service_type", "");
      bodyFormData.append("doc_category", doc_category);
      bodyFormData.append("comments", "");
      bodyFormData.append("version", "1");
      bodyFormData.append("doc_type", doc_type);
      bodyFormData.append("is_draft", "true");
      request.addDocument(main.clientData.client.id, bodyFormData);
    }
  };

  const deleteDoc = (file: any) => {
    const data = {
      ...file,
      doc_status: "Archive",
    };
    request.deleteDocument(main.clientData.client.id, data);
  };

  const regAuthPerson = () => {
    main
      .regAuthPerson(main.clientData.auth_person.id, {
        full_name: main.clientData.auth_person.full_name,
        client: main.clientData.client.id,
        position:
          position === "other"
            ? request._getPosition.find((t: any) => t.name === otherPosition)
                ?.id
            : position,
        sign_auth: signingAuth,
        signing_authority_comment: signingAuth === "1" ? otherSigningAuth : "",
      })
      .then(() => main.finishReg());
  };

  return (
    <section className="register-page">
      <div className="container">
        <form>
          <div className="logo-image">
            <img src={process.env.PUBLIC_URL + "/logo-image.png"} alt="logo" />
          </div>
          {step === 0 ? (
            <RegistrationZeroStep
              main={main}
              request={request}
              setStep={setStep}
              handleChange={handleChange}
              deleteDoc={deleteDoc}
              file1={file1}
              file2={file2}
              file3={file3}
              file4={file4}
              file5={file5}
              setFile1={setFile1}
              setFile2={setFile2}
              setFile3={setFile3}
              setFile4={setFile4}
              setFile5={setFile5}
            />
          ) : step === 1 ? (
            <RegistrationFirstStep
              main={main}
              request={request}
              setStep={setStep}
              regAuthPerson={regAuthPerson}
              file6={file6}
              setFile6={setFile6}
              file7={file7}
              setFile7={setFile7}
              deleteDoc={deleteDoc}
              handleChange={handleChange}
              position={position}
              setPosition={setPosition}
              otherPosition={otherPosition}
              setOtherPosition={setOtherPosition}
              signingAuth={signingAuth}
              setSigningAuth={setSigningAuth}
              otherSigningAuth={otherSigningAuth}
              setOtherSigningAuth={setOtherSigningAuth}
            />
          ) : (
            <RegistrationSecondStep
              main={main}
              request={request}
              setStep={setStep}
              regAuthPerson={regAuthPerson}
              file6={file6}
              setFile6={setFile6}
              file7={file7}
              setFile7={setFile7}
              deleteDoc={deleteDoc}
              handleChange={handleChange}
              position={position}
              setPosition={setPosition}
              otherPosition={otherPosition}
              setOtherPosition={setOtherPosition}
              signingAuth={signingAuth}
              setSigningAuth={setSigningAuth}
              otherSigningAuth={otherSigningAuth}
              setOtherSigningAuth={setOtherSigningAuth}
            />
          )}
        </form>
      </div>
    </section>
  );
});
export default Registration;
