import { toJS } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import FileReaderInput from "react-file-reader-input";
import { CatDocType, Documents } from "../../api/Models/ServiceModels";

interface FileCardProps {
  type: CatDocType;
  request: any;
  files: Documents[];
  setFiles: any;
  handleChange: any;
  main: any;
  setDocs: any;
}

const FileCard = (props: FileCardProps) => {
  const { type, request, setFiles, files, handleChange, main, setDocs } = props;
  const [fil, setFil]: any = React.useState();

  React.useEffect(() => {
    setFil(
      files.find(
        (f: Documents) =>
          f.doc_category === type.doc_category_id &&
          f.doc_type === type.doc_type_id
      )
    );
  }, [files, setFiles]);

  const handleDelete = () => {
    fil.doc_status = "Archive";
    request
      .deleteDocument(main.clientData.client.id, fil)
      .then(() =>
        request.getDocuments(main.clientData.client.id).then(() => setDocs())
      );
    setFiles([...files.filter((f: Documents) => f.doc_type !== fil.doc_type)]);
  };

  return (
    <li key={type.doc_type_id}>
      <div className="name">
        <span className="text">{type.doc_type_name}</span>
        {fil && fil.doc_status != "Archive" ? (
          <span className="file-name">{fil.doc_name}</span>
        ) : null}
      </div>
      {fil && fil.doc_status != "Archive" ? (
        <button className="btn-icon delete" onClick={() => handleDelete()}>
          <i className="azla size-18 trash-icon-alert mr-8"></i>
          Удалить файл
        </button>
      ) : (
        <FileReaderInput
          as="url"
          accept="image/jpeg,image/png,image/gif,application/pdf"
          onChange={(e, f) => {
            handleChange(e, f, type.doc_type_id, type.doc_category_id);
          }}
        >
          <button className="btn-icon add">
            <i className="azla size-18 pin-primary-icon mr-8"></i>
            Прикрепить файл
          </button>
        </FileReaderInput>
      )}
    </li>
  );
};

export default observer(FileCard);
