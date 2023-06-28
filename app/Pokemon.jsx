"use client";
import { useState, useEffect } from "react";

function Pokemon({ name, url }) {
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const request_headers = new Headers();

    const request_options = {
      method: "GET",
      headers: request_headers,
    };

    fetch(url, request_options)
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
    return (
      <div>
        <img
          className='loading-spinner'
          src='https://raw.githubusercontent.com/herokudev/pokemon-sprites/a8724ffe26e5c13a07f95ec7ae4900aadfcd81c7/public/pokeball.svg'
          alt='avatar-img'
          style={{ width: "50px", height: "50px" }}
        ></img>
      </div>
    );
  } else {
    return (
      <div>
        <img
          className='pokemoCard'
          src={items.sprites.front_default}
          alt='avatar-img'
          style={{ width: "75px", height: "75px" }}
        ></img>
      </div>
    );
  }
}

export default Pokemon;
