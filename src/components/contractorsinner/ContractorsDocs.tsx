import React from 'react';
import { ContractorsInnerProps } from './ContractorsInnerProps.props';
import { observer } from 'mobx-react';
import { Categories } from '../../api/Models/ServiceModels';
import { ReactComponent as Spinner } from '../../styles/spinner.svg';

const ContractorsDocs = ({ id, request }: ContractorsInnerProps) => {
  React.useEffect(() => {
    request.getDocuments(id);
    request.getDocumentsType();
    request.getDocumentsCategories();
  }, []);
  return request.loader ? (
    <Spinner />
  ) : (
    <>
      <h3 className='title-subhead mb-16'>Документы</h3>
      {request._getDocCategories && request._getDocCategories.length === 0
        ? 'Документы отсутствуют.'
        : request._getDocCategories.map(
            (c: Categories) =>
              c.doc_type.filter((dt: any) => dt.file !== null).length > 0 && (
                <>
                  <h5 className='title-subhead-h5 mb-16'>{c.name}</h5>
                  <div className='files-added'>
                    <ul className='files-list'>
                      {c.doc_type.map(
                        (d: any) =>
                          d.file && (
                            <li>
                              <i className='azla blank-alt-primary-icon'></i>
                              <span>{d.name}</span>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                </>
              )
          )}
    </>
  );
};

export default observer(ContractorsDocs);
