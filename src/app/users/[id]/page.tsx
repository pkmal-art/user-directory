'use client';
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchUserByIdThunk, clearSelectedUser } from "@/redux/usersSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

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

  if (loading) return <p>Загрузка...</p>;

  if (error) {
    if (error.includes("404")) return <p>Пользователь не найден</p>;
    return <p>Ошибка: {error}</p>;
  }

  if (!selectedUser) {
    return null;
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 flex flex-col items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.pravatar.cc/150?u=${selectedUser.id}`}
        alt={selectedUser.name}
        className="w-28 h-28 rounded-full mb-6 border-4 border-purple-300 shadow-md"
      />
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
        {selectedUser.name}
      </h1>
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-2 text-gray-700">
        <p><span className="font-semibold text-purple-600">Ник:</span> {selectedUser.username}</p>
        <p><span className="font-semibold text-teal-600">Email:</span> {selectedUser.email}</p>
        <p><span className="font-semibold text-pink-600">Телефон:</span> {selectedUser.phone}</p>
        <p><span className="font-semibold text-yellow-600">Сайт:</span> {selectedUser.website}</p>
        <hr className="my-2"/>
        <p><span className="font-semibold">Адрес:</span> {selectedUser.address.street}, {selectedUser.address.suite}, {selectedUser.address.city}</p>
        <p><span className="font-semibold">Геопозиция:</span> {selectedUser.address.geo.lat}, {selectedUser.address.geo.lng}</p>
        <p><span className="font-semibold">Компания:</span> {selectedUser.company.name}</p>
      </div>

      <button
        className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform"
        onClick={() => router.push('/users')}
      >
        ⬅ Назад к списку
      </button>
    </div>
  );
}
