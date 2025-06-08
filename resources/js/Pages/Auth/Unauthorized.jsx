import { Head, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";

export default function Unauthorized({ auth }) {
    return (
        <>
            <Head title="Akses Ditolak" />

            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md">
                    <CardContent className="p-8 text-center">
                        <div className="flex justify-center mb-8">
                            <img
                                src="/placeholder.svg?height=100&width=100&text=🔒"
                                alt="Access Denied"
                                className="w-24 h-24"
                            />
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Akses Ditolak
                        </h2>

                        <p className="text-gray-600 mb-8">
                            Maaf, Anda tidak memiliki izin untuk mengakses
                            halaman ini.
                        </p>

                        <div className="space-y-4">
                            <Link href={route("homepage")}>
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-3">
                                    Kembali ke Beranda
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
