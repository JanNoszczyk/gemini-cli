// source: gemini.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js');
goog.object.extend(proto, google_protobuf_struct_pb);
goog.exportSymbol('proto.gemini.ActivityEntry', null, global);
goog.exportSymbol('proto.gemini.AlertInfo', null, global);
goog.exportSymbol('proto.gemini.AnalyticsReport', null, global);
goog.exportSymbol('proto.gemini.ApprovalMode', null, global);
goog.exportSymbol('proto.gemini.AuthConfig', null, global);
goog.exportSymbol('proto.gemini.AuthConfig.AuthType', null, global);
goog.exportSymbol('proto.gemini.AutoCompleteContext', null, global);
goog.exportSymbol('proto.gemini.AutoCompleteRequest', null, global);
goog.exportSymbol('proto.gemini.AutoCompleteResult', null, global);
goog.exportSymbol('proto.gemini.CancelOperationRequest', null, global);
goog.exportSymbol('proto.gemini.ChatContent', null, global);
goog.exportSymbol('proto.gemini.ChatContent.ContentType', null, global);
goog.exportSymbol('proto.gemini.ChatMessage', null, global);
goog.exportSymbol('proto.gemini.ClientRequest', null, global);
goog.exportSymbol('proto.gemini.ClientRequest.RequestCase', null, global);
goog.exportSymbol('proto.gemini.CodeBlock', null, global);
goog.exportSymbol('proto.gemini.Command', null, global);
goog.exportSymbol('proto.gemini.Completion', null, global);
goog.exportSymbol('proto.gemini.CompletionType', null, global);
goog.exportSymbol('proto.gemini.ConfigChanged', null, global);
goog.exportSymbol('proto.gemini.ConfigUpdateRequest', null, global);
goog.exportSymbol('proto.gemini.ConfigUpdateRequest.UpdateCase', null, global);
goog.exportSymbol('proto.gemini.ConfigUpdateResponse', null, global);
goog.exportSymbol('proto.gemini.ConfirmationOption', null, global);
goog.exportSymbol('proto.gemini.ConfirmationOption.OptionType', null, global);
goog.exportSymbol('proto.gemini.ContextSummary', null, global);
goog.exportSymbol('proto.gemini.CurrentConfig', null, global);
goog.exportSymbol('proto.gemini.DiffGenerationRequest', null, global);
goog.exportSymbol('proto.gemini.DiffGenerationResponse', null, global);
goog.exportSymbol('proto.gemini.DiffHunk', null, global);
goog.exportSymbol('proto.gemini.DiffLine', null, global);
goog.exportSymbol('proto.gemini.DiffLine.LineType', null, global);
goog.exportSymbol('proto.gemini.DiffPreview', null, global);
goog.exportSymbol('proto.gemini.DirectoryListRequest', null, global);
goog.exportSymbol('proto.gemini.DirectoryListResponse', null, global);
goog.exportSymbol('proto.gemini.ErrorMessage', null, global);
goog.exportSymbol('proto.gemini.FileDeleteRequest', null, global);
goog.exportSymbol('proto.gemini.FileEditPreview', null, global);
goog.exportSymbol('proto.gemini.FileEditRequest', null, global);
goog.exportSymbol('proto.gemini.FileMetadata', null, global);
goog.exportSymbol('proto.gemini.FileMoveRequest', null, global);
goog.exportSymbol('proto.gemini.FileOperation', null, global);
goog.exportSymbol('proto.gemini.FileOperationResponse', null, global);
goog.exportSymbol('proto.gemini.FileOperationResult', null, global);
goog.exportSymbol('proto.gemini.FilePatch', null, global);
goog.exportSymbol('proto.gemini.FileReadRequest', null, global);
goog.exportSymbol('proto.gemini.FileReadResponse', null, global);
goog.exportSymbol('proto.gemini.FileWriteRequest', null, global);
goog.exportSymbol('proto.gemini.GetConfigRequest', null, global);
goog.exportSymbol('proto.gemini.GetConfigResponse', null, global);
goog.exportSymbol('proto.gemini.GetHelpRequest', null, global);
goog.exportSymbol('proto.gemini.HelpContent', null, global);
goog.exportSymbol('proto.gemini.InfoMessage', null, global);
goog.exportSymbol('proto.gemini.LoadedFile', null, global);
goog.exportSymbol('proto.gemini.McpServerConfig', null, global);
goog.exportSymbol('proto.gemini.McpServerInfo', null, global);
goog.exportSymbol('proto.gemini.MemoryInfo', null, global);
goog.exportSymbol('proto.gemini.MetricSummary', null, global);
goog.exportSymbol('proto.gemini.MetricsSummary', null, global);
goog.exportSymbol('proto.gemini.ModelUsageStats', null, global);
goog.exportSymbol('proto.gemini.PerformanceMetrics', null, global);
goog.exportSymbol('proto.gemini.ProgressUpdate', null, global);
goog.exportSymbol('proto.gemini.RefreshContextRequest', null, global);
goog.exportSymbol('proto.gemini.ServerResponse', null, global);
goog.exportSymbol('proto.gemini.ServerResponse.ResponseCase', null, global);
goog.exportSymbol('proto.gemini.SessionInfoRequest', null, global);
goog.exportSymbol('proto.gemini.SessionInfoResponse', null, global);
goog.exportSymbol('proto.gemini.SessionStarted', null, global);
goog.exportSymbol('proto.gemini.SessionStats', null, global);
goog.exportSymbol('proto.gemini.SessionStatsRequest', null, global);
goog.exportSymbol('proto.gemini.SessionStatsResponse', null, global);
goog.exportSymbol('proto.gemini.SessionSummary', null, global);
goog.exportSymbol('proto.gemini.StartRequest', null, global);
goog.exportSymbol('proto.gemini.ThoughtBubble', null, global);
goog.exportSymbol('proto.gemini.TokenUsage', null, global);
goog.exportSymbol('proto.gemini.ToolConfirmationRequest', null, global);
goog.exportSymbol('proto.gemini.ToolConfirmationRequest.ConfirmationType', null, global);
goog.exportSymbol('proto.gemini.ToolConfirmationResponse', null, global);
goog.exportSymbol('proto.gemini.ToolOutputStream', null, global);
goog.exportSymbol('proto.gemini.ToolStatusUpdate', null, global);
goog.exportSymbol('proto.gemini.ToolStatusUpdate.Status', null, global);
goog.exportSymbol('proto.gemini.ToolUsageStats', null, global);
goog.exportSymbol('proto.gemini.UsageMetadata', null, global);
goog.exportSymbol('proto.gemini.WarningMessage', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.ClientRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.gemini.ClientRequest.oneofGroups_);
};
goog.inherits(proto.gemini.ClientRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.ClientRequest.displayName = 'proto.gemini.ClientRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.StartRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gemini.StartRequest.repeatedFields_, null);
};
goog.inherits(proto.gemini.StartRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.StartRequest.displayName = 'proto.gemini.StartRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.ChatMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.ChatMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.ChatMessage.displayName = 'proto.gemini.ChatMessage';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.ToolConfirmationResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.ToolConfirmationResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.ToolConfirmationResponse.displayName = 'proto.gemini.ToolConfirmationResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.RefreshContextRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.RefreshContextRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.RefreshContextRequest.displayName = 'proto.gemini.RefreshContextRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.CancelOperationRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.CancelOperationRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.CancelOperationRequest.displayName = 'proto.gemini.CancelOperationRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.GetHelpRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.GetHelpRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.GetHelpRequest.displayName = 'proto.gemini.GetHelpRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.AutoCompleteRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.AutoCompleteRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.AutoCompleteRequest.displayName = 'proto.gemini.AutoCompleteRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.ServerResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.gemini.ServerResponse.oneofGroups_);
};
goog.inherits(proto.gemini.ServerResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.ServerResponse.displayName = 'proto.gemini.ServerResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.McpServerConfig = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gemini.McpServerConfig.repeatedFields_, null);
};
goog.inherits(proto.gemini.McpServerConfig, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.McpServerConfig.displayName = 'proto.gemini.McpServerConfig';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.SessionStarted = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.SessionStarted, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.SessionStarted.displayName = 'proto.gemini.SessionStarted';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.SessionInfoRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.SessionInfoRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.SessionInfoRequest.displayName = 'proto.gemini.SessionInfoRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.SessionInfoResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.SessionInfoResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.SessionInfoResponse.displayName = 'proto.gemini.SessionInfoResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.SessionStatsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.SessionStatsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.SessionStatsRequest.displayName = 'proto.gemini.SessionStatsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.SessionStatsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.SessionStatsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.SessionStatsResponse.displayName = 'proto.gemini.SessionStatsResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.SessionStats = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.SessionStats, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.SessionStats.displayName = 'proto.gemini.SessionStats';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.TokenUsage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.TokenUsage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.TokenUsage.displayName = 'proto.gemini.TokenUsage';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.ChatContent = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.ChatContent, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.ChatContent.displayName = 'proto.gemini.ChatContent';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.CodeBlock = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.CodeBlock, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.CodeBlock.displayName = 'proto.gemini.CodeBlock';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.ThoughtBubble = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.ThoughtBubble, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.ThoughtBubble.displayName = 'proto.gemini.ThoughtBubble';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.ToolConfirmationRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gemini.ToolConfirmationRequest.repeatedFields_, null);
};
goog.inherits(proto.gemini.ToolConfirmationRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.ToolConfirmationRequest.displayName = 'proto.gemini.ToolConfirmationRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.ConfirmationOption = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.ConfirmationOption, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.ConfirmationOption.displayName = 'proto.gemini.ConfirmationOption';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.DiffPreview = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gemini.DiffPreview.repeatedFields_, null);
};
goog.inherits(proto.gemini.DiffPreview, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.DiffPreview.displayName = 'proto.gemini.DiffPreview';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.DiffHunk = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gemini.DiffHunk.repeatedFields_, null);
};
goog.inherits(proto.gemini.DiffHunk, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.DiffHunk.displayName = 'proto.gemini.DiffHunk';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.DiffLine = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.DiffLine, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.DiffLine.displayName = 'proto.gemini.DiffLine';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.ToolStatusUpdate = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.ToolStatusUpdate, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.ToolStatusUpdate.displayName = 'proto.gemini.ToolStatusUpdate';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.ToolOutputStream = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.ToolOutputStream, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.ToolOutputStream.displayName = 'proto.gemini.ToolOutputStream';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.ErrorMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gemini.ErrorMessage.repeatedFields_, null);
};
goog.inherits(proto.gemini.ErrorMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.ErrorMessage.displayName = 'proto.gemini.ErrorMessage';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.InfoMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.InfoMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.InfoMessage.displayName = 'proto.gemini.InfoMessage';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.WarningMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.WarningMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.WarningMessage.displayName = 'proto.gemini.WarningMessage';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.ProgressUpdate = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.ProgressUpdate, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.ProgressUpdate.displayName = 'proto.gemini.ProgressUpdate';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.HelpContent = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gemini.HelpContent.repeatedFields_, null);
};
goog.inherits(proto.gemini.HelpContent, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.HelpContent.displayName = 'proto.gemini.HelpContent';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.Command = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gemini.Command.repeatedFields_, null);
};
goog.inherits(proto.gemini.Command, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.Command.displayName = 'proto.gemini.Command';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.AutoCompleteResult = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gemini.AutoCompleteResult.repeatedFields_, null);
};
goog.inherits(proto.gemini.AutoCompleteResult, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.AutoCompleteResult.displayName = 'proto.gemini.AutoCompleteResult';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.Completion = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.Completion, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.Completion.displayName = 'proto.gemini.Completion';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.FileEditPreview = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.FileEditPreview, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.FileEditPreview.displayName = 'proto.gemini.FileEditPreview';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.FileOperationResult = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.FileOperationResult, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.FileOperationResult.displayName = 'proto.gemini.FileOperationResult';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.ConfigUpdateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.gemini.ConfigUpdateRequest.oneofGroups_);
};
goog.inherits(proto.gemini.ConfigUpdateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.ConfigUpdateRequest.displayName = 'proto.gemini.ConfigUpdateRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.AuthConfig = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.AuthConfig, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.AuthConfig.displayName = 'proto.gemini.AuthConfig';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.GetConfigRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.GetConfigRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.GetConfigRequest.displayName = 'proto.gemini.GetConfigRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.GetConfigResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.GetConfigResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.GetConfigResponse.displayName = 'proto.gemini.GetConfigResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.CurrentConfig = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gemini.CurrentConfig.repeatedFields_, null);
};
goog.inherits(proto.gemini.CurrentConfig, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.CurrentConfig.displayName = 'proto.gemini.CurrentConfig';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.ConfigUpdateResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.ConfigUpdateResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.ConfigUpdateResponse.displayName = 'proto.gemini.ConfigUpdateResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.ConfigChanged = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.ConfigChanged, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.ConfigChanged.displayName = 'proto.gemini.ConfigChanged';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.ContextSummary = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gemini.ContextSummary.repeatedFields_, null);
};
goog.inherits(proto.gemini.ContextSummary, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.ContextSummary.displayName = 'proto.gemini.ContextSummary';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.LoadedFile = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.LoadedFile, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.LoadedFile.displayName = 'proto.gemini.LoadedFile';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.McpServerInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gemini.McpServerInfo.repeatedFields_, null);
};
goog.inherits(proto.gemini.McpServerInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.McpServerInfo.displayName = 'proto.gemini.McpServerInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.MemoryInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.MemoryInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.MemoryInfo.displayName = 'proto.gemini.MemoryInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.UsageMetadata = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.UsageMetadata, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.UsageMetadata.displayName = 'proto.gemini.UsageMetadata';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.AnalyticsReport = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gemini.AnalyticsReport.repeatedFields_, null);
};
goog.inherits(proto.gemini.AnalyticsReport, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.AnalyticsReport.displayName = 'proto.gemini.AnalyticsReport';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.PerformanceMetrics = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.PerformanceMetrics, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.PerformanceMetrics.displayName = 'proto.gemini.PerformanceMetrics';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.ToolUsageStats = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.ToolUsageStats, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.ToolUsageStats.displayName = 'proto.gemini.ToolUsageStats';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.ModelUsageStats = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.ModelUsageStats, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.ModelUsageStats.displayName = 'proto.gemini.ModelUsageStats';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.SessionSummary = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.SessionSummary, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.SessionSummary.displayName = 'proto.gemini.SessionSummary';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.ActivityEntry = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.ActivityEntry, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.ActivityEntry.displayName = 'proto.gemini.ActivityEntry';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.MetricsSummary = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gemini.MetricsSummary.repeatedFields_, null);
};
goog.inherits(proto.gemini.MetricsSummary, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.MetricsSummary.displayName = 'proto.gemini.MetricsSummary';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.MetricSummary = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.MetricSummary, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.MetricSummary.displayName = 'proto.gemini.MetricSummary';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.AlertInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.AlertInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.AlertInfo.displayName = 'proto.gemini.AlertInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.FileReadRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.FileReadRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.FileReadRequest.displayName = 'proto.gemini.FileReadRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.FileReadResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.FileReadResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.FileReadResponse.displayName = 'proto.gemini.FileReadResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.FileWriteRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.FileWriteRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.FileWriteRequest.displayName = 'proto.gemini.FileWriteRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.FileEditRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gemini.FileEditRequest.repeatedFields_, null);
};
goog.inherits(proto.gemini.FileEditRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.FileEditRequest.displayName = 'proto.gemini.FileEditRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.FilePatch = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.FilePatch, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.FilePatch.displayName = 'proto.gemini.FilePatch';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.FileDeleteRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.FileDeleteRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.FileDeleteRequest.displayName = 'proto.gemini.FileDeleteRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.FileMoveRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.FileMoveRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.FileMoveRequest.displayName = 'proto.gemini.FileMoveRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.DirectoryListRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.DirectoryListRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.DirectoryListRequest.displayName = 'proto.gemini.DirectoryListRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.DirectoryListResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gemini.DirectoryListResponse.repeatedFields_, null);
};
goog.inherits(proto.gemini.DirectoryListResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.DirectoryListResponse.displayName = 'proto.gemini.DirectoryListResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.DiffGenerationRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.DiffGenerationRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.DiffGenerationRequest.displayName = 'proto.gemini.DiffGenerationRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.DiffGenerationResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.DiffGenerationResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.DiffGenerationResponse.displayName = 'proto.gemini.DiffGenerationResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.FileOperationResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.FileOperationResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.FileOperationResponse.displayName = 'proto.gemini.FileOperationResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gemini.FileMetadata = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gemini.FileMetadata, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gemini.FileMetadata.displayName = 'proto.gemini.FileMetadata';
}

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.gemini.ClientRequest.oneofGroups_ = [[1,2,3,4,5,6,7,8]];

/**
 * @enum {number}
 */
proto.gemini.ClientRequest.RequestCase = {
  REQUEST_NOT_SET: 0,
  START_REQUEST: 1,
  CHAT_MESSAGE: 2,
  TOOL_CONFIRMATION: 3,
  CONFIG_UPDATE: 4,
  REFRESH_CONTEXT: 5,
  CANCEL_OPERATION: 6,
  GET_HELP: 7,
  AUTO_COMPLETE: 8
};

/**
 * @return {proto.gemini.ClientRequest.RequestCase}
 */
proto.gemini.ClientRequest.prototype.getRequestCase = function() {
  return /** @type {proto.gemini.ClientRequest.RequestCase} */(jspb.Message.computeOneofCase(this, proto.gemini.ClientRequest.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.ClientRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.ClientRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.ClientRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ClientRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    startRequest: (f = msg.getStartRequest()) && proto.gemini.StartRequest.toObject(includeInstance, f),
    chatMessage: (f = msg.getChatMessage()) && proto.gemini.ChatMessage.toObject(includeInstance, f),
    toolConfirmation: (f = msg.getToolConfirmation()) && proto.gemini.ToolConfirmationResponse.toObject(includeInstance, f),
    configUpdate: (f = msg.getConfigUpdate()) && proto.gemini.ConfigUpdateRequest.toObject(includeInstance, f),
    refreshContext: (f = msg.getRefreshContext()) && proto.gemini.RefreshContextRequest.toObject(includeInstance, f),
    cancelOperation: (f = msg.getCancelOperation()) && proto.gemini.CancelOperationRequest.toObject(includeInstance, f),
    getHelp: (f = msg.getGetHelp()) && proto.gemini.GetHelpRequest.toObject(includeInstance, f),
    autoComplete: (f = msg.getAutoComplete()) && proto.gemini.AutoCompleteRequest.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.ClientRequest}
 */
proto.gemini.ClientRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.ClientRequest;
  return proto.gemini.ClientRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.ClientRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.ClientRequest}
 */
proto.gemini.ClientRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gemini.StartRequest;
      reader.readMessage(value,proto.gemini.StartRequest.deserializeBinaryFromReader);
      msg.setStartRequest(value);
      break;
    case 2:
      var value = new proto.gemini.ChatMessage;
      reader.readMessage(value,proto.gemini.ChatMessage.deserializeBinaryFromReader);
      msg.setChatMessage(value);
      break;
    case 3:
      var value = new proto.gemini.ToolConfirmationResponse;
      reader.readMessage(value,proto.gemini.ToolConfirmationResponse.deserializeBinaryFromReader);
      msg.setToolConfirmation(value);
      break;
    case 4:
      var value = new proto.gemini.ConfigUpdateRequest;
      reader.readMessage(value,proto.gemini.ConfigUpdateRequest.deserializeBinaryFromReader);
      msg.setConfigUpdate(value);
      break;
    case 5:
      var value = new proto.gemini.RefreshContextRequest;
      reader.readMessage(value,proto.gemini.RefreshContextRequest.deserializeBinaryFromReader);
      msg.setRefreshContext(value);
      break;
    case 6:
      var value = new proto.gemini.CancelOperationRequest;
      reader.readMessage(value,proto.gemini.CancelOperationRequest.deserializeBinaryFromReader);
      msg.setCancelOperation(value);
      break;
    case 7:
      var value = new proto.gemini.GetHelpRequest;
      reader.readMessage(value,proto.gemini.GetHelpRequest.deserializeBinaryFromReader);
      msg.setGetHelp(value);
      break;
    case 8:
      var value = new proto.gemini.AutoCompleteRequest;
      reader.readMessage(value,proto.gemini.AutoCompleteRequest.deserializeBinaryFromReader);
      msg.setAutoComplete(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.ClientRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.ClientRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.ClientRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ClientRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStartRequest();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.gemini.StartRequest.serializeBinaryToWriter
    );
  }
  f = message.getChatMessage();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gemini.ChatMessage.serializeBinaryToWriter
    );
  }
  f = message.getToolConfirmation();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.gemini.ToolConfirmationResponse.serializeBinaryToWriter
    );
  }
  f = message.getConfigUpdate();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.gemini.ConfigUpdateRequest.serializeBinaryToWriter
    );
  }
  f = message.getRefreshContext();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.gemini.RefreshContextRequest.serializeBinaryToWriter
    );
  }
  f = message.getCancelOperation();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.gemini.CancelOperationRequest.serializeBinaryToWriter
    );
  }
  f = message.getGetHelp();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.gemini.GetHelpRequest.serializeBinaryToWriter
    );
  }
  f = message.getAutoComplete();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.gemini.AutoCompleteRequest.serializeBinaryToWriter
    );
  }
};


/**
 * optional StartRequest start_request = 1;
 * @return {?proto.gemini.StartRequest}
 */
proto.gemini.ClientRequest.prototype.getStartRequest = function() {
  return /** @type{?proto.gemini.StartRequest} */ (
    jspb.Message.getWrapperField(this, proto.gemini.StartRequest, 1));
};


/**
 * @param {?proto.gemini.StartRequest|undefined} value
 * @return {!proto.gemini.ClientRequest} returns this
*/
proto.gemini.ClientRequest.prototype.setStartRequest = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.gemini.ClientRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ClientRequest} returns this
 */
