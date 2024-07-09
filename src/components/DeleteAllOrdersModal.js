import React from "react";

const DeleteAllOrdersModal = ({ closeDeleteAllOrdersModal, handleDelete }) => {
  return (
    <div
      className="modal fade"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      id="allDeleteModal"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-danger">
            <h1 className="modal-title text-white fs-5" id="exampleModalLabel">
              刪除確認
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeDeleteAllOrdersModal}
            />
          </div>
          <div className="modal-body">刪除所有訂單</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeDeleteAllOrdersModal}
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAllOrdersModal;
