type StatCardProps = {
    label: string;
    value: string;
    description?: string;
  };
  
  export function StatCard({ label, value, description }: StatCardProps) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-sm text-slate-400">{label}</p>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
          {value}
        </p>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
        ) : null}
      </div>
    );
  }