"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLogoutGuest } from "@/hooks/useLogoutGuest";

const ButtonLogout = ({ guestUser }) => {
  const [guest, setGuest] = useState(guestUser || null);
  const { mutate, isPending, isSuccess } = useLogoutGuest();
  const router = useRouter();

  const handleLogout = () => {
    if (guest?._id) {
      mutate(
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

  const isLoading = isPending || isSuccess;

  useEffect(() => {
    if (!guest?._id) return;

    const handleBeforeUnload = (event) => {
      const payload = JSON.stringify({ guestId: guest._id });
      navigator.sendBeacon("/api/auth/guest", payload);

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [guest]);

  return (
    <button
      onClick={handleLogout}
      className={`btn btn-error font-bold ${isLoading ? "loading" : ""}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="loading loading-spinner text-neutral"></span>
      ) : (
        "Logout"
      )}
    </button>
  );
};

export default ButtonLogout;
