import { useState } from "react";
import { BsSearch } from "react-icons/bs";

function Header() {
  const [search, setSearch] = useState("");
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          What To Watch
          <span className="separator"></span>
        </div>
        <div className="headerSearchItem">
          <BsSearch />
          <input
            type="text"
            id="searchItem"
            name="searchItem"
            placeholder="Search ..."
            className="headerSearchInput"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
