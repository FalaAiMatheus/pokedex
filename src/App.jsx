import React, { useState } from 'react';

function App() {
  const [pokemon, setPokemon] = useState('');
  const [pokemonData, setPokemonData] = useState(null);

  const handleInputChange = (event) => {
    setPokemon(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      const data = await response.json();
      setPokemonData(data);
    } catch (error) {
      console.error("Erro ao buscar dados do Pokémon:", error);
    }
  };

  return (
    <div className='container d-flex flex-column gap-3'>
      <div className="content">
      <div className="pokedex-container container-fluid bg-danger d-flex align-items-center flex-column p-5 rounded gap-3">
        <div className="search-pokemon">
          <h1>Pokédex</h1>
          <input type="text" value={pokemon} onChange={handleInputChange} />
          <button onClick={handleSearchClick}>Procurar</button>
        </div>
        {pokemonData && (
          <div>
            <h2>{pokemonData.name}</h2>
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          </div>
        )}
      </div>
    </div>
  </div>
  );
}

export default App;
