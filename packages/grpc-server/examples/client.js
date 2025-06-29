/**
 * Example client for the Gemini gRPC server
 * 
 * This demonstrates:
 * - Starting a session
 * - Sending chat messages
 * - Handling streaming responses
 * - Progress updates
 * - Tool confirmations
 */

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '../gemini.proto');

// Load the proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDefinition);
const client = new proto.gemini.GeminiService(
  'localhost:50052',
  grpc.credentials.createInsecure()
);

// Create a chat stream
const call = client.Chat();

// Track session ID
let sessionId = null;

// Handle server responses
call.on('data', (response) => {
  // Handle different response types
  if (response.session_started) {
    sessionId = response.session_started.session_id;
    console.log(`\n✅ Session started: ${sessionId}`);
    console.log(`   Model: ${response.session_started.model}`);
  }
  
  else if (response.chat_content) {
    const content = response.chat_content;
    const prefix = content.type === 0 ? '👤 User' : '🤖 Gemini';
    const streaming = content.is_streaming ? ' (streaming)' : '';
    console.log(`\n${prefix}${streaming}: ${content.content}`);
  }
  
  else if (response.thought_bubble) {
    console.log(`\n💭 ${response.thought_bubble.subject}: ${response.thought_bubble.thought}`);
  }
  
  else if (response.tool_confirmation) {
    const confirm = response.tool_confirmation;
    console.log(`\n🔧 Tool Confirmation Required:`);
    console.log(`   Tool: ${confirm.tool_name}`);
    console.log(`   Description: ${confirm.description || 'N/A'}`);
    console.log(`   Options:`);
    confirm.options.forEach(opt => {
      console.log(`     [${opt.hotkey}] ${opt.label}`);
    });
    
    // Auto-approve for demo (in real client, wait for user input)
    setTimeout(() => {
      console.log(`\n   → Auto-approving for demo...`);
      call.write({
        tool_confirmation: {
          confirmation_id: confirm.confirmation_id,
          selected_option: 0, // ALLOW_ONCE
        }
      });
    }, 1000);
  }
  
  else if (response.tool_status) {
    const status = response.tool_status;
    const statusEmoji = {
      0: '⏳', // PENDING
      1: '🔍', // VALIDATING
      2: '📅', // SCHEDULED
      3: '❓', // AWAITING_CONFIRMATION
      4: '⚡', // EXECUTING
      5: '✅', // SUCCESS
      6: '❌', // ERROR
      7: '🚫', // CANCELLED
    };
    console.log(`\n${statusEmoji[status.status] || '📌'} Tool ${status.tool_name}: ${status.description || status.status}`);
  }
  
  else if (response.tool_output) {
    const output = response.tool_output;
    const prefix = output.is_error ? '❌ Error' : '📤 Output';
    console.log(`${prefix} [${output.tool_name}]: ${output.output}`);
  }
  
  else if (response.progress_update) {
    const progress = response.progress_update;
    if (progress.progress >= 0) {
      const percentage = Math.round(progress.progress * 100);
      const bar = '█'.repeat(Math.floor(percentage / 5)) + '░'.repeat(20 - Math.floor(percentage / 5));
      console.log(`\r⏳ ${progress.operation}: [${bar}] ${percentage}% - ${progress.loading_phrase || progress.status}`);
    } else {
      console.log(`\r⏳ ${progress.operation}: ${progress.loading_phrase || progress.status}`);
    }
  }
  
  else if (response.error_message) {
    console.error(`\n❌ Error: ${response.error_message.message}`);
    if (response.error_message.details) {
      console.error(`   Details: ${response.error_message.details}`);
    }
  }
  
  else if (response.info_message) {
    console.log(`\nℹ️  ${response.info_message.message}`);
  }
  
  else if (response.warning_message) {
    console.log(`\n⚠️  ${response.warning_message.message}`);
  }
  
  else if (response.config_changed) {
    const change = response.config_changed;
    console.log(`\n⚙️  Configuration changed: ${change.field}`);
    console.log(`   ${change.old_value} → ${change.new_value}`);
  }
  
  else if (response.help_content) {
    console.log(`\n📚 Help:\n${response.help_content.content}`);
    if (response.help_content.available_commands?.length > 0) {
      console.log('\nAvailable commands:');
      response.help_content.available_commands.forEach(cmd => {
        console.log(`  ${cmd.name} - ${cmd.description}`);
      });
    }
  }
  
  else if (response.error_message) {
    console.error(`\n❌ Error: ${response.error_message.message}`);
    if (response.error_message.details) {
      console.error(`   Details: ${response.error_message.details}`);
    }
    if (response.error_message.suggestions?.length > 0) {
      console.error('\n   Suggestions:');
      response.error_message.suggestions.forEach(suggestion => {
        console.error(`   - ${suggestion}`);
      });
    }
    if (response.error_message.recoverable) {
      console.error('\n   This error is recoverable. You can try again.');
    }
  }
});

call.on('error', (err) => {
  console.error('Stream error:', err);
});

call.on('end', () => {
  console.log('\n👋 Stream ended');
  process.exit(0);
});

// Send start request
console.log('🚀 Starting Gemini gRPC client...');
call.write({
  start_request: {
    initial_prompt: 'Hello! Can you help me list files in the current directory?',
    model: 'gemini-1.5-pro-latest',
    approval_mode: 1, // DEFAULT
    core_tools: ['ls', 'read_file', 'shell'],
  }
});

// Interactive mode - send more messages
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('\n💬 Chat started! Type your messages (or "exit" to quit):\n');

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Goodbye!');
    call.end();
    rl.close();
    return;
  }
  
  // Check if it's a shell command (starts with !)
  const isShellCommand = input.startsWith('!');
  const message = isShellCommand ? input.substring(1) : input;
  
  call.write({
    chat_message: {
      content: message,
      is_shell_command: isShellCommand,
    }
  });
});