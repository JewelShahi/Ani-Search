import React, { useState, useEffect, useRef } from "react";
import Display from "./Display";
import { FaSearch } from "react-icons/fa";
import PaginationButtons from "./PaginationButtons";

const Body = () => {
  const [animeInfo, setAnimeInfo] = useState([]);
  const [searchPage, setSearchPage] = useState(1);
  const [airingPage, setAiringPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);
  const [renderPage, setRenderPage] = useState(1);
  const [isSearchClicked, setSearchClicked] = useState(false);
  const [isAiringClicked, setAiringClicked] = useState(false);
  const [isPopularClicked, setPopularClicked] = useState(true);
  const inputRef = useRef(null);
  const [showPagination, setShowPagination] = useState(true);
  const [showSearchPagination, setSearchShowPagination] = useState(true);

  const [isLoading, setLoading] = useState(false);

  const [renderSearch, setRenderSearch] = useState(1);

  const itemsPerPage = 10;
  const maxButtons = 5;

  const getCurrentAiringAnime = async (pages) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/seasons/now?page=${pages}&sfw`
      );
      const data = await response.json();
      if (data && data.pagination && data.pagination.last_visible_page !== undefined) {
        setAiringPage(data.pagination.last_visible_page);
        setAnimeInfo(prev => data.data);
      } else {
        console.error("Invalid or missing pagination data in API response for current airing anime.");
      }
    } catch (error) {
      console.error("Error fetching current airing anime:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPopularAnime = async (pages) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/top/anime?page=${pages}&sfw`
      );
      const data = await response.json();
      if (data && data.pagination && data.pagination.last_visible_page !== undefined) {
        setPopularPage(data.pagination.last_visible_page);
        setAnimeInfo(prev => data.data);
      } else {
        console.error("Invalid or missing pagination data in API response for popular anime.");
      }
    } catch (error) {
      console.error("Error fetching popular anime:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSearchResult = async (query, pages) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${query}&page=${pages}&nsfw=false&sfw=true`
      );
      const data = await response.json();
      if (data && data.pagination && data.pagination.last_visible_page !== undefined) {
        setSearchPage(data.pagination.last_visible_page);
        setAnimeInfo(prev => data.data);
      } else {
        console.error("Invalid or missing pagination data in API response for searched anime.");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomAnime = async () => {
    inputRef.current.value = "";
    setLoading(true);
    try {
      const randomAnimeList = [];
      for (let i = 0; i < 15; i++) {
        const response = await fetch(
          `https://api.jikan.moe/v4/random/anime?sfw=true&nsfw=false`
        );
        const data = await response.json();
        if (data && data.data) {
          randomAnimeList.push(data.data);
        } else {
          console.error("Failed to get a random anime.");
        }
      }
      setAnimeInfo(prev => randomAnimeList);
      setShowPagination(false);
    } catch (error) {
      console.error("Error fetching random anime:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    if (inputRef.current.value.trim() !== "") {
      setSearchClicked(true);
      setAiringClicked(false);
      setPopularClicked(false);
      setRenderPage(1);
      setShowPagination(true);
      setLoading(true);
      setRenderSearch(1);
      getSearchResult(inputRef.current.value.trim(), 1);
      inputRef.current.blur();
    } else {
      inputRef.current.value = "";
      setSearchClicked(false);
      setAnimeInfo([]);
      setShowPagination(false);
    }
  };

  const handleTopAnimeClick = () => {
    setAiringClicked(false);
    setSearchClicked(false);
    setPopularClicked(true);
    setRenderPage(1);
    setShowPagination(true);
    setLoading(true);
    getPopularAnime(1);
  };

  const handleAiringAnimeClick = () => {
    setAiringClicked(true);
    setSearchClicked(false);
    setPopularClicked(false);
    setRenderPage(1);
    setShowPagination(true);
    setLoading(true);
    getCurrentAiringAnime(1);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  useEffect(() => {
    setLoading(true);
    if (isAiringClicked) {
      getCurrentAiringAnime(renderPage);
    } else if (isPopularClicked) {
      getPopularAnime(renderPage);
    } else if (isSearchClicked) {
      setAiringClicked(false);
      setPopularClicked(false);
      getSearchResult(inputRef.current.value.trim(), renderPage);
    }
  }, [renderPage, isAiringClicked, isPopularClicked, isSearchClicked]);

  useEffect(() => {
    setAnimeInfo(prev => []);
    setRenderPage(1);
    setShowPagination(true);
    setLoading(true);

    if (isAiringClicked) {
      inputRef.current.value = "";
      getCurrentAiringAnime(1);
    } else if (isPopularClicked) {
      inputRef.current.value = "";
      getPopularAnime(1);
    }
  }, [isAiringClicked, isPopularClicked]);

  const handlePageClick = (pageNumber) => {
    if (isSearchClicked) {
      setRenderSearch(pageNumber);
      setLoading(true);
      getSearchResult(inputRef.current.value.trim(), pageNumber);
    } else {
      setRenderPage(pageNumber);
    }
  };

  const handleFirstPage = () => {
    if (isSearchClicked) {
      setRenderSearch(1);
      setLoading(true);
      getSearchResult(inputRef.current.value.trim(), 1);
    } else {
      if (isAiringClicked) {
        setRenderPage(1);
        setLoading(true);
        getCurrentAiringAnime(1);
      } else if (isPopularClicked) {
        setRenderPage(1);
        setLoading(true);
        getPopularAnime(1);
      }
    }
  };

  const handleLastPage = () => {
    if (isSearchClicked) {
      setRenderSearch(searchPage);
      setLoading(true);
      getSearchResult(inputRef.current.value.trim(), searchPage);
    } else {
      if (isAiringClicked) {
        setRenderPage(airingPage);
        setLoading(true);
        getCurrentAiringAnime(airingPage);
      } else if (isPopularClicked) {
        setRenderPage(popularPage);
        setLoading(true);
        getPopularAnime(popularPage);
      }
    }
  };

  const handleNextPage = () => {
    if (isSearchClicked) {
      setRenderSearch((prevPage) => prevPage + 1);
      setLoading(true);
      getSearchResult(inputRef.current.value.trim(), renderSearch + 1);
    } else {
      setRenderPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (isSearchClicked) {
      setRenderSearch((prevPage) => prevPage - 1);
      setLoading(true);
      getSearchResult(inputRef.current.value.trim(), renderSearch - 1);
    } else {
      setRenderPage((prevPage) => prevPage - 1);
    }
  };


  const generateButtons = (currentPage, totalPages) => {
    const buttons = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div>
      <nav className="nav">
        <div className="logo">
          <img
            alt="anisearch-logo"
            src="animelogo.png"
            width="45px"
            className="nav-img"
          />
          <h3 className="nav-text"><span style={{color: "#2dad4b"}}>Ani</span>Search</h3>
        </div>
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search anime..."
            required="required"
            className="nav-input"
            ref={inputRef}
            onKeyDown={handleKeyPress}
          />
          <button className="nav-btn" onClick={handleSearchClick}>
            <FaSearch />
          </button>
        </div>
        <div className="nav-buttons">
          <button onClick={handleTopAnimeClick}>Top Anime</button>
          <button onClick={handleAiringAnimeClick}>Airing Anime</button>
          <button onClick={getRandomAnime}>Random Anime</button>
        </div>
      </nav>
      {(showPagination && animeInfo && animeInfo.length > 0) && (
        <PaginationButtons
          currentPage={isSearchClicked ? renderSearch : renderPage}
          totalPages={isSearchClicked ? searchPage : (isAiringClicked ? airingPage : popularPage)}
          onPageChange={handlePageClick}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          onFirstPage={handleFirstPage}
          onLastPage={handleLastPage}
        />
      )}
      <section className="body-section">
        {isLoading ? (
          <div className="no-data">
            <div className="wavy-text">Loading...</div>
          </div>
        ) : (
          animeInfo && animeInfo.length > 0 ? (
            <Display animeData={animeInfo} />
          ) : (
            <div className="no-data">
              <div className="wavy-text">
                Anime not found!
              </div>
            </div>
          )
        )}
      </section>
    </div>
  );
};

export default Body;