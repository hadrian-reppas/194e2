import { Fragment, type ReactNode } from "react";
import DisplayRating from "@/components/Rating";
import { RatingSystem, type Rating } from "@/lib/ratings";

interface Section {
  title: string;
  ratings: Rating[];
}

const SECTIONS: Section[] = [
  {
    title: "Stars",
    ratings: [
      { system: RatingSystem.Stars, value: 0.5 },
      { system: RatingSystem.Stars, value: 3.5 },
      { system: RatingSystem.Stars, value: 4 },
      { system: RatingSystem.Stars, value: 5 },
    ],
  },
  {
    title: "Out of Ten",
    ratings: [
      { system: RatingSystem.OneToTen, value: 6 },
      { system: RatingSystem.OneToTen, value: 10 },
      { system: RatingSystem.TenPointScale, value: 8.9 },
      { system: RatingSystem.TenPointScale, value: 0.2 },
    ],
  },
  {
    title: "League of Legends",
    ratings: [
      { system: RatingSystem.LeagueOfLegends, value: "Bronze" },
      { system: RatingSystem.LeagueOfLegends, value: "Gold" },
      { system: RatingSystem.LeagueOfLegends, value: "Grandmaster" },
      { system: RatingSystem.LeagueOfLegends, value: "Challenger" },
    ],
  },
  {
    title: "Nutri-Score",
    ratings: [
      { system: RatingSystem.NutriScore, value: "A" },
      { system: RatingSystem.NutriScore, value: "B" },
      { system: RatingSystem.NutriScore, value: "C" },
      { system: RatingSystem.NutriScore, value: "D" },
      { system: RatingSystem.NutriScore, value: "E" },
    ],
  },
];

// Sentence fragments the inline rating gets dropped into, so we can see how it
// sits in running text. Indexed by position rather than picked at random so the
// server and client render the same thing.
const LOREM: string[] = [
  "Lorem ipsum dolor sit amet, ",
  " consectetur adipiscing elit. Sed do eiusmod tempor incididunt ",
  " ut labore et dolore magna aliqua. Ut enim ad minim veniam, ",
  " quis nostrud exercitation ullamco. Duis aute irure dolor ",
  " in reprehenderit in voluptate velit.",
];

// Stand-in for the thing being rated, so we can see how a title and a rating sit
// together.
const ITEM_TITLE = "The Death of Ivan Ilyich";

export default function Home() {
  return (
    <main className="flex w-full flex-1 flex-col items-center gap-12 px-8 py-12">
      <div className="max-w-6xl">
        {SECTIONS.map((section) => (
          <section key={section.title} className="mb-10">
            <h2 className="mb-2 text-sm font-semibold tracking-wide uppercase opacity-60">
              {section.title}
            </h2>
            <div className="grid w-full grid-cols-2 gap-x-8 gap-y-8">
              {section.ratings.map((rating, i) => (
                <Fragment key={i}>
                  <div>
                    <div className="text-xs font-light">hadrian • 6h ago</div>
                    <h3 className="text-lg font-semibold">{ITEM_TITLE}</h3>
                    <DisplayRating rating={rating} inline={false} />
                  </div>
                  <div className="flex items-center border-b border-black/10 dark:border-white/10">
                    <p>
                      Lorem ipsum dolor sit amet,{" "}
                      <DisplayRating rating={rating} inline={true} />{" "}
                      consectetur adipiscing elit. Sed do eiusmod tempor
                      incididunt <DisplayRating rating={rating} inline={true} />{" "}
                      ut labore et dolore magna aliqua. Ut enim ad minim veniam,{" "}
                      <DisplayRating rating={rating} inline={true} /> quis
                      nostrud exercitation ullamco.
                    </p>
                  </div>
                </Fragment>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
