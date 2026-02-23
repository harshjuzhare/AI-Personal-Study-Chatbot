import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Notes() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch notes from backend
  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:5000/api/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    if (!title.trim() || !description.trim()) return;

    if (editId) {
      await axios.put(`http://localhost:5000/api/notes/${editId}`, {
        title,
        description,
      });
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/api/notes", {
        title,
        description,
      });
    }

    setTitle("");
    setDescription("");
    fetchNotes();
  };

  const editNote = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setEditId(note.id);
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    fetchNotes();
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8 bg-gray-100 min-h-screen">
          <h2 className="text-2xl font-bold mb-6">📝 My Notes</h2>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍 Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          {/* Form */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            />

            <textarea
              placeholder="Note Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            />

            <button
              onClick={addNote}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              {editId ? "Update Note" : "Add Note"}
            </button>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-3 gap-6">
            {filteredNotes.length === 0 ? (
              <p className="text-gray-500">No notes found.</p>
            ) : (
              filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white p-5 rounded-xl shadow-md relative"
                >
                  <h3 className="text-lg font-bold mb-2">{note.title}</h3>
                  <p className="text-gray-600 mb-3">{note.description}</p>
                  <p className="text-xs text-gray-400">{note.date}</p>

                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => editNote(note)}
                      className="text-blue-500"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteNote(note.id) }
                      className="text-red-500"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}