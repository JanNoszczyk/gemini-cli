import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROTO_DIR = path.resolve(__dirname, '../');
const OUT_DIR = path.resolve(__dirname, '../src/proto');

execSync(`mkdir -p ${OUT_DIR}`);

execSync(`grpc_tools_node_protoc --js_out=import_style=commonjs,binary:${OUT_DIR} --grpc_out=grpc_js:${OUT_DIR} --plugin=protoc-gen-grpc=$(which grpc_tools_node_protoc_plugin) -I ${PROTO_DIR} ${PROTO_DIR}/gemini.v1.proto`);

execSync(`grpc_tools_node_protoc --ts_out=grpc_js:${OUT_DIR} --plugin=protoc-gen-ts=$(which protoc-gen-ts) -I ${PROTO_DIR} ${PROTO_DIR}/gemini.v1.proto`);
