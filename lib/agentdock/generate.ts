type Project = {
    name: string;
    description: string | null;
    tech_stack: string | null;
    repo_url: string | null;
    run_commands: string | null;
    current_tasks: string | null;
  };
  
  type Memory = {
    content: string;
    importance: string | null;
    tags: string[] | null;
  };
  
  type Skill = {
    name: string;
    description: string | null;
    instructions: string;
    target_agent: string | null;
    category: string | null;
  };
  
  type Secret = {
    name: string;
    provider: string | null;
    reference: string;
    notes: string | null;
  };
  
  type Agent = {
    name: string;
    type: string;
    provider: string | null;
    access_method: string | null;
    status: string | null;
    notes: string | null;
  };
  
  type Session = {
    title: string;
    task: string | null;
    prompt: string | null;
    target_agent: string | null;
    type: string | null;
    status: string | null;
  };
  
  export type GenerateContextInput = {
    fileType: string;
    project: Project;
    memories: Memory[];
    skills: Skill[];
    secrets: Secret[];
    agents: Agent[];
    sessions: Session[];
  };
  
  function section(title: string, content: string) {
    return `## ${title}\n\n${content.trim() || "Not provided."}\n`;
  }
  
  function listItems(items: string[]) {
    if (items.length === 0) return "Not provided.";
    return items.map((item) => `- ${item}`).join("\n");
  }
  
  function formatMemories(memories: Memory[]) {
    if (memories.length === 0) return "No memories saved.";
  
    return memories
      .map((memory) => {
        const tags =
          memory.tags && memory.tags.length > 0
            ? `\n  Tags: ${memory.tags.join(", ")}`
            : "";
  
        return `- [${memory.importance || "Medium"}] ${memory.content}${tags}`;
      })
      .join("\n");
  }
  
  function formatSkills(skills: Skill[], target?: string) {
    const filtered = target
      ? skills.filter(
          (skill) =>
            skill.target_agent === target || skill.target_agent === "General"
        )
      : skills;
  
    if (filtered.length === 0) return "No skills saved.";
  
    return filtered
      .map(
        (skill) => `### ${skill.name}
  
  Category: ${skill.category || "General"}
  Target: ${skill.target_agent || "General"}
  Description: ${skill.description || "Not provided."}
  
  Instructions:
  ${skill.instructions}`
      )
      .join("\n\n");
  }
  
  function formatSecrets(secrets: Secret[]) {
    if (secrets.length === 0) return "No secret references saved.";
  
    return secrets
      .map((secret) => {
        const provider = secret.provider ? ` (${secret.provider})` : "";
        const notes = secret.notes ? `\n  Notes: ${secret.notes}` : "";
  
        return `- ${secret.name}${provider}: ${secret.reference}${notes}`;
      })
      .join("\n");
  }
  
  function formatAgents(agents: Agent[]) {
    if (agents.length === 0) return "No agents configured.";
  
    return agents
      .map(
        (agent) => `- ${agent.name}
    Type: ${agent.type}
    Provider: ${agent.provider || "Not provided"}
    Access method: ${agent.access_method || "Generated Files"}
    Status: ${agent.status || "Not configured"}
    Notes: ${agent.notes || "Not provided"}`
      )
      .join("\n");
  }
  
  function formatSessions(sessions: Session[]) {
    if (sessions.length === 0) return "No sessions saved.";
  
    return sessions
      .map(
        (session) => `### ${session.title}
  
  Type: ${session.type || "Prompt"}
  Status: ${session.status || "Draft"}
  Target agent: ${session.target_agent || "General"}
  
  Task:
  ${session.task || "Not provided."}
  
  Prompt / Handoff:
  ${session.prompt || "Not provided."}`
      )
      .join("\n\n");
  }
  
  function getAgentInstructions(fileType: string) {
    if (fileType === "AGENTS.md") {
      return `You are Codex working inside this repository.
  
  Follow these rules:
  - Use the project brain below as the source of truth.
  - Do not invent architecture that is not listed here.
  - Keep changes focused and small.
  - Respect the current tech stack and run commands.
  - Do not expose raw secrets.
  - Use only safe secret references like agentdock://secrets/KEY_NAME.
  - After changes, suggest useful test commands.`;
    }
  
    if (fileType === "CLAUDE.md") {
      return `You are Claude working on this project.
  
  Follow these rules:
  - Use the saved project brain, memories, and skills before making changes.
  - Ask for clarification only when necessary.
  - Keep output structured and implementation-focused.
  - Do not expose raw secrets.
  - Use safe secret references only.`;
    }
  
    if (fileType === ".cursor/rules/project.md") {
      return `Cursor project rules:
  
  - Keep the UI clean, modern, and professional.
  - Avoid overdesigned AI-looking interfaces.
  - Prefer simple components, soft borders, readable spacing, and clear empty states.
  - Follow the project brain and saved skills.
  - Do not expose secret values in frontend code.`;
    }
  
    if (fileType === "OPENCLAW.md") {
      return `OpenClaw setup instructions:
  
  - Use AgentDock as the shared project brain.
  - Follow the saved memories, skills, agents, and sessions.
  - Use CLI, generated file, or MCP access only.
  - Do not rely on desktop-first or local bridge features for v1.`;
    }
  
    if (fileType === "CLINE.md") {
      return `Cline setup instructions:
  
  - Read this file before making changes.
  - Use the project brain as the main context.
  - Prefer MCP access when available.
  - Use generated context carefully.
  - Never expose raw secrets.`;
    }
  
    return `Shared AgentDock context:
  
  - This file contains project context for AI agents.
  - Agents should follow the project brain, memories, skills, and safe secret references.
  - Use this context through CLI, generated files, or MCP.`;
  }
  
  export function getFileName(fileType: string) {
    if (fileType === "Cursor Rules") return ".cursor/rules/project.md";
    if (fileType === "Shared Context") return ".agentdock/context.md";
    return fileType;
  }
  
  export function generateAgentFile(input: GenerateContextInput) {
    const { fileType, project, memories, skills, secrets, agents, sessions } =
      input;
  
    const actualFileName = getFileName(fileType);
  
    const targetAgent =
      actualFileName === "AGENTS.md"
        ? "Codex"
        : actualFileName === "CLAUDE.md"
        ? "Claude"
        : actualFileName === ".cursor/rules/project.md"
        ? "Cursor"
        : actualFileName === "OPENCLAW.md"
        ? "OpenClaw"
        : actualFileName === "CLINE.md"
        ? "Cline"
        : undefined;
  
    return `# ${actualFileName}
  
  Generated by AgentDock.
  
  ${section("Agent Instructions", getAgentInstructions(actualFileName))}
  
  ${section(
    "Project Brain",
    `Name: ${project.name}
  
  Description:
  ${project.description || "Not provided."}
  
  Repository:
  ${project.repo_url || "Not provided."}
  
  Tech Stack:
  ${project.tech_stack || "Not provided."}
  
  Run Commands:
  ${project.run_commands || "Not provided."}
  
  Current Tasks:
  ${project.current_tasks || "Not provided."}`
  )}
  
  ${section("Important Memories", formatMemories(memories))}
  
  ${section("Relevant Skills", formatSkills(skills, targetAgent))}
  
  ${section("Safe Secret References", formatSecrets(secrets))}
  
  ${section("Connected Agents", formatAgents(agents))}
  
  ${section("Recent Sessions / Handoffs", formatSessions(sessions))}
  
  ${section(
    "Security Rules",
    listItems([
      "Never expose raw API keys, service role keys, tokens, or passwords.",
      "Use only safe references like agentdock://secrets/KEY_NAME.",
      "Do not place secret values in generated files.",
      "Do not put server-only secrets in frontend code.",
    ])
  )}
  
  ${section(
    "AgentDock v1 Scope",
    listItems([
      "CLI Access",
      "Generated File Access",
      "MCP Access",
      "No desktop-first app for now",
      "No local bridge for now",
      "No cloud agent runtime for now",
      "No billing for now",
    ])
  )}
  `;
  }