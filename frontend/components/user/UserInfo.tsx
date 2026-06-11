
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import UserSkeleton from "./UserSkeleton";

export default function UserInfo() {
  const { user, setUser, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await authService.logout();
      if (response.success) {
        setUser(null)
        toast.success(response.message);
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <>
      {isLoading ? (
        <UserSkeleton />
      ) : user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex gap-2 hover:opacity-80 transition focus-visible:outline-none">

              <div className="flex items-center gap-3">

                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div className="hidden text-left sm:block leading-tight">
                  <p className="text-sm font-medium text-slate-200">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-48 bg-[#111827] border border-slate-800 text-slate-200"
          >
            <div className="px-3 py-2 text-sm text-slate-400 border-b border-slate-800">
              Signed in as
              <div className="text-slate-200 font-medium">
                {user?.name ?? "User"}
              </div>
            </div>

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-400 focus:text-red-400 cursor-pointer p-2"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}

    </>
  )
}