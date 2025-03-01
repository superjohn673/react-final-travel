import React, { useState } from "react";
import { FaUserCircle, FaEdit, FaSave } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Anytown USA",
    birthday: "1990-01-01",
    isEditing: false,
  });

  const handleEdit = () => {
    setUser({ ...user, isEditing: true });
  };

  const handleSave = () => {
    // 在這裡添加保存用戶資料的邏輯
    setUser({ ...user, isEditing: false });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">個人資料</h5>
        {user.isEditing ? (
          <button className="btn btn-primary" onClick={handleSave}>
            <FaSave className="me-2" />
            儲存
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={handleEdit}>
            <FaEdit className="me-2" />
            編輯
          </button>
        )}
      </div>
      <div className="card-body">
        <div className="profile-avatar">
          <FaUserCircle />
        </div>
        <form>
          <div className="form-group mb-3">
            <label htmlFor="name">姓名</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!user.isEditing}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!user.isEditing}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="phone">電話</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              disabled={!user.isEditing}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="address">地址</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={user.address}
              onChange={handleChange}
              disabled={!user.isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthday">生日</label>
            <input
              type="date"
              className="form-control"
              id="birthday"
              name="birthday"
              value={user.birthday}
              onChange={handleChange}
              disabled={!user.isEditing}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
