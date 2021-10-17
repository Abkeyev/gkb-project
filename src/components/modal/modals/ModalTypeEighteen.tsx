import React from 'react';
import BaseModal from '../BaseModal';
import { ModalTypes } from './ModalTypes.props';
import { Categories, ServiceCommon } from '../../../api/Models/ServiceModels';
import { observer } from 'mobx-react';

const ModalTypeEighteen = ({ main, request }: ModalTypes) => {
  const [docCat, setDocCat] = React.useState(0);
  const [docType, setDocType] = React.useState(0);
  const [file, setFile] = React.useState<any | null>(null);
  const [comment, setComment] = React.useState('');
  return (
    <BaseModal size={'modal-large-xl'} main={main}>
      <div className='modal-body'>
        <div className='paper-show'>
          <h3 className='text-left title-subhead mb-16'>Загрузка документа</h3>
          <select
            value={docCat}
            onChange={(e) => setDocCat(+e.target.value)}
            className='form-control-v mt-24'
          >
            <option value='0'>Выберите категорию документа</option>
            {request._getCategories
              .filter((cc: Categories) => cc.id === 1 || cc.id === 3)
              .map((c: Categories) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>
          <select
            value={docType}
            disabled={docCat === 0}
            onChange={(e) => setDocType(+e.target.value)}
            className='form-control-v mt-16'
          >
            <option value='0'>Выберите тип документа</option>
            {docCat &&
              request._getCategories.find(
                (c: Categories) => c.id === +docCat
              ) &&
              request._getCategories
                .find((cc: Categories) => cc.id === +docCat)
                .doc_type.map((c: number) => (
                  <option key={c} value={c}>
                    {request._getTypes &&
                      request._getTypes.find((t: ServiceCommon) => t.id === c)
                        ?.name}
                  </option>
                ))}
          </select>
          <div className='file-add mtb-16'>
            {file === null ? (
              <label
                // type="button"
                className={`button btn-secondary ${
                  docType === 0 ? 'disabled' : ''
                }`}
              >
                <input
                  type='file'
                  onChange={(e) =>
                    e &&
                    e.target &&
                    e.target.files &&
                    e.target.files[0] &&
                    setFile(e.target.files[0])
                  }
                  style={{ display: 'none' }}
                />
                Добавить файл
              </label>
            ) : (
              <div className='file-added'>
                <div className='file-added-text'>
                  <i className='azla blank-alt-primary-icon mr-8'></i>
                  <span>{file.name}</span>
                </div>
                <button
                  type='button'
                  className='btn-icon button delete-btn'
                  onClick={() => setFile(null)}
                >
                  <i className='azla trash-icon-alert'></i> Удалить
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='modal-footer'>
        <button
          type='button'
          disabled={docCat === 0 || docType === 0 || file === null}
          onClick={() => {
            var bodyFormData = new FormData();
            bodyFormData.append('file', file);
            bodyFormData.append('doc_category', docCat.toString());
            bodyFormData.append('doc_type', docType.toString());
            bodyFormData.append('service_type', '');
            bodyFormData.append('is_draft', '');
            bodyFormData.append('comments', '');
            bodyFormData.append('version', '1');
            request
              .addDocument(main.clientData.client.id, bodyFormData)
              .then(() => {
                main.setModal(false);
                setFile(null);
                setDocCat(0);
                setDocType(0);
                setComment('');
              });
          }}
          className='button btn-primary table-ml'
        >
          Подтвердить
        </button>
      </div>
    </BaseModal>
  );
};

export default observer(ModalTypeEighteen);
