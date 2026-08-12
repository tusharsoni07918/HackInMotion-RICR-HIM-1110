import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HomeSections from "./components/HomeSections";
import "./App.css";

function App() {
  return (
    <div className="app">

      <Navbar />

      <main>
        <Hero />
        <HomeSections />
      </main>

    </div>
  );
}

export default App;