import { ObjectType, UUID } from '../../types';

export enum HeaderContent {
    NodeIndexHeader = 'NodeIndexHeader',
    TreeShowHeader = 'TreeShowHeader',
    ContributionRequestShowHeader = 'ContributionRequestShowHeader',
}

export enum Theme {
    Dark,
    Dimmed,
    Light,
}

export interface Alert {
    isOpen: boolean;
    message: string;
    severity: 'info' | 'warning' | 'error' | 'success';
}

// TODO: remove this once we get rid of current landing page
export interface DescriptionCoordinates {
    x: number;
    y: number;
}

export enum Browser {
    Chrome = 'Chrome',
    Firefox = 'Firefox',
    Safari = 'Safari',
    Opera = 'Opera',
    Edge = 'Edge',
    Unknown = 'Unknown',
}

export interface SelectedObject {
    objectId: UUID;
    branchId: UUID;
    objectNodeId: UUID;
    objectType: ObjectType;
    objectTitle: string;
    originalObjectTitle: string;
    metadata?: {
        isTmp?: boolean;
        flowStepId?: UUID;
        inputIds?: UUID[]; // for selecting inputs on fs node click
        mainObjectId?: UUID;
        ancestorIds?: UUID[];
        flowStepNodeId?: UUID | null;
    };
}

export interface AppState {
    headerContent?: HeaderContent;
    theme: Theme;
    currentNodeId: string | null;
    browser: Browser;
    alert: Alert;
    descriptionCoordinates: DescriptionCoordinates;
    isPaneOpen: boolean;
    selectedObject: SelectedObject | null;
}
