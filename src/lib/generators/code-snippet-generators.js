"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_camelcase_1 = __importDefault(require("lodash.camelcase"));
const lodash_kebabcase_1 = __importDefault(require("lodash.kebabcase"));
const lodash_snakecase_1 = __importDefault(require("lodash.snakecase"));
var Delimiter;
(function (Delimiter) {
    Delimiter["CAMEL"] = "CAMEL";
    Delimiter["KEBAB"] = "KEBAB";
    Delimiter["SNAKE"] = "SNAKE";
    Delimiter["UPPER"] = "UPPER";
})(Delimiter = exports.Delimiter || (exports.Delimiter = {}));
exports.generateInterfaceDefinition = (conversionOptions) => {
    let { interfaceName, enumName = '', typeName = '', generateType, generateTypeObject, generateEnum } = conversionOptions;
    let nameType = 'string';
    if (generateType || generateTypeObject) {
        nameType = typeName;
    }
    // Will rewrite nameType with enumName
    if (generateEnum) {
        nameType = enumName;
    }
    return `export interface ${interfaceName}{
        name: ${nameType};
        data: string;}`;
};
exports.generateTypeDefinition = (conversionOptions, svgDefinitions) => {
    let typesDefinition = '';
    if (conversionOptions.generateType) {
        typesDefinition += `
    export type ${conversionOptions.typeName} = ${svgDefinitions
            .map(({ typeName }, index) => `'${typeName}'${index === svgDefinitions.length - 1 ? '' : ' | '}`)
            .join('')};`;
    }
    if (conversionOptions.generateTypeObject) {
        typesDefinition += `
    export const ${conversionOptions.typeName} = {
      ${svgDefinitions
            .map(({ typeName }, index) => `'${typeName}': '${typeName}'${conversionOptions.generateType ? ` as ${conversionOptions.typeName}` : ''}${index === svgDefinitions.length - 1 ? '' : ','}`)
            .join('')}
    };`;
    }
    return typesDefinition;
};
exports.generateEnumDefinition = (conversionOptions, svgDefinitions) => {
    let enumDefinition = '';
    const { generateEnum, enumName } = conversionOptions;
    if (generateEnum) {
        enumDefinition += `
    export enum ${enumName} {${svgDefinitions
            .map(({ typeName }, index) => `${lodash_snakecase_1.default(typeName).toUpperCase()} = '${typeName}'${index === svgDefinitions.length - 1 ? '}' : ','}`)
            .join('')};`;
    }
    return enumDefinition;
};
exports.generateSvgConstant = (variableName, filenameWithoutEnding, data) => {
    return `export const ${variableName} = \`${data}\``;
};
exports.generateExportStatement = (fileName, generatedIconsFolderName) => {
    if (generatedIconsFolderName) {
        return `export * from './${generatedIconsFolderName}/${fileName}';`;
    }
    return `export * from './${fileName}';`;
};
exports.generateNamedImportStatement = (name, module) => `import {${name}} from '${module}';\n`;
exports.generateTypeName = (filenameWithoutEnding, delimiter) => {
    if (delimiter === Delimiter.CAMEL) {
        return `${lodash_camelcase_1.default(filenameWithoutEnding)}`;
    }
    if (delimiter === Delimiter.KEBAB) {
        return `${lodash_kebabcase_1.default(filenameWithoutEnding)}`;
    }
    if (delimiter === Delimiter.UPPER) {
        return `${lodash_snakecase_1.default(filenameWithoutEnding).toUpperCase()}`;
    }
    return `${lodash_snakecase_1.default(filenameWithoutEnding)}`;
};
exports.generateVariableName = (prefix, filenameWithoutEnding) => {
    const camelCased = lodash_camelcase_1.default(filenameWithoutEnding);
    return prefix ? `${prefix}${capitalize(camelCased)}` : camelCased;
};
exports.generateTypeHelper = (interfaceName) => `
    export type ${interfaceName}NameSubset<T extends Readonly<${interfaceName}[]>> = T[number]['name'];
    `;
exports.generateTypeHelperWithImport = (interfaceName, iconsFolderName, modelFileName) => `
    import {${interfaceName}} from './${iconsFolderName}/${modelFileName}';
    ${exports.generateTypeHelper(interfaceName)}
    `;
const capitalize = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
};
//# sourceMappingURL=code-snippet-generators.js.map