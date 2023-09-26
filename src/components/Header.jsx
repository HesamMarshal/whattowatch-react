import { BsSearch } from "react-icons/bs";

function Header() {
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
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
