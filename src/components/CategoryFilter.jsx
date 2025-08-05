export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <select value={selected} onChange={(e) => onSelect(e.target.value)}>
      <option value="">All</option>
      {categories.map((cat, idx) => (
        <option key={idx} value={cat}>{cat}</option>
      ))}
    </select>
  );
}
