'use client';
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext";

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useRouter();
  return (
    <div className="header-container">
      <h2>{user?.username}</h2>
      <button onClick={() => {
        logout()
        navigate.push('/login');
        }}>Logout</button>
    </div>
  );
}
