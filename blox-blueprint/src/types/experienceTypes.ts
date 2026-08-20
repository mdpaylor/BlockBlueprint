export type Experience = {
    id: number;
    title: string;
}

export type InitialDashboardDto = {
    experiences: ExperienceStructure[];
    experienceData: ExperienceDataDto
}

export type ExperienceStructure = {
    id: number;
    title: string;
}

export type ExperienceDataDto = {
    id: number;
    title: string;
    liveUpdate: LiveUpdate;
    componentCount: number;
    tasksInProgressCount: number;
    plannedUpdatesCount: number;
    usedTagCount: number;
    componentTypeCounts: ComponentType[];
    tasks: TaskBrief[];
    nextUpdate: NextUpdate;
    recentNotes: NoteBrief[];
    topTags: TagBrief[];
}

export type LiveUpdate = {
    id: number;
    version: string;
}

export type ComponentType = {
    type: string;
    count: number;
}

export type TaskBrief = {
    id: number;
    title: string;
    priority: string;
    percentageComplete: number;
}

export type NextUpdate = {
    id: number;
    title: string;
    version: string;
    status: string;
    releaseDate: string;
    taskCount: number;
}

export type NoteBrief = {
    id: number;
    title: string;
    updatedAt: string;
}

export type TagBrief = {
    id: number;
    title: string;
    color: string;
    useCount: number;
}