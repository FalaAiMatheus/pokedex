import React, { useState } from 'react';
import './App.css'

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
          <h1 className='text-white text-center'>Pokédex</h1>
        <div className="search-pokemon d-flex gap-2">
          <input type="text" className='input-search' value={pokemon} onChange={handleInputChange} />
          <button className='btn btn-dark' onClick={handleSearchClick}>Procurar</button>
        </div>
        {pokemonData && (
          <div>
            <div className="poke-info d-flex gap-2">
              <h2 className='text-white'>#0{pokemonData.id}</h2>
              <h2 className='text-capitalize text-white'>{pokemonData.name}</h2>
            </div>
            <img src={pokemonData.sprites.other.dream_world.front_default} className='img-poke' alt={pokemonData.name} />
            <div className="d-flex gap-4">
              <h3><span class="badge bg-secondary">{pokemonData.types[0].type.name}</span></h3>
              <h3><span class="badge bg-secondary">{pokemonData.types[1].type.name}</span></h3>
            </div>
            <div className="stats-poke">
               <div class="stat">
                  <span class="border border-black p-2 rounded bg-danger-subtle">HP: {pokemonData.stats[0].base_stat}</span>
              </div>
              <div class="stat">
                  <span class="border border-black p-2 rounded bg-danger">ATK: {pokemonData.stats[1].base_stat}</span>
              </div>
              <div class="stat">
                  <span class="border border-black p-2 rounded bg-info-subtle">DEF: {pokemonData.stats[2].base_stat}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}

export default App;
