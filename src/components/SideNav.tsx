interface NavItem {
  id: string;
  label: string;
  number?: string;
}

interface SideNavProps {
  items: NavItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

const SideNav = ({ items, activeId, onSelect }: SideNavProps) => {
  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`w-full text-left px-3 py-2 rounded-md text-sm font-body transition-colors ${
            activeId === item.id
              ? "bg-primary/10 text-primary font-semibold"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {item.number && <span className="text-xs font-bold mr-2 text-primary/60">{item.number}</span>}
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default SideNav;
