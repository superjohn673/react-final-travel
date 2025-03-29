import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "../store/messageStore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ProductModal = ({
  closeProductModal,
  getProducts,
  type,
  tempProduct,
}) => {
  const [tempData, setTempData] = useState({
    title: "",
    category: "",
    origin_price: 100,
    price: 300,
    unit: "",
    description: "",
    content: "",
    is_enabled: 1,
    imageUrl: "",
    imagesUrl: ["", "", "", "", ""],
  });

  //沒用到 message可以清掉,但要保留逗號
  const [, dispatch] = useContext(MessageContext);

  useEffect(() => {
    if (type === "create") {
      setTempData({
        title: "",
        category: "",
        origin_price: 50000,
        price: 300,
        unit: "",
        description: "",
        content: "",
        is_enabled: 1,
        imageUrl: "",
        imagesUrl: ["", "", "", "", ""],
      });
    } else if (type === "edit") {
      setTempData({
        ...tempProduct,
        imagesUrl: tempProduct.imagesUrl || ["", "", "", "", ""], // 如果沒有 imagesUrl，則使用五個空字符串
      });
    }
  }, [type, tempProduct]);

  const handleChange = (e, index) => {
    const { value, name } = e.target;
    //判斷如果是價格就轉為數字型別
    if (["price", "origin_price"].includes(name)) {
      setTempData({
        ...tempData,
        [name]: Number(value),
      });
    } else if (name === "is_enabled") {
      setTempData({
        ...tempData,
        [name]: +e.target.checked, //將 boolean 轉型為 0,1
      });
    } else if (name.startsWith("imagesUrl")) {
      const newImagesUrl = [...tempData.imagesUrl];
      newImagesUrl[index] = value; // 根據索引更新對應的圖片網址
      setTempData({
        ...tempData,
        imagesUrl: newImagesUrl,
      });
    } else {
      setTempData({
        ...tempData,
        [name]: value,
      });
    }
  };

  const handleTourChange = (value) => {
    setTempData((prev) => ({ ...prev, content: value }));
  };

  const submit = async () => {
    try {
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`;
      let method = "post";
      if (type === "edit") {
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${tempProduct.id}`;
        method = "put";
      }
      const res = await axios[method](api, {
        data: tempData,
        imagesUrl: tempData.imagesUrl,
      });
      handleSuccessMessage(dispatch, res);
      closeProductModal();
      getProducts();
    } catch (error) {
      console.log(error);
      handleErrorMessage(dispatch, error);
    }
  };

  const uploadFile = async (file) => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file-to-upload", file);
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/upload`,
        formData
      );
      setTempData({
        ...tempData,
        imageUrl: res.data.imageUrl, // 假設回傳的圖片網址在res.data.imageUrl中
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="modal fade"
      id="productModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {type === "create" ? "建立新商品" : `${tempData.title}`}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeProductModal}
            />
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group mb-5">
                  <label className="w-100" htmlFor="imageUrl">
                    首圖
                    <input
                      type="text"
                      name="imageUrl"
                      id="imageUrl"
                      onChange={handleChange}
                      placeholder="請輸入首圖連結"
                      className="form-control"
                      value={tempData.imageUrl}
                    />
                  </label>
                  {/* 顯示主圖 */}
                  {tempData.imageUrl && (
                    <img
                      src={tempData.imageUrl}
                      alt="主圖"
                      style={{
                        width: "100px",
                        height: "100px",
                        marginTop: "5px",
                      }}
                    />
                  )}
                </div>
                {/* 新增五個 imagesUrl 輸入欄位 */}
                {Array.isArray(tempData.imagesUrl) &&
                  tempData.imagesUrl.map((url, index) => (
                    <div className="form-group mb-4" key={index}>
                      <label className="w-100" htmlFor={`imagesUrl${index}`}>
                        行程內容圖 {index + 1}
                        <input
                          type="text"
                          name={`imagesUrl${index}`}
                          id={`imagesUrl${index}`}
                          onChange={(e) => handleChange(e, index)}
                          placeholder={`請輸入圖片連結 ${index + 1}`}
                          className="form-control"
                          value={url}
                        />
                      </label>
                      {/* 顯示圖片 */}
                      {url && (
                        <img
                          src={url}
                          alt={`Image ${index + 1}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            marginTop: "5px",
                          }}
                        />
                      )}
                    </div>
                  ))}
                <div className="form-group my-5">
                  <label className="w-100" htmlFor="customFile">
                    或 上傳圖片
                    <input
                      type="file"
                      id="customFile"
                      className="form-control"
                      onChange={(e) => {
                        uploadFile(e.target.files[0]);
                      }}
                    />
                  </label>
                </div>
              </div>
              <div className="col-sm-8">
                <pre>{JSON.stringify(tempData)}</pre>
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="title">
                    標題
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="請輸入標題"
                      className="form-control"
                      onChange={handleChange}
                      value={tempData.title}
                    />
                  </label>
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="category">
                      分類
                      <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="請輸入分類"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.category}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="unit">
                      單位
                      <input
                        type="unit"
                        id="unit"
                        name="unit"
                        placeholder="請輸入單位"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.unit}
                      />
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="origin_price">
                      原價
                      <input
                        type="number"
                        id="origin_price"
                        name="origin_price"
                        placeholder="請輸入原價"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.origin_price}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="price">
                      售價
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="請輸入售價"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.price}
                      />
                    </label>
                  </div>
                </div>
                <hr />
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="description">
                    行程重點
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      placeholder="請輸入產品描述"
                      className="form-control"
                      onChange={handleChange}
                      value={tempData.description}
                    />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="content">
                    行程內容
                    <ReactQuill
                      value={tempData.content}
                      onChange={handleTourChange}
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, false] }],
                          ["bold", "italic", "underline"],
                          ["link", "image"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["clean"], // 清除格式按鈕
                        ],
                      }}
                      formats={[
                        "header",
                        "bold",
                        "italic",
                        "underline",
                        "link",
                        "image",
                        "list",
                        "bullet",
                      ]}
                    />
                    {/* <textarea
                      type="text"
                      id="content"
                      name="content"
                      placeholder="請輸入產品說明內容"
                      className="form-control"
                      onChange={handleChange}
                      value={tempData.content}
                    /> */}
                  </label>
                </div>
                <div className="form-group mb-2">
                  <div className="form-check">
                    <label
                      className="w-100 form-check-label"
                      htmlFor="is_enabled"
                    >
                      是否啟用
                      <input
                        type="checkbox"
                        id="is_enabled"
                        name="is_enabled"
                        placeholder="請輸入產品說明內容"
                        className="form-check-input"
                        onChange={handleChange}
                        checked={!!tempData.is_enabled} //寫法二 Boolean(tempData.is_enabled)
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeProductModal}
            >
              關閉
            </button>
            <button type="button" className="btn btn-primary" onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
