import React from "react";
import { useEffect,useCallback } from "react";
import "./index.css";

export default function DogFacts({
  dogMessage,
  latestDogMessageRef,
  setDogFacts,
  dogFacts,
  tab,
  feed,
}) {
  const fetchDogFacts =useCallback( async () => {
    try {
      const res = await fetch("https://dog-api.kinduff.com/api/facts");
      const data = await res.json();
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setDogFacts((prevFacts) => [
        ...prevFacts,
        { fact: data.facts[0], timestamp },
      ]);
    } catch (error) {
      console.error(error);
    }
  },[])
  useEffect(() => {
    fetchDogFacts();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (tab === "dogs") {
        fetchDogFacts();
      }
    }, Math.random() * 1500);

    return () => {
      clearInterval(intervalId);
    };
  }, [tab]);

  return (
    <>
      <div
        onClick={() => {
          feed.scrollTop = feed.scrollHeight;
        }}
        className="header-dogs"
      >
        DOG FACTS
      </div>
      {dogFacts.length ? (
      dogFacts.map((fact, index) => (
        <div key={index} className="fact-container">
          <p
            ref={
              index === dogFacts.length - 1 ? latestDogMessageRef : dogMessage
            }
            className="fact"
          >
            {fact.fact}
          </p>
          <span className="timestamp">{fact.timestamp}</span>
        </div>
      ))
    ) : (
      <div className="loading"></div>
    )}
    </>
  );
}
