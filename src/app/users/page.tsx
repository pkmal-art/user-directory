'use client';
import { useEffect, useState } from 'react';
import { fetchUsersThunk } from '@/redux/usersSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import Link from 'next/link';
import HeaderButton from '@/components/HeaderButton';

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.users);

  const [page, setPage] = useState(1);
  const usersPerPage = 6;

  useEffect(() => {
    dispatch(fetchUsersThunk()); 
  }, [dispatch]);

  const startIndex = (page - 1) * usersPerPage;
  const paginatedUsers = data.slice(startIndex, startIndex + usersPerPage);

  if (loading) return;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-teal-50 via-pink-50 to-yellow-50">
      <HeaderButton text="Главная" href="/" />
      <h1 className="text-3xl md:text-4xl text-center font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
        Список пользователей
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedUsers.map((user) => (
          <Link key={user.id} href={`/users/${user.id}`}>
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.pravatar.cc/150?u=${user.id}`}
                alt={user.name}
                className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-pink-300"
                loading="lazy" 
              />
              <h2 className="text-lg font-semibold text-center text-purple-600">{user.name}</h2>
              <p className="text-center text-gray-600">{user.email}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          className="px-5 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl disabled:opacity-50 shadow-md hover:scale-105 transition-transform"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ⬅ Назад
        </button>
        <button
          className="px-5 py-2 bg-gradient-to-r from-teal-400 to-green-400 text-white rounded-xl disabled:opacity-50 shadow-md hover:scale-105 transition-transform"
          disabled={startIndex + usersPerPage >= data.length}
          onClick={() => setPage(page + 1)}
        >
          Вперёд ➡
        </button>
      </div>
    </div>
  );
}