"use client";

import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

export default function Button({
  text,
  ...rest
}: { text: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full h-12 rounded-3xl py-2 font-medium text-stone-600 bg-sky-400 hover:bg-sky-4=300 active:bg-sky-200 transition-colors disabled:cursor-not-allowed disabled:text-stone-400 disabled:bg-stone-200"
      disabled={pending}
      {...rest}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
