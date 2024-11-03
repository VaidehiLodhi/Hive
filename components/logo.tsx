import Image from "next/image";

export const Logo=()=>{
    return (
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo_c.png" alt="logo" height={80} width={80} />
        
      </div>
    );
}