import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/images/heroimg.png";
import { Link, usePage } from "@inertiajs/react";

export function HeroSection() {
    const { auth } = usePage().props;
    const handleScrollToMenu = (e) => {
        e.preventDefault();
        const el = document.getElementById("menu");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="bg-background-primary py-20 lg:py-32" id="home">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="space-y-8 order-2 lg:order-1">
                        <div className="space-y-6">
                            <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
                                Makan enak, tanpa antre di{" "}
                                <span className="text-primary">SUKA</span>
                                -Canteen.
                            </h1>
                            <p className="text-lg text-text leading-relaxed">
                                Memudahkan akses makanan favorit dari kantin
                                kampus langsung dari genggamanmu.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {auth?.user ? (
                                <Link
                                    href={
                                        auth.user.role === "canteen_owner"
                                            ? route("canteen.dashboard")
                                            : route("user.menu")
                                    }
                                >
                                    <Button className="bg-primary text-white text-lg px-8 py-6 rounded-full hover:bg-primary-hover">
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <Link href={route("login")}>
                                    <Button className="bg-primary text-white text-lg px-8 py-6 rounded-full hover:bg-primary-hover">
                                        Gas Mulai!
                                    </Button>
                                </Link>
                            )}

                            {auth?.user ? (
                                <Link href={route("user.menu")}>
                                    <Button
                                        variant="outline"
                                        className="text-lg text-text px-8 py-6 rounded-full border-gray-300 hover:bg-background-secondary"
                                    >
                                        Intip Menu
                                        <ArrowRight className="w-4 h-4 ml-2 mt-1" />
                                    </Button>
                                </Link>
                            ) : (
                                <Button
                                    onClick={handleScrollToMenu}
                                    variant="outline"
                                    className="text-lg text-text px-8 py-6 rounded-full border-gray-300 hover:bg-background-secondary"
                                >
                                    Intip Menu
                                    <ArrowRight className="w-4 h-4 ml-2 mt-1" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative order-1 lg:order-2">
                        <div className="relative z-10 hover:scale-105 transition-transform duration-300">
                            <img
                                src={heroImg}
                                alt="Hero Image"
                                className="w-full h-auto"
                            />
                        </div>

                        {/* Floating Food Cards */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
