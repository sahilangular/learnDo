import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";

const Home = lazy(() => import("./components/Home"));
const Learn = lazy(() => import("./components/Learning"));
const Quiz = lazy(() => import("./components/Quiz"));
const Result = lazy(() => import("./components/Result"));

const App = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;