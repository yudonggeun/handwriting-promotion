import React, { useRef } from "react";

function Modal(props) {

    const id = props.id;
    const alarm_text = props.text;
    const request = props.functions;
    const modal = useRef();

    const close = () => {
        modal.current.classList.add("hidden")
    }

    const functions = () => {
        modal.current.classList.add("hidden")
        request();
    }

    return (
        <div className="modal fixed hidden top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto bg-gray-900/50"
            id={id} 
            ref={modal}
            tabIndex="-1"
            aria-labelledby={`${id}ModalLabel`} 
            aria-hidden="true">
            <div className="modal-dialog relative w-auto pointer-events-none">
                <div
                    className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <div
                        className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800" id={`${id}ModalLabel`}>알림</h5>
                        <button type="button"
                            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body relative p-4">
                        {alarm_text}
                    </div>
                    <div
                        className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                        <button className="bg-red-500 hover:bg-red-600 text-white rounded-lg mx-2 my-3 p-1" onClick={() => close()}>닫기</button>
                        <button className="bg-green-500 hover:bg-green-600 text-white rounded-lg my-3 p-1" data-bs-dismiss="modal" onClick={() => functions()}>확인</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;