import "./App.css";
import Location from "./components/Location";
import Pokemon from "./components/Pokemon";
import MyPokemon from "./components/MyPokemon";
import { useState, useEffect } from "react";

function App() {
  const [locationID, setLocationId] = useState(null);
  const [locHasPokemon, setLocHasPokemon] = useState(false);

  const [chosenPokemon, setChosenPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [showLocations, setShowLocations] = useState(true);

  const [fightResults, setResults] = useState(null);

  function handleLocationChoose(locationId) {
    setLocHasPokemon(locationId ? true : false);
    setLocationId(locationId);
    console.log(locationId ? true : false);
    console.log(locationId);
    setShowLocations(false);
  }

  function handlePokemonChoosing(theChosenOne) {
    setChosenPokemon(theChosenOne);
    // console.log(chosenPokemon);
  }

  function handleEnemyPokemon(enemy) {
    setEnemyPokemon(enemy);
  }

  useEffect(() => {
    console.log(enemyPokemon);
  }, [enemyPokemon]);

  function handleBackButton() {
    window.location.reload(false);
  }

  function handleTurn() {
    if (
      enemyPokemon.stats[0].base_stat + enemyPokemon.stats[1].base_stat <
      chosenPokemon.stats[0].base_stat + chosenPokemon.stats[1].base_stat
    ) {
      setResults("win");
    } else {
      setResults("lost");
    }
    console.log(fightResults);
  }

  return (
    <div className="App">
      {showLocations && !chosenPokemon && (
        [...Array(20)].map((_, index) => (
          <Location onClick={handleLocationChoose} key={index + 1} locationId={index + 1} />
        ))
      )}

      {!showLocations && locHasPokemon && !chosenPokemon && (
        <div className="App">
          <h2>Choose one of your pokemons!</h2>
          <div className="myPokemon">
            <div className="card">
              <MyPokemon onClick={handlePokemonChoosing} name="bulbasaur" />
            </div>
            <div className="card">
              <MyPokemon onClick={handlePokemonChoosing} name="charizard" />
            </div>
            <div className="card">
              <MyPokemon onClick={handlePokemonChoosing} name="poliwhirl" />
            </div>
          </div>
        </div>
      )}

      {!locHasPokemon && !showLocations && (
        <>
          <h2 id="loc">This location doesn't seem to have any pokémon... </h2>
          <div className="backButtonContainer">
            <button id="backButton" onClick={handleBackButton}>
              Back
            </button>
          </div>
        </>
      )}

{chosenPokemon && (
        <div className="myPokemon">
          <div className="card">
            <h2>Enemy Pokemon</h2>
            <Pokemon locationID={locationID} transmitter={handleEnemyPokemon} />
          </div>
          <div className="card">
            <h2>Your Pokemon</h2>
            <MyPokemon name={chosenPokemon.name} />
          </div>
          <button className="FightButton" onClick={handleTurn}>
            FIGHT!!!
          </button>
        </div>
      )}
      {fightResults === "win" && (
        <h1> You won!!!</h1>
      )}
      {fightResults === "lost" && (
        <h1> You lost!!! </h1>
      )}
    </div>
  );

}
export default App;