'use client';
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
     <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-teal-100 text-gray-800 px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500">
        Добро пожаловать!
      </h1>
      <p className="text-lg md:text-xl mb-10 text-center max-w-xl text-gray-700 leading-relaxed">
        Это тестовое приложение на <span className="font-semibold text-purple-600">Next.js</span> + 
        <span className="font-semibold text-teal-600">Redux Toolkit</span>.  
        Просматривайте список пользователей и открывайте детали каждого профиля!
      </p>
      <button
        onClick={() => router.push('/users')}
        className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
      >
        Перейти к пользователям
      </button>
    </main>
  );
}