proto.gemini.ClientRequest.prototype.clearStartRequest = function() {
  return this.setStartRequest(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ClientRequest.prototype.hasStartRequest = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional ChatMessage chat_message = 2;
 * @return {?proto.gemini.ChatMessage}
 */
proto.gemini.ClientRequest.prototype.getChatMessage = function() {
  return /** @type{?proto.gemini.ChatMessage} */ (
    jspb.Message.getWrapperField(this, proto.gemini.ChatMessage, 2));
};


/**
 * @param {?proto.gemini.ChatMessage|undefined} value
 * @return {!proto.gemini.ClientRequest} returns this
*/
proto.gemini.ClientRequest.prototype.setChatMessage = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.gemini.ClientRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ClientRequest} returns this
 */
proto.gemini.ClientRequest.prototype.clearChatMessage = function() {
  return this.setChatMessage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ClientRequest.prototype.hasChatMessage = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional ToolConfirmationResponse tool_confirmation = 3;
 * @return {?proto.gemini.ToolConfirmationResponse}
 */
proto.gemini.ClientRequest.prototype.getToolConfirmation = function() {
  return /** @type{?proto.gemini.ToolConfirmationResponse} */ (
    jspb.Message.getWrapperField(this, proto.gemini.ToolConfirmationResponse, 3));
};


/**
 * @param {?proto.gemini.ToolConfirmationResponse|undefined} value
 * @return {!proto.gemini.ClientRequest} returns this
*/
proto.gemini.ClientRequest.prototype.setToolConfirmation = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.gemini.ClientRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ClientRequest} returns this
 */
proto.gemini.ClientRequest.prototype.clearToolConfirmation = function() {
  return this.setToolConfirmation(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ClientRequest.prototype.hasToolConfirmation = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional ConfigUpdateRequest config_update = 4;
 * @return {?proto.gemini.ConfigUpdateRequest}
 */
proto.gemini.ClientRequest.prototype.getConfigUpdate = function() {
  return /** @type{?proto.gemini.ConfigUpdateRequest} */ (
    jspb.Message.getWrapperField(this, proto.gemini.ConfigUpdateRequest, 4));
};


/**
 * @param {?proto.gemini.ConfigUpdateRequest|undefined} value
 * @return {!proto.gemini.ClientRequest} returns this
*/
proto.gemini.ClientRequest.prototype.setConfigUpdate = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.gemini.ClientRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ClientRequest} returns this
 */
proto.gemini.ClientRequest.prototype.clearConfigUpdate = function() {
  return this.setConfigUpdate(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ClientRequest.prototype.hasConfigUpdate = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional RefreshContextRequest refresh_context = 5;
 * @return {?proto.gemini.RefreshContextRequest}
 */
proto.gemini.ClientRequest.prototype.getRefreshContext = function() {
  return /** @type{?proto.gemini.RefreshContextRequest} */ (
    jspb.Message.getWrapperField(this, proto.gemini.RefreshContextRequest, 5));
};


/**
 * @param {?proto.gemini.RefreshContextRequest|undefined} value
 * @return {!proto.gemini.ClientRequest} returns this
*/
proto.gemini.ClientRequest.prototype.setRefreshContext = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.gemini.ClientRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ClientRequest} returns this
 */
proto.gemini.ClientRequest.prototype.clearRefreshContext = function() {
  return this.setRefreshContext(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ClientRequest.prototype.hasRefreshContext = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional CancelOperationRequest cancel_operation = 6;
 * @return {?proto.gemini.CancelOperationRequest}
 */
proto.gemini.ClientRequest.prototype.getCancelOperation = function() {
  return /** @type{?proto.gemini.CancelOperationRequest} */ (
    jspb.Message.getWrapperField(this, proto.gemini.CancelOperationRequest, 6));
};


/**
 * @param {?proto.gemini.CancelOperationRequest|undefined} value
 * @return {!proto.gemini.ClientRequest} returns this
*/
proto.gemini.ClientRequest.prototype.setCancelOperation = function(value) {
  return jspb.Message.setOneofWrapperField(this, 6, proto.gemini.ClientRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ClientRequest} returns this
 */
proto.gemini.ClientRequest.prototype.clearCancelOperation = function() {
  return this.setCancelOperation(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ClientRequest.prototype.hasCancelOperation = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional GetHelpRequest get_help = 7;
 * @return {?proto.gemini.GetHelpRequest}
 */
proto.gemini.ClientRequest.prototype.getGetHelp = function() {
  return /** @type{?proto.gemini.GetHelpRequest} */ (
    jspb.Message.getWrapperField(this, proto.gemini.GetHelpRequest, 7));
};


/**
 * @param {?proto.gemini.GetHelpRequest|undefined} value
 * @return {!proto.gemini.ClientRequest} returns this
*/
proto.gemini.ClientRequest.prototype.setGetHelp = function(value) {
  return jspb.Message.setOneofWrapperField(this, 7, proto.gemini.ClientRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ClientRequest} returns this
 */
proto.gemini.ClientRequest.prototype.clearGetHelp = function() {
  return this.setGetHelp(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ClientRequest.prototype.hasGetHelp = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional AutoCompleteRequest auto_complete = 8;
 * @return {?proto.gemini.AutoCompleteRequest}
 */
proto.gemini.ClientRequest.prototype.getAutoComplete = function() {
  return /** @type{?proto.gemini.AutoCompleteRequest} */ (
    jspb.Message.getWrapperField(this, proto.gemini.AutoCompleteRequest, 8));
};


/**
 * @param {?proto.gemini.AutoCompleteRequest|undefined} value
 * @return {!proto.gemini.ClientRequest} returns this
*/
proto.gemini.ClientRequest.prototype.setAutoComplete = function(value) {
  return jspb.Message.setOneofWrapperField(this, 8, proto.gemini.ClientRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ClientRequest} returns this
 */
proto.gemini.ClientRequest.prototype.clearAutoComplete = function() {
  return this.setAutoComplete(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ClientRequest.prototype.hasAutoComplete = function() {
  return jspb.Message.getField(this, 8) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gemini.StartRequest.repeatedFields_ = [6,7,8];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.StartRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.StartRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.StartRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.StartRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    initialPrompt: jspb.Message.getFieldWithDefault(msg, 2, ""),
    model: jspb.Message.getFieldWithDefault(msg, 3, ""),
    embeddingModel: jspb.Message.getFieldWithDefault(msg, 4, ""),
    approvalMode: jspb.Message.getFieldWithDefault(msg, 5, 0),
    coreToolsList: (f = jspb.Message.getRepeatedField(msg, 6)) == null ? undefined : f,
    excludeToolsList: (f = jspb.Message.getRepeatedField(msg, 7)) == null ? undefined : f,
    mcpServersList: jspb.Message.toObjectList(msg.getMcpServersList(),
    proto.gemini.McpServerConfig.toObject, includeInstance),
    theme: jspb.Message.getFieldWithDefault(msg, 9, ""),
    editorType: jspb.Message.getFieldWithDefault(msg, 10, ""),
    showToolDescriptions: jspb.Message.getBooleanFieldWithDefault(msg, 11, false),
    showErrorDetails: jspb.Message.getBooleanFieldWithDefault(msg, 12, false),
    resumeFromCheckpoint: jspb.Message.getBooleanFieldWithDefault(msg, 13, false),
    checkpointTag: jspb.Message.getFieldWithDefault(msg, 14, ""),
    advancedConfig: (f = msg.getAdvancedConfig()) && google_protobuf_struct_pb.Struct.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.StartRequest}
 */
proto.gemini.StartRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.StartRequest;
  return proto.gemini.StartRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.StartRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.StartRequest}
 */
proto.gemini.StartRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setInitialPrompt(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setModel(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setEmbeddingModel(value);
      break;
    case 5:
      var value = /** @type {!proto.gemini.ApprovalMode} */ (reader.readEnum());
      msg.setApprovalMode(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.addCoreTools(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.addExcludeTools(value);
      break;
    case 8:
      var value = new proto.gemini.McpServerConfig;
      reader.readMessage(value,proto.gemini.McpServerConfig.deserializeBinaryFromReader);
      msg.addMcpServers(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setTheme(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setEditorType(value);
      break;
    case 11:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setShowToolDescriptions(value);
      break;
    case 12:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setShowErrorDetails(value);
      break;
    case 13:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setResumeFromCheckpoint(value);
      break;
    case 14:
      var value = /** @type {string} */ (reader.readString());
      msg.setCheckpointTag(value);
      break;
    case 15:
      var value = new google_protobuf_struct_pb.Struct;
      reader.readMessage(value,google_protobuf_struct_pb.Struct.deserializeBinaryFromReader);
      msg.setAdvancedConfig(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.StartRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.StartRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.StartRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.StartRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getInitialPrompt();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getModel();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getEmbeddingModel();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getApprovalMode();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
  f = message.getCoreToolsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      6,
      f
    );
  }
  f = message.getExcludeToolsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      7,
      f
    );
  }
  f = message.getMcpServersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.gemini.McpServerConfig.serializeBinaryToWriter
    );
  }
  f = message.getTheme();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getEditorType();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
  f = message.getShowToolDescriptions();
  if (f) {
    writer.writeBool(
      11,
      f
    );
  }
  f = message.getShowErrorDetails();
  if (f) {
    writer.writeBool(
      12,
      f
    );
  }
  f = message.getResumeFromCheckpoint();
  if (f) {
    writer.writeBool(
      13,
      f
    );
  }
  f = message.getCheckpointTag();
  if (f.length > 0) {
    writer.writeString(
      14,
      f
    );
  }
  f = message.getAdvancedConfig();
  if (f != null) {
    writer.writeMessage(
      15,
      f,
      google_protobuf_struct_pb.Struct.serializeBinaryToWriter
    );
  }
};


/**
 * optional string session_id = 1;
 * @return {string}
 */
proto.gemini.StartRequest.prototype.getSessionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.StartRequest} returns this
 */
proto.gemini.StartRequest.prototype.setSessionId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string initial_prompt = 2;
 * @return {string}
 */
proto.gemini.StartRequest.prototype.getInitialPrompt = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.StartRequest} returns this
 */
proto.gemini.StartRequest.prototype.setInitialPrompt = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string model = 3;
 * @return {string}
 */
proto.gemini.StartRequest.prototype.getModel = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.StartRequest} returns this
 */
proto.gemini.StartRequest.prototype.setModel = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string embedding_model = 4;
 * @return {string}
 */
proto.gemini.StartRequest.prototype.getEmbeddingModel = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.StartRequest} returns this
 */
proto.gemini.StartRequest.prototype.setEmbeddingModel = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional ApprovalMode approval_mode = 5;
 * @return {!proto.gemini.ApprovalMode}
 */
proto.gemini.StartRequest.prototype.getApprovalMode = function() {
  return /** @type {!proto.gemini.ApprovalMode} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {!proto.gemini.ApprovalMode} value
 * @return {!proto.gemini.StartRequest} returns this
 */
proto.gemini.StartRequest.prototype.setApprovalMode = function(value) {
  return jspb.Message.setProto3EnumField(this, 5, value);
};


/**
 * repeated string core_tools = 6;
 * @return {!Array<string>}
 */
proto.gemini.StartRequest.prototype.getCoreToolsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 6));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.gemini.StartRequest} returns this
 */
proto.gemini.StartRequest.prototype.setCoreToolsList = function(value) {
  return jspb.Message.setField(this, 6, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.gemini.StartRequest} returns this
 */
proto.gemini.StartRequest.prototype.addCoreTools = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 6, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.StartRequest} returns this
 */
proto.gemini.StartRequest.prototype.clearCoreToolsList = function() {
  return this.setCoreToolsList([]);
};


/**
 * repeated string exclude_tools = 7;
 * @return {!Array<string>}
 */
proto.gemini.StartRequest.prototype.getExcludeToolsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 7));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.gemini.StartRequest} returns this
 */
proto.gemini.StartRequest.prototype.setExcludeToolsList = function(value) {
  return jspb.Message.setField(this, 7, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.gemini.StartRequest} returns this
 */
proto.gemini.StartRequest.prototype.addExcludeTools = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 7, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.StartRequest} returns this
 */
proto.gemini.StartRequest.prototype.clearExcludeToolsList = function() {
  return this.setExcludeToolsList([]);
};


/**
 * repeated McpServerConfig mcp_servers = 8;
 * @return {!Array<!proto.gemini.McpServerConfig>}
 */
proto.gemini.StartRequest.prototype.getMcpServersList = function() {
  return /** @type{!Array<!proto.gemini.McpServerConfig>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gemini.McpServerConfig, 8));
};


/**
 * @param {!Array<!proto.gemini.McpServerConfig>} value
 * @return {!proto.gemini.StartRequest} returns this
*/
proto.gemini.StartRequest.prototype.setMcpServersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.gemini.McpServerConfig=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gemini.McpServerConfig}
 */
proto.gemini.StartRequest.prototype.addMcpServers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.gemini.McpServerConfig, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.StartRequest} returns this
 */
proto.gemini.StartRequest.prototype.clearMcpServersList = function() {
  return this.setMcpServersList([]);
};


/**
 * optional string theme = 9;
 * @return {string}
 */
proto.gemini.StartRequest.prototype.getTheme = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.StartRequest} returns this
 */
proto.gemini.StartRequest.prototype.setTheme = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};


/**
 * optional string editor_type = 10;
 * @return {string}
 */
proto.gemini.StartRequest.prototype.getEditorType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.StartRequest} returns this
 */
proto.gemini.StartRequest.prototype.setEditorType = function(value) {
  return jspb.Message.setProto3StringField(this, 10, value);
};


/**
 * optional bool show_tool_descriptions = 11;
 * @return {boolean}
 */
proto.gemini.StartRequest.prototype.getShowToolDescriptions = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 11, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.StartRequest} returns this
 */
proto.gemini.StartRequest.prototype.setShowToolDescriptions = function(value) {
  return jspb.Message.setProto3BooleanField(this, 11, value);
};


/**
 * optional bool show_error_details = 12;
 * @return {boolean}
 */
proto.gemini.StartRequest.prototype.getShowErrorDetails = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 12, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.StartRequest} returns this
 */
proto.gemini.StartRequest.prototype.setShowErrorDetails = function(value) {
  return jspb.Message.setProto3BooleanField(this, 12, value);
};


/**
 * optional bool resume_from_checkpoint = 13;
 * @return {boolean}
 */
proto.gemini.StartRequest.prototype.getResumeFromCheckpoint = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 13, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.StartRequest} returns this
 */
proto.gemini.StartRequest.prototype.setResumeFromCheckpoint = function(value) {
  return jspb.Message.setProto3BooleanField(this, 13, value);
};


/**
 * optional string checkpoint_tag = 14;
 * @return {string}
 */
proto.gemini.StartRequest.prototype.getCheckpointTag = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 14, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.StartRequest} returns this
 */
proto.gemini.StartRequest.prototype.setCheckpointTag = function(value) {
  return jspb.Message.setProto3StringField(this, 14, value);
};


/**
 * optional google.protobuf.Struct advanced_config = 15;
 * @return {?proto.google.protobuf.Struct}
 */
proto.gemini.StartRequest.prototype.getAdvancedConfig = function() {
  return /** @type{?proto.google.protobuf.Struct} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Struct, 15));
};


/**
 * @param {?proto.google.protobuf.Struct|undefined} value
 * @return {!proto.gemini.StartRequest} returns this
*/
proto.gemini.StartRequest.prototype.setAdvancedConfig = function(value) {
  return jspb.Message.setWrapperField(this, 15, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.StartRequest} returns this
 */
proto.gemini.StartRequest.prototype.clearAdvancedConfig = function() {
  return this.setAdvancedConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.StartRequest.prototype.hasAdvancedConfig = function() {
  return jspb.Message.getField(this, 15) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.ChatMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.ChatMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.ChatMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ChatMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    content: jspb.Message.getFieldWithDefault(msg, 1, ""),
    isShellCommand: jspb.Message.getBooleanFieldWithDefault(msg, 2, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.ChatMessage}
 */
proto.gemini.ChatMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.ChatMessage;
  return proto.gemini.ChatMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.ChatMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.ChatMessage}
 */
proto.gemini.ChatMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setContent(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsShellCommand(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.ChatMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.ChatMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.ChatMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ChatMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContent();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getIsShellCommand();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
};


/**
 * optional string content = 1;
 * @return {string}
 */
proto.gemini.ChatMessage.prototype.getContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ChatMessage} returns this
 */
proto.gemini.ChatMessage.prototype.setContent = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool is_shell_command = 2;
 * @return {boolean}
 */
proto.gemini.ChatMessage.prototype.getIsShellCommand = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.ChatMessage} returns this
 */
proto.gemini.ChatMessage.prototype.setIsShellCommand = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.ToolConfirmationResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.ToolConfirmationResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.ToolConfirmationResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ToolConfirmationResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    confirmationId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    selectedOption: jspb.Message.getFieldWithDefault(msg, 2, 0),
    modifiedContent: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.ToolConfirmationResponse}
 */
proto.gemini.ToolConfirmationResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.ToolConfirmationResponse;
  return proto.gemini.ToolConfirmationResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.ToolConfirmationResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.ToolConfirmationResponse}
 */
proto.gemini.ToolConfirmationResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setConfirmationId(value);
      break;
    case 2:
      var value = /** @type {!proto.gemini.ConfirmationOption.OptionType} */ (reader.readEnum());
      msg.setSelectedOption(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setModifiedContent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.ToolConfirmationResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.ToolConfirmationResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.ToolConfirmationResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ToolConfirmationResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfirmationId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSelectedOption();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getModifiedContent();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string confirmation_id = 1;
 * @return {string}
 */
proto.gemini.ToolConfirmationResponse.prototype.getConfirmationId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ToolConfirmationResponse} returns this
 */
proto.gemini.ToolConfirmationResponse.prototype.setConfirmationId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional ConfirmationOption.OptionType selected_option = 2;
 * @return {!proto.gemini.ConfirmationOption.OptionType}
 */
proto.gemini.ToolConfirmationResponse.prototype.getSelectedOption = function() {
  return /** @type {!proto.gemini.ConfirmationOption.OptionType} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.gemini.ConfirmationOption.OptionType} value
 * @return {!proto.gemini.ToolConfirmationResponse} returns this
 */
proto.gemini.ToolConfirmationResponse.prototype.setSelectedOption = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional string modified_content = 3;
 * @return {string}
 */
proto.gemini.ToolConfirmationResponse.prototype.getModifiedContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ToolConfirmationResponse} returns this
 */
proto.gemini.ToolConfirmationResponse.prototype.setModifiedContent = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.RefreshContextRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.RefreshContextRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.RefreshContextRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.RefreshContextRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    force: jspb.Message.getBooleanFieldWithDefault(msg, 1, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.RefreshContextRequest}
 */
proto.gemini.RefreshContextRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.RefreshContextRequest;
  return proto.gemini.RefreshContextRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.RefreshContextRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.RefreshContextRequest}
 */
proto.gemini.RefreshContextRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setForce(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.RefreshContextRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.RefreshContextRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.RefreshContextRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.RefreshContextRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getForce();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
};


/**
 * optional bool force = 1;
 * @return {boolean}
 */
proto.gemini.RefreshContextRequest.prototype.getForce = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.RefreshContextRequest} returns this
 */
proto.gemini.RefreshContextRequest.prototype.setForce = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.CancelOperationRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.CancelOperationRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.CancelOperationRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.CancelOperationRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    operationId: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.CancelOperationRequest}
 */
proto.gemini.CancelOperationRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.CancelOperationRequest;
  return proto.gemini.CancelOperationRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.CancelOperationRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.CancelOperationRequest}
 */
proto.gemini.CancelOperationRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOperationId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.CancelOperationRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.CancelOperationRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.CancelOperationRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.CancelOperationRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOperationId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string operation_id = 1;
 * @return {string}
 */
proto.gemini.CancelOperationRequest.prototype.getOperationId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.CancelOperationRequest} returns this
 */
proto.gemini.CancelOperationRequest.prototype.setOperationId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.GetHelpRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.GetHelpRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.GetHelpRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.GetHelpRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    command: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.GetHelpRequest}
 */
proto.gemini.GetHelpRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.GetHelpRequest;
  return proto.gemini.GetHelpRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.GetHelpRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.GetHelpRequest}
 */
proto.gemini.GetHelpRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setCommand(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.GetHelpRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.GetHelpRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.GetHelpRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.GetHelpRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCommand();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string command = 1;
 * @return {string}
 */
proto.gemini.GetHelpRequest.prototype.getCommand = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.GetHelpRequest} returns this
 */
proto.gemini.GetHelpRequest.prototype.setCommand = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.AutoCompleteRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.AutoCompleteRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.AutoCompleteRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.AutoCompleteRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    input: jspb.Message.getFieldWithDefault(msg, 1, ""),
    cursorPosition: jspb.Message.getFieldWithDefault(msg, 2, 0),
    context: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.AutoCompleteRequest}
 */
proto.gemini.AutoCompleteRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.AutoCompleteRequest;
  return proto.gemini.AutoCompleteRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.AutoCompleteRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.AutoCompleteRequest}
 */
proto.gemini.AutoCompleteRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setInput(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCursorPosition(value);
      break;
    case 3:
      var value = /** @type {!proto.gemini.AutoCompleteContext} */ (reader.readEnum());
      msg.setContext(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.AutoCompleteRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.AutoCompleteRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.AutoCompleteRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.AutoCompleteRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getInput();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getCursorPosition();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getContext();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
};


/**
 * optional string input = 1;
 * @return {string}
 */
proto.gemini.AutoCompleteRequest.prototype.getInput = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.AutoCompleteRequest} returns this
 */
proto.gemini.AutoCompleteRequest.prototype.setInput = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 cursor_position = 2;
 * @return {number}
 */
proto.gemini.AutoCompleteRequest.prototype.getCursorPosition = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.AutoCompleteRequest} returns this
 */
proto.gemini.AutoCompleteRequest.prototype.setCursorPosition = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional AutoCompleteContext context = 3;
 * @return {!proto.gemini.AutoCompleteContext}
 */
proto.gemini.AutoCompleteRequest.prototype.getContext = function() {
  return /** @type {!proto.gemini.AutoCompleteContext} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.gemini.AutoCompleteContext} value
 * @return {!proto.gemini.AutoCompleteRequest} returns this
 */
proto.gemini.AutoCompleteRequest.prototype.setContext = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.gemini.ServerResponse.oneofGroups_ = [[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]];

/**
 * @enum {number}
 */
proto.gemini.ServerResponse.ResponseCase = {
  RESPONSE_NOT_SET: 0,
  SESSION_STARTED: 1,
  SESSION_STATS: 2,
  CHAT_CONTENT: 3,
  THOUGHT_BUBBLE: 4,
  TOOL_CONFIRMATION: 5,
  TOOL_STATUS: 6,
  TOOL_OUTPUT: 7,
  ERROR_MESSAGE: 8,
  INFO_MESSAGE: 9,
  WARNING_MESSAGE: 10,
  PROGRESS_UPDATE: 11,
  CONFIG_CHANGED: 12,
  HELP_CONTENT: 13,
  AUTO_COMPLETE_RESULT: 14,
  FILE_EDIT_PREVIEW: 15,
  FILE_OPERATION_RESULT: 16,
  CONTEXT_SUMMARY: 17,
  USAGE_METADATA: 18
};

/**
 * @return {proto.gemini.ServerResponse.ResponseCase}
 */
proto.gemini.ServerResponse.prototype.getResponseCase = function() {
  return /** @type {proto.gemini.ServerResponse.ResponseCase} */(jspb.Message.computeOneofCase(this, proto.gemini.ServerResponse.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.ServerResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.ServerResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.ServerResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ServerResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionStarted: (f = msg.getSessionStarted()) && proto.gemini.SessionStarted.toObject(includeInstance, f),
    sessionStats: (f = msg.getSessionStats()) && proto.gemini.SessionStats.toObject(includeInstance, f),
    chatContent: (f = msg.getChatContent()) && proto.gemini.ChatContent.toObject(includeInstance, f),
    thoughtBubble: (f = msg.getThoughtBubble()) && proto.gemini.ThoughtBubble.toObject(includeInstance, f),
    toolConfirmation: (f = msg.getToolConfirmation()) && proto.gemini.ToolConfirmationRequest.toObject(includeInstance, f),
    toolStatus: (f = msg.getToolStatus()) && proto.gemini.ToolStatusUpdate.toObject(includeInstance, f),
    toolOutput: (f = msg.getToolOutput()) && proto.gemini.ToolOutputStream.toObject(includeInstance, f),
    errorMessage: (f = msg.getErrorMessage()) && proto.gemini.ErrorMessage.toObject(includeInstance, f),
    infoMessage: (f = msg.getInfoMessage()) && proto.gemini.InfoMessage.toObject(includeInstance, f),
    warningMessage: (f = msg.getWarningMessage()) && proto.gemini.WarningMessage.toObject(includeInstance, f),
    progressUpdate: (f = msg.getProgressUpdate()) && proto.gemini.ProgressUpdate.toObject(includeInstance, f),
    configChanged: (f = msg.getConfigChanged()) && proto.gemini.ConfigChanged.toObject(includeInstance, f),
    helpContent: (f = msg.getHelpContent()) && proto.gemini.HelpContent.toObject(includeInstance, f),
    autoCompleteResult: (f = msg.getAutoCompleteResult()) && proto.gemini.AutoCompleteResult.toObject(includeInstance, f),
    fileEditPreview: (f = msg.getFileEditPreview()) && proto.gemini.FileEditPreview.toObject(includeInstance, f),
    fileOperationResult: (f = msg.getFileOperationResult()) && proto.gemini.FileOperationResult.toObject(includeInstance, f),
    contextSummary: (f = msg.getContextSummary()) && proto.gemini.ContextSummary.toObject(includeInstance, f),
    usageMetadata: (f = msg.getUsageMetadata()) && proto.gemini.UsageMetadata.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.ServerResponse}
 */
proto.gemini.ServerResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.ServerResponse;
  return proto.gemini.ServerResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.ServerResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.ServerResponse}
 */
proto.gemini.ServerResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gemini.SessionStarted;
      reader.readMessage(value,proto.gemini.SessionStarted.deserializeBinaryFromReader);
      msg.setSessionStarted(value);
      break;
    case 2:
      var value = new proto.gemini.SessionStats;
      reader.readMessage(value,proto.gemini.SessionStats.deserializeBinaryFromReader);
      msg.setSessionStats(value);
      break;
    case 3:
      var value = new proto.gemini.ChatContent;
      reader.readMessage(value,proto.gemini.ChatContent.deserializeBinaryFromReader);
      msg.setChatContent(value);
      break;
    case 4:
      var value = new proto.gemini.ThoughtBubble;
      reader.readMessage(value,proto.gemini.ThoughtBubble.deserializeBinaryFromReader);
      msg.setThoughtBubble(value);
      break;
    case 5:
      var value = new proto.gemini.ToolConfirmationRequest;
      reader.readMessage(value,proto.gemini.ToolConfirmationRequest.deserializeBinaryFromReader);
      msg.setToolConfirmation(value);
      break;
    case 6:
      var value = new proto.gemini.ToolStatusUpdate;
      reader.readMessage(value,proto.gemini.ToolStatusUpdate.deserializeBinaryFromReader);
      msg.setToolStatus(value);
      break;
    case 7:
      var value = new proto.gemini.ToolOutputStream;
      reader.readMessage(value,proto.gemini.ToolOutputStream.deserializeBinaryFromReader);
      msg.setToolOutput(value);
      break;
    case 8:
      var value = new proto.gemini.ErrorMessage;
      reader.readMessage(value,proto.gemini.ErrorMessage.deserializeBinaryFromReader);
      msg.setErrorMessage(value);
      break;
    case 9:
      var value = new proto.gemini.InfoMessage;
      reader.readMessage(value,proto.gemini.InfoMessage.deserializeBinaryFromReader);
      msg.setInfoMessage(value);
      break;
    case 10:
      var value = new proto.gemini.WarningMessage;
      reader.readMessage(value,proto.gemini.WarningMessage.deserializeBinaryFromReader);
      msg.setWarningMessage(value);
      break;
    case 11:
      var value = new proto.gemini.ProgressUpdate;
      reader.readMessage(value,proto.gemini.ProgressUpdate.deserializeBinaryFromReader);
      msg.setProgressUpdate(value);
      break;
    case 12:
      var value = new proto.gemini.ConfigChanged;
      reader.readMessage(value,proto.gemini.ConfigChanged.deserializeBinaryFromReader);
      msg.setConfigChanged(value);
      break;
    case 13:
      var value = new proto.gemini.HelpContent;
      reader.readMessage(value,proto.gemini.HelpContent.deserializeBinaryFromReader);
      msg.setHelpContent(value);
      break;
    case 14:
      var value = new proto.gemini.AutoCompleteResult;
      reader.readMessage(value,proto.gemini.AutoCompleteResult.deserializeBinaryFromReader);
      msg.setAutoCompleteResult(value);
      break;
    case 15:
      var value = new proto.gemini.FileEditPreview;
      reader.readMessage(value,proto.gemini.FileEditPreview.deserializeBinaryFromReader);
      msg.setFileEditPreview(value);
      break;
    case 16:
      var value = new proto.gemini.FileOperationResult;
      reader.readMessage(value,proto.gemini.FileOperationResult.deserializeBinaryFromReader);
      msg.setFileOperationResult(value);
      break;
    case 17:
      var value = new proto.gemini.ContextSummary;
      reader.readMessage(value,proto.gemini.ContextSummary.deserializeBinaryFromReader);
      msg.setContextSummary(value);
      break;
    case 18:
      var value = new proto.gemini.UsageMetadata;
      reader.readMessage(value,proto.gemini.UsageMetadata.deserializeBinaryFromReader);
      msg.setUsageMetadata(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.ServerResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.ServerResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.ServerResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ServerResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionStarted();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.gemini.SessionStarted.serializeBinaryToWriter
    );
  }
  f = message.getSessionStats();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gemini.SessionStats.serializeBinaryToWriter
    );
  }
  f = message.getChatContent();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.gemini.ChatContent.serializeBinaryToWriter
    );
  }
  f = message.getThoughtBubble();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.gemini.ThoughtBubble.serializeBinaryToWriter
    );
  }
  f = message.getToolConfirmation();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.gemini.ToolConfirmationRequest.serializeBinaryToWriter
    );
  }
  f = message.getToolStatus();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.gemini.ToolStatusUpdate.serializeBinaryToWriter
    );
  }
  f = message.getToolOutput();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.gemini.ToolOutputStream.serializeBinaryToWriter
    );
  }
  f = message.getErrorMessage();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.gemini.ErrorMessage.serializeBinaryToWriter
    );
  }
  f = message.getInfoMessage();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.gemini.InfoMessage.serializeBinaryToWriter
    );
  }
  f = message.getWarningMessage();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.gemini.WarningMessage.serializeBinaryToWriter
    );
  }
  f = message.getProgressUpdate();
  if (f != null) {
    writer.writeMessage(
      11,
      f,
      proto.gemini.ProgressUpdate.serializeBinaryToWriter
    );
  }
  f = message.getConfigChanged();
  if (f != null) {
    writer.writeMessage(
      12,
      f,
      proto.gemini.ConfigChanged.serializeBinaryToWriter
    );
  }
  f = message.getHelpContent();
  if (f != null) {
    writer.writeMessage(
      13,
      f,
      proto.gemini.HelpContent.serializeBinaryToWriter
    );
  }
  f = message.getAutoCompleteResult();
  if (f != null) {
    writer.writeMessage(
      14,
      f,
      proto.gemini.AutoCompleteResult.serializeBinaryToWriter
    );
  }
  f = message.getFileEditPreview();
  if (f != null) {
    writer.writeMessage(
      15,
      f,
      proto.gemini.FileEditPreview.serializeBinaryToWriter
    );
  }
  f = message.getFileOperationResult();
  if (f != null) {
    writer.writeMessage(
      16,
      f,
      proto.gemini.FileOperationResult.serializeBinaryToWriter
    );
  }
  f = message.getContextSummary();
  if (f != null) {
    writer.writeMessage(
      17,
      f,
      proto.gemini.ContextSummary.serializeBinaryToWriter
    );
  }
  f = message.getUsageMetadata();
  if (f != null) {
    writer.writeMessage(
      18,
      f,
      proto.gemini.UsageMetadata.serializeBinaryToWriter
    );
  }
};


