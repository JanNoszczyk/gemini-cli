# UI Components Guide: Ink to Web

## Overview

This guide maps Gemini CLI's Ink (terminal) components to web equivalents, helping you adapt the UI patterns for your Next.js application.

## Component Mapping Reference

### Core Layout Components

| Ink Component | Web Equivalent | Key Differences |
|---------------|----------------|-----------------|
| `<Box>` | `<div>` | Use CSS flexbox/grid instead of Ink props |
| `<Text>` | `<span>`, `<p>`, `<div>` | Style with CSS classes |
| `<Static>` | Regular JSX | No special handling needed |
| `<Transform>` | CSS transforms | Use `transform` CSS property |

### Layout Props Translation

```typescript
// Ink
<Box flexDirection="column" paddingX={1} marginTop={2}>
  <Text>Content</Text>
</Box>

// Web
<div className="flex flex-col px-4 mt-8">
  <span>Content</span>
</div>
```

### Color System

```typescript
// colors.ts mapping
export const webColors = {
  // Ink colors → Tailwind classes
  'AccentPurple': 'text-purple-600',
  'AccentBlue': 'text-blue-600',
  'AccentGreen': 'text-green-600',
  'AccentYellow': 'text-yellow-600',
  'AccentRed': 'text-red-600',
  'Gray': 'text-gray-500',
  'Foreground': 'text-gray-900',
  'Background': 'bg-white'
};
```

## Component Patterns

### 1. Message Components

#### GeminiMessage Pattern

```typescript
// Ink version (simplified)
const GeminiMessage = ({ text, isPending }) => (
  <Box flexDirection="row">
    <Box width={2}>
      <Text color={Colors.AccentPurple}>✦ </Text>
    </Box>
    <Box flexGrow={1}>
      <MarkdownDisplay text={text} isPending={isPending} />
    </Box>
  </Box>
);

// Web adaptation
const GeminiMessage = ({ content, isPending }) => (
  <div className="flex gap-2">
    <span className="text-purple-600 flex-shrink-0">✦</span>
    <div className="flex-1 prose prose-sm max-w-none">
      {isPending ? (
        <span className="animate-pulse">{content}▊</span>
      ) : (
        <ReactMarkdown>{content}</ReactMarkdown>
      )}
    </div>
  </div>
);
```

#### UserMessage Pattern

```typescript
// Web version
const UserMessage = ({ content }) => (
  <div className="flex gap-2">
    <span className="text-blue-600 flex-shrink-0">› </span>
    <div className="flex-1">
      <p className="whitespace-pre-wrap">{content}</p>
    </div>
  </div>
);
```

### 2. Tool Execution Components

#### Tool Status Indicators

```typescript
// Ink uses custom spinner components
import { GeminiRespondingSpinner } from '../GeminiRespondingSpinner.js';

// Web equivalent
const ToolStatusIndicator = ({ status }) => {
  const indicators = {
    pending: { icon: '○', className: 'text-gray-400' },
    executing: { icon: '⊷', className: 'text-blue-500 animate-spin' },
    success: { icon: '✔', className: 'text-green-500' },
    confirming: { icon: '?', className: 'text-yellow-500' },
    canceled: { icon: '-', className: 'text-yellow-600' },
    error: { icon: '✗', className: 'text-red-500' }
  };

  const { icon, className } = indicators[status];
  
  return <span className={className}>{icon}</span>;
};
```

#### Tool Message Component

```typescript
// Web adaptation of ToolMessage
const ToolMessage = ({ name, description, status, result }) => {
  return (
    <div className="my-2">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded">
        <ToolStatusIndicator status={status} />
        <span className="font-medium">{name}</span>
        <span className="text-gray-500 text-sm">{description}</span>
      </div>
      
      {result && (
        <div className="ml-6 mt-2 p-3 bg-gray-100 rounded font-mono text-sm">
          <pre className="overflow-x-auto">{result}</pre>
        </div>
      )}
    </div>
  );
};
```

### 3. Input Components

#### Basic Input

```typescript
// Ink uses TextInput from ink-text-input
import TextInput from 'ink-text-input';

// Web equivalent
const ChatInput = ({ value, onChange, onSubmit, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          onSubmit();
        }
      }}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
    />
  );
};
```

#### Multi-line Input with Special Features

```typescript
// Adapting TextBuffer behavior
const MultilineInput = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    // Ctrl+Enter for new line (like in CLI)
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      setValue(prev => prev + '\n');
    }
    // Enter to submit
    else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(value);
      setValue('');
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      className="w-full min-h-[60px] p-3 border rounded-lg resize-none"
      placeholder="Type your message... (Ctrl+Enter for new line)"
    />
  );
};
```

### 4. Loading & Progress Components

#### Spinner Adaptation

