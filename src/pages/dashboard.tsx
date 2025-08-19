import { useState } from "react";

export function Dashboard() {
  const [ticker, setTicker] = useState<string>("");
  const [tickers, setTickers] = useState<string[]>(new Array());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTicker(value);
  };

  const handleClick = () => {
    const value = String(ticker);

    if (!value) return;

    setTickers((prev) => [...prev, value]);
    setTicker("");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col gap-2">
        <p>Insira seu ticker:</p>
        <input
          name="ticker"
          type="text"
          value={ticker}
          onChange={handleChange}
          required
          className="border p-1.5"
        />
        <button
          onClick={handleClick}
          className="cursor-pointer border bg-gray-200 p-2"
        >
          Adicionar
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <p>Tickers adicionados:</p>
        <ul className="flex list-disc flex-col gap-0.5">
          {tickers.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
