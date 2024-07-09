import React, { useEffect, useState, useContext } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import { AppContext } from "../../store/AppContext";
// import OrderDetail from "./OrderDetail";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsloading] = useState(false);
  //   const [shouldRefresh, setShouldRefresh] = useState(false);

  const getOrders = async (page = 1) => {
    setIsloading(true);
    const orderRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/orders?page=${page}`
    );
    console.log("訂單", orderRes);
    setOrders(orderRes.data.orders);
    setPagination(orderRes.data.pagination);
    setIsloading(false);
  };

  //   const handleOrderPaid = () => {
  //     setShouldRefresh(true); // 設置需要刷新頁面
  //   };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div className="container mt-md-5 mt-3 mb-7">
        <Loading isLoading={isLoading} />
        <p className="fs-4 text-center fw-bold mb-4">訂單列表</p>
        {orders.map((order) => (
          <Link
            to={`/member/orders/${order.id}`}
            key={order.id}
            className="text-decoration-none text-reset"
          >
            <div className="mb-5 border rounded-3 p-4">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">訂單編號 : {order.id}</h5>
                <p
                  className={`mb-0 ${
                    order.is_paid ? "text-success" : "text-danger"
                  }`}
                >
                  {order.is_paid ? "已付款" : "未付款"}
                </p>
              </div>
              <hr className="my-3" />
              <div className="row">
                <div className="col-md-12">
                  {Object.keys(order.products).map((productKey) => (
                    <div key={productKey} className="mb-3 row ">
                      <div className="col-12 col-md-6 mb-3">
                        <img
                          src={order.products[productKey].product.imageUrl}
                          alt={order.products[productKey].product.title}
                          className="img-fluid rounded-3 me-3"
                          style={{ maxHeight: "300px" }}
                        />
                      </div>
                      <div className="col-12 col-md-6 d-flex flex-column justify-content-between">
                        <h5 className="mb-1 fw-bold">
                          {order.products[productKey].product.title}
                        </h5>
                        {/* <p>
                            <span className="">建立時間 : </span>{" "}
                            {new Date(order.create_at * 1000).toLocaleString()}
                          </p> */}

                        <ul className="list-unstyled">
                          <li>
                            <span className="fw-bold">姓名 : </span>{" "}
                            {order.user.name}
                          </li>
                          <li>
                            <span className="fw-bold">電話 : </span>{" "}
                            {order.user.tel}
                          </li>
                          <li>
                            <span className="fw-bold">Email : </span>{" "}
                            {order.user.email}
                          </li>
                        </ul>
                        <div>
                          {" "}
                          <p className="mb-1">
                            <span className="fw-bold">總人數 :</span>{" "}
                            {order.products[productKey].qty}
                          </p>
                          <p>
                            <span className="fw-bold">訂單總金額 : </span>{" "}
                            {order.total}
                          </p>
                        </div>

                        <div
                          className={`text-end ${
                            order.is_paid ? "d-none" : ""
                          }`}
                        >
                          <button type="button" class="btn btn-primary ">
                            前往付款
                          </button>
                        </div>
                        {/* <p className="mb-0">
                            總金額: {order.products[productKey].total}
                          </p> */}
                      </div>
                    </div>
                  ))}

                  {/* <p>
                    <span className="fw-bold">訂單留言 : </span> {order.message}
                  </p> */}
                  {/* <h6>
                    <span className="fw-bold">顧客資訊 : </span>
                  </h6>
                  <ul className="list-unstyled">
                    <li>
                      <span className="fw-bold">姓名 : </span> {order.user.name}
                    </li>
                    <li>
                      <span className="fw-bold">電話 : </span> {order.user.tel}
                    </li>
                    <li>
                      <span className="fw-bold">Email : </span>{" "}
                      {order.user.email}
                    </li>
                    <li>
                      <span className="fw-bold">地址 : </span>{" "}
                      {order.user.address}
                    </li>
                  </ul> */}
                </div>
                {/* <div className="col-md-6">
                  <h6 className="fw-bold">訂購的商品:</h6>
                </div> */}
              </div>
            </div>
          </Link>
        ))}
        {/* <OrderDetail /> */}
        <Pagination pagination={pagination} changePage={getOrders} />
      </div>
    </>
  );
};

export default Orders;