/**
 * optional SessionStarted session_started = 1;
 * @return {?proto.gemini.SessionStarted}
 */
proto.gemini.ServerResponse.prototype.getSessionStarted = function() {
  return /** @type{?proto.gemini.SessionStarted} */ (
    jspb.Message.getWrapperField(this, proto.gemini.SessionStarted, 1));
};


/**
 * @param {?proto.gemini.SessionStarted|undefined} value
 * @return {!proto.gemini.ServerResponse} returns this
*/
proto.gemini.ServerResponse.prototype.setSessionStarted = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.gemini.ServerResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ServerResponse} returns this
 */
proto.gemini.ServerResponse.prototype.clearSessionStarted = function() {
  return this.setSessionStarted(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ServerResponse.prototype.hasSessionStarted = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional SessionStats session_stats = 2;
 * @return {?proto.gemini.SessionStats}
 */
proto.gemini.ServerResponse.prototype.getSessionStats = function() {
  return /** @type{?proto.gemini.SessionStats} */ (
    jspb.Message.getWrapperField(this, proto.gemini.SessionStats, 2));
};


/**
 * @param {?proto.gemini.SessionStats|undefined} value
 * @return {!proto.gemini.ServerResponse} returns this
*/
proto.gemini.ServerResponse.prototype.setSessionStats = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.gemini.ServerResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ServerResponse} returns this
 */
proto.gemini.ServerResponse.prototype.clearSessionStats = function() {
  return this.setSessionStats(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ServerResponse.prototype.hasSessionStats = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional ChatContent chat_content = 3;
 * @return {?proto.gemini.ChatContent}
 */
proto.gemini.ServerResponse.prototype.getChatContent = function() {
  return /** @type{?proto.gemini.ChatContent} */ (
    jspb.Message.getWrapperField(this, proto.gemini.ChatContent, 3));
};


/**
 * @param {?proto.gemini.ChatContent|undefined} value
 * @return {!proto.gemini.ServerResponse} returns this
*/
proto.gemini.ServerResponse.prototype.setChatContent = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.gemini.ServerResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ServerResponse} returns this
 */
proto.gemini.ServerResponse.prototype.clearChatContent = function() {
  return this.setChatContent(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ServerResponse.prototype.hasChatContent = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional ThoughtBubble thought_bubble = 4;
 * @return {?proto.gemini.ThoughtBubble}
 */
proto.gemini.ServerResponse.prototype.getThoughtBubble = function() {
  return /** @type{?proto.gemini.ThoughtBubble} */ (
    jspb.Message.getWrapperField(this, proto.gemini.ThoughtBubble, 4));
};


/**
 * @param {?proto.gemini.ThoughtBubble|undefined} value
 * @return {!proto.gemini.ServerResponse} returns this
*/
proto.gemini.ServerResponse.prototype.setThoughtBubble = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.gemini.ServerResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ServerResponse} returns this
 */
proto.gemini.ServerResponse.prototype.clearThoughtBubble = function() {
  return this.setThoughtBubble(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ServerResponse.prototype.hasThoughtBubble = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional ToolConfirmationRequest tool_confirmation = 5;
 * @return {?proto.gemini.ToolConfirmationRequest}
 */
proto.gemini.ServerResponse.prototype.getToolConfirmation = function() {
  return /** @type{?proto.gemini.ToolConfirmationRequest} */ (
    jspb.Message.getWrapperField(this, proto.gemini.ToolConfirmationRequest, 5));
};


/**
 * @param {?proto.gemini.ToolConfirmationRequest|undefined} value
 * @return {!proto.gemini.ServerResponse} returns this
*/
proto.gemini.ServerResponse.prototype.setToolConfirmation = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.gemini.ServerResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ServerResponse} returns this
 */
proto.gemini.ServerResponse.prototype.clearToolConfirmation = function() {
  return this.setToolConfirmation(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ServerResponse.prototype.hasToolConfirmation = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional ToolStatusUpdate tool_status = 6;
 * @return {?proto.gemini.ToolStatusUpdate}
 */
proto.gemini.ServerResponse.prototype.getToolStatus = function() {
  return /** @type{?proto.gemini.ToolStatusUpdate} */ (
    jspb.Message.getWrapperField(this, proto.gemini.ToolStatusUpdate, 6));
};


/**
 * @param {?proto.gemini.ToolStatusUpdate|undefined} value
 * @return {!proto.gemini.ServerResponse} returns this
*/
proto.gemini.ServerResponse.prototype.setToolStatus = function(value) {
  return jspb.Message.setOneofWrapperField(this, 6, proto.gemini.ServerResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ServerResponse} returns this
 */
proto.gemini.ServerResponse.prototype.clearToolStatus = function() {
  return this.setToolStatus(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ServerResponse.prototype.hasToolStatus = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional ToolOutputStream tool_output = 7;
 * @return {?proto.gemini.ToolOutputStream}
 */
proto.gemini.ServerResponse.prototype.getToolOutput = function() {
  return /** @type{?proto.gemini.ToolOutputStream} */ (
    jspb.Message.getWrapperField(this, proto.gemini.ToolOutputStream, 7));
};


/**
 * @param {?proto.gemini.ToolOutputStream|undefined} value
 * @return {!proto.gemini.ServerResponse} returns this
*/
proto.gemini.ServerResponse.prototype.setToolOutput = function(value) {
  return jspb.Message.setOneofWrapperField(this, 7, proto.gemini.ServerResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ServerResponse} returns this
 */
proto.gemini.ServerResponse.prototype.clearToolOutput = function() {
  return this.setToolOutput(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ServerResponse.prototype.hasToolOutput = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional ErrorMessage error_message = 8;
 * @return {?proto.gemini.ErrorMessage}
 */
proto.gemini.ServerResponse.prototype.getErrorMessage = function() {
  return /** @type{?proto.gemini.ErrorMessage} */ (
    jspb.Message.getWrapperField(this, proto.gemini.ErrorMessage, 8));
};


/**
 * @param {?proto.gemini.ErrorMessage|undefined} value
 * @return {!proto.gemini.ServerResponse} returns this
*/
proto.gemini.ServerResponse.prototype.setErrorMessage = function(value) {
  return jspb.Message.setOneofWrapperField(this, 8, proto.gemini.ServerResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ServerResponse} returns this
 */
proto.gemini.ServerResponse.prototype.clearErrorMessage = function() {
  return this.setErrorMessage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ServerResponse.prototype.hasErrorMessage = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional InfoMessage info_message = 9;
 * @return {?proto.gemini.InfoMessage}
 */
proto.gemini.ServerResponse.prototype.getInfoMessage = function() {
  return /** @type{?proto.gemini.InfoMessage} */ (
    jspb.Message.getWrapperField(this, proto.gemini.InfoMessage, 9));
};


/**
 * @param {?proto.gemini.InfoMessage|undefined} value
 * @return {!proto.gemini.ServerResponse} returns this
*/
proto.gemini.ServerResponse.prototype.setInfoMessage = function(value) {
  return jspb.Message.setOneofWrapperField(this, 9, proto.gemini.ServerResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ServerResponse} returns this
 */
proto.gemini.ServerResponse.prototype.clearInfoMessage = function() {
  return this.setInfoMessage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ServerResponse.prototype.hasInfoMessage = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional WarningMessage warning_message = 10;
 * @return {?proto.gemini.WarningMessage}
 */
proto.gemini.ServerResponse.prototype.getWarningMessage = function() {
  return /** @type{?proto.gemini.WarningMessage} */ (
    jspb.Message.getWrapperField(this, proto.gemini.WarningMessage, 10));
};


/**
 * @param {?proto.gemini.WarningMessage|undefined} value
 * @return {!proto.gemini.ServerResponse} returns this
*/
proto.gemini.ServerResponse.prototype.setWarningMessage = function(value) {
  return jspb.Message.setOneofWrapperField(this, 10, proto.gemini.ServerResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ServerResponse} returns this
 */
proto.gemini.ServerResponse.prototype.clearWarningMessage = function() {
  return this.setWarningMessage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ServerResponse.prototype.hasWarningMessage = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional ProgressUpdate progress_update = 11;
 * @return {?proto.gemini.ProgressUpdate}
 */
proto.gemini.ServerResponse.prototype.getProgressUpdate = function() {
  return /** @type{?proto.gemini.ProgressUpdate} */ (
    jspb.Message.getWrapperField(this, proto.gemini.ProgressUpdate, 11));
};


/**
 * @param {?proto.gemini.ProgressUpdate|undefined} value
 * @return {!proto.gemini.ServerResponse} returns this
*/
proto.gemini.ServerResponse.prototype.setProgressUpdate = function(value) {
  return jspb.Message.setOneofWrapperField(this, 11, proto.gemini.ServerResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ServerResponse} returns this
 */
proto.gemini.ServerResponse.prototype.clearProgressUpdate = function() {
  return this.setProgressUpdate(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ServerResponse.prototype.hasProgressUpdate = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional ConfigChanged config_changed = 12;
 * @return {?proto.gemini.ConfigChanged}
 */
proto.gemini.ServerResponse.prototype.getConfigChanged = function() {
  return /** @type{?proto.gemini.ConfigChanged} */ (
    jspb.Message.getWrapperField(this, proto.gemini.ConfigChanged, 12));
};


/**
 * @param {?proto.gemini.ConfigChanged|undefined} value
 * @return {!proto.gemini.ServerResponse} returns this
*/
proto.gemini.ServerResponse.prototype.setConfigChanged = function(value) {
  return jspb.Message.setOneofWrapperField(this, 12, proto.gemini.ServerResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ServerResponse} returns this
 */
proto.gemini.ServerResponse.prototype.clearConfigChanged = function() {
  return this.setConfigChanged(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ServerResponse.prototype.hasConfigChanged = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * optional HelpContent help_content = 13;
 * @return {?proto.gemini.HelpContent}
 */
proto.gemini.ServerResponse.prototype.getHelpContent = function() {
  return /** @type{?proto.gemini.HelpContent} */ (
    jspb.Message.getWrapperField(this, proto.gemini.HelpContent, 13));
};


/**
 * @param {?proto.gemini.HelpContent|undefined} value
 * @return {!proto.gemini.ServerResponse} returns this
*/
proto.gemini.ServerResponse.prototype.setHelpContent = function(value) {
  return jspb.Message.setOneofWrapperField(this, 13, proto.gemini.ServerResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ServerResponse} returns this
 */
proto.gemini.ServerResponse.prototype.clearHelpContent = function() {
  return this.setHelpContent(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ServerResponse.prototype.hasHelpContent = function() {
  return jspb.Message.getField(this, 13) != null;
};


/**
 * optional AutoCompleteResult auto_complete_result = 14;
 * @return {?proto.gemini.AutoCompleteResult}
 */
proto.gemini.ServerResponse.prototype.getAutoCompleteResult = function() {
  return /** @type{?proto.gemini.AutoCompleteResult} */ (
    jspb.Message.getWrapperField(this, proto.gemini.AutoCompleteResult, 14));
};


/**
 * @param {?proto.gemini.AutoCompleteResult|undefined} value
 * @return {!proto.gemini.ServerResponse} returns this
*/
proto.gemini.ServerResponse.prototype.setAutoCompleteResult = function(value) {
  return jspb.Message.setOneofWrapperField(this, 14, proto.gemini.ServerResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ServerResponse} returns this
 */
proto.gemini.ServerResponse.prototype.clearAutoCompleteResult = function() {
  return this.setAutoCompleteResult(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ServerResponse.prototype.hasAutoCompleteResult = function() {
  return jspb.Message.getField(this, 14) != null;
};


/**
 * optional FileEditPreview file_edit_preview = 15;
 * @return {?proto.gemini.FileEditPreview}
 */
proto.gemini.ServerResponse.prototype.getFileEditPreview = function() {
  return /** @type{?proto.gemini.FileEditPreview} */ (
    jspb.Message.getWrapperField(this, proto.gemini.FileEditPreview, 15));
};


/**
 * @param {?proto.gemini.FileEditPreview|undefined} value
 * @return {!proto.gemini.ServerResponse} returns this
*/
proto.gemini.ServerResponse.prototype.setFileEditPreview = function(value) {
  return jspb.Message.setOneofWrapperField(this, 15, proto.gemini.ServerResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ServerResponse} returns this
 */
proto.gemini.ServerResponse.prototype.clearFileEditPreview = function() {
  return this.setFileEditPreview(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ServerResponse.prototype.hasFileEditPreview = function() {
  return jspb.Message.getField(this, 15) != null;
};


/**
 * optional FileOperationResult file_operation_result = 16;
 * @return {?proto.gemini.FileOperationResult}
 */
proto.gemini.ServerResponse.prototype.getFileOperationResult = function() {
  return /** @type{?proto.gemini.FileOperationResult} */ (
    jspb.Message.getWrapperField(this, proto.gemini.FileOperationResult, 16));
};


/**
 * @param {?proto.gemini.FileOperationResult|undefined} value
 * @return {!proto.gemini.ServerResponse} returns this
*/
proto.gemini.ServerResponse.prototype.setFileOperationResult = function(value) {
  return jspb.Message.setOneofWrapperField(this, 16, proto.gemini.ServerResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ServerResponse} returns this
 */
proto.gemini.ServerResponse.prototype.clearFileOperationResult = function() {
  return this.setFileOperationResult(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ServerResponse.prototype.hasFileOperationResult = function() {
  return jspb.Message.getField(this, 16) != null;
};


/**
 * optional ContextSummary context_summary = 17;
 * @return {?proto.gemini.ContextSummary}
 */
proto.gemini.ServerResponse.prototype.getContextSummary = function() {
  return /** @type{?proto.gemini.ContextSummary} */ (
    jspb.Message.getWrapperField(this, proto.gemini.ContextSummary, 17));
};


/**
 * @param {?proto.gemini.ContextSummary|undefined} value
 * @return {!proto.gemini.ServerResponse} returns this
*/
proto.gemini.ServerResponse.prototype.setContextSummary = function(value) {
  return jspb.Message.setOneofWrapperField(this, 17, proto.gemini.ServerResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ServerResponse} returns this
 */
proto.gemini.ServerResponse.prototype.clearContextSummary = function() {
  return this.setContextSummary(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ServerResponse.prototype.hasContextSummary = function() {
  return jspb.Message.getField(this, 17) != null;
};


/**
 * optional UsageMetadata usage_metadata = 18;
 * @return {?proto.gemini.UsageMetadata}
 */
proto.gemini.ServerResponse.prototype.getUsageMetadata = function() {
  return /** @type{?proto.gemini.UsageMetadata} */ (
    jspb.Message.getWrapperField(this, proto.gemini.UsageMetadata, 18));
};


/**
 * @param {?proto.gemini.UsageMetadata|undefined} value
 * @return {!proto.gemini.ServerResponse} returns this
*/
proto.gemini.ServerResponse.prototype.setUsageMetadata = function(value) {
  return jspb.Message.setOneofWrapperField(this, 18, proto.gemini.ServerResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ServerResponse} returns this
 */
proto.gemini.ServerResponse.prototype.clearUsageMetadata = function() {
  return this.setUsageMetadata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ServerResponse.prototype.hasUsageMetadata = function() {
  return jspb.Message.getField(this, 18) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gemini.McpServerConfig.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.McpServerConfig.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.McpServerConfig.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.McpServerConfig} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.McpServerConfig.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    command: jspb.Message.getFieldWithDefault(msg, 2, ""),
    argsList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f,
    envMap: (f = msg.getEnvMap()) ? f.toObject(includeInstance, undefined) : []
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.McpServerConfig}
 */
proto.gemini.McpServerConfig.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.McpServerConfig;
  return proto.gemini.McpServerConfig.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.McpServerConfig} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.McpServerConfig}
 */
proto.gemini.McpServerConfig.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setCommand(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.addArgs(value);
      break;
    case 4:
      var value = msg.getEnvMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
         });
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.McpServerConfig.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.McpServerConfig.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.McpServerConfig} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.McpServerConfig.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getCommand();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getArgsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      3,
      f
    );
  }
  f = message.getEnvMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(4, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.gemini.McpServerConfig.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.McpServerConfig} returns this
 */
proto.gemini.McpServerConfig.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string command = 2;
 * @return {string}
 */
proto.gemini.McpServerConfig.prototype.getCommand = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.McpServerConfig} returns this
 */
proto.gemini.McpServerConfig.prototype.setCommand = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated string args = 3;
 * @return {!Array<string>}
 */
proto.gemini.McpServerConfig.prototype.getArgsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.gemini.McpServerConfig} returns this
 */
proto.gemini.McpServerConfig.prototype.setArgsList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.gemini.McpServerConfig} returns this
 */
proto.gemini.McpServerConfig.prototype.addArgs = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.McpServerConfig} returns this
 */
proto.gemini.McpServerConfig.prototype.clearArgsList = function() {
  return this.setArgsList([]);
};


/**
 * map<string, string> env = 4;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.gemini.McpServerConfig.prototype.getEnvMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 4, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.gemini.McpServerConfig} returns this
 */
proto.gemini.McpServerConfig.prototype.clearEnvMap = function() {
  this.getEnvMap().clear();
  return this;};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.SessionStarted.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.SessionStarted.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.SessionStarted} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.SessionStarted.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    model: jspb.Message.getFieldWithDefault(msg, 2, ""),
    initialContext: (f = msg.getInitialContext()) && proto.gemini.ContextSummary.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.SessionStarted}
 */
proto.gemini.SessionStarted.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.SessionStarted;
  return proto.gemini.SessionStarted.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.SessionStarted} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.SessionStarted}
 */
proto.gemini.SessionStarted.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setModel(value);
      break;
    case 3:
      var value = new proto.gemini.ContextSummary;
      reader.readMessage(value,proto.gemini.ContextSummary.deserializeBinaryFromReader);
      msg.setInitialContext(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.SessionStarted.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.SessionStarted.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.SessionStarted} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.SessionStarted.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getModel();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getInitialContext();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.gemini.ContextSummary.serializeBinaryToWriter
    );
  }
};


/**
 * optional string session_id = 1;
 * @return {string}
 */
proto.gemini.SessionStarted.prototype.getSessionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.SessionStarted} returns this
 */
proto.gemini.SessionStarted.prototype.setSessionId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string model = 2;
 * @return {string}
 */
proto.gemini.SessionStarted.prototype.getModel = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.SessionStarted} returns this
 */
proto.gemini.SessionStarted.prototype.setModel = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional ContextSummary initial_context = 3;
 * @return {?proto.gemini.ContextSummary}
 */
proto.gemini.SessionStarted.prototype.getInitialContext = function() {
  return /** @type{?proto.gemini.ContextSummary} */ (
    jspb.Message.getWrapperField(this, proto.gemini.ContextSummary, 3));
};


/**
 * @param {?proto.gemini.ContextSummary|undefined} value
 * @return {!proto.gemini.SessionStarted} returns this
*/
proto.gemini.SessionStarted.prototype.setInitialContext = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.SessionStarted} returns this
 */
proto.gemini.SessionStarted.prototype.clearInitialContext = function() {
  return this.setInitialContext(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.SessionStarted.prototype.hasInitialContext = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.SessionInfoRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.SessionInfoRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.SessionInfoRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.SessionInfoRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionId: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.SessionInfoRequest}
 */
proto.gemini.SessionInfoRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.SessionInfoRequest;
  return proto.gemini.SessionInfoRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.SessionInfoRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.SessionInfoRequest}
 */
proto.gemini.SessionInfoRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.SessionInfoRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.SessionInfoRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.SessionInfoRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.SessionInfoRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string session_id = 1;
 * @return {string}
 */
proto.gemini.SessionInfoRequest.prototype.getSessionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.SessionInfoRequest} returns this
 */
proto.gemini.SessionInfoRequest.prototype.setSessionId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.SessionInfoResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.SessionInfoResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.SessionInfoResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.SessionInfoResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    model: jspb.Message.getFieldWithDefault(msg, 2, ""),
    turnCount: jspb.Message.getFieldWithDefault(msg, 3, 0),
    createdAt: jspb.Message.getFieldWithDefault(msg, 4, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.SessionInfoResponse}
 */
proto.gemini.SessionInfoResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.SessionInfoResponse;
  return proto.gemini.SessionInfoResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.SessionInfoResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.SessionInfoResponse}
 */
proto.gemini.SessionInfoResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setModel(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTurnCount(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCreatedAt(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.SessionInfoResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.SessionInfoResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.SessionInfoResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.SessionInfoResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getModel();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getTurnCount();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getCreatedAt();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
};


/**
 * optional string session_id = 1;
 * @return {string}
 */
proto.gemini.SessionInfoResponse.prototype.getSessionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.SessionInfoResponse} returns this
 */
proto.gemini.SessionInfoResponse.prototype.setSessionId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string model = 2;
 * @return {string}
 */
proto.gemini.SessionInfoResponse.prototype.getModel = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.SessionInfoResponse} returns this
 */
proto.gemini.SessionInfoResponse.prototype.setModel = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional int32 turn_count = 3;
 * @return {number}
 */
proto.gemini.SessionInfoResponse.prototype.getTurnCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.SessionInfoResponse} returns this
 */
proto.gemini.SessionInfoResponse.prototype.setTurnCount = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int64 created_at = 4;
 * @return {number}
 */
proto.gemini.SessionInfoResponse.prototype.getCreatedAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.SessionInfoResponse} returns this
 */
proto.gemini.SessionInfoResponse.prototype.setCreatedAt = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.SessionStatsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.SessionStatsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.SessionStatsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.SessionStatsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionId: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.SessionStatsRequest}
 */
proto.gemini.SessionStatsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.SessionStatsRequest;
  return proto.gemini.SessionStatsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.SessionStatsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.SessionStatsRequest}
 */
proto.gemini.SessionStatsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.SessionStatsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.SessionStatsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.SessionStatsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.SessionStatsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string session_id = 1;
 * @return {string}
 */
proto.gemini.SessionStatsRequest.prototype.getSessionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.SessionStatsRequest} returns this
 */
proto.gemini.SessionStatsRequest.prototype.setSessionId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.SessionStatsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.SessionStatsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.SessionStatsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.SessionStatsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    stats: (f = msg.getStats()) && proto.gemini.SessionStats.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.SessionStatsResponse}
 */
proto.gemini.SessionStatsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.SessionStatsResponse;
  return proto.gemini.SessionStatsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.SessionStatsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.SessionStatsResponse}
 */
proto.gemini.SessionStatsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gemini.SessionStats;
      reader.readMessage(value,proto.gemini.SessionStats.deserializeBinaryFromReader);
      msg.setStats(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.SessionStatsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.SessionStatsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.SessionStatsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.SessionStatsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStats();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.gemini.SessionStats.serializeBinaryToWriter
    );
  }
};


/**
 * optional SessionStats stats = 1;
 * @return {?proto.gemini.SessionStats}
 */
proto.gemini.SessionStatsResponse.prototype.getStats = function() {
  return /** @type{?proto.gemini.SessionStats} */ (
    jspb.Message.getWrapperField(this, proto.gemini.SessionStats, 1));
};


/**
 * @param {?proto.gemini.SessionStats|undefined} value
 * @return {!proto.gemini.SessionStatsResponse} returns this
*/
proto.gemini.SessionStatsResponse.prototype.setStats = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.SessionStatsResponse} returns this
 */
proto.gemini.SessionStatsResponse.prototype.clearStats = function() {
  return this.setStats(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.SessionStatsResponse.prototype.hasStats = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.SessionStats.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.SessionStats.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.SessionStats} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.SessionStats.toObject = function(includeInstance, msg) {
  var f, obj = {
    turnCount: jspb.Message.getFieldWithDefault(msg, 1, 0),
    totalTokens: (f = msg.getTotalTokens()) && proto.gemini.TokenUsage.toObject(includeInstance, f),
    totalApiTimeMs: jspb.Message.getFieldWithDefault(msg, 3, 0),
    toolsExecuted: jspb.Message.getFieldWithDefault(msg, 4, 0),
    filesModified: jspb.Message.getFieldWithDefault(msg, 5, 0),
    sessionDuration: jspb.Message.getFieldWithDefault(msg, 6, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.SessionStats}
 */
proto.gemini.SessionStats.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.SessionStats;
  return proto.gemini.SessionStats.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.SessionStats} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.SessionStats}
 */
proto.gemini.SessionStats.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTurnCount(value);
      break;
    case 2:
      var value = new proto.gemini.TokenUsage;
      reader.readMessage(value,proto.gemini.TokenUsage.deserializeBinaryFromReader);
      msg.setTotalTokens(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTotalApiTimeMs(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setToolsExecuted(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setFilesModified(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionDuration(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.SessionStats.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.SessionStats.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.SessionStats} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.SessionStats.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTurnCount();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getTotalTokens();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gemini.TokenUsage.serializeBinaryToWriter
    );
  }
  f = message.getTotalApiTimeMs();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getToolsExecuted();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getFilesModified();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getSessionDuration();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * optional int32 turn_count = 1;
 * @return {number}
 */
proto.gemini.SessionStats.prototype.getTurnCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.SessionStats} returns this
 */
proto.gemini.SessionStats.prototype.setTurnCount = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional TokenUsage total_tokens = 2;
 * @return {?proto.gemini.TokenUsage}
 */
proto.gemini.SessionStats.prototype.getTotalTokens = function() {
  return /** @type{?proto.gemini.TokenUsage} */ (
    jspb.Message.getWrapperField(this, proto.gemini.TokenUsage, 2));
};


/**
 * @param {?proto.gemini.TokenUsage|undefined} value
 * @return {!proto.gemini.SessionStats} returns this
*/
proto.gemini.SessionStats.prototype.setTotalTokens = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.SessionStats} returns this
 */
proto.gemini.SessionStats.prototype.clearTotalTokens = function() {
  return this.setTotalTokens(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.SessionStats.prototype.hasTotalTokens = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional int64 total_api_time_ms = 3;
 * @return {number}
 */
proto.gemini.SessionStats.prototype.getTotalApiTimeMs = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.SessionStats} returns this
 */
proto.gemini.SessionStats.prototype.setTotalApiTimeMs = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 tools_executed = 4;
 * @return {number}
 */
proto.gemini.SessionStats.prototype.getToolsExecuted = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.SessionStats} returns this
 */
proto.gemini.SessionStats.prototype.setToolsExecuted = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int32 files_modified = 5;
 * @return {number}
 */
proto.gemini.SessionStats.prototype.getFilesModified = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.SessionStats} returns this
 */
proto.gemini.SessionStats.prototype.setFilesModified = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional string session_duration = 6;
 * @return {string}
 */
proto.gemini.SessionStats.prototype.getSessionDuration = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.SessionStats} returns this
 */
proto.gemini.SessionStats.prototype.setSessionDuration = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.TokenUsage.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.TokenUsage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.TokenUsage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.TokenUsage.toObject = function(includeInstance, msg) {
  var f, obj = {
    inputTokens: jspb.Message.getFieldWithDefault(msg, 1, 0),
    outputTokens: jspb.Message.getFieldWithDefault(msg, 2, 0),
    cachedTokens: jspb.Message.getFieldWithDefault(msg, 3, 0),
    reasoningTokens: jspb.Message.getFieldWithDefault(msg, 4, 0),
    totalTokens: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.TokenUsage}
 */
proto.gemini.TokenUsage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.TokenUsage;
  return proto.gemini.TokenUsage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.TokenUsage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.TokenUsage}
 */
proto.gemini.TokenUsage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setInputTokens(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setOutputTokens(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCachedTokens(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setReasoningTokens(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTotalTokens(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.TokenUsage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.TokenUsage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.TokenUsage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.TokenUsage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getInputTokens();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getOutputTokens();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getCachedTokens();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getReasoningTokens();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getTotalTokens();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
};


/**
 * optional int32 input_tokens = 1;
 * @return {number}
 */
proto.gemini.TokenUsage.prototype.getInputTokens = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.TokenUsage} returns this
 */
proto.gemini.TokenUsage.prototype.setInputTokens = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 output_tokens = 2;
 * @return {number}
 */
proto.gemini.TokenUsage.prototype.getOutputTokens = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.TokenUsage} returns this
 */
proto.gemini.TokenUsage.prototype.setOutputTokens = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 cached_tokens = 3;
 * @return {number}
 */
proto.gemini.TokenUsage.prototype.getCachedTokens = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.TokenUsage} returns this
 */
proto.gemini.TokenUsage.prototype.setCachedTokens = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 reasoning_tokens = 4;
 * @return {number}
 */
proto.gemini.TokenUsage.prototype.getReasoningTokens = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.TokenUsage} returns this
 */
proto.gemini.TokenUsage.prototype.setReasoningTokens = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int32 total_tokens = 5;
 * @return {number}
 */
proto.gemini.TokenUsage.prototype.getTotalTokens = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.TokenUsage} returns this
 */
proto.gemini.TokenUsage.prototype.setTotalTokens = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.ChatContent.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.ChatContent.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.ChatContent} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ChatContent.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, 0),
    content: jspb.Message.getFieldWithDefault(msg, 2, ""),
    isMarkdown: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    isStreaming: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    codeBlock: (f = msg.getCodeBlock()) && proto.gemini.CodeBlock.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.ChatContent}
 */
proto.gemini.ChatContent.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.ChatContent;
  return proto.gemini.ChatContent.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.ChatContent} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.ChatContent}
 */
proto.gemini.ChatContent.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.gemini.ChatContent.ContentType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContent(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsMarkdown(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsStreaming(value);
      break;
    case 5:
      var value = new proto.gemini.CodeBlock;
      reader.readMessage(value,proto.gemini.CodeBlock.deserializeBinaryFromReader);
      msg.setCodeBlock(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.ChatContent.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.ChatContent.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.ChatContent} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ChatContent.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getContent();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getIsMarkdown();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getIsStreaming();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getCodeBlock();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.gemini.CodeBlock.serializeBinaryToWriter
    );
  }
};


