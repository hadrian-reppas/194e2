type NumericType<
  Min extends number | null,
  Max extends number | null,
  Step extends number | null,
> = { kind: "numeric"; min: Min; max: Max; step: Step };

type TextType<MaxLength extends number> = {
  kind: "text";
  maxLength: MaxLength;
};

type EnumType<Values extends string[]> = {
  kind: "enum";
  values: Values;
};

type StructType<Fields extends Record<string, PrimitiveRatingType>> = {
  kind: "struct";
  fields: Fields;
};

type PrimitiveRatingType =
  | NumericType<number | null, number | null, number | null>
  | TextType<number>
  | EnumType<string[]>;

type RatingType =
  | PrimitiveRatingType
  | StructType<Record<string, PrimitiveRatingType>>;

function numeric<
  Min extends number | null,
  Max extends number | null,
  Step extends number | null,
>(min: Min, max: Max, step: Step): NumericType<Min, Max, Step> {
  return { kind: "numeric", min, max, step };
}

function text<MaxLength extends number>(
  maxLength: MaxLength,
): TextType<MaxLength> {
  return { kind: "text", maxLength };
}

function enumeration<const Values extends string[]>(
  values: Values,
): EnumType<Values> {
  return { kind: "enum", values };
}

function struct<Fields extends Record<string, PrimitiveRatingType>>(
  fields: Fields,
): StructType<Fields> {
  return { kind: "struct", fields };
}

function unit(): StructType<{}> {
  return struct({});
}

// Requirements:
// 1. No ambiguity when looking at rendered score
//      Rendered score must look good on white background
// 2. Not just a number with a unit (VO2 max)
// 3. Spectrum (not Oscar)
// 4. Not in poor taste (cancer stages)
enum RatingSystem {
  Stars = "stars",
  OneToTen = "one-to-ten",
  TenPointScale = "ten-point-scale",
  Percentage = "percentage",
  Percentile = "percentile",
  Decile = "decile",
  Quintile = "quintile",
  Quartile = "quartile",

  Good = "good",
  Recommend = "recommend",
  Approve = "approve",
  PercentApprove = "percent-approve",
  TierList = "tier-list",
  Medals = "medals",
  Rank = "rank",
  RankInCategory = "rank-in-category",
  WinLoss = "win-loss",
  WinLossDraw = "win-loss-draw",
  Thumbs = "thumbs",
  Upvotes = "upvotes",

  LetterGrades = "letter-grades",
  Gpa = "gpa",
  FrenchGrades = "french-grades",
  Sat = "sat",
  Act = "act",
  Lsat = "lsat",
  Mcat = "mcat",
  Gmat = "gmat",
  Gre = "gre",
  LatinHonors = "latin-honors",
  CefrLanguage = "cefr-language",
  Jlpt = "jlpt",
  Lexile = "lexile",
  Iq = "iq",

  Beli = "beli",
  Ign = "ign",
  RottenTomatoes = "rotten-tomatoes",
  GaultMillau = "gault-millau",
  Imdb = "imdb",
  Metacritic = "metacritic",
  TripAdvisor = "tripadvisor",
  Trustpilot = "trustpilot",
  Untappd = "untappd",

  MpaFilm = "mpa-film",
  UsTv = "us-tv",
  Riaa = "riaa",
  Esrb = "esrb",

  Michelin = "michelin",
  MichelinKeys = "michelin-keys",
  UsdaBeef = "usda-beef",
  Wagyu = "wagyu",
  BlackTea = "black-tea",
  Cognac = "cognac",
  NutriScore = "nutri-score",
  NycHealthInspection = "nyc-health-inspection",
  Karat = "karat",
  CrudeOil = "crude-oil",

  Fico = "fico",
  SpCredit = "sp-credit",
  MoodysCredit = "moodys-credit",
  AnalystRating = "analyst-rating",

  Fide = "fide",
  Go = "go",
  Elo = "elo",
  Sumo = "sumo",
  LeagueOfLegends = "league-of-legends",
  Valorant = "valorant",
  CounterStrike = "counter-strike",

  VScale = "v-scale",
  Ski = "ski",
  MartialArtsBelt = "martial-arts-belt",

  Hurricane = "hurricane",
  EnhancedFujita = "enhanced-fujita",
  Richter = "richter",
  AirQualityIndex = "air-quality-index",
  UvIndex = "uv-index",
  MohsHardness = "mohs-hardness",
  IpRating = "ip-rating",

