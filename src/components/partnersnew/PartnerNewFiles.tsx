import React from 'react';
import { ReactComponent as Spinner } from '../../styles/spinner.svg';
import { Documents } from '../../api/Models/ServiceModels';
import FileReaderInput from 'react-file-reader-input';
import { PartnerNewProps } from './PartnerNewProps.props';
import FileCard from './FileCard';
import { observer } from 'mobx-react';

const PartnerNewFiles = ({
  request,
  main,
  filesId,
  setFilesId,
}: PartnerNewProps) => {
  const [file1, setFile1] = React.useState<any | null>(null);
  const [file2, setFile2] = React.useState<any | null>(null);
  const [file3, setFile3] = React.useState<any | null>(null);
  const [file4, setFile4] = React.useState<any | null>(null);
  const [file5, setFile5] = React.useState<any | null>(null);
  const [allFiles, setAllFiles] = React.useState<any | []>([]);
  React.useEffect(() => {
    request.getDocuments(main.clientData.client.id).then((res: any) => {
      if (request._getDocuments.length > 0) {
        request.addedFiles = [];
        (request._getDocuments as Documents[])
          .filter((dd: Documents) => dd.doc_status === 'Active')
          .map((d: Documents) => {
            // if (d.doc_type === 3 && d.doc_category === 1) {
            //   setFile1(d);
            //   setFilesId([...filesId, d.id]);
            // } else if (d.doc_type === 4 && d.doc_category === 1) {
            //   setFile2(d);
            //   setFilesId([...filesId, d.id]);
            // } else if (d.doc_type === 5 && d.doc_category === 1) {
            //   setFile3(d);
            //   setFilesId([...filesId, d.id]);
            // } else if (d.doc_type === 6 && d.doc_category === 2) {
            //   setFile4(d);
            //   setFilesId([...filesId, d.id]);
            // } else if (d.doc_type === 2 && d.doc_category === 1) {
            //   setFile5(d);
            //   setFilesId([...filesId, d.id]);
            // }
          });
      }
    });
  }, []);
  const handleChange = (
    e: any,
    results: any,
    doc_type: any,
    doc_category: any,
    index: number
  ) => {
    results.forEach((result: any) => {
      const [e, file] = result;
      const res = e.target.result.split(',');
      if (file.size < 5000000) {
        if (index === 1) setFile1(file);
        else if (index === 2) setFile2(file);
        else if (index === 3) setFile3(file);
        else if (index === 4) setFile4(file);
        else if (index === 5) setFile5(file);
        var bodyFormData = new FormData();
        bodyFormData.append('file', file);
        bodyFormData.append('service_type', request.service);
        bodyFormData.append('doc_category', doc_category);
        bodyFormData.append('comments', '');
        bodyFormData.append('version', '1');
        bodyFormData.append('doc_type', doc_type);
        bodyFormData.append('is_draft', 'true');
        console.table(bodyFormData);
        setAllFiles([...allFiles, bodyFormData]);
        request.addDocument(main.clientData.client.id, bodyFormData, true);
      }
    });
  };
  return (
    request.service && (
      <div style={{ marginTop: '40px' }} className='special-card'>
        <h3 className='title-subhead mb-16 mt-32'>Документы</h3>
        <p className='text-desc'>
          Пожалуйста добавьте недостающие документы для заявки на подключение
        </p>
        {request?.loader ? (
          <Spinner />
        ) : (
          <div className='reg-file-add mb-32'>
            <ul>
              {request?._getDocsTypes?.map((type: any) => {
                return (
                  <FileCard
                    name={type.name}
                    id={type.id}
                    allFiles={allFiles}
                    setAllFiles={setAllFiles}
                    handleChange={handleChange}
                  />
                );
              })}
              {/* <li>
                <div className='name'>
                  <span className='text'>
                    Справка о регистрации/перерегистрации юридического лица
                  </span>
                  {file1 && (
                    <span className='file-name'>
                      {file1.name || file1.doc_name}
                    </span>
                  )}
                </div>
                {file1 ? (
                  <button
                    className='btn-icon delete'
                    onClick={() => {
                      setFile1(null);
                    }}
                  >
                    <i className='azla size-18 trash-icon-alert mr-8'></i>
                    Удалить файл
                  </button>
                ) : (
                  <FileReaderInput
                    as='url'
                    accept='image/jpeg,image/png,image/gif,application/pdf'
                    onChange={(e, f) => handleChange(e, f, 3, 1, 1)}
                  >
                    <button className='btn-icon add'>
                      <i className='azla size-18 pin-primary-icon mr-8'></i>
                      Прикрепить файл
                    </button>
                  </FileReaderInput>
                )}
              </li>
              <li>
                <div className='name'>
                  <span className='text'>
                    Решение учредителя с данными о приеме на работу первого
                    руководителя
                  </span>
                  {file2 && (
                    <span className='file-name'>
                      {file2.name || file2.doc_name}
                    </span>
                  )}
                </div>
                {file2 ? (
                  <button
                    className='btn-icon delete'
                    onClick={() => {
                      setFile2(null);
                    }}
                  >
                    <i className='azla size-18 trash-icon-alert mr-8'></i>
                    Удалить файл
                  </button>
                ) : (
                  <FileReaderInput
                    as='url'
                    accept='image/jpeg,image/png,image/gif,application/pdf'
                    onChange={(e, f) => handleChange(e, f, 4, 1, 2)}
                  >
                    <button className='btn-icon add'>
                      <i className='azla size-18 pin-primary-icon mr-8'></i>
                      Прикрепить файл
                    </button>
                  </FileReaderInput>
                )}
              </li>
              <li>
                <div className='name'>
                  <span className='text'>
                    Приказ о приеме на работу первого руководителя
                  </span>
                  {file3 && (
                    <span className='file-name'>
                      {file3.name || file3.doc_name}
                    </span>
                  )}
                </div>
                {file3 ? (
                  <button
                    className='btn-icon delete'
                    onClick={() => {
                      setFile3(null);
                    }}
                  >
                    <i className='azla size-18 trash-icon-alert mr-8'></i>
                    Удалить файл
                  </button>
                ) : (
                  <FileReaderInput
                    as='url'
                    accept='image/jpeg,image/png,image/gif,application/pdf'
                    onChange={(e, f) => handleChange(e, f, 5, 1, 3)}
                  >
                    <button className='btn-icon add'>
                      <i className='azla size-18 pin-primary-icon mr-8'></i>
                      Прикрепить файл
                    </button>
                  </FileReaderInput>
                )}
              </li>
              <li>
                <div className='name'>
                  <span className='text'>
                    Документ, удостоверяющий личность первого руководителя
                  </span>
                  {file4 && (
                    <span className='file-name'>
                      {file4.name || file4.doc_name}
                    </span>
                  )}
                </div>

                {file4 ? (
                  <button
                    className='btn-icon delete'
                    onClick={() => {
                      setFile4(null);
                    }}
                  >
                    <i className='azla size-18 trash-icon-alert mr-8'></i>
                    Удалить файл
                  </button>
                ) : (
                  <FileReaderInput
                    as='url'
                    accept='image/jpeg,image/png,image/gif,application/pdf'
                    onChange={(e, f) => handleChange(e, f, 6, 2, 4)}
                  >
                    <button className='btn-icon add'>
                      <i className='azla size-18 pin-primary-icon mr-8'></i>
                      Прикрепить файл
                    </button>
                  </FileReaderInput>
                )}
              </li>
              <li>
                <div className='name'>
                  <span className='text'>Устав юрического лица</span>
                  {file5 && (
                    <span className='file-name'>
                      {file5.name || file5.doc_name}
                    </span>
                  )}
                </div>
                {file5 ? (
                  <button
                    className='btn-icon delete'
                    onClick={() => {
                      setFile5(null);
                    }}
                  >
                    <i className='azla size-18 trash-icon-alert mr-8'></i>
                    Удалить файл
                  </button>
                ) : (
                  <FileReaderInput
                    as='url'
                    accept='image/jpeg,image/png,image/gif,application/pdf'
                    onChange={(e, f) => handleChange(e, f, 2, 1, 5)}
                  >
                    <button className='btn-icon add'>
                      <i className='azla size-18 pin-primary-icon mr-8'></i>
                      Прикрепить файл
                    </button>
                  </FileReaderInput>
                )}
              </li> */}
            </ul>
          </div>
        )}
      </div>
    )
  );
};

export default observer(PartnerNewFiles);
