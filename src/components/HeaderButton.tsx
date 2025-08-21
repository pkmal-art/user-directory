'use client';
import { useRouter } from "next/navigation";

interface HeaderButtonProps {
  text: string;
  href: string;
}

export default function HeaderButton({ text, href }: HeaderButtonProps) {
  const router = useRouter();

  return (
    <button
      className="px-4 py-2 text-sm 
         rounded-lg bg-purple-600 text-white font-medium shadow-md hover:bg-purple-700 transition-colors"
      onClick={() => router.push(href)}
    >
      {text}
    </button>
  );
}