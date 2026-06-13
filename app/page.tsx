import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { accessMethods, agents, product } from "@/lib/constants";

const heroCards = [
{
title: "Claude",
label: "Reason",
description: "Keeps product intent, project constraints, and decisions in view.",
rotation: -7,
image: "/image.jpeg",
},
{
title: "Codex",
label: "Build",
description: "Uses the same repo brain to edit, test, and ship changes.",
rotation: 2,
image: "/img2.jpeg",
},
{
title: "OpenClaw",
label: "Operate",
description: "Reads generated files and shared context without a reset.",
rotation: 8,
image: "/img3.jpeg",
},
];

const contextHighlights = [
"Import a GitHub repo and create a project brain automatically.",
"Save the rules, memories, skills, and decisions your agents need.",
"Use the same context in your terminal, generated files, and MCP-ready workflows.",
];

const agentImages = [
  "/claude.jpeg",
  "/codex.jpeg",
  "/cursor.jpeg",
  "/openclaw.jpeg",
  "/cline.jpeg",
  "/custom-agent.jpeg",
];

const processSteps = [
{
step: "01",
title: "Create project from GitHub",
text: "Paste your repository URL. AgentDock fetches the repo name, description, tech stack, scripts, and setup details.",
},
{
step: "02",
title: "Store important memory",
text: "Save project rules, current bugs, product decisions, commands, and things every AI agent should remember.",
},
{
step: "03",
title: "Add skills for agents",
text: "Create reusable instructions like Supabase debugger, clean UI builder, security reviewer, or Codex prompt writer.",
},
{
step: "04",
title: "Save secret references safely",
text: "Do not expose real API keys. Store only safe references like agentdock://secrets/OPENAI_API_KEY.",
},
{
step: "05",
title: "Generate agent files",
text: "Create AGENTS.md, CLAUDE.md, Cursor rules, CLINE.md, OPENCLAW.md, and shared context files.",
},
];

const accessImages = ["/1.png", "/2.png", "/3.png"];

const accessBadges = ["Local command", "Context files", "Live protocol"];

const footerLinks = [
{ label: "Projects", href: "/projects" },
{ label: "Generated Files", href: "/generated-files" },
{ label: "Integrations", href: "/integrations" },
{ label: "Dashboard", href: "/dashboard" },
];

const imageCards = [
{
title: "Project context",
description: "Keep the repository brain visible before an agent starts.",
src: "/image.jpeg",
},
{
title: "Shared workflow",
description: "Move from setup notes to generated files without scattered docs.",
src: "/img2.jpeg",
},
{
title: "Agent handoff",
description: "Give Claude, Codex, OpenClaw, and other tools the same context.",
src: "/img3.jpeg",
},
];

