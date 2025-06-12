export default function MenuSnackbar({ snackbar }) {
    if (!snackbar.show || snackbar.type === "warning") return null;
    return (
        <div
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] px-3 py-2 rounded-md shadow-lg text-sm font-semibold flex items-center gap-2 animate-fade-in max-w-[220px] w-[80vw] sm:max-w-xs sm:w-auto text-center bg-gray-900 text-white`}
            style={{ wordBreak: "break-word", whiteSpace: "pre-line" }}
        >
            <svg
                className="w-4 h-4 text-green-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                />
            </svg>
            <span className="block w-full">{snackbar.message}</span>
        </div>
    );
}
