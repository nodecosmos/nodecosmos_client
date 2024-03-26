import { selectSelectedObject } from '../../../features/app/app.selectors';
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
}

interface CtxCreatorValue {
    loading: boolean;
    setLoading: () => void;
    unsetLoading: () => void;
    objectId?: UUID;
    branchId?: UUID;
    objectNodeId?: UUID;
    objectType?: ObjectType;
    objectTitle?: string;
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
            ...selectedObject,
        },
    };
}

interface CtxValue extends Omit<CtxCreatorValue, 'objectId' | 'branchId' | 'objectNodeId' | 'objectType'> {
    objectId: UUID;
    branchId: UUID;
    objectNodeId: UUID;
    objectType: ObjectType;
    objectTitle: string;
    originalObjectTitle: string;
}

export function usePaneContext(): CtxValue {
    const {
        loading,
        setLoading,
        unsetLoading,
        objectId,
        branchId,
        objectNodeId,
        objectType,
        content,
        setContent,
        objectTitle,
        originalObjectTitle,
    } = useContext(PaneContext);

    if (!objectId
        || !branchId
        || !objectNodeId
        || !objectType
        || objectTitle === undefined
        || originalObjectTitle === undefined) {
        throw new Error('PaneContext is used outside of PaneContextProvider');
    }

    return {
        loading,
        setLoading,
        unsetLoading,
        objectId,
        branchId,
        objectNodeId,
        objectType,
        objectTitle,
        originalObjectTitle,
        content,
        setContent,
    };
}
