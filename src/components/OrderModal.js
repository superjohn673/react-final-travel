import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "../store/messageStore";

const OrderModal = ({ closeOrderModal, getOrders, tempOrder }) => {
  const [tempData, setTempData] = useState({
    create_at: 1523539519,
    is_paid: false,
    message: "",
    products: {},
    user: {},
    num: 2,
  });

  const [, dispatch] = useContext(MessageContext); //沒用到 message可以清掉,但要保留逗號

  useEffect(() => {
    if (tempOrder) {
      setTempData(tempOrder);
    }
  }, [tempOrder]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name.startsWith("products[")) {
      const productId = name.split("[")[1].split("]")[0];
      setTempData({
        ...tempData,
        products: {
          ...tempData.products,
          [productId]: {
            ...tempData.products[productId],
            [name.split(".")[1]]: value,
          },
        },
      });
    } else if (name.startsWith("user.")) {
      setTempData({
        ...tempData,
        user: {
          ...tempData.user,
          [name.split(".")[1]]: value,
        },
      });
    } else if (name === "is_paid") {
      setTempData({
        ...tempData,
        [name]: e.target.checked,
      });
    } else if (["num", "create_at", "message"].includes(name)) {
      setTempData({
        ...tempData,
        [name]: value,
      });
    }
  };

  const submit = async () => {
    try {
      const api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${tempOrder.id}`;
      const res = await axios.put(api, { data: tempData });
      handleSuccessMessage(dispatch, res);
      closeOrderModal();
      getOrders();
    } catch (error) {
      console.log(error);
      handleErrorMessage(dispatch, error);
    }
  };
  return (
    <div
      className="modal fade"
      id="orderModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fs-5" id="exampleModalLabel">
              {tempData.id}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeOrderModal}
            />
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group mb-2">
                  <label htmlFor="create_at">建立時間</label>
                  <input
                    type="text"
                    id="create_at"
                    name="create_at"
                    value={tempData.create_at}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="is_paid">已付款</label>
                  <input
                    type="checkbox"
                    id="is_paid"
                    name="is_paid"
                    checked={!!tempData.is_paid}
                    onChange={handleChange}
                    className="form-check-input"
                  />
                </div>
              </div>
              <div className="col-sm-8">
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="products">
                    產品
                    {Object.keys(tempData.products).map((productId) => (
                      <div key={productId} className="mb-2">
                        <label htmlFor={`products[${productId}].product_id`}>
                          產品ID
                        </label>
                        <input
                          type="text"
                          id={`products[${productId}].product_id`}
                          name={`products[${productId}].product_id`}
                          value={tempData.products[productId].product_id}
                          onChange={handleChange}
                          className="form-control"
                        />
                        <label htmlFor={`products[${productId}].qty`}>
                          數量
                        </label>
                        <input
                          type="text"
                          id={`products[${productId}].qty`}
                          name={`products[${productId}].qty`}
                          value={tempData.products[productId].qty}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    ))}
                  </label>
                </div>
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="user">
                    使用者
                    <div>
                      <label htmlFor="user.name">姓名</label>
                      <input
                        type="text"
                        id="user.name"
                        name="user.name"
                        value={tempData.user.name}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div>
                      <label htmlFor="user.email">Email</label>
                      <input
                        type="email"
                        id="user.email"
                        name="user.email"
                        value={tempData.user.email}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div>
                      <label htmlFor="user.tel">電話</label>
                      <input
                        type="tel"
                        id="user.tel"
                        name="user.tel"
                        value={tempData.user.tel}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div>
                      <label htmlFor="user.address">地址</label>
                      <input
                        type="text"
                        id="user.address"
                        name="user.address"
                        value={tempData.user.address}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </label>
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="num">數量</label>
                  <input
                    type="text"
                    id="num"
                    name="num"
                    value={tempData.num}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="message">留言</label>
                  <textarea
                    id="message"
                    name="message"
                    value={tempData.message}
                    onChange={handleChange}
                    className="form-control"
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submit}
                >
                  更新訂單
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
