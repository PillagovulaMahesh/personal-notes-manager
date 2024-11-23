import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes';

export const getNotes = (query = '') => axios.get(`${API_URL}${query}`);
export const createNote = (data) => axios.post(API_URL, data);
export const updateNote = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteNote = (id) => axios.delete(`${API_URL}/${id}`);
