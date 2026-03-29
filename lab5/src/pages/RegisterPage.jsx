import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/authService";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Заповніть всі поля");
      return;
    }
    if (password.length < 8) {
      setError("Пароль має бути мінімум 8 символів");
      return;
    }

    setLoading(true);
    try {
      await authService.register(email, password);
      setSuccess("Реєстрація успішна! Перенаправлення...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Помилка реєстрації. Спробуйте інший email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Реєстрація</h2>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} type="email" placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input style={styles.input} type="password" placeholder="Пароль (мін. 8 символів)"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          {password.length > 0 && password.length < 8 && (
            <p style={styles.hint}>⚠️ Пароль замалий: {password.length}/8</p>
          )}
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? "Завантаження..." : "Зареєструватись"}
          </button>
        </form>
        <p style={styles.footer}>
          Вже є акаунт? <Link to="/login" style={styles.link}>Увійти</Link>
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
  success: { color: "#a6e3a1", marginBottom: "12px" },
  hint: { color: "#fab387", fontSize: "0.85rem", marginBottom: "8px" },
  footer: { color: "#6c7086", marginTop: "16px", textAlign: "center" },
  link: { color: "#cba6f7" },
};
