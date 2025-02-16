import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";

// import { useAppStore } from "./store/store";

// function About() {
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">About</h1>
//     </div>
//   );
// }
import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";

import { lazy } from "react";
import More from "./features/More/More";

const CatsComponent = lazy(() => import("./features/Cats/Cats"));
const NavBarComponent = lazy(() => import("./components/Navbar/Navbar"));

const App = () => {
  return (
    <div>
      <svg className="blob" id="10015.io" viewBox="0 0 480 480">
        <path
          fill="#f7a478"
          d="M433,295.5Q432,351,394,396.5Q356,442,298,434.5Q240,427,180,437Q120,447,98,391Q76,335,60.5,287.5Q45,240,58.5,191.5Q72,143,100.5,95.5Q129,48,184.5,54Q240,60,284.5,73Q329,86,379,108.5Q429,131,431.5,185.5Q434,240,433,295.5Z"
        />
      </svg>
      <BrowserRouter>
        <NavBarComponent />

        <Routes>
          <Route path="/" element={<CatsComponent />} />
          <Route path="moreInfo" element={<More />} />
        </Routes>
      </BrowserRouter>

      <svg className="blob-right" id="10016.io" viewBox="0 0 480 480">
        <path
          fill="#f7a446"
          d="M433,295.5Q432,351,394,396.5Q356,442,298,434.5Q240,427,180,437Q120,447,98,391Q76,335,60.5,287.5Q45,240,58.5,191.5Q72,143,100.5,95.5Q129,48,184.5,54Q240,60,284.5,73Q329,86,379,108.5Q429,131,431.5,185.5Q434,240,433,295.5Z"
        />
      </svg>
    </div>
  );
};

export default App;
