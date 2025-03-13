import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [prompts, setPrompts] = useState(() => {
    const savedPrompts = localStorage.getItem("prompts");
    return savedPrompts ? JSON.parse(savedPrompts) : {};
  });
  const [promptName, setPromptName] = useState("");
  const [content, setContent] = useState(
    "[Rol] [Tarea] [Formato] [Contexto] [Referencias] [Restricciones]"
  );
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("prompts", JSON.stringify(prompts));
  }, [prompts]);

  const clearForm = () => {
    setPromptName("");
    setContent(
      "[Rol] [Tarea] [Formato] [Contexto] [Referencias] [Restricciones]"
    );
  };

  const handleAdd = () => {
    if (!promptName || !content.trim()) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }
    if (prompts[promptName]) {
      setErrorMessage("El prompt ya existe. Usa otro nombre o actualízalo.");
      return;
    }
    setPrompts({ ...prompts, [promptName]: content });
    setErrorMessage("");
    clearForm();
  };

  const handleUpdate = () => {
    if (!promptName || !content.trim()) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }
    if (!prompts[promptName]) {
      setErrorMessage("El prompt no existe. Añádelo primero.");
      return;
    }
    setPrompts({ ...prompts, [promptName]: content });
    setErrorMessage("");
    clearForm();
  };

  const handleDelete = () => {
    if (!promptName) {
      setErrorMessage("Escribe el nombre del prompt para eliminarlo.");
      return;
    }
    if (!prompts[promptName]) {
      setErrorMessage("El prompt no existe.");
      return;
    }
    const updatedPrompts = { ...prompts };
    delete updatedPrompts[promptName];
    setPrompts(updatedPrompts);
    setErrorMessage("");
    clearForm();
  };

  return (
    <div className="container">
      <h1>Gestor de Prompts</h1>
      <form id="promptForm">
        <label htmlFor="promptNameInput">Nombre del Prompt</label>
        <input
          type="text"
          id="promptNameInput"
          placeholder="Escribe el nombre del prompt aquí..."
          value={promptName}
          onChange={(e) => setPromptName(e.target.value)}
        />

        <label htmlFor="promptContent">Contenido</label>
        <textarea
          id="promptContent"
          className="editable-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="button-group">
          <button type="button" onClick={handleAdd}>
            Añadir
          </button>
          <button type="button" onClick={handleUpdate}>
            Actualizar
          </button>
          <button type="button" onClick={handleDelete}>
            Eliminar
          </button>
        </div>

        <label htmlFor="promptNameSelect">Seleccionar Prompt</label>
        <select
          id="promptNameSelect"
          value={selectedPrompt}
          onChange={(e) => {
            const selected = e.target.value;
            setSelectedPrompt(selected);
            if (selected && prompts[selected]) {
              setPromptName(selected);
              setContent(prompts[selected]);
            }
          }}
        >
          <option value="">Selecciona un prompt</option>
          {Object.keys(prompts).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        {errorMessage && <div className="error">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default App;
