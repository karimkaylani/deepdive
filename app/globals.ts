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
    runtime: RuntimeFilter,
    recent: RecentFilter
}

export interface Sort {
    sort: SortAttribute,
    order: SortOrder
}

export enum SortOrder {
    Ascending = "Ascending",
    Descending = "Descending"
}

export enum SortAttribute {
    Title = "Title",
    Creator = "Creator",
    Runtime = "Runtime",
    DatePosted = "Date Posted",
    DateRecommended = "Date Recommended"
}

export enum RuntimeFilter {
    Any = "Any",
    Short = "Short (< 20 minutes)",
    Medium = "Medium (20-45 minutes)",
    Long = "Long (45 minutes +)"
}

export enum RecentFilter {
    Any = "Any",
    Short = "Last 30 Days",
    Medium = "Last 6 Months",
    Long = "Last Year"
}

export const primaryColor = "#eef4ff";
export const secondaryColor = "#174086";