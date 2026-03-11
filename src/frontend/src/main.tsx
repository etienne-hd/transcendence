import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
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

            {/*Auth Routes*/}
            <Route path="/auth" element={<Register />}></Route>

            {/*404 route*/}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </NotificationContextProvider>
    </LoginContext>
  </StrictMode>,
);
