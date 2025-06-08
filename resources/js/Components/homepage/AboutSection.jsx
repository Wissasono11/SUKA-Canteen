import { Button } from "@/components/ui/button";
import aboutImg from "../../../assets/images/aboutImg.png";
import { Link } from "@inertiajs/react";

export function AboutSection() {
    return (
        <section className="py-20 bg-white" id="about">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className="relative">
                        <img
                            src={aboutImg}
                            alt="About Image"
                            className="w-full h-auto max-w-md mx-auto rounded-xl hover:"
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight">
                                Apa Itu{" "}
                                <span className="text-primary">SUKA</span>
                                -Canteen?
                            </h2>
                            <p className="text-lg text-text leading-relaxed">
                                Sistem pemesanan makanan secara digital untuk
                                kantin UIN Sunan Kalijaga. Guna memudahkan
                                mahasiswa dan Civitas akademik untuk memesan
                                makanan tanpa harus menuju kantin.
                            </p>
                        </div>

                        <Link href={route("register")}>
                            <Button className="bg-primary text-secondary text-lg px-8 py-6 rounded-full hover:bg-primary-hover mx-auto lg:mx-2 lg:mt-4 flex justify-center items-center w-full sm:w-auto">
                                <span className="text-center">Yuk Daftar!</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
