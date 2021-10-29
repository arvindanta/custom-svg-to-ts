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
const path = __importStar(require("path"));
const svgo_1 = require("svgo");
const code_snippet_generators_1 = require("../generators/code-snippet-generators");
const file_helpers_1 = require("../helpers/file-helpers");
const logger_1 = require("../helpers/logger");
const regex_helpers_1 = require("../helpers/regex-helpers");
exports.filesProcessor = (conversionOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { prefix, delimiter, interfaceName, srcFiles, svgoConfig } = conversionOptions;
    const filePaths = yield regex_helpers_1.getFilePathsFromRegex(srcFiles);
    // Using Promise.all we are making all files be processed in parallel as they have no dependency on each other
    let svgDefinitions = yield Promise.all(filePaths.map((filePath) => __awaiter(void 0, void 0, void 0, function* () {
        let svgDefinition = null;
        const fileNameWithEnding = path.basename(filePath).replace(`'`, '');
        const [filenameWithoutEnding, extension] = fileNameWithEnding.split('.');
        if (extension === 'svg') {
            const rawSvg = yield file_helpers_1.extractSvgContent(filePath);
            logger_1.Logger.verboseInfo(`optimize svg: ${fileNameWithEnding}`);
            const optimizedSvg = yield svgo_1.optimize(rawSvg, Object.assign({ path: filePath }, svgoConfig));
            const variableName = code_snippet_generators_1.generateVariableName(prefix, filenameWithoutEnding);
            const typeName = code_snippet_generators_1.generateTypeName(filenameWithoutEnding, delimiter);
            svgDefinition = {
                typeName,
                prefix,
                variableName,
                interfaceName,
                data: optimizedSvg.data,
                filenameWithoutEnding
            };
        }
        return svgDefinition;
    })));
    return svgDefinitions.filter(svgDefinition => svgDefinition);
});
//# sourceMappingURL=shared.converter.js.map