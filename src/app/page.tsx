import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Problema from "@/components/Problema";
import Solucion from "@/components/Solucion";
import Session from "@/components/Session";
import Book from "@/components/Book";
import Biblioteca from "@/components/Biblioteca";
import Experience from "@/components/Experience";
import Teaching from "@/components/Teaching";
import CtaFinal from "@/components/CtaFinal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Problema />
        <Solucion />
        <Session />
        <Book />
        <Biblioteca />
        <Experience />
        <Teaching />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
