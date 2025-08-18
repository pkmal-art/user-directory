'use client';
import { useEffect, useState } from 'react';
import { fetchUsers } from '@/redux/usersSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.users);

  // Пагинация (только клиентская)
  const [page, setPage] = useState(1);
  const usersPerPage = 6;

  useEffect(() => {
    dispatch(fetchUsers()); // загружаем пользователей при первом рендере
  }, [dispatch]);

  // Индекс для slice
  const startIndex = (page - 1) * usersPerPage;
  const paginatedUsers = data.slice(startIndex, startIndex + usersPerPage);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl text-purple-600 font-bold mb-4">Список пользователей</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedUsers.map((user) => (
          <div key={user.id} className="p-4 border rounded-lg shadow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.pravatar.cc/150?u=${user.id}`}
              alt={user.name}
              className="w-16 h-16 rounded-full"
              loading="lazy" 
              decoding="async" 
            />


            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p>{user.email}</p>
          </div>
        ))}
      </div>

      {/* Пагинация */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Назад
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={startIndex + usersPerPage >= data.length}
          onClick={() => setPage(page + 1)}
        >
          Вперёд
        </button>
      </div>
    </div>
  );
}