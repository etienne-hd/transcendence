import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./pages/Auth/Register.tsx";
import LoginContext from "./context/LoginContext.tsx";
import NotificationContextProvider from "./context/NotificationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoginContext>
      <NotificationContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </NotificationContextProvider>
    </LoginContext>
  </StrictMode>,
);
