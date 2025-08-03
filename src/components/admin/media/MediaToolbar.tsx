'use client';

import React from 'react';
import { FaThLarge, FaList, FaSort, FaFilter, FaSearch, FaTrash } from 'react-icons/fa';
import { Button } from '../../ui/design-system/Button';
import { Input } from '../../ui/design-system/Input';
import { MediaType, ViewMode } from '../../../types/media';

interface MediaToolbarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  sortBy: 'date' | 'name' | 'size';
  setSortBy: (sort: 'date' | 'name' | 'size') => void;
  filterType: MediaType | 'all';
  setFilterType: (type: MediaType | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCount: number;
  onDelete: () => void;
}

export default function MediaToolbar({
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  filterType,
  setFilterType,
  searchQuery,
  setSearchQuery,
  selectedCount,
  onDelete
}: MediaToolbarProps) {
  return (
    <div className="border-b border-border-default p-4 bg-bg-subtle rounded-t-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left side: Search */}
        <div className="flex-grow max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-text-muted" />
            </div>
            <Input
              type="text"
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Right side: Controls */}
        <div className="flex items-center space-x-2">
          {/* Filter by type */}
          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <FaFilter className="h-3 w-3" />
              <span>Filter</span>
            </Button>
            <div className="absolute right-0 mt-1 py-1 bg-bg-paper border border-border-default rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[120px]">
              <button 
                className={`w-full text-left px-4 py-1 text-sm hover:bg-bg-subtle ${filterType === 'all' ? 'text-primary-600 font-medium' : ''}`}
                onClick={() => setFilterType('all')}
              >
                All Files
              </button>
              <button 
                className={`w-full text-left px-4 py-1 text-sm hover:bg-bg-subtle ${filterType === 'image' ? 'text-primary-600 font-medium' : ''}`}
                onClick={() => setFilterType('image')}
              >
                Images
              </button>
              <button 
                className={`w-full text-left px-4 py-1 text-sm hover:bg-bg-subtle ${filterType === 'video' ? 'text-primary-600 font-medium' : ''}`}
                onClick={() => setFilterType('video')}
              >
                Videos
              </button>
              <button 
                className={`w-full text-left px-4 py-1 text-sm hover:bg-bg-subtle ${filterType === 'document' ? 'text-primary-600 font-medium' : ''}`}
                onClick={() => setFilterType('document')}
              >
                Documents
              </button>
            </div>
          </div>
          
          {/* Sort by */}
          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <FaSort className="h-3 w-3" />
              <span>Sort</span>
            </Button>
            <div className="absolute right-0 mt-1 py-1 bg-bg-paper border border-border-default rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[120px]">
              <button 
                className={`w-full text-left px-4 py-1 text-sm hover:bg-bg-subtle ${sortBy === 'date' ? 'text-primary-600 font-medium' : ''}`}
                onClick={() => setSortBy('date')}
              >
                Date (Newest)
              </button>
              <button 
                className={`w-full text-left px-4 py-1 text-sm hover:bg-bg-subtle ${sortBy === 'name' ? 'text-primary-600 font-medium' : ''}`}
                onClick={() => setSortBy('name')}
              >
                Name (A-Z)
              </button>
              <button 
                className={`w-full text-left px-4 py-1 text-sm hover:bg-bg-subtle ${sortBy === 'size' ? 'text-primary-600 font-medium' : ''}`}
                onClick={() => setSortBy('size')}
              >
                Size (Largest)
              </button>
            </div>
          </div>
          
          {/* View mode */}
          <div className="border border-border-default rounded-md flex overflow-hidden">
            <button
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20' : 'bg-bg-paper'}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <FaThLarge className="h-4 w-4" />
            </button>
            <button
              className={`p-2 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20' : 'bg-bg-paper'}`}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <FaList className="h-4 w-4" />
            </button>
          </div>
          
          {/* Delete selected */}
          {selectedCount > 0 && (
            <Button
              variant="danger"
              size="sm"
              onClick={onDelete}
              className="flex items-center gap-1"
            >
              <FaTrash className="h-3 w-3" />
              <span>Delete ({selectedCount})</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
