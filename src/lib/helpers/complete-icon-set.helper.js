"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code_snippet_generators_1 = require("../generators/code-snippet-generators");
exports.generateCompleteIconSetContent = (svgDefinitions) => {
    const importSection = generateImportSection(svgDefinitions);
    const exportSection = generateExportSection(svgDefinitions);
    return `${importSection}${exportSection}`;
};
const generateImportSection = (svgDefinitions) => svgDefinitions.reduce((acc, svgDefinition) => {
    acc += code_snippet_generators_1.generateNamedImportStatement(svgDefinition.variableName, `./${svgDefinition.prefix}-${svgDefinition.filenameWithoutEnding}.icon`);
    return acc;
}, '');
const generateExportSection = (svgDefinitions) => svgDefinitions.reduce((acc, svgDefinition, index) => {
    if (index === svgDefinitions.length - 1) {
        acc += `${svgDefinition.variableName}];`;
    }
    else {
        acc += `${svgDefinition.variableName},`;
    }
    return acc;
}, `export const completeIconSet = [`);
//# sourceMappingURL=complete-icon-set.helper.js.map