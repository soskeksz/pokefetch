import React, { useEffect, useState } from "react";

function MyPokemon(props) {
  const [myPokeData, setMyPokeData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const pokemonResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${props.name}`
      );
      const pokemonJson = await pokemonResponse.json();
      setMyPokeData(pokemonJson);
    }

    fetchData();
  }, [props.name]);

  if (!myPokeData) {
    // Render a loading indicator or placeholder here
    return <div></div>;
  }

  return (
    <div onClick={() => props.onClick(myPokeData)}className="Pokemon">
      <div>{myPokeData.name}</div>
      <img src={myPokeData.sprites.front_default} alt="pokemon" />
    </div>
  );
}

export default MyPokemon;