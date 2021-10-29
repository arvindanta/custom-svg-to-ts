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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const packgeJSON = __importStar(require("../../../package.json"));
const code_snippet_generators_1 = require("../generators/code-snippet-generators");
const logger_1 = require("../helpers/logger");
const svg_optimization_1 = require("../helpers/svg-optimization");
const conversion_options_1 = require("./conversion-options");
const default_options_1 = require("./default-options");
exports.setupCommander = () => {
    const collect = (value, previous) => previous.concat([value]);
    commander_1.default
        .version(packgeJSON.version)
        .option('--config <string>', 'path to the configuration file')
        .option('-c --conversionType <ConversionType>', 'conversion type (object, constants, files)')
        .option('--objectName <string>', 'name of the exported object')
        .option('-t --typeName <string>', 'name of the generated enumeration type', default_options_1.DEFAULT_OPTIONS.typeName)
        .option('--generateType <boolean>', 'prevent generating enumeration type', default_options_1.DEFAULT_OPTIONS.generateType)
        .option('--generateTypeObject <boolean>', 'generate type object', default_options_1.DEFAULT_OPTIONS.generateTypeObject)
        .option('-f --fileName <string>', 'name of the generated file', default_options_1.DEFAULT_OPTIONS.fileName)
        .option('--barrelFileName <string>', 'name to use for the barrel file', default_options_1.DEFAULT_OPTIONS.barrelFileName)
        .option('-d --delimiter <Delimiter>', `delimiter which is used to generate the types and name properties (${Object.values(code_snippet_generators_1.Delimiter).join(',')})`)
        .option('-p --prefix <string>', 'prefix for the generated svg constants', default_options_1.DEFAULT_OPTIONS.prefix)
        .option('-i --interfaceName <string>', 'name for the generated interface', default_options_1.DEFAULT_OPTIONS.interfaceName)
        .option('-s --srcFiles <value>', 'name of the source directory', collect, [])
        .option('-o --outputDirectory <string>', 'name of the output directory', default_options_1.DEFAULT_OPTIONS.outputDirectory)
        .option('--svgoConfig <any>', 'Path to svgo configuration JSON or inline svgo configuration object')
        .option('--modelFileName <string>', 'FileName of the model file (only necessary when conversion type is set to files)', default_options_1.DEFAULT_OPTIONS.modelFileName)
        .option('--iconsFolderName <string>', 'Name of the folder the icons will be generated to (only necessary when conversion type is set to files)', default_options_1.DEFAULT_OPTIONS.iconsFolderName)
        .option('--additionalModelOutputPath <string>', 'Additional outputpath for the models file (only helpful when conversion type is set to files)', default_options_1.DEFAULT_OPTIONS.additionalModelOutputPath)
        .option('--compileSources <boolean>', 'Tells if the sources should be precompiled with the TypeScript compiler. If true, you will only end up with d.ts and js files (only necessary when conversion type is set to files)', default_options_1.DEFAULT_OPTIONS.compileSources)
        .option('--exportCompleteIconSet <boolean>', 'Specifies if the complete icon set should be exported or not', default_options_1.DEFAULT_OPTIONS.exportCompleteIconSet)
        .option('--verbose <boolean>', 'Specifies if a verbose log message should be printed or not', default_options_1.DEFAULT_OPTIONS.verbose)
        .parse(process.argv);
};
const toBoolean = (str, defaultValue) => {
    let result = defaultValue;
    switch (str) {
        case 'false':
            result = false;
            break;
        case '':
        case 'true':
            result = true;
            break;
    }
    return result;
};
exports.getConfigPath = () => commander_1.default.config;
exports.collectCommandLineOptions = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!commander_1.default.conversionType) {
        logger_1.Logger.error(`A conversion type is required, please specify one by passing it via --conversionType. 
    Valid conversion types are (object, constants or files)`);
        process.exit();
    }
    let { conversionType, objectName, delimiter, fileName, barrelFileName, interfaceName, enumName, outputDirectory, prefix, typeName, generateType, generateTypeObject, generateEnum, modelFileName, iconsFolderName, additionalModelOutputPath, exportCompleteIconSet, compileSources, verbose } = commander_1.default;
    let svgoConfig = commander_1.default.svgoConfig;
    // Parse boolean values
    generateType = toBoolean(generateType, default_options_1.DEFAULT_OPTIONS.generateType);
    generateTypeObject = toBoolean(generateTypeObject, default_options_1.DEFAULT_OPTIONS.generateTypeObject);
    exportCompleteIconSet = toBoolean(exportCompleteIconSet, default_options_1.DEFAULT_OPTIONS.exportCompleteIconSet);
    compileSources = toBoolean(compileSources, default_options_1.DEFAULT_OPTIONS.compileSources);
    verbose = toBoolean(verbose, default_options_1.DEFAULT_OPTIONS.verbose);
    if (!delimiter) {
        delimiter = conversionType === conversion_options_1.ConversionType.OBJECT ? code_snippet_generators_1.Delimiter.CAMEL : code_snippet_generators_1.Delimiter.SNAKE;
    }
    // Because of commander adding default value to params
    // See: https://stackoverflow.com/questions/30238654/commander-js-collect-multiple-options-always-include-default
    let srcFiles = commander_1.default.srcFiles;
    if (srcFiles.length === 0) {
        srcFiles = default_options_1.DEFAULT_OPTIONS.srcFiles;
    }
    svgoConfig = yield svg_optimization_1.getSvgoConfig(svgoConfig);
    if (conversionType === conversion_options_1.ConversionType.OBJECT) {
        return {
            conversionType,
            delimiter,
            srcFiles,
            outputDirectory,
            svgoConfig,
            fileName,
            objectName,
            verbose
        };
    }
    if (conversionType === conversion_options_1.ConversionType.CONSTANTS) {
        return {
            conversionType,
            delimiter,
            fileName,
            enumName,
            interfaceName,
            srcFiles,
            outputDirectory,
            prefix,
            typeName,
            generateType,
            generateTypeObject,
            generateEnum,
            svgoConfig,
            verbose
        };
    }
    return {
        conversionType,
        delimiter,
        interfaceName,
        srcFiles,
        outputDirectory,
        prefix,
        typeName,
        enumName,
        generateType,
        generateTypeObject,
        generateEnum,
        modelFileName,
        iconsFolderName,
        exportCompleteIconSet,
        svgoConfig,
        additionalModelOutputPath,
        compileSources,
        barrelFileName,
        verbose
    };
});
//# sourceMappingURL=command-line-collector.js.map