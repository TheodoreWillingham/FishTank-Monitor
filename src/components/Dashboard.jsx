import { StatsCard } from "./StatsCard";
import { TempGraph } from "./TempGraph";
export const DashBoard = () => {
  return (
    <section id="monitor">
      <StatsCard />
      <TempGraph />
    </section>
  );
};
