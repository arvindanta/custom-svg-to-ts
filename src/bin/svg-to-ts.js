#!/usr/bin/env node
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
// import-conductor-skip
const conversion_options_1 = require("../lib/options/conversion-options");
const logger_1 = require("../lib/helpers/logger");
const command_line_collector_1 = require("../lib/options/command-line-collector");
const object_converter_1 = require("../lib/converters/object.converter");
const constants_converter_1 = require("../lib/converters/constants.converter");
const files_converter_1 = require("../lib/converters/files.converter");
const convert = (conversionOptions) => __awaiter(void 0, void 0, void 0, function* () {
    if (conversionOptions.conversionType === conversion_options_1.ConversionType.FILES) {
        logger_1.Logger.info('We are using the conversion type "files"');
        yield files_converter_1.convertToFiles(conversionOptions);
    }
    if (conversionOptions.conversionType === conversion_options_1.ConversionType.CONSTANTS) {
        logger_1.Logger.info('We are using the conversion type "constants"');
        yield constants_converter_1.convertToConstants(conversionOptions);
    }
    if (conversionOptions.conversionType === conversion_options_1.ConversionType.OBJECT) {
        logger_1.Logger.info('We are using the conversion type "object"');
        yield object_converter_1.convertToSingleObject(conversionOptions);
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    command_line_collector_1.setupCommander();
    logger_1.Logger.printWelcomeMessage();
    const conversionOptions = yield conversion_options_1.getOptions();
    if (Array.isArray(conversionOptions)) {
        for (const c of conversionOptions) {
            logger_1.Logger.changeVisibility(c.verbose);
            yield convert(c);
        }
    }
    else {
        logger_1.Logger.changeVisibility(conversionOptions.verbose);
        yield convert(conversionOptions);
    }
}))();
//# sourceMappingURL=svg-to-ts.js.map