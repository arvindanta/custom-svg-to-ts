import { SvgDefinition } from '../converters/shared.converter';
import { FileConversionOptions, ConstantsConversionOptions } from '../options/conversion-options';
export declare enum Delimiter {
    CAMEL = "CAMEL",
    KEBAB = "KEBAB",
    SNAKE = "SNAKE",
    UPPER = "UPPER"
}
export declare const generateInterfaceDefinition: (conversionOptions: FileConversionOptions | ConstantsConversionOptions) => string;
export declare const generateTypeDefinition: (conversionOptions: FileConversionOptions | ConstantsConversionOptions, svgDefinitions: SvgDefinition[]) => string;
export declare const generateEnumDefinition: (conversionOptions: FileConversionOptions | ConstantsConversionOptions, svgDefinitions: SvgDefinition[]) => string;
export declare const generateSvgConstant: (variableName: string, filenameWithoutEnding: string, data: string) => string;
export declare const generateExportStatement: (fileName: string, generatedIconsFolderName?: string) => string;
export declare const generateNamedImportStatement: (name: string, module: string) => string;
export declare const generateTypeName: (filenameWithoutEnding: any, delimiter: Delimiter) => string;
export declare const generateVariableName: (prefix: string, filenameWithoutEnding: any) => string;
export declare const generateTypeHelper: (interfaceName: string) => string;
export declare const generateTypeHelperWithImport: (interfaceName: string, iconsFolderName: string, modelFileName: string) => string;
