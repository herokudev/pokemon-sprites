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
    return <>Loading ....</>;
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
