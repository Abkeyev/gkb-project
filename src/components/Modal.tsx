import React from 'react';
import './style.css';

const Modal = () => {
    return (
        <div className="modal modal-default">
            <div className="modal-backbg"></div>
            <div className="modal-dialog">
                <div className="modal-content fadeInModal animated">
                    <div className="modal-close"><i className="azla close-icon"></i></div>
                    <div className="modal-body">
                        <h3 className="text-center">Добавьте или перетащите файл</h3>
                        <i className="azla upload-icon size-80 mtb-auto-16"></i>
                        <button type="button" className="button btn-primary table-auto">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Modal;