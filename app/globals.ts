export interface Video {
    title: string;
    creator: string;
    genre: string[];
    length: string;
    date: string;
    url: string;
    yearRecommended: string;
    thumbnail: string;
}

export interface Filters {
    search: string,
    genres: string[],
    yearsRecommended: number[],
    runtime: RuntimeFilter
}

export enum RuntimeFilter {
    All = "All",
    Short = "Short",
    Medium = "Medium",
    Long = "Long"
}

export enum RecentFilter {
    All = "All",
    Recent = "Last 30 Days",
    Old = "Old"
}

export const primaryColor = "#eef4ff";
export const secondaryColor = "#174086";