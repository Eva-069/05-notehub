export interface Note {
    id: string;
    title: string;
    content: string;
    tags?: string[];
    category?: string;
    priority?: 'low' | 'medium' | 'high';
    completed?: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface CreateNoteDto {
    title: string;
    content: string;
    tags?: string[];
    category?: string;
    priority?: 'low' | 'medium' | 'high';
  }
  
  export interface UpdateNoteDto {
    title?: string;
    content?: string;
    tags?: string[];
    category?: string;
    priority?: 'low' | 'medium' | 'high';
    completed?: boolean;
  }
  
  export interface NoteFilters {
    search?: string;
    category?: string;
    tags?: string[];
    priority?: 'low' | 'medium' | 'high';
    completed?: boolean;
  }