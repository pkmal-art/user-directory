'use client';
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchUserByIdThunk, clearSelectedUser } from "@/redux/usersSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import HeaderButton from "@/components/HeaderButton";

export default function UserDetailPage() {
  const params = useParams<{ id: string }>();
  const idNum = Number(params.id);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedUser, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (Number.isNaN(idNum) || idNum <= 0) return;

    dispatch(fetchUserByIdThunk(idNum));

    return () => {
      dispatch(clearSelectedUser());
    };
  }, [dispatch, idNum]);

  if (Number.isNaN(idNum) || idNum <= 0) return <p>Некорректный ID</p>;

  if (loading) return;

  if (error) {
    if (error.includes("404")) return <p>Пользователь не найден</p>;
    return <p>Ошибка: {error}</p>;
  }

  if (!selectedUser) {
    return null;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex flex-col">
      <div className="w-full flex justify-start mb-4">
        <HeaderButton text="Главная" href="/" />
      </div>

      <div className="flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.pravatar.cc/150?u=${selectedUser.id}`}
          alt={selectedUser.name}
          className="w-28 h-28 rounded-full mb-6 border-4 border-purple-200 shadow-sm"
        />

        <h1 className="text-2xl font-semibold text-purple-600 mb-4">
          {selectedUser.name}
        </h1>

        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-3 text-gray-800">
          <p><span className="font-medium text-purple-700">Ник:</span> {selectedUser.username}</p>
          <p><span className="font-medium text-purple-700">Email:</span> {selectedUser.email}</p>
          <p><span className="font-medium text-purple-700">Телефон:</span> {selectedUser.phone}</p>
          <p><span className="font-medium text-purple-700">Сайт:</span> {selectedUser.website}</p>
          <p><span className="font-medium text-purple-700">Адрес:</span> {selectedUser.address.street}, {selectedUser.address.suite}, {selectedUser.address.city}</p>
          <p><span className="font-medium text-purple-700">Компания:</span> {selectedUser.company.name}</p>
        </div>

        <button
          className="mt-8 px-5 py-2.5 rounded-lg bg-purple-600 text-white font-medium shadow-md hover:bg-purple-700 transition-colors"
          onClick={() => router.push('/users')}
        >
          ⬅ Назад к списку
        </button>
      </div>
    </div>
  );
}
