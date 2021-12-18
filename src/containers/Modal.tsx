import { observer } from "mobx-react";
import React from "react";
import ModalTypeEighteen from "../components/modal/modals/ModalTypeEighteen";
import ModalTypeFifteen from "../components/modal/modals/ModalTypeFifteen";
import ModalTypeFourteen from "../components/modal/modals/ModalTypeFourteen";
import ModalTypeSeventeen from "../components/modal/modals/ModalTypeSeventeen";
import ModalTypeSixteen from "../components/modal/modals/ModalTypeSixteen";
import ModalTypeZero from "../components/modal/modals/ModalTypeZero";
import ModalTypeTen from "../components/modal/modals/ModalTypeTen";
import ModalTypeOne from "../components/modal/modals/ModalTypeOne";
import ModalTypeTwo from "../components/modal/modals/ModalTypeTwo";
import ModalTypeThree from "../components/modal/modals/ModalTypeThree";
import ModalTypeFour from "../components/modal/modals/ModalTypeFour";
import ModalTypeFive from "../components/modal/modals/ModalTypeFive";
import ModalTypeSix from "../components/modal/modals/ModalTypeSix";
import ModalTypeSeven from "../components/modal/modals/ModalTypeSeven";
import ModalTypeEight from "../components/modal/modals/ModalTypeEight";
import ModalTypeNine from "../components/modal/modals/ModalTypeNine";
import ModalTypeEleven from "../components/modal/modals/ModalTypeEleven";
import ModalTypeThirteen from "../components/modal/modals/ModalTypeThirteen";
import ModalTypeNineteen from "../components/modal/modals/ModalTypeNineteen";
import ModalTypeTwenty from "../components/modal/modals/ModalTypeTwenty";
import ModalTypeTwentyOne from "../components/modal/modals/ModalTypeTwentyOne";
import ModalTypeTwentyTwo from "../components/modal/modals/ModalTypeTwentyTwo";
import ModalTypeTwentyThree from "../components/modal/modals/ModalTypeTwentyThree";
import ModalTypeTwentyFour from "../components/modal/modals/ModalTypeTwentyFour";
import ModalTypeTwentyFive from "../components/modal/modals/ModalTypeTwentyFive";
import ModalTypeTwentySeven from "../components/modal/modals/ModalTypeTwentySeven";
import ModalDefault from "../components/modal/modals/ModalDefault";
import ModalSuccess from "../components/modal/modals/ModalSuccess";

const Modal = observer((props: any) => {
  const { main, request } = props;
  return (
    <div>
      {main.modalType === 0 ? (
        <ModalTypeZero main={main} request={request} />
      ) : main.modalType === 1 ? (
        <ModalTypeOne main={main} request={request} />
      ) : main.modalType === 2 ? (
        <ModalTypeTwo main={main} request={request} />
      ) : main.modalType === 3 ? (
        <ModalTypeThree main={main} request={request} />
      ) : main.modalType === 4 ? (
        <ModalTypeFour main={main} request={request} />
      ) : main.modalType === 5 ? (
        <ModalTypeFive main={main} request={request} />
      ) : main.modalType === 6 ? (
        <ModalTypeSix main={main} request={request} />
      ) : main.modalType === 7 ? (
        <ModalTypeSeven main={main} request={request} />
      ) : main.modalType === 8 ? (
        <ModalTypeEight main={main} request={request} />
      ) : main.modalType === 9 ? (
        <ModalTypeNine main={main} request={request} />
      ) : main.modalType === 10 ? (
        <ModalTypeTen main={main} request={request} />
      ) : main.modalType === 11 ? (
        <ModalTypeEleven main={main} request={request} />
      ) : main.modalType === 13 ? (
        <ModalTypeThirteen main={main} request={request} />
      ) : main.modalType === 14 ? (
        <ModalTypeFourteen main={main} request={request} />
      ) : main.modalType === 15 ? (
        <ModalTypeFifteen main={main} request={request} />
      ) : main.modalType === 16 ? (
        <ModalTypeSixteen main={main} request={request} />
      ) : main.modalType === 17 ? (
        <ModalTypeSeventeen main={main} request={request} />
      ) : main.modalType === 18 ? (
        <ModalTypeEighteen main={main} request={request} />
      ) : main.modalType === 19 ? (
        <ModalTypeNineteen main={main} request={request} />
      ) : main.modalType === 20 ? (
        <ModalTypeTwenty main={main} request={request} />
      ) : main.modalType === 21 ? (
        <ModalTypeTwentyOne main={main} request={request} />
      ) : main.modalType === 22 ? (
        <ModalTypeTwentyTwo main={main} request={request} />
      ) : main.modalType === 23 ? (
        <ModalTypeTwentyThree main={main} request={request} />
      ) : main.modalType === 24 ? (
        <ModalTypeTwentyFour main={main} request={request} />
      ) : main.modalType === 25 ? (
        <ModalTypeTwentyFive main={main} request={request} />
      ) : main.modalType == 26 ? (
        <ModalSuccess main={main} request={request} />
      ) : main.modalType == 27 ? (
        <ModalTypeTwentySeven main={main} request={request} />
      ) : (
        <ModalDefault main={main} request={request} />
      )}
    </div>
  );
});
export default Modal;
