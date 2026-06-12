#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();

const AGENTDOCK_DIR = path.join(cwd, ".agentdock");
const CONFIG_PATH = path.join(AGENTDOCK_DIR, "config.json");

const command = process.argv[2];
const subCommand = process.argv[3];

function log(message) {
  console.log(message);
}

function error(message) {
  console.error(`\nAgentDock error: ${message}\n`);
  process.exit(1);
}

function ensureAgentDockDir() {
  if (!fs.existsSync(AGENTDOCK_DIR)) {
    fs.mkdirSync(AGENTDOCK_DIR, { recursive: true });
  }
}

function readConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    return null;
  }

  try {
    const raw = fs.readFileSync(CONFIG_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    error("Could not read .agentdock/config.json.");
  }
}

function writeConfig(config) {
  ensureAgentDockDir();
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

function writeFileSafely(filePath, content) {
  const fullPath = path.join(cwd, filePath);
  const dir = path.dirname(fullPath);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, content);
}

function getPackageJson() {
  const packagePath = path.join(cwd, "package.json");

  if (!fs.existsSync(packagePath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(packagePath, "utf8"));
  } catch {
    return null;
  }
}

function guessProjectName() {
  const packageJson = getPackageJson();

  if (packageJson?.name) {
    return packageJson.name;
  }

  return path.basename(cwd);
}

function guessTechStack() {
  const packageJson = getPackageJson();

  if (!packageJson) {
    return "Unknown";
  }

  const deps = {
    ...(packageJson.dependencies || {}),
    ...(packageJson.devDependencies || {}),
  };

  const stack = new Set();

  if (deps.next) stack.add("Next.js");
  if (deps.react) stack.add("React");
  if (deps.typescript) stack.add("TypeScript");
  if (deps.tailwindcss) stack.add("Tailwind CSS");
  if (deps["@supabase/supabase-js"]) stack.add("Supabase");
  if (deps["@supabase/ssr"]) stack.add("Supabase Auth");
  if (deps["@modelcontextprotocol/sdk"]) stack.add("MCP");

  return Array.from(stack).join(", ") || "Node.js";
}

function getRunCommands() {
  const packageJson = getPackageJson();

  if (!packageJson?.scripts) {
    return "Not detected.";
  }

  return Object.keys(packageJson.scripts)
    .map((script) => `npm run ${script}`)
    .join("\n");
}

function getGeneratedFiles(config) {
  return {
    agents: {
      path: "AGENTS.md",
      content: generateAgentsFile(config),
      label: "Codex AGENTS.md",
    },
    claude: {
      path: "CLAUDE.md",
      content: generateClaudeFile(config),
      label: "Claude CLAUDE.md",
    },
    cursor: {
      path: ".cursor/rules/project.md",
      content: generateCursorRules(config),
      label: "Cursor rules",
    },
    openclaw: {
      path: "OPENCLAW.md",
      content: generateOpenClawFile(config),
      label: "OpenClaw setup",
    },
    cline: {
      path: "CLINE.md",
      content: generateClineFile(config),
      label: "Cline setup",
    },
    context: {
      path: ".agentdock/context.md",
      content: generateContext(config),
      label: "Shared context",
    },
  };
}

function generate() {
  const config = readConfig();

  if (!config) {
    error("This project is not initialized. Run: agentdock init");
  }

  const files = getGeneratedFiles(config);

  if (!subCommand) {
    Object.values(files).forEach((file) => {
      writeFileSafely(file.path, file.content);
      log(`Created ${file.path}`);
    });

    log("\nAgentDock generated all files successfully.");
    return;
  }

  if (!files[subCommand]) {
    error(
      `Unknown generate target: ${subCommand}

Available:
  agentdock generate agents
  agentdock generate claude
  agentdock generate cursor
  agentdock generate openclaw
  agentdock generate cline
  agentdock generate context`
    );
  }
  function files() {
    const config = readConfig();
  
    if (!config) {
      error("This project is not initialized. Run: agentdock init");
    }
  
    const generatedFiles = getGeneratedFiles(config);
  
    log("\nAgentDock generated file targets");
    log("--------------------------------");
  
    Object.entries(generatedFiles).forEach(([key, file]) => {
      const fullPath = path.join(cwd, file.path);
      const exists = fs.existsSync(fullPath) ? "created" : "missing";
  
      log(`${key.padEnd(10)} ${exists.padEnd(8)} ${file.path}`);
    });
  
    log("\nGenerate one file:");
    log("  agentdock generate agents");
    log("  agentdock generate claude");
    log("  agentdock generate cursor");
    log("  agentdock generate openclaw");
    log("  agentdock generate cline");
    log("  agentdock generate context");
  
    log("\nGenerate all files:");
    log("  agentdock generate");
  }

  const file = files[subCommand];

  writeFileSafely(file.path, file.content);

  log(`\nCreated ${file.path}`);
  log(`Type: ${file.label}`);
}

function generateAgentsFile(config) {
  return `# AGENTS.md

Generated by AgentDock CLI.

You are Codex working inside this repository.

## Instructions

- Use this file as the project context.
- Keep changes focused and small.
- Follow the existing tech stack.
- Do not expose raw secrets.
- Use safe references like agentdock://secrets/KEY_NAME.
- After changes, suggest useful test commands.

${generateContext(config)}
`;
}