/**
 * @enum {number}
 */
proto.gemini.ChatContent.ContentType = {
  USER: 0,
  GEMINI: 1,
  ERROR: 2,
  INFO: 3,
  TOOL: 4,
  THOUGHT: 5
};

/**
 * optional ContentType type = 1;
 * @return {!proto.gemini.ChatContent.ContentType}
 */
proto.gemini.ChatContent.prototype.getType = function() {
  return /** @type {!proto.gemini.ChatContent.ContentType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.gemini.ChatContent.ContentType} value
 * @return {!proto.gemini.ChatContent} returns this
 */
proto.gemini.ChatContent.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional string content = 2;
 * @return {string}
 */
proto.gemini.ChatContent.prototype.getContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ChatContent} returns this
 */
proto.gemini.ChatContent.prototype.setContent = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool is_markdown = 3;
 * @return {boolean}
 */
proto.gemini.ChatContent.prototype.getIsMarkdown = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.ChatContent} returns this
 */
proto.gemini.ChatContent.prototype.setIsMarkdown = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional bool is_streaming = 4;
 * @return {boolean}
 */
proto.gemini.ChatContent.prototype.getIsStreaming = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.ChatContent} returns this
 */
proto.gemini.ChatContent.prototype.setIsStreaming = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional CodeBlock code_block = 5;
 * @return {?proto.gemini.CodeBlock}
 */
proto.gemini.ChatContent.prototype.getCodeBlock = function() {
  return /** @type{?proto.gemini.CodeBlock} */ (
    jspb.Message.getWrapperField(this, proto.gemini.CodeBlock, 5));
};


/**
 * @param {?proto.gemini.CodeBlock|undefined} value
 * @return {!proto.gemini.ChatContent} returns this
*/
proto.gemini.ChatContent.prototype.setCodeBlock = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ChatContent} returns this
 */
proto.gemini.ChatContent.prototype.clearCodeBlock = function() {
  return this.setCodeBlock(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ChatContent.prototype.hasCodeBlock = function() {
  return jspb.Message.getField(this, 5) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.CodeBlock.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.CodeBlock.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.CodeBlock} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.CodeBlock.toObject = function(includeInstance, msg) {
  var f, obj = {
    language: jspb.Message.getFieldWithDefault(msg, 1, ""),
    code: jspb.Message.getFieldWithDefault(msg, 2, ""),
    shouldHighlight: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.CodeBlock}
 */
proto.gemini.CodeBlock.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.CodeBlock;
  return proto.gemini.CodeBlock.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.CodeBlock} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.CodeBlock}
 */
proto.gemini.CodeBlock.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setLanguage(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setCode(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setShouldHighlight(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.CodeBlock.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.CodeBlock.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.CodeBlock} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.CodeBlock.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLanguage();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getCode();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getShouldHighlight();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional string language = 1;
 * @return {string}
 */
proto.gemini.CodeBlock.prototype.getLanguage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.CodeBlock} returns this
 */
proto.gemini.CodeBlock.prototype.setLanguage = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string code = 2;
 * @return {string}
 */
proto.gemini.CodeBlock.prototype.getCode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.CodeBlock} returns this
 */
proto.gemini.CodeBlock.prototype.setCode = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool should_highlight = 3;
 * @return {boolean}
 */
proto.gemini.CodeBlock.prototype.getShouldHighlight = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.CodeBlock} returns this
 */
proto.gemini.CodeBlock.prototype.setShouldHighlight = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.ThoughtBubble.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.ThoughtBubble.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.ThoughtBubble} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ThoughtBubble.toObject = function(includeInstance, msg) {
  var f, obj = {
    subject: jspb.Message.getFieldWithDefault(msg, 1, ""),
    thought: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.ThoughtBubble}
 */
proto.gemini.ThoughtBubble.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.ThoughtBubble;
  return proto.gemini.ThoughtBubble.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.ThoughtBubble} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.ThoughtBubble}
 */
proto.gemini.ThoughtBubble.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSubject(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setThought(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.ThoughtBubble.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.ThoughtBubble.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.ThoughtBubble} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ThoughtBubble.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSubject();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getThought();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string subject = 1;
 * @return {string}
 */
proto.gemini.ThoughtBubble.prototype.getSubject = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ThoughtBubble} returns this
 */
proto.gemini.ThoughtBubble.prototype.setSubject = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string thought = 2;
 * @return {string}
 */
proto.gemini.ThoughtBubble.prototype.getThought = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ThoughtBubble} returns this
 */
proto.gemini.ThoughtBubble.prototype.setThought = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gemini.ToolConfirmationRequest.repeatedFields_ = [5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.ToolConfirmationRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.ToolConfirmationRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.ToolConfirmationRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ToolConfirmationRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    confirmationId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    toolName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    args: (f = msg.getArgs()) && google_protobuf_struct_pb.Struct.toObject(includeInstance, f),
    type: jspb.Message.getFieldWithDefault(msg, 4, 0),
    optionsList: jspb.Message.toObjectList(msg.getOptionsList(),
    proto.gemini.ConfirmationOption.toObject, includeInstance),
    description: jspb.Message.getFieldWithDefault(msg, 6, ""),
    diffPreview: (f = msg.getDiffPreview()) && proto.gemini.DiffPreview.toObject(includeInstance, f),
    mcpServer: jspb.Message.getFieldWithDefault(msg, 8, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.ToolConfirmationRequest}
 */
proto.gemini.ToolConfirmationRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.ToolConfirmationRequest;
  return proto.gemini.ToolConfirmationRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.ToolConfirmationRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.ToolConfirmationRequest}
 */
proto.gemini.ToolConfirmationRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setConfirmationId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setToolName(value);
      break;
    case 3:
      var value = new google_protobuf_struct_pb.Struct;
      reader.readMessage(value,google_protobuf_struct_pb.Struct.deserializeBinaryFromReader);
      msg.setArgs(value);
      break;
    case 4:
      var value = /** @type {!proto.gemini.ToolConfirmationRequest.ConfirmationType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 5:
      var value = new proto.gemini.ConfirmationOption;
      reader.readMessage(value,proto.gemini.ConfirmationOption.deserializeBinaryFromReader);
      msg.addOptions(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 7:
      var value = new proto.gemini.DiffPreview;
      reader.readMessage(value,proto.gemini.DiffPreview.deserializeBinaryFromReader);
      msg.setDiffPreview(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setMcpServer(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.ToolConfirmationRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.ToolConfirmationRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.ToolConfirmationRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ToolConfirmationRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfirmationId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getToolName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getArgs();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_struct_pb.Struct.serializeBinaryToWriter
    );
  }
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = message.getOptionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.gemini.ConfirmationOption.serializeBinaryToWriter
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getDiffPreview();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.gemini.DiffPreview.serializeBinaryToWriter
    );
  }
  f = message.getMcpServer();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.gemini.ToolConfirmationRequest.ConfirmationType = {
  EXECUTE: 0,
  EDIT_FILE: 1,
  SHELL_COMMAND: 2,
  MCP_TOOL: 3
};

/**
 * optional string confirmation_id = 1;
 * @return {string}
 */
proto.gemini.ToolConfirmationRequest.prototype.getConfirmationId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ToolConfirmationRequest} returns this
 */
proto.gemini.ToolConfirmationRequest.prototype.setConfirmationId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string tool_name = 2;
 * @return {string}
 */
proto.gemini.ToolConfirmationRequest.prototype.getToolName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ToolConfirmationRequest} returns this
 */
proto.gemini.ToolConfirmationRequest.prototype.setToolName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional google.protobuf.Struct args = 3;
 * @return {?proto.google.protobuf.Struct}
 */
proto.gemini.ToolConfirmationRequest.prototype.getArgs = function() {
  return /** @type{?proto.google.protobuf.Struct} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Struct, 3));
};


/**
 * @param {?proto.google.protobuf.Struct|undefined} value
 * @return {!proto.gemini.ToolConfirmationRequest} returns this
*/
proto.gemini.ToolConfirmationRequest.prototype.setArgs = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ToolConfirmationRequest} returns this
 */
proto.gemini.ToolConfirmationRequest.prototype.clearArgs = function() {
  return this.setArgs(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ToolConfirmationRequest.prototype.hasArgs = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional ConfirmationType type = 4;
 * @return {!proto.gemini.ToolConfirmationRequest.ConfirmationType}
 */
proto.gemini.ToolConfirmationRequest.prototype.getType = function() {
  return /** @type {!proto.gemini.ToolConfirmationRequest.ConfirmationType} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.gemini.ToolConfirmationRequest.ConfirmationType} value
 * @return {!proto.gemini.ToolConfirmationRequest} returns this
 */
proto.gemini.ToolConfirmationRequest.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
};


/**
 * repeated ConfirmationOption options = 5;
 * @return {!Array<!proto.gemini.ConfirmationOption>}
 */
proto.gemini.ToolConfirmationRequest.prototype.getOptionsList = function() {
  return /** @type{!Array<!proto.gemini.ConfirmationOption>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gemini.ConfirmationOption, 5));
};


/**
 * @param {!Array<!proto.gemini.ConfirmationOption>} value
 * @return {!proto.gemini.ToolConfirmationRequest} returns this
*/
proto.gemini.ToolConfirmationRequest.prototype.setOptionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.gemini.ConfirmationOption=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gemini.ConfirmationOption}
 */
proto.gemini.ToolConfirmationRequest.prototype.addOptions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.gemini.ConfirmationOption, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.ToolConfirmationRequest} returns this
 */
proto.gemini.ToolConfirmationRequest.prototype.clearOptionsList = function() {
  return this.setOptionsList([]);
};


/**
 * optional string description = 6;
 * @return {string}
 */
proto.gemini.ToolConfirmationRequest.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ToolConfirmationRequest} returns this
 */
proto.gemini.ToolConfirmationRequest.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional DiffPreview diff_preview = 7;
 * @return {?proto.gemini.DiffPreview}
 */
proto.gemini.ToolConfirmationRequest.prototype.getDiffPreview = function() {
  return /** @type{?proto.gemini.DiffPreview} */ (
    jspb.Message.getWrapperField(this, proto.gemini.DiffPreview, 7));
};


/**
 * @param {?proto.gemini.DiffPreview|undefined} value
 * @return {!proto.gemini.ToolConfirmationRequest} returns this
*/
proto.gemini.ToolConfirmationRequest.prototype.setDiffPreview = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ToolConfirmationRequest} returns this
 */
proto.gemini.ToolConfirmationRequest.prototype.clearDiffPreview = function() {
  return this.setDiffPreview(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ToolConfirmationRequest.prototype.hasDiffPreview = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional string mcp_server = 8;
 * @return {string}
 */
proto.gemini.ToolConfirmationRequest.prototype.getMcpServer = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ToolConfirmationRequest} returns this
 */
proto.gemini.ToolConfirmationRequest.prototype.setMcpServer = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.ConfirmationOption.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.ConfirmationOption.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.ConfirmationOption} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ConfirmationOption.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, 0),
    label: jspb.Message.getFieldWithDefault(msg, 2, ""),
    hotkey: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.ConfirmationOption}
 */
proto.gemini.ConfirmationOption.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.ConfirmationOption;
  return proto.gemini.ConfirmationOption.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.ConfirmationOption} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.ConfirmationOption}
 */
proto.gemini.ConfirmationOption.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.gemini.ConfirmationOption.OptionType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setLabel(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setHotkey(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.ConfirmationOption.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.ConfirmationOption.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.ConfirmationOption} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ConfirmationOption.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getLabel();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getHotkey();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.gemini.ConfirmationOption.OptionType = {
  ALLOW_ONCE: 0,
  ALLOW_ALWAYS: 1,
  ALLOW_ALWAYS_TOOL: 2,
  ALLOW_ALWAYS_SERVER: 3,
  MODIFY_WITH_EDITOR: 4,
  CANCEL: 5
};

/**
 * optional OptionType type = 1;
 * @return {!proto.gemini.ConfirmationOption.OptionType}
 */
proto.gemini.ConfirmationOption.prototype.getType = function() {
  return /** @type {!proto.gemini.ConfirmationOption.OptionType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.gemini.ConfirmationOption.OptionType} value
 * @return {!proto.gemini.ConfirmationOption} returns this
 */
proto.gemini.ConfirmationOption.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional string label = 2;
 * @return {string}
 */
proto.gemini.ConfirmationOption.prototype.getLabel = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ConfirmationOption} returns this
 */
proto.gemini.ConfirmationOption.prototype.setLabel = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string hotkey = 3;
 * @return {string}
 */
proto.gemini.ConfirmationOption.prototype.getHotkey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ConfirmationOption} returns this
 */
proto.gemini.ConfirmationOption.prototype.setHotkey = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gemini.DiffPreview.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.DiffPreview.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.DiffPreview.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.DiffPreview} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.DiffPreview.toObject = function(includeInstance, msg) {
  var f, obj = {
    filePath: jspb.Message.getFieldWithDefault(msg, 1, ""),
    hunksList: jspb.Message.toObjectList(msg.getHunksList(),
    proto.gemini.DiffHunk.toObject, includeInstance),
    additions: jspb.Message.getFieldWithDefault(msg, 3, 0),
    deletions: jspb.Message.getFieldWithDefault(msg, 4, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.DiffPreview}
 */
proto.gemini.DiffPreview.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.DiffPreview;
  return proto.gemini.DiffPreview.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.DiffPreview} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.DiffPreview}
 */
proto.gemini.DiffPreview.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setFilePath(value);
      break;
    case 2:
      var value = new proto.gemini.DiffHunk;
      reader.readMessage(value,proto.gemini.DiffHunk.deserializeBinaryFromReader);
      msg.addHunks(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setAdditions(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDeletions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.DiffPreview.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.DiffPreview.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.DiffPreview} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.DiffPreview.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFilePath();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getHunksList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gemini.DiffHunk.serializeBinaryToWriter
    );
  }
  f = message.getAdditions();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getDeletions();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
};


/**
 * optional string file_path = 1;
 * @return {string}
 */
proto.gemini.DiffPreview.prototype.getFilePath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.DiffPreview} returns this
 */
proto.gemini.DiffPreview.prototype.setFilePath = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated DiffHunk hunks = 2;
 * @return {!Array<!proto.gemini.DiffHunk>}
 */
proto.gemini.DiffPreview.prototype.getHunksList = function() {
  return /** @type{!Array<!proto.gemini.DiffHunk>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gemini.DiffHunk, 2));
};


/**
 * @param {!Array<!proto.gemini.DiffHunk>} value
 * @return {!proto.gemini.DiffPreview} returns this
*/
proto.gemini.DiffPreview.prototype.setHunksList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gemini.DiffHunk=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gemini.DiffHunk}
 */
proto.gemini.DiffPreview.prototype.addHunks = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gemini.DiffHunk, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.DiffPreview} returns this
 */
proto.gemini.DiffPreview.prototype.clearHunksList = function() {
  return this.setHunksList([]);
};


/**
 * optional int32 additions = 3;
 * @return {number}
 */
proto.gemini.DiffPreview.prototype.getAdditions = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.DiffPreview} returns this
 */
proto.gemini.DiffPreview.prototype.setAdditions = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 deletions = 4;
 * @return {number}
 */
proto.gemini.DiffPreview.prototype.getDeletions = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.DiffPreview} returns this
 */
proto.gemini.DiffPreview.prototype.setDeletions = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gemini.DiffHunk.repeatedFields_ = [5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.DiffHunk.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.DiffHunk.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.DiffHunk} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.DiffHunk.toObject = function(includeInstance, msg) {
  var f, obj = {
    oldStart: jspb.Message.getFieldWithDefault(msg, 1, 0),
    oldCount: jspb.Message.getFieldWithDefault(msg, 2, 0),
    newStart: jspb.Message.getFieldWithDefault(msg, 3, 0),
    newCount: jspb.Message.getFieldWithDefault(msg, 4, 0),
    linesList: jspb.Message.toObjectList(msg.getLinesList(),
    proto.gemini.DiffLine.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.DiffHunk}
 */
proto.gemini.DiffHunk.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.DiffHunk;
  return proto.gemini.DiffHunk.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.DiffHunk} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.DiffHunk}
 */
proto.gemini.DiffHunk.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setOldStart(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setOldCount(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNewStart(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNewCount(value);
      break;
    case 5:
      var value = new proto.gemini.DiffLine;
      reader.readMessage(value,proto.gemini.DiffLine.deserializeBinaryFromReader);
      msg.addLines(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.DiffHunk.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.DiffHunk.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.DiffHunk} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.DiffHunk.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOldStart();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getOldCount();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getNewStart();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getNewCount();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getLinesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.gemini.DiffLine.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 old_start = 1;
 * @return {number}
 */
proto.gemini.DiffHunk.prototype.getOldStart = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.DiffHunk} returns this
 */
proto.gemini.DiffHunk.prototype.setOldStart = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 old_count = 2;
 * @return {number}
 */
proto.gemini.DiffHunk.prototype.getOldCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.DiffHunk} returns this
 */
proto.gemini.DiffHunk.prototype.setOldCount = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 new_start = 3;
 * @return {number}
 */
proto.gemini.DiffHunk.prototype.getNewStart = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.DiffHunk} returns this
 */
proto.gemini.DiffHunk.prototype.setNewStart = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 new_count = 4;
 * @return {number}
 */
proto.gemini.DiffHunk.prototype.getNewCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.DiffHunk} returns this
 */
proto.gemini.DiffHunk.prototype.setNewCount = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * repeated DiffLine lines = 5;
 * @return {!Array<!proto.gemini.DiffLine>}
 */
proto.gemini.DiffHunk.prototype.getLinesList = function() {
  return /** @type{!Array<!proto.gemini.DiffLine>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gemini.DiffLine, 5));
};


/**
 * @param {!Array<!proto.gemini.DiffLine>} value
 * @return {!proto.gemini.DiffHunk} returns this
*/
proto.gemini.DiffHunk.prototype.setLinesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.gemini.DiffLine=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gemini.DiffLine}
 */
proto.gemini.DiffHunk.prototype.addLines = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.gemini.DiffLine, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.DiffHunk} returns this
 */
proto.gemini.DiffHunk.prototype.clearLinesList = function() {
  return this.setLinesList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.DiffLine.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.DiffLine.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.DiffLine} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.DiffLine.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, 0),
    content: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.DiffLine}
 */
proto.gemini.DiffLine.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.DiffLine;
  return proto.gemini.DiffLine.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.DiffLine} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.DiffLine}
 */
proto.gemini.DiffLine.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.gemini.DiffLine.LineType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.DiffLine.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.DiffLine.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.DiffLine} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.DiffLine.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getContent();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.gemini.DiffLine.LineType = {
  CONTEXT: 0,
  ADDITION: 1,
  DELETION: 2
};

/**
 * optional LineType type = 1;
 * @return {!proto.gemini.DiffLine.LineType}
 */
proto.gemini.DiffLine.prototype.getType = function() {
  return /** @type {!proto.gemini.DiffLine.LineType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.gemini.DiffLine.LineType} value
 * @return {!proto.gemini.DiffLine} returns this
 */
proto.gemini.DiffLine.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional string content = 2;
 * @return {string}
 */
proto.gemini.DiffLine.prototype.getContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.DiffLine} returns this
 */
proto.gemini.DiffLine.prototype.setContent = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.ToolStatusUpdate.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.ToolStatusUpdate.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.ToolStatusUpdate} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ToolStatusUpdate.toObject = function(includeInstance, msg) {
  var f, obj = {
    toolId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    toolName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    status: jspb.Message.getFieldWithDefault(msg, 3, 0),
    description: jspb.Message.getFieldWithDefault(msg, 4, ""),
    result: (f = msg.getResult()) && google_protobuf_struct_pb.Struct.toObject(includeInstance, f),
    errorMessage: jspb.Message.getFieldWithDefault(msg, 6, ""),
    durationMs: jspb.Message.getFieldWithDefault(msg, 7, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.ToolStatusUpdate}
 */
proto.gemini.ToolStatusUpdate.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.ToolStatusUpdate;
  return proto.gemini.ToolStatusUpdate.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.ToolStatusUpdate} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.ToolStatusUpdate}
 */
proto.gemini.ToolStatusUpdate.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setToolId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setToolName(value);
      break;
    case 3:
      var value = /** @type {!proto.gemini.ToolStatusUpdate.Status} */ (reader.readEnum());
      msg.setStatus(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 5:
      var value = new google_protobuf_struct_pb.Struct;
      reader.readMessage(value,google_protobuf_struct_pb.Struct.deserializeBinaryFromReader);
      msg.setResult(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setErrorMessage(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setDurationMs(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.ToolStatusUpdate.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.ToolStatusUpdate.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.ToolStatusUpdate} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ToolStatusUpdate.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getToolId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getToolName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getStatus();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getResult();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_struct_pb.Struct.serializeBinaryToWriter
    );
  }
  f = message.getErrorMessage();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getDurationMs();
  if (f !== 0) {
    writer.writeInt64(
      7,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.gemini.ToolStatusUpdate.Status = {
  PENDING: 0,
  VALIDATING: 1,
  SCHEDULED: 2,
  AWAITING_CONFIRMATION: 3,
  EXECUTING: 4,
  SUCCESS: 5,
  ERROR: 6,
  CANCELLED: 7
};

/**
 * optional string tool_id = 1;
 * @return {string}
 */
proto.gemini.ToolStatusUpdate.prototype.getToolId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ToolStatusUpdate} returns this
 */
proto.gemini.ToolStatusUpdate.prototype.setToolId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string tool_name = 2;
 * @return {string}
 */
proto.gemini.ToolStatusUpdate.prototype.getToolName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ToolStatusUpdate} returns this
 */
proto.gemini.ToolStatusUpdate.prototype.setToolName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional Status status = 3;
 * @return {!proto.gemini.ToolStatusUpdate.Status}
 */
proto.gemini.ToolStatusUpdate.prototype.getStatus = function() {
  return /** @type {!proto.gemini.ToolStatusUpdate.Status} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.gemini.ToolStatusUpdate.Status} value
 * @return {!proto.gemini.ToolStatusUpdate} returns this
 */
proto.gemini.ToolStatusUpdate.prototype.setStatus = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional string description = 4;
 * @return {string}
 */
proto.gemini.ToolStatusUpdate.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ToolStatusUpdate} returns this
 */
proto.gemini.ToolStatusUpdate.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional google.protobuf.Struct result = 5;
 * @return {?proto.google.protobuf.Struct}
 */
proto.gemini.ToolStatusUpdate.prototype.getResult = function() {
  return /** @type{?proto.google.protobuf.Struct} */ (
    jspb.Message.getWrapperField(this, google_protobuf_struct_pb.Struct, 5));
};


/**
 * @param {?proto.google.protobuf.Struct|undefined} value
 * @return {!proto.gemini.ToolStatusUpdate} returns this
*/
proto.gemini.ToolStatusUpdate.prototype.setResult = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ToolStatusUpdate} returns this
 */
proto.gemini.ToolStatusUpdate.prototype.clearResult = function() {
  return this.setResult(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ToolStatusUpdate.prototype.hasResult = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional string error_message = 6;
 * @return {string}
 */
proto.gemini.ToolStatusUpdate.prototype.getErrorMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ToolStatusUpdate} returns this
 */
proto.gemini.ToolStatusUpdate.prototype.setErrorMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional int64 duration_ms = 7;
 * @return {number}
 */
proto.gemini.ToolStatusUpdate.prototype.getDurationMs = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.ToolStatusUpdate} returns this
 */
