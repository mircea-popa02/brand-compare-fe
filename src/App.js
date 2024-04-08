import "./App.css";

import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { useState } from "react";

import DatePicker from "./components/DatePicker";
import Brands from "./components/Brands";

function App() {
  const [date, setDate] = useState(null);

  const updateDate = (data) => {
    console.log("Data received from child:", data);
    setDate(data);
  };

  return (
    <Provider theme={defaultTheme} colorScheme="light">
      <div className="App">
        <h1>Brand Compare</h1>
        <DatePicker onDateChange={updateDate} />
        <Brands date={date} />
      </div>
    </Provider>
  );
}

export default App;
