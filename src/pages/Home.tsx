import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Skills } from "../components/Skills";
import { Projects } from "../components/Projects";
import { Contact } from "../components/Contact";

export function Home() {
    return (
        <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
        </main>
    );
}
