import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Toggle.css";

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
    
        <form className="d-flex search-bar" onSubmit={handleSubmit}>
    <input
    className="form-control me-2 search-input"
    type="search"
    placeholder="Search"
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
/>
    <button
        className={`btn ${darkMode ? "btn-dark" : "btn-danger"}`}
        type="submit"
    >
        <FontAwesomeIcon icon={faSearch}/>
    </button>
</form>
    );
};

export default SearchBar;