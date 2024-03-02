import { BaseTemplate } from "./baseTemplate.js";
import { TemplateTokens } from "./templateTokens.js";

class NicolasOmarTemplate extends BaseTemplate {
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
                replacements[TemplateTokens.GITHUB] = `\\github{${data.socialMedia.github.username}}`;
            }
            if (data.socialMedia.linkedin) {
                replacements[TemplateTokens.LINKEDIN] = `\\linkedin{${data.socialMedia.linkedin.username}}`;
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
        let result = "\\cvsection{Languages}\n";
        for (let language of languages) {
            result += `\\cvlang{${language.name}}{${language.level}}\n`;
            result += "\\divider\n"
        }
        return result;
    }

    fillExperience(experience) {
        let result = "";
        for (let job of experience) {
            if (!job.endDate) {
                job.endDate = "Present";
            }
            result += `\\cvevent{${job.position}}{${job.company}}{${job.startDate} -- ${job.endDate}}{${job.location}}\n`;
            result += `\\begin{itemize}\n`;
            for (let task of job.description) {
                result += `\\item ${task}\n`;
            }
            result += `\\end{itemize}\n`;
            result += "\\divider\n"
        }
        result = result.slice(0, -9);

        return result;
    }

    fillEducation(education) {
        let result = "";
        for (let school of education) {
            if (!school.endDate) {
                school.endDate = "Present";
            }
            result += `\\cvevent{${school.title}}{${school.institution}}{${school.startDate} -- ${school.endDate}}{${school.location}}\n`;
            result += `\\begin{itemize}\n`;
            for (let task of school.description) {
                result += `\\item ${task}\n`;
            }
            result += `\\end{itemize}\n`;
            result += "\\divider\n"
        }
        result = result.slice(0, -9);

        return result;
    }

    fillProjects(projects) {
        let result = "";
        for (let project of projects) {
            let reference = "";
            if (project.github) {
                reference += `\\cvreference{\\faGithub}{${project.github}}`
            }
            if (project.website) {
                reference += `\\cvreference{| \\faGlobe}{${project.website}}`
            }
            result += `\\cvevent{${project.title}}{${reference}}{}{}\n`
            result += `\\begin{itemize}\n`;
            for (let task of project.description) {
                result += `\\item ${task}\n`;
            }
            result += `\\end{itemize}\n`;
            result += "\\divider\n"
        }
        result = result.slice(0, -9);
        return result;
    }

}

export { NicolasOmarTemplate }