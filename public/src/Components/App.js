import React, { useState } from "react";
import "../App.css";
import Axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8000/all_properties",
    }).then((res) => setData(res.data));
  };
  return (
    <div className="App">
      Public Page
      <div>
        <h1>Properties</h1>
        <button onClick={getUser}>Submit</button>
        {data ? <ul>Properties: {data.properties.map((item, index) => (<li key = {index}>{item.landlord}</li>))}</ul> : null}
      </div> 
    </div>
  );
}

export default App;
