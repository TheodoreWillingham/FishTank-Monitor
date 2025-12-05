import React from "react";

export const Architecture = () => {
  return (
    <section
      id="architecture"
      className="px-6 md:px-12 lg:px-20 xl:px-32 py-12 flex flex-col items-center"
    >
      <h1 className="text-3xl font-bold text-primary mb-6">
        System Architecture & My Skills
      </h1>
      <p className="text-foreground max-w-3xl text-center mb-10">
        I built this aquarium monitoring system from the ground up, combining
        custom sensor hardware, cloud data storage, and a real-time web
        dashboard. Since my family is constantly on the move, I created a way to
        keep watch over my reef tank from anywhere. The system continuously
        tracks key parameters and sends instant text or email alerts whenever
        something drifts out of range, giving me peace of mind even when
        I&apos;m miles away.
      </p>
      <p className="text-foreground text-2xl max-w-3xl text-center mb-10">
        My Skills
      </p>

      <ul className="list-disc list-inside text-left max-w-xl mb-8 text-foreground space-y-2">
        <li>Embedded programming (Arduino/C++)</li>
        <li>Sensor interfacing (DS18B20, XKC-Y25)</li>
        <li>WiFi/IoT communication (ESP32, HTTP POST)</li>
        <li>Cloud database design (Supabase/PostgreSQL/CronJobs)</li>
        <li>Real-time web development (React, Websockets, Recharts)</li>
        <li>UI/UX design with modern frameworks</li>
      </ul>
      <div className="bg-card rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-8 w-full max-w-5xl items-center">
        <div className="flex-1 flex flex-col items-center gap-2">
          <h2 className="text-xl font-semibold mb-4">How Monitoring Works</h2>
          <ol className="list-decimal list-inside text-left max-w-md text-foreground mb-2 space-y-3">
            <li>
              <span className="font-medium text-primary">The Sensors</span>{" "}
              constantly measure water temperature and water level.
            </li>
            <li>
              <span className="font-medium text-primary">
                ESP32 Microcontroller
              </span>{" "}
              reads water temperature, water level, and last water-change date,
              then securely uploads the data to a cloud database.
            </li>
            <li>
              <span className="font-medium text-primary">Supabase</span> stores
              readings and pushes updates in real time to this dashboard.
            </li>
            <li>
              <span className="font-medium text-primary">React Dashboard</span>{" "}
              visualizes live and historical data, updating automatically.
            </li>
          </ol>

          <div className="mt-8 max-w-2xl w-full flex flex-col items-center">
            <div className="flex gap-4">
              <a
                href="https://github.com/TheodoreWillingham/FishTank-ESP32-Monitor"
                target="_blank"
                rel="noopener noreferrer"
                className="ocean-button"
              >
                Check ESP32 GitHub
              </a>
              <a
                href="https://github.com/TheodoreWillingham/FishTank-Monitor"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-primary/10 rounded-full font-semibold shadow hover:bg-primary/30 transition border border-white"
              >
                Check Website GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col md:items-center items-center gap-6">
          <h2 className="text-xl font-semibold mb-2">Sensor Gallery</h2>
          <div className="flex flex-row flex-wrap gap-4 justify-center">
            <figure className="w-32 md:w-36 flex flex-col items-center">
              <img
                src="src/assets/download.jpg"
                alt="Water Temperature Sensor (DS18B20)"
                className="rounded-lg shadow border border-border w-full object-cover"
              />
              <figcaption className="text-xs text-center mt-1 text-foreground/70">
                DS18B20 Temp Sensor
              </figcaption>
            </figure>
            <figure className="w-32 md:w-36 flex flex-col items-center">
              <img
                src="src/assets/download.jpg"
                alt="pH Sensor"
                className="rounded-lg shadow border border-border w-full object-cover"
              />
              <figcaption className="text-xs text-center mt-1 text-foreground/70">
                XKC-Y25 Capacitve Water Level Sensor
              </figcaption>
            </figure>
            <figure className="w-32 md:w-36 flex flex-col items-center">
              <img
                src="src/assets/download.jpg"
                alt="ESP32 Microcontroller"
                className="rounded-lg shadow border border-border w-full object-cover"
              />
              <figcaption className="text-xs text-center mt-1 text-foreground/70">
                ESP32 Microcontroller
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
