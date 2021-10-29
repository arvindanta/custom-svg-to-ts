"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts = __importStar(require("typescript"));
exports.compile = (filePaths) => {
    const compilerOptions = {
        noEmitOnError: false,
        noImplicitAny: true,
        declaration: true,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext
    };
    ts.createProgram(filePaths, compilerOptions).emit();
};
//# sourceMappingURL=typescript-compiler.js.map