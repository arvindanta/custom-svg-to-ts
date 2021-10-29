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
const code_snippet_generators_1 = require("../generators/code-snippet-generators");
const file_helpers_1 = require("../helpers/file-helpers");
const logger_1 = require("../helpers/logger");
const monitor_1 = require("../helpers/monitor");
const shared_converter_1 = require("./shared.converter");
const getSvgConstants = (svgDefinitions) => {
    const svgConstants = svgDefinitions.map(svgDefinition => code_snippet_generators_1.generateSvgConstant(svgDefinition.variableName, svgDefinition.typeName, svgDefinition.data));
    return svgConstants.join('');
};
exports.convertToConstants = (conversionOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { outputDirectory, fileName, interfaceName } = conversionOptions;
    const svgDefinitions = yield monitor_1.callAndMonitorAsync(shared_converter_1.filesProcessor.bind({}, conversionOptions), 'Processing SVG files');
    if (svgDefinitions.length) {
        const svgContants = monitor_1.callAndMonitor(getSvgConstants.bind({}, svgDefinitions), 'Generate SVG constants');
        const typeDefinition = monitor_1.callAndMonitor(code_snippet_generators_1.generateTypeDefinition.bind({}, conversionOptions, svgDefinitions), 'Generate type definitions');
        const interfaceDefinition = monitor_1.callAndMonitor(code_snippet_generators_1.generateInterfaceDefinition.bind({}, conversionOptions), 'Generate Interface Definition');
        const typeHelper = monitor_1.callAndMonitor(code_snippet_generators_1.generateTypeHelper.bind({}, interfaceName), 'Generate Type Helper');
        const fileContent = `${svgContants}${typeDefinition}${interfaceDefinition}${typeHelper}`;
        yield monitor_1.callAndMonitorAsync(file_helpers_1.writeFile.bind({}, outputDirectory, fileName, fileContent), `Writing files to ${outputDirectory}`);
        logger_1.Logger.generationSuccess(outputDirectory);
    }
});
//# sourceMappingURL=constants.converter.js.map