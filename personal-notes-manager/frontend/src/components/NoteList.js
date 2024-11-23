import React from 'react';

const NoteList = ({ notes, onDelete, onEdit }) => {
  return (
    <div>
      <h3>Notes</h3>
      {notes.length === 0 ? (
        <p>No notes available. Add some!</p>
      ) : (
        <ul className="list-group">
          {notes.map((note) => (
            <li key={note._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{note.title}</h5>
                <p>{note.description}</p>
                <span className="badge bg-secondary">{note.category}</span>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(note)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(note._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;
