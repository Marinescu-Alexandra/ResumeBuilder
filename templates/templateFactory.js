import { NicolasOmarTemplate } from "./nicolasOmarTemplate.js";

class TemplateFactory {
    static createTemplate(templateName) {
        switch (templateName) {
            case "NicolasOmar":
                return new NicolasOmarTemplate();
            default:
                return new Error("Unknown type");
        }
    }
}

export { TemplateFactory }