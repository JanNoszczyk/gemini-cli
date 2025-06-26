// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var gemini_v1_pb = require('./gemini.v1_pb.js');
var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js');

function serialize_gemini_v1_ClientRequest(arg) {
  if (!(arg instanceof gemini_v1_pb.ClientRequest)) {
    throw new Error('Expected argument of type gemini.v1.ClientRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_v1_ClientRequest(buffer_arg) {
  return gemini_v1_pb.ClientRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gemini_v1_ServerResponse(arg) {
  if (!(arg instanceof gemini_v1_pb.ServerResponse)) {
    throw new Error('Expected argument of type gemini.v1.ServerResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gemini_v1_ServerResponse(buffer_arg) {
  return gemini_v1_pb.ServerResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// The primary service for interacting with the remote Gemini CLI.
var GeminiServiceService = exports.GeminiServiceService = {
  // Chat starts a bi-directional stream for a conversation.
chat: {
    path: '/gemini.v1.GeminiService/Chat',
    requestStream: true,
    responseStream: true,
    requestType: gemini_v1_pb.ClientRequest,
    responseType: gemini_v1_pb.ServerResponse,
    requestSerialize: serialize_gemini_v1_ClientRequest,
    requestDeserialize: deserialize_gemini_v1_ClientRequest,
    responseSerialize: serialize_gemini_v1_ServerResponse,
    responseDeserialize: deserialize_gemini_v1_ServerResponse,
  },
};

exports.GeminiServiceClient = grpc.makeGenericClientConstructor(GeminiServiceService, 'GeminiService');
