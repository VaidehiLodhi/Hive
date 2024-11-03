"use client"

import { Logo } from "@/components/logo"
import { LogoSurp } from "@/components/logoSurp";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AboutPage =()=> {

  const [isLogo, setIsLogo] = useState(true);
  const [isBg, setIsBg] = useState("bg-yellow-50");

  const onClick =()=> {
    if(isLogo) {
      setIsLogo(false);
      setIsBg("bg-pink-100")
    }
    else {
      setIsLogo(true);
      setIsBg("bg-yellow-50")
    }
  }

    return (
      <>
        <div
          className={`fixed ${isBg} top-0 w-full h-20 px-4 border-b border-neutral-300 shadow-sm flex items-center`}
        >
          <div className="md:max-w-screen-2xl mx-auto w-full flex items-center justify-between">
            <div className="group relative">
              {isLogo ? <Logo /> : <LogoSurp />}
              <div className="absolute top-3 left-20 mt-2 p-2 w-[180px] h-[30px] border bg-gray-300 text-neutral-700 text-xs rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Logo @Anant Kumar Sinha :p
              </div>
            </div>
            <Button onClick={onClick} size="sm" variant="default">
              {isLogo ? <p>Pink Pony Club?</p> : <p>Honey Hive Club?</p>}
            </Button>
          </div>
        </div>
        <div
          className={`${isBg} flex items-center justify-center h-full w-full`}
        >
          <div>
            <p className="text-center text-base font-semibold text-black">
              Made by, Vaidehi Lodhi, as a practice project 🧋🍧⭐
            </p>
          </div>
        </div>
      </>
    );
}

export default AboutPage;