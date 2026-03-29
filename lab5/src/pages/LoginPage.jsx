import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Заповніть всі поля");
      return;
    }

    setLoading(true);
    try {
      const data = await authService.login(email, password);
      login(data.token, email);
      navigate("/books");
    } catch (err) {
      setError("Невірний email або пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Вхід</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} type="email" placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input style={styles.input} type="password" placeholder="Пароль"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? "Завантаження..." : "Увійти"}
          </button>
        </form>
        <p style={styles.footer}>
          Немає акаунту? <Link to="/register" style={styles.link}>Реєстрація</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center",
    minHeight: "80vh", background: "#1e1e2e" },
  card: { background: "#313244", padding: "40px", borderRadius: "12px",
    width: "100%", maxWidth: "400px" },
  title: { color: "#cdd6f4", marginBottom: "20px", textAlign: "center" },
  input: { display: "block", width: "100%", padding: "10px", marginBottom: "12px",
    borderRadius: "8px", border: "1px solid #45475a", background: "#1e1e2e",
    color: "#cdd6f4", boxSizing: "border-box" },
  btn: { width: "100%", padding: "10px", background: "#cba6f7", border: "none",
    borderRadius: "8px", fontWeight: "bold", cursor: "pointer", color: "#1e1e2e" },
  error: { color: "#f38ba8", marginBottom: "12px" },
  footer: { color: "#6c7086", marginTop: "16px", textAlign: "center" },
  link: { color: "#cba6f7" },
};