  Leed = "leed",
  GiaDiamond = "gia-diamond",
  PsaGrade = "psa-grade",
  RiaaCertification = "riaa-certification",
  Psu80Plus = "psu-80-plus",

  Defcon = "defcon",
  UsArmy = "us-army",
  KardashevScale = "kardashev-scale",
  SweLevel = "swe-level",
  Hdi = "hdi",

  // Oscar = "oscar",
  // Emmy = "emmy",
  // Grammy = "grammy",
  // Tony = "tony",
  // GoldenGlobe = "golden-globe",
  // Bafta = "bafta",
  // CriticsChoice = "critics-choice",
  // PalmeDor = "palme-dor",
  // ColdenLion = "golden-lion",

  // PulitzerPrize = "pulitzer-prize",
  // NationalBookAward = "national-book-award",
  // Booker = "booker",
  // Hugo = "hugo",
  // NewberyMedal = "newbery-medal",

  // NobelPrize = "nobel-prize",
  // FieldsMedal = "fields-medal",
  // AbelPrize = "abel-prize",
  // TuringAward = "turing-award",
  // PritzkerPrize = "pritzker-prize",
  // JamesBeard = "james-beard",
  // BocuseDor = "bocuse-dor",
  // WolfPrize = "wolf-prize",
  // IgNobel = "ig-nobel",

  // GlasgowComa = "glasgow-coma",
  // NihStroke = "nih-stroke",
  // CancerStage = "cancer-stage",
  // Vo2Max = "vo2-max",
}

