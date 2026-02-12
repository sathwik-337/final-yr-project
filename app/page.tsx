import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Header from "./_shared/Header";
import Hero from "./_shared/Hero"

export default function Home() {
  return (
    <div>
      <Header/>
      <Hero/>
    </div>
   
      
  );
}
