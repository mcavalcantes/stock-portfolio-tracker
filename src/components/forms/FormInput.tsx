import type { HTMLInputTypeAttribute } from "react";

export function FormInput({
  label,
  name,
  type,
  value,
  error,
  onChange,
}: {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  value: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const className = error
    ? "p-2 border border-red-500 w-full rounded-lg outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
    : "p-2 border border-zinc-600 w-full rounded-lg outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 transition";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label className="text-xl font-semibold">{label}</label>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        className={className}
      />
    </div>
  );
}
