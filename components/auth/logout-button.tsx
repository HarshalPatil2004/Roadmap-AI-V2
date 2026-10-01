"use client";

import { useRouter } from "next/navigation";
import { Logout } from "@/lib/auth/logout";

export default function LogoutButton(){
    const router = useRouter();

    async function handleLogout() {
        try{
      await Logout();
            router.push("/login");
            router.refresh();
        }  

        catch(error) {
            console.error("Logout Failed",error);
        }
    }

    return (
        <button type="button" onClick={handleLogout}>
            Logout
        </button>
    );
}