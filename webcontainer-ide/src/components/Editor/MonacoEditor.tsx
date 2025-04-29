import { useRef, useEffect } from 'react';
import Editor, { Monaco, OnMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

interface MonacoEditorProps {
  value: string;
  language: string;
  theme?: 'vs-dark' | 'vs-light';
  onChange?: (value: string) => void;
  onSave?: (value: string) => void;
  readOnly?: boolean;
  height?: string;
}

const MonacoEditor = ({
  value,
  language,
  theme = 'vs-dark',
  onChange,
  onSave,
  readOnly = false,
  height = '100%',
}: MonacoEditorProps) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Configurar atalhos de teclado
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      if (onSave && editorRef.current) {
        onSave(editorRef.current.getValue());
      }
    });

    // Configurar o editor
    editor.updateOptions({
      tabSize: 2,
      insertSpaces: true,
      autoIndent: 'full',
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      readOnly,
    });

    // Foco no editor
    editor.focus();
  };

  // Atualizar o valor do editor quando o valor da prop mudar
  useEffect(() => {
    if (editorRef.current) {
      const currentValue = editorRef.current.getValue();
      if (value !== currentValue) {
        editorRef.current.setValue(value);
      }
    }
  }, [value]);

  return (
    <Editor
      height={height}
      language={language}
      value={value}
      theme={theme}
      onChange={onChange}
      onMount={handleEditorDidMount}
      options={{
        readOnly,
        automaticLayout: true,
      }}
    />
  );
};

export default MonacoEditor;
