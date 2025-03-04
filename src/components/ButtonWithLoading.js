import React from "react";
import ReactLoading from "react-loading";

// 創建一個通用的帶有 Loading 狀態的按鈕組件
// 可以用於任何有 API 調用的按鈕上
function ButtonWithLoading({
  isLoading,
  onClick,
  disabled,
  className = "btn btn-primary",
  loadingText = "處理中...",
  children,
  type = "button",
  isIconButton = false,
  ...restProps
}) {
  const handleClick = async (e) => {
    // 如果是提交按鈕，不需要阻止默認行為
    if (type !== "submit") {
      if (isLoading || disabled) return;
      if (onClick) {
        onClick(e);
      }
    }
  };

  // 如果是圖標按鈕且正在加載中，顯示小型加載指示器
  if (isIconButton && isLoading) {
    return (
      <button type={type} className={className} disabled={true} {...restProps}>
        <ReactLoading type="spin" color="currentColor" height={15} width={15} />
      </button>
    );
  }

  return (
    <button
      type={type}
      className={className}
      onClick={type !== "submit" ? handleClick : undefined}
      disabled={isLoading || disabled}
      {...restProps}
    >
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center">
          <ReactLoading type="spin" color="white" height={20} width={20} />
          {loadingText && <span className="ms-2">{loadingText}</span>}
        </div>
      ) : (
        children
      )}
    </button>
  );
}

export default ButtonWithLoading;
