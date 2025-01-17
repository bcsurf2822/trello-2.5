"use client";
import { useEffect, useState } from "react";
import { useLogoutGuest } from "@/hooks/useLogoutGuest";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ButtonLogout = ({ guestUser }) => {
  const [guest, setGuest] = useState(guestUser || null);
  const logoutGuest = useLogoutGuest();
  const router = useRouter();

  const handleLogout = () => {
    if (guest?._id) {
      logoutGuest.mutate(
        { guestId: guest._id },
        {
          onSuccess: () => {
            setGuest(null);
            router.push("/");
            router.refresh();
          },
        }
      );
    } else {
      signOut({ callbackUrl: "/" });
    }
  };

  useEffect(() => {
    if (!guest?._id) return;

    const handleBeforeUnload = (event) => {
      logoutGuest.mutate({ guestId: guest._id });
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [guest, logoutGuest]);

  return (
    <button
      onClick={handleLogout}
      className={`btn btn-error font-bold ${
        logoutGuest.isPending ? "loading" : ""
      }`}
      disabled={logoutGuest.isPending}
    >
      {logoutGuest.isPending ? (
        <span className="loading loading-spinner text-neutral"></span>
      ) : (
        "Logout"
      )}
    </button>
  );
};

export default ButtonLogout;
