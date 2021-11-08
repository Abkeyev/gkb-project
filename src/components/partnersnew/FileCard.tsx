import { observer } from 'mobx-react';
import React from 'react';
import FileReaderInput from 'react-file-reader-input';

const FileCard = (props: any) => {
  const { id, name, allFiles, setAllFiles, handleChange } = props;
  return (
    <li key={id}>
      <div className='name'>
        <span className='text'>{name}</span>
        {allFiles?.map((item: any) => {
          return item.name.includes(`${name}`) ? (
            <span className='file-name'>
              {name ||
                allFiles.filter((item: any) => {
                  return item.name.includes(`${name}`) ? item.doc_name : null;
                })}
            </span>
          ) : null;
        })}
      </div>
      {allFiles?.map((item: any) => {
        return item.name.includes(`${name}`) ? (
          <button className='btn-icon delete' onClick={() => {}}>
            <i className='azla size-18 trash-icon-alert mr-8'></i>
            Удалить файл
          </button>
        ) : (
          <FileReaderInput
            as='url'
            accept='image/jpeg,image/png,image/gif,application/pdf'
            onChange={(e, f) => {
              handleChange(e, f, id, 1, 1);
            }}
          >
            <button className='btn-icon add'>
              <i className='azla size-18 pin-primary-icon mr-8'></i>
              Прикрепить файл
            </button>
          </FileReaderInput>
        );
      })}
    </li>
  );
};

export default observer(FileCard);
