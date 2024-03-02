import { NicolasOmarTemplate } from "./nicolasOmarTemplate.js";
import { OmarRoldanTemplate } from "./omarRoldanTemplate.js";

class TemplateFactory {
    static createTemplate(templateName) {
        switch (templateName) {
            case "NicolasOmar":
                return new NicolasOmarTemplate();
            case "OmarRoldan":
                return new OmarRoldanTemplate();
            default:
                return new Error("Unknown type");
        }
    }
}

export { TemplateFactory }