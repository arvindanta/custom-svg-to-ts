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
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const logger_1 = require("./logger");
exports.generateSpinner = (text) => ora_1.default({ text, spinner: 'runner', prefixText: chalk_1.default.blue(logger_1.messagePrefix) });
exports.callAndMonitorAsync = (fn, spinnerMessage) => __awaiter(void 0, void 0, void 0, function* () {
    const spinner = exports.generateSpinner(spinnerMessage).start();
    try {
        const result = yield fn();
        spinner.succeed();
        return result;
    }
    catch (exception) {
        spinner.fail();
        logger_1.Logger.error(exception);
        process.exit(1);
    }
});
exports.callAndMonitor = (fn, spinnerMessage) => {
    const spinner = exports.generateSpinner(spinnerMessage).start();
    try {
        const result = fn();
        spinner.succeed();
        return result;
    }
    catch (exception) {
        spinner.fail();
        logger_1.Logger.error(exception);
        process.exit(1);
    }
};
//# sourceMappingURL=monitor.js.map