import React, { useState, useEffect } from "react";
import api from "services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{

    async function loadRepositories(){
      console.log('load');
      const response = await api.get('repositories');
      console.log(response);
      setRepositories(response.data);
    }

    loadRepositories();
  },[]);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
        url: "https://github.com/Rocketseat/unform",
        title: 'Unform',
        techs: ['ReactJS', 'React Native'],
    });

    if (response.data){
      console.log(response.data);
      setRepositories([...repositories, response.data]);
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    console.log(response);

    if (response.status === 204){
      const index = repositories.findIndex(repo => repo.id === id);

      if (index >= 0){
        const newRepositories = [...repositories];
        newRepositories.splice(index, 1);
        console.log(newRepositories);
        setRepositories(newRepositories);
      }
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
        <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
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
