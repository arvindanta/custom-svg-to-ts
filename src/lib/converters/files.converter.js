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
const typescript_compiler_1 = require("../compiler/typescript-compiler");
const code_snippet_generators_1 = require("../generators/code-snippet-generators");
const complete_icon_set_helper_1 = require("../helpers/complete-icon-set.helper");
const file_helpers_1 = require("../helpers/file-helpers");
const logger_1 = require("../helpers/logger");
const monitor_1 = require("../helpers/monitor");
const regex_helpers_1 = require("../helpers/regex-helpers");
const shared_converter_1 = require("./shared.converter");
const completeIconSetFileName = 'complete-icon-set';
const generateSVGConstants = (svgDefinitions, outputDirectory, iconsFolderName) => __awaiter(void 0, void 0, void 0, function* () {
    const generatedFileNames = [];
    yield Promise.all(svgDefinitions.map((svgDefinition) => __awaiter(void 0, void 0, void 0, function* () {
        const svgConstant = code_snippet_generators_1.generateSvgConstant(svgDefinition.variableName, svgDefinition.typeName, svgDefinition.data);
        const generatedFileName = `${svgDefinition.prefix}-${svgDefinition.filenameWithoutEnding}.icon`;
        generatedFileNames.push(generatedFileName);
        yield file_helpers_1.writeFile(`${outputDirectory}/${iconsFolderName}`, generatedFileName, svgConstant);
        logger_1.Logger.verboseInfo(`write file svg: ${outputDirectory}/${iconsFolderName}/${generatedFileName}.ts`);
    })));
    return generatedFileNames;
});
const generateCompleteIconSet = (svgDefinitions, outputDirectory, iconsFolderName) => __awaiter(void 0, void 0, void 0, function* () {
    const completeIconSetContent = complete_icon_set_helper_1.generateCompleteIconSetContent(svgDefinitions);
    yield file_helpers_1.writeFile(`${outputDirectory}/${iconsFolderName}`, completeIconSetFileName, completeIconSetContent);
});
const generateModelFile = (conversionOptions, svgDefinitions) => __awaiter(void 0, void 0, void 0, function* () {
    const { outputDirectory, modelFileName, additionalModelOutputPath, iconsFolderName } = conversionOptions;
    const typeDefinition = code_snippet_generators_1.generateTypeDefinition(conversionOptions, svgDefinitions);
    const enumDefinition = code_snippet_generators_1.generateEnumDefinition(conversionOptions, svgDefinitions);
    const interfaceDefinition = code_snippet_generators_1.generateInterfaceDefinition(conversionOptions);
    const modelFile = `${typeDefinition}${interfaceDefinition}${enumDefinition}`;
    yield file_helpers_1.writeFile(`${outputDirectory}/${iconsFolderName}`, modelFileName, modelFile);
    logger_1.Logger.verboseInfo(`model-file successfully generated under ${outputDirectory}/${iconsFolderName}/${modelFileName}.ts`);
    if (additionalModelOutputPath) {
        yield file_helpers_1.writeFile(`${additionalModelOutputPath}`, modelFileName, modelFile);
        logger_1.Logger.verboseInfo(`additional model-file successfully generated under ${additionalModelOutputPath}/${modelFileName}.ts`);
    }
    return modelFile;
});
const compileTypeScriptToJS = (outputDirectory, iconsFolderName, barrelFileName) => __awaiter(void 0, void 0, void 0, function* () {
    const generatedTypeScriptFilePaths = yield regex_helpers_1.getFilePathsFromRegex([
        `${outputDirectory}/${iconsFolderName}/*.ts`,
        `${outputDirectory}/${barrelFileName}.ts`
    ]);
    typescript_compiler_1.compile(generatedTypeScriptFilePaths);
    file_helpers_1.deleteFiles(generatedTypeScriptFilePaths);
});
exports.convertToFiles = (conversionOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { outputDirectory, modelFileName, additionalModelOutputPath, iconsFolderName, interfaceName, compileSources, exportCompleteIconSet, barrelFileName } = conversionOptions;
    yield monitor_1.callAndMonitorAsync(file_helpers_1.deleteFolder.bind({}, `${outputDirectory}/${iconsFolderName}`), 'Deleting the output folder');
    const svgDefinitions = yield monitor_1.callAndMonitorAsync(shared_converter_1.filesProcessor.bind({}, conversionOptions), 'Processing SVG files');
    const generatedFileNames = yield monitor_1.callAndMonitorAsync(generateSVGConstants.bind({}, svgDefinitions, outputDirectory, iconsFolderName), 'Generate SVG constants');
    if (exportCompleteIconSet) {
        yield monitor_1.callAndMonitorAsync(generateCompleteIconSet.bind({}, svgDefinitions, outputDirectory, iconsFolderName), 'Export complete icon set');
        generatedFileNames.push(completeIconSetFileName);
    }
    let indexFileContent = monitor_1.callAndMonitor(code_snippet_generators_1.generateTypeHelperWithImport.bind({}, interfaceName, iconsFolderName, modelFileName), 'Generate Type Helper');
    indexFileContent += generatedFileNames
        .map((generatedFileName) => code_snippet_generators_1.generateExportStatement(generatedFileName, iconsFolderName))
        .join('');
    indexFileContent += code_snippet_generators_1.generateExportStatement(modelFileName, iconsFolderName);
    yield monitor_1.callAndMonitorAsync(file_helpers_1.writeFile.bind({}, outputDirectory, barrelFileName, indexFileContent), 'Generate barrel file');
    if (modelFileName) {
        const modelFile = yield monitor_1.callAndMonitorAsync(generateModelFile.bind({}, conversionOptions, svgDefinitions), 'Generate model file');
        if (additionalModelOutputPath) {
            yield monitor_1.callAndMonitorAsync(file_helpers_1.writeFile.bind({}, `${additionalModelOutputPath}`, modelFileName, modelFile), 'Write model file to additional output path');
        }
    }
    if (compileSources) {
        yield monitor_1.callAndMonitorAsync(compileTypeScriptToJS.bind({}, outputDirectory, iconsFolderName, barrelFileName), 'Compile TypeScript to JavaScript');
    }
    logger_1.Logger.generationSuccess(outputDirectory);
});
//# sourceMappingURL=files.converter.js.map