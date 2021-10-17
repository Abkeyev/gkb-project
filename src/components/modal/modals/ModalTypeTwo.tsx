import React from 'react';
import BaseModal from '../BaseModal';
import { ModalTypes } from './ModalTypes.props';
import { Client } from '../../../api/Models/ServiceModels';
import { observer } from 'mobx-react';

const ModalTypeTwo = ({ main, request }: ModalTypes) => {
  return (
    <BaseModal size={`modal-large`} main={main}>
      {request._getTempDoc && (
        <div className='modal-body'>
          <div className='paper-show'>
            <h3 className='text-left title-subhead mb-16'>
              {request._getTempDoc.doc_name}
            </h3>
            <div className='file-add mb-32'>
              <button
                className='btn-file btn-icon'
                onClick={() => request.downloadDocument(request._getTempDoc)}
              >
                <i className='azla blank-alt-primary-icon'></i>
                Скачать договор
              </button>
              <p className='info ml-16'>Загружено {''}</p>
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
                  {request._getClients &&
                    request._getClients.find(
                      (t: Client) => t.id === request._getTempDoc.client
                    )?.longname}
                </span>
              </div>
            </div>

            <div className='comment mb-32'>
              <h5>Комментарий:</h5>
              <p>{request._getTempDoc.comments}</p>
            </div>
          </div>
        </div>
      )}

      {main.role === 'Manager' && (
        <div className='modal-footer'>
          <button
            type='button'
            onClick={() =>
              request
                .updateRequest({
                  request_status: 11,
                  client: request._getRequest.client.id,
                })
                .then(() => {
                  main.setModal(false);
                  request.setTempDoc && request.setDoc(request._getTempDoc);
                })
            }
            className='button btn-primary table-ml'
          >
            Приступить к согласованию
          </button>
        </div>
      )}
    </BaseModal>
  );
};

export default observer(ModalTypeTwo);
