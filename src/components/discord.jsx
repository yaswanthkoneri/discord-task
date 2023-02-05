import React, { useState, useEffect, useLayoutEffect } from "react";
import "./discord.css";
import { useRef } from "react";
import DogFacts from "./DogFacts";
import AnimeQuotes from "./AnimeQuotes";

const Discord = () => {
  const [tab, setTab] = useState("anime");
  const [animeQuotes, setAnimeQuotes] = useState([]);
  const [dogFacts, setDogFacts] = useState([]);
  const [dogScroll, setDogScroll] = useState(true);
  const [animeScroll, setAnimeScroll] = useState(true);
  // Refs
  const feedRef = useRef(null);
  const feed = feedRef.current;
  const dogMessage = useRef(null);
  const animeMessage = useRef(null);
  const latestDogMessageRef = useRef(null);
  const latestDogMessage = latestDogMessageRef.current;
  const latestAnimeMessageRef = useRef(null);
  const latestAnimeMessage = latestAnimeMessageRef.current;

  useEffect(() => {
    if (feed) {
      const animeScrollHistory = JSON.parse(
        localStorage.getItem("animeScrollHistory")
      );
      if (tab === "anime" && animeScrollHistory) {
        feed.scrollTop = animeScrollHistory;
      }
      const dogScrollHistory = JSON.parse(
        localStorage.getItem("dogScrollHistory")
      );
      if (tab === "dogs" && dogScrollHistory) {
        feed.scrollTop = dogScrollHistory;
      }
    }
  }, [feed, tab]);

  // Dog Facts scroll
  useEffect(() => {
    if (latestDogMessage) {
      feed?.addEventListener("scroll", () => {
        if (
          Math.abs(feed.scrollTop + feed.clientHeight - feed.scrollHeight) <= 1
        ) {
          setDogScroll(true);
        } else {
          setDogScroll(false);
        }
      });
      if (dogScroll) {
        latestDogMessage.scrollIntoView();
      }
      localStorage.setItem("dogScrollHistory", JSON.stringify(feed.scrollTop));
    }
  }, [feed?.scrollTop, dogFacts]);
  // Anime Tab  scroll
  useEffect(() => {
    if (latestAnimeMessage) {
      feed?.addEventListener("scroll", () => {
        if (
          Math.abs(feed.scrollTop + feed.clientHeight - feed.scrollHeight) <= 1
        ) {
          setAnimeScroll(true);
        } else {
          setAnimeScroll(false);
        }
      });
      if (animeScroll) {
        latestAnimeMessage.scrollIntoView();
      }
      localStorage.setItem(
        "animeScrollHistory",
        JSON.stringify(feed.scrollTop)
      );
    }
  }, [feed?.scrollTop, animeQuotes]);

  return (
    <div className="App">
      <div className="sidebar">
        <button
          className="button"
          onClick={() => {
            setTab("anime");
          }}
        >
          ANIME
        </button>
        <button
          className="button"
          onClick={() => {
            setTab("dogs");
          }}
        >
          DOGS
        </button>
      </div>
      <div className="feed" ref={feedRef}>
        {tab === "anime" ? (
          <AnimeQuotes
            animeMessage={animeMessage}
            latestAnimeMessageRef={latestAnimeMessageRef}
            setAnimeQuotes={setAnimeQuotes}
            animeQuotes={animeQuotes}
            tab={tab}
            feed={feed}
          />
        ) : (
          <DogFacts
            dogMessage={dogMessage}
            latestDogMessageRef={latestDogMessageRef}
            setDogFacts={setDogFacts}
            dogFacts={dogFacts}
            tab={tab}
            feed={feed}
          />
        )}
      </div>
    </div>
  );
};
export default Discord;
