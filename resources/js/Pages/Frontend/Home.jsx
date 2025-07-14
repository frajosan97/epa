import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import HeroSlider from '@/Components/HeroSlider';
import WelcomeSection from '@/Components/WelcomeSection';
import UpcomingEvents from '@/Components/UpcomingEvents';
import Gallery from '@/Components/Gallery';
import BlogSection from '@/Components/BlogSection';
import HeroBanner from '@/Components/HeroBanner';

export default function Home() {
    return (
        <AppLayout>
            <Head title='Home' />

            <HeroSlider />

            <WelcomeSection />

            <HeroBanner data={{
                title: "Join The Movement",
                subtitle: "Embrace the call for change and stand tall for the country we envision together",
                linkText: "Join Movement",
                linkUrl: route("register"),
            }} />

            <UpcomingEvents />

            <Gallery />

            <BlogSection />
        </AppLayout>
    );
}