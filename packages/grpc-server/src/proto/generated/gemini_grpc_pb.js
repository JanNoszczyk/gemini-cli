// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var gemini_pb = require('./gemini_pb.js');
var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js');

function serialize_gemini_ClientRequest(arg) {
  if (!(arg instanceof gemini_pb.ClientRequest)) {
    throw new Error('Expected argument of type gemini.ClientRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_ClientRequest(buffer_arg) {
  return gemini_pb.ClientRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_ConfigUpdateRequest(arg) {
  if (!(arg instanceof gemini_pb.ConfigUpdateRequest)) {
    throw new Error('Expected argument of type gemini.ConfigUpdateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_ConfigUpdateRequest(buffer_arg) {
  return gemini_pb.ConfigUpdateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_ConfigUpdateResponse(arg) {
  if (!(arg instanceof gemini_pb.ConfigUpdateResponse)) {
    throw new Error('Expected argument of type gemini.ConfigUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_ConfigUpdateResponse(buffer_arg) {
  return gemini_pb.ConfigUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_DiffGenerationRequest(arg) {
  if (!(arg instanceof gemini_pb.DiffGenerationRequest)) {
    throw new Error('Expected argument of type gemini.DiffGenerationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_DiffGenerationRequest(buffer_arg) {
  return gemini_pb.DiffGenerationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_DiffGenerationResponse(arg) {
  if (!(arg instanceof gemini_pb.DiffGenerationResponse)) {
    throw new Error('Expected argument of type gemini.DiffGenerationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_DiffGenerationResponse(buffer_arg) {
  return gemini_pb.DiffGenerationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_DirectoryListRequest(arg) {
  if (!(arg instanceof gemini_pb.DirectoryListRequest)) {
    throw new Error('Expected argument of type gemini.DirectoryListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_DirectoryListRequest(buffer_arg) {
  return gemini_pb.DirectoryListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_DirectoryListResponse(arg) {
  if (!(arg instanceof gemini_pb.DirectoryListResponse)) {
    throw new Error('Expected argument of type gemini.DirectoryListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_DirectoryListResponse(buffer_arg) {
  return gemini_pb.DirectoryListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_FileDeleteRequest(arg) {
  if (!(arg instanceof gemini_pb.FileDeleteRequest)) {
    throw new Error('Expected argument of type gemini.FileDeleteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_FileDeleteRequest(buffer_arg) {
  return gemini_pb.FileDeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_FileEditRequest(arg) {
  if (!(arg instanceof gemini_pb.FileEditRequest)) {
    throw new Error('Expected argument of type gemini.FileEditRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_FileEditRequest(buffer_arg) {
  return gemini_pb.FileEditRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_FileMoveRequest(arg) {
  if (!(arg instanceof gemini_pb.FileMoveRequest)) {
    throw new Error('Expected argument of type gemini.FileMoveRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_FileMoveRequest(buffer_arg) {
  return gemini_pb.FileMoveRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_FileOperationResponse(arg) {
  if (!(arg instanceof gemini_pb.FileOperationResponse)) {
    throw new Error('Expected argument of type gemini.FileOperationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_FileOperationResponse(buffer_arg) {
  return gemini_pb.FileOperationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_FileReadRequest(arg) {
  if (!(arg instanceof gemini_pb.FileReadRequest)) {
    throw new Error('Expected argument of type gemini.FileReadRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_FileReadRequest(buffer_arg) {
  return gemini_pb.FileReadRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_FileReadResponse(arg) {
  if (!(arg instanceof gemini_pb.FileReadResponse)) {
    throw new Error('Expected argument of type gemini.FileReadResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_FileReadResponse(buffer_arg) {
  return gemini_pb.FileReadResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_FileWriteRequest(arg) {
  if (!(arg instanceof gemini_pb.FileWriteRequest)) {
    throw new Error('Expected argument of type gemini.FileWriteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_FileWriteRequest(buffer_arg) {
  return gemini_pb.FileWriteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_GetConfigRequest(arg) {
  if (!(arg instanceof gemini_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type gemini.GetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_GetConfigRequest(buffer_arg) {
  return gemini_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_GetConfigResponse(arg) {
  if (!(arg instanceof gemini_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type gemini.GetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_GetConfigResponse(buffer_arg) {
  return gemini_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_ServerResponse(arg) {
  if (!(arg instanceof gemini_pb.ServerResponse)) {
    throw new Error('Expected argument of type gemini.ServerResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_ServerResponse(buffer_arg) {
  return gemini_pb.ServerResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_SessionInfoRequest(arg) {
  if (!(arg instanceof gemini_pb.SessionInfoRequest)) {
    throw new Error('Expected argument of type gemini.SessionInfoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_SessionInfoRequest(buffer_arg) {
  return gemini_pb.SessionInfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_SessionInfoResponse(arg) {
  if (!(arg instanceof gemini_pb.SessionInfoResponse)) {
    throw new Error('Expected argument of type gemini.SessionInfoResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_SessionInfoResponse(buffer_arg) {
  return gemini_pb.SessionInfoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_SessionStatsRequest(arg) {
  if (!(arg instanceof gemini_pb.SessionStatsRequest)) {
    throw new Error('Expected argument of type gemini.SessionStatsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_SessionStatsRequest(buffer_arg) {
  return gemini_pb.SessionStatsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_SessionStatsResponse(arg) {
  if (!(arg instanceof gemini_pb.SessionStatsResponse)) {
    throw new Error('Expected argument of type gemini.SessionStatsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_SessionStatsResponse(buffer_arg) {
  return gemini_pb.SessionStatsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Main service for interacting with Gemini CLI via gRPC
var GeminiServiceService = exports.GeminiServiceService = {
  // Main chat interface with bidirectional streaming
chat: {
    path: '/gemini.GeminiService/Chat',
    requestStream: true,
    responseStream: true,
    requestType: gemini_pb.ClientRequest,
    responseType: gemini_pb.ServerResponse,
    requestSerialize: serialize_gemini_ClientRequest,
    requestDeserialize: deserialize_gemini_ClientRequest,
    responseSerialize: serialize_gemini_ServerResponse,
    responseDeserialize: deserialize_gemini_ServerResponse,
  },
  // Session management endpoints
getSessionInfo: {
    path: '/gemini.GeminiService/GetSessionInfo',
    requestStream: false,
    responseStream: false,
    requestType: gemini_pb.SessionInfoRequest,
    responseType: gemini_pb.SessionInfoResponse,
    requestSerialize: serialize_gemini_SessionInfoRequest,
    requestDeserialize: deserialize_gemini_SessionInfoRequest,
    responseSerialize: serialize_gemini_SessionInfoResponse,
    responseDeserialize: deserialize_gemini_SessionInfoResponse,
  },
  getSessionStats: {
    path: '/gemini.GeminiService/GetSessionStats',
    requestStream: false,
    responseStream: false,
    requestType: gemini_pb.SessionStatsRequest,
    responseType: gemini_pb.SessionStatsResponse,
    requestSerialize: serialize_gemini_SessionStatsRequest,
    requestDeserialize: deserialize_gemini_SessionStatsRequest,
    responseSerialize: serialize_gemini_SessionStatsResponse,
    responseDeserialize: deserialize_gemini_SessionStatsResponse,
  },
  // Configuration management endpoints
updateConfig: {
    path: '/gemini.GeminiService/UpdateConfig',
    requestStream: false,
    responseStream: false,
    requestType: gemini_pb.ConfigUpdateRequest,
    responseType: gemini_pb.ConfigUpdateResponse,
    requestSerialize: serialize_gemini_ConfigUpdateRequest,
    requestDeserialize: deserialize_gemini_ConfigUpdateRequest,
    responseSerialize: serialize_gemini_ConfigUpdateResponse,
    responseDeserialize: deserialize_gemini_ConfigUpdateResponse,
  },
  getConfig: {
    path: '/gemini.GeminiService/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: gemini_pb.GetConfigRequest,
    responseType: gemini_pb.GetConfigResponse,
    requestSerialize: serialize_gemini_GetConfigRequest,
    requestDeserialize: deserialize_gemini_GetConfigRequest,
    responseSerialize: serialize_gemini_GetConfigResponse,
    responseDeserialize: deserialize_gemini_GetConfigResponse,
  },
  // File operation endpoints
readFile: {
    path: '/gemini.GeminiService/ReadFile',
    requestStream: false,
    responseStream: false,
    requestType: gemini_pb.FileReadRequest,
    responseType: gemini_pb.FileReadResponse,
    requestSerialize: serialize_gemini_FileReadRequest,
    requestDeserialize: deserialize_gemini_FileReadRequest,
    responseSerialize: serialize_gemini_FileReadResponse,
    responseDeserialize: deserialize_gemini_FileReadResponse,
  },
  writeFile: {
    path: '/gemini.GeminiService/WriteFile',
    requestStream: false,
    responseStream: false,
    requestType: gemini_pb.FileWriteRequest,
    responseType: gemini_pb.FileOperationResponse,
    requestSerialize: serialize_gemini_FileWriteRequest,
    requestDeserialize: deserialize_gemini_FileWriteRequest,
    responseSerialize: serialize_gemini_FileOperationResponse,
    responseDeserialize: deserialize_gemini_FileOperationResponse,
  },
  editFile: {
    path: '/gemini.GeminiService/EditFile',
    requestStream: false,
    responseStream: false,
    requestType: gemini_pb.FileEditRequest,
    responseType: gemini_pb.FileOperationResponse,
    requestSerialize: serialize_gemini_FileEditRequest,
    requestDeserialize: deserialize_gemini_FileEditRequest,
    responseSerialize: serialize_gemini_FileOperationResponse,
    responseDeserialize: deserialize_gemini_FileOperationResponse,
  },
  deleteFile: {
    path: '/gemini.GeminiService/DeleteFile',
    requestStream: false,
    responseStream: false,
    requestType: gemini_pb.FileDeleteRequest,
    responseType: gemini_pb.FileOperationResponse,
    requestSerialize: serialize_gemini_FileDeleteRequest,
    requestDeserialize: deserialize_gemini_FileDeleteRequest,
    responseSerialize: serialize_gemini_FileOperationResponse,
    responseDeserialize: deserialize_gemini_FileOperationResponse,
  },
  moveFile: {
    path: '/gemini.GeminiService/MoveFile',
    requestStream: false,
    responseStream: false,
    requestType: gemini_pb.FileMoveRequest,
    responseType: gemini_pb.FileOperationResponse,
    requestSerialize: serialize_gemini_FileMoveRequest,
    requestDeserialize: deserialize_gemini_FileMoveRequest,
    responseSerialize: serialize_gemini_FileOperationResponse,
    responseDeserialize: deserialize_gemini_FileOperationResponse,
  },
  listDirectory: {
    path: '/gemini.GeminiService/ListDirectory',
    requestStream: false,
    responseStream: false,
    requestType: gemini_pb.DirectoryListRequest,
    responseType: gemini_pb.DirectoryListResponse,
    requestSerialize: serialize_gemini_DirectoryListRequest,
    requestDeserialize: deserialize_gemini_DirectoryListRequest,
    responseSerialize: serialize_gemini_DirectoryListResponse,
    responseDeserialize: deserialize_gemini_DirectoryListResponse,
  },
  generateDiff: {
    path: '/gemini.GeminiService/GenerateDiff',
    requestStream: false,
    responseStream: false,
    requestType: gemini_pb.DiffGenerationRequest,
    responseType: gemini_pb.DiffGenerationResponse,
    requestSerialize: serialize_gemini_DiffGenerationRequest,
    requestDeserialize: deserialize_gemini_DiffGenerationRequest,
    responseSerialize: serialize_gemini_DiffGenerationResponse,
    responseDeserialize: deserialize_gemini_DiffGenerationResponse,
  },
};

exports.GeminiServiceClient = grpc.makeGenericClientConstructor(GeminiServiceService, 'GeminiService');
