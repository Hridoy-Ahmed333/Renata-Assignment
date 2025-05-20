import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppLayout from "./Components/App_Layout/AppLayout";
import Dashboard from "./Pages/Dashboard";
import { DarkModeProvider } from "./Context/DarkModeContext";
import SigninPage from "./Pages/SigninPage";
import { initianData } from "./Utills/userDaraFetch";
import { UserProvider } from "./Context/UserContexts";
import Users from "./Pages/Users";
import ProtectedRoute from "./Components/ProtectedRoute";
import NotFound from "./Pages/NotFound";
import ReadMe from "./Pages/ReadMe";

function App() {
  initianData();
  return (
    <UserProvider>
      <DarkModeProvider>
        <Router>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#333",
                color: "#fff",
              },
            }}
            reverseOrder={false}
          />
          <Routes>
            <Route path="/login" element={<SigninPage />} />
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/read" element={<ReadMe />} />
              <Route
                path="/users"
                element={
                  <ProtectedRoute
                    allowedRoles={["Admin", "Sales Representative"]}
                  >
                    <Users />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </DarkModeProvider>
    </UserProvider>
  );
}

export default App;
