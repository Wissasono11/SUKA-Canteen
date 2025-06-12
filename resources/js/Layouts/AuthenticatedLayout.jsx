import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link
                                    href="/"
                                    className="flex items-center space-x-3"
                                >
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                    <span className="text-xl font-bold text-black tracking-tight select-none">
                                        SUKA-Canteen
                                    </span>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                {/* Dashboard link hanya untuk canteen_owner */}
                                {/* {user.role === "canteen_owner" && (
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        Dashboard
                                    </NavLink>
                                )} */}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3 flex items-center space-x-2">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-full">
                                            {user.photo ? (
                                                <img
                                                    src={user.photo}
                                                    alt={user.name}
                                                    className="w-9 h-9 rounded-full object-cover border border-[#5B721C]"
                                                />
                                            ) : (
                                                <div className="w-9 h-9 rounded-full bg-[#5B721C] flex items-center justify-center text-white font-bold text-lg border border-[#5B721C]">
                                                    {user.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                        .substring(0, 2)
                                                        .toUpperCase()}
                                                </div>
                                            )}
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* MOBILE: Avatar as menu trigger */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-full">
                                        {user.photo ? (
                                            <img
                                                src={user.photo}
                                                alt={user.name}
                                                className="w-9 h-9 rounded-full object-cover border border-primary"
                                            />
                                        ) : (
                                            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg border border-primary">
                                                {user.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")
                                                    .substring(0, 2)
                                                    .toUpperCase()}
                                            </div>
                                        )}
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="right">
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
