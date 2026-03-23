import { useEffect, useState } from "react";
import "./App.css";
import PageWrapper from "./components/PageWrapper";
import type { User } from "./api/types/user";
import axios from "axios";
import { userService } from "./api/api.user";
import { useLogin } from "./context/LoginContext";

function App() {
  // All the code under is a test page for request
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<User | null>(null); // Initialisé à null
  const [loading, setLoading] = useState(true);

  const { logout } = useLogin();

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const data = await userService.me();
        setUser(data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          if (err.response.data.statusCode == 401) {
            logout();
          }
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [logout]);

  return (
    <PageWrapper needLog={true} redirectNoLog="/auth">
      <div className="card">
        {loading ? (
          <p>Loading user...</p>
        ) : user ? (
          <div className="bg-gray-100 p-4 rounded-lg text-black mb-4">
            <p>
              <strong>Nom:</strong> {user.name}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ) : (
          <p>No users found.</p>
        )}

        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      {!loading && (
        <h1 className="text-3xl font-bold text-blue-600">Données reçues !</h1>
      )}
    </PageWrapper>
  );
}

export default App;
