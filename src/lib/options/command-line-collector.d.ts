import { ConstantsConversionOptions, FileConversionOptions, ObjectConversionOptions } from './conversion-options';
export declare const setupCommander: () => void;
export declare const getConfigPath: () => string;
export declare const collectCommandLineOptions: () => Promise<FileConversionOptions | ConstantsConversionOptions | ObjectConversionOptions>;
