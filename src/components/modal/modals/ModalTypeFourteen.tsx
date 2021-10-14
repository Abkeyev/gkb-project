import React from 'react';
import { ModalTypes } from './ModalTypes.props';
import BaseModal from '../BaseModal';
import { User } from '../../../api/Models/ServiceModels';

const ModalTypeFourteen = ({ main, request }: ModalTypes) => {
  const [file, setFile] = React.useState<any | null>(null);
  const [comment, setComment] = React.useState('');

  return (
    <BaseModal size={'modal-large-xl'} main={main}>
      <div className='modal-body'>
        <div className='paper-show'>
          <h3 className='text-left title-subhead mb-16'>Прикрепить документ</h3>
          <div className='file-add mb-16'>
            {file === null ? (
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

          <div className='author mb-16'>
            <h5 className='mr-16'>Автор:</h5>
            <div className='profile'>
              <img
                alt='ava'
                className='ava'
                src={process.env.PUBLIC_URL + '/images/def-ava.svg'}
              />
              <span className='name'>
                {request._getAllUsers &&
                  request._getAllUsers.find(
                    (u: User) => u.id === main.clientData.user.id
                  )?.full_name}
              </span>
            </div>
          </div>

          <div className='comment mb-8'>
            <textarea
              rows={5}
              className='form-control-textarea mb-0'
              placeholder='Комментарий к документу'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>

      <div className='modal-footer'>
        <button
          type='button'
          onClick={() => {
            if (request._getDoc) {
              var bodyFormData = new FormData();
              bodyFormData.append('file', file);
              bodyFormData.append('comments', comment);
              bodyFormData.append(
                'doc_category',
                request._getDoc.doc_category.toString()
              );
              bodyFormData.append(
                'doc_type',
                request._getDoc.doc_type.toString()
              );
              bodyFormData.append(
                'service_type',
                request._getRequest.service_type
              );
              bodyFormData.append('is_draft', '');
              bodyFormData.append('version', request.getLastVersion());
              request._getRequest &&
                request
                  .addDogovor(request._getRequest.id, bodyFormData)
                  .then(() => {
                    main.setModal(false);
                    setFile(null);
                    setComment('');
                  });
            }
          }}
          className='button btn-primary table-ml'
        >
          Подтвердить
        </button>
      </div>
    </BaseModal>
  );
};

export default ModalTypeFourteen;