// TODO: veryfiy consistent ordering and capitalization
// Enums should be what get displayed, perhaps with some uniform processing
// that lets us avoid redundancy in our representation (eg S -> S-Tier). If there
// are spaces in the text we want to display, then we use an internal kebab case
// value (which corresponds to the file name) and we use ratingInfos.enumLabels
// to hold the labels with strings.
const ratingTypes = {
  [RatingSystem.Stars]: numeric(0, 5, 0.5),
  [RatingSystem.OneToTen]: numeric(1, 10, 1),
  [RatingSystem.TenPointScale]: numeric(0, 10, 0.1),
  [RatingSystem.Percentage]: numeric(0, 100, 1),
  [RatingSystem.Percentile]: numeric(1, 100, 1),
  [RatingSystem.Decile]: numeric(0, 10, 1),
  [RatingSystem.Quintile]: numeric(0, 5, 1),
  [RatingSystem.Quartile]: numeric(0, 4, 1),
  [RatingSystem.Good]: enumeration(["Good", "Bad"]),
  [RatingSystem.Recommend]: enumeration(["Recommend", "Don't Recommend"]),
  [RatingSystem.Approve]: enumeration(["Approve", "Disapprove", "Not Sure"]),
  [RatingSystem.PercentApprove]: numeric(0, 100, 1),
  [RatingSystem.TierList]: enumeration(["S", "A", "B", "C", "D", "E", "F"]),
  [RatingSystem.Medals]: enumeration(["Gold", "Silver", "Bronze"]),
  [RatingSystem.Rank]: numeric(1, null, 1),
  [RatingSystem.RankInCategory]: struct({
    rank: numeric(1, null, 1),
    category: text(20),
  }),
  [RatingSystem.WinLoss]: struct({
    wins: numeric(0, null, 1),
    losses: numeric(0, null, 1),
  }),
  [RatingSystem.WinLossDraw]: struct({
    wins: numeric(0, null, 1),
    losses: numeric(0, null, 1),
    draws: numeric(0, null, 1),
  }),
  [RatingSystem.Thumbs]: enumeration(["up", "down"]),
  [RatingSystem.Upvotes]: numeric(null, null, 1),
  [RatingSystem.LetterGrades]: enumeration([
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "D-",
    "F",
  ]),
  [RatingSystem.Gpa]: numeric(0, 4, 0.1),
  [RatingSystem.FrenchGrades]: numeric(0, 20, 1),
  [RatingSystem.Sat]: numeric(400, 1600, 1),
  [RatingSystem.Act]: numeric(1, 36, 1),
  [RatingSystem.Lsat]: numeric(120, 180, 1),
  [RatingSystem.Mcat]: numeric(472, 528, 1),
  [RatingSystem.Gmat]: numeric(205, 805, 10),
  [RatingSystem.Gre]: numeric(260, 340, 1),
  [RatingSystem.LatinHonors]: enumeration([
    "Cum Laude",
    "Magna Cum Laude",
    "Summa Cum Laude",
  ]),
  [RatingSystem.CefrLanguage]: enumeration([
    "A1",
    "A2",
    "B1",
    "B2",
    "C1",
    "C2",
  ]),
  [RatingSystem.Jlpt]: numeric(1, 5, 1),
  [RatingSystem.Lexile]: numeric(-400, 2000, 5),
  [RatingSystem.Iq]: numeric(0, null, 1),
  [RatingSystem.Beli]: numeric(1, 10, 0.1),
  [RatingSystem.Ign]: numeric(1, 10, 0.1),
  [RatingSystem.RottenTomatoes]: numeric(1, 100, 1),
  [RatingSystem.GaultMillau]: numeric(1, 5, 1),
  [RatingSystem.Imdb]: numeric(0, 10, 0.1),
  [RatingSystem.Metacritic]: numeric(1, 100, 1),
  [RatingSystem.TripAdvisor]: numeric(1, 5, 0.5),
  [RatingSystem.Trustpilot]: numeric(1, 5, 0.5),
  [RatingSystem.Untappd]: numeric(0, 5, 0.1),
  [RatingSystem.MpaFilm]: enumeration(["G", "PG", "PG-13", "R", "NC-17"]),
  [RatingSystem.UsTv]: enumeration(["Y", "Y7", "G", "PG", "14", "MA"]),
  [RatingSystem.Riaa]: unit(),
  [RatingSystem.Esrb]: enumeration(["ec", "e", "e10", "t", "m", "ao"]),
  [RatingSystem.Michelin]: enumeration([
    "One Star",
    "Two Stars",
    "Three Stars",
    "Bib Gourmand",
    "Green Star",
  ]),
  [RatingSystem.MichelinKeys]: numeric(1, 3, 1),
  [RatingSystem.UsdaBeef]: enumeration(["Prime", "Choice", "Select"]),
  [RatingSystem.Wagyu]: enumeration([
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "B1",
    "B2",
    "B3",
    "B4",
    "B5",
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
  ]),
  [RatingSystem.BlackTea]: enumeration([
    "BOP",
    "OP",
    "FOP",
    "TGFOP",
    "FTGFOP",
    "SFTGFOP",
  ]),
  [RatingSystem.Cognac]: enumeration(["VS", "VSOP", "XO", "XXO"]),
  [RatingSystem.NutriScore]: enumeration(["A", "B", "C", "D", "E"]),
  [RatingSystem.NycHealthInspection]: enumeration(["A", "B", "C"]),
  [RatingSystem.Karat]: enumeration(["9", "10", "14", "18", "22", "24"]),
  [RatingSystem.CrudeOil]: enumeration([
    "Light",
    "Medium",
    "Heavy",
    "Extra-heavy",
  ]),
  [RatingSystem.Fico]: numeric(300, 850, 1),
  [RatingSystem.SpCredit]: enumeration([
    "AAA",
    "AA+",
    "AA",
    "AA-",
    "A+",
    "A",
    "A-",
    "BBB+",
    "BBB",
    "BBB-",
    "BB+",
    "BB",
    "BB-",
    "B+",
    "B",
    "B-",
    "CCC+",
    "CCC",
    "CCC-",
    "CC",
    "C",
    "D",
  ]),
  [RatingSystem.MoodysCredit]: enumeration([
    "Aaa",
    "Aa1",
    "Aa2",
    "Aa3",
    "A1",
    "A2",
    "A3",
    "Baa1",
    "Baa2",
    "Baa3",
    "Ba1",
    "Ba2",
    "Ba3",
    "B1",
    "B2",
    "B3",
    "Caa1",
    "Caa2",
    "Caa3",
    "Ca",
    "C",
  ]),
  [RatingSystem.AnalystRating]: enumeration([
    "Strong Buy",
    "Buy",
    "Hold",
    "Sell",
    "Strong Sell",
  ]),
  [RatingSystem.Fide]: enumeration([
    "Grandmaster",
    "International Master",
    "FIDE Master",
    "Candidate Master",
  ]),
  [RatingSystem.Go]: numeric(1, 9, 1),
  [RatingSystem.Elo]: numeric(1, null, 1),
  [RatingSystem.Sumo]: enumeration([
    "Yokozuna",
    "Ozeki",
    "Sekiwake",
    "Komusubi",
    "Maegashira",
  ]),
  [RatingSystem.LeagueOfLegends]: enumeration([
    "Iron",
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Emerald",
    "Diamond",
    "Master",
    "Grandmaster",
    "Challenger",
  ]),
  [RatingSystem.Valorant]: enumeration([
    "iron1",
    "iron2",
    "iron3",
    "bronze1",
    "bronze2",
    "bronze3",
    "silver1",
    "silver2",
    "silver3",
    "gold1",
    "gold2",
    "gold3",
    "platinum1",
    "platinum2",
    "platinum3",
    "diamond1",
    "diamond2",
    "diamond3",
    "ascendant1",
    "ascendant2",
    "ascendant3",
    "immortal1",
    "immortal2",
    "immortal3",
    "radiant",
  ]),
  [RatingSystem.CounterStrike]: enumeration([
    "S1",
    "S2",
    "S3",
    "S4",
    "SE",
    "SEM",
    "GN1",
    "GN2",
    "GN3",
    "GNM",
    "MG1",
    "MG2",
    "MGE",
    "DMG",
    "LE",
    "LEM",
    "SMFC",
    "GE",
  ]),
  [RatingSystem.VScale]: numeric(0, 17, 1),
  [RatingSystem.Ski]: enumeration(["green", "blue", "black", "double-black"]),
  [RatingSystem.MartialArtsBelt]: enumeration([
    "White",
    "Yellow",
    "Orange",
    "Green",
    "Blue",
    "Purple",
    "Brown",
    "Black",
  ]),
  [RatingSystem.Hurricane]: numeric(1, 5, 1),
  [RatingSystem.EnhancedFujita]: numeric(0, 5, 1),
  [RatingSystem.Richter]: numeric(0, 10, 0.1),
  [RatingSystem.AirQualityIndex]: numeric(0, 500, 1),
  [RatingSystem.UvIndex]: numeric(1, null, 1),
  [RatingSystem.MohsHardness]: numeric(1, 10, 1),
  [RatingSystem.IpRating]: struct({
    solids: numeric(0, 6, 1),
    water: numeric(0, 9, 1),
  }),
  [RatingSystem.Leed]: enumeration(["Certified", "Silver", "Gold", "Platinum"]),
  [RatingSystem.GiaDiamond]: enumeration([
    "FL",
    "IF",
    "VVS1",
    "VVS2",
    "VS1",
    "VS2",
    "SI1",
    "SI2",
    "I1",
    "I2",
    "I3",
  ]),
  [RatingSystem.PsaGrade]: numeric(1, 10, 1),
  [RatingSystem.RiaaCertification]: enumeration([
    "gold",
    "platinum",
    "double-platinum",
    "triple-platinum",
    "quadruple-platinum",
    "quintuple-platinum",
    "sextuple-platinum",
    "septuple-platinum",
    "octuple-platinum",
    "nonuple-platinum",
    "diamond",
    "double-diamond",
    "triple-diamond",
    "quadruple-diamond",
  ]),
  [RatingSystem.Psu80Plus]: enumeration([
    "Standard",
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Titanium",
  ]),
  [RatingSystem.Defcon]: numeric(1, 5, 1),
  [RatingSystem.UsArmy]: enumeration([
    "2lt",
    "1lt",
    "cpt",
    "maj",
    "ltc",
    "col",
    "bg",
    "mg",
    "ltg",
    "gen",
    "ga",
  ]),
  [RatingSystem.KardashevScale]: numeric(1, 3, 1),
  [RatingSystem.SweLevel]: numeric(3, null, 1),
  [RatingSystem.Hdi]: numeric(0, 1, 0.01),
} satisfies Record<RatingSystem, RatingType>;

