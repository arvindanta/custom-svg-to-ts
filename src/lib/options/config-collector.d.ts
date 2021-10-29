import { FileConversionOptions, ObjectConversionOptions, ConstantsConversionOptions } from './conversion-options';
export declare const collectConfigurationOptions: () => Promise<FileConversionOptions | ConstantsConversionOptions | ObjectConversionOptions | (FileConversionOptions | ConstantsConversionOptions | ObjectConversionOptions)[]>;
export declare const mergeWithDefaults: (options: any) => Promise<FileConversionOptions | ConstantsConversionOptions | ObjectConversionOptions>;
