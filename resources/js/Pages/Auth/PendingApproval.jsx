import { Head, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";

export default function PendingApproval({ auth }) {
    return (
        <>
            <Head title="Menunggu Persetujuan" />

            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md">
                    <CardContent className="p-8 text-center">
                        <div className="flex justify-center mb-8">
                            <img
                                src="/placeholder.svg?height=100&width=100&text=⏳"
                                alt="Pending Approval"
                                className="w-24 h-24"
                            />
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Menunggu Persetujuan
                        </h2>

                        <p className="text-gray-600 mb-8">
                            Akun pemilik kantin Anda sedang menunggu persetujuan
                            dari admin. Kami akan memberi tahu Anda melalui
                            email saat akun Anda telah disetujui.
                        </p>

                        <div className="space-y-4">
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="w-full"
                            >
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-3">
                                    Logout
                                </Button>
                            </Link>

                            <Link href={route("homepage")}>
                                <Button
                                    variant="outline"
                                    className="w-full rounded-full py-3"
                                >
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
