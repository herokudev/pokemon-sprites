"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Pokemon from "./Pokemon";

export default function Home() {
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const request_headers = new Headers();

    const request_options = {
      method: "GET",
      headers: request_headers,
    };

    fetch("https://pokeapi.co/api/v2/pokemon?limit=150", request_options)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoaded(true);
          setItems(result);
        },
        (error) => {
          setLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <>{error.message}</>;
  } else if (!loaded) {
    return <></>;
  } else {
    return (
      <main className='App'>
        <h1 className='title'>Pokemon sprites</h1>
        <hr />
        <div className='users-list'>
          {items.results.map((item, index) => (
            <div key={index} className='user-card'>
              <Pokemon name={item.name} url={item.url} />
            </div>
          ))}
        </div>
      </main>
    );
  }
}
