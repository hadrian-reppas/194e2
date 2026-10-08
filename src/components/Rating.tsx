import type { Rating } from "@/lib/ratings";
import { RatingSystem } from "@/lib/ratings";
import { RATING_IMAGES, type RatingImagePath } from "@/lib/ratingImages";
import Image from "next/image";

interface TextRatingProps {
  text: string;
  inline: boolean;
  italics?: true;
}

// TODO: add special case for single emoji: /\p{Emoji}/u.test(text)
function TextRating({ text, inline, italics }: TextRatingProps) {
  return (
    <span
      className={[
        inline ? "inline box-decoration-clone" : "inline-block",
        "rounded-full bg-black/8 px-[0.45em] py-[0.15em] whitespace-nowrap dark:bg-white/15",
        italics ? "italic" : "",
      ].join(" ")}
    >
      {text}
    </span>
  );
}

interface ImageRatingProps {
  src: RatingImagePath;
  alt: string;
  inline: boolean;
}

function ImageRating({ src, alt, inline }: ImageRatingProps) {
  // <Image> only needs the intrinsic size to derive an aspect ratio; `h-12
  // w-auto` then pins the rendered height and lets the width follow. Both
  // dimensions are overridden in CSS, which is what stops Next warning about
  // modifying one without the other.
  const { width, height } = RATING_IMAGES[src];
  return (
    <Image
      src={src}
      alt={alt}
      title={alt}
      width={width}
      height={height}
      className={inline ? "inline-block h-12 w-auto" : "block h-12 w-auto"}
    />
  );
}

interface RatingProps {
  rating: Rating;
  inline: boolean;
}

