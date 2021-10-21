import React from 'react';
import { observer } from 'mobx-react';
import { RequestInnerProps } from './RequestInnerProps.props';

const RequestInnerFourthStep = ({ request }: RequestInnerProps) => {
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
                  {request._getRequest.request_status === 10 ? (
                    <div className='keys-loader mb-32'>
                      <h5>Тестовые ключи не предоставлены. Ожидайте.</h5>
                      <p>
                        Ключи предоставляются департаментом Service Desk после
                        проверки всех данных контрагента. Это занимает 2-7 дней
                        с момента принятия формы доступа менеджером.
                      </p>
                    </div>
                  ) : (
                    <div className='keys-btn'>
                      {request.testKey && (
                        <button
                          type='button'
                          className='btn-file btn-icon'
                          onClick={() => request.downloadKeys(request.testKey)}
                        >
                          Скачать тестовые ключи
                        </button>
                      )}
                      {request.prodKey &&
                        request._getRequest.request_stepper > 4 && (
                          <button
                            type='button'
                            className='btn-file btn-icon'
                            onClick={() =>
                              request.downloadKeys(request.prodKey)
                            }
                          >
                            Скачать боевые ключи
                          </button>
                        )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(RequestInnerFourthStep);
