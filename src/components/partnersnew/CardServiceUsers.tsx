import React from 'react';

const CardServiceUsers = ({ u, index }: any) => {
  React.useEffect(() => {
    console.log(u);
  }, []);
  return (
    <div className='card mb-24 pad-24'>
      <div className='card-header'>
        <div className='title'>
          <h6 className='text'>{u.full_name}</h6>
          <span className='num'>№{index + 1}</span>
        </div>
        <p className='desc'>{u.position_name}</p>
      </div>
      <div className='card-body pad-rl-16'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='total-info'>
              <ul className='info-list'>
                <li>
                  <span className='left'>ID пользователя:</span>
                  <span className='right'>{u.id}</span>
                </li>
                <li>
                  <span className='left'>ИИН сотрудника:</span>
                  <span className='right'>{u.iin}</span>
                </li>
                <li>
                  <span className='left'>Контактный номер:</span>
                  <span className='right'>{u.contacts}</span>
                </li>
                <li>
                  <span className='left'>Email:</span>
                  <span className='right'>{u.email}</span>
                </li>
                <li>
                  <span className='left'>Глобальный IP:</span>
                  <span className='right'>{u.global_ip}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='total-info'>
              <ul className='info-list'>
                <li>
                  <span className='left'>Первый руководитель:</span>
                  <span className='right'>{u.first_head_full_name}</span>
                </li>
                <li>
                  <span className='left'>Заместитель:</span>
                  <span className='right'>{u.deputy_head_full_name}</span>
                </li>
                <li>
                  <span className='left'>Курирующий менеджер:</span>
                  <span className='right'>{u.manager_full_name}</span>
                </li>
                <li>
                  <span className='left'>Контакты менеджера:</span>
                  <span className='right'>{u.manager_contacts}</span>
                </li>
                <li>
                  <span className='left'>№ удос-ния личности:</span>
                  <span className='right'>{u.idcard_number}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardServiceUsers;