type TypeOf<T extends RatingType> =
  T extends NumericType<number | null, number | null, number | null>
    ? number
    : T extends TextType<number>
      ? string
      : T extends EnumType<infer Values>
        ? Values[number]
        : T extends StructType<infer Fields>
          ? { [K in keyof Fields]: TypeOf<Fields[K]> }
          : never;

type RatingTypeOf<S extends RatingSystem> = (typeof ratingTypes)[S];
type ValueFor<S extends RatingSystem> = TypeOf<RatingTypeOf<S>>;
type RatingFor<S extends RatingSystem> = { system: S; value: ValueFor<S> };
type Rating = { [S in RatingSystem]: RatingFor<S> }[RatingSystem];

type InfoFor<S extends RatingSystem> = {
  label: string;
  exampleValue?: ValueFor<S>;
  defaultValue?: ValueFor<S>;
} & (RatingTypeOf<S> extends NumericType<infer _, infer _, infer _>
  ? {
      enumInput?: true;
    }
  : {}) &
  (RatingTypeOf<S> extends EnumType<infer Values>
    ? {
        enumLabels?: true | Record<Values[number], string>;
      }
    : {}) &
  (RatingTypeOf<S> extends StructType<infer Fields>
    ? {} extends Fields
      ? {}
      : { fieldLabels: { [K in keyof Fields]: string } }
    : {});

