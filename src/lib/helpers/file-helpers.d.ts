export declare const extractSvgContent: (filePath: string) => Promise<string>;
export declare const writeFile: (outputDirectory: string, fileName: string, fileContent: string) => Promise<void>;
export declare const readFile: (filePath: string) => Promise<string>;
export declare const deleteFolder: (directoryPath: string) => Promise<void>;
export declare const deleteFiles: (filePaths: string[]) => void;
