import React from "react";
import Header from "./header";
import Navbar from "./navbar";
import Footer from "./footer";

export default function PrivateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Header />
            <Navbar />
                <main>
                    {children}
                </main>
            <Footer />
        </div>
    )
}