const ratingInfos: {
  [S in RatingSystem]: InfoFor<S>;
} = {
  [RatingSystem.Stars]: { label: "Stars", exampleValue: 3.5, enumInput: true },
  [RatingSystem.OneToTen]: { label: "1\u201310", exampleValue: 8 },
  [RatingSystem.TenPointScale]: { label: "0.0\u201310.0", exampleValue: 8.2 },
  [RatingSystem.Percentage]: { label: "Percentage", exampleValue: 95 },
  [RatingSystem.Percentile]: { label: "Percentile", exampleValue: 99 },
  [RatingSystem.Decile]: { label: "Decile", exampleValue: 6 },
  [RatingSystem.Quintile]: { label: "Quintile", exampleValue: 4 },
  [RatingSystem.Quartile]: { label: "Quartile", exampleValue: 3 },
  [RatingSystem.Good]: { label: "Good/Bad" },
  [RatingSystem.Recommend]: { label: "Recommend/Don't" },
  [RatingSystem.Approve]: { label: "Approve/Disapprove" },
  [RatingSystem.PercentApprove]: { label: "Approval", exampleValue: 56 },
  [RatingSystem.TierList]: { label: "Tier List", exampleValue: "S" },
  [RatingSystem.Medals]: {
    label: "Medals",
    exampleValue: "Silver",
    enumLabels: true,
  },
  [RatingSystem.Rank]: { label: "Rank", exampleValue: 3 },
  [RatingSystem.RankInCategory]: {
    label: "Rank in Category",
    exampleValue: { rank: 1, category: "Italian" },
    fieldLabels: { rank: "Rank", category: "Category" },
  },
  [RatingSystem.WinLoss]: {
    label: "Win/Loss",
    exampleValue: { wins: 2, losses: 8 },
    fieldLabels: { wins: "Wins", losses: "Losses" },
  },
  [RatingSystem.WinLossDraw]: {
    label: "Win/Loss/Draw",
    exampleValue: { wins: 5, losses: 2, draws: 1 },
    fieldLabels: { wins: "Wins", losses: "Losses", draws: "Draws" },
  },
  [RatingSystem.Thumbs]: {
    label: "Thumbs Up/Down",
    exampleValue: "up",
    enumLabels: { up: "Thumbs Up", down: "Thumbs Down" },
  },
  [RatingSystem.Upvotes]: { label: "Upvotes", exampleValue: 4 },
  [RatingSystem.LetterGrades]: { label: "Letter Grades", exampleValue: "B+" },
  [RatingSystem.Gpa]: { label: "GPA", exampleValue: 3.9 },
  [RatingSystem.FrenchGrades]: { label: "French Grades", exampleValue: 14 },
  [RatingSystem.Sat]: { label: "SAT", exampleValue: 1550 },
  [RatingSystem.Act]: { label: "ACT", exampleValue: 34 },
  [RatingSystem.Lsat]: { label: "LSAT", exampleValue: 165 },
  [RatingSystem.Mcat]: { label: "MCAT", exampleValue: 502 },
  [RatingSystem.Gmat]: { label: "GMAT", exampleValue: 605 },
  [RatingSystem.Gre]: { label: "GRE", exampleValue: 281 },
  [RatingSystem.LatinHonors]: {
    label: "Latin Honors",
    exampleValue: "Cum Laude",
  },
  [RatingSystem.CefrLanguage]: { label: "CEFR Level", exampleValue: "B2" },
  [RatingSystem.Jlpt]: { label: "JLPT", exampleValue: 4, enumInput: true },
  [RatingSystem.Lexile]: { label: "Lexile", exampleValue: 880 },
  [RatingSystem.Iq]: { label: "IQ", exampleValue: 126 },
  [RatingSystem.Beli]: { label: "Beli", exampleValue: 8.9 },
  [RatingSystem.Ign]: { label: "IGN", exampleValue: 9 },
  [RatingSystem.RottenTomatoes]: { label: "Rotten Tomatoes", exampleValue: 89 },
  [RatingSystem.GaultMillau]: {
    label: "Gault&Millau",
    exampleValue: 4,
    enumInput: true,
  },
  [RatingSystem.Imdb]: { label: "IMDb", exampleValue: 8.4 },
  [RatingSystem.Metacritic]: { label: "Metacritic", exampleValue: 83 },
  [RatingSystem.TripAdvisor]: {
    label: "Tripadvisor",
    exampleValue: 4,
    enumInput: true,
  },
  [RatingSystem.Trustpilot]: {
    label: "Trustpilot",
    exampleValue: 4.5,
    enumInput: true,
  },
  [RatingSystem.Untappd]: {
    label: "Untappd",
    exampleValue: 3.75,
    enumInput: true,
  },
  [RatingSystem.MpaFilm]: { label: "MPA Rating", exampleValue: "PG-13" },
  [RatingSystem.UsTv]: { label: "US TV Rating", exampleValue: "14" },
  [RatingSystem.Riaa]: { label: "Parental Advisory", exampleValue: {} },
  [RatingSystem.Esrb]: {
    label: "ESRB",
    exampleValue: "t",
    enumLabels: {
      ec: "Early Childhood",
      e: "Everyone",
      e10: "Everyone 10+",
      t: "Teen",
      m: "Mature 17+",
      ao: "Adults Only",
    },
  },
  [RatingSystem.Michelin]: {
    label: "Michelin Stars",
    exampleValue: "Two Stars",
    enumLabels: true,
  },
  [RatingSystem.MichelinKeys]: {
    label: "Michelin Keys",
    exampleValue: 2,
    enumInput: true,
  },
  [RatingSystem.UsdaBeef]: {
    label: "USDA Beef",
    exampleValue: "Prime",
    enumLabels: true,
  },
  [RatingSystem.Wagyu]: { label: "Wagyu Grade", exampleValue: "A5" },
  [RatingSystem.BlackTea]: { label: "Black Tea Grade", exampleValue: "FTGFOP" },
  [RatingSystem.Cognac]: { label: "Cognac", exampleValue: "XO" },
  [RatingSystem.NutriScore]: { label: "Nutri-Score", exampleValue: "B" },
  [RatingSystem.NycHealthInspection]: {
    label: "NYC Health Grade",
    exampleValue: "A",
  },
  [RatingSystem.Karat]: { label: "Karat", exampleValue: "18" },
  [RatingSystem.CrudeOil]: { label: "Crude Oil", exampleValue: "Light" },
  [RatingSystem.Fico]: { label: "FICO Score", exampleValue: 720 },
  [RatingSystem.SpCredit]: { label: "S&P Rating", exampleValue: "BBB+" },
  [RatingSystem.MoodysCredit]: {
    label: "Moody's Rating",
    exampleValue: "Baa1",
  },
  [RatingSystem.AnalystRating]: {
    label: "Analyst Rating",
    exampleValue: "Buy",
  },
  [RatingSystem.Fide]: { label: "Chess Title", exampleValue: "Grandmaster" },
  [RatingSystem.Go]: { label: "Go Rank", exampleValue: 8 },
  [RatingSystem.Elo]: { label: "Elo", exampleValue: 2400 },
  [RatingSystem.Sumo]: { label: "Sumo", exampleValue: "Ozeki" },
  [RatingSystem.LeagueOfLegends]: {
    label: "League of Legends",
    exampleValue: "Gold",
    enumLabels: true,
  },
  [RatingSystem.Valorant]: {
    label: "Valorant",
    exampleValue: "diamond2",
    enumLabels: {
      iron1: "Iron 1",
      iron2: "Iron 2",
      iron3: "Iron 3",
      bronze1: "Bronze 1",
      bronze2: "Bronze 2",
      bronze3: "Bronze 3",
      silver1: "Silver 1",
      silver2: "Silver 2",
      silver3: "Silver 3",
      gold1: "Gold 1",
      gold2: "Gold 2",
      gold3: "Gold 3",
      platinum1: "Platinum 1",
      platinum2: "Platinum 2",
      platinum3: "Platinum 3",
      diamond1: "Diamond 1",
      diamond2: "Diamond 2",
      diamond3: "Diamond 3",
      ascendant1: "Ascendant 1",
      ascendant2: "Ascendant 2",
      ascendant3: "Ascendant 3",
      immortal1: "Immortal 1",
      immortal2: "Immortal 2",
      immortal3: "Immortal 3",
      radiant: "Radiant",
    },
  },
  [RatingSystem.CounterStrike]: {
    label: "Counter-Strike",
    exampleValue: "GN3",
    enumLabels: true,
  },
  [RatingSystem.VScale]: { label: "V Scale", exampleValue: 8 },
  [RatingSystem.Ski]: {
    label: "Ski Trail",
    exampleValue: "black",
    enumLabels: {
      green: "Green",
      blue: "Blue",
      black: "Black",
      "double-black": "Double Black",
    },
  },
  [RatingSystem.MartialArtsBelt]: {
    label: "Martial Arts",
    exampleValue: "Black",
    enumLabels: true,
  },
  [RatingSystem.Hurricane]: { label: "Hurricane", exampleValue: 5 },
  [RatingSystem.EnhancedFujita]: { label: "Enhanced Fujita", exampleValue: 4 },
  [RatingSystem.Richter]: { label: "Richter Scale", exampleValue: 5.2 },
  [RatingSystem.AirQualityIndex]: {
    label: "Air Quality Index",
    exampleValue: 340,
  },
  [RatingSystem.UvIndex]: { label: "UV Index", exampleValue: 6 },
  [RatingSystem.MohsHardness]: { label: "Mohs Hardness", exampleValue: 8 },
  [RatingSystem.IpRating]: {
    label: "IP Rating",
    exampleValue: { solids: 6, water: 8 },
    fieldLabels: { solids: "Solids", water: "Water" },
  },
  [RatingSystem.Leed]: {
    label: "LEED",
    exampleValue: "Gold",
    enumLabels: true,
  },
  [RatingSystem.GiaDiamond]: { label: "Diamond", exampleValue: "VS1" },
  [RatingSystem.PsaGrade]: { label: "PSA Grade", exampleValue: 10 },
  [RatingSystem.RiaaCertification]: {
    label: "RIAA Certification",
    exampleValue: "triple-platinum",
    enumLabels: {
      gold: "Gold",
      platinum: "Platinum",
      "double-platinum": "Double Platinum",
      "triple-platinum": "Triple Platinum",
      "quadruple-platinum": "Quadruple Platinum",
      "quintuple-platinum": "Quintuple Platinum",
      "sextuple-platinum": "Sextuple Platinum",
      "septuple-platinum": "Septuple Platinum",
      "octuple-platinum": "Octuple Platinum",
      "nonuple-platinum": "Nonuple Platinum",
      diamond: "Diamond",
      "double-diamond": "Double Diamond",
      "triple-diamond": "Triple Diamond",
      "quadruple-diamond": "Quadruple Diamond",
    },
  },
  [RatingSystem.Psu80Plus]: {
    label: "80 Plus",
    exampleValue: "Gold",
    enumLabels: true,
  },
  [RatingSystem.Defcon]: { label: "DEFCON", exampleValue: 2 },
  [RatingSystem.UsArmy]: {
    label: "US Army Rank",
    exampleValue: "bg",
    enumLabels: {
      "2lt": "Second Lieutenant",
      "1lt": "First Lieutenant",
      cpt: "Captain",
      maj: "Major",
      ltc: "Lieutenant Colonel",
      col: "Colonel",
      bg: "Brigadier General",
      mg: "Major General",
      ltg: "Lieutenant General",
      gen: "General",
      ga: "General of the Army",
    },
  },
  [RatingSystem.KardashevScale]: {
    label: "Kardashev Scale",
    exampleValue: 2,
    enumInput: true,
  },
  [RatingSystem.SweLevel]: {
    label: "SWE Level",
    exampleValue: 3,
    enumInput: true,
  },
  [RatingSystem.Hdi]: { label: "Human Development Index", exampleValue: 0.64 },
};

export { ratingTypes, ratingInfos };
export type {
  RatingSystem,
  RatingType,
  Rating,
  RatingFor,
  TypeOf,
  RatingTypeOf,
};
