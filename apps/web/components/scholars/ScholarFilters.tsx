"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Filters {
    school: string;
    era: string;
    region: string;
}

interface ScholarFiltersProps {
    filters: Filters;
    setFilters: (filters: Filters) => void;
    schools: string[];
    eras: string[];
    regions: string[];
}

export function ScholarFilters({
    filters,
    setFilters,
    schools,
    eras,
    regions
}: ScholarFiltersProps) {

    const updateFilter = (key: keyof Filters, value: string) => {
        setFilters({ ...filters, [key]: value });
    };

    return (
        <div className="flex flex-wrap gap-4 mb-8 p-4 bg-muted/30 rounded-lg border border-border/50">
            <div className="flex-1 min-w-[200px] space-y-2">
                <Label>Fiqh School</Label>
                <Select
                    value={filters.school}
                    onValueChange={(val) => updateFilter('school', val)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select School" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Schools</SelectItem>
                        {schools.map(school => (
                            <SelectItem key={school} value={school}>{school}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex-1 min-w-[200px] space-y-2">
                <Label>Era</Label>
                <Select
                    value={filters.era}
                    onValueChange={(val) => updateFilter('era', val)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Era" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Eras</SelectItem>
                        {eras.map(era => (
                            <SelectItem key={era} value={era}>{era}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex-1 min-w-[200px] space-y-2">
                <Label>Region</Label>
                <Select
                    value={filters.region}
                    onValueChange={(val) => updateFilter('region', val)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Regions</SelectItem>
                        {regions.map(region => (
                            <SelectItem key={region} value={region}>{region}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
