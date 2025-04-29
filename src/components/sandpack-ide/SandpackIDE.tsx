import React, { useState, useEffect } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  SandpackConsole,
  useSandpack,
  SandpackThemeProvider,
} from '@codesandbox/sandpack-react';
import { nightOwl } from '@codesandbox/sandpack-themes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { messageService } from '@/lib/message-service';
import { FileToolbar } from './FileToolbar';
import { ProjectSettings } from './ProjectSettings';
import { defaultFiles } from './defaultFiles';

// Custom hook to handle file operations
const useFileOperations = () => {
  const { sandpack } = useSandpack();
  const { files, activeFile, setActiveFile, updateFile, addFile, deleteFile } = sandpack;

  const createFile = (path: string, content: string = '') => {
    addFile(path, content);
    setActiveFile(path);
  };

  const removeFile = (path: string) => {
    // Don't allow deleting certain files
    if (path === '/index.js' || path === '/index.html' || path === '/package.json') {
      return;
    }
    deleteFile(path);
  };

  const updateCurrentFile = (content: string) => {
    updateFile(activeFile, content);
  };

  return {
    files,
    activeFile,
    setActiveFile,
    createFile,
    removeFile,
    updateCurrentFile,
  };
};

// Main SandpackIDE component
const SandpackIDE: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('editor');
  const [isReady, setIsReady] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'code' | 'preview'>('code');

  useEffect(() => {
    // Notify parent that the IDE is ready
    messageService.sendMessage('IDE_READY', null, null, { timestamp: Date.now() });
    setIsReady(true);

    // Add listener for messages
    const handleMessages = (event: MessageEvent) => {
      if (!event.data || !event.data.type) return;

      switch (event.data.type) {
        case 'TOGGLE_VIEW_MODE':
          toggleViewMode();
          break;
        case 'SAVE_PROJECT':
          handleSaveProject();
          break;
      }
    };

    window.addEventListener('message', handleMessages);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('message', handleMessages);
    };
  }, []);

  // Function to handle saving the project
  const handleSaveProject = () => {
    // This would be implemented to save the project
    // For now, we'll just log a message
    console.log('Saving project...');

    // You could use the ideService here to save the project
    // For example:
    // const { sandpack } = useSandpack();
    // const { files } = sandpack;
    // ideService.saveProject({ name: 'My Project', files, dependencies: {} });

    // Show a notification or alert
    alert('Project saved successfully!');
  };

  const toggleViewMode = () => {
    setViewMode(prevMode => prevMode === 'code' ? 'preview' : 'code');
  };

  return (
    <div className="w-full h-full flex flex-col">
      <SandpackThemeProvider theme={nightOwl}>
        <SandpackProvider
          template="react"
          files={defaultFiles}
          customSetup={{
            dependencies: {
              "react": "^18.2.0",
              "react-dom": "^18.2.0",
            },
          }}
        >
          <div className="flex flex-col h-full">
            <div className="bg-gray-900 text-white p-2 flex justify-between items-center">
              <div className="font-bold text-lg">Mitra React IDE</div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleViewMode}
                  className="bg-gray-800 text-white hover:bg-gray-700"
                >
                  {viewMode === 'code' ? 'Preview Mode' : 'Code Mode'}
                </Button>
              </div>
            </div>

            {viewMode === 'preview' ? (
              <div className="flex-grow flex flex-col h-full">
                <div className="bg-gray-800 p-2 flex justify-between items-center">
                  <div className="text-white font-medium">Preview Mode</div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleViewMode}
                    className="bg-gray-700 text-white hover:bg-gray-600"
                  >
                    Back to Editor
                  </Button>
                </div>
                <div className="flex-grow h-full">
                  <SandpackPreview
                    showNavigator={true}
                    showRefreshButton={true}
                    className="h-full"
                    style={{ height: 'calc(100vh - 90px)' }}
                  />
                </div>
              </div>
            ) : (
              <Card className="flex-grow overflow-hidden border-0 rounded-none">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="flex h-full">
                    <div className="w-64 border-r border-gray-800 h-full">
                      <SandpackFileExplorer />
                    </div>
                    <div className="flex-grow flex flex-col h-full">
                      <FileToolbarWithOperations />
                      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col h-full">
                        <div className="border-b border-gray-800">
                          <TabsList className="bg-transparent">
                            <TabsTrigger value="editor">Editor</TabsTrigger>
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                            <TabsTrigger value="console">Console</TabsTrigger>
                          </TabsList>
                        </div>
                        <TabsContent value="editor" className="flex-grow h-full m-0 p-0 data-[state=active]:flex-grow">
                          <SandpackCodeEditor
                            showLineNumbers={true}
                            showInlineErrors={true}
                            wrapContent={true}
                            className="h-full"
                          />
                        </TabsContent>
                        <TabsContent value="preview" className="flex-grow h-full m-0 p-0 data-[state=active]:flex-grow">
                          <SandpackPreview showNavigator={true} showRefreshButton={true} />
                        </TabsContent>
                        <TabsContent value="console" className="flex-grow h-full m-0 p-0 data-[state=active]:flex-grow">
                          <SandpackConsole className="h-full" />
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </SandpackProvider>
      </SandpackThemeProvider>
    </div>
  );
};

// FileToolbar with file operations
const FileToolbarWithOperations = () => {
  const fileOperations = useFileOperations();
  return <FileToolbar {...fileOperations} />;
};

export default SandpackIDE;
