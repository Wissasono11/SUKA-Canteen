"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // This would integrate with Laravel API endpoint
            // const response = await fetch('/api/contact', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            //   },
            //   body: JSON.stringify(formData)
            // })

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            alert("Pesan berhasil dikirim!");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            alert("Error mengirim pesan. Silakan coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-20 bg-background-secondary" id="contact">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-16">
                    <p className="text-mini-text font-medium tracking-wide uppercase text-sm">
                        HUBUNGI KAMI
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-bold text-black">
                        Kontak SUKA-Canteen
                    </h2>
                    <p className="text-xl text-text max-w-3xl mx-auto">
                        Ada pertanyaan atau saran? Jangan ragu untuk menghubungi
                        kami. Tim SUKA-Canteen siap membantu Anda.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold text-black mb-6">
                                Informasi Kontak
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-primary-pastel rounded-lg flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-black">
                                            Email
                                        </div>
                                        <div className="text-text">
                                            suka-canteen@email.com
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-primary-pastel rounded-lg flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-black">
                                            Telepon
                                        </div>
                                        <div className="text-text">
                                            +62 123 456 789
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-primary-pastel rounded-lg flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-black">
                                            Alamat
                                        </div>
                                        <div className="text-text">
                                            UIN Sunan Kalijaga, Yogyakarta
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Operating Hours */}
                        <div className="bg-background-primary rounded-2xl p-8">
                            <h4 className="text-lg font-semibold text-black mb-4">
                                Jam Operasional
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="font-medium text-black">
                                        Senin - Jumat
                                    </span>
                                    <span className="text-text">
                                        07:00 - 17:00
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-black">
                                        Sabtu
                                    </span>
                                    <span className="text-text">
                                        08:00 - 15:00
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-black">
                                        Minggu
                                    </span>
                                    <span className="text-text">Tutup</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-primary-pastel rounded-2xl p-8">
                            <h4 className="text-lg font-semibold text-black mb-4">
                                Statistik SUKA-Canteen
                            </h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-2xl font-bold text-primary">
                                        50+
                                    </div>
                                    <div className="text-text">
                                        Menu Tersedia
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-primary">
                                        1000+
                                    </div>
                                    <div className="text-text">
                                        Pengguna Aktif
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-primary">
                                        15
                                    </div>
                                    <div className="text-text">
                                        Kantin Partner
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-primary">
                                        4.8
                                    </div>
                                    <div className="text-text">
                                        Rating Rata-rata
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Kirim Pesan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-text mb-2"
                                        >
                                            Nama Lengkap
                                        </label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Masukkan nama Anda"
                                            className="rounded-lg bg-background-primary"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-text mb-2"
                                        >
                                            Email
                                        </label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="nama@email.com"
                                            className="rounded-lg bg-background-primary"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-medium text-text mb-2"
                                    >
                                        Subjek
                                    </label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        placeholder="Subjek pesan"
                                        className="rounded-lg bg-background-primary"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-text mb-2"
                                    >
                                        Pesan
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        required
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Tulis pesan Anda di sini..."
                                        className="w-full px-3 py-2 border border-background-primary rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-black"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full bg-primary hover:bg-primary-hover rounded-full text-background-primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        "Mengirim..."
                                    ) : (
                                        <>
                                            Kirim Pesan
                                            <Send className="w-4 h-4 ml-2 text-background-primary" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;
