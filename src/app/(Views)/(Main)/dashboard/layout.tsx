import Sidebar from "@/components/Sidebar"

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="px-5 md:20 lg:px-30 flex w-full ">
            <Sidebar />
            <div className="p-5  w-full">
                {children}
            </div>
        </div>
    );
}