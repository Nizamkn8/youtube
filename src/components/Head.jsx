import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { cacheResults } from '../utils/searchSlice'

const Head = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();


  useEffect(() => {
    const timer = setTimeout(() => {
      if(searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestion();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    }
  },[searchQuery])

  const getSearchSuggestion = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);

    //update cache
    dispatch(
      cacheResults({
      [searchQuery]: json[1]
    }))
  }

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          className="h-8 cursor-pointer"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0MAAUOBQikpKQpJSadnZ309PUAAAAIAADZ2Nj8/Pyop6cYExXBwMAtKSpta2xpZ2draWpfXV7BwcGvrq77CGWbAAABG0lEQVR4nO3cwXKCMBQFUApFTQAVtf3/Ty3tsKhLZpKSxnP+4M57JCwyt2kAAAAAAAAAAAAAAADgFQ1TX4ZpyJJvvIXYlSGGecyQcI5v5Yi39AGHsHeqJyH9ovYljXAZ4qeEm9W/pc29pCHmOGma8R7iexky3RbLovbHMvR5bnwAAAAAAAAAANhkPJUhV77hcT2U4frI8mToI5zbUpzDJX3A06Hd+7neL22X/mHbpbDXl+mHeOz2DvUk9skT1j/D+r/DZYiVn6UvcB9+2/tnZpUrHgAAAAAAAAAAbDBMe5ftrXK17M619yZq2f1bGfpLp5JGmKWDtv6E9W9p/SfNz22xdxn7Kl/LbuW9+gAAAAAAAAAAAAAAAPCffAHLSDTi5JU+gwAAAABJRU5ErkJggg=="
          alt="hamburger"
          onClick={() => {
            toggleMenuHandler();
          }}
        />
        <a href="">
          <img
            className="h-8 mx-2"
            src="data:image/png;base64,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"
            alt="youtbe-logo"
          />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            className="w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestion(true)}
            onBlur={() => setShowSuggestion(false)}
          />
          <button className="border border-gray-400 p-2 px-4 rounded-r-full bg-gray-100">
            🔍
          </button>
        </div>
        {showSuggestion && (
          <div className='fixed bg-white py-2 px-5 w-[34rem] shadow-lg rounded-lg border border-gray-200'>
            <ul>
              {
                suggestions.map((s) => (
                  <li className='py-2 px-3 hover:bg-gray-200' key={s}>
                    🔍 {s}
                  </li>
                ))
              }
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          src="data:image/png;base64,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"
          alt="user-logo"
        />
      </div>
    </div>
  );
}

export default Head


  //LRU caching
  //[100] keys for cache
  //only store 10 or 100 limits(according to your preference)

  // make an api call after every key press
  // but if the difference b/w 2 api calls is < 200ms
  // decline the api call

  /**
   * debouncing process when pressing keys
   *key - i
    - render the component
    - useEffect();
    - start timer => make call after 200 ms
   *

    key - ip
    - destroy the component(useEffect return method)
    - re render the component
    - useEffect()
    - start timer => make api call after 200 ms
   */
