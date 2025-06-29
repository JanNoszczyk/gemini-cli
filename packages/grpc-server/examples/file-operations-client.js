/**
 * Example client demonstrating file operations with the Gemini gRPC server
 * 
 * This example shows how to:
 * - Use the FileManager for file operations
 * - Generate diffs and previews
 * - Handle file confirmations
 * - Monitor file operation progress
 */

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load the proto definition
const PROTO_PATH = path.join(__dirname, '..', 'gemini.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const geminiProto = grpc.loadPackageDefinition(packageDefinition).gemini;

// Create client
const client = new geminiProto.GeminiService('localhost:50052', grpc.credentials.createInsecure());

async function demonstrateFileOperations() {
  console.log('🚀 Starting Gemini gRPC File Operations Demo');

  // Create bidirectional stream
  const stream = client.chat();
  
  let sessionId = null;

  // Handle server responses
  stream.on('data', (response) => {
    console.log('📦 Received response type:', Object.keys(response)[0]);

    if (response.session_started) {
      sessionId = response.session_started.session_id;
      console.log('✅ Session started:', sessionId);
      
      // Demonstrate file operations
      demonstrateFileOperationsSequence(stream, sessionId);
    }
    
    if (response.file_edit_preview) {
      console.log('📝 File edit preview:');
      console.log('  File:', response.file_edit_preview.file_path);
      console.log('  Additions:', response.file_edit_preview.diff.additions);
      console.log('  Deletions:', response.file_edit_preview.diff.deletions);
      console.log('  Requires confirmation:', response.file_edit_preview.requires_confirmation);
    }
    
    if (response.file_operation_result) {
      console.log('✅ File operation result:');
      console.log('  File:', response.file_operation_result.file_path);
      console.log('  Operation:', response.file_operation_result.operation);
      console.log('  Success:', response.file_operation_result.success);
      if (response.file_operation_result.error_message) {
        console.log('  Error:', response.file_operation_result.error_message);
      }
    }

    if (response.chat_content) {
      console.log('💬 Chat:', response.chat_content.content);
    }

    if (response.error_message) {
      console.log('❌ Error:', response.error_message.message);
      if (response.error_message.details) {
        console.log('   Details:', response.error_message.details);
      }
    }

    if (response.info_message) {
      console.log('ℹ️  Info:', response.info_message.message);
    }

    if (response.tool_confirmation) {
      console.log('🤔 Tool confirmation requested:');
      console.log('  Tool:', response.tool_confirmation.tool_name);
      console.log('  Type:', response.tool_confirmation.type);
      console.log('  Description:', response.tool_confirmation.description);
      
      // Auto-approve for demo
      setTimeout(() => {
        console.log('✅ Auto-approving tool execution...');
        stream.write({
          tool_confirmation: {
            confirmation_id: response.tool_confirmation.confirmation_id,
            selected_option: 'ALLOW_ONCE'
          }
        });
      }, 1000);
    }

    if (response.progress_update) {
      const progress = response.progress_update.progress === -1 ? 
        'indeterminate' : `${Math.round(response.progress_update.progress * 100)}%`;
      console.log(`⏳ Progress [${response.progress_update.operation}]: ${progress} - ${response.progress_update.status}`);
    }

    if (response.tool_status) {
      console.log(`🔧 Tool [${response.tool_status.tool_name}]: ${response.tool_status.status}`);
    }
  });

  stream.on('end', () => {
    console.log('📡 Stream ended');
  });

  stream.on('error', (error) => {
    console.error('❌ Stream error:', error);
  });

  // Start session with file operations focus
  console.log('🎬 Starting session with file operations configuration...');
  stream.write({
    start_request: {
      session_id: 'file-ops-demo-' + Date.now(),
      initial_prompt: 'Hello! I want to demonstrate file operations.',
      model: 'gemini-1.5-pro',
      approval_mode: 'DEFAULT', // Ask for confirmations
      core_tools: ['Read', 'Edit', 'Write', 'Glob', 'Grep'],
      theme: 'dark',
      show_tool_descriptions: true,
      show_error_details: true,
    }
  });
}

async function demonstrateFileOperationsSequence(stream, sessionId) {
  console.log('\n🎯 Starting file operations demonstration...');

  // Wait a bit for session to be fully initialized
  setTimeout(() => {
    // 1. Request file reading
    console.log('\n📖 Step 1: Reading a file...');
    stream.write({
      chat_message: {
        content: 'Read the package.json file and show me its contents',
        is_shell_command: false
      }
    });
  }, 2000);

  setTimeout(() => {
    // 2. Request file editing
    console.log('\n✏️  Step 2: Editing a file...');
    stream.write({
      chat_message: {
        content: 'Create a simple README.md file with basic project information',
        is_shell_command: false
      }
    });
  }, 5000);

  setTimeout(() => {
    // 3. Request file analysis
    console.log('\n🔍 Step 3: Analyzing file changes...');
    stream.write({
      chat_message: {
        content: 'List all TypeScript files in the src directory and analyze their structure',
        is_shell_command: false
      }
    });
  }, 8000);

  setTimeout(() => {
    // 4. Request diff generation
    console.log('\n📊 Step 4: Showing file differences...');
    stream.write({
      chat_message: {
        content: 'Show me the differences between the current version and a previous version of any modified files',
        is_shell_command: false
      }
    });
  }, 11000);

  setTimeout(() => {
    // 5. Clean up and end demo
    console.log('\n🎬 Step 5: Wrapping up...');
    stream.write({
      chat_message: {
        content: 'Thank you for the file operations demonstration!',
        is_shell_command: false
      }
    });
    
    // End stream after response
    setTimeout(() => {
      console.log('\n✅ File operations demonstration complete!');
      console.log('🏁 Key features demonstrated:');
      console.log('   - File reading with caching and metadata');
      console.log('   - File writing with backup and confirmation');
      console.log('   - Diff generation using LCS algorithm');
      console.log('   - File operation tracking and monitoring');
      console.log('   - Directory listing and file management');
      console.log('   - Integration with tool confirmations');
      stream.end();
    }, 3000);
  }, 14000);
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n👋 Demo interrupted by user');
  process.exit(0);
});

// Start the demonstration
demonstrateFileOperations().catch(console.error);