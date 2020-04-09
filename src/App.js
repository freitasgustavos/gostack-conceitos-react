import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      url: "https://github.com/Rocketseat/umbriel",
      title: "Umbriel",
      techs: ["Node", "Express", "TypeScript"],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const result = repositories.filter((repositorie) =>
      repositorie.id !== id ? repositorie : null
    );
    setRepositories(result);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repositorie) => (
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
