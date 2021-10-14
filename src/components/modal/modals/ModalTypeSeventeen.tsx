import React from 'react';
import BaseModal from '../BaseModal';
import { ModalTypes } from './ModalTypes.props';

const ModalTypeSeventeen = ({ main, request }: ModalTypes) => {
  const [website, setWebsite] = React.useState('');
  const [position, setPosition] = React.useState('');
  return (
    <BaseModal size={'modal-large-xl'} main={main}>
      <div className='modal-body'>
        <div className='paper-signatory'>
          <h3 className='text-left title-subhead mb-16'>
            Редактирование данных
          </h3>
        </div>
        <div className='form-wrapper'>
          {main.modalTypeEdit === 0 ? (
            <>
              <input
                type='website'
                defaultValue={request._getClient?.website}
                onChange={(e) => {
                  setWebsite(e.target.value);
                }}
              />
              <label>Вебсайт</label>
            </>
          ) : main.modalTypeEdit === 1 ? (
            ''
          ) : (
            ''
          )}
        </div>
      </div>
      <div className='modal-footer'>
        <div className='d-flex'>
          <button
            type='button'
            className='button btn-secondary mr-16'
            onClick={() => main.setModal(false)}
          >
            Отмена
          </button>
          <button
            type='button'
            className='button btn-primary'
            onClick={(e) => {
              e.preventDefault();
              let data =
                main.modalTypeEdit === 0
                  ? {
                      ...request._getClient,
                      website:
                        website.length === 0
                          ? request._getClient?.website
                          : website,
                    }
                  : main.modalTypeEdit === 1
                  ? { position }
                  : '';
              request.editClient(request._getClient.id, data).then(() => {
                main.setModal(false);
                setWebsite('');
              });
            }}
          >
            Сохранить
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ModalTypeSeventeen;
