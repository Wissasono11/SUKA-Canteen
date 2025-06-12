import menusukaImg from "@/assets/images/menusukapage.png";

export default function MenuHero() {
    return (
        <section className="flex flex-col items-center justify-center text-center py-6 sm:py-12">
            <div className="max-w-full mx-auto w-full px-6">
                <div className="w-full h-72 rounded-2xl overflow-hidden bg-white flex items-center justify-center relative">
                    <img
                        src={menusukaImg}
                        alt="Ice Cream Banner"
                        className="absolute inset-0 w-full h-80 object-cover"
                    />
                    <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-black/30">
                        <h1
                            className="text-3xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg"
                            style={{
                                textShadow:
                                    "0 4px 24px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.5)",
                            }}
                        >
                            Welcome to SUKA-Canteen
                        </h1>
                        <p
                            className="text-base sm:text-lg text-white/90 drop-shadow-md"
                            style={{
                                textShadow:
                                    "0 2px 8px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.5)",
                            }}
                        >
                            Temukan cita rasa terbaik dari hidangan kantin
                            pilihan
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
