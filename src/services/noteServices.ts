import { type Note } from '../types/note';

// Базовый URL для API (замените на ваш)
const API_BASE_URL = '/api';

export const noteService = {
  // Получить все заметки
  async getAllNotes(): Promise<Note[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/notes`);
      if (!response.ok) {
        throw new Error('Не удалось загрузить заметки');
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при получении заметок:', error);
      throw error;
    }
  },

  // Получить заметку по ID
  async getNoteById(id: string): Promise<Note> {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`);
      if (!response.ok) {
        throw new Error('Заметка не найдена');
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при получении заметки:', error);
      throw error;
    }
  },

  // Создать новую заметку
  async createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    try {
      const response = await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
      if (!response.ok) {
        throw new Error('Не удалось создать заметку');
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при создании заметки:', error);
      throw error;
    }
  },

  // Обновить заметку
  async updateNote(id: string, note: Partial<Note>): Promise<Note> {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
      if (!response.ok) {
        throw new Error('Не удалось обновить заметку');
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при обновлении заметки:', error);
      throw error;
    }
  },

  // Удалить заметку
  async deleteNote(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Не удалось удалить заметку');
      }
    } catch (error) {
      console.error('Ошибка при удалении заметки:', error);
      throw error;
    }
  },
};

export default noteService;