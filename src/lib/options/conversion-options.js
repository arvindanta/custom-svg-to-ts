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
const logger_1 = require("../helpers/logger");
const command_line_collector_1 = require("./command-line-collector");
const config_collector_1 = require("./config-collector");
var ConversionType;
(function (ConversionType) {
    ConversionType["OBJECT"] = "object";
    ConversionType["CONSTANTS"] = "constants";
    ConversionType["FILES"] = "files";
})(ConversionType = exports.ConversionType || (exports.ConversionType = {}));
exports.getOptions = () => __awaiter(void 0, void 0, void 0, function* () {
    const configOptions = yield config_collector_1.collectConfigurationOptions();
    if (configOptions) {
        return configOptions;
    }
    logger_1.Logger.verboseInfo('No configuration found in package.json nor rc file - checking for arguments and applying defaults (see --help)');
    return command_line_collector_1.collectCommandLineOptions();
});
//# sourceMappingURL=conversion-options.js.map