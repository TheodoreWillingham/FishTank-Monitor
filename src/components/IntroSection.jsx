export const IntroSection = () => {
  return (
    <section id="intro" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h3 className="text-primary text-4xl font-bold mb-12 animate-fade-in">
          Fish Tank Monitor
        </h3>
        <p className="font-semibold text-foreground">
          {" "}
          Welcome to Theo's{" "}
          <span className="text-primary"> Fish Tank Monitor </span>. This is a
          personal IoT project I have been working on to help monitor my fish
          tank while I'm on vacation.
        </p>
      </div>
    </section>
  );
};
