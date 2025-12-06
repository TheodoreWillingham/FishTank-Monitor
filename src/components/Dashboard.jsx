import { StatsCard } from "./StatsCard";
import { TempGraph } from "./TempGraph";
export const DashBoard = () => {
  return (
    <section id="dashboard" className="pt-4">
      <StatsCard />
      <TempGraph />
    </section>
  );
};
