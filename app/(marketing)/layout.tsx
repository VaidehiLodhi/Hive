import { Footer } from "./_components/footer";
import { NavBar } from "./_components/navbar";

const MarketingLayout =(
    {children} : 
    {children : React.ReactNode})=>{
    return (
      <div className="h-full bg-rose-200">
        <NavBar />
        <main className="pt-40 pb-20 bg-rose-200">
            {children}
        </main>
        <Footer />
      </div>
    );
}

export default MarketingLayout;