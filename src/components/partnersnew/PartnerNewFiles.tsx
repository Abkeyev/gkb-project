import React from "react";
import { ReactComponent as Spinner } from "../../styles/spinner.svg";
import { CatDocType, Documents } from "../../api/Models/ServiceModels";
import { PartnerNewProps } from "./PartnerNewProps.props";
import FileCard from "./FileCard";
import { observer } from "mobx-react";
import { toJS } from "mobx";

const PartnerNewFiles = ({
  request,
  main,
  filesId,
  setFilesId,
}: PartnerNewProps) => {
  React.useEffect(() => {
    setDocs();
  }, [request._getDocsTypes]);
  const setDocs = (isNew: boolean = false) => {
    let docs: Documents[] = isNew ? [] : filesId;
    if (request._getDocuments.length > 0) {
      (request._getDocuments as Documents[])
        .filter((dd: Documents) => dd.doc_status === "Active")
        .map((d: Documents) => {
          request._getDocsTypes.length > 0 &&
            request._getDocsTypes.map((dt: CatDocType) => {
              if (
                dt.doc_category_id === d.doc_category &&
                dt.doc_type_id === d.doc_type &&
                docs.filter(
                  (f: Documents) =>
                    f.doc_category === dt.doc_category_id &&
                    f.doc_type === dt.doc_type_id
                ).length === 0
              ) {
                docs.push(d);
              }
            });
        });
    }
    setFilesId([...docs]);
  };
  const handleChange = (
    e: any,
    results: any,
    doc_type: any,
    doc_category: any
  ) => {
    results.forEach((result: any) => {
      const [e, file] = result;
      const res = e.target.result.split(",");
      if (file.size < 5000000) {
        var bodyFormData = new FormData();
        bodyFormData.append("file", file);
        bodyFormData.append("service_type", request.service);
        bodyFormData.append("doc_category", doc_category);
        bodyFormData.append("comments", "");
        bodyFormData.append("version", "1");
        bodyFormData.append("doc_type", doc_type);
        bodyFormData.append("is_draft", "true");
        request
          .addDocument(main.clientData.client.id, bodyFormData, true)
          .then(() =>
            request
              .getDocuments(main.clientData.client.id)
              .then(() => setDocs(true))
          );
      }
    });
  };
  return (
    request.service && (
      <div style={{ marginTop: "40px" }} className="special-card">
        <h3 className="title-subhead mb-16 mt-32">??????????????????</h3>
        <p className="text-desc">
          ???????????????????? ???????????????? ?????????????????????? ?????????????????? ?????? ???????????? ???? ??????????????????????
        </p>
        {false ? (
          <Spinner />
        ) : (
          <div className="reg-file-add mb-32">
            <ul>
              {request._getDocsTypes &&
                request._getDocsTypes.length > 0 &&
                request._getDocsTypes.map((type: CatDocType) => {
                  return (
                    <FileCard
                      type={type}
                      handleChange={handleChange}
                      request={request}
                      files={filesId}
                      setFiles={setFilesId}
                      main={main}
                      setDocs={setDocs}
                    />
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    )
  );
};

export default observer(PartnerNewFiles);
