import React from 'react';
import BaseModal from '../BaseModal';
import { ModalTypes } from './ModalTypes.props';
import { observer } from 'mobx-react';

const ModalTypeSixteen = ({ main, request }: ModalTypes) => {
  const [testKey, setTestKey] = React.useState<any | null>(null);
  const [key, setKey] = React.useState<any | null>(null);
  return (
    <BaseModal size={'modal-large-xl'} main={main}>
      <div className='modal-body'>
        <div className='paper-show'>
          <h3 className='text-left title-subhead mb-16'>Ключи доступа</h3>
          <div className='file-add mb-16'>
            {(main.modalTypeEdit === 1 && testKey === null) ||
            (main.modalTypeEdit === 2 && key === null) ? (
              <label
                // type="button"
                className='button btn-secondary'
              >
                <input
                  type='file'
                  onChange={(e) =>
                    e &&
                    e.target &&
                    e.target.files &&
                    e.target.files[0] &&
                    (main.modalTypeEdit === 1
                      ? setTestKey(e.target.files[0])
                      : setKey(e.target.files[0]))
                  }
                  style={{ display: 'none' }}
                />
                Добавить {main.modalTypeEdit === 1 ? 'тестовый' : 'боевой'} ключ
              </label>
            ) : (
              <div className='file-added'>
                <div className='file-added-text'>
                  <i className='azla blank-alt-primary-icon mr-8'></i>
                  <span>
                    {main.modalTypeEdit === 1 ? testKey.name : key.name}
                  </span>
                </div>
                <button
                  type='button'
                  className='btn-icon button delete-btn'
                  onClick={() =>
                    main.modalTypeEdit === 1 ? setTestKey(null) : setKey(null)
                  }
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
          onClick={() => {
            var bodyFormData = new FormData();
            bodyFormData.append(
              'file',
              main.modalTypeEdit === 1 ? testKey : key
            );
            bodyFormData.append(
              'doc_type',
              main.modalTypeEdit === 1 ? '11' : '10'
            );
            request._getRequest &&
              request
                .addKey(request._getRequest.id, bodyFormData)
                .then(() => {
                  main.setModal(false);
                  setKey(null);
                  setTestKey(null);
                })
                .catch(() => '');
          }}
          className='button btn-primary table-ml'
        >
          Подтвердить
        </button>
      </div>
    </BaseModal>
  );
};

export default observer(ModalTypeSixteen);