proto.gemini.ToolStatusUpdate.prototype.setDurationMs = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.ToolOutputStream.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.ToolOutputStream.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.ToolOutputStream} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ToolOutputStream.toObject = function(includeInstance, msg) {
  var f, obj = {
    toolId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    toolName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    output: jspb.Message.getFieldWithDefault(msg, 3, ""),
    isError: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.ToolOutputStream}
 */
proto.gemini.ToolOutputStream.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.ToolOutputStream;
  return proto.gemini.ToolOutputStream.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.ToolOutputStream} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.ToolOutputStream}
 */
proto.gemini.ToolOutputStream.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setToolId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setToolName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setOutput(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsError(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.ToolOutputStream.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.ToolOutputStream.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.ToolOutputStream} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ToolOutputStream.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getToolId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getToolName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getOutput();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getIsError();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional string tool_id = 1;
 * @return {string}
 */
proto.gemini.ToolOutputStream.prototype.getToolId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ToolOutputStream} returns this
 */
proto.gemini.ToolOutputStream.prototype.setToolId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string tool_name = 2;
 * @return {string}
 */
proto.gemini.ToolOutputStream.prototype.getToolName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ToolOutputStream} returns this
 */
proto.gemini.ToolOutputStream.prototype.setToolName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string output = 3;
 * @return {string}
 */
proto.gemini.ToolOutputStream.prototype.getOutput = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ToolOutputStream} returns this
 */
proto.gemini.ToolOutputStream.prototype.setOutput = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bool is_error = 4;
 * @return {boolean}
 */
proto.gemini.ToolOutputStream.prototype.getIsError = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.ToolOutputStream} returns this
 */
proto.gemini.ToolOutputStream.prototype.setIsError = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gemini.ErrorMessage.repeatedFields_ = [6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.ErrorMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.ErrorMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.ErrorMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ErrorMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    message: jspb.Message.getFieldWithDefault(msg, 1, ""),
    details: jspb.Message.getFieldWithDefault(msg, 2, ""),
    stackTrace: jspb.Message.getFieldWithDefault(msg, 3, ""),
    code: jspb.Message.getFieldWithDefault(msg, 4, 0),
    isRetryable: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    suggestionsList: (f = jspb.Message.getRepeatedField(msg, 6)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.ErrorMessage}
 */
proto.gemini.ErrorMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.ErrorMessage;
  return proto.gemini.ErrorMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.ErrorMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.ErrorMessage}
 */
proto.gemini.ErrorMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDetails(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setStackTrace(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCode(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsRetryable(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.addSuggestions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.ErrorMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.ErrorMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.ErrorMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ErrorMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDetails();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getStackTrace();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getCode();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getIsRetryable();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getSuggestionsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      6,
      f
    );
  }
};


/**
 * optional string message = 1;
 * @return {string}
 */
proto.gemini.ErrorMessage.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ErrorMessage} returns this
 */
proto.gemini.ErrorMessage.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string details = 2;
 * @return {string}
 */
proto.gemini.ErrorMessage.prototype.getDetails = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ErrorMessage} returns this
 */
proto.gemini.ErrorMessage.prototype.setDetails = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string stack_trace = 3;
 * @return {string}
 */
proto.gemini.ErrorMessage.prototype.getStackTrace = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ErrorMessage} returns this
 */
proto.gemini.ErrorMessage.prototype.setStackTrace = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int32 code = 4;
 * @return {number}
 */
proto.gemini.ErrorMessage.prototype.getCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.ErrorMessage} returns this
 */
proto.gemini.ErrorMessage.prototype.setCode = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional bool is_retryable = 5;
 * @return {boolean}
 */
proto.gemini.ErrorMessage.prototype.getIsRetryable = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.ErrorMessage} returns this
 */
proto.gemini.ErrorMessage.prototype.setIsRetryable = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * repeated string suggestions = 6;
 * @return {!Array<string>}
 */
proto.gemini.ErrorMessage.prototype.getSuggestionsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 6));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.gemini.ErrorMessage} returns this
 */
proto.gemini.ErrorMessage.prototype.setSuggestionsList = function(value) {
  return jspb.Message.setField(this, 6, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.gemini.ErrorMessage} returns this
 */
proto.gemini.ErrorMessage.prototype.addSuggestions = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 6, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.ErrorMessage} returns this
 */
proto.gemini.ErrorMessage.prototype.clearSuggestionsList = function() {
  return this.setSuggestionsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.InfoMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.InfoMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.InfoMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.InfoMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    message: jspb.Message.getFieldWithDefault(msg, 1, ""),
    details: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.InfoMessage}
 */
proto.gemini.InfoMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.InfoMessage;
  return proto.gemini.InfoMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.InfoMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.InfoMessage}
 */
proto.gemini.InfoMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDetails(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.InfoMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.InfoMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.InfoMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.InfoMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDetails();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string message = 1;
 * @return {string}
 */
proto.gemini.InfoMessage.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.InfoMessage} returns this
 */
proto.gemini.InfoMessage.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string details = 2;
 * @return {string}
 */
proto.gemini.InfoMessage.prototype.getDetails = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.InfoMessage} returns this
 */
proto.gemini.InfoMessage.prototype.setDetails = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.WarningMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.WarningMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.WarningMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.WarningMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    message: jspb.Message.getFieldWithDefault(msg, 1, ""),
    details: jspb.Message.getFieldWithDefault(msg, 2, ""),
    showBorder: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.WarningMessage}
 */
proto.gemini.WarningMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.WarningMessage;
  return proto.gemini.WarningMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.WarningMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.WarningMessage}
 */
proto.gemini.WarningMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDetails(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setShowBorder(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.WarningMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.WarningMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.WarningMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.WarningMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDetails();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getShowBorder();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional string message = 1;
 * @return {string}
 */
proto.gemini.WarningMessage.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.WarningMessage} returns this
 */
proto.gemini.WarningMessage.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string details = 2;
 * @return {string}
 */
proto.gemini.WarningMessage.prototype.getDetails = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.WarningMessage} returns this
 */
proto.gemini.WarningMessage.prototype.setDetails = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool show_border = 3;
 * @return {boolean}
 */
proto.gemini.WarningMessage.prototype.getShowBorder = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.WarningMessage} returns this
 */
proto.gemini.WarningMessage.prototype.setShowBorder = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.ProgressUpdate.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.ProgressUpdate.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.ProgressUpdate} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ProgressUpdate.toObject = function(includeInstance, msg) {
  var f, obj = {
    operationId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    operation: jspb.Message.getFieldWithDefault(msg, 2, ""),
    status: jspb.Message.getFieldWithDefault(msg, 3, ""),
    progress: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    loadingPhrase: jspb.Message.getFieldWithDefault(msg, 5, ""),
    elapsedMs: jspb.Message.getFieldWithDefault(msg, 6, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.ProgressUpdate}
 */
proto.gemini.ProgressUpdate.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.ProgressUpdate;
  return proto.gemini.ProgressUpdate.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.ProgressUpdate} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.ProgressUpdate}
 */
proto.gemini.ProgressUpdate.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOperationId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setOperation(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setStatus(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setProgress(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setLoadingPhrase(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setElapsedMs(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.ProgressUpdate.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.ProgressUpdate.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.ProgressUpdate} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ProgressUpdate.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOperationId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getOperation();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getStatus();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getProgress();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = message.getLoadingPhrase();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getElapsedMs();
  if (f !== 0) {
    writer.writeInt64(
      6,
      f
    );
  }
};


/**
 * optional string operation_id = 1;
 * @return {string}
 */
proto.gemini.ProgressUpdate.prototype.getOperationId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ProgressUpdate} returns this
 */
proto.gemini.ProgressUpdate.prototype.setOperationId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string operation = 2;
 * @return {string}
 */
proto.gemini.ProgressUpdate.prototype.getOperation = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ProgressUpdate} returns this
 */
proto.gemini.ProgressUpdate.prototype.setOperation = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string status = 3;
 * @return {string}
 */
proto.gemini.ProgressUpdate.prototype.getStatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ProgressUpdate} returns this
 */
proto.gemini.ProgressUpdate.prototype.setStatus = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional float progress = 4;
 * @return {number}
 */
proto.gemini.ProgressUpdate.prototype.getProgress = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.ProgressUpdate} returns this
 */
proto.gemini.ProgressUpdate.prototype.setProgress = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional string loading_phrase = 5;
 * @return {string}
 */
proto.gemini.ProgressUpdate.prototype.getLoadingPhrase = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ProgressUpdate} returns this
 */
proto.gemini.ProgressUpdate.prototype.setLoadingPhrase = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional int64 elapsed_ms = 6;
 * @return {number}
 */
proto.gemini.ProgressUpdate.prototype.getElapsedMs = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.ProgressUpdate} returns this
 */
proto.gemini.ProgressUpdate.prototype.setElapsedMs = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gemini.HelpContent.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.HelpContent.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.HelpContent.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.HelpContent} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.HelpContent.toObject = function(includeInstance, msg) {
  var f, obj = {
    content: jspb.Message.getFieldWithDefault(msg, 1, ""),
    availableCommandsList: jspb.Message.toObjectList(msg.getAvailableCommandsList(),
    proto.gemini.Command.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.HelpContent}
 */
proto.gemini.HelpContent.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.HelpContent;
  return proto.gemini.HelpContent.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.HelpContent} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.HelpContent}
 */
proto.gemini.HelpContent.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setContent(value);
      break;
    case 2:
      var value = new proto.gemini.Command;
      reader.readMessage(value,proto.gemini.Command.deserializeBinaryFromReader);
      msg.addAvailableCommands(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.HelpContent.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.HelpContent.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.HelpContent} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.HelpContent.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContent();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getAvailableCommandsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gemini.Command.serializeBinaryToWriter
    );
  }
};


/**
 * optional string content = 1;
 * @return {string}
 */
proto.gemini.HelpContent.prototype.getContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.HelpContent} returns this
 */
proto.gemini.HelpContent.prototype.setContent = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated Command available_commands = 2;
 * @return {!Array<!proto.gemini.Command>}
 */
proto.gemini.HelpContent.prototype.getAvailableCommandsList = function() {
  return /** @type{!Array<!proto.gemini.Command>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gemini.Command, 2));
};


/**
 * @param {!Array<!proto.gemini.Command>} value
 * @return {!proto.gemini.HelpContent} returns this
*/
proto.gemini.HelpContent.prototype.setAvailableCommandsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gemini.Command=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gemini.Command}
 */
proto.gemini.HelpContent.prototype.addAvailableCommands = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gemini.Command, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.HelpContent} returns this
 */
proto.gemini.HelpContent.prototype.clearAvailableCommandsList = function() {
  return this.setAvailableCommandsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gemini.Command.repeatedFields_ = [4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.Command.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.Command.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.Command} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.Command.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    description: jspb.Message.getFieldWithDefault(msg, 2, ""),
    usage: jspb.Message.getFieldWithDefault(msg, 3, ""),
    aliasesList: (f = jspb.Message.getRepeatedField(msg, 4)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.Command}
 */
proto.gemini.Command.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.Command;
  return proto.gemini.Command.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.Command} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.Command}
 */
proto.gemini.Command.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsage(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.addAliases(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.Command.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.Command.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.Command} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.Command.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getUsage();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getAliasesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      4,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.gemini.Command.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.Command} returns this
 */
proto.gemini.Command.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string description = 2;
 * @return {string}
 */
proto.gemini.Command.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.Command} returns this
 */
proto.gemini.Command.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string usage = 3;
 * @return {string}
 */
proto.gemini.Command.prototype.getUsage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.Command} returns this
 */
proto.gemini.Command.prototype.setUsage = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * repeated string aliases = 4;
 * @return {!Array<string>}
 */
proto.gemini.Command.prototype.getAliasesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 4));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.gemini.Command} returns this
 */
proto.gemini.Command.prototype.setAliasesList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.gemini.Command} returns this
 */
proto.gemini.Command.prototype.addAliases = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.Command} returns this
 */
proto.gemini.Command.prototype.clearAliasesList = function() {
  return this.setAliasesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gemini.AutoCompleteResult.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.AutoCompleteResult.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.AutoCompleteResult.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.AutoCompleteResult} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.AutoCompleteResult.toObject = function(includeInstance, msg) {
  var f, obj = {
    completionsList: jspb.Message.toObjectList(msg.getCompletionsList(),
    proto.gemini.Completion.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.AutoCompleteResult}
 */
proto.gemini.AutoCompleteResult.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.AutoCompleteResult;
  return proto.gemini.AutoCompleteResult.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.AutoCompleteResult} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.AutoCompleteResult}
 */
proto.gemini.AutoCompleteResult.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gemini.Completion;
      reader.readMessage(value,proto.gemini.Completion.deserializeBinaryFromReader);
      msg.addCompletions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.AutoCompleteResult.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.AutoCompleteResult.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.AutoCompleteResult} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.AutoCompleteResult.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCompletionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.gemini.Completion.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Completion completions = 1;
 * @return {!Array<!proto.gemini.Completion>}
 */
proto.gemini.AutoCompleteResult.prototype.getCompletionsList = function() {
  return /** @type{!Array<!proto.gemini.Completion>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gemini.Completion, 1));
};


/**
 * @param {!Array<!proto.gemini.Completion>} value
 * @return {!proto.gemini.AutoCompleteResult} returns this
*/
proto.gemini.AutoCompleteResult.prototype.setCompletionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gemini.Completion=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gemini.Completion}
 */
proto.gemini.AutoCompleteResult.prototype.addCompletions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gemini.Completion, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.AutoCompleteResult} returns this
 */
proto.gemini.AutoCompleteResult.prototype.clearCompletionsList = function() {
  return this.setCompletionsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.Completion.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.Completion.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.Completion} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.Completion.toObject = function(includeInstance, msg) {
  var f, obj = {
    value: jspb.Message.getFieldWithDefault(msg, 1, ""),
    display: jspb.Message.getFieldWithDefault(msg, 2, ""),
    description: jspb.Message.getFieldWithDefault(msg, 3, ""),
    type: jspb.Message.getFieldWithDefault(msg, 4, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.Completion}
 */
proto.gemini.Completion.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.Completion;
  return proto.gemini.Completion.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.Completion} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.Completion}
 */
proto.gemini.Completion.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setValue(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDisplay(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 4:
      var value = /** @type {!proto.gemini.CompletionType} */ (reader.readEnum());
      msg.setType(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.Completion.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.Completion.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.Completion} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.Completion.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getValue();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDisplay();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
};


/**
 * optional string value = 1;
 * @return {string}
 */
proto.gemini.Completion.prototype.getValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.Completion} returns this
 */
proto.gemini.Completion.prototype.setValue = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string display = 2;
 * @return {string}
 */
proto.gemini.Completion.prototype.getDisplay = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.Completion} returns this
 */
proto.gemini.Completion.prototype.setDisplay = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string description = 3;
 * @return {string}
 */
proto.gemini.Completion.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.Completion} returns this
 */
proto.gemini.Completion.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional CompletionType type = 4;
 * @return {!proto.gemini.CompletionType}
 */
proto.gemini.Completion.prototype.getType = function() {
  return /** @type {!proto.gemini.CompletionType} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.gemini.CompletionType} value
 * @return {!proto.gemini.Completion} returns this
 */
proto.gemini.Completion.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.FileEditPreview.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.FileEditPreview.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.FileEditPreview} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileEditPreview.toObject = function(includeInstance, msg) {
  var f, obj = {
    filePath: jspb.Message.getFieldWithDefault(msg, 1, ""),
    diff: (f = msg.getDiff()) && proto.gemini.DiffPreview.toObject(includeInstance, f),
    requiresConfirmation: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.FileEditPreview}
 */
proto.gemini.FileEditPreview.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.FileEditPreview;
  return proto.gemini.FileEditPreview.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.FileEditPreview} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.FileEditPreview}
 */
proto.gemini.FileEditPreview.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setFilePath(value);
      break;
    case 2:
      var value = new proto.gemini.DiffPreview;
      reader.readMessage(value,proto.gemini.DiffPreview.deserializeBinaryFromReader);
      msg.setDiff(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setRequiresConfirmation(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.FileEditPreview.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.FileEditPreview.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.FileEditPreview} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileEditPreview.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFilePath();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDiff();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gemini.DiffPreview.serializeBinaryToWriter
    );
  }
  f = message.getRequiresConfirmation();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional string file_path = 1;
 * @return {string}
 */
proto.gemini.FileEditPreview.prototype.getFilePath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileEditPreview} returns this
 */
proto.gemini.FileEditPreview.prototype.setFilePath = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional DiffPreview diff = 2;
 * @return {?proto.gemini.DiffPreview}
 */
proto.gemini.FileEditPreview.prototype.getDiff = function() {
  return /** @type{?proto.gemini.DiffPreview} */ (
    jspb.Message.getWrapperField(this, proto.gemini.DiffPreview, 2));
};


/**
 * @param {?proto.gemini.DiffPreview|undefined} value
 * @return {!proto.gemini.FileEditPreview} returns this
*/
proto.gemini.FileEditPreview.prototype.setDiff = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.FileEditPreview} returns this
 */
proto.gemini.FileEditPreview.prototype.clearDiff = function() {
  return this.setDiff(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.FileEditPreview.prototype.hasDiff = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional bool requires_confirmation = 3;
 * @return {boolean}
 */
proto.gemini.FileEditPreview.prototype.getRequiresConfirmation = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.FileEditPreview} returns this
 */
proto.gemini.FileEditPreview.prototype.setRequiresConfirmation = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.FileOperationResult.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.FileOperationResult.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.FileOperationResult} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileOperationResult.toObject = function(includeInstance, msg) {
  var f, obj = {
    filePath: jspb.Message.getFieldWithDefault(msg, 1, ""),
    operation: jspb.Message.getFieldWithDefault(msg, 2, 0),
    success: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    errorMessage: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.FileOperationResult}
 */
proto.gemini.FileOperationResult.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.FileOperationResult;
  return proto.gemini.FileOperationResult.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.FileOperationResult} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.FileOperationResult}
 */
proto.gemini.FileOperationResult.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setFilePath(value);
      break;
    case 2:
      var value = /** @type {!proto.gemini.FileOperation} */ (reader.readEnum());
      msg.setOperation(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setErrorMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.FileOperationResult.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.FileOperationResult.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.FileOperationResult} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileOperationResult.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFilePath();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getOperation();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getErrorMessage();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string file_path = 1;
 * @return {string}
 */
proto.gemini.FileOperationResult.prototype.getFilePath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileOperationResult} returns this
 */
proto.gemini.FileOperationResult.prototype.setFilePath = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional FileOperation operation = 2;
 * @return {!proto.gemini.FileOperation}
 */
proto.gemini.FileOperationResult.prototype.getOperation = function() {
  return /** @type {!proto.gemini.FileOperation} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.gemini.FileOperation} value
 * @return {!proto.gemini.FileOperationResult} returns this
 */
proto.gemini.FileOperationResult.prototype.setOperation = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional bool success = 3;
 * @return {boolean}
 */
proto.gemini.FileOperationResult.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.FileOperationResult} returns this
 */
proto.gemini.FileOperationResult.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional string error_message = 4;
 * @return {string}
 */
proto.gemini.FileOperationResult.prototype.getErrorMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileOperationResult} returns this
 */
proto.gemini.FileOperationResult.prototype.setErrorMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.gemini.ConfigUpdateRequest.oneofGroups_ = [[1,2,3,4,5,6]];

/**
 * @enum {number}
 */
proto.gemini.ConfigUpdateRequest.UpdateCase = {
  UPDATE_NOT_SET: 0,
  THEME: 1,
  EDITOR_TYPE: 2,
  APPROVAL_MODE: 3,
  SHOW_TOOL_DESCRIPTIONS: 4,
  SHOW_ERROR_DETAILS: 5,
  AUTH_CONFIG: 6
};

/**
 * @return {proto.gemini.ConfigUpdateRequest.UpdateCase}
 */
proto.gemini.ConfigUpdateRequest.prototype.getUpdateCase = function() {
  return /** @type {proto.gemini.ConfigUpdateRequest.UpdateCase} */(jspb.Message.computeOneofCase(this, proto.gemini.ConfigUpdateRequest.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.ConfigUpdateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.ConfigUpdateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.ConfigUpdateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ConfigUpdateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    theme: jspb.Message.getFieldWithDefault(msg, 1, ""),
    editorType: jspb.Message.getFieldWithDefault(msg, 2, ""),
    approvalMode: jspb.Message.getFieldWithDefault(msg, 3, 0),
    showToolDescriptions: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    showErrorDetails: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    authConfig: (f = msg.getAuthConfig()) && proto.gemini.AuthConfig.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.ConfigUpdateRequest}
 */
proto.gemini.ConfigUpdateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.ConfigUpdateRequest;
  return proto.gemini.ConfigUpdateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.ConfigUpdateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.ConfigUpdateRequest}
 */
proto.gemini.ConfigUpdateRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTheme(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setEditorType(value);
      break;
    case 3:
      var value = /** @type {!proto.gemini.ApprovalMode} */ (reader.readEnum());
      msg.setApprovalMode(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setShowToolDescriptions(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setShowErrorDetails(value);
      break;
    case 6:
      var value = new proto.gemini.AuthConfig;
      reader.readMessage(value,proto.gemini.AuthConfig.deserializeBinaryFromReader);
      msg.setAuthConfig(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.ConfigUpdateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.ConfigUpdateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.ConfigUpdateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ConfigUpdateRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
    );
  }
  f = /** @type {!proto.gemini.ApprovalMode} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeBool(
      4,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getAuthConfig();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.gemini.AuthConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional string theme = 1;
 * @return {string}
 */
proto.gemini.ConfigUpdateRequest.prototype.getTheme = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ConfigUpdateRequest} returns this
 */
proto.gemini.ConfigUpdateRequest.prototype.setTheme = function(value) {
  return jspb.Message.setOneofField(this, 1, proto.gemini.ConfigUpdateRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gemini.ConfigUpdateRequest} returns this
 */
proto.gemini.ConfigUpdateRequest.prototype.clearTheme = function() {
  return jspb.Message.setOneofField(this, 1, proto.gemini.ConfigUpdateRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ConfigUpdateRequest.prototype.hasTheme = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string editor_type = 2;
 * @return {string}
 */
proto.gemini.ConfigUpdateRequest.prototype.getEditorType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ConfigUpdateRequest} returns this
 */
proto.gemini.ConfigUpdateRequest.prototype.setEditorType = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.gemini.ConfigUpdateRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gemini.ConfigUpdateRequest} returns this
 */
proto.gemini.ConfigUpdateRequest.prototype.clearEditorType = function() {
  return jspb.Message.setOneofField(this, 2, proto.gemini.ConfigUpdateRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ConfigUpdateRequest.prototype.hasEditorType = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional ApprovalMode approval_mode = 3;
 * @return {!proto.gemini.ApprovalMode}
 */
proto.gemini.ConfigUpdateRequest.prototype.getApprovalMode = function() {
  return /** @type {!proto.gemini.ApprovalMode} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.gemini.ApprovalMode} value
 * @return {!proto.gemini.ConfigUpdateRequest} returns this
 */
proto.gemini.ConfigUpdateRequest.prototype.setApprovalMode = function(value) {
  return jspb.Message.setOneofField(this, 3, proto.gemini.ConfigUpdateRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gemini.ConfigUpdateRequest} returns this
 */
proto.gemini.ConfigUpdateRequest.prototype.clearApprovalMode = function() {
  return jspb.Message.setOneofField(this, 3, proto.gemini.ConfigUpdateRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ConfigUpdateRequest.prototype.hasApprovalMode = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional bool show_tool_descriptions = 4;
 * @return {boolean}
 */
proto.gemini.ConfigUpdateRequest.prototype.getShowToolDescriptions = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.ConfigUpdateRequest} returns this
 */
proto.gemini.ConfigUpdateRequest.prototype.setShowToolDescriptions = function(value) {
  return jspb.Message.setOneofField(this, 4, proto.gemini.ConfigUpdateRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gemini.ConfigUpdateRequest} returns this
 */
proto.gemini.ConfigUpdateRequest.prototype.clearShowToolDescriptions = function() {
  return jspb.Message.setOneofField(this, 4, proto.gemini.ConfigUpdateRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ConfigUpdateRequest.prototype.hasShowToolDescriptions = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional bool show_error_details = 5;
 * @return {boolean}
 */
proto.gemini.ConfigUpdateRequest.prototype.getShowErrorDetails = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.ConfigUpdateRequest} returns this
 */
proto.gemini.ConfigUpdateRequest.prototype.setShowErrorDetails = function(value) {
  return jspb.Message.setOneofField(this, 5, proto.gemini.ConfigUpdateRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gemini.ConfigUpdateRequest} returns this
 */
proto.gemini.ConfigUpdateRequest.prototype.clearShowErrorDetails = function() {
  return jspb.Message.setOneofField(this, 5, proto.gemini.ConfigUpdateRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ConfigUpdateRequest.prototype.hasShowErrorDetails = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional AuthConfig auth_config = 6;
 * @return {?proto.gemini.AuthConfig}
 */
proto.gemini.ConfigUpdateRequest.prototype.getAuthConfig = function() {
  return /** @type{?proto.gemini.AuthConfig} */ (
    jspb.Message.getWrapperField(this, proto.gemini.AuthConfig, 6));
};


/**
 * @param {?proto.gemini.AuthConfig|undefined} value
 * @return {!proto.gemini.ConfigUpdateRequest} returns this
*/
proto.gemini.ConfigUpdateRequest.prototype.setAuthConfig = function(value) {
  return jspb.Message.setOneofWrapperField(this, 6, proto.gemini.ConfigUpdateRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ConfigUpdateRequest} returns this
 */
proto.gemini.ConfigUpdateRequest.prototype.clearAuthConfig = function() {
  return this.setAuthConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ConfigUpdateRequest.prototype.hasAuthConfig = function() {
  return jspb.Message.getField(this, 6) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.AuthConfig.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.AuthConfig.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.AuthConfig} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.AuthConfig.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, 0),
    apiKey: jspb.Message.getFieldWithDefault(msg, 2, ""),
    projectId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    location: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.AuthConfig}
 */
proto.gemini.AuthConfig.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.AuthConfig;
  return proto.gemini.AuthConfig.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.AuthConfig} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.AuthConfig}
 */
proto.gemini.AuthConfig.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.gemini.AuthConfig.AuthType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setApiKey(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setProjectId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setLocation(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.AuthConfig.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.AuthConfig.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.AuthConfig} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.AuthConfig.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getApiKey();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getProjectId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getLocation();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.gemini.AuthConfig.AuthType = {
  OAUTH: 0,
  API_KEY: 1,
  VERTEX_AI: 2
};

/**
 * optional AuthType type = 1;
 * @return {!proto.gemini.AuthConfig.AuthType}
 */
proto.gemini.AuthConfig.prototype.getType = function() {
  return /** @type {!proto.gemini.AuthConfig.AuthType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.gemini.AuthConfig.AuthType} value
 * @return {!proto.gemini.AuthConfig} returns this
 */
proto.gemini.AuthConfig.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional string api_key = 2;
 * @return {string}
 */
proto.gemini.AuthConfig.prototype.getApiKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.AuthConfig} returns this
 */
proto.gemini.AuthConfig.prototype.setApiKey = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string project_id = 3;
 * @return {string}
 */
proto.gemini.AuthConfig.prototype.getProjectId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.AuthConfig} returns this
 */
proto.gemini.AuthConfig.prototype.setProjectId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string location = 4;
 * @return {string}
 */
proto.gemini.AuthConfig.prototype.getLocation = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.AuthConfig} returns this
 */
proto.gemini.AuthConfig.prototype.setLocation = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.GetConfigRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.GetConfigRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.GetConfigRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.GetConfigRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionId: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.GetConfigRequest}
 */
proto.gemini.GetConfigRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.GetConfigRequest;
  return proto.gemini.GetConfigRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.GetConfigRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.GetConfigRequest}
 */
proto.gemini.GetConfigRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.GetConfigRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.GetConfigRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.GetConfigRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.GetConfigRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string session_id = 1;
 * @return {string}
 */
proto.gemini.GetConfigRequest.prototype.getSessionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.GetConfigRequest} returns this
 */
proto.gemini.GetConfigRequest.prototype.setSessionId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.GetConfigResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.GetConfigResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.GetConfigResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.GetConfigResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    config: (f = msg.getConfig()) && proto.gemini.CurrentConfig.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.GetConfigResponse}
 */
proto.gemini.GetConfigResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.GetConfigResponse;
  return proto.gemini.GetConfigResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.GetConfigResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.GetConfigResponse}
 */
proto.gemini.GetConfigResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gemini.CurrentConfig;
      reader.readMessage(value,proto.gemini.CurrentConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.GetConfigResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.GetConfigResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.GetConfigResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.GetConfigResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.gemini.CurrentConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional CurrentConfig config = 1;
 * @return {?proto.gemini.CurrentConfig}
 */
proto.gemini.GetConfigResponse.prototype.getConfig = function() {
  return /** @type{?proto.gemini.CurrentConfig} */ (
    jspb.Message.getWrapperField(this, proto.gemini.CurrentConfig, 1));
};


/**
 * @param {?proto.gemini.CurrentConfig|undefined} value
 * @return {!proto.gemini.GetConfigResponse} returns this
*/
proto.gemini.GetConfigResponse.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.GetConfigResponse} returns this
 */
proto.gemini.GetConfigResponse.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.GetConfigResponse.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gemini.CurrentConfig.repeatedFields_ = [7,8];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.CurrentConfig.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.CurrentConfig.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.CurrentConfig} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.CurrentConfig.toObject = function(includeInstance, msg) {
  var f, obj = {
    model: jspb.Message.getFieldWithDefault(msg, 1, ""),
    approvalMode: jspb.Message.getFieldWithDefault(msg, 2, 0),
    theme: jspb.Message.getFieldWithDefault(msg, 3, ""),
    editorType: jspb.Message.getFieldWithDefault(msg, 4, ""),
    showToolDescriptions: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    showErrorDetails: jspb.Message.getBooleanFieldWithDefault(msg, 6, false),
    enabledToolsList: (f = jspb.Message.getRepeatedField(msg, 7)) == null ? undefined : f,
    mcpServersList: jspb.Message.toObjectList(msg.getMcpServersList(),
    proto.gemini.McpServerInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.CurrentConfig}
 */
proto.gemini.CurrentConfig.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.CurrentConfig;
  return proto.gemini.CurrentConfig.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.CurrentConfig} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.CurrentConfig}
 */
proto.gemini.CurrentConfig.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setModel(value);
      break;
    case 2:
      var value = /** @type {!proto.gemini.ApprovalMode} */ (reader.readEnum());
      msg.setApprovalMode(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTheme(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setEditorType(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setShowToolDescriptions(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setShowErrorDetails(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.addEnabledTools(value);
      break;
    case 8:
      var value = new proto.gemini.McpServerInfo;
      reader.readMessage(value,proto.gemini.McpServerInfo.deserializeBinaryFromReader);
      msg.addMcpServers(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.CurrentConfig.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.CurrentConfig.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.CurrentConfig} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.CurrentConfig.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getModel();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getApprovalMode();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getTheme();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getEditorType();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getShowToolDescriptions();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getShowErrorDetails();
  if (f) {
    writer.writeBool(
      6,
      f
    );
  }
  f = message.getEnabledToolsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      7,
      f
    );
  }
  f = message.getMcpServersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.gemini.McpServerInfo.serializeBinaryToWriter
    );
  }
};


/**
 * optional string model = 1;
 * @return {string}
 */
proto.gemini.CurrentConfig.prototype.getModel = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.CurrentConfig} returns this
 */
proto.gemini.CurrentConfig.prototype.setModel = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional ApprovalMode approval_mode = 2;
 * @return {!proto.gemini.ApprovalMode}
 */
proto.gemini.CurrentConfig.prototype.getApprovalMode = function() {
  return /** @type {!proto.gemini.ApprovalMode} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.gemini.ApprovalMode} value
 * @return {!proto.gemini.CurrentConfig} returns this
 */
proto.gemini.CurrentConfig.prototype.setApprovalMode = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional string theme = 3;
 * @return {string}
 */
proto.gemini.CurrentConfig.prototype.getTheme = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.CurrentConfig} returns this
 */
proto.gemini.CurrentConfig.prototype.setTheme = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string editor_type = 4;
 * @return {string}
 */
proto.gemini.CurrentConfig.prototype.getEditorType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.CurrentConfig} returns this
 */
proto.gemini.CurrentConfig.prototype.setEditorType = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional bool show_tool_descriptions = 5;
 * @return {boolean}
 */
proto.gemini.CurrentConfig.prototype.getShowToolDescriptions = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.CurrentConfig} returns this
 */
proto.gemini.CurrentConfig.prototype.setShowToolDescriptions = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional bool show_error_details = 6;
 * @return {boolean}
 */
proto.gemini.CurrentConfig.prototype.getShowErrorDetails = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.CurrentConfig} returns this
 */
