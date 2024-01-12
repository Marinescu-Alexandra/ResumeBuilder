import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { resumeBuilder } from '../builder/resumeBuilder.js';

const generateRouter = express.Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

generateRouter.get("/getThemes", async (req, res, next) => {
    try {
        let themesPath = path.join(__dirname, "../themes")
        const folderNames = fs.readdirSync(themesPath).filter(file => fs.statSync(path.join(themesPath, file)).isDirectory())
        res.json({ themes: folderNames })
    } catch (error) {
        next(error)
    }
});

generateRouter.get("/:theme", async (req, res, next) => {
    const theme = req.params.theme;
    console.log(theme);
    const data = await resumeBuilder(theme, req.body);
    res.contentType('application/pdf');
    res.send(data);
});

export { generateRouter }