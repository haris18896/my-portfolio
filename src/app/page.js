import axios from "axios";
import { Suspense } from "react";

// ** Components
import Hero from "@/components/Hero";
import GitHub from "@/components/GitHub";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import EmailForm from "@/components/emailForm";
import Experience from "@/components/Experience";
import LoadingAnimation from "@/components/LoadingAnimation";

// ** Sanity
import { client } from "@/sanity/lib/client";
import {
  ACADEMIC_QUERY,
  EXPERIENCE_QUERY,
  PROJECTS_QUERY,
  SKILLS_QUERY,
} from "@/sanity/lib/queries";

async function fetchGitHubData() {
  try {
    const response = await axios.post(
      "https://api.github.com/graphql",
      {
        query: `{
          user(login: "haris18896") {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  name
                  description
                  url
                  primaryLanguage {
                    name
                    color
                  }
                  stargazerCount
                  forkCount
                }
              }
            }
          }
        }`,
      },
      {
        headers: {
          Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN || ""}`,
        },
      }
    );

    const result = response.data;
    return result.data.user.pinnedItems.nodes.map((repo) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.url,
      language: repo.primaryLanguage ? repo.primaryLanguage.name : null,
      languageColor: repo.primaryLanguage ? repo.primaryLanguage.color : null,
      stargazers_count: repo.stargazerCount,
      forks_count: repo.forkCount,
    }));
  } catch (error) {
    console.error("Error fetching pinned repositories:", error);
    return [];
  }
}

async function fetchExperienceData() {
  try {
    const experience = await client.fetch(EXPERIENCE_QUERY);
    return experience;
  } catch (error) {
    console.error("Error fetching experience data:", error);
    return [];
  }
}

async function fetchSkillsData() {
  try {
    const skills = await client.fetch(SKILLS_QUERY);
    return skills;
  } catch (error) {
    console.error("Error fetching skills data:", error);
    return [];
  }
}

async function fetchProjectsData() {
  try {
    const projects = await client.fetch(PROJECTS_QUERY);
    return projects;
  } catch (error) {
    console.error("Error fetching projects data:", error);
    return [];
  }
}

async function fetchAcademicData() {
  try {
    const academic = await client.fetch(ACADEMIC_QUERY);
    return academic;
  } catch (error) {
    console.error("Error fetching academic data:", error);
    return [];
  }
}

export default async function Home() {
  const [pinnedRepos, skillsData, experienceData, projectsData, academicData] =
    await Promise.all([
      fetchGitHubData(),
      fetchSkillsData(),
      fetchExperienceData(),
      fetchProjectsData(),
      fetchAcademicData(),
    ]);

  return (
    <Suspense fallback={<LoadingAnimation />}>
      <main>
        <Header />
        <Hero />
        <Skills skills={skillsData} />
        <Experience experiences={experienceData} skills={skillsData} />
        <Projects projects={projectsData} />
        <GitHub pinnedRepos={pinnedRepos} />
        <EmailForm />
        <Footer />
      </main>
    </Suspense>
  );
}

export const revalidate = 60;
