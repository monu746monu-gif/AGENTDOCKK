export type GitHubRepoInput = {
    owner: string;
    repo: string;
  };
  
  export type GitHubProjectBrain = {
    name: string;
    description: string;
    repo_url: string;
    tech_stack: string;
    run_commands: string;
    current_tasks: string;
  };
  
  export function parseGitHubUrl(url: string): GitHubRepoInput {
    try {
      const parsedUrl = new URL(url);
      const parts = parsedUrl.pathname.split("/").filter(Boolean);
  
      if (!parsedUrl.hostname.includes("github.com")) {
        throw new Error("Please enter a valid GitHub repository URL.");
      }
  
      if (parts.length < 2) {
        throw new Error("GitHub URL must include owner and repo name.");
      }
  
      return {
        owner: parts[0],
        repo: parts[1].replace(".git", ""),
      };
    } catch {
      throw new Error("Please enter a valid GitHub repository URL.");
    }
  }
  
  function getPackageJsonScripts(packageJson: Record<string, unknown>) {
    const scripts = packageJson.scripts;
  
    if (!scripts || typeof scripts !== "object") {
      return "";
    }
  
    return Object.keys(scripts)
      .map((script) => `npm run ${script}`)
      .join("\n");
  }
  
  function guessTechStack(
    languages: Record<string, number>,
    packageJson: Record<string, unknown> | null
  ) {
    const stack = new Set<string>();
  
    Object.keys(languages).forEach((language) => stack.add(language));
  
    const dependencies = {
      ...((packageJson?.dependencies as Record<string, string>) || {}),
      ...((packageJson?.devDependencies as Record<string, string>) || {}),
    };
  
    const dependencyNames = Object.keys(dependencies);
  
    if (dependencyNames.includes("next")) stack.add("Next.js");
    if (dependencyNames.includes("react")) stack.add("React");
    if (dependencyNames.includes("tailwindcss")) stack.add("Tailwind CSS");
    if (dependencyNames.includes("@supabase/supabase-js")) stack.add("Supabase");
    if (dependencyNames.includes("@supabase/ssr")) stack.add("Supabase Auth");
    if (dependencyNames.includes("typescript")) stack.add("TypeScript");
    if (dependencyNames.includes("express")) stack.add("Express");
    if (dependencyNames.includes("fastify")) stack.add("Fastify");
    if (dependencyNames.includes("vite")) stack.add("Vite");
    if (dependencyNames.includes("@modelcontextprotocol/sdk")) stack.add("MCP");
  
    return Array.from(stack).join(", ");
  }
  
  async function githubFetch<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: {
        revalidate: 60,
      },
    });
  
    if (!response.ok) {
      throw new Error("Could not fetch repository data from GitHub.");
    }
  
    return response.json();
  }
  
  async function fetchTextFile(owner: string, repo: string, path: string) {
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/${path}`;
  
    const response = await fetch(rawUrl, {
      next: {
        revalidate: 60,
      },
    });
  
    if (!response.ok) {
      return null;
    }
  
    return response.text();
  }
  
  export async function fetchGitHubProjectBrain(repoUrl: string) {
    const { owner, repo } = parseGitHubUrl(repoUrl);
  
    const repoApiUrl = `https://api.github.com/repos/${owner}/${repo}`;
    const languagesApiUrl = `https://api.github.com/repos/${owner}/${repo}/languages`;
  
    const [repoData, languages, readmeText, packageJsonText] = await Promise.all([
      githubFetch<{
        name: string;
        description: string | null;
        html_url: string;
        language: string | null;
        stargazers_count: number;
        forks_count: number;
      }>(repoApiUrl),
      githubFetch<Record<string, number>>(languagesApiUrl),
      fetchTextFile(owner, repo, "README.md"),
      fetchTextFile(owner, repo, "package.json"),
    ]);
  
    let packageJson: Record<string, unknown> | null = null;
  
    if (packageJsonText) {
      try {
        packageJson = JSON.parse(packageJsonText);
      } catch {
        packageJson = null;
      }
    }
  
    const runCommands =
      getPackageJsonScripts(packageJson || {}) ||
      "npm install\nnpm run dev\nnpm run build";
  
    const techStack = guessTechStack(languages, packageJson);
  
    const readmePreview = readmeText
      ? readmeText.slice(0, 1200)
      : "No README.md found.";
  
    const currentTasks =
      "- Review imported project brain\n- Add missing setup notes\n- Generate agent files\n- Connect MCP access";
  
    return {
      name: repoData.name,
      description:
        repoData.description ||
        `Imported from GitHub repository ${owner}/${repo}.`,
      repo_url: repoData.html_url,
      tech_stack: techStack,
      run_commands: runCommands,
      current_tasks: currentTasks,
      readme_preview: readmePreview,
      stats: {
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        primary_language: repoData.language,
      },
    };
  }