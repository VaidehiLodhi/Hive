import { Notebook } from "lucide-react";
import localFont from "next/font/local";
import {Poppins} from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Cover } from "@/components/ui/cover";


const HeadingFont = localFont({
  src: "../../public/CalSans-SemiBold.woff",
});

const TextFont = Poppins({
  subsets: ["latin"],
  weight: [
    "100", "200", "300", "400", "500", "600", "700", "800", "900"
  ],
});

const MarketingPage = () => {
  return (
    <div
      className={cn(
        "flex items-center justify-center flex-col",
        HeadingFont.className
      )}
    >
      <div className="flex items-center justify-center flex-col">
        <div className="flex items-center bg-amber-50 text-amber-700 p-4 mb-4 border shadow-sm rounded-full uppercase">
          <Notebook className="h-6 w-6 mr-2" />
          Redefining Student Collaboration
        </div>
        <h1 className="text-2xl md:text-4xl text-center text-neutral-800 mb-6">
          Small Ideas, Big Impact – Powered by the Hive
        </h1>

        <Cover className="text-2xl md:text-4xl bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-4 p-2 pb-4 rounded-md w-fit">
          collective brilliance.
        </Cover>
      </div>
      <div
        className={cn(
          "text-sm md:text-lg text-neutral-500 text-center mt-4 max-w-xs md:max-w-xl mx-auto",
          TextFont.className
        )}
      >
        Hive is the platform where students connect, collaborate, and innovate.
        Join a buzzing community to turn ideas into action, learn from peers,
        and build extraordinary projects. Together, we shape the future!
      </div>
          <Button className="mt-6 font-bold text-lg" size="lg" asChild>
            <Link href="/sign-up">Join Hive Today</Link>
          </Button>
    </div>
  );
};

export default MarketingPage;
