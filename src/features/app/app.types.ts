import { UUID } from '../../types';

export enum HeaderContent {
    NodeIndexHeader = 'NodeIndexHeader',
    TreeShowHeader = 'TreeShowHeader',
    ContributionRequestShowHeader = 'ContributionRequestShowHeader',
}

export enum Theme {
    Light = 'light',
    Dimmed = 'dimmed',
    Dark = 'dark',
}

export interface Alert {
    isOpen: boolean;
    message: string;
    severity: 'info' | 'warning' | 'error' | 'success';
    anchorOrigin: {
        vertical: 'top' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
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

export interface TransformablePositions {
    id: UUID;
    clientHeight: number;
    clientWidth: number;
    scrollTop: number;
    scrollLeft: number;
}

export interface AppState {
    headerContent?: HeaderContent;
    theme: Theme;
    transformablePositionsById: Record<UUID, TransformablePositions>;
    currentNodeId: string | null;
    browser: Browser;
    alert: Alert;
    descriptionCoordinates: DescriptionCoordinates;
    isPaneOpen: boolean;
}
