import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import ModalFooter from "./ModalFooter";

const Modal = (props: any) => {
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.setModalOpened(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return props.modalOpened ? (
    <div>
      <div className="modal modal-large-xl">
        <div
          onClick={() => props.setModalOpened(!props.modalOpened)}
          className="modal-backbg"
        ></div>
        <div className="modal-dialog" ref={wrapperRef} role="document">
          <div className="modal-content fadeInModal animated">
            <div
              className="modal-close"
              onClick={() => props.setModalOpened(false)}
            >
              <i className="azla close-icon"></i>
            </div>
            <div className="modal-body modal-body-lg">
              <div className="paper-signatory">
                <h3 className="text-left title-subhead mb-16">{props.title}</h3>
              </div>
              <div className="tab-content">
                <div className="tab-pane active">{props.children[0]}</div>
              </div>
            </div>
            {props.children.length == 2 ? props.children[1] : null}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default observer(Modal);
