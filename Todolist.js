import React, { useState } from "react";

function Todolist() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      setData(inputValue);
      setInputValue("");
    }
  };

  const handleUpdate = () => {
    setInputValue(data);
    setData("");
  };

  const handleDelete = () => {
    setData("");
  };
  const handleInput =(e) =>{
    setInputValue(e.target.value);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <input
        type="text"
        value={inputValue}
        //onChange={(e) => setInputValue(e.target.value)}
        onChange={handleInput}
        placeholder="Enter something"
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <button onClick={handleSubmit} style={{ marginRight: "10px" }}>
        Submit
      </button>
      {data && (
        <div>
          <p>{data}</p>
          <button onClick={handleUpdate} style={{ marginRight: "10px" }}>
            Update
          </button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Todolist;