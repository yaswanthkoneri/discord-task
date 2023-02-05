import React from "react";
import { useEffect,useCallback } from "react";
import "./index.css";

export default function AnimeQuotes({
  animeMessage,
  latestAnimeMessageRef,
  setAnimeQuotes,
  animeQuotes,
  tab,
  feed,
}) {
  const fetchAnimeQuotes =useCallback(async () => {
    try {
      const res = await fetch("https://animechan.vercel.app/api/random");
      const data = await res.json();
      const currentDate = new Date();
      const time = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setAnimeQuotes((prevQuotes) => [
        ...prevQuotes,
        { quote: data.quote, time: time },
      ]);
    } catch (error) {
      console.error(error);
    }
  },[])
  useEffect(() => {
    fetchAnimeQuotes();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (tab === "anime") {
        fetchAnimeQuotes();
      }
    }, Math.random() * 1500);

    return () => {
      clearInterval(intervalId);
    };
  }, [tab]);
  return (
    <>
      <div
        className="header-anime"
        onClick={() => {
          feed.scrollTop = feed.scrollHeight;
        }}
      >
        ANIME QUOTES
      </div>
      {animeQuotes.length ? (
      animeQuotes.map((quote, index) => (
        <div className="quote-container" key={index}>
          <p
            className="quote-text"
            ref={
              index === animeQuotes.length - 1
                ? latestAnimeMessageRef
                : animeMessage
            }
          >
            {quote.quote}
          </p>
          <span className="timestamp">{quote.time}</span>
        </div>
      ))
    ) : (
      <div className="loading"></div>
    )
      }
    </>
  );
}
