import React, { useState, useEffect } from 'react';
import { getNotes, deleteNote } from '../services/api';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  // Fetch notes from the backend
  const fetchNotes = async () => {
    try {
      const query = `?search=${searchQuery}&category=${categoryFilter}`;
      const response = await getNotes(query);
      setNotes(response.data);
      setFilteredNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [searchQuery, categoryFilter]);

  // Handle note deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        fetchNotes();
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  // Handle edit initialization
  const handleEdit = (note) => {
    setIsEditing(true);
    setCurrentNote(note);
  };

  // Handle reset after edit/add
  const handleFormComplete = () => {
    setIsEditing(false);
    setCurrentNote(null);
    fetchNotes();
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Personal Notes Manager</h1>

      {/* Search and Filter Section */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      {/* Note Form */}
      <NoteForm
        isEditing={isEditing}
        currentNote={currentNote}
        onFormComplete={handleFormComplete}
      />

      {/* Notes List */}
      <NoteList
        notes={filteredNotes}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default HomePage;
