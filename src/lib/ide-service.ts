// IDE Service for handling file operations

interface FileData {
  path: string;
  content: string;
  lastModified: number;
}

interface ProjectData {
  name: string;
  files: Record<string, FileData>;
  dependencies: Record<string, string>;
}

class IDEService {
  private storageKey = 'mitra-react-ide-project';

  // Save the current project to localStorage
  saveProject(project: ProjectData): void {
    localStorage.setItem(this.storageKey, JSON.stringify(project));
  }

  // Load the project from localStorage
  loadProject(): ProjectData | null {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error('Error parsing project data:', error);
      }
    }
    return null;
  }

  // Create a new file
  createFile(project: ProjectData, path: string, content: string): ProjectData {
    const newProject = { ...project };
    newProject.files[path] = {
      path,
      content,
      lastModified: Date.now(),
    };
    this.saveProject(newProject);
    return newProject;
  }

  // Update an existing file
  updateFile(project: ProjectData, path: string, content: string): ProjectData {
    const newProject = { ...project };
    if (newProject.files[path]) {
      newProject.files[path] = {
        ...newProject.files[path],
        content,
        lastModified: Date.now(),
      };
      this.saveProject(newProject);
    }
    return newProject;
  }

  // Delete a file
  deleteFile(project: ProjectData, path: string): ProjectData {
    const newProject = { ...project };
    if (newProject.files[path]) {
      delete newProject.files[path];
      this.saveProject(newProject);
    }
    return newProject;
  }

  // Add a dependency
  addDependency(project: ProjectData, name: string, version: string): ProjectData {
    const newProject = { ...project };
    newProject.dependencies[name] = version;
    this.saveProject(newProject);
    return newProject;
  }

  // Remove a dependency
  removeDependency(project: ProjectData, name: string): ProjectData {
    const newProject = { ...project };
    if (newProject.dependencies[name]) {
      delete newProject.dependencies[name];
      this.saveProject(newProject);
    }
    return newProject;
  }

  // Create a new project
  createNewProject(name: string): ProjectData {
    const newProject: ProjectData = {
      name,
      files: {},
      dependencies: {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
      },
    };
    this.saveProject(newProject);
    return newProject;
  }

  // Export project as a zip file
  exportProject(project: ProjectData): Blob {
    // This would normally use a library like JSZip to create a zip file
    // For now, we'll just return a JSON blob
    return new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
  }

  // Share project (generate a shareable link)
  shareProject(project: ProjectData): string {
    // In a real implementation, this would upload the project to a server
    // and return a shareable link
    // For now, we'll just encode the project data in a URL parameter
    const projectData = encodeURIComponent(JSON.stringify(project));
    return `${window.location.origin}/ide-test.html?project=${projectData}`;
  }
}

export const ideService = new IDEService();
