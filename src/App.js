import "./App.css";

import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { today } from "@internationalized/date";
import { useState } from "react";

import DatePicker from "./components/DatePicker";
import Brands from "./components/Brands";

function App() {
  const [date, setDate] = useState({
    start: today(),
    end: today()
  });

  const updateDate = (data) => {
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
