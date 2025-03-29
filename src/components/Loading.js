import ReactLoading from "react-loading";

function Loading({ isLoading, isButtonLoading = false, text = "處理中..." }) {
  // 按鈕內部使用的小型 loading 元件
  if (isButtonLoading) {
    return isLoading ? (
      <div className="d-flex align-items-center justify-content-center">
        <ReactLoading type="spin" color="white" height={20} width={20} />
        <span className="ms-2">{text}</span>
      </div>
    ) : null;
  }

  // 原有的全頁面 loading 元件
  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(5px)",
          }}
        >
          <ReactLoading type="bubbles" color="white" height={60} width={100} />
        </div>
      )}
    </>
  );
}

export default Loading;
