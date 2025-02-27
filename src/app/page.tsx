"use client"

import { ArrowRight, Award, Building2, CheckCircle, Clock, Hammer, HardHat, MapPin, Menu, Phone, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedCounter } from "@/components/animated-counter"
import { FadeIn } from "@/components/fade-in"
import { TestimonialCard } from "@/components/testimonial-card"
import "./globals.css"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [contactModalOpen, setContactModalOpen] = useState(false)

  // Use useEffect with an empty dependency array to run once after client-side hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Only run these effects after mounting
  useEffect(() => {
    if (!mounted) return
    
    // Handle clicking outside to close menu
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setMobileMenuOpen(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [mobileMenuOpen, mounted])

  // Handle scroll and section highlighting
  useEffect(() => {
    if (!mounted) return
    
    const sections = ["services", "projects", "testimonials", "about", "contact"]
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // offset for navbar height

      // Check each section's position
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { top, bottom } = element.getBoundingClientRect()
          const elementTop = top + window.scrollY
          const elementBottom = bottom + window.scrollY

          // Set active when scrolled to section
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveSection(section)
            break
          }
        }
      }
      
      // Handle home section (top of page)
      const servicesElement = document.getElementById("services")
      const servicesPosition = servicesElement 
        ? servicesElement.getBoundingClientRect().top + window.scrollY 
        : 1000
      
      if (scrollPosition < servicesPosition) {
        setActiveSection("")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted])

  // Close mobile menu when window resizes to desktop size
  useEffect(() => {
    if (!mounted) return
    
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen, mounted])

  // Helper to determine if a link is active
  const isActive = (section: string) => activeSection === section

  // 2. Pre-compute the current year for footer
  const currentYear = new Date().getFullYear()

  // Add function to handle phone click based on device
  const handlePhoneContact = () => {
    if (mounted && typeof window !== 'undefined') {
      // Check if mobile device (rough detection)
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Mobile: redirect to phone app
        window.location.href = 'tel:+40773928274'; // Updated phone number
      } else {
        // Desktop: show modal
        setContactModalOpen(true);
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            <span className="text-xl font-bold">AMEC GRUP</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 justify-end flex-1">
            <Link 
              href="#" 
              className={`text-sm font-medium hover:text-primary transition-colors ${
                activeSection === "" ? "text-primary" : ""
              }`}
            >
              Acasă
            </Link>
            <Link 
              href="#services" 
              className={`text-sm font-medium hover:text-primary transition-colors ${
                isActive("services") ? "text-primary" : ""
              }`}
            >
              Servicii
            </Link>
            <Link 
              href="#projects" 
              className={`text-sm font-medium hover:text-primary transition-colors ${
                isActive("projects") ? "text-primary" : ""
              }`}
            >
              Proiecte
            </Link>
            <Link 
              href="#about" 
              className={`text-sm font-medium hover:text-primary transition-colors ${
                isActive("about") ? "text-primary" : ""
              }`}
            >
              Despre
            </Link>
            <Link 
              href="#contact" 
              className={`text-sm font-medium hover:text-primary transition-colors ${
                isActive("contact") ? "text-primary" : ""
              }`}
            >
              Contact
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors mobile-menu-button"
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-menu block md:hidden border-t overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen && mounted ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}>
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link 
              href="#" 
              className={`block py-2 text-sm font-medium hover:text-primary transition-colors ${
                activeSection === "" ? "text-primary" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Acasă
            </Link>
            <Link 
              href="#services" 
              className={`block py-2 text-sm font-medium hover:text-primary transition-colors ${
                isActive("services") ? "text-primary" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Servicii
            </Link>
            <Link 
              href="#projects" 
              className={`block py-2 text-sm font-medium hover:text-primary transition-colors ${
                isActive("projects") ? "text-primary" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Proiecte
            </Link>
            <Link 
              href="#about" 
              className={`block py-2 text-sm font-medium hover:text-primary transition-colors ${
                isActive("about") ? "text-primary" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Despre
            </Link>
            <Link 
              href="#contact" 
              className={`block py-2 text-sm font-medium hover:text-primary transition-colors ${
                isActive("contact") ? "text-primary" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative h-screen flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/construction-hero.svg"
              alt="Construction site"
              fill
              className="object-cover brightness-[0.4]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-black/50 mix-blend-multiply" />
          </div>
          <div className="container relative z-10 mx-auto px-4 flex flex-col justify-center h-full">
            <FadeIn>
              <div className="max-w-4xl mx-auto text-center flex flex-col justify-center space-y-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                    <span className="text-white inline-block">DISTRIBUITOR PANOURI SANDWICH</span>
                    <br className="hidden sm:block" />
                    <span className="relative inline-block mt-1 text-white">
                      <span className="absolute inset-0 bg-primary/30 skew-y-[-1deg] transform rounded-lg"></span>
                      <span className="relative">LA CEL MAI BUN PREȚ DIN ȚARĂ</span>
                    </span>
                  </h1>
                </div>
                
                <div className="glass-panel bg-background/90 backdrop-blur-xl p-3 sm:p-4 md:p-6 rounded-2xl border border-primary/30 shadow-xl transform hover:shadow-2xl transition-all duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-foreground font-medium">
                    <div className="service-item flex items-center p-1 sm:p-2 hover:bg-primary/15 rounded-xl transition-all hover:shadow-md">
                      <div className="bg-primary/10 p-1 rounded-full mr-2 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-xs sm:text-sm">TRANSPORT ȘI LOGISTICĂ</span>
                    </div>
                    <div className="service-item flex items-center p-1 sm:p-2 hover:bg-primary/15 rounded-xl transition-all hover:shadow-md">
                      <div className="bg-primary/10 p-1 rounded-full mr-2 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-xs sm:text-sm">CONSTRUCȚII CIVILE ȘI INDUSTRIALE</span>
                    </div>
                    <div className="service-item flex items-center p-1 sm:p-2 hover:bg-primary/15 rounded-xl transition-all hover:shadow-md">
                      <div className="bg-primary/10 p-1 rounded-full mr-2 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-xs sm:text-sm">AMENAJĂRI INTERIOARE ȘI EXTERIOARE</span>
                    </div>
                    <div className="service-item flex items-center p-1 sm:p-2 hover:bg-primary/15 rounded-xl transition-all hover:shadow-md">
                      <div className="bg-primary/10 p-1 rounded-full mr-2 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-xs sm:text-sm">INSTALAȚII ELECTRICE ȘI SANITARE</span>
                    </div>
                    <div className="service-item flex items-center p-1 sm:p-2 hover:bg-primary/15 rounded-xl transition-all hover:shadow-md">
                      <div className="bg-primary/10 p-1 rounded-full mr-2 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-xs sm:text-sm">HALE INDUSTRIALE</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button 
                    className="px-3 sm:px-4 py-2 text-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    onClick={() => {
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Serviciile Noastre <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-background/20 text-white hover:bg-background/40 px-3 sm:px-4 py-2 text-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    onClick={() => {
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Vezi Proiecte <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Stats section - HIDDEN */}
        <section id="stats" className="bg-muted py-12 px-4" style={{ display: 'none' }}>
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <FadeIn delay={0.1}>
                <div className="flex flex-col items-center text-center">
                  <AnimatedCounter value={25} duration={2} className="text-4xl font-bold" />
                  <span className="text-muted-foreground">Years Experience</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="flex flex-col items-center text-center">
                  <AnimatedCounter value={500} duration={2} className="text-4xl font-bold" />
                  <span className="text-muted-foreground">Projects Completed</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex flex-col items-center text-center">
                  <AnimatedCounter value={150} duration={2} className="text-4xl font-bold" />
                  <span className="text-muted-foreground">Expert Workers</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="flex flex-col items-center text-center">
                  <AnimatedCounter value={98} duration={2} className="text-4xl font-bold" suffix="%" />
                  <span className="text-muted-foreground">Client Satisfaction</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section id="services" className="py-20 md:py-28 px-4 relative bg-gradient-to-b from-background to-muted">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container relative z-10 mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-2">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    Serviciile Noastre
                  </span>
                </h2>
                <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
                <p className="mt-4 text-muted-foreground max-w-3xl mx-auto text-lg">
                  Oferim o gamă completă de servicii pentru a satisface toate nevoile dumneavoastră.
                </p>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              <FadeIn delay={0.1}>
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm group overflow-hidden flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 opacity-50"></div>
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full transition-all duration-500 group-hover:scale-150"></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="bg-primary/10 p-3 rounded-xl w-fit mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                      <Hammer className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl transition-all duration-300 group-hover:text-primary">
                      Amenajări Interioare și Exterioare
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 flex-grow">
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      Oferim servicii complete de amenajări interioare și exterioare pentru apartamente și garsoniere. Cu o echipă dedicată de specialiști și recomandarea a peste 1000 de clienți mulțumiți, garantăm calitatea lucrărilor și satisfacția clientului pentru orice proiect de renovare.
                    </p>
                  </CardContent>
                  
                  <CardFooter className="relative z-10 mt-auto">
                    <Button 
                      variant="outline" 
                      className="w-full h-10 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                      onClick={() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Află Mai Multe <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm group overflow-hidden flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 opacity-50"></div>
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full transition-all duration-500 group-hover:scale-150"></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="bg-primary/10 p-3 rounded-xl w-fit mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                      <Building2 className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl transition-all duration-300 group-hover:text-primary">
                      Distribuție Panouri Sandwich și Tablă Tip Lindab
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 flex-grow">
                    <p className="mb-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      Furnizăm panouri sandwich și tablă tip Lindab la cel mai bun preț și cea mai înaltă calitate.
                    </p>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      Descoperă acum ofertele noastre speciale.
                    </p>
                  </CardContent>
                  
                  <CardFooter className="relative z-10 mt-auto">
                    <Button 
                      variant="outline" 
                      className="w-full h-10 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                      onClick={() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Află Mai Multe <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm group overflow-hidden flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 opacity-50"></div>
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full transition-all duration-500 group-hover:scale-150"></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="bg-primary/10 p-3 rounded-xl w-fit mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                      <HardHat className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl transition-all duration-300 group-hover:text-primary">
                      Hale Industriale
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 flex-grow">
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      Construim hale metalice, orice formă sau dimensiuni, pentru centre logistice, parcuri industriale, depozite sau spații comerciale.
                    </p>
                  </CardContent>
                  
                  <CardFooter className="relative z-10 mt-auto">
                    <Button 
                      variant="outline" 
                      className="w-full h-10 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                      onClick={() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Află Mai Multe <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </FadeIn>
              
              <FadeIn delay={0.4}>
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm group overflow-hidden flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 opacity-50"></div>
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full transition-all duration-500 group-hover:scale-150"></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="bg-primary/10 p-3 rounded-xl w-fit mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                      <Clock className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl transition-all duration-300 group-hover:text-primary">
                      Instalații Electrice și Sanitare
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 flex-grow">
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      Executăm instalații electrice și sanitare, cu personal calificat, fiind pregătiți întotdeauna să oferim clienților servicii de calitate și cea mai bună consultanță.
                    </p>
                  </CardContent>
                  
                  <CardFooter className="relative z-10 mt-auto">
                    <Button 
                      variant="outline" 
                      className="w-full h-10 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                      onClick={() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Află Mai Multe <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </FadeIn>
              
              <FadeIn delay={0.5}>
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm group overflow-hidden flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 opacity-50"></div>
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full transition-all duration-500 group-hover:scale-150"></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="bg-primary/10 p-3 rounded-xl w-fit mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                      <MapPin className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl transition-all duration-300 group-hover:text-primary">
                      Transport și Logistică
                    </CardTitle>
                    <CardDescription className="font-medium">
                      Intern și Internațional
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 flex-grow">
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      Oferim servicii de transport mărfuri rutiere și logistică, în regim intern și internațional, cu gama completă de mijloace de transport de diverse tonaje și dimensiuni.
                    </p>
                  </CardContent>
                  
                  <CardFooter className="relative z-10 mt-auto">
                    <Button 
                      variant="outline" 
                      className="w-full h-10 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                      onClick={() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Află Mai Multe <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </FadeIn>
              
              <FadeIn delay={0.6}>
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm group overflow-hidden flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 opacity-50"></div>
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full transition-all duration-500 group-hover:scale-150"></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="bg-primary/10 p-3 rounded-xl w-fit mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                      <Award className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl transition-all duration-300 group-hover:text-primary">
                      Construcții Civile și Industriale
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 flex-grow">
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      Experiență de peste 22 ani în construcții civile și industriale, oferind servicii de calitate și prețuri adaptate bugetului tău.
                    </p>
                  </CardContent>
                  
                  <CardFooter className="relative z-10 mt-auto">
                    <Button 
                      variant="outline" 
                      className="w-full h-10 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                      onClick={() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Află Mai Multe <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </FadeIn>
            </div>
            
            <div className="mt-16 text-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg transition-all duration-300 hover:shadow-xl">
                Toate Serviciile <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-24 bg-muted px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/team.svg"
                    alt="Echipa AMEC GRUP"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="font-bold text-white text-2xl drop-shadow-md">Din 2002 alături de clienții noștri</div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-2">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                      Despre AMEC GRUP
                    </span>
                  </h2>
                  <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
                  
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg leading-relaxed">
                      AMEC GRUP este un grup de firme specializate în construcții civile și industriale, amenajări interioare și exterioare, montaj hale metalice. Executăm proiecte la cheie ca antreprenor general sau părți de proiect în cadrul unor antreprize.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Societățile din AMEC GRUP funcționează din anul 2002 și au la activ o serie de proiecte importante executate pe teritoriul României.
                    </p>
                    <p className="text-lg font-medium">
                      În ultimii doi ani, am dezvoltat distribuția de panouri sandwich, tablă tip Lindab și materiale de construcții, la cele mai competitive prețuri.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="bg-background/50 backdrop-blur-sm p-4 rounded-xl shadow-md hover:shadow-lg transition-all border border-primary/10">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="h-6 w-6 text-primary" />
                        <h3 className="font-bold">20+ ani</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Experiență în domeniul construcțiilor
                      </p>
                    </div>
                    
                    <div className="bg-background/50 backdrop-blur-sm p-4 rounded-xl shadow-md hover:shadow-lg transition-all border border-primary/10">
                      <div className="flex items-center gap-3 mb-2">
                        <Building2 className="h-6 w-6 text-primary" />
                        <h3 className="font-bold">Proiecte la cheie</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Servicii complete de antreprenoriat
                      </p>
                    </div>
                    
                    <div className="bg-background/50 backdrop-blur-sm p-4 rounded-xl shadow-md hover:shadow-lg transition-all border border-primary/10">
                      <div className="flex items-center gap-3 mb-2">
                        <HardHat className="h-6 w-6 text-primary" />
                        <h3 className="font-bold">Prețuri competitive</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Materiale de construcții de calitate
                      </p>
                    </div>
                  </div>
                  
                  <Button size="lg" className="mt-4"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                    Contactează-ne <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section id="projects" className="py-16 md:py-24 bg-background px-4 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <FadeIn>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    Proiectele Noastre
                  </span>
                </h2>
                <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
                <p className="mt-4 text-muted-foreground max-w-3xl mx-auto text-lg">
                  Explorați portofoliul nostru de proiecte care demonstrează expertiza și calitatea serviciilor oferite.
                </p>
              </div>
            </FadeIn>
            
            <div className="flex flex-col items-center justify-center py-12 md:py-20">
              <FadeIn delay={0.2}>
                <div className="relative bg-background/50 backdrop-blur-lg p-8 md:p-12 rounded-2xl shadow-xl border border-primary/10 max-w-3xl mx-auto text-center">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary/20 p-4 rounded-full">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mt-4 mb-6">Proiecte În Curând</h3>
                  <p className="text-lg text-muted-foreground mb-8">
                    Lucrăm în prezent la actualizarea portofoliului nostru cu proiectele recente. 
                    Reveniți în curând pentru a vedea realizările noastre.
                  </p>
                  
                  <div className="relative h-[180px] md:h-[240px] w-full rounded-lg overflow-hidden mb-8">
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                      <div className="text-center p-6">
                        <Building2 className="h-16 w-16 text-primary/40 mx-auto mb-4" />
                        <p className="text-muted-foreground font-medium">Galeria de proiecte va fi disponibilă în curând</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Contactează-ne pentru Detalii <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Testimonials section - HIDDEN */}
        <section id="testimonials" className="py-16 md:py-24 px-4" style={{ display: 'none' }}>
          <div className="container mx-auto">
            <FadeIn>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">What Our Clients Say</h2>
                <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                  Hear from our satisfied clients about their experience working with AMEC GRUP.
                </p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonialCard
                quote="AMEC GRUP delivered our office complex on time and within budget. Their attention to detail and quality of work exceeded our expectations."
                author="Sarah Johnson"
                title="CEO, TechInnovate"
                image="/profile.svg"
                delay={0.1}
              />
              <TestimonialCard
                quote="We've worked with many construction firms, but none have matched the professionalism and expertise of AMEC GRUP. They're our go-to partner for all projects."
                author="Michael Chen"
                title="Director of Facilities, Metro Development"
                image="/profile.svg"
                delay={0.2}
              />
              <TestimonialCard
                quote="The team at AMEC GRUP transformed our vision into reality. Their innovative approach to sustainable construction has set a new standard in our industry."
                author="Emily Rodriguez"
                title="Sustainability Officer, GreenLiving Properties"
                image="/profile.svg"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Replace Get In Touch section with a new contact section */}
        <section id="contact" className="py-16 md:py-24 px-4 bg-muted">
          <div className="container mx-auto">
            <FadeIn>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-2">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    Contactează-ne
                  </span>
                </h2>
                <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
                <p className="mt-4 text-muted-foreground max-w-3xl mx-auto text-lg">
                  Suntem pregătiți să discutăm despre nevoile dvs. și să vă oferim soluțiile potrivite.
                </p>
              </div>
            </FadeIn>
            
            <div className="max-w-3xl mx-auto bg-background/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-primary/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-bold">Locația Noastră</h3>
                      <p className="text-muted-foreground">Strada Exemplu 123, București, România</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-bold">Program de Lucru</h3>
                      <p className="text-muted-foreground">Luni - Vineri: 8:00 - 18:00</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center space-y-4 p-4">
                  <div className="bg-primary/10 p-4 rounded-full mb-2">
                    <Phone className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Sună-ne Acum</h3>
                  <p className="text-muted-foreground text-center">
                    Contactează-ne direct pentru o consultație gratuită
                  </p>
                  <Button 
                    size="lg" 
                    className="w-full mt-4 group"
                    onClick={handlePhoneContact}
                  >
                    <Phone className="mr-2 h-4 w-4 group-hover:animate-pulse" /> Sună Acum
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted py-6 border-t px-4">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-5 w-5" />
              <span className="font-medium">AMEC GRUP</span>
            </div>
            
            <div className="flex items-center gap-2 mb-4 text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" />
              <span>+40773928274</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <span>&copy; {currentYear} AMEC GRUP &middot; </span>
              <span>Made by </span>
              <a 
                href="https://whozoom.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                WhoZoom
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Phone Contact Modal */}
      {mounted && contactModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-foreground">Contactează-ne Telefonic</h3>
              <button 
                onClick={() => setContactModalOpen(false)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center py-6">
              <div className="bg-primary/10 p-5 rounded-full mb-6">
                <Phone className="h-12 w-12 text-primary" />
              </div>
              
              <p className="text-lg mb-2 text-center text-muted-foreground">
                Sunați-ne la numărul de telefon:
              </p>
              
              <div className="text-2xl md:text-3xl font-bold text-primary my-4 tracking-wider">
                +40773928274
              </div>
              
              <p className="text-sm text-muted-foreground text-center mb-6">
                Program: Luni - Vineri, 8:00 - 18:00
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setContactModalOpen(false)}
                >
                  Închide
                </Button>
                <Button 
                  className="flex-1 gap-2"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText('+40773928274');
                      // Could add toast notification here
                    }
                  }}
                >
                  <span>Copiază Numărul</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

