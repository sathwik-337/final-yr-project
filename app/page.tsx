import { Suspense } from "react";
import Header from "./_shared/Header";
import Hero from "./_shared/Hero"
import RecentProjects from "./_shared/RecentProjects"
import Footer from "./_shared/Footer"

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Header/>
      <Suspense fallback={<div className="h-screen bg-background" />}>
        <Hero/>
      </Suspense>
      <RecentProjects/>
      <Footer/>
    </div>
  );
}
