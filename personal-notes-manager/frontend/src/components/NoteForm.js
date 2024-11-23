import React, { useState, useEffect } from 'react';
import { createNote, updateNote } from '../services/api';

const NoteForm = ({ isEditing, currentNote, onFormComplete }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Others');

  useEffect(() => {
    if (isEditing && currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
      setCategory(currentNote.category);
    } else {
      setTitle('');
      setDescription('');
      setCategory('Others');
    }
  }, [isEditing, currentNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noteData = { title, description, category };

    try {
      if (isEditing) {
        await updateNote(currentNote._id, noteData);
      } else {
        await createNote(noteData);
      }
      onFormComplete(); // Notify parent component to refresh
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h3>{isEditing ? 'Edit Note' : 'Add New Note'}</h3>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          className="form-control"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <select
          id="category"
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        {isEditing ? 'Update Note' : 'Add Note'}
      </button>
    </form>
  );
};

export default NoteForm;
