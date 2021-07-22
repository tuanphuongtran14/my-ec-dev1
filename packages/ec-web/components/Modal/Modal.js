import React, { useContext, createContext } from "react";

const ModalContext = createContext();

export default function Modal({ title, body, id, yes, no, callback }) {
    return (
        <div className="modal" id={`${id}`} tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{body}</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            id="yesBtn"
                            type="button" 
                            className={`btn btn-${yes || 'success'}`}
                            onClick={callback}
                        >
                            Đồng ý
                        </button>
                        <button
                            type="button"
                            className={`btn btn-${no || 'danger'}`}
                            data-dismiss="modal"
                        >
                            Hủy bỏ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
