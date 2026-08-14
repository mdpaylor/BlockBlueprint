import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function DashboardSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleSearchShortcut(event: KeyboardEvent) {
      const searchShortcut =
        (event.ctrlKey || event.metaKey) && event.key === "k";
      if (searchShortcut) {
        event.preventDefault();
        inputRef.current?.focus();
      }

      if (event.key === "Escape") {
        inputRef.current?.blur();
      }
    }

    window.addEventListener("keydown", handleSearchShortcut);

    return () => {
      window.removeEventListener("keydown", handleSearchShortcut);
    };
  }, []);

  return (
    <div className="dashboard-search" onClick={() => inputRef.current?.focus()}>
      <Search size={18} />

      <input
        ref={inputRef}
        type="search"
        placeholder="Search anything..."
        value={searchTerm}
        aria-label="Search dashboard"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <kbd>Ctrl K</kbd>
    </div>
  );
}

export default DashboardSearch;
