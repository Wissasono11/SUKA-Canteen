import { Button } from "@/Components/ui/button";
import { SlidersHorizontal, Search } from "lucide-react";

export default function MenuSearchFilter({ search, setSearch, onShowFilter }) {
    return (
        <div className="flex items-center gap-4 mb-8 max-w-2xl">
            <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search className="w-5 h-5" />
                </span>
                <input
                    type="text"
                    placeholder="Cari Menu dan Kantin Favoritmu..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-full border px-12 py-4 text-base focus:outline-primary bg-white shadow-sm text-ellipsis placeholder:text-ellipsis placeholder:whitespace-nowrap placeholder:text-gray-400 placeholder:text-base"
                    style={{ paddingLeft: 44 }}
                />
            </div>
            <Button
                className="bg-primary hover:bg-primary-hover text-white rounded-full flex items-center justify-center p-0"
                style={{ minWidth: 48, minHeight: 48, height: 48, width: 48 }}
                type="button"
                onClick={onShowFilter}
            >
                <SlidersHorizontal className="w-6 h-6" />
            </Button>
        </div>
    );
}
