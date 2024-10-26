import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import TopRanksPage from "./pages/TopRanksPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/top-ranks" element={<TopRanksPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
