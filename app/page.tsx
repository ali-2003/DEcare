import Navbar from '@/app/components/Navbar'
import Hero from '@/app/components/Hero'
import About from '@/app/components/About'
import Services from '@/app/components/Services'
import Appointment from '@/app/components/Appointment'
import Footer from '@/app/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Appointment />
      <Footer />
    </>
  )
}