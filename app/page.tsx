import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Header from "./_shared/Header";
import Hero from "./_shared/Hero"
import RecentProjects from "./_shared/RecentProjects"
import Footer from "./_shared/Footer"

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Header/>
      <Hero/>
      <RecentProjects/>
      <Footer/>
    </div>
  );
}
