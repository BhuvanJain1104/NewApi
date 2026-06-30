import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faSearch } from "@fortawesome/free-solid-svg-icons";
const SearchBar = ({ onSearch, darkMode }) => {
    console.log("SearchBar onSearch:", onSearch);

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        if (keyword.trim() === "") return;

        onSearch(keyword);
        navigate("/search");

    };


    return (
        <form className="d-flex" onSubmit={handleSubmit}>
            <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />

            <button
                className={`btn ${darkMode ? "btn-dark" : "btn-danger"}`}
                type="submit"
            >
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </form>
    );
};

export default SearchBar;