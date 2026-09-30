import { AboutSection } from '@/components/about-section'
import { ConnectSection } from '@/components/connect-section'
import { ContactSection } from '@/components/contact-section'
import { ServersSection } from '@/components/servers-section'
import { ServicesSection } from '@/components/services-section'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <ConnectSection />
        <AboutSection />
        <ServicesSection />
        <ServersSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
