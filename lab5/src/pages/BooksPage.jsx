import { useState, useEffect } from "react";
import { bookService } from "../services/bookService";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ title: "", author: "", year: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await bookService.getAll();
      setBooks(data);
    } catch {
      showToast("❌ Помилка завантаження книг");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.author) {
      showToast("⚠️ Назва та автор обов'язкові");
      return;
    }
    try {
      if (editingId) {
        await bookService.update(editingId, form);
        showToast("✅ Книгу оновлено");
      } else {
        await bookService.create(form);
        showToast("✅ Книгу додано");
      }
      setForm({ title: "", author: "", year: "" });
      setEditingId(null);
      setShowForm(false);
      fetchBooks();
    } catch {
      showToast("❌ Помилка збереження");
    }
  };

  const handleEdit = (book) => {
    setForm({ title: book.title, author: book.author, year: book.year });
    setEditingId(book.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Ви впевнені, що хочете видалити цю книгу?")) return;
    try {
      await bookService.delete(id);
      showToast("✅ Книгу видалено");
      fetchBooks();
    } catch {
      showToast("❌ Помилка видалення");
    }
  };

  return (
    <div style={styles.page}>
      {toast && <div style={styles.toast}>{toast}</div>}

      <div style={styles.header}>
        <h2 style={styles.title}>📚 Список книг</h2>
        <button style={styles.addBtn} onClick={() => {
          setForm({ title: "", author: "", year: "" });
          setEditingId(null);
          setShowForm(!showForm);
        }}>
          {showForm ? "✕ Скасувати" : "+ Додати книгу"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.formTitle}>{editingId ? "Редагування" : "Нова книга"}</h3>
          <input style={styles.input} placeholder="Назва книги"
            value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input style={styles.input} placeholder="Автор"
            value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          <input style={styles.input} placeholder="Рік видання"
            value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
          <button type="submit" style={styles.saveBtn}>
            {editingId ? "Зберегти зміни" : "Додати"}
          </button>
        </form>
      )}

      {loading ? (
        <div style={styles.spinner}>⏳ Завантаження...</div>
      ) : books.length === 0 ? (
        <p style={styles.empty}>Книг поки немає. Додайте першу!</p>
      ) : (
        <div style={styles.grid}>
          {books.map((book) => (
            <div key={book.id} style={styles.card}>
              <h3 style={styles.bookTitle}>{book.title}</h3>
              <p style={styles.bookAuthor}>✍️ {book.author}</p>
              {book.year && <p style={styles.bookYear}>📅 {book.year}</p>}
              <div style={styles.cardActions}>
                <button style={styles.editBtn} onClick={() => handleEdit(book)}>✏️ Редагувати</button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(book.id)}>🗑️ Видалити</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { padding: "24px", background: "#1e1e2e", minHeight: "100vh" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
  title: { color: "#cdd6f4", margin: 0 },
  addBtn: { background: "#a6e3a1", border: "none", padding: "10px 20px",
    borderRadius: "8px", fontWeight: "bold", cursor: "pointer", color: "#1e1e2e" },
  form: { background: "#313244", padding: "24px", borderRadius: "12px", marginBottom: "24px" },
  formTitle: { color: "#cba6f7", marginTop: 0 },
  input: { display: "block", width: "100%", padding: "10px", marginBottom: "12px",
    borderRadius: "8px", border: "1px solid #45475a", background: "#1e1e2e",
    color: "#cdd6f4", boxSizing: "border-box" },
  saveBtn: { background: "#cba6f7", border: "none", padding: "10px 24px",
    borderRadius: "8px", fontWeight: "bold", cursor: "pointer", color: "#1e1e2e" },
  spinner: { color: "#cdd6f4", textAlign: "center", padding: "40px" },
  empty: { color: "#6c7086", textAlign: "center", padding: "40px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px" },
  card: { background: "#313244", borderRadius: "12px", padding: "20px" },
  bookTitle: { color: "#cdd6f4", margin: "0 0 8px 0" },
  bookAuthor: { color: "#a6e3a1", margin: "0 0 4px 0" },
  bookYear: { color: "#89b4fa", margin: "0 0 16px 0", fontSize: "0.9rem" },
  cardActions: { display: "flex", gap: "8px" },
  editBtn: { flex: 1, background: "#89b4fa", border: "none", padding: "8px",
    borderRadius: "6px", cursor: "pointer", fontWeight: "bold", color: "#1e1e2e" },
  deleteBtn: { flex: 1, background: "#f38ba8", border: "none", padding: "8px",
    borderRadius: "6px", cursor: "pointer", fontWeight: "bold", color: "#1e1e2e" },
  toast: { position: "fixed", top: "20px", right: "20px", background: "#313244",
    color: "#cdd6f4", padding: "12px 20px", borderRadius: "8px",
    border: "1px solid #45475a", zIndex: 1000 },
};
