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
    <div className="p-6 min-h-screen bg-gray-50">
      <HeaderButton text="Главная" href="/" />

      <h1 className="text-3xl md:text-4xl text-center font-semibold mb-8 text-purple-600">
        Список пользователей
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedUsers.map((user) => (
          <Link key={user.id} href={`/users/${user.id}`}>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.pravatar.cc/150?u=${user.id}`}
                alt={user.name}
                className="w-20 h-20 mx-auto rounded-full mb-4 border-2 border-purple-200"
                loading="lazy"
              />
              <h2 className="text-lg font-medium text-center text-gray-900">
                {user.name}
              </h2>
              <p className="text-center text-gray-600 text-sm">{user.email}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <button
          className="px-5 py-2 rounded-lg bg-purple-600 text-white font-medium shadow-sm hover:bg-purple-700 transition-colors disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ⬅ Назад
        </button>
        <button
          className="px-5 py-2 rounded-lg bg-purple-600 text-white font-medium shadow-sm hover:bg-purple-700 transition-colors disabled:opacity-50"
          disabled={startIndex + usersPerPage >= data.length}
          onClick={() => setPage(page + 1)}
        >
          Вперёд ➡
        </button>
      </div>
    </div>
  );
}
