import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FilePlus, Save, Trash2 } from 'lucide-react';
import { ProjectSettings } from './ProjectSettings';

interface FileToolbarProps {
  activeFile: string;
  createFile: (path: string, content?: string) => void;
  removeFile: (path: string) => void;
  updateCurrentFile: (content: string) => void;
}

export const FileToolbar: React.FC<FileToolbarProps> = ({
  activeFile,
  createFile,
  removeFile,
  updateCurrentFile,
}) => {
  const [isNewFileDialogOpen, setIsNewFileDialogOpen] = useState(false);
  const [newFilePath, setNewFilePath] = useState('');

  const handleCreateFile = () => {
    if (newFilePath) {
      // Add leading slash if not present
      const path = newFilePath.startsWith('/') ? newFilePath : `/${newFilePath}`;
      createFile(path);
      setNewFilePath('');
      setIsNewFileDialogOpen(false);
    }
  };

  const handleDeleteFile = () => {
    if (activeFile) {
      removeFile(activeFile);
    }
  };

  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-800">
      <div className="flex items-center space-x-2">
        <Dialog open={isNewFileDialogOpen} onOpenChange={setIsNewFileDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <FilePlus className="h-4 w-4 mr-2" />
              New File
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New File</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                placeholder="/path/to/file.js"
                value={newFilePath}
                onChange={(e) => setNewFilePath(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateFile();
                  }
                }}
              />
              <div className="mt-4 flex justify-end">
                <Button onClick={handleCreateFile}>Create</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          size="sm"
          onClick={handleDeleteFile}
          disabled={!activeFile || activeFile === '/index.js' || activeFile === '/index.html' || activeFile === '/package.json'}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete File
        </Button>

        <ProjectSettings />
      </div>
      <div className="text-sm text-gray-400">
        {activeFile ? `Editing: ${activeFile}` : 'No file selected'}
      </div>
    </div>
  );
};
