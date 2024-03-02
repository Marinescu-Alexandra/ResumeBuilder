import { BaseTemplate } from "./baseTemplate.js";
import { TemplateTokens } from "./templateTokens.js";

class OmarRoldanTemplate extends BaseTemplate {
    fillTemplate(template, data) {
        template = this.fillTokens(template, data);
        return template;
    }

    fillTokens(template, data) {
        const replacements = {
            [TemplateTokens.FULL_NAME]: data.fullName,
            [TemplateTokens.EMAIL]: data.email,
            [TemplateTokens.PHONE_NUMBER]: data.phone,
            [TemplateTokens.LOCATION]: data.location,
            [TemplateTokens.JOB_TITLE]: data.jobTitle,
            [TemplateTokens.ABOUT_ME]: data.aboutMe,
            [TemplateTokens.SKILLS]: data.skills.join(", "),
            [TemplateTokens.LEARNING]: data.learning.join(", "),
        }

        if (data.socialMedia) {
            if (data.socialMedia.github) {
                replacements[TemplateTokens.GITHUB] = `\\icon{Github}{11}{\\href{${data.socialMedia.github.url}}{github.com/${data.socialMedia.github.username}}}\\\\`;
            }
            if (data.socialMedia.linkedin) {
                replacements[TemplateTokens.LINKEDIN] = `\\icon{LinkedinSquare}{11}{\\href{${data.socialMedia.linkedin.url}}{in/${data.socialMedia.linkedin.username}}}\\\\`;
            }
        }

        if (data.languages?.length > 0) {
            replacements[TemplateTokens.LANGUAGES] = this.fillLanguages(data.languages);
        }

        if (data.experience?.length > 0) {
            replacements[TemplateTokens.EXPERIENCE] = this.fillExperience(data.experience);
        }

        if (data.education?.length > 0) {
            replacements[TemplateTokens.EDUCATION] = this.fillEducation(data.education);
        }

        if (data.projects?.length > 0) {
            replacements[TemplateTokens.PROJECTS] = this.fillProjects(data.projects);
        }

        return this.replaceTokens(template, replacements);
    }

    fillLanguages(languages) {
        let result = "";
        for (let language of languages) {
            if (result.length > 0) {
                result += ", ";
            }
            result += `\\textbf{${language.name}} - ${language.level}`
        }
        result += "\n";
        return result;
    }

    fillExperience(experience) {
        let result = "";
        for (let company of experience) {
            const startDate = new Date(company.startDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit' });
            const endDate = new Date(company.endDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit' });
            result += "\\entry\n";
            result += `{${startDate} - ${endDate}}\n`;
            result += `{${company.position}}\n`;
            result += `{${company.company}}\n`;
            result += '{\\vspace{-10pt}\n';
            result += "\\begin{itemize}[noitemsep,topsep=0pt,parsep=0pt,partopsep=0pt, leftmargin=-1pt]\n";
            for (let task of company.description) {
                result += `\\item ${task}\n`;
            }
            result += "\\end{itemize}}\n";
        }
        return result;
    }


    fillEducation(education) {
        let result = "";
        for (let school of education) {
            const startDate = new Date(school.startDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit' });
            const endDate = new Date(school.endDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit' });
            result += "\\entry\n";
            result += `{${startDate} - ${endDate}}\n`;
            result += `{${school.title}}\n`;
            result += `{${school.institution}}\n`;
            result += `{${school.description.join(" ")}\n}`;
        }
        return result;
    }


    fillProjects(projects) {
        let result = "";
        for (let project of projects) {
            result += "\\entry\n";
            result += `{${project.type}}\n`;
            result += `{${project.title}}\n`;
            result += `{\\icon{Github}{11}{\\href{${project.github.replace(/^https?:\/\//, '')}}{${project.github.replace(/^https?:\/\//, '')}}}}\n`;
            result += `{${project.description.join(" ")}}\n`;
        }
        return result;
    }

}

export { OmarRoldanTemplate }