function generateClaudeFile(config) {
  return `# CLAUDE.md

Generated by AgentDock CLI.

You are Claude working inside this repository.

## Instructions

- Read this file before making changes.
- Use the project brain as the source of truth.
- Keep output structured and implementation-focused.
- Do not expose raw secrets.

${generateContext(config)}
`;
}

function generateCursorRules(config) {
  return `# Cursor Project Rules

Generated by AgentDock CLI.

## UI Rules

- Keep UI simple, modern, and clean.
- Avoid overdesigned AI-looking screens.
- Avoid neon gradients and fake futuristic dashboards.
- Prefer soft borders, readable typography, and clear empty states.

${generateContext(config)}
`;
}

function generateOpenClawFile(config) {
  return `# OPENCLAW.md

Generated by AgentDock CLI.

OpenClaw should use this repository context from AgentDock.

${generateContext(config)}
`;
}

function generateClineFile(config) {
  return `# CLINE.md

Generated by AgentDock CLI.

Cline should read this file before working on the project.

${generateContext(config)}
`;
}

function init() {
  const existing = readConfig();

  if (existing) {
    log("AgentDock is already initialized in this project.");
    log(`Config: ${CONFIG_PATH}`);
    return;
  }

  const config = {
    projectName: guessProjectName(),
    repoUrl: "",
    techStack: guessTechStack(),
    runCommands: getRunCommands(),
    createdAt: new Date().toISOString(),
  };

  writeConfig(config);

  log("\nAgentDock initialized.");
  log(`Project: ${config.projectName}`);
  log(`Config: .agentdock/config.json`);
  log("\nNext:");
  log("  agentdock status");
  log("  agentdock generate");
}

function status() {
  const config = readConfig();

  if (!config) {
    error("This project is not initialized. Run: agentdock init");
  }

  log("\nAgentDock status");
  log("----------------");
  log(`Project: ${config.projectName}`);
  log(`Tech stack: ${config.techStack || "Not detected"}`);
  log(`Config: .agentdock/config.json`);
  log("\nAvailable commands:");
  log("  agentdock generate");
}

function generate() {
  const config = readConfig();

  if (!config) {
    error("This project is not initialized. Run: agentdock init");
  }

  const files = [
    {
      path: "AGENTS.md",
      content: generateAgentsFile(config),
    },
    {
      path: "CLAUDE.md",
      content: generateClaudeFile(config),
    },
    {
      path: ".cursor/rules/project.md",
      content: generateCursorRules(config),
    },
    {
      path: "OPENCLAW.md",
      content: generateOpenClawFile(config),
    },
    {
      path: "CLINE.md",
      content: generateClineFile(config),
    },
    {
      path: ".agentdock/context.md",
      content: generateContext(config),
    },
  ];

  files.forEach((file) => {
    writeFileSafely(file.path, file.content);
    log(`Created ${file.path}`);
  });

  log("\nAgentDock generated files successfully.");
}


function help() {
  log(`
AgentDock CLI

Usage:
  agentdock init                Initialize AgentDock in this project
  agentdock status              Show AgentDock project status
  agentdock doctor              Check AgentDock setup health
  agentdock files               Show generated file status
  agentdock generate            Generate all agent context files

Generate specific files:
  agentdock generate agents     Generate AGENTS.md for Codex
  agentdock generate claude     Generate CLAUDE.md for Claude
  agentdock generate cursor     Generate .cursor/rules/project.md
  agentdock generate openclaw   Generate OPENCLAW.md
  agentdock generate cline      Generate CLINE.md
  agentdock generate context    Generate .agentdock/context.md

Examples:
  agentdock init
  agentdock doctor
  agentdock status
  agentdock files
  agentdock generate agents
  agentdock generate
`);
}


function doctor() {
  const config = readConfig();
  const packageJson = getPackageJson();

  log("\nAgentDock doctor");
  log("----------------");

  const checks = [];

  checks.push({
    label: "AgentDock initialized",
    ok: Boolean(config),
    fix: "Run: agentdock init",
  });

  checks.push({
    label: "package.json found",
    ok: Boolean(packageJson),
    fix: "Run this inside a Node/Next.js project or create package.json.",
  });

  checks.push({
    label: ".agentdock/config.json exists",
    ok: fs.existsSync(CONFIG_PATH),
    fix: "Run: agentdock init",
  });

  const generatedFiles = config ? getGeneratedFiles(config) : {};

  Object.values(generatedFiles).forEach((file) => {
    checks.push({
      label: `${file.path} exists`,
      ok: fs.existsSync(path.join(cwd, file.path)),
      fix: `Run: agentdock generate`,
    });
  });

  const passed = checks.filter((check) => check.ok).length;
  const total = checks.length;

  checks.forEach((check) => {
    const icon = check.ok ? "✓" : "✕";
    const status = check.ok ? "OK" : "Missing";

    log(`${icon} ${check.label} — ${status}`);

    if (!check.ok) {
      log(`  Fix: ${check.fix}`);
    }
  });

  log(`\nResult: ${passed}/${total} checks passed`);

  if (passed === total) {
    log("\nYour project is ready for AgentDock generated files.");
  } else {
    log("\nSome setup is missing. Run the suggested fixes above.");
  }
}

switch (command) {
  case "init":
    init();
    break;

    case "files":
      files();
      break;
      case "doctor":
        doctor();
        break;
        
  case "status":
    status();
    break;

  case "generate":
    generate();
    break;

  case undefined:
  case "help":
  case "--help":
  case "-h":
    help();
    break;

  default:
    error(`Unknown command: ${command}`);
}