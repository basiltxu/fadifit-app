import { useNavigate } from 'react-router';
import {
  Flame, Droplet, Dumbbell, Clock, Check, Weight,
  ArrowLeft, ChevronRight, Star, Plus, Bell, Settings,
} from 'lucide-react';

// ─── Primitive tokens ────────────────────────────────────────────────────────

const colorSwatches = [
  // Backgrounds
  { token: '--background',         tailwind: 'bg-background',        label: 'Background',        hex: '#020B14', group: 'Surface' },
  { token: '--card',               tailwind: 'bg-card',              label: 'Card',              hex: '#081A2A', group: 'Surface' },
  { token: '--secondary',          tailwind: 'bg-secondary',         label: 'Secondary',         hex: '#0D1F2F', group: 'Surface' },
  { token: '--muted',              tailwind: 'bg-muted',             label: 'Muted',             hex: '#0D1F2F', group: 'Surface' },
  // Foregrounds
  { token: '--foreground',         tailwind: 'bg-foreground',        label: 'Foreground',        hex: '#F5F7FA', group: 'Text' },
  { token: '--card-foreground',    tailwind: 'bg-card-foreground',   label: 'Card Text',         hex: '#F5F7FA', group: 'Text' },
  { token: '--muted-foreground',   tailwind: 'bg-muted-foreground',  label: 'Muted Text',        hex: '#9CA3AF', group: 'Text' },
  // Brand
  { token: '--primary',            tailwind: 'bg-primary',           label: 'Primary (Orange)',  hex: '#FF751F', group: 'Brand' },
  { token: '--primary-foreground', tailwind: 'bg-primary-foreground',label: 'Primary Text',      hex: '#FFFFFF', group: 'Brand' },
  { token: '--accent',             tailwind: 'bg-accent',            label: 'Accent (Teal)',     hex: '#06B6D4', group: 'Brand' },
  { token: '--accent-foreground',  tailwind: 'bg-accent-foreground', label: 'Accent Text',       hex: '#FFFFFF', group: 'Brand' },
  // Utility
  { token: '--border',             tailwind: 'bg-border',            label: 'Border',            hex: '#17324A', group: 'Utility' },
  { token: '--destructive',        tailwind: 'bg-destructive',       label: 'Destructive',       hex: '#EF4444', group: 'Utility' },
  // Charts
  { token: '--chart-1',            tailwind: 'bg-chart-1',           label: 'Chart Orange',      hex: '#FF751F', group: 'Chart' },
  { token: '--chart-2',            tailwind: 'bg-chart-2',           label: 'Chart Teal',        hex: '#06B6D4', group: 'Chart' },
  { token: '--chart-3',            tailwind: 'bg-chart-3',           label: 'Chart Blue',        hex: '#3B82F6', group: 'Chart' },
  { token: '--chart-4',            tailwind: 'bg-chart-4',           label: 'Chart Amber',       hex: '#F59E0B', group: 'Chart' },
  { token: '--chart-5',            tailwind: 'bg-chart-5',           label: 'Chart Purple',      hex: '#8B5CF6', group: 'Chart' },
];

const typeScale = [
  { label: 'Display',    size: 'text-3xl',  weight: 'font-bold',     sample: 'Transform Your Body',       desc: '30px / Bold — Hero titles' },
  { label: 'Heading 1',  size: 'text-2xl',  weight: 'font-bold',     sample: 'Good morning, Fadi!',        desc: '24px / Bold — Section heroes' },
  { label: 'Heading 2',  size: 'text-xl',   weight: 'font-bold',     sample: 'Today\'s Workout',           desc: '20px / Bold — Screen headings' },
  { label: 'Heading 3',  size: 'text-[17px]',weight: 'font-bold',    sample: 'Water Intake',               desc: '17px / Bold — Card headings' },
  { label: 'Heading 4',  size: 'text-lg',   weight: 'font-bold',     sample: 'Push Day — Chest & Triceps', desc: '18px / Bold — Card titles' },
  { label: 'Body',       size: 'text-[15px]',weight: 'font-normal',  sample: 'AI-powered plans tailored for you.',desc: '15px / Regular — Body copy' },
  { label: 'Label',      size: 'text-sm',   weight: 'font-medium',   sample: 'Protein · Carbs · Fats',     desc: '14px / Medium — Labels & meta' },
  { label: 'Caption',    size: 'text-xs',   weight: 'font-medium',   sample: 'CALORIES · UPPER BODY',      desc: '12px / Medium — Tags & caps' },
];

