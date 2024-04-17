import { selectSelectedObject } from '../../../features/app/app.selectors';
import { SelectedObject } from '../../../features/app/app.types';
import { ObjectType, UUID } from '../../../types';
import useBooleanStateValue from '../useBooleanStateValue';
import {
    createContext, useCallback, useContext, useState,
} from 'react';
import { useSelector } from 'react-redux';

export enum PaneContent {
    Description,
    Markdown,
    Editor,
    Workflow,
}

interface CtxCreatorValue {
    loading: boolean;
    setLoading: () => void;
    unsetLoading: () => void;
    isObjectSelected?: boolean;
    originalObjectTitle?: string;
    content: PaneContent;
    setContent: (content: PaneContent) => void;
}

const PaneContext = createContext<CtxCreatorValue>({} as CtxCreatorValue);

export function usePaneContextCreator() {
    const [loading, setLoading, _unsetLoading] = useBooleanStateValue();
    const [content, setContent] = useState<PaneContent>(PaneContent.Description);
    const selectedObject = useSelector(selectSelectedObject);

    const unsetLoading = useCallback(() => {
        setTimeout(_unsetLoading, 200);
    }, [_unsetLoading]);

    return {
        PaneContext,
        CtxCreatorValue: {
            loading,
            setLoading,
            unsetLoading,
            content,
            setContent,
            isObjectSelected: !!selectedObject?.objectId,
        },
    };
}

type CtxValue = Omit<CtxCreatorValue, 'objectId' | 'branchId' | 'objectNodeId' | 'objectType'> & SelectedObject;
interface PaneCtxValue extends CtxValue {
    mainObjectId: UUID;
}

export function usePaneContext(): PaneCtxValue {
    const {
        loading,
        setLoading,
        unsetLoading,
        content,
        setContent,
    } = useContext(PaneContext);
    const selectedObject = useSelector(selectSelectedObject);

    if (!selectedObject) {
        throw new Error('usePaneContext must be used within a PaneContextProvider');
    }

    const {
        objectId,
        branchId,
        objectNodeId,
        objectType,
        objectTitle,
        originalObjectTitle,
        metadata,
    } = selectedObject;

    let mainObjectId = objectId;

    // For IO, we need to use mainObjectId
    if (objectType === ObjectType.Io) {
        if (!metadata || !metadata.mainObjectId) {
            throw new Error('Io object must have mainObjectId in metadata');
        }

        mainObjectId = metadata.mainObjectId;
    }

    return {
        loading,
        setLoading,
        unsetLoading,
        content,
        setContent,
        // selectedObject
        objectId,
        mainObjectId,
        branchId,
        objectNodeId,
        objectType,
        objectTitle,
        originalObjectTitle,
        metadata,
    };
}
