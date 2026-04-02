import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import InternetSurfer from "@/components/InternetSurfer";
import Session from "@/components/Session";
import Experience from "@/components/Experience";
import Teaching from "@/components/Teaching";
import Book from "@/components/Book";
import Biblioteca from "@/components/Biblioteca";
import Press from "@/components/Press";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <InternetSurfer />
        <Experience />
        <Teaching />
        <Biblioteca />
        <Book />
        <Session />
        <Press />
      </main>
      <Footer />
    </>
  );
}