proto.gemini.CurrentConfig.prototype.setShowErrorDetails = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
};


/**
 * repeated string enabled_tools = 7;
 * @return {!Array<string>}
 */
proto.gemini.CurrentConfig.prototype.getEnabledToolsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 7));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.gemini.CurrentConfig} returns this
 */
proto.gemini.CurrentConfig.prototype.setEnabledToolsList = function(value) {
  return jspb.Message.setField(this, 7, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.gemini.CurrentConfig} returns this
 */
proto.gemini.CurrentConfig.prototype.addEnabledTools = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 7, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.CurrentConfig} returns this
 */
proto.gemini.CurrentConfig.prototype.clearEnabledToolsList = function() {
  return this.setEnabledToolsList([]);
};


/**
 * repeated McpServerInfo mcp_servers = 8;
 * @return {!Array<!proto.gemini.McpServerInfo>}
 */
proto.gemini.CurrentConfig.prototype.getMcpServersList = function() {
  return /** @type{!Array<!proto.gemini.McpServerInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gemini.McpServerInfo, 8));
};


/**
 * @param {!Array<!proto.gemini.McpServerInfo>} value
 * @return {!proto.gemini.CurrentConfig} returns this
*/
proto.gemini.CurrentConfig.prototype.setMcpServersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.gemini.McpServerInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gemini.McpServerInfo}
 */
proto.gemini.CurrentConfig.prototype.addMcpServers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.gemini.McpServerInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.CurrentConfig} returns this
 */
proto.gemini.CurrentConfig.prototype.clearMcpServersList = function() {
  return this.setMcpServersList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.ConfigUpdateResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.ConfigUpdateResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.ConfigUpdateResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ConfigUpdateResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    changeNotification: (f = msg.getChangeNotification()) && proto.gemini.ConfigChanged.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.ConfigUpdateResponse}
 */
proto.gemini.ConfigUpdateResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.ConfigUpdateResponse;
  return proto.gemini.ConfigUpdateResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.ConfigUpdateResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.ConfigUpdateResponse}
 */
proto.gemini.ConfigUpdateResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = new proto.gemini.ConfigChanged;
      reader.readMessage(value,proto.gemini.ConfigChanged.deserializeBinaryFromReader);
      msg.setChangeNotification(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.ConfigUpdateResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.ConfigUpdateResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.ConfigUpdateResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ConfigUpdateResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getChangeNotification();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.gemini.ConfigChanged.serializeBinaryToWriter
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.gemini.ConfigUpdateResponse.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.ConfigUpdateResponse} returns this
 */
proto.gemini.ConfigUpdateResponse.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.gemini.ConfigUpdateResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ConfigUpdateResponse} returns this
 */
proto.gemini.ConfigUpdateResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional ConfigChanged change_notification = 3;
 * @return {?proto.gemini.ConfigChanged}
 */
proto.gemini.ConfigUpdateResponse.prototype.getChangeNotification = function() {
  return /** @type{?proto.gemini.ConfigChanged} */ (
    jspb.Message.getWrapperField(this, proto.gemini.ConfigChanged, 3));
};


/**
 * @param {?proto.gemini.ConfigChanged|undefined} value
 * @return {!proto.gemini.ConfigUpdateResponse} returns this
*/
proto.gemini.ConfigUpdateResponse.prototype.setChangeNotification = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ConfigUpdateResponse} returns this
 */
proto.gemini.ConfigUpdateResponse.prototype.clearChangeNotification = function() {
  return this.setChangeNotification(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ConfigUpdateResponse.prototype.hasChangeNotification = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.ConfigChanged.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.ConfigChanged.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.ConfigChanged} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ConfigChanged.toObject = function(includeInstance, msg) {
  var f, obj = {
    field: jspb.Message.getFieldWithDefault(msg, 1, ""),
    oldValue: jspb.Message.getFieldWithDefault(msg, 2, ""),
    newValue: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.ConfigChanged}
 */
proto.gemini.ConfigChanged.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.ConfigChanged;
  return proto.gemini.ConfigChanged.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.ConfigChanged} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.ConfigChanged}
 */
proto.gemini.ConfigChanged.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setField(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setOldValue(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setNewValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.ConfigChanged.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.ConfigChanged.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.ConfigChanged} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ConfigChanged.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getField();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getOldValue();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getNewValue();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string field = 1;
 * @return {string}
 */
proto.gemini.ConfigChanged.prototype.getField = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ConfigChanged} returns this
 */
proto.gemini.ConfigChanged.prototype.setField = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string old_value = 2;
 * @return {string}
 */
proto.gemini.ConfigChanged.prototype.getOldValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ConfigChanged} returns this
 */
proto.gemini.ConfigChanged.prototype.setOldValue = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string new_value = 3;
 * @return {string}
 */
proto.gemini.ConfigChanged.prototype.getNewValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ConfigChanged} returns this
 */
proto.gemini.ConfigChanged.prototype.setNewValue = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gemini.ContextSummary.repeatedFields_ = [1,2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.ContextSummary.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.ContextSummary.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.ContextSummary} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ContextSummary.toObject = function(includeInstance, msg) {
  var f, obj = {
    loadedFilesList: jspb.Message.toObjectList(msg.getLoadedFilesList(),
    proto.gemini.LoadedFile.toObject, includeInstance),
    mcpServersList: jspb.Message.toObjectList(msg.getMcpServersList(),
    proto.gemini.McpServerInfo.toObject, includeInstance),
    gitBranch: jspb.Message.getFieldWithDefault(msg, 3, ""),
    workingDirectory: jspb.Message.getFieldWithDefault(msg, 4, ""),
    memoryInfo: (f = msg.getMemoryInfo()) && proto.gemini.MemoryInfo.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.ContextSummary}
 */
proto.gemini.ContextSummary.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.ContextSummary;
  return proto.gemini.ContextSummary.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.ContextSummary} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.ContextSummary}
 */
proto.gemini.ContextSummary.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gemini.LoadedFile;
      reader.readMessage(value,proto.gemini.LoadedFile.deserializeBinaryFromReader);
      msg.addLoadedFiles(value);
      break;
    case 2:
      var value = new proto.gemini.McpServerInfo;
      reader.readMessage(value,proto.gemini.McpServerInfo.deserializeBinaryFromReader);
      msg.addMcpServers(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setGitBranch(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setWorkingDirectory(value);
      break;
    case 5:
      var value = new proto.gemini.MemoryInfo;
      reader.readMessage(value,proto.gemini.MemoryInfo.deserializeBinaryFromReader);
      msg.setMemoryInfo(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.ContextSummary.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.ContextSummary.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.ContextSummary} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ContextSummary.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLoadedFilesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.gemini.LoadedFile.serializeBinaryToWriter
    );
  }
  f = message.getMcpServersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gemini.McpServerInfo.serializeBinaryToWriter
    );
  }
  f = message.getGitBranch();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getWorkingDirectory();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getMemoryInfo();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.gemini.MemoryInfo.serializeBinaryToWriter
    );
  }
};


/**
 * repeated LoadedFile loaded_files = 1;
 * @return {!Array<!proto.gemini.LoadedFile>}
 */
proto.gemini.ContextSummary.prototype.getLoadedFilesList = function() {
  return /** @type{!Array<!proto.gemini.LoadedFile>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gemini.LoadedFile, 1));
};


/**
 * @param {!Array<!proto.gemini.LoadedFile>} value
 * @return {!proto.gemini.ContextSummary} returns this
*/
proto.gemini.ContextSummary.prototype.setLoadedFilesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gemini.LoadedFile=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gemini.LoadedFile}
 */
proto.gemini.ContextSummary.prototype.addLoadedFiles = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gemini.LoadedFile, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.ContextSummary} returns this
 */
proto.gemini.ContextSummary.prototype.clearLoadedFilesList = function() {
  return this.setLoadedFilesList([]);
};


/**
 * repeated McpServerInfo mcp_servers = 2;
 * @return {!Array<!proto.gemini.McpServerInfo>}
 */
proto.gemini.ContextSummary.prototype.getMcpServersList = function() {
  return /** @type{!Array<!proto.gemini.McpServerInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gemini.McpServerInfo, 2));
};


/**
 * @param {!Array<!proto.gemini.McpServerInfo>} value
 * @return {!proto.gemini.ContextSummary} returns this
*/
proto.gemini.ContextSummary.prototype.setMcpServersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gemini.McpServerInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gemini.McpServerInfo}
 */
proto.gemini.ContextSummary.prototype.addMcpServers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gemini.McpServerInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.ContextSummary} returns this
 */
proto.gemini.ContextSummary.prototype.clearMcpServersList = function() {
  return this.setMcpServersList([]);
};


/**
 * optional string git_branch = 3;
 * @return {string}
 */
proto.gemini.ContextSummary.prototype.getGitBranch = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ContextSummary} returns this
 */
proto.gemini.ContextSummary.prototype.setGitBranch = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string working_directory = 4;
 * @return {string}
 */
proto.gemini.ContextSummary.prototype.getWorkingDirectory = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ContextSummary} returns this
 */
proto.gemini.ContextSummary.prototype.setWorkingDirectory = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional MemoryInfo memory_info = 5;
 * @return {?proto.gemini.MemoryInfo}
 */
proto.gemini.ContextSummary.prototype.getMemoryInfo = function() {
  return /** @type{?proto.gemini.MemoryInfo} */ (
    jspb.Message.getWrapperField(this, proto.gemini.MemoryInfo, 5));
};


/**
 * @param {?proto.gemini.MemoryInfo|undefined} value
 * @return {!proto.gemini.ContextSummary} returns this
*/
proto.gemini.ContextSummary.prototype.setMemoryInfo = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ContextSummary} returns this
 */
proto.gemini.ContextSummary.prototype.clearMemoryInfo = function() {
  return this.setMemoryInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ContextSummary.prototype.hasMemoryInfo = function() {
  return jspb.Message.getField(this, 5) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.LoadedFile.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.LoadedFile.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.LoadedFile} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.LoadedFile.toObject = function(includeInstance, msg) {
  var f, obj = {
    path: jspb.Message.getFieldWithDefault(msg, 1, ""),
    type: jspb.Message.getFieldWithDefault(msg, 2, ""),
    size: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.LoadedFile}
 */
proto.gemini.LoadedFile.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.LoadedFile;
  return proto.gemini.LoadedFile.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.LoadedFile} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.LoadedFile}
 */
proto.gemini.LoadedFile.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setPath(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setType(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setSize(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.LoadedFile.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.LoadedFile.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.LoadedFile} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.LoadedFile.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPath();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getType();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSize();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
};


/**
 * optional string path = 1;
 * @return {string}
 */
proto.gemini.LoadedFile.prototype.getPath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.LoadedFile} returns this
 */
proto.gemini.LoadedFile.prototype.setPath = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string type = 2;
 * @return {string}
 */
proto.gemini.LoadedFile.prototype.getType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.LoadedFile} returns this
 */
proto.gemini.LoadedFile.prototype.setType = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional int32 size = 3;
 * @return {number}
 */
proto.gemini.LoadedFile.prototype.getSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.LoadedFile} returns this
 */
proto.gemini.LoadedFile.prototype.setSize = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gemini.McpServerInfo.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.McpServerInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.McpServerInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.McpServerInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.McpServerInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    status: jspb.Message.getFieldWithDefault(msg, 2, ""),
    availableToolsList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.McpServerInfo}
 */
proto.gemini.McpServerInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.McpServerInfo;
  return proto.gemini.McpServerInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.McpServerInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.McpServerInfo}
 */
proto.gemini.McpServerInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setStatus(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.addAvailableTools(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.McpServerInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.McpServerInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.McpServerInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.McpServerInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getStatus();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getAvailableToolsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      3,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.gemini.McpServerInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.McpServerInfo} returns this
 */
proto.gemini.McpServerInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string status = 2;
 * @return {string}
 */
proto.gemini.McpServerInfo.prototype.getStatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.McpServerInfo} returns this
 */
proto.gemini.McpServerInfo.prototype.setStatus = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated string available_tools = 3;
 * @return {!Array<string>}
 */
proto.gemini.McpServerInfo.prototype.getAvailableToolsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.gemini.McpServerInfo} returns this
 */
proto.gemini.McpServerInfo.prototype.setAvailableToolsList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.gemini.McpServerInfo} returns this
 */
proto.gemini.McpServerInfo.prototype.addAvailableTools = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.McpServerInfo} returns this
 */
proto.gemini.McpServerInfo.prototype.clearAvailableToolsList = function() {
  return this.setAvailableToolsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.MemoryInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.MemoryInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.MemoryInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.MemoryInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    hasUserMemory: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    memorySize: jspb.Message.getFieldWithDefault(msg, 2, 0),
    lastUpdated: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.MemoryInfo}
 */
proto.gemini.MemoryInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.MemoryInfo;
  return proto.gemini.MemoryInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.MemoryInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.MemoryInfo}
 */
proto.gemini.MemoryInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setHasUserMemory(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMemorySize(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setLastUpdated(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.MemoryInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.MemoryInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.MemoryInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.MemoryInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHasUserMemory();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMemorySize();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getLastUpdated();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional bool has_user_memory = 1;
 * @return {boolean}
 */
proto.gemini.MemoryInfo.prototype.getHasUserMemory = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.MemoryInfo} returns this
 */
proto.gemini.MemoryInfo.prototype.setHasUserMemory = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional int32 memory_size = 2;
 * @return {number}
 */
proto.gemini.MemoryInfo.prototype.getMemorySize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.MemoryInfo} returns this
 */
proto.gemini.MemoryInfo.prototype.setMemorySize = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string last_updated = 3;
 * @return {string}
 */
proto.gemini.MemoryInfo.prototype.getLastUpdated = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.MemoryInfo} returns this
 */
proto.gemini.MemoryInfo.prototype.setLastUpdated = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.UsageMetadata.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.UsageMetadata.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.UsageMetadata} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.UsageMetadata.toObject = function(includeInstance, msg) {
  var f, obj = {
    tokenUsage: (f = msg.getTokenUsage()) && proto.gemini.TokenUsage.toObject(includeInstance, f),
    apiTimeMs: jspb.Message.getFieldWithDefault(msg, 2, 0),
    modelUsed: jspb.Message.getFieldWithDefault(msg, 3, ""),
    usedFallback: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.UsageMetadata}
 */
proto.gemini.UsageMetadata.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.UsageMetadata;
  return proto.gemini.UsageMetadata.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.UsageMetadata} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.UsageMetadata}
 */
proto.gemini.UsageMetadata.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gemini.TokenUsage;
      reader.readMessage(value,proto.gemini.TokenUsage.deserializeBinaryFromReader);
      msg.setTokenUsage(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setApiTimeMs(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setModelUsed(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setUsedFallback(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.UsageMetadata.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.UsageMetadata.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.UsageMetadata} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.UsageMetadata.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTokenUsage();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.gemini.TokenUsage.serializeBinaryToWriter
    );
  }
  f = message.getApiTimeMs();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getModelUsed();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getUsedFallback();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional TokenUsage token_usage = 1;
 * @return {?proto.gemini.TokenUsage}
 */
proto.gemini.UsageMetadata.prototype.getTokenUsage = function() {
  return /** @type{?proto.gemini.TokenUsage} */ (
    jspb.Message.getWrapperField(this, proto.gemini.TokenUsage, 1));
};


/**
 * @param {?proto.gemini.TokenUsage|undefined} value
 * @return {!proto.gemini.UsageMetadata} returns this
*/
proto.gemini.UsageMetadata.prototype.setTokenUsage = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.UsageMetadata} returns this
 */
proto.gemini.UsageMetadata.prototype.clearTokenUsage = function() {
  return this.setTokenUsage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.UsageMetadata.prototype.hasTokenUsage = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int64 api_time_ms = 2;
 * @return {number}
 */
proto.gemini.UsageMetadata.prototype.getApiTimeMs = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.UsageMetadata} returns this
 */
proto.gemini.UsageMetadata.prototype.setApiTimeMs = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string model_used = 3;
 * @return {string}
 */
proto.gemini.UsageMetadata.prototype.getModelUsed = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.UsageMetadata} returns this
 */
proto.gemini.UsageMetadata.prototype.setModelUsed = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bool used_fallback = 4;
 * @return {boolean}
 */
proto.gemini.UsageMetadata.prototype.getUsedFallback = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.UsageMetadata} returns this
 */
proto.gemini.UsageMetadata.prototype.setUsedFallback = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gemini.AnalyticsReport.repeatedFields_ = [3,4,6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.AnalyticsReport.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.AnalyticsReport.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.AnalyticsReport} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.AnalyticsReport.toObject = function(includeInstance, msg) {
  var f, obj = {
    timestamp: jspb.Message.getFieldWithDefault(msg, 1, 0),
    performanceMetrics: (f = msg.getPerformanceMetrics()) && proto.gemini.PerformanceMetrics.toObject(includeInstance, f),
    toolUsageList: jspb.Message.toObjectList(msg.getToolUsageList(),
    proto.gemini.ToolUsageStats.toObject, includeInstance),
    modelUsageList: jspb.Message.toObjectList(msg.getModelUsageList(),
    proto.gemini.ModelUsageStats.toObject, includeInstance),
    sessionSummary: (f = msg.getSessionSummary()) && proto.gemini.SessionSummary.toObject(includeInstance, f),
    recentActivityList: jspb.Message.toObjectList(msg.getRecentActivityList(),
    proto.gemini.ActivityEntry.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.AnalyticsReport}
 */
proto.gemini.AnalyticsReport.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.AnalyticsReport;
  return proto.gemini.AnalyticsReport.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.AnalyticsReport} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.AnalyticsReport}
 */
proto.gemini.AnalyticsReport.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTimestamp(value);
      break;
    case 2:
      var value = new proto.gemini.PerformanceMetrics;
      reader.readMessage(value,proto.gemini.PerformanceMetrics.deserializeBinaryFromReader);
      msg.setPerformanceMetrics(value);
      break;
    case 3:
      var value = new proto.gemini.ToolUsageStats;
      reader.readMessage(value,proto.gemini.ToolUsageStats.deserializeBinaryFromReader);
      msg.addToolUsage(value);
      break;
    case 4:
      var value = new proto.gemini.ModelUsageStats;
      reader.readMessage(value,proto.gemini.ModelUsageStats.deserializeBinaryFromReader);
      msg.addModelUsage(value);
      break;
    case 5:
      var value = new proto.gemini.SessionSummary;
      reader.readMessage(value,proto.gemini.SessionSummary.deserializeBinaryFromReader);
      msg.setSessionSummary(value);
      break;
    case 6:
      var value = new proto.gemini.ActivityEntry;
      reader.readMessage(value,proto.gemini.ActivityEntry.deserializeBinaryFromReader);
      msg.addRecentActivity(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.AnalyticsReport.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.AnalyticsReport.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.AnalyticsReport} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.AnalyticsReport.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTimestamp();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getPerformanceMetrics();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gemini.PerformanceMetrics.serializeBinaryToWriter
    );
  }
  f = message.getToolUsageList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.gemini.ToolUsageStats.serializeBinaryToWriter
    );
  }
  f = message.getModelUsageList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.gemini.ModelUsageStats.serializeBinaryToWriter
    );
  }
  f = message.getSessionSummary();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.gemini.SessionSummary.serializeBinaryToWriter
    );
  }
  f = message.getRecentActivityList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.gemini.ActivityEntry.serializeBinaryToWriter
    );
  }
};


/**
 * optional int64 timestamp = 1;
 * @return {number}
 */
proto.gemini.AnalyticsReport.prototype.getTimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.AnalyticsReport} returns this
 */
proto.gemini.AnalyticsReport.prototype.setTimestamp = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional PerformanceMetrics performance_metrics = 2;
 * @return {?proto.gemini.PerformanceMetrics}
 */
proto.gemini.AnalyticsReport.prototype.getPerformanceMetrics = function() {
  return /** @type{?proto.gemini.PerformanceMetrics} */ (
    jspb.Message.getWrapperField(this, proto.gemini.PerformanceMetrics, 2));
};


/**
 * @param {?proto.gemini.PerformanceMetrics|undefined} value
 * @return {!proto.gemini.AnalyticsReport} returns this
*/
proto.gemini.AnalyticsReport.prototype.setPerformanceMetrics = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.AnalyticsReport} returns this
 */
