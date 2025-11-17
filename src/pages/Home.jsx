import { IntroSection } from "../components/IntroSection"
import { NavBar } from "../components/NavBar"
import { Dashboard } from "../components/Dashboard"

export const Home = () => {
    return <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

        {/* NavBar */}
        <NavBar />
        {/* Intro */}
        <IntroSection />


        {/* FishTank DashBoard */}
        <Dashboard />

        

        {/* Fishtank Inhabitants */}

    </div>
}