export default function DisplayRating({ rating, inline }: RatingProps) {
  switch (rating.system) {
    case RatingSystem.Good:
    case RatingSystem.Recommend:
    case RatingSystem.Approve:
    case RatingSystem.LetterGrades:
    case RatingSystem.Fide:
    case RatingSystem.CefrLanguage:
    case RatingSystem.GiaDiamond:
    case RatingSystem.Wagyu:
    case RatingSystem.BlackTea:
    case RatingSystem.Cognac:
    case RatingSystem.SpCredit:
    case RatingSystem.MoodysCredit:
    case RatingSystem.AnalystRating:
    case RatingSystem.Sumo:
      return <TextRating text={rating.value} inline={inline} />;
    case RatingSystem.Stars:
      return <></>; // TODO
    case RatingSystem.OneToTen:
      return <TextRating text={`${rating.value}/10`} inline={inline} />;
    case RatingSystem.TenPointScale:
      return <TextRating text={rating.value.toFixed(1)} inline={inline} />;
    case RatingSystem.Percentage:
      return <TextRating text={`${rating.value}%`} inline={inline} />;
    case RatingSystem.Percentile:
      return (
        <TextRating
          text={formatOrdinal(rating.value) + " Percentile"}
          inline={inline}
        />
      );
    case RatingSystem.Decile:
      return (
        <TextRating
          text={formatOrdinal(rating.value) + " Decile"}
          inline={inline}
        />
      );
    case RatingSystem.Quintile:
      return (
        <TextRating
          text={formatOrdinal(rating.value) + " Quintile"}
          inline={inline}
        />
      );
    case RatingSystem.Quartile:
      return (
        <TextRating
          text={formatOrdinal(rating.value) + " Quartile"}
          inline={inline}
        />
      );
    case RatingSystem.PercentApprove:
      return <TextRating text={`${rating.value}% Approve`} inline={inline} />;
    case RatingSystem.TierList:
      return <TextRating text={`${rating.value}-tier`} inline={inline} />;
    case RatingSystem.Medals: {
      const emoji =
        rating.value === "Gold"
          ? "🥇"
          : rating.value === "Silver"
            ? "🥈"
            : "🥉";
      return <TextRating text={emoji} inline={inline} />;
    }
    case RatingSystem.Rank:
      return <TextRating text={`#${rating.value}`} inline={inline} />;
    case RatingSystem.RankInCategory:
      return (
        <TextRating
          text={`#${rating.value.rank} ${rating.value.category}`}
          inline={inline}
        />
      );
    case RatingSystem.WinLoss:
      return (
        <TextRating
          text={`${rating.value.wins}-${rating.value.losses}`}
          inline={inline}
        />
      );
    case RatingSystem.WinLossDraw:
      return (
        <TextRating
          text={`${rating.value.wins}-${rating.value.losses}-${rating.value.draws}`}
          inline={inline}
        />
      );
    case RatingSystem.Thumbs: {
      const emoji = rating.value === "up" ? "👍" : "👎";
      return <TextRating text={emoji} inline={inline} />;
    }
    case RatingSystem.Upvotes:
      return <></>; // TODO
    case RatingSystem.Gpa:
      return <TextRating text={`${rating.value}/4.0`} inline={inline} />;
    case RatingSystem.FrenchGrades:
      return <TextRating text={`${rating.value}/20`} inline={inline} />;
    case RatingSystem.Sat:
      return <TextRating text={`${rating.value} SAT`} inline={inline} />;
    case RatingSystem.Act:
      return <TextRating text={`${rating.value} ACT`} inline={inline} />;
    case RatingSystem.Lsat:
      return <TextRating text={`${rating.value} LSAT`} inline={inline} />;
    case RatingSystem.Mcat:
      return <TextRating text={`${rating.value} MCAT`} inline={inline} />;
    case RatingSystem.Gmat:
      return <TextRating text={`${rating.value} GMAT`} inline={inline} />;
    case RatingSystem.Gre:
      return <TextRating text={`${rating.value} GRE`} inline={inline} />;
    case RatingSystem.LatinHonors:
      return <TextRating text={rating.value} inline={inline} italics={true} />;
    case RatingSystem.Jlpt:
      return <TextRating text={`JLPT N${rating.value}`} inline={inline} />;
    case RatingSystem.Lexile: {
      const text =
        rating.value < 0 ? `BR${-rating.value}L` : `${rating.value}L`;
      return <TextRating text={text} inline={inline} />;
    }
    case RatingSystem.Iq:
      return <TextRating text={`${rating.value} IQ`} inline={inline} />;
    case RatingSystem.Beli:
      return <></>; // TODO
    case RatingSystem.Ign:
      return <></>; // TODO
    case RatingSystem.RottenTomatoes:
      return <></>; // TODO
    case RatingSystem.GaultMillau:
      return <></>; // TODO
    case RatingSystem.Imdb:
      return <></>; // TODO
    case RatingSystem.Metacritic:
      return <></>; // TODO
    case RatingSystem.TripAdvisor:
      return <></>; // TODO
    case RatingSystem.Trustpilot:
      return <></>; // TODO
    case RatingSystem.Untappd:
      return <></>; // TODO
    case RatingSystem.MpaFilm:
      return <></>; // TODO
    case RatingSystem.UsTv:
      return <></>; // TODO
    case RatingSystem.Riaa:
      return <></>; // TODO
    case RatingSystem.Esrb:
      return <></>; // TODO
    case RatingSystem.Michelin:
      return <></>; // TODO
    case RatingSystem.MichelinKeys:
      return <></>; // TODO
    case RatingSystem.UsdaBeef:
      return <></>; // TODO
    case RatingSystem.NutriScore:
      return (
        <ImageRating
          src={`/ratings/nutriscore/${rating.value}.svg`}
          alt={`Nutri-Score ${rating.value}`}
          inline={inline}
        />
      );
    case RatingSystem.NycHealthInspection:
      return <></>; // TODO
    case RatingSystem.Karat:
      return <TextRating text={`${rating.value}K Gold`} inline={inline} />;
    case RatingSystem.CrudeOil:
      return <TextRating text={`${rating.value} Crude`} inline={inline} />;
    case RatingSystem.Fico:
      return <TextRating text={`${rating.value} FICO`} inline={inline} />;
    case RatingSystem.Go:
      return <TextRating text={`${rating.value} Dan`} inline={inline} />;
    case RatingSystem.Elo:
      return <TextRating text={`${rating.value} Elo`} inline={inline} />;
    case RatingSystem.LeagueOfLegends:
      return (
        <ImageRating
          src={`/ratings/league-of-legends/${rating.value}.png`}
          alt={`League of Legends ${rating.value}`}
          inline={inline}
        />
      );
    case RatingSystem.Valorant:
      return <></>; // TODO
    case RatingSystem.CounterStrike:
      return <></>; // TODO
    case RatingSystem.VScale:
      return <TextRating text={`V${rating.value}`} inline={inline} />;
    case RatingSystem.Ski:
      return <></>; // TODO
    case RatingSystem.MartialArtsBelt:
      return <></>; // TODO
    case RatingSystem.Hurricane:
      return (
        <TextRating text={`CAT${rating.value} Hurricane`} inline={inline} />
      );
    case RatingSystem.EnhancedFujita:
      return <TextRating text={`EF${rating.value} Tornado`} inline={inline} />;
    case RatingSystem.Richter:
      return (
        <TextRating
          text={`M${rating.value.toFixed(1)} Earthquake`}
          inline={inline}
        />
      );
    case RatingSystem.AirQualityIndex:
      return <TextRating text={`AQI ${rating.value}`} inline={inline} />;
    case RatingSystem.UvIndex:
      return <TextRating text={`UV Index ${rating.value}`} inline={inline} />;
    case RatingSystem.MohsHardness:
      return <TextRating text={`Mohs ${rating.value}`} inline={inline} />;
    case RatingSystem.IpRating:
      return (
        <TextRating
          text={`IP${rating.value.solids}${rating.value.water}`}
          inline={inline}
        />
      );
    case RatingSystem.Leed:
      return <></>; // TODO
    case RatingSystem.PsaGrade:
      return <TextRating text={`PSA ${rating.value}`} inline={inline} />;
    case RatingSystem.RiaaCertification:
      return <></>; // TODO
    case RatingSystem.Psu80Plus:
      return <></>; // TODO
    case RatingSystem.Defcon:
      return <TextRating text={`DEFCON ${rating.value}`} inline={inline} />;
    case RatingSystem.UsArmy:
      return <></>; // TODO
    case RatingSystem.KardashevScale: {
      const numeral =
        rating.value === 1 ? "I" : rating.value === 2 ? "II" : "III";
      return <TextRating text={`Kardashev Type ${numeral}`} inline={inline} />;
    }
    case RatingSystem.SweLevel:
      return <TextRating text={`L${rating.value} SWE`} inline={inline} />;
    case RatingSystem.Hdi:
      return (
        <TextRating text={"HDI " + rating.value.toFixed(2)} inline={inline} />
      );
  }
}

function formatOrdinal(n: number): string {
  n = Math.floor(n);
  const lastDigit = n % 10;
  switch (lastDigit) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}
