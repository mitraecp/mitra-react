import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings, Download, Share } from 'lucide-react';
import { ideService } from '@/lib/ide-service';
import { useSandpack } from '@codesandbox/sandpack-react';

interface Dependency {
  name: string;
  version: string;
}

export const ProjectSettings: React.FC = () => {
  const { sandpack } = useSandpack();
  const { files } = sandpack;
  
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState('Mitra React Project');
  const [newDependency, setNewDependency] = useState<Dependency>({ name: '', version: '' });
  const [dependencies, setDependencies] = useState<Record<string, string>>({
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
  });

  const handleAddDependency = () => {
    if (newDependency.name && newDependency.version) {
      setDependencies({
        ...dependencies,
        [newDependency.name]: newDependency.version,
      });
      setNewDependency({ name: '', version: '' });
    }
  };

  const handleRemoveDependency = (name: string) => {
    const newDependencies = { ...dependencies };
    delete newDependencies[name];
    setDependencies(newDependencies);
  };

  const handleSaveProject = () => {
    // Convert files from Sandpack format to our format
    const fileData: Record<string, any> = {};
    Object.keys(files).forEach((path) => {
      fileData[path] = {
        path,
        content: files[path].code,
        lastModified: Date.now(),
      };
    });

    const project = {
      name: projectName,
      files: fileData,
      dependencies,
    };

    ideService.saveProject(project);
    setIsOpen(false);
  };

  const handleExportProject = () => {
    // Convert files from Sandpack format to our format
    const fileData: Record<string, any> = {};
    Object.keys(files).forEach((path) => {
      fileData[path] = {
        path,
        content: files[path].code,
        lastModified: Date.now(),
      };
    });

    const project = {
      name: projectName,
      files: fileData,
      dependencies,
    };

    const blob = ideService.exportProject(project);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '-').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShareProject = () => {
    // Convert files from Sandpack format to our format
    const fileData: Record<string, any> = {};
    Object.keys(files).forEach((path) => {
      fileData[path] = {
        path,
        content: files[path].code,
        lastModified: Date.now(),
      };
    });

    const project = {
      name: projectName,
      files: fileData,
      dependencies,
    };

    const shareUrl = ideService.shareProject(project);
    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert('Share link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy link:', err);
        alert('Share link: ' + shareUrl);
      });
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        <Settings className="h-4 w-4 mr-2" />
        Project Settings
      </Button>
      
      <Button variant="outline" size="sm" onClick={handleExportProject}>
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
      
      <Button variant="outline" size="sm" onClick={handleShareProject}>
        <Share className="h-4 w-4 mr-2" />
        Share
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Project Settings</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div>
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            
            <div>
              <Label>Dependencies</Label>
              <div className="mt-2 space-y-2">
                {Object.entries(dependencies).map(([name, version]) => (
                  <div key={name} className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{name}</span>
                      <span className="text-gray-500 ml-2">{version}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveDependency(name)}
                      disabled={name === 'react' || name === 'react-dom'}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Label htmlFor="dep-name">Package Name</Label>
                <Input
                  id="dep-name"
                  value={newDependency.name}
                  onChange={(e) => setNewDependency({ ...newDependency, name: e.target.value })}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="dep-version">Version</Label>
                <Input
                  id="dep-version"
                  value={newDependency.version}
                  onChange={(e) => setNewDependency({ ...newDependency, version: e.target.value })}
                  placeholder="^1.0.0"
                />
              </div>
              <Button onClick={handleAddDependency}>Add</Button>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button onClick={handleSaveProject}>Save Project</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
