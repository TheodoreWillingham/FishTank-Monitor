export const Dashboard = () => {
  const waterLevel = 10;
  const waterTemp = 79;
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
            <p className="text-4xl font-bold">{waterLevel} Days Ago</p>
          </div>

          {/* Water Temperature */}
          <div className="bg-card rounded-2xl p-6 shadow-xl flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Water Temperature</h2>
            <p className="text-4xl font-bold">{waterTemp} °F</p>
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
