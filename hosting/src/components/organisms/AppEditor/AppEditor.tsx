import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/terminal';

export const AppEditor: React.FC = () => (
  <div>
    <AceEditor
      name="editor"
      mode="javascript"
      theme="terminal"
      fontSize={14}
      height="100%"
      width="100%"
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  </div>
);
