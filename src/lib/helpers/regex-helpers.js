"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = require("glob");
const util = __importStar(require("util"));
const logger_1 = require("./logger");
const getFilesFromRegex = util.promisify(glob_1.Glob);
exports.getFilePathsFromRegex = (srcFiles) => __awaiter(void 0, void 0, void 0, function* () {
    const srcFilesRegexExpressions = srcFiles;
    const filePaths = [];
    for (const regex of srcFilesRegexExpressions) {
        const directoryFiles = yield getFilesFromRegex(regex, {
            nodir: true
        });
        if (directoryFiles.length === 0) {
            logger_1.Logger.verboseInfo(`No matching files for regex: "${regex}"`);
        }
        else {
            filePaths.push(...directoryFiles);
        }
    }
    return filePaths;
});
//# sourceMappingURL=regex-helpers.js.map