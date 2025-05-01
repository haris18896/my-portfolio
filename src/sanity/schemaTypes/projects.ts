import { defineField, defineType } from "sanity";
import { FolderKanbanIcon } from "lucide-react";

// Define categories as a constant for reuse
const projectCategories = [
  { title: "Frontend", value: "frontend" },
  { title: "Backend", value: "backend" },
  { title: "Full Stack", value: "fullstack" },
  { title: "Mobile", value: "mobile" },
  { title: "Data Science", value: "datascience" },
  { title: "DevOps", value: "devops" },
  { title: "Other", value: "other" },
];

export const projects = defineType({
  name: "projects",
  title: "Projects",
  type: "document",
  icon: FolderKanbanIcon,
  fields: [
    defineField({
      name: "project_name",
      title: "Project Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Project name is required"),
    }),
    defineField({
      name: "project_url",
      title: "Project URL",
      type: "url",
    }),
    defineField({
      name: "project_description",
      title: "Description",
      type: "string",
      validation: (Rule) => Rule.required().error("Description is required"),
    }),
    defineField({
      name: "project_logo",
      type: "image",
      title: "Logo",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Logo is required"),
    }),
    defineField({
      name: "categories",
      title: "Project Categories",
      description: "Select one or more categories that apply to this project",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: projectCategories,
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).error("At least one category is required"),
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "skills" }],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("At least one skill is required"),
    }),
  ],
});
