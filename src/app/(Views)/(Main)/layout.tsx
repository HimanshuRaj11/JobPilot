import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar"

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="">
            <div className="">
                {children}
            </div>
            <Footer />
        </div>
    );
}