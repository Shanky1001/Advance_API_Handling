import { AppProvider, Select } from "@shopify/polaris";
import React, { useState } from "react";
import "./App.css";
import Fetch from "./Components/Fetch";

function App() {
  return (
    <>
    <AppProvider>
      <Fetch />
    </AppProvider>
    </>
  )
}

export default App;


