import { useState, useEffect } from "react";
import { supabase } from "../supabase";


export const Dashboard = () => {
  const [tankReading, setTankReading] = useState(null);

  // tries to get reading from supabase
  const getReading = async () => {
    const { data, error } = await supabase
      .from("tank_readings") //from fish tank
      .select("*") //all
      .order("recorded_at", { ascending: false })
      .limit(1)
      .single(); //make sure we only get a single object

    if (error) {
      console.error("Error fetching latest reading:", error);
    } else {
      setTankReading(data);
    }
  };


  useEffect(() => {
    getReading();

    // Optional: Realtime subscription for live updates
    const channel = supabase
      .channel("realtime:tank_readings")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tank_readings" },
        (payload) => {
          setTankReading(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const waterChange = 11; //days since waterChange
  const timeOfDay = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York", // GMT-5 for part of the year
    hour: "numeric",
    minute: "numeric",
  }).format(new Date());

  return (
    <section id="monitor">
      <div className="text-primary p-8 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {/* Water Level */}
          <div className="bg-card rounded-2xl p-6 shadow-xl flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Last Water Change</h2>
            <p className="text-4xl font-bold">{waterChange} Days Ago</p>
          </div>

          {/* Water Temperature */}
          <div className="bg-card rounded-2xl p-6 shadow-xl flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Water Temperature</h2>
            <p className="text-4xl font-bold">{tankReading != null ? tankReading.water_temp : "?"} °F</p>
          </div>

          {/* Time of Day */}
          <div className="bg-card rounded-2xl p-6 shadow-xl flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Fish Tank Time</h2>
            <p className="text-3xl font-bold">{timeOfDay}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
