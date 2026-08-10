export type PortfolioProject = {
  slug: string;
  number: string;
  title: string;
  type: string;
  typeDescription: string;
  location: string;
  status: string;
  collaborator?: string;
  summary: string;
  description: string[];
  concept: string;
  inspiration: string;
  planRationale: string;
  program: string[];
  hero: string;
  plates: { src: string; alt: string; fit?: "cover" | "contain" }[];
};

const projectCatalog: Omit<PortfolioProject, "number">[] = [
  {
    slug: "kingdav-townhouses",
    title: "Six Townhouses",
    type: "Residential",
    typeDescription:
      "A six-unit, two-storey residential development planned for compact urban family living.",
    location: "Ghana",
    status: "Concept design",
    summary:
      "Six compact two-storey homes shaped for comfortable, efficient urban living.",
    description: [
      "This residential study brings six townhouse units together through a consistent architectural language rooted in modernism and restraint. Each home balances privacy, daylight and practical family life within a compact footprint.",
      "The ground floor gathers the living room, guest bedroom, washroom, kitchen and dining area. Above, a small family lounge connects two bedrooms and an en-suite primary bedroom with a generous balcony.",
    ],
    concept:
      "A repeatable townhouse model that balances everyday comfort, privacy and an efficient footprint across six homes.",
    inspiration:
      "Modern architecture fused with restrained minimalism, guided by contemporary Ghanaian residential trends and the client's brief.",
    planRationale:
      "Shared living spaces sit below the private bedrooms, giving each compact unit a clear public-to-private sequence while preserving a generous primary balcony.",
    program: [
      "Six two-storey units",
      "Living and dining spaces",
      "Guest bedroom",
      "Three upper-floor bedrooms",
      "Primary bedroom balcony",
    ],
    hero: "/images/projects/kingdav-townhouses/hero.webp",
    plates: [
      {
        src: "/images/projects/kingdav-townhouses/gallery-02.webp",
        alt: "Six Townhouses street-facing exterior at dusk",
      },
      {
        src: "/images/projects/kingdav-townhouses/gallery-03.webp",
        alt: "Six Townhouses compound and boundary wall at sunset",
      },
      {
        src: "/images/projects/kingdav-townhouses/gallery-04.webp",
        alt: "Aerial masterplan view of the six townhouse development",
      },
    ],
  },
  {
    slug: "courtyard-townhouses",
    title: "Courtyard Townhouses",
    type: "Residential",
    typeDescription:
      "A four-unit, two-storey townhouse compound designed for modern family life.",
    location: "Ghana",
    status: "Concept design",
    summary:
      "Four identical family homes arranged as a cohesive, functional residential compound.",
    description: [
      "Four two-storey townhouses share a carefully repeated floor plan, creating spatial efficiency and a unified architectural identity across the compound.",
      "Each home places everyday family life at its centre: living and dining areas, an office, guest suite and service spaces occupy the ground floor, while the upper level brings together a family lounge, three bedrooms and a shared balcony.",
    ],
    concept:
      "Consistent planning creates spatial efficiency and a cohesive identity while each home retains complete day-to-day functionality.",
    inspiration:
      "The rhythms of contemporary family life, expressed through repeated white volumes, vertical accents and a shared compound language.",
    planRationale:
      "Repeating one efficient plan aligns service, social and sleeping zones across all four homes; work and guest needs remain below the quieter family level.",
    program: [
      "Four two-storey units",
      "Home office",
      "Guest suite and service quarters",
      "Family lounge",
      "Three upper-floor bedrooms",
    ],
    hero: "/images/projects/courtyard-townhouses/hero.webp",
    plates: [
      {
        src: "/images/projects/courtyard-townhouses/gallery-02.webp",
        alt: "Courtyard Townhouses entrance and parking perspective",
      },
      {
        src: "/images/projects/courtyard-townhouses/gallery-03.webp",
        alt: "Courtyard Townhouses private pool and garden terrace",
      },
    ],
  },
  {
    slug: "legacy-townhouses",
    title: "Legacy Townhouses",
    type: "Residential",
    typeDescription:
      "Four three-storey townhouses conceived as an unbuilt family legacy.",
    location: "Ghana",
    status: "Unbuilt tribute",
    summary:
      "A deeply personal four-unit residence conceived as a tribute to Eugene's late father.",
    description: [
      "Designed for Eugene's father, this unbuilt four-unit townhouse remains one of the portfolio's most personal works. It holds the memory of a shared ambition and the bond they formed through architecture.",
      "Every level is planned for generous family living. Social and service spaces anchor the ground floor, bedroom suites and a family lounge occupy the first floor, and a private penthouse crowns each three-storey unit.",
    ],
    concept:
      "A generous residential composition where layered privacy turns memory, aspiration and personal growth into a family legacy.",
    inspiration:
      "Eugene's late father, the dreams they shared through architecture and the designer's own growth.",
    planRationale:
      "Social and service rooms anchor the ground floor, family bedrooms occupy the first floor, and the penthouse completes the vertical sequence as a private retreat.",
    program: [
      "Four three-storey units",
      "Guest and staff rooms",
      "Family lounge",
      "Three bedroom suites",
      "Private penthouse level",
    ],
    hero: "/images/projects/legacy-townhouses/hero.webp",
    plates: [
      {
        src: "/images/projects/legacy-townhouses/gallery-02.webp",
        alt: "Legacy Townhouses rear elevation study",
      },
      {
        src: "/images/projects/legacy-townhouses/gallery-03.webp",
        alt: "Legacy Townhouses panoramic elevation study",
        fit: "contain",
      },
      {
        src: "/images/projects/legacy-townhouses/gallery-04.webp",
        alt: "Legacy Townhouses ground-floor plan",
        fit: "contain",
      },
      {
        src: "/images/projects/legacy-townhouses/gallery-05.webp",
        alt: "Legacy Townhouses first-floor plan",
        fit: "contain",
      },
      {
        src: "/images/projects/legacy-townhouses/gallery-06.webp",
        alt: "Legacy Townhouses penthouse plan",
        fit: "contain",
      },
    ],
  },
  {
    slug: "executive-residence",
    title: "Executive Residence",
    type: "Residential",
    typeDescription:
      "A bespoke three-storey mansion tailored to executive family life and formal entertaining.",
    location: "Ghana",
    status: "Private residence",
    collaborator: "Angel Ofosu Asante",
    summary:
      "A bespoke three-storey mansion balancing formal entertaining, family life and retreat.",
    description: [
      "Designed with Angel Ofosu Asante for an NPA executive, the residence is conceived as a fully tailored home where luxury is expressed through spatial generosity, material contrast and carefully framed moments of light.",
      "Public rooms, a cinema, office and integrated garage define the ground floor. Four en-suite bedrooms and a family lounge form the private first floor, while a penthouse suite offers a secluded place for rest and long views.",
    ],
    concept:
      "Luxury and comfort are layered through generous social rooms, private family spaces and a secluded penthouse retreat.",
    inspiration:
      "The client's executive lifestyle and the need to unite entertaining, work, cinema, vehicle access and relaxation within one residence.",
    planRationale:
      "Public, work, entertainment and garage functions gather on the ground floor; en-suite bedrooms form the private family level, with the penthouse reserved for retreat and views.",
    program: [
      "Three-storey residence",
      "Cinema and private office",
      "Integrated indoor garage",
      "Four en-suite bedrooms",
      "Penthouse retreat",
    ],
    hero: "/images/projects/executive-residence/hero.webp",
    plates: [
      {
        src: "/images/projects/executive-residence/gallery-02.webp",
        alt: "Executive Residence rear elevation in afternoon light",
      },
      {
        src: "/images/projects/executive-residence/gallery-03.webp",
        alt: "Executive Residence principal elevation at night",
      },
      {
        src: "/images/projects/executive-residence/gallery-04.webp",
        alt: "Executive Residence illuminated pool courtyard",
      },
      {
        src: "/images/projects/executive-residence/gallery-05.webp",
        alt: "Executive Residence architectural floor plan study one",
        fit: "contain",
      },
      {
        src: "/images/projects/executive-residence/gallery-06.webp",
        alt: "Executive Residence architectural floor plan study two",
        fit: "contain",
      },
      {
        src: "/images/projects/executive-residence/gallery-07.webp",
        alt: "Executive Residence architectural floor plan study three",
        fit: "contain",
      },
      {
        src: "/images/projects/executive-residence/gallery-08.webp",
        alt: "Executive Residence pool terrace and water features",
      },
    ],
  },
  {
    slug: "box-and-bar",
    title: "Box & Bar",
    type: "Hospitality",
    typeDescription:
      "A contemporary two-level bar and social venue shaped from modular shipping-container forms.",
    location: "Ghana",
    status: "Concept design",
    summary:
      "A vibrant hospitality space transforming modular container language into an open social destination.",
    description: [
      "Box & Bar is a contemporary hospitality space conceived from the modular character of shipping containers. The design transforms the rigid industrial language of the container into a vibrant social environment through stacking, connection and openness.",
      "The arrangement creates a two-level experience, with the elevated terrace extending the bar and becoming a focal point for social interaction. An external staircase provides direct access to the upper level while forming a prominent architectural feature.",
      "Large glazed openings contrast with the solid container walls, introducing transparency, natural light and a visual connection between inside and outside. The raw character of container architecture is retained within a modern, inviting place for gathering, leisure and community.",
    ],
    concept:
      "Stacking, connection and openness transform a rigid utilitarian container system into a vibrant place for gathering and community.",
    inspiration:
      "The modular logic and raw industrial character of shipping containers, softened by warm timber, transparent glazing and layered evening light.",
    planRationale:
      "The bar anchors the lower level while the elevated terrace expands the social experience above; the external stair makes circulation direct and gives the composition a clear architectural feature.",
    program: [
      "Two-level hospitality venue",
      "Ground-floor bar",
      "Elevated social terrace",
      "External feature staircase",
      "Indoor-outdoor gathering areas",
    ],
    hero: "/images/projects/box-and-bar/hero.webp",
    plates: [
      {
        src: "/images/projects/box-and-bar/gallery-02.webp",
        alt: "Box & Bar upper terrace with timber seating and pergolas",
      },
      {
        src: "/images/projects/box-and-bar/gallery-03.webp",
        alt: "Box & Bar exterior terrace, glazed facade and feature stair at dusk",
      },
      {
        src: "/images/projects/box-and-bar/gallery-04.webp",
        alt: "Box & Bar interior counters and central service island",
      },
      {
        src: "/images/projects/box-and-bar/gallery-05.webp",
        alt: "Box & Bar illuminated interior seating and bar counters",
      },
    ],
  },
  {
    slug: "house-of-god",
    title: "House of God",
    type: "Religious / Institutional",
    typeDescription:
      "An academic church design developed during Eugene's Level 300 studies.",
    location: "Academic work",
    status: "Level 300 study",
    summary:
      "A church study where curved form, Christian symbolism and a clear approach shape the worship experience.",
    description: [
      "Developed during Eugene's Level 300 studies, House of God explores how a place of worship can feel immediately recognizable yet distinctly contemporary.",
      "A curved worship volume, prominent cross and expressive structural gestures give the church a strong identity, while the open forecourt establishes a direct place of arrival and gathering.",
    ],
    concept:
      "A contemporary house of worship whose curved volume, prominent cross and upward-reaching structure give faith a clear architectural expression.",
    inspiration:
      "God is in the details: Christian symbolism expressed through the cross, curved form and upward gesture.",
    planRationale:
      "The direct forecourt approach and dominant worship volume make arrival, identity and collective gathering immediately clear.",
    program: [
      "Primary worship volume",
      "Open forecourt arrival",
      "Cross-marked facade",
      "Curved building form",
      "Upward structural gestures",
    ],
    hero: "/images/projects/house-of-god/hero.webp",
    plates: [
      {
        src: "/images/projects/house-of-god/hero.webp",
        alt: "House of God curved worship facade and landscaped arrival",
      },
      {
        src: "/images/projects/house-of-god/gallery-02.webp",
        alt: "House of God entrance facade with Christian cross",
      },
    ],
  },
  {
    slug: "earth-and-light-bathroom",
    title: "Earth & Light Bathroom",
    type: "Interior",
    typeDescription:
      "A luxury bathroom interior inserted within an existing building.",
    location: "Ghana",
    status: "Interior intervention",
    summary:
      "A warm bathroom interior shaped by earthy materials, sculptural mirrors and layered light.",
    description: [
      "Designed from scratch within an existing building, this bathroom turns a functional room into a calm and immersive interior experience.",
      "Natural tones, timber flooring and soft integrated lighting surround a freestanding bath set on stones. Suspended storage and paired sculptural mirrors keep the composition light, modern and precise.",
    ],
    concept:
      "A modern, bold and future-facing retreat where earthy materials, sculptural fixtures and layered lighting create calm.",
    inspiration:
      "Natural stone, timber, warm ambient light and the spa-like image of a freestanding bath resting on stones.",
    planRationale:
      "Bathing, shower and vanity zones remain distinct but visually connected, supporting easy circulation and making the freestanding tub the experiential focal point.",
    program: [
      "Freestanding bathtub",
      "Walk-in shower",
      "Double vanity",
      "Suspended storage",
      "Integrated ambient lighting",
    ],
    hero: "/images/projects/earth-and-light-bathroom/hero.webp",
    plates: [
      {
        src: "/images/projects/earth-and-light-bathroom/gallery-02.webp",
        alt: "Earth and Light Bathroom storage wall and illuminated mirrors",
      },
      {
        src: "/images/projects/earth-and-light-bathroom/gallery-03.webp",
        alt: "Earth and Light Bathroom double vanity and timber finishes",
      },
      {
        src: "/images/projects/earth-and-light-bathroom/gallery-04.webp",
        alt: "Earth and Light Bathroom sculptural mirrors and basins",
      },
      {
        src: "/images/projects/earth-and-light-bathroom/gallery-05.webp",
        alt: "Earth and Light Bathroom freestanding tub and walk-in shower",
      },
    ],
  },
  {
    slug: "east-legon-renovation",
    title: "East Legon Renovation",
    type: "Residential renovation",
    typeDescription:
      "A residential renovation focused on transforming an existing East Legon home.",
    location: "East Legon, Accra",
    status: "Facade renovation",
    summary:
      "A focused facade intervention giving an existing residence clarity, rhythm and a renewed identity.",
    description: [
      "This renovation began with an existing home that lacked a coherent facade concept. The intervention reorganizes its visual hierarchy through a focused, facade-led response.",
      "Crisp white volumes, charcoal frames, warm timber fins and linear lighting give the residence a more deliberate presence by day and a finely layered character at night.",
    ],
    concept:
      "A restrained modern intervention that gives an unclear facade stronger hierarchy, rhythm and identity.",
    inspiration:
      "The existing structure itself, refined through crisp monochrome volumes, warm vertical timber accents and integrated linear light.",
    planRationale:
      "A facade-first intervention concentrates on entry, depth, shading and boundary definition, giving the existing building a clearer and more cohesive identity.",
    program: [
      "Facade redesign",
      "Entrance definition",
      "Material renewal",
      "Integrated exterior lighting",
      "Boundary wall and gate study",
    ],
    hero: "/images/projects/east-legon-renovation/hero.webp",
    plates: [
      {
        src: "/images/projects/east-legon-renovation/gallery-02.webp",
        alt: "East Legon Renovation front facade and boundary wall by day",
      },
      {
        src: "/images/projects/east-legon-renovation/gallery-03.webp",
        alt: "East Legon Renovation evening facade and entrance view",
      },
    ],
  },
];

const primaryProjectSlugs = ["executive-residence", "box-and-bar"];

export const projects: PortfolioProject[] = [
  ...primaryProjectSlugs.flatMap((slug) =>
    projectCatalog.filter((project) => project.slug === slug),
  ),
  ...projectCatalog.filter(
    (project) => !primaryProjectSlugs.includes(project.slug),
  ),
].map((project, index) => ({
  ...project,
  number: String(index + 1).padStart(2, "0"),
}));

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