// ─── Section wrapper ─────────────────────────────────────────────────────────

function Section({ title, subtitle, children }: {
  title: string; subtitle?: string; children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
      {children}
    </p>
  );
}

// ─── Color swatch ────────────────────────────────────────────────────────────

function ColorSwatch({ token, tailwind, label, hex, group }: typeof colorSwatches[0]) {
  const isLight = group === 'Text' && label.includes('Foreground') && hex === '#F5F7FA';
  const isWhite = hex === '#FFFFFF';
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`${tailwind} h-16 w-full rounded-2xl border border-border shadow-sm`}
        style={isLight || isWhite ? { background: hex } : undefined}
      />
      <div>
        <p className="text-sm font-semibold text-foreground leading-tight">{label}</p>
        <p className="text-xs text-muted-foreground font-mono mt-0.5">{hex}</p>
        <p className="text-[10px] text-muted-foreground/60 font-mono mt-0.5">{token}</p>
      </div>
    </div>
  );
}

// ─── Typography row ──────────────────────────────────────────────────────────

function TypeRow({ label, size, weight, sample, desc }: typeof typeScale[0]) {
  return (
    <div className="flex items-baseline gap-6 py-5 border-b border-border last:border-0">
      <div className="w-24 shrink-0">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{label}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className={`${size} ${weight} text-foreground leading-tight truncate`}>{sample}</p>
      </div>
      <div className="w-52 shrink-0 hidden md:block">
        <p className="text-xs text-muted-foreground font-mono">{desc}</p>
      </div>
    </div>
  );
}

// ─── Demo: WorkoutCard ────────────────────────────────────────────────────────

function DemoWorkoutCard() {
  return (
    <button className="w-full bg-card border border-border rounded-3xl p-6 text-left hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg mb-1.5 tracking-tight group-hover:text-primary transition-colors">
            Push Day — Chest & Triceps
          </h3>
          <p className="text-sm text-muted-foreground font-medium">Upper Body Strength</p>
        </div>
        <div className="bg-accent/10 text-accent px-3 py-1.5 rounded-xl text-xs font-semibold">
          Completed
        </div>
      </div>
      <div className="flex items-center gap-5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-muted/30 rounded-xl flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <span className="font-medium">45 min</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
            <Flame className="w-4 h-4 text-primary" />
          </div>
          <span className="font-medium">6 exercises</span>
        </div>
      </div>
    </button>
  );
}

// ─── Demo: MealCard ───────────────────────────────────────────────────────────

function DemoMealCard() {
  return (
    <button className="w-full bg-card border border-border rounded-3xl p-6 text-left hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg mb-1.5 tracking-tight group-hover:text-primary transition-colors">
            Post-Workout Protein Bowl
          </h3>
          <p className="text-sm text-muted-foreground font-medium">1:00 PM</p>
        </div>
        <div className="bg-accent rounded-2xl p-2">
          <Check className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="text-foreground font-bold text-base">520</span>
          <span className="text-muted-foreground font-medium">kcal</span>
        </div>
        <div className="w-px h-5 bg-border" />
        <div className="flex items-center gap-3 text-muted-foreground font-medium">
          <span>P: 42g</span>
          <span>C: 55g</span>
          <span>F: 12g</span>
        </div>
      </div>
    </button>
  );
}

// ─── Demo: StatCard ───────────────────────────────────────────────────────────

