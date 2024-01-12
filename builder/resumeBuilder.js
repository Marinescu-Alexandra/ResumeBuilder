import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { exec as execCallback } from 'child_process';
import { TemplateFactory } from '../templates/templateFactory.js';
import { fileURLToPath } from 'url';


const exec = promisify(execCallback);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const resumeBuilder = async (theme, data) => {
    const themeDir = path.join(__dirname, "../themes", theme);
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'latex-'));
    try {
        fs.cpSync(themeDir, tmpDir, { recursive: true });
        fillResume(theme, data, tmpDir);
        await exec(`pdflatex -output-directory=${tmpDir} -aux-directory=${tmpDir} .\\main.tex`);
        const resPath = path.join(tmpDir, "main.pdf");
        const pdfData = await fs.promises.readFile(resPath);
        return pdfData;
    }
    catch (error) {
        console.error(error);
    }
    finally {
        console.log("Cleaning up" + tmpDir)
        fs.rmSync(tmpDir, { recursive: true });
    }

}

const fillResume = (theme, data, tmpDir) => {
    const texFile = path.join(tmpDir, "main.tex");
    const template = fs.readFileSync(texFile, 'utf8');
    const filledTemplate = TemplateFactory.createTemplate(theme).fillTemplate(template, data);
    fs.writeFileSync(texFile, filledTemplate);
}

export { resumeBuilder }