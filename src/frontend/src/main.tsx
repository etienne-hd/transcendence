import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./pages/Auth/Register.tsx";
import LoginContext from "./context/LoginContext.tsx";
import NotificationContextProvider from "./context/NotificationContext.tsx";
import Navbar from "./components/Navigation/Navbar.tsx";
import FriendFocusedContextProvider from "./context/FriendFocusedContext.tsx";
import Conversation from "./pages/Message/Conversation.tsx";
import UserContextProvider from "./context/UserContext.tsx";
import FriendListContextProvider from "./context/FriendListContext.tsx";
import MessageContextProvider from "./context/MessageContext.tsx";
import WebSocketContextProvider from "./context/WebSocketContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoginContext>
      <NotificationContextProvider>
        <WebSocketContextProvider>
          <UserContextProvider>
            <FriendListContextProvider>
              <FriendFocusedContextProvider>
                <MessageContextProvider>
                  <div className="bg-bg-tertiary text-font-main flex flex-row w-full h-full">
                    <BrowserRouter>
                      <Navbar />
                      <Routes>
                        <Route path="/" element={<App />} />

                        {/*Auth Routes*/}
                        <Route path="/auth" element={<Register />}></Route>

                        <Route
                          path="/message/:id"
                          element={<Conversation />}
                        ></Route>
                      </Routes>
                    </BrowserRouter>
                  </div>
                </MessageContextProvider>
              </FriendFocusedContextProvider>
            </FriendListContextProvider>
          </UserContextProvider>
        </WebSocketContextProvider>
      </NotificationContextProvider>
    </LoginContext>
  </StrictMode>,
);
