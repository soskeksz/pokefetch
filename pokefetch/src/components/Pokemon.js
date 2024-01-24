import React, { useEffect, useState } from "react";

function Pokemon(props) {
  const [pokeData, setPokeData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const locationResponse = await fetch(
        `https://pokeapi.co/api/v2/location/${props.locationID}/`
      );
      const locationJson = await locationResponse.json();

      const areaResponse = await fetch(locationJson.areas[0].url);
      const areaJson = await areaResponse.json();
      console.log(areaJson);

      const pokemonResponse = await fetch(
        areaJson.pokemon_encounters[0].pokemon.url
      );
      const pokemonJson = await pokemonResponse.json();

      setPokeData(pokemonJson);
    }

    fetchData();
  }, [props.locationID]);

  useEffect(() => {
    if (pokeData !== null) {
      props.transmitter(pokeData);
    }
  }, [pokeData]);

  return (
    <div className="Pokemon">
      {pokeData ? (
        <div>
          <div> {pokeData.name} </div>
          <img src={pokeData.sprites.front_default} alt="pokemon" />
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default Pokemon;

