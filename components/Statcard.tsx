type StatCardProps = {
    label: string;
    value: string;
    description?: string;
  };
  
export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <div className="premium-card rounded-2xl border p-5">
      <p className="text-sm text-[#756b5f]">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-[#17130f]">
        {value}
      </p>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-[#8a7e70]">{description}</p>
      ) : null}
    </div>
  );
}
