import {
  Client,
  ClientUserAccess,
  ClientUserService,
  Right,
  ServiceCommon,
} from "../../api/Models/ServiceModels";

const CardServiceUsers = ({ request, main, u, index, count = false }: any) => {
  return (
    <div className="card card-rights mb-24 pad-24">
      <div className="card-header">
        <div className="card-header-rights">
          <div className="left">
            <span className="num">№ {index + 1}</span>
            <h6
              className="text"
              onClick={() => {
                main.setModal(true);
                main.setModalType(28);
                main.setModalTypeData(u);
              }}
            >
              {u.full_name}
            </h6>
          </div>
          <div className="right">
            {!count ? (
              <span className="use-service">
                Использует{" "}
                {(request._getClientUserService &&
                  request._getClientUserService.find(
                    (t: ClientUserService) => t.client_user_data.id === u.id
                  )?.service_count) ||
                  0}{" "}
                сервиса
              </span>
            ) : (
              ""
            )}
            <span
              className="close"
              onClick={() =>
                request.setNewAccessUsers([
                  ...request.usersNewAccess.filter(
                    (a: ClientUserAccess) => a.id !== u.id
                  ),
                ])
              }
            >
              <i className="azla close-primary-icon"></i>
            </span>
          </div>
        </div>
        <p className="desc">
          {console.log(u, "uuu")}
          {console.log(request._getPosition, "request._getPosition")}
          {request._getPosition &&
            request._getPosition.find(
              (t: ServiceCommon) => t.id === +u.position_name
            )?.name}{" "}
          – {u.department_name} –
          {request._getClients &&
            request._getClients.find((t: Client) => t.id === u.client)
              ?.longname}
        </p>
      </div>
      <div className="card-body pad-rl-16">
        <div className="row">
          <div className="col-md-12">
            <div className="total-info">
              <h6>Права доступа</h6>
              <ul>
                {u.right_ids.map((r: number) => (
                  <li>
                    <i className="azla icon-success-check"></i>{" "}
                    {request._getRights &&
                      request._getRights.find((t: Right) => t.id === r)?.name}
                  </li>
                ))}
              </ul>
              <button
                className="add-rights"
                onClick={() => {
                  main.setModal(true);
                  main.setModalType(29);
                  main.setModalTypeData(u);
                }}
              >
                <i className="azla add-primary-icon"></i> Изменить права
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className='card mb-24 pad-24'>
    //   <div className='card-header'>
    //     <div className='title'>
    //       <h6 className='text'>{u.full_name}</h6>
    //       <span className='num'>№{index + 1}</span>
    //     </div>
    //     <p className='desc'>{u.position_name}</p>
    //   </div>
    //   <div className='card-body pad-rl-16'>
    //     <div className='row'>
    //       <div className='col-md-6'>
    //         <div className='total-info'>
    //           <ul className='info-list'>
    //             <li>
    //               <span className='left'>ID пользователя:</span>
    //               <span className='right'>{u.id}</span>
    //             </li>
    //             <li>
    //               <span className='left'>ИИН сотрудника:</span>
    //               <span className='right'>{u.iin}</span>
    //             </li>
    //             <li>
    //               <span className='left'>Контактный номер:</span>
    //               <span className='right'>{u.contacts}</span>
    //             </li>
    //             <li>
    //               <span className='left'>Email:</span>
    //               <span className='right'>{u.email}</span>
    //             </li>
    //             <li>
    //               <span className='left'>Глобальный IP:</span>
    //               <span className='right'>{u.global_ip}</span>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //       <div className='col-md-6'>
    //         <div className='total-info'>
    //           <ul className='info-list'>
    //             <li>
    //               <span className='left'>Первый руководитель:</span>
    //               <span className='right'>{u.first_head_full_name}</span>
    //             </li>
    //             <li>
    //               <span className='left'>Заместитель:</span>
    //               <span className='right'>{u.deputy_head_full_name}</span>
    //             </li>
    //             <li>
    //               <span className='left'>Курирующий менеджер:</span>
    //               <span className='right'>{u.manager_full_name}</span>
    //             </li>
    //             <li>
    //               <span className='left'>Контакты менеджера:</span>
    //               <span className='right'>{u.manager_contacts}</span>
    //             </li>
    //             <li>
    //               <span className='left'>№ удос-ния личности:</span>
    //               <span className='right'>{u.idcard_number}</span>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CardServiceUsers;
