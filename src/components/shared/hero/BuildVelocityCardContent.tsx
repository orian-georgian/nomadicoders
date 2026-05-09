type BuildVelocityCardContentProps = {
  value: string;
  description: string;
};

export function BuildVelocityCardContent({
  value,
  description,
}: BuildVelocityCardContentProps) {
  return (
    <>
      <div className="flex items-end gap-3">
        <p className="text-5xl font-semibold leading-none tracking-tight text-white sm:text-6xl">
          {value}
        </p>
        <div className="mb-1 ml-auto flex h-16 items-end gap-1.5">
          {[58, 82, 68, 100].map((height, index) => (
            <span
              key={height}
              className="w-2.5 rounded-full bg-gradient-to-t from-sky-400 to-violet-400"
              style={{
                height: `${height}%`,
                opacity: 0.7 + index * 0.08,
                transformOrigin: "bottom",
              }}
            />
          ))}
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
    </>
  );
}
