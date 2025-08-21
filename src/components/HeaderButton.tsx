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
      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform"
      onClick={() => router.push(href)}
    >
      {text}
    </button>
  );
}