import axios from "axios";

// ** Components
import GitHub from "@/components/GitHub";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmailForm from "@/components/emailForm";
import Experience from "@/components/Experience";

// ** Sanity
import { client } from "@/sanity/lib/client";
import { EXPERIENCE_QUERY } from "@/sanity/lib/queries";

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

export default async function Home() {
  const [pinnedRepos, experienceData] = await Promise.all([
    fetchGitHubData(),
    fetchExperienceData(),
  ]);

  return (
    <main>
      <Header />
      <Experience experiences={experienceData} />
      <GitHub pinnedRepos={pinnedRepos} />
      <EmailForm />
      <Footer />
    </main>
  );
}

export const revalidate = 60;
