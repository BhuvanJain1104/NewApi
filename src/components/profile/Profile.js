import React, { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../../utils/profileService";
import { toast } from "react-toastify";

const Profile = ({ darkMode }) => {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({});
  const [bookmarkCount, setBookmarkCount] = useState(0);

  const [name, setName] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setUser(data.user);
      setBookmarkCount(data.bookmarkCount);
      setName(data.user.name);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      const data = await updateProfile(name);

      setUser(data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Unable to update profile");
    }
  };

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all password fields");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await changePassword(oldPassword, newPassword);

      toast.success("Password changed successfully");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to change password"
      );
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Profile...</h3>
      </div>
    );
  }

  return (
    <div
      className="container"
      style={{
        marginTop: "90px",
        maxWidth: "700px",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          backgroundColor: darkMode ? "#1f1f1f" : "#fff",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        <h2 className="text-center mb-4">
          👤 My Profile
        </h2>

        <hr />
                <div className="mb-3">
          <label className="form-label fw-bold">
            Name
          </label>

          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Email
          </label>

          <input
            type="email"
            className="form-control"
            value={user.email || ""}
            disabled
          />
        </div>

        <div className="row">

          <div className="col-md-6 mb-3">

            <label className="form-label fw-bold">
              Total Bookmarks
            </label>

            <input
              type="text"
              className="form-control"
              value={bookmarkCount}
              disabled
            />

          </div>

          <div className="col-md-6 mb-3">

            <label className="form-label fw-bold">
              Joined On
            </label>

            <input
              type="text"
              className="form-control"
              value={
                user.createdAt
                  ? new Date(
                      user.createdAt
                    ).toLocaleDateString()
                  : ""
              }
              disabled
            />

          </div>

        </div>

        <div className="d-grid mb-4">

          <button
            className="btn btn-warning"
            onClick={handleUpdate}
          >
            Save Changes
          </button>

        </div>

        <hr />

        <h4 className="mb-3">
          🔒 Change Password
        </h4>

        <div className="mb-3">

          <label className="form-label">
            Old Password
          </label>

          <input
            type="password"
            className="form-control"
            value={oldPassword}
            onChange={(e) =>
              setOldPassword(e.target.value)
            }
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            New Password
          </label>

          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Confirm Password
          </label>

          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

        </div>
                <div className="d-grid">
          <button
            className="btn btn-danger"
            onClick={handlePasswordChange}
          >
            Change Password
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;