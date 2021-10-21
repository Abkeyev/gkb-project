import React from 'react';
import { observer } from 'mobx-react';
import { ServiceDeskInnerProps } from './ServiceDeskInnerProps.props';

const ServiceDeskInnerFourthStep = ({
  request,
  main,
}: ServiceDeskInnerProps) => {
  return (
    <>
      <div className='pad-b-128'>
        <div className='req-inner-body'>
          <div className='pad-rl-16'>
            <div className='row'>
              <div className='col-md-8'>
                <h3 className='title-subhead mb-16'>Тестирование сервисов</h3>
                <div className='files-added'>
                  <ul className='files-list'>
                    {request.testProt && (
                      <li>
                        <i className='azla blank-alt-primary-icon'></i>
                        <span
                          onClick={() =>
                            request.downloadDocument(request.testProt)
                          }
                        >
                          Протокол тестирования
                        </span>
                      </li>
                    )}
                    {request.testAct && (
                      <li>
                        <i className='azla blank-alt-primary-icon'></i>
                        <span
                          onClick={() =>
                            request.downloadDocument(request.testAct)
                          }
                        >
                          Акт тестирования
                        </span>
                      </li>
                    )}
                  </ul>
                </div>

                <h3 className='title-subhead mb-16'>Сценарий тестирования</h3>
                <p className='text-desc'>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                  Exercitation veniam consequat sunt nostrud amet.
                </p>
              </div>
              <div className='col-md-3 offset-md-1'>
                <div className='keys-add'>
                  <h3 className='title-subhead mb-16'>Ключи доступа</h3>
                  <div className='keys-btn'>
                    {request.testKey ? (
                      <button
                        type='button'
                        className='btn-file btn-icon'
                        onClick={() => request.downloadKeys(request.testKey)}
                      >
                        Скачать тестовые ключи
                      </button>
                    ) : (
                      <div
                        className='file-add-sd'
                        onClick={() => {
                          main.setModal(true);
                          main.setModalType(16);
                          main.setModalTypeEdit(1);
                        }}
                      >
                        <i className='azla plus-primary-icon size-18 mr-8'></i>
                        Тестовые ключи
                      </div>
                    )}
                    {request.prodKey ? (
                      <button
                        type='button'
                        className='btn-file btn-icon'
                        onClick={() => request.downloadKeys(request.prodKey)}
                      >
                        Скачать боевые ключи
                      </button>
                    ) : (
                      <div
                        className='file-add-sd'
                        onClick={() => {
                          main.setModal(true);
                          main.setModalType(16);
                          main.setModalTypeEdit(2);
                        }}
                      >
                        <i className='azla plus-primary-icon size-18 mr-8'></i>
                        Боевые ключи
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(ServiceDeskInnerFourthStep);
