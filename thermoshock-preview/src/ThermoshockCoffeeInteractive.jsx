import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Thermometer,
  Snowflake,
  Flame,
  Droplets,
  FlaskConical,
  Cherry,
  Coffee,
  Leaf,
  Beaker,
  ChevronRight,
  Info,
  Sparkles,
} from 'lucide-react';

const Card = ({ className = '', children }) => <div className={`card ${className}`}>{children}</div>;
const CardContent = ({ className = '', children }) => <div className={className}>{children}</div>;
const Button = ({ className = '', children, ...props }) => (
  <button type="button" className={`button-reset ${className}`} {...props}>
    {children}
  </button>
);

const steps = [
  {
    id: 1,
    title: 'Select & Prepare',
    icon: Cherry,
    short: 'Only ripe cherries with strong flavour potential are chosen.',
    details:
      'Thermoshock processing starts with strict cherry selection. The coffee is sorted, cleaned, and often sterilised or prepared to reduce unwanted microbes before controlled fermentation begins.',
    tags: ['ripe cherries', 'sorting', 'clean start'],
  },
  {
    id: 2,
    title: '1st Anaerobic Fermentation',
    icon: FlaskConical,
    short: 'Whole cherries ferment without oxygen.',
    details:
      'The sealed, oxygen-limited environment encourages controlled microbial activity. Producers may introduce selected yeast cultures to influence aroma compounds, sweetness, and consistency.',
    tags: ['no oxygen', 'yeast', 'sweetness'],
  },
  {
    id: 3,
    title: 'Pulp & 2nd Fermentation',
    icon: Beaker,
    short: 'The coffee is pulped, then fermented again.',
    details:
      'After pulping, mucilage sugars and pectins remain around the seed. A second fermentation gives those compounds more time to interact with the bean and shape the cup profile.',
    tags: ['pulped', 'mucilage', 'pectins'],
  },
  {
    id: 4,
    title: 'Thermoshock / Bean Sealing',
    icon: Thermometer,
    short: 'Hot-water then cold-water washing creates the thermal contrast.',
    details:
      'In the Wilton Benitez-style method, thermoshock usually refers to washing fermented coffee in hot water, then immediately in cold water. The goal is to stabilise and preserve compounds developed during fermentation.',
    tags: ['hot → cold', 'stabilise', 'aroma'],
  },
  {
    id: 5,
    title: 'Dry & Stabilise',
    icon: Leaf,
    short: 'Coffee dries in a controlled environment to safe moisture.',
    details:
      'The coffee is dried on raised beds, patios, or in greenhouse-style conditions until it reaches a stable moisture target, commonly around 10–12%, before storage, roasting, and brewing.',
    tags: ['drying', '10–12%', 'stability'],
  },
];

const comparison = [
  ['Oxygen during fermentation', 'Removed / controlled', 'Usually present', 'Usually present', 'Usually present'],
  ['Temperature shock', 'Yes: hot → cold', 'No', 'No', 'No'],
  ['Typical profile', 'Sweet, complex, intense', 'Clean, bright', 'Fruity, full-bodied', 'Balanced, sweet'],
  ['Complexity', 'Very high', 'Medium', 'High', 'High'],
  ['Often best as', 'Light roast filter', 'Filter', 'Filter or espresso', 'Filter'],
];

const tasteNotes = [
  { label: 'Enhanced sweetness', icon: Sparkles },
  { label: 'Layered fruit', icon: Cherry },
  { label: 'Improved aroma', icon: Coffee },
  { label: 'Complex acidity', icon: Droplets },
];

