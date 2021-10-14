import React from 'react';
import BaseModal from '../BaseModal';
import { ModalTypes } from './ModalTypes.props';

const ModalTypeNineteen = ({ main, request }: ModalTypes) => {
  return (
    <div className='modal modal-large'>
      <div className='modal-backbg' onClick={() => main.setModal(false)}></div>
      {main.doc && (
        <div className='modal-dialog'>
          <div className='modal-content fadeInModal animated'>
            <div className='modal-close' onClick={() => main.setModal(false)}>
              <i className='azla close-icon'></i>
            </div>

            <div className='modal-body'>
              <div className='document-delete'>
                <h3 className='text-center title-subhead mb-16'>
                  Удалить документ?
                </h3>
                <div className='files-delete'>
                  <i className='azla blank-alt-primary-icon'></i>{' '}
                  <span>{main.doc.doc_name}</span>
                </div>
              </div>
            </div>
            <div className='modal-footer bg-white d-flex justify-content-center'>
              <div className='paper-signatory-footer'>
                <button
                  type='button'
                  className='button btn-secondary w-160 mr-16'
                  onClick={() => main.setModal(false)}
                >
                  Отмена
                </button>
                <button
                  type='button'
                  onClick={() => {
                    const data = {
                      ...main.doc,
                      doc_status: 'Archive',
                    };
                    request
                      .deleteDocument(main.clientData.client.id, data)
                      .then(() => {
                        main.setModal(false);
                        request.tab = 2;
                      });
                  }}
                  className='button btn-primary w-160'
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalTypeNineteen;
