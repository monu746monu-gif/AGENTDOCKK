export const product = {
    name: "AgentDock",
    tagline: "One workspace. All AI agents. One shared project brain.",
    description:
      "AgentDock helps developers connect Codex, Claude, Cursor, OpenClaw, Cline, and custom agents to the same project context through CLI, generated files, and MCP.",
  };

  export const generatedFiles = [
    { label: "Generated Files", href: "/generated-files" },
    { label: "Generated Files", href: "/generated-files" },
  ];

export const navItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Projects", href: "/projects" },
        { label: "Memory", href: "/memory" },
        { label: "Skills", href: "/skills" },
        { label: "Secrets", href: "/secrets" },
        { label: "Agents", href: "/agents" },
        { label: "Sessions", href: "/sessions" },
        { label: "Generated Files", href: "/generated-files" },
        { label: "Integrations", href: "/integrations" },
      ];

  export const accessMethods = [
    {
      title: "CLI Access",
      description:
        "Use AgentDock from the terminal to link projects, sync context, search memory, and generate agent files.",
    },
    {
      title: "Generated File Access",
      description:
        "Generate AGENTS.md, CLAUDE.md, Cursor rules, OPENCLAW.md, CLINE.md, and shared context files.",
    },
    {
      title: "MCP Access",
      description:
        "Let compatible agents fetch live project context, memory, skills, and secret references through MCP tools.",
    },
  ];
  
  export const agents = [
    {
      name: "Codex",
      setup: "CLI + AGENTS.md + MCP",
    },
    {
      name: "Claude",
      setup: "CLI + CLAUDE.md + MCP",
    },
    {
      name: "Cursor",
      setup: "CLI + Cursor rules + MCP",
    },
    {
      name: "OpenClaw",
      setup: "CLI + OPENCLAW.md + MCP",
    },
    {
      name: "Cline",
      setup: "CLI + CLINE.md + MCP",
    },
    {
      name: "Custom Agent",
      setup: "MCP",
    },
  ];