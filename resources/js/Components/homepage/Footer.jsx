import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-background-primary py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 36 36"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="18" cy="18" r="18" fill="#5B721C" />
                                <path
                                    d="M9.8975 8.52332C9.49395 8.60412 9.29217 8.67086 8.97961 8.84299C8.45736 9.12754 8.08546 9.51747 7.8639 10.0163C7.67794 10.4414 7.67399 10.5081 7.68586 13.1428L7.69773 15.6193L7.82038 15.9004C7.97072 16.2446 8.07754 16.4027 8.35054 16.6662C8.61562 16.9261 8.99148 17.1615 9.33569 17.2915C9.85794 17.4847 10.0676 17.4987 12.6393 17.4987C14.6017 17.4987 15.0171 17.5057 15.2149 17.5514C16.1091 17.7552 16.7817 18.3769 17.0033 19.2095C17.1022 19.5924 17.1022 20.6814 17.0033 21.1345C16.845 21.8406 16.5878 22.4624 16.2436 22.9683C15.2822 24.3699 13.5335 25.487 11.8955 25.7364C11.4603 25.8031 11.2862 25.8031 10.9064 25.7364C10.1428 25.6064 9.6166 25.1216 9.4979 24.4331C9.43064 24.0397 9.54142 23.583 9.78672 23.2317C9.90937 23.0631 10.3327 22.7153 10.5187 22.631C10.5978 22.5959 10.7877 22.5327 10.938 22.4905C11.1873 22.4238 11.2981 22.4167 12.3505 22.4167H13.4939V20.994V19.5713L12.7343 19.5678C11.1833 19.5643 10.8747 19.5748 10.487 19.6416C8.41384 19.9964 6.84314 21.405 6.42771 23.2809C6.3288 23.713 6.3288 24.6966 6.42376 25.1568C6.6018 26.0245 6.97766 26.713 7.58695 27.2996C8.74222 28.4097 10.5859 28.8277 12.663 28.4554C14.4474 28.1357 16.1131 27.3172 17.5334 26.0701C19.4721 24.3629 20.4453 22.2657 20.3662 19.9577C20.3306 18.9074 20.1407 18.2013 19.6659 17.3406C19.3336 16.747 19.112 16.473 18.5621 15.9882C17.7866 15.3067 16.9756 14.9203 15.8955 14.72C15.5196 14.6498 15.3455 14.6427 13.4346 14.6287C11.1398 14.6111 11.2664 14.6252 11.0251 14.3617L10.9024 14.2247L10.8906 13.1146C10.8787 11.9203 10.8906 11.8184 11.0686 11.6287C11.2743 11.4144 11.1319 11.4214 14.6887 11.4214H17.9449L18.2456 11.0421C18.8469 10.2798 20.113 8.69546 20.208 8.58304L20.3029 8.47063L15.2268 8.47414C11.0567 8.47414 10.1072 8.48468 9.8975 8.52332Z"
                                    fill="white"
                                />
                                <path
                                    d="M25.4818 9.35588C23.7648 11.3793 22.4275 12.946 21.3316 14.2247C20.6946 14.973 20.1644 15.6018 20.1525 15.6228C20.1446 15.6474 20.382 16.0268 20.6867 16.4659C20.9873 16.9086 21.8657 18.1872 22.6332 19.3078C23.4008 20.4285 24.1841 21.5701 24.3701 21.8441L24.7103 22.3465H26.4789H28.2513L28.0377 22.0338C27.919 21.8652 26.8864 20.3933 25.739 18.7669C24.374 16.8313 23.6698 15.7985 23.6896 15.7704C23.7054 15.7458 24.738 14.5198 25.9764 13.0514C28.6312 9.90389 29.7706 8.54441 29.7864 8.50225C29.7944 8.48469 29.0189 8.47064 28.0179 8.47064H26.2375L25.4818 9.35588Z"
                                    fill="white"
                                />
                            </svg>
                            <span className="text-xl font-bold text-primary">
                                SUKA-
                                <span className="text-black">Canteen</span>
                            </span>
                        </div>
                        <p className="text-text text-sm leading-relaxed">
                            Lorem ipsum consectetur aliquam volutpat elit
                            pulvinar eu.
                        </p>
                        <div className="flex space-x-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-hover"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5 text-background-primary" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-background-secondary rounded-full flex items-center justify-center hover:bg-gray-200"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5 text-text" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-background-secondary rounded-full flex items-center justify-center hover:bg-gray-200"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5 text-text" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-background-secondary rounded-full flex items-center justify-center hover:bg-gray-200"
                                aria-label="Youtube"
                            >
                                <Youtube className="w-5 h-5 text-text" />
                            </a>
                        </div>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="font-bold text-lg text-black mb-4">
                            Useful links
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="#"
                                    className="text-text hover:text-primary transition-colors"
                                >
                                    About us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-text hover:text-primary transition-colors"
                                >
                                    Events
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-text hover:text-primary transition-colors"
                                >
                                    Blogs
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-text hover:text-primary transition-colors"
                                >
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Main Menu */}
                    <div>
                        <h3 className="font-bold text-lg text-black mb-4">
                            Main Menu
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="#"
                                    className="text-text hover:text-primary transition-colors"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-text hover:text-primary transition-colors"
                                >
                                    Menu
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-text hover:text-primary transition-colors"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-text hover:text-primary transition-colors"
                                >
                                    Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h3 className="font-bold text-lg text-black mb-4">
                            Contact Us
                        </h3>
                        <div className="space-y-2 text-sm">
                            <p className="text-text">suka-canteen@email.com</p>
                            <p className="text-text">+62 123 456 789</p>
                            <p className="text-text">Social media</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-background-bg-primary pt-8 mt-8">
                    <p className="text-center text-text text-sm">
                        Copyright © 2025 SUKA-Canteen | All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
