import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

const Preferences = ({ darkMode }) => {
  const [selected, setSelected] = useState([]);

  const API = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const res = await API.get("/preferences");
      setSelected(res.data.interests);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (category) => {
    if (selected.includes(category)) {
      setSelected(selected.filter((c) => c !== category));
    } else {
      setSelected([...selected, category]);
    }
  };

  const handleSave = async () => {
    try {
      await API.put("/preferences", {
        interests: selected,
      });

      toast.success("Preferences Updated");
    } catch (err) {
      toast.error("Unable to update");
    }
  };

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
          background: darkMode ? "#1f1f1f" : "#fff",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        <h2 className="mb-4">
          🎯 News Preferences
        </h2>

        {categories.map((cat) => (
          <div className="form-check mb-3" key={cat}>
            <input
              className="form-check-input"
              type="checkbox"
              checked={selected.includes(cat)}
              onChange={() => handleChange(cat)}
            />

            <label className="form-check-label text-capitalize">
              {cat}
            </label>
          </div>
        ))}

        <button
          className="btn btn-warning mt-3"
          onClick={handleSave}
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default Preferences;