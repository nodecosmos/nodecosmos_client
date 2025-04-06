import { ObjectType, UUID } from '../../types';
import { Node } from '../nodes/nodes.types';

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

export const THEME_STRING = ['Dark', 'Dimmed', 'Light'];

export interface Alert {
    isOpen: boolean;
    message: string;
    severity: 'info' | 'warning' | 'error' | 'success';
    isModal?: boolean;
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
        inputIds?: UUID[]; // for selecting inputs on fs node click
        mainObjectId?: UUID;
        ancestorIds?: UUID[];
        flowStepId?: UUID;
        flowStepNodeId?: UUID | null;
        flowStepIndex?: number | null;
        flowId?: UUID | null;
    };
}

export interface AppState {
    headerContent: HeaderContent | null;
    theme: Theme;
    browser: Browser;
    alert: Alert;
    descriptionCoordinates: DescriptionCoordinates;
    isPaneOpen: boolean;
    isPaneLoading: boolean;
    currentNode: Node | null;
    selectedObject: SelectedObject | null;
}
