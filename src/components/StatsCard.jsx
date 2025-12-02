import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export const StatsCard = () => {
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

    //added this to have unique channel name
    
    const channel = supabase
      .channel(`statscard-${crypto.randomUUID()}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tank_readings" },
        (payload) => {
          setTankReading(payload.new);
        }
      )
      .subscribe();

      console.log("StatsCard subscribed:", channel);

    return () => {
      supabase.removeChannel(channel);
      console.log("StatsCard unsubscribed:", channel);      
    };
  }, []);

  const waterChange = 11; //days since waterChange

  return (
    <div className="text-primary px-8 py-6 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* Water Level */}
        <div className="bg-card rounded-2xl p-6 shadow-xl flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Last Water Change</h2>
          <p className="text-4xl font-bold">{waterChange} Days Ago</p>
        </div>

        {/* Water Temperature */}
        <div className="bg-card rounded-2xl p-6 shadow-xl flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Water Temperature</h2>
          <p className="text-4xl font-bold">
            {tankReading != null ? tankReading.water_temp : "XX.XX"} °F
          </p>
        </div>

        {/* Time of Day */}
        <div className="bg-card rounded-2xl p-6 shadow-xl flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Water Level</h2>
          <p className="text-3xl font-bold">
            {tankReading != null
              ? new Date(tankReading.recorded_at).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              : "wtf"}
          </p>
        </div>
      </div>
    </div>
  );
};
