import React from "react";

const types = ["All", "Fire", "Water", "Grass", "Electric", "Bug", "Poison", "Normal", "Ground", "Fairy", "Fighting", "Psychic", "Rock", "Ghost", "Ice", "Dragon"];

const FilterBar = ({ searchTerm, setSearchTerm, typeFilter, setTypeFilter }) => {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
        {types.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