export default function Home() {
return ( <main className="min-h-screen overflow-hidden text-[#17130f]"> <section className="relative min-h-[760px] overflow-hidden"> <video
       className="absolute inset-0 h-full w-full object-cover"
       autoPlay
       loop
       muted
       playsInline
     > <source src="/backgorund.mp4" type="video/mp4" /> </video>

```
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,242,0.78)_0%,rgba(255,250,242,0.68)_46%,#f8f3ea_100%)]" />
    <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-[#f8f3ea]" />

    <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
      <Link href="/" className="group flex items-center gap-3 rounded-2xl">
        <Image
          src="/Claude%20Sonnet%204_5%20_%20MyShell.jpeg"
          alt="AgentDock logo"
          width={40}
          height={40}
          className="h-10 w-10 rounded-xl object-cover shadow-[0_14px_32px_rgba(23,19,15,0.16)] transition group-hover:-translate-y-0.5"
        />
        <span className="font-semibold text-[#17130f]">{product.name}</span>
      </Link>

      <div className="hidden items-center gap-6 text-sm font-medium text-[#756b5f] md:flex">
        <a href="#workflow">Workflow</a>
        <a href="#access">Access</a>
        <a href="#agents">Agents</a>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="hidden text-sm font-medium text-[#756b5f] hover:text-[#17130f] sm:block"
        >
          Login
        </Link>
        <Link
          href="/dashboard"
          className="premium-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
        >
          Start building
          <span className="button-arrow" aria-hidden="true" />
        </Link>
      </div>
    </nav>

    <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pb-20 pt-20 text-center sm:px-6 sm:pt-28">
      <div className="text-reveal mb-6 inline-flex rounded-full border border-orange-300/70 bg-orange-100/80 px-3 py-1 text-sm font-medium text-orange-700 shadow-sm backdrop-blur">
        CLI + generated files + MCP
      </div>

      <h1 className="text-reveal max-w-5xl text-5xl font-semibold tracking-tight text-[#17130f] md:text-7xl">
        One{" "}
        <span className="rounded-2xl bg-[#D97757]/18 px-1 text-[#D97757] shadow-[inset_0_-0.18em_0_rgba(217,119,87,0.28)]">
          home
        </span>{" "}
        for AI agents. One shared{" "}
        <span className="rounded-2xl bg-[#D97757]/18 px-1 text-[#D97757] shadow-[inset_0_-0.18em_0_rgba(217,119,87,0.28)]">
          project brain
        </span>
        .
      </h1>

      <p className="text-reveal mt-6 max-w-3xl text-lg leading-8 text-[#756b5f] md:text-xl">
        AgentDock turns a GitHub repo into reusable context for Codex,
        Claude, Cursor, OpenClaw, Cline, and custom agents through CLI,
        generated files, and MCP.
      </p>

      <div className="text-reveal mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
        <Link
          href="/dashboard"
          className="premium-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-sm font-medium"
        >
          Start building
          <span className="button-arrow" aria-hidden="true" />
        </Link>
        <a
          href="#workflow"
          className="premium-button-secondary rounded-full border px-6 py-3 text-center text-sm font-medium"
        >
          See workflow
        </a>
      </div>

      <div className="hero-agent-stack mt-16" aria-label="Agent workflow cards">
        {heroCards.map((card) => (
          <div
            key={card.title}
            className="hero-agent-card hero-agent-card-orange"
            data-text={card.label}
            style={{ "--r": card.rotation } as CSSProperties}
          >
            <div className="brand-mark brand-mark-image">
              <Image
                src={card.image}
                alt={`${card.title} card visual`}
                fill
                sizes="76px"
                className="object-cover"
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-[#17130f]">
              {card.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#756b5f]">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section className="site-section mx-auto max-w-6xl px-4 py-24 sm:px-6">
    <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
      <div>
        <p className="text-reveal text-sm font-semibold uppercase tracking-[0.24em] text-[#c45f27]">
          Context anywhere
        </p>

        <h2 className="text-reveal mt-4 text-4xl font-semibold tracking-tight text-[#17130f] md:text-6xl">
          Now your agents can use the same context,{" "}
          <span className="text-[#d97757]">anywhere you work.</span>
        </h2>

        <p className="text-reveal mt-6 max-w-xl text-lg leading-8 text-[#756b5f]">
          AgentDock keeps your repository setup, product decisions, skills,
          memories, and handoffs in one clean workspace — then turns that
          context into files and workflows your agents can actually read.
        </p>

        <div className="mt-8 grid gap-3">
          {contextHighlights.map((item, index) => (
            <div
              key={item}
              className="group flex items-start gap-4 rounded-2xl border border-orange-200/70 bg-orange-50/55 p-4 shadow-[0_18px_45px_rgba(217,119,87,0.08)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-orange-50/80 hover:shadow-[0_22px_60px_rgba(217,119,87,0.14)]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d97757] text-sm font-semibold text-white shadow-[0_12px_28px_rgba(217,119,87,0.28)]">
                {index + 1}
              </span>
              <p className="text-sm leading-6 text-[#5f554c]">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/projects"
            className="premium-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
          >
            Import your repo
            <span className="button-arrow" aria-hidden="true" />
          </Link>

          <Link
            href="/generated-files"
            className="premium-button-secondary rounded-full border px-6 py-3 text-center text-sm font-medium"
          >
            Generate files
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle_at_35%_25%,rgba(249,115,22,0.22),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.18),transparent_32%)] blur-2xl" />

        <div className="relative overflow-hidden rounded-[2.25rem] border border-orange-200/70 bg-white/70 p-3 shadow-[0_30px_90px_rgba(120,95,70,0.18)] backdrop-blur">
          <Image
            src="/correct.png"
            alt="AgentDock context workflow"
            width={900}
            height={720}
            className="h-auto w-full rounded-[1.75rem] object-cover"
            priority
          />

          <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/70 bg-white/78 p-5 shadow-[0_18px_55px_rgba(23,19,15,0.14)] backdrop-blur-md">
            <p className="text-sm font-semibold text-[#17130f]">
              One project brain
            </p>
            <p className="mt-2 text-sm leading-6 text-[#756b5f]">
              Generated context for Claude, Codex, Cursor, Cline, OpenClaw,
              and MCP-ready agents.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section
    id="workflow"
    className="site-section relative mx-auto max-w-6xl px-4 py-24 sm:px-6"
  >
    <div className="absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-200/30 blur-3xl" />

    <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
      <div className="relative order-2 lg:order-1">
        <div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.24),transparent_34%),radial-gradient(circle_at_75%_80%,rgba(251,191,36,0.18),transparent_30%)] blur-2xl" />

        <div className="workflow-video-card relative overflow-hidden rounded-[2rem] border border-orange-200/70 bg-white/75 p-3 shadow-[0_30px_90px_rgba(120,95,70,0.18)] backdrop-blur lg:scale-[1.04]">
          <video
            className="h-[440px] w-full rounded-[1.5rem] bg-orange-50/40 object-contain"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/real.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <p className="text-reveal text-sm font-semibold uppercase tracking-[0.24em] text-[#c45f27]">
          How it works
        </p>

        <h2 className="text-reveal mt-4 text-3xl font-semibold tracking-tight text-[#17130f] md:text-5xl">
          From repo to agent-ready context in minutes.
        </h2>

        <p className="text-reveal mt-5 max-w-xl text-base leading-7 text-[#756b5f]">
          AgentDock gives your AI agents the project context they usually
          miss: setup, decisions, skills, secrets, sessions, and generated
          files.
        </p>

        <div className="mt-8 space-y-3">
          {processSteps.map((item) => (
            <div
              key={item.step}
              className="workflow-step group rounded-3xl border border-orange-200/60 bg-white/70 p-4 shadow-[0_18px_45px_rgba(120,95,70,0.08)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-orange-50/70 hover:shadow-[0_24px_70px_rgba(217,119,87,0.14)]"
            >
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#d97757] text-xs font-semibold text-white shadow-[0_14px_34px_rgba(217,119,87,0.3)] transition duration-300 group-hover:rotate-3 group-hover:scale-105">
                  {item.step}
                </div>

                <div>
                  <h3 className="text-base font-semibold text-[#17130f]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-[#756b5f]">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/projects"
            className="premium-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
          >
            Create project brain
            <span className="button-arrow" aria-hidden="true" />
          </Link>

          <Link
            href="/generated-files"
            className="premium-button-secondary rounded-full border px-6 py-3 text-center text-sm font-medium"
          >
            Generate files
          </Link>
        </div>
      </div>
    </div>
  </section>

  <section
    id="access"
    className="site-section relative mx-auto max-w-6xl px-4 py-24 sm:px-6"
  >
    <div className="absolute right-10 top-8 -z-10 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />

    <div className="mx-auto max-w-3xl text-center">
      <p className="text-reveal text-sm font-semibold uppercase tracking-[0.24em] text-[#c45f27]">
        Access methods
      </p>

      <h2 className="text-reveal mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#17130f] md:text-6xl">
        Three clean ways to give agents the right context.
      </h2>

      <p className="text-reveal mx-auto mt-5 max-w-2xl text-base leading-7 text-[#756b5f] md:text-lg">
        AgentDock does not force every agent into one setup. It creates the
        right context path for each tool — terminal, generated files, or
        MCP-ready workflows.
      </p>
    </div>

    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {accessMethods.map((method, index) => (
        <div
          key={method.title}
          className="group relative overflow-hidden rounded-[2rem] border border-orange-200/70 bg-white/75 p-3 shadow-[0_20px_60px_rgba(120,95,70,0.1)] backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:rotate-[0.35deg] hover:border-orange-300 hover:bg-orange-50/70 hover:shadow-[0_30px_90px_rgba(217,119,87,0.18)]"
          style={{ animationDelay: `${index * 120}ms` }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.18),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />

          <div className="relative overflow-hidden rounded-[1.5rem] border border-orange-100 bg-[#fff8ed]">
            <Image
              src={accessImages[index]}
              alt={`${method.title} illustration`}
              width={900}
              height={675}
              className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute left-4 top-4 rounded-full border border-orange-200/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#c45f27] shadow-sm backdrop-blur">
              {accessBadges[index]}
            </div>
          </div>

          <div className="relative px-3 pb-4 pt-5">
            <div className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-orange-200 to-transparent" />

            <h3 className="text-[1.35rem] font-semibold tracking-[-0.035em] text-[#17130f] transition duration-300 group-hover:text-[#c45f27]">
              {method.title}
            </h3>

            <p className="mt-3 text-[15px] leading-7 text-[#756b5f]">
              {method.description}
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#c45f27]">
              Learn how it works
              <span className="h-1.5 w-1.5 rounded-full bg-[#d97757] transition duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>

  <section
    id="agents"
    className="site-section agents-light-section relative overflow-hidden px-4 py-24 sm:px-6"
  >
    <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-orange-200/25 blur-3xl" />
    <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-amber-200/25 blur-3xl" />

    <div className="relative mx-auto max-w-6xl">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-reveal text-sm font-semibold uppercase tracking-[0.24em] text-[#c45f27]">
          Supported agents
        </p>

        <h2 className="text-reveal mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#17130f] md:text-6xl">
          One project brain for every agent in your stack.
        </h2>

        <p className="text-reveal mx-auto mt-5 max-w-2xl text-base leading-7 text-[#756b5f] md:text-lg">
          Keep Claude, Codex, Cursor, Cline, OpenClaw, and custom MCP
          agents aligned with the same project memory, skills, sessions,
          and generated files.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent, index) => (
          <div
            key={agent.name}
            className="group relative overflow-hidden rounded-[2rem] border border-orange-200/70 bg-white/75 p-3 shadow-[0_18px_55px_rgba(120,95,70,0.1)] backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-orange-300 hover:bg-orange-50/70 hover:shadow-[0_30px_90px_rgba(217,119,87,0.16)]"
            style={{ animationDelay: `${index * 95}ms` }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.16),transparent_45%)] opacity-0 transition duration-500 group-hover:opacity-100" />

            <div className="relative overflow-hidden rounded-[1.5rem] border border-orange-100 bg-[#fff8ed]">
            <Image
  src={agentImages[index]}
  alt={`${agent.name} illustration`}
  width={900}
  height={675}
  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
/>
              <div className="absolute left-4 top-4 rounded-full border border-orange-200/80 bg-white/82 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#c45f27] shadow-sm backdrop-blur">
                Agent {String(index + 1).padStart(2, "0")}
              </div>
            </div>

            <div className="relative px-3 pb-4 pt-5">
              <div className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-orange-200 to-transparent" />

              <h3 className="text-[1.35rem] font-semibold tracking-[-0.035em] text-[#17130f] transition duration-300 group-hover:text-[#c45f27]">
                {agent.name}
              </h3>

              <p className="mt-3 text-[15px] leading-7 text-[#756b5f]">
                {agent.setup}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-orange-200/80 bg-orange-50/80 px-3 py-1 text-xs font-semibold text-[#c45f27]">
                  Shared context
                </span>
                <span className="rounded-full border border-orange-200/80 bg-white/80 px-3 py-1 text-xs font-semibold text-[#756b5f]">
                  Agent-ready
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section className="site-section mx-auto max-w-6xl px-4 py-20 sm:px-6">
    <div className="max-w-2xl">
      <p className="text-reveal text-sm font-semibold text-[#9a681d]">
        Workspace views
      </p>
      <h2 className="text-reveal mt-3 text-4xl font-semibold tracking-tight text-[#17130f] md:text-5xl">
        Three ways the project brain stays useful.
      </h2>
      <p className="text-reveal mt-5 max-w-2xl leading-7 text-[#756b5f]">
        Your project context should not stay trapped in one chat. AgentDock
        keeps it useful across setup, handoff, and build workflows.
      </p>
    </div>

    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {imageCards.map((card) => (
        <div key={card.title} className="image-story-card">
          <div className="image-story-media">
            <Image
              src={card.src}
              alt={card.title}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="p-5">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

  <section className="site-section mx-auto max-w-6xl px-4 py-20 sm:px-6">
    <div className="cta-band">
      <div>
        <p className="text-reveal text-sm font-semibold text-[#9a681d]">
          Ready workspace
        </p>
        <h2 className="text-reveal mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-[#17130f] md:text-5xl">
          Create a project brain and keep every agent aligned.
        </h2>
      </div>

      <Link
        href="/projects"
        className="premium-button inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
      >
        Go to projects
        <span className="button-arrow" aria-hidden="true" />
      </Link>
    </div>
  </section>

  <footer className="border-t border-[rgba(120,95,70,0.14)] bg-[#fffaf2]/82 px-4 py-10 sm:px-6">
    <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <Image
            src="/Claude%20Sonnet%204_5%20_%20MyShell.jpeg"
            alt="AgentDock logo"
            width={36}
            height={36}
            className="h-9 w-9 rounded-xl object-cover"
          />
          <span className="font-semibold text-[#17130f]">
            {product.name}
          </span>
        </div>

        <p className="mt-3 max-w-md text-sm leading-6 text-[#756b5f]">
          One workspace for reusable AI-agent project context.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 text-sm font-medium text-[#756b5f]">
        {footerLinks.map((link) => (
          <Link key={link.href} href={link.href} className="footer-link">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  </footer>
</main>
)}