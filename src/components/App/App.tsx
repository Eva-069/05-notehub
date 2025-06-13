import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import {  type Note } from '../../types/note';
import NoteList from '../NoteList/NoteList';
import NoteModal from '../NoteModal/NoteModal';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  
  const queryClient = useQueryClient();
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', currentPage, debouncedSearchTerm],
    queryFn: () => fetchNotes({ 
      page: currentPage, 
      perPage: 12,
      search: debouncedSearchTerm 
    }),
    placeholderData: (previousData) => previousData
  });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage + 1);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNoteCreated = () => {
    queryClient.invalidateQueries({ queryKey: ['notes'] });
    setIsModalOpen(false);
  };

  const handleNoteDeleted = () => {
    queryClient.invalidateQueries({ queryKey: ['notes'] });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearchChange={handleSearchChange} />
        
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={currentPage - 1}
            onPageChange={handlePageChange}
          />
        )}
        
        <button className={css.button} onClick={handleOpenModal}>
          Create note +
        </button>
      </header>
      
      {data && data.notes.length > 0 && (
        <NoteList 
          notes={data.notes} 
          onNoteDeleted={handleNoteDeleted}
        />
      )}
      
      {isModalOpen && (
        <NoteModal 
          onClose={handleCloseModal}
          onNoteCreated={handleNoteCreated}
        />
      )}
    </div>
  );
};

export default App;