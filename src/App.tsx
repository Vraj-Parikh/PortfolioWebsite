import { useState } from "react";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";

const App = () => {
  const [navBarHeight, setNavBarHeight] = useState(0);
  return (
    <div className="">
      <NavBar navBarHeight={navBarHeight} setNavBarHeight={setNavBarHeight} />
      <Hero navBarHeight={navBarHeight} />
    </div>
  );
};

export default App;