function DemoStatCard({
  icon: Icon, label, value, unit, color = 'text-primary',
}: {
  icon: React.ElementType; label: string; value: string | number;
  unit?: string; color?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-3xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2">
        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
          color === 'text-primary' ? 'bg-primary/10' : 'bg-accent/10'
        }`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
      <div>
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-2xl font-bold tracking-tight">{value}</span>
          {unit && <span className="text-sm text-muted-foreground font-medium">{unit}</span>}
        </div>
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</span>
      </div>
    </div>
  );
}

// ─── Demo: ExerciseListItem ───────────────────────────────────────────────────

function DemoExerciseListItem({ index, name, sets, reps, muscle, weight, bodyweight }: {
  index: number; name: string; sets: number; reps: string;
  muscle: string; weight?: string; bodyweight?: boolean;
}) {
  return (
    <div className="bg-card border border-border rounded-3xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
      <div className="flex gap-4 mb-3">
        <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center shrink-0">
          <span className="text-xl font-bold text-primary">{index}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold mb-1.5 tracking-tight group-hover:text-primary transition-colors">{name}</h4>
          <p className="text-sm text-primary font-semibold mb-1">{sets} sets × {reps}</p>
          <p className="text-xs text-muted-foreground">{muscle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5 bg-muted/30 px-3 py-1.5 rounded-xl">
          {bodyweight ? <span>🏃</span> : <Weight className="w-3.5 h-3.5" />}
          <span className="font-medium text-muted-foreground">{bodyweight ? 'Bodyweight' : 'Weighted'}</span>
        </div>
        {weight && (
          <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-xl">
            <Weight className="w-3.5 h-3.5 text-primary" />
            <span className="font-semibold text-primary">{weight} kg</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Demo: SettingsListItem ───────────────────────────────────────────────────

function DemoSettingsListItem({ icon: Icon, label, value, accent }: {
  icon: React.ElementType; label: string; value?: string; accent?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-border last:border-0">
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
        accent ? 'bg-primary/10' : 'bg-muted/40'
      }`}>
        <Icon className={`w-5 h-5 ${accent ? 'text-primary' : 'text-muted-foreground'}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {value && <p className="text-xs text-muted-foreground mt-0.5">{value}</p>}
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
    </div>
  );
}

// ─── Demo: Buttons ────────────────────────────────────────────────────────────

function DemoButtons() {
  return (
    <div className="flex flex-wrap gap-4 items-start">
      {/* Primary */}
      <button className="bg-gradient-to-r from-primary to-orange-600 text-primary-foreground rounded-2xl px-6 py-4 font-semibold text-[15px] transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-95">
        Start Workout
      </button>
      {/* Secondary / ghost */}
      <button className="bg-card border-2 border-border text-foreground rounded-2xl px-6 py-4 font-semibold text-[15px] hover:border-primary/40 transition-colors">
        Log Progress
      </button>
      {/* Accent */}
      <button className="bg-accent/10 text-accent rounded-2xl px-6 py-4 font-semibold text-[15px] flex items-center gap-2 hover:bg-accent/15 transition-colors">
        <Plus className="w-4 h-4" />
        Add Glass
      </button>
      {/* Destructive */}
      <button className="bg-destructive/10 text-destructive rounded-2xl px-6 py-4 font-semibold text-[15px] hover:bg-destructive/15 transition-colors">
        Delete Account
      </button>
      {/* Disabled */}
      <button className="bg-gradient-to-r from-primary to-orange-600 text-primary-foreground rounded-2xl px-6 py-4 font-semibold text-[15px] opacity-50 cursor-not-allowed">
        Disabled
      </button>
      {/* Icon-only */}
      <button className="w-12 h-12 bg-card border border-border rounded-2xl flex items-center justify-center hover:border-primary/40 transition-colors">
        <Bell className="w-5 h-5 text-muted-foreground" />
      </button>
    </div>
  );
}

// ─── Demo: Chips / badges ─────────────────────────────────────────────────────

function DemoBadges() {
  const items = [
    { label: 'Completed',    bg: 'bg-accent/10',        text: 'text-accent' },
    { label: 'In Progress',  bg: 'bg-primary/10',       text: 'text-primary' },
    { label: 'Strength',     bg: 'bg-muted/40',         text: 'text-foreground' },
    { label: 'Upper Body',   bg: 'bg-secondary',        text: 'text-foreground' },
    { label: 'Failed',       bg: 'bg-destructive/10',   text: 'text-destructive' },
    { label: 'Premium',      bg: 'bg-gradient-to-r from-primary/20 to-accent/20', text: 'text-primary' },
  ];
  return (
    <div className="flex flex-wrap gap-3">
      {items.map(({ label, bg, text }) => (
        <span key={label} className={`${bg} ${text} px-3 py-1.5 rounded-xl text-xs font-semibold`}>
          {label}
        </span>
      ))}
    </div>
  );
}

// ─── Demo: Progress bars ──────────────────────────────────────────────────────

function DemoProgressBars() {
  const bars = [
    { label: 'Weekly Workouts', pct: 72,  color: 'bg-primary', bg: 'bg-primary/10' },
    { label: 'Calories Eaten',  pct: 58,  color: 'bg-accent',  bg: 'bg-accent/10' },
    { label: 'Protein Goal',    pct: 91,  color: 'bg-chart-3', bg: 'bg-chart-3/10' },
    { label: 'Water Intake',    pct: 37,  color: 'bg-chart-4', bg: 'bg-chart-4/10' },
  ];
  return (
    <div className="space-y-5">
      {bars.map(({ label, pct, color, bg }) => (
        <div key={label}>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-foreground">{label}</span>
            <span className="text-sm font-semibold text-muted-foreground">{pct}%</span>
          </div>
          <div className={`h-2.5 w-full rounded-full ${bg}`}>
            <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Demo: Inputs ─────────────────────────────────────────────────────────────

function DemoInputs() {
  return (
    <div className="space-y-4 max-w-sm">
      <div>
        <label className="text-sm font-medium text-foreground block mb-2">Email</label>
        <input
          readOnly
          value="fadi@fadifit.com"
          className="w-full bg-input-background border border-border rounded-2xl px-4 py-3.5 text-sm text-foreground font-normal focus:outline-none focus:ring-2 focus:ring-ring/50 placeholder:text-muted-foreground transition-colors"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground block mb-2">Password</label>
        <input
          readOnly
          type="password"
          value="supersecret"
          className="w-full bg-input-background border border-border rounded-2xl px-4 py-3.5 text-sm text-foreground font-normal focus:outline-none focus:ring-2 focus:ring-ring/50 placeholder:text-muted-foreground transition-colors"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-destructive block mb-2">Email (error state)</label>
        <input
          readOnly
          value="not-an-email"
          className="w-full bg-input-background border border-destructive rounded-2xl px-4 py-3.5 text-sm text-foreground font-normal focus:outline-none focus:ring-2 focus:ring-destructive/30 transition-colors"
        />
        <p className="text-xs text-destructive mt-1.5 font-medium">Enter a valid email address.</p>
      </div>
    </div>
  );
}

// ─── Demo: Welcome hero card ──────────────────────────────────────────────────

function DemoHeroCard() {
  return (
    <div className="bg-gradient-to-br from-primary via-orange-600 to-orange-700 rounded-3xl p-6 text-white shadow-2xl shadow-primary/20 max-w-sm">
      <h2 className="text-2xl font-bold mb-2 tracking-tight">Good morning, Fadi!</h2>
      <p className="text-white/90 mb-5 text-[15px]">Build muscle · Lose fat · Stay consistent</p>
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 w-fit">
        <Star className="w-5 h-5" />
        <span className="font-semibold text-[15px]">72% weekly progress</span>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function DesignSystem() {
  const navigate = useNavigate();
  const colorGroups = [...new Set(colorSwatches.map(s => s.group))];

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header */}
      <div className="bg-card/60 backdrop-blur-xl border-b border-border sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-muted/30 rounded-2xl flex items-center justify-center hover:bg-muted/50 transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground leading-tight">Design System</h1>
            <p className="text-xs text-muted-foreground">FadiFit · Tokens, Typography & Components</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* ── 1. Color Palette ─────────────────────────────────────────────── */}
        <Section
          title="Color Palette"
          subtitle="All semantic color tokens — use Tailwind utility classes, never raw hex values."
        >
          {colorGroups.map(group => (
            <div key={group} className="mb-10">
              <SectionLabel>{group}</SectionLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {colorSwatches.filter(s => s.group === group).map(s => (
                  <ColorSwatch key={s.token} {...s} />
                ))}
              </div>
            </div>
          ))}
        </Section>

        {/* ── 2. Typography Scale ──────────────────────────────────────────── */}
        <Section
          title="Typography Scale"
          subtitle="Font sizes and weights extracted from the UI. No raw pixel values — use Tailwind text-* classes."
        >
          <div className="bg-card border border-border rounded-3xl overflow-hidden">
            {typeScale.map(row => (
              <TypeRow key={row.label} {...row} />
            ))}
          </div>
        </Section>

        {/* ── 3. Component Library ─────────────────────────────────────────── */}
        <Section
          title="Component Library"
          subtitle="Reusable components built exclusively on design tokens."
        >

          {/* Hero card */}
          <div className="mb-10">
            <SectionLabel>Hero Card</SectionLabel>
            <DemoHeroCard />
          </div>

          {/* Buttons */}
          <div className="mb-10">
            <SectionLabel>Buttons</SectionLabel>
            <div className="bg-card border border-border rounded-3xl p-6">
              <DemoButtons />
            </div>
          </div>

          {/* Badges */}
          <div className="mb-10">
            <SectionLabel>Badges &amp; Chips</SectionLabel>
            <div className="bg-card border border-border rounded-3xl p-6">
              <DemoBadges />
            </div>
          </div>

          {/* Stat cards */}
          <div className="mb-10">
            <SectionLabel>Stat Cards</SectionLabel>
            <div className="grid grid-cols-3 gap-4 max-w-lg">
              <DemoStatCard icon={Flame}   label="Calories" value={1840} unit="/2400" color="text-primary" />
              <DemoStatCard icon={Droplet} label="Water"    value={5}    unit="/8 cups" color="text-accent" />
              <DemoStatCard icon={Dumbbell}label="Workouts" value={3}    unit="/5" color="text-primary" />
            </div>
          </div>

          {/* Workout card */}
          <div className="mb-10">
            <SectionLabel>Workout Card</SectionLabel>
            <div className="max-w-sm">
              <DemoWorkoutCard />
            </div>
          </div>

          {/* Meal card */}
          <div className="mb-10">
            <SectionLabel>Meal Card</SectionLabel>
            <div className="max-w-sm">
              <DemoMealCard />
            </div>
          </div>

          {/* Exercise list items */}
          <div className="mb-10">
            <SectionLabel>Exercise List Item</SectionLabel>
            <div className="max-w-sm space-y-3">
              <DemoExerciseListItem index={1} name="Bench Press" sets={4} reps="8–10" muscle="Chest · Triceps" weight="80" />
              <DemoExerciseListItem index={2} name="Push-Up"     sets={3} reps="To failure" muscle="Chest · Shoulders" bodyweight />
            </div>
          </div>

          {/* Settings list items */}
          <div className="mb-10">
            <SectionLabel>Settings List Item</SectionLabel>
            <div className="max-w-sm bg-card border border-border rounded-3xl px-5">
              <DemoSettingsListItem icon={Settings} label="Account Settings" value="Manage your profile" accent />
              <DemoSettingsListItem icon={Bell}     label="Notifications"    value="Push · Email · SMS" />
              <DemoSettingsListItem icon={Star}     label="FadiFit Premium"  value="Active subscription" accent />
            </div>
          </div>

          {/* Progress bars */}
          <div className="mb-10">
            <SectionLabel>Progress Bars</SectionLabel>
            <div className="bg-card border border-border rounded-3xl p-6 max-w-sm">
              <DemoProgressBars />
            </div>
          </div>

          {/* Form inputs */}
          <div className="mb-2">
            <SectionLabel>Form Inputs</SectionLabel>
            <div className="bg-card border border-border rounded-3xl p-6">
              <DemoInputs />
            </div>
          </div>

        </Section>
      </div>
    </div>
  );
}
