import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";

const MyOrganization = () => {
  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="my-organization p-50 pad-b-128">
              <div className="header-text justify-content-between mb-32">
                <h1 className="title-main">Моя организация</h1>
              </div>
              <Tabs>
                <div className="mb-32">
                  <TabList>
                    <Tab>Общее</Tab>
                    <Tab>Документы</Tab>
                    <Tab>Пользователи</Tab>
                    <Tab>Подключенные услуги</Tab>
                    <Tab>Пользователи услуг</Tab>
                  </TabList>
                </div>
                <TabPanel>
                  <div className="req-inner-body pad-b-128">
                    <h3 className="title-subhead mb-16">Об организации</h3>
                    <div className="total-info mb-32">
                      <ul className="info-list">
                        <li>
                          <span className="left">Полное наименование:</span>
                          <span className="right">
                            Товарищество с ограниченной ответсвенностью
                            “М-Ломбард”
                          </span>
                        </li>
                        <li>
                          <span className="left">Краткое наименование:</span>
                          <span className="right">М-Ломбард</span>
                        </li>
                        <li>
                          <span className="left">БИН:</span>
                          <span className="right">123456789098</span>
                        </li>
                        <li>
                          <span className="left">Вебсайт:</span>
                          <span className="right d-flex">
                            <a
                              href="https://google.kz"
                              target="_blank"
                              className="pre-primary-color"
                            >
                              www.m-lombard.kz
                            </a>{" "}
                            <i className="azla edit-primary-icon ml-8"></i>
                          </span>
                        </li>
                        <li>
                          <span className="left">Тип клиента:</span>
                          <span className="right">Ломбарды</span>
                        </li>
                        <li>
                          <span className="left">Уполномоченное лицо:</span>
                          <span className="right d-flex">
                            Рахметтуллин Рахметулла Рахметуллаевич{" "}
                            <i className="azla edit-primary-icon ml-8"></i>
                          </span>
                        </li>
                        <li>
                          <span className="left">Дата регистрации заявки:</span>
                          <span className="right">20 Июня 2021</span>
                        </li>
                        <li>
                          <span className="left">ОКЭД:</span>
                          <span className="right">
                            90.3.1 - Финансовая деятельность
                          </span>
                        </li>
                      </ul>
                    </div>

                    <h3 className="title-subhead mb-16">Контакты и адреса</h3>

                    <div className="total-info mb-32">
                      <ul className="info-list">
                        <li>
                          <span className="left">Контакты:</span>
                          <span className="right d-flex">
                            +7 (727) 245-94-94 (рабочий)
                            <br />
                            +7 (706) 123-45-67 (моб){" "}
                            <i className="azla edit-primary-icon ml-8"></i>
                          </span>
                          {/* <span>+7 (727) 245-94-94 (рабочий)</span><span>+7 (706) 123-45-67 (моб)</span> */}
                        </li>
                        <li>
                          <span className="left">Фактический адрес:</span>
                          <span className="right d-flex">
                            г. Алматы, ул. Тажибаевой 47, БЦ “Иван”, этаж 24{" "}
                            <i className="azla edit-primary-icon ml-8"></i>
                          </span>
                        </li>
                        <li>
                          <span className="left">Юридический адрес:</span>
                          <span className="right d-flex">
                            г. Алматы, ул. Тажибаевой 47, БЦ “Иван”, этаж 24{" "}
                            <i className="azla edit-primary-icon ml-8"></i>
                          </span>
                        </li>
                        <li>
                          <span className="left">Полный адрес:</span>
                          <span className="right d-flex">
                            Республика Казахстан, г. Алматы, ул. Тажибаевой 47,
                            БЦ “Иван”, этаж 24, 050042{" "}
                            <i className="azla edit-primary-icon ml-8"></i>
                          </span>
                        </li>
                        <li>
                          <span className="left">Индекс:</span>
                          <span className="right d-flex">
                            050042{" "}
                            <i className="azla edit-primary-icon ml-8"></i>
                          </span>
                        </li>
                        <li>
                          <span className="left">Область:</span>
                          <span className="right d-flex">
                            Алматинская область{" "}
                            <i className="azla edit-primary-icon ml-8"></i>
                          </span>
                        </li>
                        <li>
                          <span className="left">Район:</span>
                          <span className="right d-flex">
                            Алматинский{" "}
                            <i className="azla edit-primary-icon ml-8"></i>
                          </span>
                        </li>
                        <li>
                          <span className="left">Город:</span>
                          <span className="right d-flex">
                            Алматы{" "}
                            <i className="azla edit-primary-icon ml-8"></i>
                          </span>
                        </li>
                        <li>
                          <span className="left">Дом/здание:</span>
                          <span className="right d-flex">
                            Тажибаевой{" "}
                            <i className="azla edit-primary-icon ml-8"></i>
                          </span>
                        </li>
                        <li>
                          <span className="left">Улица:</span>
                          <span className="right d-flex">
                            44 <i className="azla edit-primary-icon ml-8"></i>
                          </span>
                        </li>
                      </ul>
                    </div>

                    <h3 className="title-subhead mb-16">
                      Банковские реквизиты
                    </h3>

                    <div className="total-info mb-32">
                      <ul className="info-list">
                        <li>
                          <span className="left">ИИК:</span>
                          <span className="right d-flex">
                            KZ0523523SRQW125{" "}
                            <i className="azla edit-primary-icon ml-8"></i>
                          </span>
                        </li>
                        <li>
                          <span className="left">БИК:</span>
                          <span className="right d-flex">
                            CASPKAKZ{" "}
                            <i className="azla edit-primary-icon ml-8"></i>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyOrganization;