```typescript
// Ink spinner
import Spinner from 'ink-spinner';
<Spinner type="dots" />

// Web equivalent
const LoadingSpinner = ({ type = 'dots' }) => {
  // CSS animation for dots spinner
  return (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100" />
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200" />
    </div>
  );
};
```

#### Progress Indicators

```typescript
// Web progress bar
const ProgressBar = ({ value, max = 100 }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
```

### 5. Interactive Components

#### Select/Choice Components

```typescript
// Ink SelectInput
import SelectInput from 'ink-select-input';

// Web equivalent
const SelectMenu = ({ items, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        setSelectedIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowDown') {
        setSelectedIndex(prev => Math.min(items.length - 1, prev + 1));
      } else if (e.key === 'Enter') {
        onSelect(items[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, items, onSelect]);

  return (
    <div className="space-y-1">
      {items.map((item, index) => (
        <div
          key={item.value}
          className={`px-3 py-1 rounded cursor-pointer ${
            index === selectedIndex ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
          }`}
          onClick={() => onSelect(item)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};
```

### 6. File & Code Display

#### Diff Renderer

```typescript
// Adapting DiffRenderer for web
const DiffViewer = ({ diffContent, filename }) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 font-mono text-sm">
        {filename}
      </div>
      <div className="p-4 bg-gray-50 font-mono text-sm overflow-x-auto">
        {diffContent.split('\n').map((line, i) => {
          let className = '';
          if (line.startsWith('+')) className = 'text-green-600 bg-green-50';
          else if (line.startsWith('-')) className = 'text-red-600 bg-red-50';
          else if (line.startsWith('@')) className = 'text-blue-600 bg-blue-50';
          
          return (
            <div key={i} className={className}>
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
};
```

#### Code Block with Syntax Highlighting

```typescript
// Using react-syntax-highlighter instead of terminal colors
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ code, language = 'javascript' }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        margin: 0,
        borderRadius: '0.5rem',
        fontSize: '0.875rem'
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};
```

## Hook Adaptations

### useInput → Event Handlers

```typescript
// Ink useInput
useInput((input, key) => {
  if (key.ctrl && input === 'c') {
    // Handle Ctrl+C
  }
});

// Web equivalent
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      // Handle Ctrl+C
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### Terminal Size → Viewport Size

```typescript
// Ink useTerminalSize
const { columns, rows } = useTerminalSize();

// Web equivalent
const useViewportSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};
```

## Animation Patterns

### Terminal Animations → CSS Animations

```typescript
// Pulsing cursor effect
.cursor-blink {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

// Typing effect
.typing-effect {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 2s steps(40, end);
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

// Loading dots
.loading-dots::after {
  content: '';
  animation: dots 1.5s infinite;
}

@keyframes dots {
  0% { content: ''; }
  25% { content: '.'; }
  50% { content: '..'; }
  75% { content: '...'; }
}
```

## Responsive Design Considerations

### Terminal Fixed Width → Responsive Web

```typescript
// Adaptive layout component
const ChatContainer = ({ children }) => {
  const { width } = useViewportSize();
  const isMobile = width < 640;
  
  return (
    <div className={`
      ${isMobile ? 'px-2' : 'px-4'}
      ${isMobile ? 'text-sm' : 'text-base'}
      max-w-4xl mx-auto
    `}>
      {children}
    </div>
  );
};
```

## Accessibility Enhancements

### Web-Specific Improvements

```typescript
// Add ARIA labels and keyboard navigation
const AccessibleToolStatus = ({ status, name }) => {
  const statusText = {
    pending: 'Pending',
    executing: 'Executing',
    success: 'Completed successfully',
    error: 'Failed with error'
  };

  return (
    <div 
      role="status" 
      aria-label={`Tool ${name} is ${statusText[status]}`}
      className="flex items-center gap-2"
    >
      <ToolStatusIndicator status={status} />
      <span className="sr-only">{statusText[status]}</span>
    </div>
  );
};
```

## Performance Optimizations

### Virtual Scrolling for Long Conversations

```typescript
import { VariableSizeList } from 'react-window';

const VirtualMessageList = ({ messages }) => {
  const getItemSize = (index) => {
    // Calculate height based on message content
    const message = messages[index];
    const baseHeight = 80;
    const contentLength = message.content?.length || 0;
    return baseHeight + Math.floor(contentLength / 100) * 20;
  };

  return (
    <VariableSizeList
      height={600}
      itemCount={messages.length}
      itemSize={getItemSize}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <Message {...messages[index]} />
        </div>
      )}
    </VariableSizeList>
  );
};
```

## Next Steps

1. Start with basic message components
2. Add interactive elements progressively
3. Implement keyboard shortcuts for power users
4. Add mobile-responsive designs
5. Enhance with web-specific features (drag-drop, rich editing)

For implementation details, see [Frontend Integration Guide](./frontend-nextjs.md).