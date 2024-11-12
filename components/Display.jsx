import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

const Display = ({ animeData }) => {
  console.log(animeData);

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000) {
        setShowScrollButton(true); // Show button if scroll position > 1000px
      } else {
        setShowScrollButton(false); // Hide button if scroll position <= 1000px
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to scroll to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="section-div">
      {animeData.map((anime, index) => (
        <div
          key={index}
          style={{
            backgroundImage: `url(${anime.images.webp.image_url})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              backdropFilter: "blur(20px)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            className="anime-item"
          >
            <div
              className="anime-view"
              style={{ paddingBottom: anime.trailer.youtube_id ? 0 : 15 }}
            >
              <h1 className="body-h1">{anime.title_english ?? anime.title}</h1>
              <img
                alt={anime.title}
                src={anime.images.webp.large_image_url}
                className="anime-image"
              />
              {anime.trailer.youtube_id && (
                <div className="video-container">
                  <iframe
                    className="video"
                    src={`https://tube.rvere.com/embed?v=${anime.trailer.youtube_id}&rel=0`}
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen
                    allow="accelerometer; autoplay; encrypted-media; picture-in-picture fullscreen"
                    loading="eager"
                  />
                </div>
              )}
            </div>
            <div className="anime-info">
              <h3 className="h3">
                Japanese:{" "}
                <span className="ani-info-content-span">
                  {anime.title_japanese || "Unknown"}
                </span>
              </h3>
              <h3 className="h3">
                English:{" "}
                <span className="ani-info-content-span">
                  {anime.title_english ?? anime.title ?? "Unknown"}
                </span>
              </h3>
              {anime.title_synonyms && anime.title_synonyms.length > 0 && (
                <h3 className="h3">
                  Synonyms:{" "}
                  <span className="ani-info-content-span">
                    {anime.title_synonyms.join(", ")}
                  </span>
                </h3>
              )}
              <h3 className="h3">
                Type:{" "}
                <span className="ani-info-content-span">
                  {anime.type || "Unknown"}
                </span>
              </h3>
              <h3 className="h3">
                Status:{" "}
                <span className="ani-info-content-span">
                  {anime.status || "Unknown"}
                </span>
              </h3>
              <h3 className="h3">
                {anime.airing ? (
                  <>
                    Airing: <span className="ani-info-content-span">from </span>
                  </>
                ) : (
                  <>
                    Aired: <span className="ani-info-content-span">from </span>
                  </>
                )}
                <span className="ani-info-content-span">
                  {anime.aired && anime.aired.string
                    ? anime.airing
                      ? anime.aired.string.split(" to ")[0] // If airing is true, slice before "to"
                      : anime.aired.string // If airing is false, show the whole string
                    : "Unknown"}
                </span>
              </h3>
              <h3 className="h3">
                Season:{" "}
                <span className="ani-info-content-span">
                  {anime.season
                    ? anime.season.charAt(0).toUpperCase() +
                      anime.season.slice(1)
                    : "Unknown"}
                </span>
              </h3>
              <h3 className="h3">
                Rating:{" "}
                <span className="ani-info-content-span">
                  {anime.rating ? anime.rating.split(" ")[0] : "Unknown"}
                </span>
              </h3>
              <h3 className="h3">
                Episodes:{" "}
                <span className="ani-info-content-span">
                  {anime.episodes
                    ? anime.episodes <= 1
                      ? anime.episodes + " episode"
                      : anime.episodes + " episodes"
                    : "Unknown"}
                </span>
              </h3>
              <h3 className="h3">
                Duration:{" "}
                <span className="ani-info-content-span">
                  {anime.duration || "Unknown"}
                </span>
              </h3>
              <div className="genre">
                <h3 className="h3">Genres: </h3>
                <div>
                  {anime.genres.length > 0 ? (
                    anime.genres.map((genre, i) => <a key={i}>{genre.name}</a>)
                  ) : (
                    <a>Unknown</a>
                  )}
                </div>
              </div>
              <h3 className="h3">
                Studio:{" "}
                <span className="ani-info-content-span">
                  {anime.studios && anime.studios.length > 0
                    ? " " + anime.studios[0].name
                    : "Unknown"}
                </span>
              </h3>
              <h3 className="h3">
                Source:{" "}
                <span className="ani-info-content-span">
                  {anime.source ?? "Unknown"}
                </span>
              </h3>
              <h3 className="h3">
                Popularity:{" "}
                <span className="ani-info-content-span">
                  {anime.popularity || "Unknown"}
                </span>
              </h3>
              <div className="producers">
                <h3 className="h3">Producers: </h3>
                <div>
                  {anime.producers.length ? (
                    anime.producers.map((producer, i) => (
                      <a key={i}>{producer.name}</a>
                    ))
                  ) : (
                    <a>No producers</a>
                  )}
                </div>
              </div>
              <h3 className="h3">
                MAL Score:{" "}
                <span className="ani-info-content-span">
                  {anime.score
                    ? anime.scored_by
                      ? anime.score +
                        ", scored by " +
                        anime.scored_by +
                        " people"
                      : anime.score
                    : "Unknown"}
                </span>
              </h3>
              {anime.synopsis && (
                <div className="description">
                  <h3 className="h3">Description: </h3>
                  <p className="description-text p">{anime.synopsis}</p>
                </div>
              )}
              {anime.url && (
                <h3 className="h3">
                  <a href={anime.url} className="link-to-mal" target="_blank">
                    MAL <FaArrowRight className="right-arrow-mal" />
                  </a>
                </h3>
              )}
            </div>
          </div>
        </div>
      ))}

      {showScrollButton && (
        <a
          onClick={scrollToTop}
          className={`scroll-top-btn ${showScrollButton ? "visible" : ""}`}
        >
          <FaArrowUp />
        </a>
      )}
    </div>
  );
};

export default Display;
