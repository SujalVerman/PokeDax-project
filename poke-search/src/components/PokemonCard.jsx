import React from "react";

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img
        src={pokemon.image}
        alt={pokemon.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
        }}
      />

      <h2>{pokemon.name}</h2>
      <p>#{pokemon.id}</p>
      <div className="types">
        {pokemon.types.map((type, i) => (
          <span key={i} className="type">
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
