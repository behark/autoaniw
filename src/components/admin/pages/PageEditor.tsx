'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaSave,
  FaBold,
  FaItalic,
  FaUnderline,
  FaLink,
  FaImage,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaHeading,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaCode,
  FaUndo,
  FaRedo
} from 'react-icons/fa';

interface PageEditorProps {
  initialContent?: string;
  onSave: (content: string, metaData: any) => void;
  isLoading?: boolean;
}

// Note: In a real implementation, you would use a WYSIWYG library like TinyMCE, CKEditor, or Quill
// This is a simplified version for demonstration purposes that uses contentEditable
const PageEditor = ({ initialContent = '', onSave, isLoading = false }: PageEditorProps) => {
  const [content, setContent] = useState(initialContent);
  const [metaData, setMetaData] = useState({
    title: '',
    description: '',
    keywords: '',
    slug: ''
  });
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent;
    }
  }, [initialContent]);

  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const handleMetaDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMetaData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(content, metaData);
  };

  // Simple formatting functions
  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    handleContentChange();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  // Insert link
  const insertLink = () => {
    const url = prompt('Enter the URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  // Insert image
  const insertImage = () => {
    const url = prompt('Enter the image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  return (
    <div className="space-y-6">
      {/* Meta Information */}
      <motion.div 
        className="bg-white rounded-lg shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4">Page Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Page Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={metaData.title}
              onChange={handleMetaDataChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter page title"
            />
          </div>
          
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              URL Slug
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={metaData.slug}
              onChange={handleMetaDataChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. about-us"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Meta Description
          </label>
          <textarea
            id="description"
            name="description"
            value={metaData.description}
            onChange={handleMetaDataChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Brief description for search engines"
          />
        </div>
        
        <div className="mt-4">
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
            Meta Keywords
          </label>
          <input
            type="text"
            id="keywords"
            name="keywords"
            value={metaData.keywords}
            onChange={handleMetaDataChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Comma-separated keywords"
          />
        </div>
      </motion.div>
      
      {/* Editor Toolbar */}
      <motion.div 
        className="sticky top-16 z-10 bg-white rounded-lg shadow-sm border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="p-2 flex flex-wrap gap-1">
          {/* Text Formatting */}
          <button 
            onClick={() => execCommand('bold')}
            className="p-2 hover:bg-gray-100 rounded"
            title="Bold"
          >
            <FaBold />
          </button>
          <button 
            onClick={() => execCommand('italic')}
            className="p-2 hover:bg-gray-100 rounded"
            title="Italic"
          >
            <FaItalic />
          </button>
          <button 
            onClick={() => execCommand('underline')}
            className="p-2 hover:bg-gray-100 rounded"
            title="Underline"
          >
            <FaUnderline />
          </button>
          
          <div className="border-r border-gray-300 mx-1 h-8"></div>
          
          {/* Headings */}
          <select 
            onChange={(e) => execCommand('formatBlock', e.target.value)}
            className="p-2 border border-gray-300 rounded"
            title="Heading"
          >
            <option value="">Format</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="p">Paragraph</option>
          </select>
          
          <div className="border-r border-gray-300 mx-1 h-8"></div>
          
          {/* Alignment */}
          <button 
            onClick={() => execCommand('justifyLeft')}
            className="p-2 hover:bg-gray-100 rounded"
            title="Align Left"
          >
            <FaAlignLeft />
          </button>
          <button 
            onClick={() => execCommand('justifyCenter')}
            className="p-2 hover:bg-gray-100 rounded"
            title="Align Center"
          >
            <FaAlignCenter />
          </button>
          <button 
            onClick={() => execCommand('justifyRight')}
            className="p-2 hover:bg-gray-100 rounded"
            title="Align Right"
          >
            <FaAlignRight />
          </button>
          <button 
            onClick={() => execCommand('justifyFull')}
            className="p-2 hover:bg-gray-100 rounded"
            title="Justify"
          >
            <FaAlignJustify />
          </button>
          
          <div className="border-r border-gray-300 mx-1 h-8"></div>
          
          {/* Lists */}
          <button 
            onClick={() => execCommand('insertUnorderedList')}
            className="p-2 hover:bg-gray-100 rounded"
            title="Bullet List"
          >
            <FaListUl />
          </button>
          <button 
            onClick={() => execCommand('insertOrderedList')}
            className="p-2 hover:bg-gray-100 rounded"
            title="Numbered List"
          >
            <FaListOl />
          </button>
          
          <div className="border-r border-gray-300 mx-1 h-8"></div>
          
          {/* Links and Media */}
          <button 
            onClick={insertLink}
            className="p-2 hover:bg-gray-100 rounded"
            title="Insert Link"
          >
            <FaLink />
          </button>
          <button 
            onClick={insertImage}
            className="p-2 hover:bg-gray-100 rounded"
            title="Insert Image"
          >
            <FaImage />
          </button>
          
          <div className="border-r border-gray-300 mx-1 h-8"></div>
          
          {/* Other Formatting */}
          <button 
            onClick={() => execCommand('formatBlock', '<blockquote>')}
            className="p-2 hover:bg-gray-100 rounded"
            title="Quote"
          >
            <FaQuoteRight />
          </button>
          <button 
            onClick={() => execCommand('formatBlock', '<pre>')}
            className="p-2 hover:bg-gray-100 rounded"
            title="Code Block"
          >
            <FaCode />
          </button>
          
          <div className="border-r border-gray-300 mx-1 h-8"></div>
          
          {/* Undo/Redo */}
          <button 
            onClick={() => execCommand('undo')}
            className="p-2 hover:bg-gray-100 rounded"
            title="Undo"
          >
            <FaUndo />
          </button>
          <button 
            onClick={() => execCommand('redo')}
            className="p-2 hover:bg-gray-100 rounded"
            title="Redo"
          >
            <FaRedo />
          </button>
        </div>
      </motion.div>
      
      {/* Content Editor */}
      <motion.div
        className="bg-white rounded-lg shadow-sm border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div
          ref={editorRef}
          contentEditable
          className="p-6 min-h-[400px] focus:outline-none"
          onInput={handleContentChange}
          dangerouslySetInnerHTML={{ __html: initialContent }}
        />
      </motion.div>
      
      {/* Save Button */}
      <motion.div
        className="flex justify-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <button
          onClick={handleSave}
          disabled={isLoading}
          className={`px-6 py-3 flex items-center text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <FaSave className="mr-2" /> Save Page
            </>
          )}
        </button>
      </motion.div>
      
      {/* Preview of rendered content */}
      <motion.div
        className="bg-white rounded-lg shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">Preview</h3>
        <div 
          className="prose max-w-none" 
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </motion.div>
    </div>
  );
};

export default PageEditor;
