import React from 'react';
import { OrganizationProps } from './Organization.props';

const OrganizationFooter = ({ main, request }: OrganizationProps) => {
  return (
    <>
      {request.tab === 1 && (
        <div className='req-inner-footer'>
          <div className='container'>
            <div className='left'>
              <button
                type='button'
                onClick={() => {
                  main.setModal(true);
                  main.setModalType(18);
                }}
                className='button btn-primary mrl-32'
              >
                <i className='trash azla add-plusRound-icon'></i>
                Загрузить документ
              </button>
            </div>
          </div>
        </div>
      )}
      {request.tab === 2 && (
        <div className='req-inner-footer'>
          <div className='container'>
            <div className='left'>
              <button
                type='button'
                onClick={() => {
                  main.setModal(true);
                  main.setModalType(21);
                }}
                className='button btn-primary mrl-32'
              >
                <i className='trash azla add-plusRound-icon'></i>
                Добавить пользователя
              </button>
            </div>
          </div>
        </div>
      )}
      {request.tab === 4 && (
        <div className='req-inner-footer'>
          <div className='container'>
            <div className='left'>
              <button
                type='button'
                onClick={() => {
                  main.setModal(true);
                  main.setModalType(11);
                  main.setModalTypeEdit(1);
                  main.setModalTypeData(null);
                }}
                className='button btn-primary mrl-32'
              >
                <i className='trash azla add-plusRound-icon'></i>
                Добавить пользователя
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrganizationFooter;
