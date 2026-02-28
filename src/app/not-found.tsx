import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#F8F9FE] flex flex-col items-center justify-center font-sans">
            <div className="text-center px-4">
                <h1 className="text-[120px] font-bold text-[#7131F5] leading-none tracking-tight">404</h1>
                <div className="mb-8 mt-4">
                    <h2 className="text-3xl font-bold text-[#0B1536] mb-4">Page not found</h2>
                    <p className="text-[#6B7280] text-lg max-w-md mx-auto">
                        Sorry, we couldn&apos;t find the page you&apos;re looking for. Perhaps you&apos;ve mistyped the URL or the page has been moved.
                    </p>
                </div>

                <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center bg-[#7131F5] hover:bg-[#6027DB] text-white font-bold rounded-xl px-8 py-4 transition-all shadow-[0_10px_20px_-10px_rgba(113,49,245,0.5)]"
                >
                    Return to Dashboard
                </Link>
            </div>

            {/* Decorative elements  */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#7131F5]/5 blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#0BCE94]/5 blur-[100px]"></div>
            </div>
        </div>
    );
}
