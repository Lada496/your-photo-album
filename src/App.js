import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import Layout from "./components/Layout/Layout";
import HomePage from "./Pages/HomePage";
import LandingPage from "./Pages/LandingPage";
import SignupPage from "./Pages/SignupPage";

import { firebaseConfig } from "./firebase/config";

import { AuthContext } from "./store/auth-context";
initializeApp(firebaseConfig);
function App() {
  const { isAuth } = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        {!isAuth && (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="signup" element={<SignupPage />} />
          </>
        )}

        {isAuth && <Route path="home/*" element={<HomePage />} />}
        {isAuth && <Route path="/" element={<Navigate to="home" />} />}
        {!isAuth && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </Layout>
  );
}

export default App;
