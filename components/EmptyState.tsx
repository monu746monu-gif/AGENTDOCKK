type EmptyStateProps = {
    title: string;
    description: string;
    action?: string;
  };
  
  export function EmptyState({ title, description, action }: EmptyStateProps) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-sm">
          AD
        </div>
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
          {description}
        </p>
        {action ? (
          <button className="mt-5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-slate-200">
            {action}
          </button>
        ) : null}
      </div>
    );
  }