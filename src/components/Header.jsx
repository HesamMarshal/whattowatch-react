import "./header.css";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo_green.png";

function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    const encodedParams = createSearchParams({
      search,
    });
    navigate({
      pathname: "/search",
      search: encodedParams.toString(),
    });
  };
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem logoPart">
          <Link to="/">
            <img src={logo} className="logo" />
          </Link>
          <Link to="/">
            <span className="siteName">What To Watch</span>
          </Link>
          <span className="separator"></span>
        </div>
        <div className="headerSearchItem searchPart">
          <input
            type="text"
            id="searchItem"
            name="searchItem"
            placeholder="Search ..."
            className="headerSearchInput"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
