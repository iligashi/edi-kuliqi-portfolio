import { IntroProvider } from "@/components/intro"
import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { Work } from "@/components/work"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Process } from "@/components/process"
import { Experience } from "@/components/experience"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <IntroProvider>
      <a href="#work" className="skip">
        Skip to work
      </a>
      <Nav />
      <main id="top">
        <Hero />
        <Marquee />
        <Work />
        <Services />
        <About />
        <Process />
        <Experience />
        <Contact />
      </main>
    </IntroProvider>
  )
}
