import React, { useEffect, useState } from "react";
import Tours from "./Tours";

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    try {
      const resp = await fetch("https://course-api.com/react-tours-project");
      const data = await resp.json();
      setTours(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchTours();
  }, []);
  console.log(tours);
  if (loading) {
    return (
      <main style={{ textAlign: "center" }}>
        <h2>Loading ...</h2>
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main style={{ textAlign: "center" }}>
        <h2>No Tours Left</h2>
        <button className="btn" onClick={fetchTours}>
          Refresh
        </button>
      </main>
    );
  }

  return <Tours tours={tours} removeTour={removeTour} />;
}

export default App;
