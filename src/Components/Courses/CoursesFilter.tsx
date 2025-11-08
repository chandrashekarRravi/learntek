import { Search, Filter, ChevronRight } from "lucide-react";
import Button from "@/Components/mui/Button";
import TextField from '@mui/material/TextField';

interface CoursesFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterByDay: () => void;
  onFilterByFaculty: () => void;
  onClearFilters: () => void;
}

export const CoursesFilter = ({
  searchQuery,
  onSearchChange,
  onFilterByDay,
  onFilterByFaculty,
  onClearFilters,
}: CoursesFilterProps) => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg bg-card">
        <Filter className="w-4 h-4 text-foreground" />
        <span className="text-sm font-medium text-foreground">Filters</span>
      </div>

      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <TextField
          placeholder="Search by Name"
          size="small"
          fullWidth
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{ className: 'pl-9 pr-4' }}
        />
      </div>

      <Button variant="outline" className="gap-2">
        Filter by day
        <ChevronRight className="w-4 h-4" />
      </Button>

      <Button variant="outline" className="gap-2">
        Filter by faculty
        <ChevronRight className="w-4 h-4" />
      </Button>

      <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
        Clear
      </Button>
    </div>
  );
};
