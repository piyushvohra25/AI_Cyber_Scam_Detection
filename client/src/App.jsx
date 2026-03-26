import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MessageAnalysisPage from "./pages/MessageAnalysisPage";
import UrlAnalysisPage from "./pages/UrlAnalysisPage";
import LinkExposurePage from "./pages/LinkExposurePage";
import MessageActionPage from "./pages/MessageActionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analyze-message" element={<MessageAnalysisPage />} />
        <Route path="/analyze-url" element={<UrlAnalysisPage />} />
        <Route path="/link-exposure" element={<LinkExposurePage />} />
        <Route path="/message-action" element={<MessageActionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
