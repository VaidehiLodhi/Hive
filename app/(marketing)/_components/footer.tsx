import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Footer=()=>{
    return (
      <div className="fixed bottom-0 w-full p-2 border-t bg-rose-200 flex items-center">
        <div className="md:max-w-screen-2xl mx-auto w-full flex items-center justify-between">
          <div className="space-x-4 md:block md:w-auto w-full flex items-center justify-between">
            <Button size="sm" variant="outline" className="text-black hover:bg-yellow-50">
              <Link href="/about">
                About Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
}