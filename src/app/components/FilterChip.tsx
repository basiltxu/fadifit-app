interface FilterChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function FilterChip({ label, selected, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-5 py-2.5 rounded-2xl
        font-semibold text-[15px]
        transition-all whitespace-nowrap
        ${
          selected
            ? 'bg-gradient-to-r from-primary to-orange-600 text-white shadow-md shadow-primary/20'
            : 'bg-card border border-border text-foreground hover:border-primary/50'
        }
      `}
    >
      {label}
    </button>
  );
}