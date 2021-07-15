import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SuggestedUsers from './SuggestedUsers';
function SearchUser() {
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef(null);

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  useEffect(() => {}, [searchText]);

  return (
    <div className="container-center container-column">
        <h2>Search Users</h2>
      <div
        className="container search-container"
        style={{ flexWrap: 'nowrap' }}
        id="search"
      >
        <div class="input-group" style={{ width: '100%', margin: '0' }}>
          <input
            id="name"
            type="search"
            value={searchText}
            class="input-area"
            style={{ borderRadius: '0px' }}
            onChange={e => {
              setSearchText(e.target.value);
            }}
            ref={searchInput}
          />
          <label
            for="name"
            style={{ visibility: searchText === '' ? 'visible' : 'hidden' }}
          >
            Search
          </label>
        </div>
        <button
          className="btn btn-primary"
          style={{ width: '20%', margin: '0', borderRadius: '0px' }}
        >
          <i class="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
      <br />
      <br />

      <SuggestedUsers />
    </div>
  );
}

export default SearchUser;
