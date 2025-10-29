import React, { useState, useEffect } from "react";

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:7777/note", {
        method: "GET",
        credentials: "include", // ✅ to send cookies (JWT)
      });
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  // Create a new note
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Both fields required");

    try {
      const res = await fetch("http://localhost:7777/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      if (res.ok) {
        setNotes([data, ...notes]);
        setTitle("");
        setContent("");
      } else {
        alert(data.message || "Error adding note");
      }
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  // Delete a note
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:7777/note/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setNotes(notes.filter((note) => note._id !== id));
      }
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  // Start editing
  const startEditing = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  // Update note
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingNote) return;

    try {
      const res = await fetch(`http://localhost:7777/note/${editingNote._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, content }),
      });

      const updatedNote = await res.json();
      if (res.ok) {
        setNotes(
          notes.map((n) => (n._id === updatedNote._id ? updatedNote : n))
        );
        setEditingNote(null);
        setTitle("");
        setContent("");
      } else {
        alert(updatedNote.message || "Update failed");
      }
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-400  rounded-[10px]">
      <h2 className="font-semibold mb-4 text-center">Take Notes here</h2>

      {/* Add / Edit Form */}
      <form
        onSubmit={editingNote ? handleUpdate : handleAddNote}
        className="flex flex-col gap-3 mb-6"
      >
        <input
          type="text"
          placeholder="Title"
          className="border-none p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="border-none p-2 rounded"
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-800 text-white py-2 rounded-sm hover:bg-blue-900"
        >
          {editingNote ? "Update Note" : "Add Note"}
        </button>
        {editingNote && (
          <button
            type="button"
            onClick={() => {
              setEditingNote(null);
              setTitle("");
              setContent("");
            }}
            className="bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Notes List */}
      <div className="space-y-3">
        {notes.length === 0 ? (
          <p className="text-center text-gray-500">No notes yet 🗒️</p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="p-4 border rounded-lg shadow-sm flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold text-lg">{note.title}</h3>
                <p className="text-gray-600">{note.content}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEditing(note)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Note;
