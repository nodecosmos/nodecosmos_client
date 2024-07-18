import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../../store';
import { ObjectType, UUID } from '../../../../types';
import { selectSelectedObject } from '../../app.selectors';
import { SelectedObject } from '../../app.types';
import { clearSelectedObject } from '../../appSlice';
import { PanePage, PaneProps } from '../../components/pane/Pane';
import { DRAWER_HEIGHT } from '../../constants';
import {
    createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export const PANE_Q = 'pane';

export enum PaneContent {
    Description = 'description',
    Markdown = 'markdown',
    Editor = 'editor',
    Workflow = 'workflow',
    Comments = 'comments',
}

interface CtxCreatorValue {
    page: PanePage;
    rootId: UUID;
    loading: boolean;
    setLoading: () => void;
    unsetLoading: () => void;
    isObjectSelected?: boolean;
    originalObjectTitle?: string;
    content: PaneContent;
    setContent: (content: PaneContent) => void;
    mobilePaneHeight: number | string;
    setMobilePaneHeight: Dispatch<SetStateAction<string | number>>;
}

const PaneContext = createContext<CtxCreatorValue>({} as CtxCreatorValue);

export function usePaneContextCreator(props: PaneProps) {
    const {
        rootId,
        page,
    } = props;
    const dispatch: NodecosmosDispatch = useDispatch();
    const [loading, setLoading, _unsetLoading] = useBooleanStateValue(false);
    const selectedObject = useSelector(selectSelectedObject);
    const [searchParams] = useSearchParams();
    const paneQ = searchParams.get(PANE_Q) as PaneContent;
    const [content, setContent] = useState<PaneContent>(paneQ || PaneContent.Description);
    const [mobilePaneHeight, setMobilePaneHeight] = useState<number | string>(DRAWER_HEIGHT);

    const unsetLoading = useCallback(() => {
        setTimeout(_unsetLoading, 200);
    }, [_unsetLoading]);

    useEffect(() => {
        if (paneQ && paneQ !== content) {
            setContent(paneQ);
        }
    }, [content, paneQ]);

    useEffect(() => {
        return () => {
            dispatch(clearSelectedObject());
        };
    }, [dispatch]);

    return useMemo(() => ({
        PaneContext,
        CtxCreatorValue: {
            page,
            rootId,
            loading,
            setLoading,
            unsetLoading,
            content,
            setContent,
            isObjectSelected: !!selectedObject?.objectId,
            mobilePaneHeight,
            setMobilePaneHeight,
        },
    }), [page, rootId, loading, setLoading, unsetLoading, content, selectedObject, mobilePaneHeight]);
}

type CtxValue = Omit<CtxCreatorValue, 'objectId' | 'branchId' | 'objectNodeId' | 'objectType'> & SelectedObject;
interface PaneCtxValue extends CtxValue {
    mainObjectId: UUID;
}

export function usePaneContext(): PaneCtxValue {
    const {
        page,
        rootId,
        loading,
        setLoading,
        unsetLoading,
        content,
        setContent,
        mobilePaneHeight,
        setMobilePaneHeight,
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

    return useMemo(() => ({
        page,
        rootId,
        loading,
        setLoading,
        unsetLoading,
        content,
        setContent,
        objectId,
        mainObjectId,
        branchId,
        objectNodeId,
        objectType,
        objectTitle,
        originalObjectTitle,
        metadata,
        mobilePaneHeight,
        setMobilePaneHeight,
    }),
    [
        page,
        rootId,
        loading,
        setLoading,
        unsetLoading,
        content,
        setContent,
        objectId,
        mainObjectId,
        branchId,
        objectNodeId,
        objectType,
        objectTitle,
        originalObjectTitle,
        metadata,
        mobilePaneHeight,
        setMobilePaneHeight,
    ]);
}
