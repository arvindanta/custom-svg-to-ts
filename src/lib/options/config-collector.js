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
const cosmiconfig_1 = require("cosmiconfig");
const packgeJSON = __importStar(require("../../../package.json"));
const code_snippet_generators_1 = require("../generators/code-snippet-generators");
const logger_1 = require("../helpers/logger");
const svg_optimization_1 = require("../helpers/svg-optimization");
const command_line_collector_1 = require("./command-line-collector");
const conversion_options_1 = require("./conversion-options");
const default_options_1 = require("./default-options");
exports.collectConfigurationOptions = () => __awaiter(void 0, void 0, void 0, function* () {
    const explorerSync = cosmiconfig_1.cosmiconfigSync(packgeJSON.name);
    const configPath = command_line_collector_1.getConfigPath();
    const cosmiConfigResult = configPath ? explorerSync.load(configPath) : explorerSync.search();
    cosmiConfigResult
        ? logger_1.Logger.verboseInfo(`Configuration found under: ${cosmiConfigResult.filepath}`)
        : logger_1.Logger.verboseInfo('No config found');
    if (!cosmiConfigResult) {
        return null;
    }
    if (Array.isArray(cosmiConfigResult.config)) {
        return Promise.all(cosmiConfigResult.config.map((config) => exports.mergeWithDefaults(config)));
    }
    return yield exports.mergeWithDefaults(cosmiConfigResult.config);
});
exports.mergeWithDefaults = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const configOptions = Object.assign({}, options);
    if (!options.conversionType) {
        logger_1.Logger.error(`A conversionType is required, please specify one by passing it via --conversionType. 
    Valid conversion types are (object, constants or files)`);
        process.exit();
    }
    if (!configOptions.verbose) {
        configOptions.verbose = default_options_1.DEFAULT_OPTIONS.verbose;
        logger_1.Logger.verboseInfo(`No "verbose" property provided, "${default_options_1.DEFAULT_OPTIONS.verbose}" will be used`);
    }
    if (!configOptions.outputDirectory) {
        configOptions.outputDirectory = default_options_1.DEFAULT_OPTIONS.outputDirectory;
        logger_1.Logger.verboseInfo(`No outputDirectory provided, "${default_options_1.DEFAULT_OPTIONS.outputDirectory}" will be used`);
    }
    if (!configOptions.srcFiles) {
        configOptions.srcFiles = default_options_1.DEFAULT_OPTIONS.srcFiles;
        logger_1.Logger.verboseInfo(`No srcFiles provided, "${default_options_1.DEFAULT_OPTIONS.srcFiles}" will be used`);
    }
    if (!configOptions.svgoConfig) {
        logger_1.Logger.verboseInfo(`No svgoConfig provided, default configuration of SVGO will be used`);
    }
    configOptions.svgoConfig = yield svg_optimization_1.getSvgoConfig(configOptions.svgoConfig);
    if (!configOptions.delimiter) {
        configOptions.delimiter = options.conversionType === conversion_options_1.ConversionType.OBJECT ? code_snippet_generators_1.Delimiter.CAMEL : code_snippet_generators_1.Delimiter.SNAKE;
        logger_1.Logger.verboseInfo(`No delimiter provided, "${configOptions.delimiter}" will be used`);
    }
    if (options.conversionType === conversion_options_1.ConversionType.CONSTANTS || options.conversionType === conversion_options_1.ConversionType.OBJECT) {
        if (!configOptions.fileName) {
            configOptions.fileName = default_options_1.DEFAULT_OPTIONS.modelFileName;
            logger_1.Logger.verboseInfo(`No fileName provided, "${default_options_1.DEFAULT_OPTIONS.modelFileName}" will be used`);
        }
    }
    if (options.conversionType === conversion_options_1.ConversionType.CONSTANTS || options.conversionType === conversion_options_1.ConversionType.FILES) {
        if (!configOptions.typeName) {
            configOptions.typeName = default_options_1.DEFAULT_OPTIONS.typeName;
            logger_1.Logger.verboseInfo(`No typeName provided, "${default_options_1.DEFAULT_OPTIONS.typeName}" will be used`);
        }
        if (configOptions.generateType === undefined) {
            configOptions.generateType = default_options_1.DEFAULT_OPTIONS.generateType;
            logger_1.Logger.verboseInfo(`No generateType provided, "${default_options_1.DEFAULT_OPTIONS.generateType}" will be used`);
        }
        if (configOptions.generateTypeObject === undefined) {
            configOptions.generateTypeObject = default_options_1.DEFAULT_OPTIONS.generateTypeObject;
            logger_1.Logger.verboseInfo(`No generateTypeObject provided, "${default_options_1.DEFAULT_OPTIONS.generateTypeObject}" will be used`);
        }
        if (!configOptions.interfaceName) {
            configOptions.interfaceName = default_options_1.DEFAULT_OPTIONS.interfaceName;
            logger_1.Logger.verboseInfo(`No interfaceName provided, "${default_options_1.DEFAULT_OPTIONS.interfaceName}" will be used`);
        }
        if (typeof configOptions.prefix !== 'string') {
            configOptions.prefix = default_options_1.DEFAULT_OPTIONS.prefix;
            logger_1.Logger.verboseInfo(`No prefix provided, "${default_options_1.DEFAULT_OPTIONS.prefix}" will be used`);
        }
    }
    if (configOptions.conversionType === conversion_options_1.ConversionType.FILES) {
        if (!configOptions.modelFileName) {
            configOptions.modelFileName = default_options_1.DEFAULT_OPTIONS.modelFileName;
            logger_1.Logger.verboseInfo(`No modelFileName provided, "${default_options_1.DEFAULT_OPTIONS.modelFileName}" will be used`);
        }
        if (!configOptions.iconsFolderName) {
            configOptions.iconsFolderName = default_options_1.DEFAULT_OPTIONS.iconsFolderName;
            logger_1.Logger.verboseInfo(`No iconsFolderName provided, "${default_options_1.DEFAULT_OPTIONS.iconsFolderName}" will be used`);
        }
        if (!configOptions.compileSources) {
            configOptions.compileSources = default_options_1.DEFAULT_OPTIONS.compileSources;
            logger_1.Logger.verboseInfo(`No preCompileSources flag provided, "${default_options_1.DEFAULT_OPTIONS.compileSources}" will be used`);
        }
        if (!configOptions.exportCompleteIconSet) {
            configOptions.exportCompleteIconSet = default_options_1.DEFAULT_OPTIONS.exportCompleteIconSet;
            logger_1.Logger.verboseInfo(`No preCompileSources flag provided, "${default_options_1.DEFAULT_OPTIONS.exportCompleteIconSet}" will be used`);
        }
        if (!configOptions.barrelFileName) {
            configOptions.barrelFileName = default_options_1.DEFAULT_OPTIONS.barrelFileName;
            logger_1.Logger.verboseInfo(`No preCompileSources flag provided, "${default_options_1.DEFAULT_OPTIONS.barrelFileName}" will be used`);
        }
        return configOptions;
    }
    return configOptions;
});
//# sourceMappingURL=config-collector.js.map