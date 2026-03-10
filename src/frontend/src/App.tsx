import { useEffect, useState } from "react";
import "./App.css";
import PageWrapper from "./components/PageWrapper";
import type { User } from "./api/types/user";
import { authService } from "./api/api.auth";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<User | null>(null); // Initialisé à null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const data = await authService.getMyUser();
        setUser(data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error("Erreur API:", error.response.data);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <PageWrapper>
      <div className="card">
        {loading ? (
          <p>Chargement de l'utilisateur...</p>
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
          <p>Aucun utilisateur trouvé.</p>
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