export default function ThermoshockCoffeeInteractive() {
  const [activeStep, setActiveStep] = useState(steps[0]);
  const [mode, setMode] = useState('process');

  const ActiveIcon = activeStep.icon;
  const progress = useMemo(() => `${(activeStep.id / steps.length) * 100}%`, [activeStep]);

  return (
    <div className="min-h-screen bg-[#f7efe1] text-[#21170f] p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#fff8eb] to-[#ead9bd] p-6 sm:p-10 shadow-xl"
        >
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#cf6d2d]/20 blur-2xl" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-[#173a2a]/20 blur-2xl" />

          <div className="relative z-10 grid gap-6 md:grid-cols-[1.2fr_.8fr] md:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#173a2a] px-4 py-2 text-sm font-semibold text-[#fff8eb]">
                <Snowflake className="h-4 w-4" />
                <span>Experimental anaerobic processing</span>
                <Flame className="h-4 w-4" />
              </div>
              <h1 className="text-4xl font-black tracking-tight sm:text-6xl">Thermoshock Coffee Processing</h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#4a3423]">
                A controlled fermentation method where coffee is fermented anaerobically, then exposed to a deliberate hot-to-cold washing step to help preserve sweetness, aroma, and complexity.
              </p>
            </div>

            <Card className="rounded-[1.5rem] border-[#d2b98f] bg-white/70 shadow-lg backdrop-blur">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-[#cf6d2d] p-3 text-white">
                    <Info className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-bold">At its core</h2>
                    <p className="text-sm text-[#5e4937]">
                      Thermoshock is not just “cold coffee.” It is a fermentation recipe plus a controlled thermal contrast.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.header>

        <div className="my-5 flex flex-wrap gap-2">
          {['process', 'taste', 'compare'].map((item) => (
            <Button
              key={item}
              onClick={() => setMode(item)}
              className={`rounded-full px-5 py-2 capitalize transition ${
                mode === item ? 'bg-[#173a2a] text-white' : 'bg-white text-[#173a2a] hover:bg-[#efe1c8]'
              }`}
            >
              {item}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {mode === 'process' && (
            <motion.section
              key="process"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]"
            >
              <Card className="rounded-[2rem] border-[#d2b98f] bg-white/80 shadow-lg">
                <CardContent className="p-5">
                  <h2 className="mb-4 text-2xl font-black">Step by step</h2>
                  <div className="mb-4 h-3 overflow-hidden rounded-full bg-[#ead9bd]">
                    <motion.div className="h-full rounded-full bg-[#173a2a]" animate={{ width: progress }} />
                  </div>
                  <div className="grid gap-3">
                    {steps.map((step) => {
                      const Icon = step.icon;
                      const selected = activeStep.id === step.id;
                      return (
                        <button
                          type="button"
                          key={step.id}
                          onClick={() => setActiveStep(step)}
                          className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${
                            selected
                              ? 'border-[#173a2a] bg-[#173a2a] text-white shadow-md'
                              : 'border-[#d2b98f] bg-[#fff8eb] hover:bg-[#efe1c8]'
                          }`}
                        >
                          <span
                            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                              selected ? 'bg-white/20' : 'bg-[#e5c99a]'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="flex-1">
                            <span className="block font-bold">
                              {step.id}. {step.title}
                            </span>
                            <span className={`text-sm ${selected ? 'text-white/80' : 'text-[#5e4937]'}`}>
                              {step.short}
                            </span>
                          </span>
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden rounded-[2rem] border-[#d2b98f] bg-[#fff8eb] shadow-lg">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-[#173a2a] to-[#335a3f] p-7 text-white">
                    <motion.div
                      key={activeStep.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="rounded-3xl bg-white/15 p-4">
                        <ActiveIcon className="h-10 w-10" />
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[.25em] text-white/70">Step {activeStep.id}</p>
                        <h2 className="text-3xl font-black">{activeStep.title}</h2>
                      </div>
                    </motion.div>
                  </div>
                  <motion.div key={`${activeStep.id}-body`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-7">
                    <p className="text-lg leading-relaxed text-[#3d2b1f]">{activeStep.details}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {activeStep.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-[#ead9bd] px-3 py-1 text-sm font-semibold text-[#4a3423]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.section>
          )}

          {mode === 'taste' && (
            <motion.section
              key="taste"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="grid gap-5 md:grid-cols-2"
            >
              {tasteNotes.map((note, idx) => {
                const Icon = note.icon;
                return (
                  <Card key={note.label} className="rounded-[2rem] border-[#d2b98f] bg-white/80 shadow-lg">
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#cf6d2d] text-white">
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="text-2xl font-black">{note.label}</h3>
                      <p className="mt-2 text-[#5e4937]">
                        {idx === 0 &&
                          'Often associated with a more pronounced sweetness, especially when paired with selected yeasts and ripe cherries.'}
                        {idx === 1 &&
                          'Can produce fruit-forward notes such as tropical fruit, berries, wine-like tones, or florals.'}
                        {idx === 2 &&
                          'The process aims to preserve volatile aromatic compounds created during fermentation.'}
                        {idx === 3 &&
                          'Expect a cup that feels expressive and layered rather than simply bright or clean.'}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
              <Card className="rounded-[2rem] border-[#d2b98f] bg-[#173a2a] text-white shadow-lg md:col-span-2">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black">Brew it gently</h3>
                  <p className="mt-2 max-w-3xl text-white/80">
                    Because thermoshock coffees are often heavily processed and highly aromatic, many roasters prefer a lighter roast and filter brewing. A cleaner brew method helps the sweetness, clarity, and layered aromatics stay visible.
                  </p>
                </CardContent>
              </Card>
            </motion.section>
          )}

          {mode === 'compare' && (
            <motion.section key="compare" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <Card className="overflow-hidden rounded-[2rem] border-[#d2b98f] bg-white/80 shadow-lg">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] border-collapse text-left">
                      <thead className="bg-[#173a2a] text-white">
                        <tr>
                          <th className="p-4">Feature</th>
                          <th className="p-4">Thermoshock</th>
                          <th className="p-4">Washed</th>
                          <th className="p-4">Natural</th>
                          <th className="p-4">Honey</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparison.map((row) => (
                          <tr key={row[0]} className="border-b border-[#ead9bd] last:border-0">
                            {row.map((cell, i) => (
                              <td key={cell + i} className={`p-4 ${i === 0 ? 'font-bold' : 'text-[#4a3423]'}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          )}
        </AnimatePresence>

        <footer className="mt-6 rounded-[2rem] bg-[#21170f] p-5 text-center text-sm text-[#fff8eb]/80">
          Thermoshock: controlled fermentation, deliberate temperature contrast, and careful drying — science-driven,
          flavour-focused coffee processing.
        </footer>
      </div>
    </div>
  );
}
