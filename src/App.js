import { Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import Layout from "./components/Layout/Layout";
import { firebaseConfig } from "./firebase/config";
import SignupPage from "./Pages/SignupPage";
import RequireAuth from "./components/Auth/RequireAuth";
import NotFoundPage from "./Pages/NotFoundPage";
import PublicPage from "./components/Public";
import LoginPage from "./Pages/LoginPage";
import ProtectedPage from "./Pages/ProtectedPage";
initializeApp(firebaseConfig);
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="loggedin/*"
          element={
            <RequireAuth>
              <ProtectedPage />
            </RequireAuth>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
