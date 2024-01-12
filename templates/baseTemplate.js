class BaseTemplate {
    fillTemplate(template, data) {
        throw new Error("Method not implemented.");
    }

    replaceTokens(text, replacements) {
        let result = text;
        for (let token in replacements) {
            let safeToken = token.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            let regex = new RegExp(safeToken, 'g');
            result = result.replace(regex, replacements[token]);
        }
        return result;
    }
}

export { BaseTemplate }