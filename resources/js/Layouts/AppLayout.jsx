import Footer from '@/Components/Footer';
import HeaderLinks from '@/Components/HeaderLinks';
import NavBar from '@/Components/NavBar';
import React from 'react';

export default function AppLayout({ children }) {
    return (
        <div className="">
            <HeaderLinks />

            <NavBar />

            {children}

            <Footer />
        </div>
    );
}