proto.gemini.AnalyticsReport.prototype.clearPerformanceMetrics = function() {
  return this.setPerformanceMetrics(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.AnalyticsReport.prototype.hasPerformanceMetrics = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * repeated ToolUsageStats tool_usage = 3;
 * @return {!Array<!proto.gemini.ToolUsageStats>}
 */
proto.gemini.AnalyticsReport.prototype.getToolUsageList = function() {
  return /** @type{!Array<!proto.gemini.ToolUsageStats>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gemini.ToolUsageStats, 3));
};


/**
 * @param {!Array<!proto.gemini.ToolUsageStats>} value
 * @return {!proto.gemini.AnalyticsReport} returns this
*/
proto.gemini.AnalyticsReport.prototype.setToolUsageList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.gemini.ToolUsageStats=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gemini.ToolUsageStats}
 */
proto.gemini.AnalyticsReport.prototype.addToolUsage = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.gemini.ToolUsageStats, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.AnalyticsReport} returns this
 */
proto.gemini.AnalyticsReport.prototype.clearToolUsageList = function() {
  return this.setToolUsageList([]);
};


/**
 * repeated ModelUsageStats model_usage = 4;
 * @return {!Array<!proto.gemini.ModelUsageStats>}
 */
proto.gemini.AnalyticsReport.prototype.getModelUsageList = function() {
  return /** @type{!Array<!proto.gemini.ModelUsageStats>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gemini.ModelUsageStats, 4));
};


/**
 * @param {!Array<!proto.gemini.ModelUsageStats>} value
 * @return {!proto.gemini.AnalyticsReport} returns this
*/
proto.gemini.AnalyticsReport.prototype.setModelUsageList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.gemini.ModelUsageStats=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gemini.ModelUsageStats}
 */
proto.gemini.AnalyticsReport.prototype.addModelUsage = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.gemini.ModelUsageStats, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.AnalyticsReport} returns this
 */
proto.gemini.AnalyticsReport.prototype.clearModelUsageList = function() {
  return this.setModelUsageList([]);
};


/**
 * optional SessionSummary session_summary = 5;
 * @return {?proto.gemini.SessionSummary}
 */
proto.gemini.AnalyticsReport.prototype.getSessionSummary = function() {
  return /** @type{?proto.gemini.SessionSummary} */ (
    jspb.Message.getWrapperField(this, proto.gemini.SessionSummary, 5));
};


/**
 * @param {?proto.gemini.SessionSummary|undefined} value
 * @return {!proto.gemini.AnalyticsReport} returns this
*/
proto.gemini.AnalyticsReport.prototype.setSessionSummary = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.AnalyticsReport} returns this
 */
proto.gemini.AnalyticsReport.prototype.clearSessionSummary = function() {
  return this.setSessionSummary(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.AnalyticsReport.prototype.hasSessionSummary = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * repeated ActivityEntry recent_activity = 6;
 * @return {!Array<!proto.gemini.ActivityEntry>}
 */
proto.gemini.AnalyticsReport.prototype.getRecentActivityList = function() {
  return /** @type{!Array<!proto.gemini.ActivityEntry>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gemini.ActivityEntry, 6));
};


/**
 * @param {!Array<!proto.gemini.ActivityEntry>} value
 * @return {!proto.gemini.AnalyticsReport} returns this
*/
proto.gemini.AnalyticsReport.prototype.setRecentActivityList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.gemini.ActivityEntry=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gemini.ActivityEntry}
 */
proto.gemini.AnalyticsReport.prototype.addRecentActivity = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.gemini.ActivityEntry, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.AnalyticsReport} returns this
 */
proto.gemini.AnalyticsReport.prototype.clearRecentActivityList = function() {
  return this.setRecentActivityList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.PerformanceMetrics.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.PerformanceMetrics.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.PerformanceMetrics} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.PerformanceMetrics.toObject = function(includeInstance, msg) {
  var f, obj = {
    totalRequests: jspb.Message.getFieldWithDefault(msg, 1, 0),
    averageResponseTimeMs: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    requestsPerMinute: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    errorRate: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    successRate: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
    concurrentSessions: jspb.Message.getFieldWithDefault(msg, 6, 0),
    peakConcurrentSessions: jspb.Message.getFieldWithDefault(msg, 7, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.PerformanceMetrics}
 */
proto.gemini.PerformanceMetrics.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.PerformanceMetrics;
  return proto.gemini.PerformanceMetrics.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.PerformanceMetrics} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.PerformanceMetrics}
 */
proto.gemini.PerformanceMetrics.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTotalRequests(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setAverageResponseTimeMs(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setRequestsPerMinute(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setErrorRate(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setSuccessRate(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setConcurrentSessions(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPeakConcurrentSessions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.PerformanceMetrics.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.PerformanceMetrics.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.PerformanceMetrics} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.PerformanceMetrics.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTotalRequests();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getAverageResponseTimeMs();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
  f = message.getRequestsPerMinute();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getErrorRate();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getSuccessRate();
  if (f !== 0.0) {
    writer.writeDouble(
      5,
      f
    );
  }
  f = message.getConcurrentSessions();
  if (f !== 0) {
    writer.writeInt32(
      6,
      f
    );
  }
  f = message.getPeakConcurrentSessions();
  if (f !== 0) {
    writer.writeInt32(
      7,
      f
    );
  }
};


/**
 * optional int32 total_requests = 1;
 * @return {number}
 */
proto.gemini.PerformanceMetrics.prototype.getTotalRequests = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.PerformanceMetrics} returns this
 */
proto.gemini.PerformanceMetrics.prototype.setTotalRequests = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional double average_response_time_ms = 2;
 * @return {number}
 */
proto.gemini.PerformanceMetrics.prototype.getAverageResponseTimeMs = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.PerformanceMetrics} returns this
 */
proto.gemini.PerformanceMetrics.prototype.setAverageResponseTimeMs = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional double requests_per_minute = 3;
 * @return {number}
 */
proto.gemini.PerformanceMetrics.prototype.getRequestsPerMinute = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.PerformanceMetrics} returns this
 */
proto.gemini.PerformanceMetrics.prototype.setRequestsPerMinute = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional double error_rate = 4;
 * @return {number}
 */
proto.gemini.PerformanceMetrics.prototype.getErrorRate = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.PerformanceMetrics} returns this
 */
proto.gemini.PerformanceMetrics.prototype.setErrorRate = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional double success_rate = 5;
 * @return {number}
 */
proto.gemini.PerformanceMetrics.prototype.getSuccessRate = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.PerformanceMetrics} returns this
 */
proto.gemini.PerformanceMetrics.prototype.setSuccessRate = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};


/**
 * optional int32 concurrent_sessions = 6;
 * @return {number}
 */
proto.gemini.PerformanceMetrics.prototype.getConcurrentSessions = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.PerformanceMetrics} returns this
 */
proto.gemini.PerformanceMetrics.prototype.setConcurrentSessions = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional int32 peak_concurrent_sessions = 7;
 * @return {number}
 */
proto.gemini.PerformanceMetrics.prototype.getPeakConcurrentSessions = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.PerformanceMetrics} returns this
 */
proto.gemini.PerformanceMetrics.prototype.setPeakConcurrentSessions = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.ToolUsageStats.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.ToolUsageStats.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.ToolUsageStats} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ToolUsageStats.toObject = function(includeInstance, msg) {
  var f, obj = {
    toolName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    executionCount: jspb.Message.getFieldWithDefault(msg, 2, 0),
    totalExecutionTimeMs: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    averageExecutionTimeMs: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    successRate: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
    lastUsed: jspb.Message.getFieldWithDefault(msg, 6, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.ToolUsageStats}
 */
proto.gemini.ToolUsageStats.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.ToolUsageStats;
  return proto.gemini.ToolUsageStats.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.ToolUsageStats} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.ToolUsageStats}
 */
proto.gemini.ToolUsageStats.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setToolName(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setExecutionCount(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setTotalExecutionTimeMs(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setAverageExecutionTimeMs(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setSuccessRate(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLastUsed(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.ToolUsageStats.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.ToolUsageStats.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.ToolUsageStats} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ToolUsageStats.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getToolName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getExecutionCount();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getTotalExecutionTimeMs();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getAverageExecutionTimeMs();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getSuccessRate();
  if (f !== 0.0) {
    writer.writeDouble(
      5,
      f
    );
  }
  f = message.getLastUsed();
  if (f !== 0) {
    writer.writeInt64(
      6,
      f
    );
  }
};


/**
 * optional string tool_name = 1;
 * @return {string}
 */
proto.gemini.ToolUsageStats.prototype.getToolName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ToolUsageStats} returns this
 */
proto.gemini.ToolUsageStats.prototype.setToolName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 execution_count = 2;
 * @return {number}
 */
proto.gemini.ToolUsageStats.prototype.getExecutionCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.ToolUsageStats} returns this
 */
proto.gemini.ToolUsageStats.prototype.setExecutionCount = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional double total_execution_time_ms = 3;
 * @return {number}
 */
proto.gemini.ToolUsageStats.prototype.getTotalExecutionTimeMs = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.ToolUsageStats} returns this
 */
proto.gemini.ToolUsageStats.prototype.setTotalExecutionTimeMs = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional double average_execution_time_ms = 4;
 * @return {number}
 */
proto.gemini.ToolUsageStats.prototype.getAverageExecutionTimeMs = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.ToolUsageStats} returns this
 */
proto.gemini.ToolUsageStats.prototype.setAverageExecutionTimeMs = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional double success_rate = 5;
 * @return {number}
 */
proto.gemini.ToolUsageStats.prototype.getSuccessRate = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.ToolUsageStats} returns this
 */
proto.gemini.ToolUsageStats.prototype.setSuccessRate = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};


/**
 * optional int64 last_used = 6;
 * @return {number}
 */
proto.gemini.ToolUsageStats.prototype.getLastUsed = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.ToolUsageStats} returns this
 */
proto.gemini.ToolUsageStats.prototype.setLastUsed = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.ModelUsageStats.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.ModelUsageStats.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.ModelUsageStats} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ModelUsageStats.toObject = function(includeInstance, msg) {
  var f, obj = {
    modelName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    requestCount: jspb.Message.getFieldWithDefault(msg, 2, 0),
    totalTokens: (f = msg.getTotalTokens()) && proto.gemini.TokenUsage.toObject(includeInstance, f),
    totalCost: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    averageLatencyMs: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
    lastUsed: jspb.Message.getFieldWithDefault(msg, 6, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.ModelUsageStats}
 */
proto.gemini.ModelUsageStats.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.ModelUsageStats;
  return proto.gemini.ModelUsageStats.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.ModelUsageStats} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.ModelUsageStats}
 */
proto.gemini.ModelUsageStats.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setModelName(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setRequestCount(value);
      break;
    case 3:
      var value = new proto.gemini.TokenUsage;
      reader.readMessage(value,proto.gemini.TokenUsage.deserializeBinaryFromReader);
      msg.setTotalTokens(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setTotalCost(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setAverageLatencyMs(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setLastUsed(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.ModelUsageStats.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.ModelUsageStats.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.ModelUsageStats} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ModelUsageStats.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getModelName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getRequestCount();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getTotalTokens();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.gemini.TokenUsage.serializeBinaryToWriter
    );
  }
  f = message.getTotalCost();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getAverageLatencyMs();
  if (f !== 0.0) {
    writer.writeDouble(
      5,
      f
    );
  }
  f = message.getLastUsed();
  if (f !== 0) {
    writer.writeInt64(
      6,
      f
    );
  }
};


/**
 * optional string model_name = 1;
 * @return {string}
 */
proto.gemini.ModelUsageStats.prototype.getModelName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ModelUsageStats} returns this
 */
proto.gemini.ModelUsageStats.prototype.setModelName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 request_count = 2;
 * @return {number}
 */
proto.gemini.ModelUsageStats.prototype.getRequestCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.ModelUsageStats} returns this
 */
proto.gemini.ModelUsageStats.prototype.setRequestCount = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional TokenUsage total_tokens = 3;
 * @return {?proto.gemini.TokenUsage}
 */
proto.gemini.ModelUsageStats.prototype.getTotalTokens = function() {
  return /** @type{?proto.gemini.TokenUsage} */ (
    jspb.Message.getWrapperField(this, proto.gemini.TokenUsage, 3));
};


/**
 * @param {?proto.gemini.TokenUsage|undefined} value
 * @return {!proto.gemini.ModelUsageStats} returns this
*/
proto.gemini.ModelUsageStats.prototype.setTotalTokens = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.ModelUsageStats} returns this
 */
proto.gemini.ModelUsageStats.prototype.clearTotalTokens = function() {
  return this.setTotalTokens(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.ModelUsageStats.prototype.hasTotalTokens = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional double total_cost = 4;
 * @return {number}
 */
proto.gemini.ModelUsageStats.prototype.getTotalCost = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.ModelUsageStats} returns this
 */
proto.gemini.ModelUsageStats.prototype.setTotalCost = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional double average_latency_ms = 5;
 * @return {number}
 */
proto.gemini.ModelUsageStats.prototype.getAverageLatencyMs = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.ModelUsageStats} returns this
 */
proto.gemini.ModelUsageStats.prototype.setAverageLatencyMs = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};


/**
 * optional int64 last_used = 6;
 * @return {number}
 */
proto.gemini.ModelUsageStats.prototype.getLastUsed = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.ModelUsageStats} returns this
 */
proto.gemini.ModelUsageStats.prototype.setLastUsed = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.SessionSummary.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.SessionSummary.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.SessionSummary} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.SessionSummary.toObject = function(includeInstance, msg) {
  var f, obj = {
    totalSessions: jspb.Message.getFieldWithDefault(msg, 1, 0),
    activeSessions: jspb.Message.getFieldWithDefault(msg, 2, 0),
    averageSessionDurationMs: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    totalMessages: jspb.Message.getFieldWithDefault(msg, 4, 0),
    totalToolExecutions: jspb.Message.getFieldWithDefault(msg, 5, 0),
    totalErrors: jspb.Message.getFieldWithDefault(msg, 6, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.SessionSummary}
 */
proto.gemini.SessionSummary.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.SessionSummary;
  return proto.gemini.SessionSummary.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.SessionSummary} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.SessionSummary}
 */
proto.gemini.SessionSummary.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTotalSessions(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setActiveSessions(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setAverageSessionDurationMs(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTotalMessages(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTotalToolExecutions(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setTotalErrors(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.SessionSummary.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.SessionSummary.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.SessionSummary} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.SessionSummary.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTotalSessions();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getActiveSessions();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getAverageSessionDurationMs();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getTotalMessages();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getTotalToolExecutions();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getTotalErrors();
  if (f !== 0) {
    writer.writeInt32(
      6,
      f
    );
  }
};


/**
 * optional int32 total_sessions = 1;
 * @return {number}
 */
proto.gemini.SessionSummary.prototype.getTotalSessions = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.SessionSummary} returns this
 */
proto.gemini.SessionSummary.prototype.setTotalSessions = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 active_sessions = 2;
 * @return {number}
 */
proto.gemini.SessionSummary.prototype.getActiveSessions = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.SessionSummary} returns this
 */
proto.gemini.SessionSummary.prototype.setActiveSessions = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional double average_session_duration_ms = 3;
 * @return {number}
 */
proto.gemini.SessionSummary.prototype.getAverageSessionDurationMs = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.SessionSummary} returns this
 */
proto.gemini.SessionSummary.prototype.setAverageSessionDurationMs = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional int32 total_messages = 4;
 * @return {number}
 */
proto.gemini.SessionSummary.prototype.getTotalMessages = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.SessionSummary} returns this
 */
proto.gemini.SessionSummary.prototype.setTotalMessages = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int32 total_tool_executions = 5;
 * @return {number}
 */
proto.gemini.SessionSummary.prototype.getTotalToolExecutions = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.SessionSummary} returns this
 */
proto.gemini.SessionSummary.prototype.setTotalToolExecutions = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int32 total_errors = 6;
 * @return {number}
 */
proto.gemini.SessionSummary.prototype.getTotalErrors = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.SessionSummary} returns this
 */
proto.gemini.SessionSummary.prototype.setTotalErrors = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.ActivityEntry.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.ActivityEntry.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.ActivityEntry} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ActivityEntry.toObject = function(includeInstance, msg) {
  var f, obj = {
    timestamp: jspb.Message.getFieldWithDefault(msg, 1, 0),
    sessionId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    action: jspb.Message.getFieldWithDefault(msg, 3, ""),
    details: jspb.Message.getFieldWithDefault(msg, 4, ""),
    durationMs: jspb.Message.getFieldWithDefault(msg, 5, 0),
    success: jspb.Message.getBooleanFieldWithDefault(msg, 6, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.ActivityEntry}
 */
proto.gemini.ActivityEntry.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.ActivityEntry;
  return proto.gemini.ActivityEntry.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.ActivityEntry} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.ActivityEntry}
 */
proto.gemini.ActivityEntry.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTimestamp(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setAction(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setDetails(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setDurationMs(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.ActivityEntry.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.ActivityEntry.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.ActivityEntry} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.ActivityEntry.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTimestamp();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getSessionId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getAction();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getDetails();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getDurationMs();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      6,
      f
    );
  }
};


/**
 * optional int64 timestamp = 1;
 * @return {number}
 */
proto.gemini.ActivityEntry.prototype.getTimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.ActivityEntry} returns this
 */
proto.gemini.ActivityEntry.prototype.setTimestamp = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string session_id = 2;
 * @return {string}
 */
proto.gemini.ActivityEntry.prototype.getSessionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ActivityEntry} returns this
 */
proto.gemini.ActivityEntry.prototype.setSessionId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string action = 3;
 * @return {string}
 */
proto.gemini.ActivityEntry.prototype.getAction = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ActivityEntry} returns this
 */
proto.gemini.ActivityEntry.prototype.setAction = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string details = 4;
 * @return {string}
 */
proto.gemini.ActivityEntry.prototype.getDetails = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.ActivityEntry} returns this
 */
proto.gemini.ActivityEntry.prototype.setDetails = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional int64 duration_ms = 5;
 * @return {number}
 */
proto.gemini.ActivityEntry.prototype.getDurationMs = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.ActivityEntry} returns this
 */
proto.gemini.ActivityEntry.prototype.setDurationMs = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional bool success = 6;
 * @return {boolean}
 */
proto.gemini.ActivityEntry.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.ActivityEntry} returns this
 */
proto.gemini.ActivityEntry.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gemini.MetricsSummary.repeatedFields_ = [3,4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.MetricsSummary.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.MetricsSummary.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.MetricsSummary} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.MetricsSummary.toObject = function(includeInstance, msg) {
  var f, obj = {
    timestamp: jspb.Message.getFieldWithDefault(msg, 1, 0),
    timeRangeMs: jspb.Message.getFieldWithDefault(msg, 2, 0),
    metricsList: jspb.Message.toObjectList(msg.getMetricsList(),
    proto.gemini.MetricSummary.toObject, includeInstance),
    activeAlertsList: jspb.Message.toObjectList(msg.getActiveAlertsList(),
    proto.gemini.AlertInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.MetricsSummary}
 */
proto.gemini.MetricsSummary.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.MetricsSummary;
  return proto.gemini.MetricsSummary.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.MetricsSummary} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.MetricsSummary}
 */
proto.gemini.MetricsSummary.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTimestamp(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTimeRangeMs(value);
      break;
    case 3:
      var value = new proto.gemini.MetricSummary;
      reader.readMessage(value,proto.gemini.MetricSummary.deserializeBinaryFromReader);
      msg.addMetrics(value);
      break;
    case 4:
      var value = new proto.gemini.AlertInfo;
      reader.readMessage(value,proto.gemini.AlertInfo.deserializeBinaryFromReader);
      msg.addActiveAlerts(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.MetricsSummary.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.MetricsSummary.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.MetricsSummary} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.MetricsSummary.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTimestamp();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getTimeRangeMs();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getMetricsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.gemini.MetricSummary.serializeBinaryToWriter
    );
  }
  f = message.getActiveAlertsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.gemini.AlertInfo.serializeBinaryToWriter
    );
  }
};


/**
 * optional int64 timestamp = 1;
 * @return {number}
 */
proto.gemini.MetricsSummary.prototype.getTimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.MetricsSummary} returns this
 */
proto.gemini.MetricsSummary.prototype.setTimestamp = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 time_range_ms = 2;
 * @return {number}
 */
proto.gemini.MetricsSummary.prototype.getTimeRangeMs = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.MetricsSummary} returns this
 */
proto.gemini.MetricsSummary.prototype.setTimeRangeMs = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * repeated MetricSummary metrics = 3;
 * @return {!Array<!proto.gemini.MetricSummary>}
 */
proto.gemini.MetricsSummary.prototype.getMetricsList = function() {
  return /** @type{!Array<!proto.gemini.MetricSummary>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gemini.MetricSummary, 3));
};


/**
 * @param {!Array<!proto.gemini.MetricSummary>} value
 * @return {!proto.gemini.MetricsSummary} returns this
*/
proto.gemini.MetricsSummary.prototype.setMetricsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.gemini.MetricSummary=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gemini.MetricSummary}
 */
proto.gemini.MetricsSummary.prototype.addMetrics = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.gemini.MetricSummary, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.MetricsSummary} returns this
 */
proto.gemini.MetricsSummary.prototype.clearMetricsList = function() {
  return this.setMetricsList([]);
};


/**
 * repeated AlertInfo active_alerts = 4;
 * @return {!Array<!proto.gemini.AlertInfo>}
 */
proto.gemini.MetricsSummary.prototype.getActiveAlertsList = function() {
  return /** @type{!Array<!proto.gemini.AlertInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gemini.AlertInfo, 4));
};


/**
 * @param {!Array<!proto.gemini.AlertInfo>} value
 * @return {!proto.gemini.MetricsSummary} returns this
*/
proto.gemini.MetricsSummary.prototype.setActiveAlertsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.gemini.AlertInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gemini.AlertInfo}
 */
proto.gemini.MetricsSummary.prototype.addActiveAlerts = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.gemini.AlertInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.MetricsSummary} returns this
 */
proto.gemini.MetricsSummary.prototype.clearActiveAlertsList = function() {
  return this.setActiveAlertsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.MetricSummary.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.MetricSummary.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.MetricSummary} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.MetricSummary.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    description: jspb.Message.getFieldWithDefault(msg, 2, ""),
    unit: jspb.Message.getFieldWithDefault(msg, 3, ""),
    currentValue: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    minValue: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
    maxValue: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
    averageValue: jspb.Message.getFloatingPointFieldWithDefault(msg, 7, 0.0),
    dataPoints: jspb.Message.getFieldWithDefault(msg, 8, 0),
    aggregationType: jspb.Message.getFieldWithDefault(msg, 9, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.MetricSummary}
 */
proto.gemini.MetricSummary.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.MetricSummary;
  return proto.gemini.MetricSummary.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.MetricSummary} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.MetricSummary}
 */
proto.gemini.MetricSummary.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setUnit(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setCurrentValue(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setMinValue(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setMaxValue(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setAverageValue(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDataPoints(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setAggregationType(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.MetricSummary.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.MetricSummary.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.MetricSummary} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.MetricSummary.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getUnit();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getCurrentValue();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getMinValue();
  if (f !== 0.0) {
    writer.writeDouble(
      5,
      f
    );
  }
  f = message.getMaxValue();
  if (f !== 0.0) {
    writer.writeDouble(
      6,
      f
    );
  }
  f = message.getAverageValue();
  if (f !== 0.0) {
    writer.writeDouble(
      7,
      f
    );
  }
  f = message.getDataPoints();
  if (f !== 0) {
    writer.writeInt32(
      8,
      f
    );
  }
  f = message.getAggregationType();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.gemini.MetricSummary.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.MetricSummary} returns this
 */
proto.gemini.MetricSummary.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string description = 2;
 * @return {string}
 */
proto.gemini.MetricSummary.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.MetricSummary} returns this
 */
proto.gemini.MetricSummary.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string unit = 3;
 * @return {string}
 */
proto.gemini.MetricSummary.prototype.getUnit = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.MetricSummary} returns this
 */
proto.gemini.MetricSummary.prototype.setUnit = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional double current_value = 4;
 * @return {number}
 */
proto.gemini.MetricSummary.prototype.getCurrentValue = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.MetricSummary} returns this
 */
proto.gemini.MetricSummary.prototype.setCurrentValue = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional double min_value = 5;
 * @return {number}
 */
proto.gemini.MetricSummary.prototype.getMinValue = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.MetricSummary} returns this
 */
proto.gemini.MetricSummary.prototype.setMinValue = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};


/**
 * optional double max_value = 6;
 * @return {number}
 */
proto.gemini.MetricSummary.prototype.getMaxValue = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.MetricSummary} returns this
 */
proto.gemini.MetricSummary.prototype.setMaxValue = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional double average_value = 7;
 * @return {number}
 */
proto.gemini.MetricSummary.prototype.getAverageValue = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 7, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.MetricSummary} returns this
 */
proto.gemini.MetricSummary.prototype.setAverageValue = function(value) {
  return jspb.Message.setProto3FloatField(this, 7, value);
};


/**
 * optional int32 data_points = 8;
 * @return {number}
 */
proto.gemini.MetricSummary.prototype.getDataPoints = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.MetricSummary} returns this
 */
proto.gemini.MetricSummary.prototype.setDataPoints = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional string aggregation_type = 9;
 * @return {string}
 */
proto.gemini.MetricSummary.prototype.getAggregationType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.MetricSummary} returns this
 */
proto.gemini.MetricSummary.prototype.setAggregationType = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.AlertInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.AlertInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.AlertInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.AlertInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    metricName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    currentValue: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    threshold: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    condition: jspb.Message.getFieldWithDefault(msg, 5, ""),
    triggeredAt: jspb.Message.getFieldWithDefault(msg, 6, 0),
    severity: jspb.Message.getFieldWithDefault(msg, 7, ""),
    description: jspb.Message.getFieldWithDefault(msg, 8, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.AlertInfo}
 */
proto.gemini.AlertInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.AlertInfo;
  return proto.gemini.AlertInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.AlertInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.AlertInfo}
 */
proto.gemini.AlertInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMetricName(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setCurrentValue(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setThreshold(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setCondition(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTriggeredAt(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setSeverity(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.AlertInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.AlertInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.AlertInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.AlertInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getMetricName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getCurrentValue();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getThreshold();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getCondition();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getTriggeredAt();
  if (f !== 0) {
    writer.writeInt64(
      6,
      f
    );
  }
  f = message.getSeverity();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.gemini.AlertInfo.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.AlertInfo} returns this
 */
proto.gemini.AlertInfo.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string metric_name = 2;
 * @return {string}
 */
proto.gemini.AlertInfo.prototype.getMetricName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.AlertInfo} returns this
 */
proto.gemini.AlertInfo.prototype.setMetricName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional double current_value = 3;
 * @return {number}
 */
proto.gemini.AlertInfo.prototype.getCurrentValue = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.AlertInfo} returns this
 */
proto.gemini.AlertInfo.prototype.setCurrentValue = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional double threshold = 4;
 * @return {number}
 */
proto.gemini.AlertInfo.prototype.getThreshold = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.AlertInfo} returns this
 */
proto.gemini.AlertInfo.prototype.setThreshold = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional string condition = 5;
 * @return {string}
 */
proto.gemini.AlertInfo.prototype.getCondition = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.AlertInfo} returns this
 */
proto.gemini.AlertInfo.prototype.setCondition = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional int64 triggered_at = 6;
 * @return {number}
 */
proto.gemini.AlertInfo.prototype.getTriggeredAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.AlertInfo} returns this
 */
