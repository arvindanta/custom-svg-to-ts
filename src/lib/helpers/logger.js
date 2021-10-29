"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const default_options_1 = require("../options/default-options");
exports.messagePrefix = 'svg-to-ts:';
class Logger {
    static changeVisibility(verbose) {
        Logger.verbose = verbose;
    }
    static printWelcomeMessage() {
        console.log(chalk_1.default.blue(`==========================================================`));
        console.log(chalk_1.default.blue(`👷 Hi I am svg-to-ts - let's build an awesome icon library`));
        console.log(chalk_1.default.blue(`==========================================================`));
    }
    static generationSuccess(path) {
        Logger.logWithPrefix(chalk_1.default.underline.green(`🏁 Everything is perfect: Icons succesfully generated under ${chalk_1.default.blue.underline(path)}`));
    }
    static info(message) {
        Logger.logWithPrefix(`ℹ️ ${chalk_1.default.blueBright(message)}`);
    }
    static verboseInfo(message) {
        if (Logger.verbose) {
            Logger.logWithPrefix(`ℹ️ ${chalk_1.default.blueBright(message)}`);
        }
    }
    static error(message) {
        Logger.logWithPrefix(chalk_1.default.red(message));
    }
    static logWithPrefix(messageLog) {
        console.log(chalk_1.default.blue(exports.messagePrefix), messageLog);
    }
}
exports.Logger = Logger;
Logger.verbose = default_options_1.DEFAULT_OPTIONS.verbose;
//# sourceMappingURL=logger.js.map