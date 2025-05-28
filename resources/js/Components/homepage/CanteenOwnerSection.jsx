import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import canteenImg from "../../../assets/images/canteenowner.png";

// SVG ICONS
const icons = [
    // Manajemen Pesanan
    <svg
        width="40"
        height="40"
        viewBox="0 0 57 57"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M9.5 30.875C6.86375 30.875 4.75 32.9888 4.75 35.625V45.125C4.75 47.7612 6.86375 49.875 9.5 49.875H19C21.6362 49.875 23.75 47.7612 23.75 45.125V35.625C23.75 32.9888 21.6362 30.875 19 30.875M19.475 34.4375L21.9925 36.9312L12.5163 46.3125L6.5075 40.2563L9.04875 37.7625L12.54 41.3012M9.5 7.125C6.86375 7.125 4.75 9.23875 4.75 11.875V21.375C4.75 24.0112 6.86375 26.125 9.5 26.125H19C21.6362 26.125 23.75 24.0112 23.75 21.375V11.875C23.75 9.23875 21.6362 7.125 19 7.125M9.5 11.875H19V21.375H9.5M28.5 11.875H52.25V16.625H28.5M28.5 45.125V40.375H52.25V45.125M28.5 26.125H52.25V30.875H28.5V26.125Z"
            fill="#5B721C"
        />
    </svg>,
    // Manajemen Menu
    <svg
        width="40"
        height="40"
        viewBox="0 0 57 57"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.5938 3.5625C19.3232 3.56257 19.0562 3.62429 18.813 3.74295C18.5699 3.86161 18.3569 4.03411 18.1904 4.24735C18.0239 4.46059 17.9081 4.70897 17.8519 4.97363C17.7956 5.2383 17.8005 5.51229 17.8659 5.77481L18.2044 7.125H12.4688C11.9963 7.125 11.5433 7.31267 11.2092 7.64672C10.8752 7.98077 10.6875 8.43383 10.6875 8.90625V51.6562C10.6875 52.1287 10.8752 52.5817 11.2092 52.9158C11.5433 53.2498 11.9963 53.4375 12.4688 53.4375H44.5312C45.0037 53.4375 45.4567 53.2498 45.7908 52.9158C46.1248 52.5817 46.3125 52.1287 46.3125 51.6562V8.90625C46.3125 8.43383 46.1248 7.98077 45.7908 7.64672C45.4567 7.31267 45.0037 7.125 44.5312 7.125H38.7956L39.1341 5.77481C39.1995 5.51229 39.2043 5.2383 39.1481 4.97363C39.0919 4.70897 38.9761 4.46059 38.8096 4.24735C38.6431 4.03411 38.4301 3.86161 38.187 3.74295C37.9438 3.62429 37.6768 3.56257 37.4062 3.5625H19.5938ZM21.8737 7.125H35.1262L34.2356 10.6875H22.7644L21.8737 7.125ZM30.2812 23.1562V24.9375H17.8125V28.5H30.2812V30.2812H33.8438V28.5H39.1875V24.9375H33.8438V23.1562H30.2812ZM23.1562 33.8438V35.625H17.8125V39.1875H23.1562V40.9688H26.7188V39.1875H39.1875V35.625H26.7188V33.8438H23.1562Z"
            fill="#5B721C"
        />
    </svg>,
    // Laporan Penjualan
    <svg
        width="40"
        height="40"
        viewBox="0 0 57 57"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M24.9375 7.125H17.8125C16.1751 7.125 14.5537 7.44751 13.0409 8.07413C11.5281 8.70074 10.1536 9.61918 8.99576 10.777C7.83793 11.9348 6.91949 13.3094 6.29288 14.8222C5.66626 16.3349 5.34375 17.9563 5.34375 19.5938C5.34375 21.2312 5.66626 22.8526 6.29288 24.3653C6.91949 25.8781 7.83793 27.2527 8.99576 28.4105C10.1536 29.5683 11.5281 30.4868 13.0409 31.1134C14.5537 31.74 16.1751 32.0625 17.8125 32.0625H24.9375V42.75H8.90625V49.875H24.9375V57H32.0625V49.875H39.1875C42.4944 49.875 45.6659 48.5613 48.0042 46.223C50.3426 43.8846 51.6562 40.7132 51.6562 37.4062C51.6562 34.0993 50.3426 30.9279 48.0042 28.5895C45.6659 26.2512 42.4944 24.9375 39.1875 24.9375H32.0625V14.25H48.0938V7.125H32.0625V0H24.9375V7.125ZM32.0625 32.0625H39.1875C40.6048 32.0625 41.964 32.6255 42.9661 33.6276C43.9683 34.6298 44.5312 35.989 44.5312 37.4062C44.5312 38.8235 43.9683 40.1827 42.9661 41.1849C41.964 42.187 40.6048 42.75 39.1875 42.75H32.0625V32.0625ZM24.9375 24.9375H17.8125C17.1107 24.9375 16.4159 24.7993 15.7675 24.5307C15.1192 24.2622 14.5301 23.8686 14.0339 23.3724C13.5377 22.8761 13.1441 22.287 12.8755 21.6387C12.607 20.9904 12.4688 20.2955 12.4688 19.5938C12.4688 18.892 12.607 18.1971 12.8755 17.5488C13.1441 16.9005 13.5377 16.3114 14.0339 15.8151C14.5301 15.3189 15.1192 14.9253 15.7675 14.6568C16.4159 14.3882 17.1107 14.25 17.8125 14.25H24.9375V24.9375Z"
            fill="#5B721C"
        />
    </svg>,
];

// DATA SERVICES
const services = [
    {
        title: "MANAJEMEN PESANAN",
        description: "Handle Pesanan Makanan",
        icon: icons[0],
    },
    {
        title: "MANAJEMEN MENU",
        description: "Handle Menu Kantin",
        icon: icons[1],
    },
    {
        title: "LAPORAN PENJUALAN",
        description: "Pantau Laporan Penjualan",
        icon: icons[2],
    },
];

// KOMPONEN CARD REUSABLE
function ServiceCard({ icon, title, description }) {
    return (
        <Card className="bg-background-primary shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary-pastel rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
                <p className="text-text">{description}</p>
            </CardContent>
        </Card>
    );
}

export function CanteenOwnerSection() {
    return (
        <section className="py-20 bg-background-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 sm:h-auto lg:px-8">
                {/* Kitchen Illustration */}
                <div className="mb-16">
                    <img
                        src={canteenImg}
                        alt="canteen owner illustration"
                        className="w-full h-auto mx-auto block object-contain rounded-xl"
                    />
                </div>

                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-black">
                        Anda Pemilik Kantin?
                    </h2>
                    <p className="text-lg text-text max-w-2xl mx-auto">
                        Kelola kantin anda dengan mudah menggunakan dashboard
                        yang telah kami sediakan
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {services.map((service, idx) => (
                        <ServiceCard
                            key={idx}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                        />
                    ))}
                </div>

                <div className="text-center">
                    <Button className="bg-primary hover:bg-primary-hover text-background-primary text-lg px-8 py-6 rounded-full w-full sm:w-auto mx-auto flex justify-center items-center">
                        <span className="w-full text-center">
                            Olah Kantin Anda!
                        </span>
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default CanteenOwnerSection;
