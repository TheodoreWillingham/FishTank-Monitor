import { IntroSection } from "../components/IntroSection"
import { NavBar } from "../components/NavBar"
import { Architecture } from "../components/Architecture"
import { DashBoard } from "../components/Dashboard"


export const Home = () => {
    return <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

        {/* NavBar */}
        <NavBar />
        {/* Intro */}
        <IntroSection />

        {/* FishTank DashBoard */}
        <DashBoard />

        {/* Architecture */}
        <Architecture />

        {/* Fishtank Inhabitants */}

    </div>
}