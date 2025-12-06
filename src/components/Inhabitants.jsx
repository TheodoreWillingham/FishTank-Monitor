import React, { useState, useRef, useEffect } from 'react';

// Example Inhabitants Data Array
const inhabitants = [
  {
    name: "Goby",
    species: "Yellow Watchman Goby",
    introduced: "2022-09-21",
    passed: "2024-12-25",
    description: "Our beloved grumpy sand sifter, always popping out of his cave to check on tank happenings. My first baby.",
    image: "/inhabitants/Goby.jpg",
    category: "Fish"
  },
  {
    name: "Pistol",
    species: "Tiger Pistol Shrimp",
    introduced: "2022-9-25",
    passed: "2023-08-03",
    description: "A real gunslinger, was Goby's first parter and dug the holes for him to hide in",
    image: "/inhabitants/PistolShrimp.jpg",
    category: "Cleaner Crew"
  },
  {
    name: "Mammoth",
    species: "Mexican Turbo Snail",
    introduced: "2023-11-10",
    passed: "Living",
    description: "The biggest resident of the tank, quietly cleaning up after everyone else.",
    image: "/inhabitants/Mammoth.jpg",
    category: "Cleaner Crew"
  },
  {
    name: "Snail Gang",
    species: "Trochus snails & Nassarius snails",
    introduced: "2022-09-9",
    passed: "Living",
    description: "A hardworking team of snails, constantly grazing away algae and debris.",
    image: "/inhabitants/Snail.jpg",
    category: "Cleaner Crew"
  },
  {
    name: "BumbleBee",
    species: "BumbleBee Snail",
    introduced: "2023-09-9",
    passed: "Living",
    description: "Added to the tank to exterminate the last vermetid snails.",
    image: "/inhabitants/bumble.jpg",
    category: "Cleaner Crew"
  },
  {
    name: "Peppermint Shrimp",
    species: "Peppermint Shrimp",
    introduced: "2022-12-20",
    passed: "2023-02-20",
    description: "Two beautiful peppermint shrimp that wiped out every Aiptasia in the tank, only to mysteriously vanish afterward.",
    image: "/inhabitants/Pepper.jpg",
    category: "Cleaner Crew"
  },
  {
    name: "Leo",
    species: "Cleaner Shrimp",
    introduced: "2022-11-14",
    passed: "2024-12-20",
    description: "Always in everyone's business—stealing food or manicuring my fingers. Constantly cleaning all the tank inhabitants",
    image: "/inhabitants/Leo.png",
    category: "Cleaner Crew"
  },
  {
    name: "Leo Jr",
    species: "Cleaner Shrimp",
    introduced: "2024-12-24",
    passed: "Living",
    description: "Not as friendly as Leo, but he keeps to his corner and gives the occasional manicure once in a blue moon",
    image: "/inhabitants/LeoJR.jpg",
    category: "Cleaner Crew"
  },
  {
    name: "Green Anemone",
    species: "Green Bubble Tip Anemone",
    introduced: "2024-07-3",
    passed: "2025-01-04",
    description: "My first BTA—never paired with the clowns, and one night it wandered into the pump and got shredded.",
    image: "/inhabitants/GBTA.jpeg",
    category: "Anemone & Coral"
  },
  {
    name: "Rose Anemone #1",
    species: "Rose Bubble Tip Anemone",
    introduced: "2024-11-4",
    passed: "Living",
    description: "My second BTA—happily paired with the clowns, went wandering for a bit, and then surprised me by splitting and having a baby.",
    image: "/inhabitants/BTA1.jpg",
    category: "Anemone & Coral"
  },
  {
    name: "Rose Anemone #2",
    species: "Rose Bubble Tip Anemone",
    introduced: "2025-07-10",
    passed: "Living",
    description: "My third BTA is happily paired with the clowns, and together the two anemones give the clownfish plenty of places to hide.",
    image: "/inhabitants/BTA2.jpg",
    category: "Anemone & Coral"
  },
  {
    name: "Hermit Crab Gang",
    species: "Hermit Crabs",
    introduced: "2022-09-9",
    passed: "Living",
    description: "2 hermit crabs, constantly swapping shells and patrolling the sandbed as they scavenge leftover food.",
    image: "/inhabitants/HermitCrab.png",
    category: "Cleaner Crew"
  },
  //List of Corals
  {
    name: "Zoanthids",
    species: "Zoanthids",
    introduced: "2022-09-9",
    passed: "Living",
    description: "Started with a vibrant mix of zoas in yellow, green, blue, and red—now only the green one remains.",
    image: "/inhabitants/Zoa.jpg",
    category: "Anemone & Coral"
  },
  {
    name: "Torch",
    species: "Torch",
    introduced: "2022-11-6",
    passed: "Living",
    description: "Once a beautiful torch, now gone—lost too soon, likely because the tank hadn't matured yet.",
    image: "/inhabitants/Torch.png",
    category: "Anemone & Coral"
  },
  {
    name: "Candy Cane",
    species: "Kryptonite Candy Cane",
    introduced: "2022-09-30",
    passed: "2025-9-30",
    description: "Bought as a single head from a local reef shop and then grown into a beautiful six-head colony.",
    image: "/inhabitants/CandyCane.jpg",
    category: "Anemone & Coral"
  },
  {
    name: "GSP",
    species: "Green Star Polyp",
    introduced: "2022-11-28",
    passed: "Living",
    description: "It’s become a beautiful feature of the back wall, spreading across it with a grass-like look.",
    image: "/inhabitants/GSP.jpg",
    category: "Anemone & Coral"
  },
  {
    name: "Flower Pot",
    species: "Goniopora",
    introduced: "2023-11-28",
    passed: "Living",
    description: "A stunning pink flowerpot coral, but it’s been struggling ever since the Great Accident.",
    image: "/inhabitants/FlowerPot.png",
    category: "Anemone & Coral"
  },
  {
    name: "Shrooms",
    species: "Mushroom",
    introduced: "2023-11-28",
    passed: "Living",
    description: "A stunning coral nestled in the corner, happily surviving in low light and thriving on Reef-Roids.",
    image: "/inhabitants/Shroom.jpg",
    category: "Anemone & Coral"
  },
  {
    name: "Acan",
    species: "Acan Coral",
    introduced: "2023-11-28",
    passed: "Living",
    description: "A stunning coral nestled in the rocks, has been struggling since the Great Accident.",
    image: "/inhabitants/Acan.png",
    category: "Anemone & Coral"
  },
  {
    name: "Ricordia",
    species: "Ricordia Coral",
    introduced: "2023-11-28",
    passed: "Living",
    description: "A slow-growing coral, yet it thrives beautifully alongside the zoanthids.",
    image: "/inhabitants/Ricordia.jpg",
    category: "Anemone & Coral"
  },
  {
    name: "Frammer",
    species: "Frogspawn / Hammer",
    introduced: "2024-10-28",
    passed: "Living",
    description: "A stunning coral, cross breed between frogspawn and hammer, has been struggling since the Great Accident.",
    image: "inhabitants/Frammer.png",
    category: "Anemone & Coral"
  },
  {
    name: "Hector Pair",
    species: "Hector's Goby",
    introduced: "2024-06-19",
    passed: "2024-09-19",
    description: "Got a beautiful pair to graze algae, but one kept bullying the other, so they went back to the LFS.",
    image: "/inhabitants/Hector.jpg",
    category: "Fish"
  },
  {
    name: "Emo & Nemo",
    species: "Ocellaris ClownFish",
    introduced: "2024-11-10",
    passed: "2024-12-10",
    description: "First pair of clownfish(Orange & Black), sadly passed away prematurely due to red velvet disease.",
    image: "/inhabitants/EmoNemo.jpg",
    category: "Fish"
  },
  {
    name: "Onyakopon",
    species: "Black Ocellaris ClownFish",
    introduced: "2023-11-19",
    passed: "Living",
    description: "Mean and aggressive—won’t let me clean the tank in peace and steals every scrap of food like it owns the place.",
    image: "/inhabitants/BlackClown.jpg",
    category: "Fish"
  },
  {
    name: "Power",
    species: "Orange Ocellaris ClownFish",
    introduced: "2023-11-19",
    passed: "Living",
    description: "Mean and aggressive, a quick little sucker constantly on guard and fiercely protecting his BTA.",
    image: "/inhabitants/OrangeClown.jpg",
    category: "Fish"
  },
  {
    name: "JW",
    species: "Tail Spot Blenny",
    introduced: "2024-06-10",
    passed: "2025-10-10",
    description: "Once bullied by the clownfish, it made a comeback to rule the tank. Now part of the Anemone",
    image: "/inhabitants/JW.png",
    category: "Fish"
  },
  {
    name: "Sherrif",
    species: "Sixline Wrasse",
    introduced: "2022-11-10",
    passed: "Living",
    description: "Longest-living fish—survived all the tank’s ups and downs, constantly patrolling.",
    image: "/inhabitants/Sherrif.jpg",
    category: "Fish"
  },
  {
    name: "Timmy",
    species: "Red Scooter Blenny",
    introduced: "2024-11-10",
    passed: "Living",
    description: "Timmy the Tiny Dragon with dragon-like scales, tirelessly scuttles across the tank hunting for insects.",
    image: "/inhabitants/Timmy.jpg",
    category: "Fish"
  },
  
  
  
];

