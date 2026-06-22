/**
 * Blog posts — single source of truth for the reading room.
 *
 * First series: "Field notes on building systems" — real lessons (and real
 * mistakes) from the systems Edwinfred has actually shipped. One genuinely
 * good post beats an empty blog; the numbered prefix frames even the first
 * as "the first of something."
 *
 * Each post carries one pull-quote with a single accent word — the place the
 * hand-drawn ink underline draws itself on the post page (once per post).
 */
export interface Post {
  slug: string;
  no: string; // "01"
  title: string;
  summary: string; // one-line index summary
  date: string; // "June 2026"
  dateISO: string;
  tag: string; // one-word margin topic
  readMins: number;
  lead: string; // first paragraph — gets the drop cap
  body: string[]; // paragraphs before the pull-quote
  quote: { lead: string; word: string; trail: string };
  bodyAfter: string[]; // paragraphs after the pull-quote
}

export const SERIES = "Field notes on building systems";

export const posts: Post[] = [
  {
    slug: "what-a-coffee-shop-taught-me",
    no: "01",
    title: "What a coffee shop taught me about building software",
    summary: "A week of watching a restaurant run undid almost everything I assumed.",
    date: "June 2026",
    dateISO: "2026-06-10",
    tag: "Systems",
    readMins: 3,
    lead: "When I started building the system for Wendo, I thought I understood restaurants.",
    body: [
      "I'd eaten in a hundred of them. I had the whole thing mapped in my head — orders go from the table to the kitchen, stock goes down as food goes out, the numbers add up at the end of the night. Clean. Obvious.",
      "So I designed it. Clean and obvious. Then I spent a week standing in an actual restaurant, watching it run.",
      "Almost none of my assumptions survived the week.",
      "Here's one. In my head, an “order” was one thing — you order it, someone makes it, it comes out. But on the floor, a single table is three orders wearing a trench coat. The food goes to the kitchen. The drinks go to the barista station on the other side of the room. And those two stations do not care about each other even a little.",
      "That wasn't even the big miss. The big miss was what was actually slowing them down. I assumed it was writing the order. It wasn't. It was the not-knowing.",
      "A waiter takes an order, walks it to the kitchen, and then has no idea. Is it being made? Is it done? Did anyone start it? So they walk back. And check. And walk back again. Twenty times a night. The whole place ran on people crossing the room to ask “is it ready yet.”",
      "You cannot see that from a chair. You can only see it standing in the corner for six hours, getting in everyone's way.",
      "So I threw out the clean design and built the messy one — the one shaped like the actual room. Orders that split themselves, food one way and drinks the other. A screen at each station so nobody has to walk over to ask.",
    ],
    quote: {
      lead: "The system ",
      word: "already",
      trail: " exists before you write a single line of code. It's just running on paper, and memory, and people walking across rooms.",
    },
    bodyAfter: [
      "Your job isn't to invent a system. It's to see the one that's already there — and the only way to see it is to go stand in the room.",
      "I've never regretted the week I spent watching. I've regretted every system I built without it.",
    ],
  },
  {
    slug: "the-boring-feature-always-wins",
    no: "02",
    title: "The boring feature always wins",
    summary: "I almost spent three months automating the wrong thing.",
    date: "June 2026",
    dateISO: "2026-06-18",
    tag: "Systems",
    readMins: 3,
    lead: "There's a business I work with — a grocery wholesaler in Nyeri. Two shops, a stack of corporate clients, hotels and hospitals buying in bulk on credit.",
    body: [
      "When I sat down with the owner, the exciting problem jumped out right away. She runs everything on WhatsApp. Orders come in on WhatsApp. Invoices go out on WhatsApp. She chases payments on WhatsApp.",
      "So obviously — obviously — the move is to automate WhatsApp. Hook up the API. Let the system send the reminders, take the orders, fire off the invoices. Magic. I got excited. I started scoping it.",
      "And then I almost made the classic mistake: I almost built the impressive thing instead of the useful thing.",
      "Because here's what was actually going on. This woman was running a real, growing business out of her own head. Each client's prices? In her head. Who owed what? Her head. What was in stock at each shop? Her head. Whether the business was even making money? She honestly couldn't tell you.",
      "She wasn't missing automation. She was missing a backup of her own brain.",
      "The WhatsApp robot was the shiny object. The gold was the most boring software you can picture: a list of clients. A number next to each one for what they owe. A button that makes an invoice. A screen that shows what's in stock. A ledger. I was about to skip the ledger to go build a robot.",
      "So I stopped and built the boring stuff first. The WhatsApp “automation”? In version one it's a button that writes the message so she can paste it in herself. Took an afternoon. No API, no three months. And it does about ninety percent of what the fancy version would've — because the hard part was never sending the message. It was knowing who to send it to and what it should say.",
    ],
    quote: {
      lead: "The exciting feature and the ",
      word: "valuable",
      trail: " feature are almost never the same feature.",
    },
    bodyAfter: [
      "The exciting one demos well. The valuable one is usually a list, a number, and a button — something so unglamorous you're a little embarrassed to call it the centerpiece.",
      "Build the embarrassing version first. Ship the ledger. You can always add the robot later — and half the time, once people have the ledger, they stop asking for the robot.",
      "The boring feature wins. It just never gets to give the cool demo.",
    ],
  },
];

export const getPost = (slug: string): Post | undefined =>
  posts.find((p) => p.slug === slug);
