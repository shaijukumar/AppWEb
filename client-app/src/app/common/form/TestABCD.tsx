import React, { useRef, useState } from 'react'
import JoditEditor from 'jodit-react'

const TestABCD: React.FC = () => {   
    
    const editor = useRef(null)
    const [content, setContent] = useState('');
    const config = {}

  return (
    <div>
          <JoditEditor ref={editor} value={content} config={config as any} onChange={content => setContent(content)} /> 

          {content}             
    </div>

    
  );
};

export default TestABCD;

