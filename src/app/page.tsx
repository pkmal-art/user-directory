'use client';
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-purple-500 to-teal-500">
        Добро пожаловать!
      </h1>

      <p className="text-lg md:text-xl mb-10 text-center max-w-xl text-gray-700 leading-relaxed">
        Это тестовое приложение на{" "}
        <span className="font-medium text-purple-600">Next.js</span> +{" "}
        <span className="font-medium text-teal-600">Redux Toolkit</span>.  
        Просматривайте список пользователей и открывайте детали каждого профиля!
      </p>

      <button
        onClick={() => router.push('/users')}
        className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-700 transition-colors"
      >
        Перейти к пользователям
      </button>
    </main>
  );
}