proto.gemini.AlertInfo.prototype.setTriggeredAt = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional string severity = 7;
 * @return {string}
 */
proto.gemini.AlertInfo.prototype.getSeverity = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.AlertInfo} returns this
 */
proto.gemini.AlertInfo.prototype.setSeverity = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional string description = 8;
 * @return {string}
 */
proto.gemini.AlertInfo.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.AlertInfo} returns this
 */
proto.gemini.AlertInfo.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.FileReadRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.FileReadRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.FileReadRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileReadRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    filePath: jspb.Message.getFieldWithDefault(msg, 2, ""),
    encoding: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.FileReadRequest}
 */
proto.gemini.FileReadRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.FileReadRequest;
  return proto.gemini.FileReadRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.FileReadRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.FileReadRequest}
 */
proto.gemini.FileReadRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFilePath(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setEncoding(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.FileReadRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.FileReadRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.FileReadRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileReadRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFilePath();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getEncoding();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string session_id = 1;
 * @return {string}
 */
proto.gemini.FileReadRequest.prototype.getSessionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileReadRequest} returns this
 */
proto.gemini.FileReadRequest.prototype.setSessionId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string file_path = 2;
 * @return {string}
 */
proto.gemini.FileReadRequest.prototype.getFilePath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileReadRequest} returns this
 */
proto.gemini.FileReadRequest.prototype.setFilePath = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string encoding = 3;
 * @return {string}
 */
proto.gemini.FileReadRequest.prototype.getEncoding = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileReadRequest} returns this
 */
proto.gemini.FileReadRequest.prototype.setEncoding = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.FileReadResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.FileReadResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.FileReadResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileReadResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    content: jspb.Message.getFieldWithDefault(msg, 2, ""),
    metadata: (f = msg.getMetadata()) && proto.gemini.FileMetadata.toObject(includeInstance, f),
    errorMessage: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.FileReadResponse}
 */
proto.gemini.FileReadResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.FileReadResponse;
  return proto.gemini.FileReadResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.FileReadResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.FileReadResponse}
 */
proto.gemini.FileReadResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContent(value);
      break;
    case 3:
      var value = new proto.gemini.FileMetadata;
      reader.readMessage(value,proto.gemini.FileMetadata.deserializeBinaryFromReader);
      msg.setMetadata(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setErrorMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.FileReadResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.FileReadResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.FileReadResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileReadResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getContent();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMetadata();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.gemini.FileMetadata.serializeBinaryToWriter
    );
  }
  f = message.getErrorMessage();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.gemini.FileReadResponse.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.FileReadResponse} returns this
 */
proto.gemini.FileReadResponse.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string content = 2;
 * @return {string}
 */
proto.gemini.FileReadResponse.prototype.getContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileReadResponse} returns this
 */
proto.gemini.FileReadResponse.prototype.setContent = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional FileMetadata metadata = 3;
 * @return {?proto.gemini.FileMetadata}
 */
proto.gemini.FileReadResponse.prototype.getMetadata = function() {
  return /** @type{?proto.gemini.FileMetadata} */ (
    jspb.Message.getWrapperField(this, proto.gemini.FileMetadata, 3));
};


/**
 * @param {?proto.gemini.FileMetadata|undefined} value
 * @return {!proto.gemini.FileReadResponse} returns this
*/
proto.gemini.FileReadResponse.prototype.setMetadata = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.FileReadResponse} returns this
 */
proto.gemini.FileReadResponse.prototype.clearMetadata = function() {
  return this.setMetadata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.FileReadResponse.prototype.hasMetadata = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string error_message = 4;
 * @return {string}
 */
proto.gemini.FileReadResponse.prototype.getErrorMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileReadResponse} returns this
 */
proto.gemini.FileReadResponse.prototype.setErrorMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.FileWriteRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.FileWriteRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.FileWriteRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileWriteRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    filePath: jspb.Message.getFieldWithDefault(msg, 2, ""),
    content: jspb.Message.getFieldWithDefault(msg, 3, ""),
    encoding: jspb.Message.getFieldWithDefault(msg, 4, ""),
    backup: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    createDirectories: jspb.Message.getBooleanFieldWithDefault(msg, 6, false),
    confirmOverwrite: jspb.Message.getBooleanFieldWithDefault(msg, 7, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.FileWriteRequest}
 */
proto.gemini.FileWriteRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.FileWriteRequest;
  return proto.gemini.FileWriteRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.FileWriteRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.FileWriteRequest}
 */
proto.gemini.FileWriteRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFilePath(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setContent(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setEncoding(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setBackup(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setCreateDirectories(value);
      break;
    case 7:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setConfirmOverwrite(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.FileWriteRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.FileWriteRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.FileWriteRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileWriteRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFilePath();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getContent();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getEncoding();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getBackup();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getCreateDirectories();
  if (f) {
    writer.writeBool(
      6,
      f
    );
  }
  f = message.getConfirmOverwrite();
  if (f) {
    writer.writeBool(
      7,
      f
    );
  }
};


/**
 * optional string session_id = 1;
 * @return {string}
 */
proto.gemini.FileWriteRequest.prototype.getSessionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileWriteRequest} returns this
 */
proto.gemini.FileWriteRequest.prototype.setSessionId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string file_path = 2;
 * @return {string}
 */
proto.gemini.FileWriteRequest.prototype.getFilePath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileWriteRequest} returns this
 */
proto.gemini.FileWriteRequest.prototype.setFilePath = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string content = 3;
 * @return {string}
 */
proto.gemini.FileWriteRequest.prototype.getContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileWriteRequest} returns this
 */
proto.gemini.FileWriteRequest.prototype.setContent = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string encoding = 4;
 * @return {string}
 */
proto.gemini.FileWriteRequest.prototype.getEncoding = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileWriteRequest} returns this
 */
proto.gemini.FileWriteRequest.prototype.setEncoding = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional bool backup = 5;
 * @return {boolean}
 */
proto.gemini.FileWriteRequest.prototype.getBackup = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.FileWriteRequest} returns this
 */
proto.gemini.FileWriteRequest.prototype.setBackup = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional bool create_directories = 6;
 * @return {boolean}
 */
proto.gemini.FileWriteRequest.prototype.getCreateDirectories = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.FileWriteRequest} returns this
 */
proto.gemini.FileWriteRequest.prototype.setCreateDirectories = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
};


/**
 * optional bool confirm_overwrite = 7;
 * @return {boolean}
 */
proto.gemini.FileWriteRequest.prototype.getConfirmOverwrite = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 7, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.FileWriteRequest} returns this
 */
proto.gemini.FileWriteRequest.prototype.setConfirmOverwrite = function(value) {
  return jspb.Message.setProto3BooleanField(this, 7, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gemini.FileEditRequest.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.FileEditRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.FileEditRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.FileEditRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileEditRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    filePath: jspb.Message.getFieldWithDefault(msg, 2, ""),
    patchesList: jspb.Message.toObjectList(msg.getPatchesList(),
    proto.gemini.FilePatch.toObject, includeInstance),
    backup: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.FileEditRequest}
 */
proto.gemini.FileEditRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.FileEditRequest;
  return proto.gemini.FileEditRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.FileEditRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.FileEditRequest}
 */
proto.gemini.FileEditRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFilePath(value);
      break;
    case 3:
      var value = new proto.gemini.FilePatch;
      reader.readMessage(value,proto.gemini.FilePatch.deserializeBinaryFromReader);
      msg.addPatches(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setBackup(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.FileEditRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.FileEditRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.FileEditRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileEditRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFilePath();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getPatchesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.gemini.FilePatch.serializeBinaryToWriter
    );
  }
  f = message.getBackup();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional string session_id = 1;
 * @return {string}
 */
proto.gemini.FileEditRequest.prototype.getSessionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileEditRequest} returns this
 */
proto.gemini.FileEditRequest.prototype.setSessionId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string file_path = 2;
 * @return {string}
 */
proto.gemini.FileEditRequest.prototype.getFilePath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileEditRequest} returns this
 */
proto.gemini.FileEditRequest.prototype.setFilePath = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated FilePatch patches = 3;
 * @return {!Array<!proto.gemini.FilePatch>}
 */
proto.gemini.FileEditRequest.prototype.getPatchesList = function() {
  return /** @type{!Array<!proto.gemini.FilePatch>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gemini.FilePatch, 3));
};


/**
 * @param {!Array<!proto.gemini.FilePatch>} value
 * @return {!proto.gemini.FileEditRequest} returns this
*/
proto.gemini.FileEditRequest.prototype.setPatchesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.gemini.FilePatch=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gemini.FilePatch}
 */
proto.gemini.FileEditRequest.prototype.addPatches = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.gemini.FilePatch, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.FileEditRequest} returns this
 */
proto.gemini.FileEditRequest.prototype.clearPatchesList = function() {
  return this.setPatchesList([]);
};


/**
 * optional bool backup = 4;
 * @return {boolean}
 */
proto.gemini.FileEditRequest.prototype.getBackup = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.FileEditRequest} returns this
 */
proto.gemini.FileEditRequest.prototype.setBackup = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.FilePatch.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.FilePatch.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.FilePatch} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FilePatch.toObject = function(includeInstance, msg) {
  var f, obj = {
    startLine: jspb.Message.getFieldWithDefault(msg, 1, 0),
    endLine: jspb.Message.getFieldWithDefault(msg, 2, 0),
    newContent: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.FilePatch}
 */
proto.gemini.FilePatch.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.FilePatch;
  return proto.gemini.FilePatch.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.FilePatch} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.FilePatch}
 */
proto.gemini.FilePatch.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStartLine(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setEndLine(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setNewContent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.FilePatch.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.FilePatch.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.FilePatch} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FilePatch.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStartLine();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getEndLine();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getNewContent();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional int32 start_line = 1;
 * @return {number}
 */
proto.gemini.FilePatch.prototype.getStartLine = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.FilePatch} returns this
 */
proto.gemini.FilePatch.prototype.setStartLine = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 end_line = 2;
 * @return {number}
 */
proto.gemini.FilePatch.prototype.getEndLine = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.FilePatch} returns this
 */
proto.gemini.FilePatch.prototype.setEndLine = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string new_content = 3;
 * @return {string}
 */
proto.gemini.FilePatch.prototype.getNewContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FilePatch} returns this
 */
proto.gemini.FilePatch.prototype.setNewContent = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.FileDeleteRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.FileDeleteRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.FileDeleteRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileDeleteRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    filePath: jspb.Message.getFieldWithDefault(msg, 2, ""),
    recursive: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    backup: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.FileDeleteRequest}
 */
proto.gemini.FileDeleteRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.FileDeleteRequest;
  return proto.gemini.FileDeleteRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.FileDeleteRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.FileDeleteRequest}
 */
proto.gemini.FileDeleteRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFilePath(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setRecursive(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setBackup(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.FileDeleteRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.FileDeleteRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.FileDeleteRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileDeleteRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFilePath();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getRecursive();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getBackup();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional string session_id = 1;
 * @return {string}
 */
proto.gemini.FileDeleteRequest.prototype.getSessionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileDeleteRequest} returns this
 */
proto.gemini.FileDeleteRequest.prototype.setSessionId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string file_path = 2;
 * @return {string}
 */
proto.gemini.FileDeleteRequest.prototype.getFilePath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileDeleteRequest} returns this
 */
proto.gemini.FileDeleteRequest.prototype.setFilePath = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool recursive = 3;
 * @return {boolean}
 */
proto.gemini.FileDeleteRequest.prototype.getRecursive = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.FileDeleteRequest} returns this
 */
proto.gemini.FileDeleteRequest.prototype.setRecursive = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional bool backup = 4;
 * @return {boolean}
 */
proto.gemini.FileDeleteRequest.prototype.getBackup = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.FileDeleteRequest} returns this
 */
proto.gemini.FileDeleteRequest.prototype.setBackup = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.FileMoveRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.FileMoveRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.FileMoveRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileMoveRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    sourcePath: jspb.Message.getFieldWithDefault(msg, 2, ""),
    targetPath: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.FileMoveRequest}
 */
proto.gemini.FileMoveRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.FileMoveRequest;
  return proto.gemini.FileMoveRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.FileMoveRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.FileMoveRequest}
 */
proto.gemini.FileMoveRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSourcePath(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTargetPath(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.FileMoveRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.FileMoveRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.FileMoveRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileMoveRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSourcePath();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getTargetPath();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string session_id = 1;
 * @return {string}
 */
proto.gemini.FileMoveRequest.prototype.getSessionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileMoveRequest} returns this
 */
proto.gemini.FileMoveRequest.prototype.setSessionId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string source_path = 2;
 * @return {string}
 */
proto.gemini.FileMoveRequest.prototype.getSourcePath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileMoveRequest} returns this
 */
proto.gemini.FileMoveRequest.prototype.setSourcePath = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string target_path = 3;
 * @return {string}
 */
proto.gemini.FileMoveRequest.prototype.getTargetPath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileMoveRequest} returns this
 */
proto.gemini.FileMoveRequest.prototype.setTargetPath = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.DirectoryListRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.DirectoryListRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.DirectoryListRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.DirectoryListRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    directoryPath: jspb.Message.getFieldWithDefault(msg, 2, ""),
    recursive: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    includeHidden: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    pattern: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.DirectoryListRequest}
 */
proto.gemini.DirectoryListRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.DirectoryListRequest;
  return proto.gemini.DirectoryListRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.DirectoryListRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.DirectoryListRequest}
 */
proto.gemini.DirectoryListRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDirectoryPath(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setRecursive(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIncludeHidden(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setPattern(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.DirectoryListRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.DirectoryListRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.DirectoryListRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.DirectoryListRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDirectoryPath();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getRecursive();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getIncludeHidden();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getPattern();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional string session_id = 1;
 * @return {string}
 */
proto.gemini.DirectoryListRequest.prototype.getSessionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.DirectoryListRequest} returns this
 */
proto.gemini.DirectoryListRequest.prototype.setSessionId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string directory_path = 2;
 * @return {string}
 */
proto.gemini.DirectoryListRequest.prototype.getDirectoryPath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.DirectoryListRequest} returns this
 */
proto.gemini.DirectoryListRequest.prototype.setDirectoryPath = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool recursive = 3;
 * @return {boolean}
 */
proto.gemini.DirectoryListRequest.prototype.getRecursive = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.DirectoryListRequest} returns this
 */
proto.gemini.DirectoryListRequest.prototype.setRecursive = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional bool include_hidden = 4;
 * @return {boolean}
 */
proto.gemini.DirectoryListRequest.prototype.getIncludeHidden = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.DirectoryListRequest} returns this
 */
proto.gemini.DirectoryListRequest.prototype.setIncludeHidden = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional string pattern = 5;
 * @return {string}
 */
proto.gemini.DirectoryListRequest.prototype.getPattern = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.DirectoryListRequest} returns this
 */
proto.gemini.DirectoryListRequest.prototype.setPattern = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gemini.DirectoryListResponse.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.DirectoryListResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.DirectoryListResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.DirectoryListResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.DirectoryListResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    filesList: jspb.Message.toObjectList(msg.getFilesList(),
    proto.gemini.FileMetadata.toObject, includeInstance),
    errorMessage: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.DirectoryListResponse}
 */
proto.gemini.DirectoryListResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.DirectoryListResponse;
  return proto.gemini.DirectoryListResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.DirectoryListResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.DirectoryListResponse}
 */
proto.gemini.DirectoryListResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = new proto.gemini.FileMetadata;
      reader.readMessage(value,proto.gemini.FileMetadata.deserializeBinaryFromReader);
      msg.addFiles(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setErrorMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.DirectoryListResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.DirectoryListResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.DirectoryListResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.DirectoryListResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getFilesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gemini.FileMetadata.serializeBinaryToWriter
    );
  }
  f = message.getErrorMessage();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.gemini.DirectoryListResponse.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.DirectoryListResponse} returns this
 */
proto.gemini.DirectoryListResponse.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * repeated FileMetadata files = 2;
 * @return {!Array<!proto.gemini.FileMetadata>}
 */
proto.gemini.DirectoryListResponse.prototype.getFilesList = function() {
  return /** @type{!Array<!proto.gemini.FileMetadata>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gemini.FileMetadata, 2));
};


/**
 * @param {!Array<!proto.gemini.FileMetadata>} value
 * @return {!proto.gemini.DirectoryListResponse} returns this
*/
proto.gemini.DirectoryListResponse.prototype.setFilesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gemini.FileMetadata=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gemini.FileMetadata}
 */
proto.gemini.DirectoryListResponse.prototype.addFiles = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gemini.FileMetadata, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gemini.DirectoryListResponse} returns this
 */
proto.gemini.DirectoryListResponse.prototype.clearFilesList = function() {
  return this.setFilesList([]);
};


/**
 * optional string error_message = 3;
 * @return {string}
 */
proto.gemini.DirectoryListResponse.prototype.getErrorMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.DirectoryListResponse} returns this
 */
proto.gemini.DirectoryListResponse.prototype.setErrorMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.DiffGenerationRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.DiffGenerationRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.DiffGenerationRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.DiffGenerationRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    filePath: jspb.Message.getFieldWithDefault(msg, 2, ""),
    oldContent: jspb.Message.getFieldWithDefault(msg, 3, ""),
    newContent: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.DiffGenerationRequest}
 */
proto.gemini.DiffGenerationRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.DiffGenerationRequest;
  return proto.gemini.DiffGenerationRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.DiffGenerationRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.DiffGenerationRequest}
 */
proto.gemini.DiffGenerationRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFilePath(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setOldContent(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setNewContent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.DiffGenerationRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.DiffGenerationRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.DiffGenerationRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.DiffGenerationRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFilePath();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getOldContent();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getNewContent();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string session_id = 1;
 * @return {string}
 */
proto.gemini.DiffGenerationRequest.prototype.getSessionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.DiffGenerationRequest} returns this
 */
proto.gemini.DiffGenerationRequest.prototype.setSessionId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string file_path = 2;
 * @return {string}
 */
proto.gemini.DiffGenerationRequest.prototype.getFilePath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.DiffGenerationRequest} returns this
 */
proto.gemini.DiffGenerationRequest.prototype.setFilePath = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string old_content = 3;
 * @return {string}
 */
proto.gemini.DiffGenerationRequest.prototype.getOldContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.DiffGenerationRequest} returns this
 */
proto.gemini.DiffGenerationRequest.prototype.setOldContent = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string new_content = 4;
 * @return {string}
 */
proto.gemini.DiffGenerationRequest.prototype.getNewContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.DiffGenerationRequest} returns this
 */
proto.gemini.DiffGenerationRequest.prototype.setNewContent = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.DiffGenerationResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.DiffGenerationResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.DiffGenerationResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.DiffGenerationResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    diff: (f = msg.getDiff()) && proto.gemini.DiffPreview.toObject(includeInstance, f),
    errorMessage: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.DiffGenerationResponse}
 */
proto.gemini.DiffGenerationResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.DiffGenerationResponse;
  return proto.gemini.DiffGenerationResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.DiffGenerationResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.DiffGenerationResponse}
 */
proto.gemini.DiffGenerationResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = new proto.gemini.DiffPreview;
      reader.readMessage(value,proto.gemini.DiffPreview.deserializeBinaryFromReader);
      msg.setDiff(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setErrorMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.DiffGenerationResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.DiffGenerationResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.DiffGenerationResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.DiffGenerationResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getDiff();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gemini.DiffPreview.serializeBinaryToWriter
    );
  }
  f = message.getErrorMessage();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.gemini.DiffGenerationResponse.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.DiffGenerationResponse} returns this
 */
proto.gemini.DiffGenerationResponse.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional DiffPreview diff = 2;
 * @return {?proto.gemini.DiffPreview}
 */
proto.gemini.DiffGenerationResponse.prototype.getDiff = function() {
  return /** @type{?proto.gemini.DiffPreview} */ (
    jspb.Message.getWrapperField(this, proto.gemini.DiffPreview, 2));
};


/**
 * @param {?proto.gemini.DiffPreview|undefined} value
 * @return {!proto.gemini.DiffGenerationResponse} returns this
*/
proto.gemini.DiffGenerationResponse.prototype.setDiff = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.DiffGenerationResponse} returns this
 */
proto.gemini.DiffGenerationResponse.prototype.clearDiff = function() {
  return this.setDiff(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.DiffGenerationResponse.prototype.hasDiff = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string error_message = 3;
 * @return {string}
 */
proto.gemini.DiffGenerationResponse.prototype.getErrorMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.DiffGenerationResponse} returns this
 */
proto.gemini.DiffGenerationResponse.prototype.setErrorMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.FileOperationResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.FileOperationResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.FileOperationResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileOperationResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    operationId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    preview: (f = msg.getPreview()) && proto.gemini.DiffPreview.toObject(includeInstance, f),
    errorMessage: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.FileOperationResponse}
 */
proto.gemini.FileOperationResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.FileOperationResponse;
  return proto.gemini.FileOperationResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.FileOperationResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.FileOperationResponse}
 */
proto.gemini.FileOperationResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setOperationId(value);
      break;
    case 3:
      var value = new proto.gemini.DiffPreview;
      reader.readMessage(value,proto.gemini.DiffPreview.deserializeBinaryFromReader);
      msg.setPreview(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setErrorMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.FileOperationResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.FileOperationResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.FileOperationResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileOperationResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getOperationId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getPreview();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.gemini.DiffPreview.serializeBinaryToWriter
    );
  }
  f = message.getErrorMessage();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.gemini.FileOperationResponse.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gemini.FileOperationResponse} returns this
 */
proto.gemini.FileOperationResponse.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string operation_id = 2;
 * @return {string}
 */
proto.gemini.FileOperationResponse.prototype.getOperationId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileOperationResponse} returns this
 */
proto.gemini.FileOperationResponse.prototype.setOperationId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional DiffPreview preview = 3;
 * @return {?proto.gemini.DiffPreview}
 */
proto.gemini.FileOperationResponse.prototype.getPreview = function() {
  return /** @type{?proto.gemini.DiffPreview} */ (
    jspb.Message.getWrapperField(this, proto.gemini.DiffPreview, 3));
};


/**
 * @param {?proto.gemini.DiffPreview|undefined} value
 * @return {!proto.gemini.FileOperationResponse} returns this
*/
proto.gemini.FileOperationResponse.prototype.setPreview = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gemini.FileOperationResponse} returns this
 */
proto.gemini.FileOperationResponse.prototype.clearPreview = function() {
  return this.setPreview(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gemini.FileOperationResponse.prototype.hasPreview = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string error_message = 4;
 * @return {string}
 */
proto.gemini.FileOperationResponse.prototype.getErrorMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileOperationResponse} returns this
 */
proto.gemini.FileOperationResponse.prototype.setErrorMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gemini.FileMetadata.prototype.toObject = function(opt_includeInstance) {
  return proto.gemini.FileMetadata.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gemini.FileMetadata} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileMetadata.toObject = function(includeInstance, msg) {
  var f, obj = {
    path: jspb.Message.getFieldWithDefault(msg, 1, ""),
    size: jspb.Message.getFieldWithDefault(msg, 2, 0),
    mtime: jspb.Message.getFieldWithDefault(msg, 3, 0),
    type: jspb.Message.getFieldWithDefault(msg, 4, ""),
    permissions: jspb.Message.getFieldWithDefault(msg, 5, ""),
    checksum: jspb.Message.getFieldWithDefault(msg, 6, ""),
    encoding: jspb.Message.getFieldWithDefault(msg, 7, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gemini.FileMetadata}
 */
proto.gemini.FileMetadata.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gemini.FileMetadata;
  return proto.gemini.FileMetadata.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gemini.FileMetadata} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gemini.FileMetadata}
 */
proto.gemini.FileMetadata.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setPath(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setSize(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setMtime(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setType(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setPermissions(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setChecksum(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setEncoding(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gemini.FileMetadata.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gemini.FileMetadata.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gemini.FileMetadata} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gemini.FileMetadata.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPath();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSize();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getMtime();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getType();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getPermissions();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getChecksum();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getEncoding();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
};


/**
 * optional string path = 1;
 * @return {string}
 */
proto.gemini.FileMetadata.prototype.getPath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileMetadata} returns this
 */
proto.gemini.FileMetadata.prototype.setPath = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int64 size = 2;
 * @return {number}
 */
proto.gemini.FileMetadata.prototype.getSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.FileMetadata} returns this
 */
proto.gemini.FileMetadata.prototype.setSize = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int64 mtime = 3;
 * @return {number}
 */
proto.gemini.FileMetadata.prototype.getMtime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.gemini.FileMetadata} returns this
 */
proto.gemini.FileMetadata.prototype.setMtime = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional string type = 4;
 * @return {string}
 */
proto.gemini.FileMetadata.prototype.getType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileMetadata} returns this
 */
proto.gemini.FileMetadata.prototype.setType = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string permissions = 5;
 * @return {string}
 */
proto.gemini.FileMetadata.prototype.getPermissions = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileMetadata} returns this
 */
proto.gemini.FileMetadata.prototype.setPermissions = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string checksum = 6;
 * @return {string}
 */
proto.gemini.FileMetadata.prototype.getChecksum = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileMetadata} returns this
 */
proto.gemini.FileMetadata.prototype.setChecksum = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string encoding = 7;
 * @return {string}
 */
proto.gemini.FileMetadata.prototype.getEncoding = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.gemini.FileMetadata} returns this
 */
proto.gemini.FileMetadata.prototype.setEncoding = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * @enum {number}
 */
proto.gemini.AutoCompleteContext = {
  CONTEXT_CHAT_INPUT: 0,
  CONTEXT_FILE_PATH: 1,
  CONTEXT_COMMAND: 2
};

/**
 * @enum {number}
 */
proto.gemini.ApprovalMode = {
  APPROVAL_MODE_UNSPECIFIED: 0,
  DEFAULT: 1,
  AUTO_EDIT: 2,
  YOLO: 3
};

/**
 * @enum {number}
 */
proto.gemini.CompletionType = {
  COMPLETION_FILE_PATH: 0,
  COMPLETION_COMMAND: 1,
  COMPLETION_TOOL_NAME: 2,
  COMPLETION_MODEL_NAME: 3
};

/**
 * @enum {number}
 */
proto.gemini.FileOperation = {
  CREATE: 0,
  EDIT: 1,
  DELETE: 2,
  RENAME: 3
};

goog.object.extend(exports, proto.gemini);
