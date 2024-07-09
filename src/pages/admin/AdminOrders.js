import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import OrderModal from "../../components/OrderModal";
import DeleteModal from "../../components/DeleteModal";
import DeleteAllOrdersModal from "../../components/DeleteAllOrdersModal";
import Pagination from "../../components/Pagination";
import { Modal } from "bootstrap";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});

  //暫存欄位
  const [tempOrder, setTempOrder] = useState({
    create_at: 1523539519,
    is_paid: false,
    message: "",
    products: {},
    user: {},
    num: 2,
  });

  const orderModal = useRef(null);
  const deleteModal = useRef(null);
  const allDeleteModal = useRef(null);

  useEffect(() => {
    orderModal.current = new Modal("#orderModal", {
      backdrop: "static",
    });
    deleteModal.current = new Modal("#deleteModal", {
      backdrop: "static",
    });
    allDeleteModal.current = new Modal("#allDeleteModal", {
      backdrop: "static",
    });
    getOrders();
  }, []);

  const getOrders = async (page = 1) => {
    const orderRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`
    );
    console.log("訂單", orderRes);
    setOrders(orderRes.data.orders);
    setPagination(orderRes.data.pagination);
  };

  const openOrderModal = (order) => {
    if (order) {
      console.log("order", order);
      setTempOrder(order);
      orderModal.current.show();
    }
  };
  const closeOrderModal = () => {
    orderModal.current.hide();
  };
  const openDeleteModal = (order) => {
    setTempOrder(order);
    deleteModal.current.show();
  };
  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };

  const deleteOrder = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${id}`
      );
      if (res.data.success) {
        getOrders();
        closeDeleteModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openDeleteAllOrdersModal = () => {
    allDeleteModal.current.show();
  };
  const closeDeleteAllOrdersModal = () => {
    allDeleteModal.current.hide();
  };

  const deleteAllOrders = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders/all`
      );
      if (res.data.success) {
        getOrders();
        closeDeleteAllOrdersModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3">
      <OrderModal
        closeOrderModal={closeOrderModal}
        getOrders={getOrders}
        tempOrder={tempOrder}
      />
      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        getOrders={getOrders}
        productText={`${tempOrder.user.name} 訂單`}
        handleDelete={deleteOrder}
        id={tempOrder.id}
      />
      <DeleteAllOrdersModal
        closeDeleteAllOrdersModal={closeDeleteAllOrdersModal}
        handleDelete={deleteAllOrders}
      />
      <h3>訂單列表</h3>
      <hr />
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={openDeleteAllOrdersModal}
        >
          刪除所有訂單
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">訂單編號</th>
            <th scope="col">姓名</th>
            <th scope="col">mail</th>
            <th scope="col">電話</th>
            <th scope="col">訂單時間</th>
            <th scope="col">付款</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user.name}</td>
                <td>{order.user.email}</td>
                <td>{order.user.tel}</td>
                <td>{new Date(order.create_at * 1000).toLocaleString()}</td>
                <td>{order.is_paid ? "付款" : "未付款"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      openOrderModal(order);
                    }}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => {
                      openDeleteModal(order);
                    }}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination changePage={getOrders} pagination={pagination} />
    </div>
  );
};

export default AdminOrders;
