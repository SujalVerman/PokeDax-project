import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import PokemonCard from "./components/PokemonCard";
import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=150");
        const details = await Promise.all(
          res.data.results.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return {
              id: res.data.id,
              name: res.data.name,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${res.data.id}.png`,
              types: res.data.types.map((t) => t.type.name),
            };
            
          })
        );
        setPokemonList(details);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch Pokémon. Please try again.");
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const filtered = pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || pokemon.types.includes(typeFilter.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    <div className="App">
      <Header />
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      {loading ? (
        <p className="loading">Loading Pokémon...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : filtered.length === 0 ? (
        <p className="empty">No Pokémon found.</p>
      ) : (
        <div className="grid">
          {filtered.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