const CATEGORIES = [
  { key: "Fish", label: "Fish" },
  { key: "Cleaner Crew", label: "Cleaner Crew" },
  { key: "Anemone & Coral", label: "Anemone & Coral" }
];

const formatDate = (dateStr) => 
  new Date(dateStr).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

const CARD_MIN_HEIGHT = 520; // tweak as needed for your content

// Custom hook to determine if screen is less than 420px wide
function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(
    typeof window !== 'undefined' && window.innerWidth < 420
  );

  useEffect(() => {
    function handleResize() {
      setIsSmall(window.innerWidth < 420);
    }
    window.addEventListener('resize', handleResize);
    // Set on initial mount for SSR
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isSmall;
}

const InhabitantCardCarousel = ({
  inhabitants,
  current,
  setCurrent,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  goLeft,
  goRight,
  categoryName,
}) => {
  const isSmallScreen = useIsSmallScreen();
  const inhabitant = inhabitants[current];
  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-2xl font-bold text-accent mt-8 mb-4">{categoryName}</h3>
      <div
        className="flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ userSelect: "none" }}
      >
        {/* Left Arrow */}
        {!isSmallScreen && (
          <button
            aria-label={`Previous ${categoryName}`}
            onClick={goLeft}
            className="rounded-full bg-primary/70 hover:bg-primary transition-colors text-foreground p-2 mx-2 shadow-xl"
            tabIndex={0}
            type="button"
          >
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        {/* Card */}
        <div
          className="min-w-[220px] max-w-[330px] w-auto bg-background rounded-xl shadow-lg border border-border transition-transform duration-300 overflow-hidden"
          style={{
            minHeight: `${CARD_MIN_HEIGHT}px`,
            animation: `fade-in 0.7s both`
          }}
        >
          <img
            src={inhabitant.image}
            alt={inhabitant.name}
            className="w-full h-52 object-cover rounded-t-xl"
            loading="lazy"
          />
          <div className="p-5 flex flex-col gap-2">
            <h4 className="text-xl font-semibold text-secondary">{inhabitant.name}</h4>
            <p className="text-sm font-medium text-primary">{inhabitant.species}</p>
            <div className="text-xs text-foreground/80 mb-2">
              <span>
                <span className="font-bold">🪸 {formatDate(inhabitant.introduced)}</span> &ndash;{" "}
                <span className="font-bold">🌊 {inhabitant.passed === "Living" ? "Present" : formatDate(inhabitant.passed)}</span>
              </span>
            </div>
            <p className="text-foreground/90">{inhabitant.description}</p>
          </div>
        </div>
        {/* Right Arrow */}
        {!isSmallScreen && (
          <button
            aria-label={`Next ${categoryName}`}
            onClick={goRight}
            className="rounded-full bg-primary/70 hover:bg-primary transition-colors text-foreground p-2 mx-2 shadow-xl"
            tabIndex={0}
            type="button"
          >
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
      {/* Dots indicator */}
      <div className="flex justify-center mt-4 gap-2">
        {inhabitants.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all border-2 border-primary ${idx === current ? "bg-primary" : "bg-card"}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to ${categoryName} #${idx+1}`}
            tabIndex={0}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

export const Inhabitants = () => {
  // Map each category key to its array of inhabitants (filtered)
  const categoryInhabitants = {};
  CATEGORIES.forEach(cat => {
    categoryInhabitants[cat.key] = inhabitants.filter(i => i.category === cat.key);
  });

  // One state for each category's carousel index
  const [currents, setCurrents] = useState(
    CATEGORIES.reduce((obj, cat) => ({...obj, [cat.key]: 0}), {})
  );

  // Touch refs for each category
  const touchRefs = CATEGORIES.reduce((refs, cat) => {
    refs[cat.key] = { start: useRef(null), end: useRef(null) };
    return refs;
  }, {});

  // General swipe/arrow/card helpers by category
  const goLeft = (cat) => {
    setCurrents(prev => ({
      ...prev,
      [cat]: (prev[cat] - 1 + categoryInhabitants[cat].length) % categoryInhabitants[cat].length
    }));
  };

  const goRight = (cat) => {
    setCurrents(prev => ({
      ...prev,
      [cat]: (prev[cat] + 1) % categoryInhabitants[cat].length
    }));
  };

  // Touch handlers, per-category
  const makeHandleTouchStart = cat => (e) => {
    if (e.touches && e.touches.length === 1) {
      touchRefs[cat].start.current = e.touches[0].clientX;
    }
  };

  const makeHandleTouchMove = cat => (e) => {
    if (e.touches && e.touches.length === 1) {
      touchRefs[cat].end.current = e.touches[0].clientX;
    }
  };

  const makeHandleTouchEnd = cat => () => {
    const startX = touchRefs[cat].start.current;
    const endX = touchRefs[cat].end.current;
    if (startX !== null && endX !== null) {
      const diff = endX - startX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goLeft(cat);
        } else {
          goRight(cat);
        }
      }
    }
    touchRefs[cat].start.current = null;
    touchRefs[cat].end.current = null;
  };

  // Keyboard navigation (arrows) - which card is focused doesn't matter, but enables arrow keys for all.
  const handleKeyDown = (cat) => (e) => {
    if (e.key === "ArrowLeft") {
      goLeft(cat);
    }
    if (e.key === "ArrowRight") {
      goRight(cat);
    }
  };

  return (
    <section
      id="inhabitants"
      className="py-16"
      aria-label="Carousel of past inhabitants"
    >
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-8 text-primary">Past Inhabitants</h2>
        {/* Responsive grid: 1 col on mobile/tablet, 3 cols on large screens */}
        <div className="w-full flex flex-col items-center gap-8 lg:grid lg:grid-cols-3 lg:items-start lg:gap-8">
          {CATEGORIES.map(cat => {
            // Safety: skip category if empty
            if (categoryInhabitants[cat.key].length === 0) return null;
            return (
              <div
                key={cat.key}
                className="w-full max-w-lg"
                tabIndex={0}
                onKeyDown={handleKeyDown(cat.key)}
              >
                <InhabitantCardCarousel
                  inhabitants={categoryInhabitants[cat.key]}
                  current={currents[cat.key]}
                  setCurrent={idx => setCurrents(prev => ({ ...prev, [cat.key]: idx }))}
                  handleTouchStart={makeHandleTouchStart(cat.key)}
                  handleTouchMove={makeHandleTouchMove(cat.key)}
                  handleTouchEnd={makeHandleTouchEnd(cat.key)}
                  goLeft={() => goLeft(cat.key)}
                  goRight={() => goRight(cat.key)}
                  categoryName={cat.label}
                />
              </div>
            );
          })}
        </div>
        <p className="mt-8 text-sm text-foreground/60 italic">
          {useIsSmallScreen() ? (
            <span>Swipe to see all inhabitants, by category!</span>
          ) : (
            <span>Swipe or use arrows to see all inhabitants, by category!</span>
          )}
        </p>
      </div>
    </section>
  );
};
