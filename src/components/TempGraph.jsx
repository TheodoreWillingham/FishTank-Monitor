import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "../supabase";

export const TempGraph = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Compute startOfToday fresh each mount
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const fetchTodayData = async () => {
      try {
        const { data, error } = await supabase
          .from("tank_readings")
          .select("water_temp, recorded_at")
          .gte("recorded_at", startOfToday.toISOString())
          .order("recorded_at", { ascending: true });

        if (error) {
          console.error("Error fetching today's readings:", error);
        } else {
          setHistory(data || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchTodayData();

    // Realtime subscription
    const channel = supabase
      .channel(`tempGraph-${crypto.randomUUID()}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tank_readings" },
        (payload) => {
          console.log("New reading received:", payload.new); // Debug log
          const newReading = {
            water_temp: payload.new.water_temp,
            recorded_at: payload.new.recorded_at,
          };

          setHistory((prev) => {
            const updated = [...prev, newReading];
            console.log("Updated history length:", updated.length); // Debug log
            return updated;
          });
        }
      )
      .subscribe();

    console.log("SUBSCRIBED to realtime tank_readings");

    return () => {
      supabase.removeChannel(channel);
      console.log("UNSUBSCRIBED from realtime");
    };
  }, []); // run once on mount

  if (!history || history.length === 0)
    return <p className="text-foreground mt-4">Loading today's data...</p>;

  // Map for graph
  const graphData = history.map((item) => ({
    time: new Date(item.recorded_at).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temp: item.water_temp,
  }));

  // Calculate dynamic Y-axis domain
  // Normal range: [75, 85], but expand if data goes outside this range
  const temps = history.map((item) => item.water_temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  
  let yAxisDomain;
  if (minTemp >= 75 && maxTemp <= 85) {
    // All data is in normal range, use fixed domain for better visualization
    yAxisDomain = [75, 85];
  } else {
    // Data extends outside normal range, expand domain to show extremes
    // Add small padding (2 degrees) for better visibility
    const domainMin = minTemp < 75 ? Math.floor(minTemp - 2) : 75;
    const domainMax = maxTemp > 85 ? Math.ceil(maxTemp + 2) : 85;
    yAxisDomain = [domainMin, domainMax];
  }

  return (
    <div className="text-primary px-8 flex items-center justify-center">
      <div className="bg-card rounded-2xl p-6 shadow-xl flex flex-col items-center w-full max-w-4xl">
        <h2 className="text-xl font-semibold">Today's Water Temperature</h2>
        <h3 className="text-md mb-4 text-primary">
          Last Updated:{" "}
          {new Date(history[history.length - 1].recorded_at).toLocaleTimeString(
            "en-US",
            {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }
          )}
        </h3>
        <div className="w-full h-64">
          {/*
            Dynamically adjust XAxis interval for mobile/tablet/desktop.
            Fewer labels on small screens for readability.
          */}
          {(() => {
            // Keep X axis line always, but hide axis labels/ticks for iPhone 17 or smaller
            let interval;
            const graphLen = graphData.length;

            // Detect screen widths
            let isMobile = false;
            let isTablet = false;
            let isIphone = false;

            if (typeof window !== "undefined" && window.matchMedia) {
              isIphone = window.matchMedia("(max-width: 430px)").matches;
              isMobile = window.matchMedia("(max-width: 640px)").matches;
              isTablet = window.matchMedia(
                "(min-width: 641px) and (max-width: 1023px)"
              ).matches;
            }

            if (isMobile) {
              interval = Math.max(1, Math.floor(graphLen / 4));
            } else if (isTablet) {
              interval = Math.max(1, Math.floor(graphLen / 7));
            } else {
              interval = Math.max(1, Math.floor(graphLen / 10));
            }

            return (
              <ResponsiveContainer width="100%" height={256}>
                <LineChart
                  key={history.length}
                  data={graphData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    stroke="rgba(137,170,230,0.2)"
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    dataKey="time"
                    stroke="rgb(var(--primary))"
                    axisLine={{ stroke: "rgb(var(--primary))" }}
                    tickLine={false}
                    // Hide ticks and labels on iPhone 17, but keep axis/baseline
                    tick={isIphone ? false : { fontSize: 12, fill: "rgb(var(--foreground))" }}
                    interval={isIphone ? 0 : interval} // interval has no effect if tick={false}
                  />
                  <YAxis
                    stroke="rgb(var(--primary))"
                    tick={{ fontSize: 12, fill: "rgb(var(--foreground))" }}
                    tickFormatter={(value) => value.toFixed(2)}
                    domain={yAxisDomain}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgb(var(--card))",
                      borderRadius: "8px",
                      color: "rgb(var(--foreground))",
                    }}
                    labelStyle={{ color: "rgb(var(--primary))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="rgb(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            );
          })()}
        </div>
      </div>
    </div>
  );
};