import { useState } from 'react';
import './FileExplorer.css';

export interface FileItem {
  name: string;
  type: 'file' | 'directory';
  path: string;
  children?: FileItem[];
}

interface FileExplorerProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
  onCreateFile: (path: string, type: 'file' | 'directory') => void;
  onDeleteFile: (path: string) => void;
  onRenameFile: (oldPath: string, newPath: string) => void;
  selectedFile?: string;
}

const FileExplorer = ({
  files,
  onFileSelect,
  onCreateFile,
  onDeleteFile,
  onRenameFile,
  selectedFile,
}: FileExplorerProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  const [newItemPath, setNewItemPath] = useState<string | null>(null);
  const [newItemType, setNewItemType] = useState<'file' | 'directory'>('file');
  const [newItemName, setNewItemName] = useState('');
  const [renamingPath, setRenamingPath] = useState<string | null>(null);
  const [newName, setNewName] = useState('');

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const handleFileClick = (file: FileItem) => {
    if (file.type === 'file') {
      onFileSelect(file);
    } else {
      toggleFolder(file.path);
    }
  };

  const startCreatingItem = (path: string, type: 'file' | 'directory') => {
    setNewItemPath(path);
    setNewItemType(type);
    setNewItemName('');
    // Expandir a pasta pai
    setExpandedFolders((prev) => ({
      ...prev,
      [path]: true,
    }));
  };

  const handleCreateItem = () => {
    if (newItemPath && newItemName) {
      const newPath = `${newItemPath}/${newItemName}`;
      onCreateFile(newPath, newItemType);
      setNewItemPath(null);
      setNewItemName('');
    }
  };

  const startRenaming = (path: string, currentName: string) => {
    setRenamingPath(path);
    setNewName(currentName);
  };

  const handleRename = () => {
    if (renamingPath && newName) {
      const pathParts = renamingPath.split('/');
      pathParts.pop();
      const newPath = [...pathParts, newName].join('/');
      onRenameFile(renamingPath, newPath);
      setRenamingPath(null);
      setNewName('');
    }
  };

  const renderFileTree = (items: FileItem[], level = 0) => {
    return (
      <ul className="file-list" style={{ paddingLeft: level > 0 ? '1rem' : '0' }}>
        {items.map((item) => {
          const isExpanded = expandedFolders[item.path];
          const isSelected = selectedFile === item.path;

          return (
            <li key={item.path}>
              <div
                className={`file-item ${isSelected ? 'selected' : ''}`}
                onClick={() => handleFileClick(item)}
              >
                <span className="file-icon">
                  {item.type === 'directory' ? (isExpanded ? '📂' : '📁') : '📄'}
                </span>
                {renamingPath === item.path ? (
                  <div className="rename-input">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRename();
                        if (e.key === 'Escape') setRenamingPath(null);
                      }}
                      autoFocus
                    />
                    <button onClick={handleRename}>✓</button>
                    <button onClick={() => setRenamingPath(null)}>✕</button>
                  </div>
                ) : (
                  <span className="file-name">{item.name}</span>
                )}
                <div className="file-actions">
                  {item.type === 'directory' && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startCreatingItem(item.path, 'file');
                        }}
                        title="Novo arquivo"
                      >
                        +📄
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startCreatingItem(item.path, 'directory');
                        }}
                        title="Nova pasta"
                      >
                        +📁
                      </button>
                    </>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startRenaming(item.path, item.name);
                    }}
                    title="Renomear"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteFile(item.path);
                    }}
                    title="Excluir"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              {item.type === 'directory' && item.children && isExpanded && (
                <>
                  {newItemPath === item.path && (
                    <div className="new-item-form">
                      <span className="file-icon">
                        {newItemType === 'directory' ? '📁' : '📄'}
                      </span>
                      <input
                        type="text"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder={newItemType === 'directory' ? 'Nova pasta' : 'Novo arquivo'}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleCreateItem();
                          if (e.key === 'Escape') setNewItemPath(null);
                        }}
                        autoFocus
                      />
                      <button onClick={handleCreateItem}>✓</button>
                      <button onClick={() => setNewItemPath(null)}>✕</button>
                    </div>
                  )}
                  {renderFileTree(item.children, level + 1)}
                </>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="file-explorer">
      <div className="file-explorer-header">
        <h3>Arquivos</h3>
        <div className="header-actions">
          <button onClick={() => startCreatingItem('', 'file')} title="Novo arquivo">
            +📄
          </button>
          <button onClick={() => startCreatingItem('', 'directory')} title="Nova pasta">
            +📁
          </button>
        </div>
      </div>
      {newItemPath === '' && (
        <div className="new-item-form">
          <span className="file-icon">{newItemType === 'directory' ? '📁' : '📄'}</span>
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder={newItemType === 'directory' ? 'Nova pasta' : 'Novo arquivo'}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateItem();
              if (e.key === 'Escape') setNewItemPath(null);
            }}
            autoFocus
          />
          <button onClick={handleCreateItem}>✓</button>
          <button onClick={() => setNewItemPath(null)}>✕</button>
        </div>
      )}
      {renderFileTree(files)}
    </div>
  );
};

export default FileExplorer;
