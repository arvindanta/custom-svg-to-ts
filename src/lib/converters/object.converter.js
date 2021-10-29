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
Object.defineProperty(exports, "__esModule", { value: true });
const file_helpers_1 = require("../helpers/file-helpers");
const logger_1 = require("../helpers/logger");
const monitor_1 = require("../helpers/monitor");
const shared_converter_1 = require("./shared.converter");
const generateSVGObject = (svgDefinitions, objectName) => __awaiter(void 0, void 0, void 0, function* () {
    const svgObject = {};
    svgDefinitions.forEach((svgDefinition) => (svgObject[svgDefinition.typeName] = svgDefinition.data));
    return !objectName
        ? `export default ${JSON.stringify(svgObject)}`
        : `export const ${objectName} = ${JSON.stringify(svgObject)}`;
});
exports.convertToSingleObject = (conversionOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { outputDirectory, fileName, objectName } = conversionOptions;
    const svgDefinitions = yield monitor_1.callAndMonitorAsync(shared_converter_1.filesProcessor.bind({}, conversionOptions), 'Processing SVG files');
    const fileContent = yield monitor_1.callAndMonitorAsync(generateSVGObject.bind({}, svgDefinitions, objectName), 'Generate SVG Object');
    yield monitor_1.callAndMonitorAsync(file_helpers_1.writeFile.bind({}, outputDirectory, fileName, fileContent), 'Write content to file');
    logger_1.Logger.generationSuccess(outputDirectory);
});
//# sourceMappingURL=object.converter.js.map