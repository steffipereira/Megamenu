import './App.css';
import React, { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([])

  const fetchData = async() => {
    const data = await fetch('/users')
    const response = await data.json()
    if (response) {
      setData(response[0].navCatagories)
    }
  }

  useEffect(() => {
    fetchData()
  },[])
  return (
    <div className="App">
      <header className="App-header">
        {data.map(item => (
            <>
              {item.url_path}
            </>
          )
        )}
      </header>
    </div>
  );
}

export default App;
