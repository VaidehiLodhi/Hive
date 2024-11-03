import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const NavBar=()=>{
    return (
      <div className="fixed top-0 w-full h-20 px-4 border-b shadow-sm bg-yellow-50 flex items-center">
        <div className="md:max-w-screen-2xl mx-auto w-full flex items-center justify-between">
          <Logo />
          <div className="space-x-4 md:block md:w-auto w-full flex items-center justify-between">
            <Button size="sm" variant="outline" asChild className="text-black font-semibold">
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/sign-up">
                Get Hive
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
}