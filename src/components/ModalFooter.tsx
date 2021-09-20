import React from 'react';
import { observer } from 'mobx-react-lite';

const ModalFooter = (props: any) => {
    return (
        <div className="modal-footer d-flex-align-c-spaceb">
            {
                props.desc ? <p className="text-desc mb-0">{props.desc}</p> : null
            }
            
            <div className="paper-signatory-footer">
                {
                    props.children
                }
            </div>
        </div>
    )
}

export default observer(ModalFooter)