import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./Pages/HomePage";
import LandingPage from "./Pages/LandingPage";
import SignupPage from "./Pages/SignupPage";

import { firebaseConfig } from "./firebase/config";

import { AuthContext } from "./store/auth-context";
function App() {
  const { isAuth } = useContext(AuthContext);
  console.log(isAuth);
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
        
      </Routes>
    </Layout>
  );
}

export default App;
