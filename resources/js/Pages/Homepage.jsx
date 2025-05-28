import { Head } from "@inertiajs/react";
import Navbar from "@/Components/homepage/Navbar";
import HeroSection from "@/Components/homepage/HeroSection";
import MenuSection from "@/Components/homepage/MenuSection";
import AboutSection from "@/Components/homepage/AboutSection";
import CanteenOwnerSection from "@/Components/homepage/CanteenOwnerSection";
import ServicesSection from "@/Components/homepage/ServicesSection";
import ContactSection from "@/Components/homepage/ContactSection";
import Footer from "@/Components/homepage/Footer";

export default function Homepage() {
    return (
        <>
            <Head title="SUKA-Canteen - Homepage" />
            <div className="min-h-screen bg-white">
                <Navbar />
                <main>
                    <HeroSection />
                    <MenuSection />
                    <AboutSection />
                    <CanteenOwnerSection />
                    <ServicesSection />
                    <ContactSection />
                </main>
                <Footer />
            </div>
        </>
    );
}
