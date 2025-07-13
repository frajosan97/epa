import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import HeroSlider from '@/Components/HeroSlider';
import WelcomeSection from '@/Components/WelcomeSection';
import CallToActionBanner from '@/Components/CallToActionBanner';
import UpcomingEvents from '@/Components/UpcomingEvents';
import Gallery from '@/Components/Gallery';
import BlogSection from '@/Components/BlogSection';

export default function Home() {
    return (
        <AppLayout>
            <Head title='Home' />

            <HeroSlider />

            <WelcomeSection />

            <CallToActionBanner />

            <UpcomingEvents />

            <Gallery />

            <BlogSection />
        </AppLayout>
    );
}