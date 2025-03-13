import { defineQuery } from "groq";

export const ACADEMIC_QUERY =
  defineQuery(`*[_type == "academics"] | order(end desc) {
        _id,
        name,
        qualification,
        start,
        end,
        "image": image.asset->url
      }`);

export const EXPERIENCE_QUERY =
  defineQuery(`*[_type == "experience"] | order(joining_date desc) {
        _id,
        company_name,
        company_url,
        my_role,
        company_description,
        joining_date,
        current_company,
        exit_date,
        "company_logo": company_logo.asset->url,
        "skills": skills[]->{ skill }
      }`);

export const PROJECTS_QUERY = defineQuery(`*[_type == "projects"] {
        _id,
        project_name,
        project_url,
        project_description,
        "project_logo": project_logo.asset->url,
        "skills": skills[]->{ skill }
      }`);

export const SKILLS_QUERY = defineQuery(`*[_type == "skills"] {
        _id,
        skill,
        level,
        experience,
        "skill_logo": skill_logo.asset->url
      }`);
