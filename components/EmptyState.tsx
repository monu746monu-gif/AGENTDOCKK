import Image from "next/image";

type EmptyStateProps = {
    title: string;
    description: string;
    action?: string;
  };
  
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="premium-card rounded-2xl border border-dashed p-8 text-center">
      <Image
        src="/Claude%20Sonnet%204_5%20_%20MyShell.jpeg"
        alt="AgentDock logo"
        width={44}
        height={44}
        className="mx-auto mb-4 h-11 w-11 rounded-full border border-[rgba(171,119,43,0.22)] object-cover shadow-[0_12px_26px_rgba(92,69,42,0.12)]"
      />
      <h3 className="text-lg font-medium text-[#17130f]">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#756b5f]">
        {description}
      </p>
      {action ? (
        <button className="premium-button mt-5 rounded-full px-4 py-2 text-sm font-medium">
          {action}
        </button>
      ) : null}
    </div>
  );
}
