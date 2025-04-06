import Loader from '../../../../../common/components/Loader';
import { ObjectType } from '../../../../../types';
import { selectBranch } from '../../../../branch/branches.selectors';
import { maybeSelectDescription } from '../../../../descriptions/descriptions.selectors';
import useDescription from '../../../../descriptions/hooks/useDescription';
import NodePaneCoverImage from '../../../../nodes/components/cover/NodePaneCoverImage';
import { useIsAuthorized } from '../../../../nodes/hooks/node/useAuthorizeNodeAction';
import { selectTheme } from '../../../app.selectors';
import { PaneContent, usePaneContext } from '../../../hooks/pane/usePaneContext';
import useTogglePane from '../../../hooks/pane/useTogglePane';
import { faEdit } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import React, {
    useCallback, useEffect, useMemo,
} from 'react';
import { useSelector } from 'react-redux';

let HLJS: typeof import('highlight.js') | null = null;

export default function PaneDescription() {
    const {
        mainObjectId: objectId,
        branchId,
        objectType,
        isPaneLoading,
        loading,
        originalObjectTitle,
        objectTitle,
    } = usePaneContext();
    const [fetched] = useDescription();
    const description = useSelector(maybeSelectDescription(branchId, objectId));
    const innerHTML = useMemo(() => (
        { __html: ((description && description.html) || null) as TrustedHTML }
    ), [description]);
    const isEmpty = !description || description?.html === '<p></p>';
    const theme = useSelector(selectTheme);

    useEffect(() => {
        if (loading) {
            return;
        }
        setTimeout(async () => {
            const codeBlocks = document.getElementsByTagName('pre');

            if (codeBlocks.length > 0) {
                HLJS ||= await import('highlight.js');
                HLJS.default.configure({
                    languages: [
                        'javascript',
                        'typescript',
                        'json',
                        'shell',
                        'html',
                        'xml',
                        'css',
                        'scss',
                        'less',
                        'yaml',
                        'markdown',
                        'sql',
                        'cql',
                        'graphql',
                        'python',
                        'java',
                        'c',
                        'cpp',
                        'csharp',
                        'ruby',
                        'perl',
                        'go',
                        'rust',
                        'swift',
                        'kotlin',
                        'groovy',
                        'scala',
                        'r',
                        'dart',
                        'haskell',
                        'lua',
                        'powershell',
                        'plaintext',
                    ],
                });

                Array.from(codeBlocks).forEach((pre) => {
                    HLJS!.default.highlightBlock(pre);
                });
            }
        }, 10);
    }, [description, loading, theme]);
    const branch = useSelector(selectBranch(branchId));
    const isTitleEdited = useMemo(() => {
        if (!branch) {
            return false;
        }

        const {
            editedTitleNodes, editedTitleFlows, editedTitleIos,
        } = branch;

        return (
            editedTitleNodes.has(objectId)
            || editedTitleFlows.has(objectId)
            || editedTitleIos.has(objectId)) && originalObjectTitle && objectTitle !== originalObjectTitle;
    }, [branch, objectId, objectTitle, originalObjectTitle]);
    const isAuthorized = useIsAuthorized();
    const handleTogglePane = useTogglePane();
    const toggleEditDescription = useCallback(() => {
        handleTogglePane(PaneContent.Editor);
    }, [handleTogglePane]);

    if (loading || isPaneLoading || !fetched) {
        return <Loader />;
    }

    return (
        <div className="DescriptionHTML px-4 pb-4 display-flex justify-center flex-column">
            {objectType === ObjectType.Node && <NodePaneCoverImage />}
            <div className="display-flex justify-center">
                <h1 className="size-850 mt-2 w-100 ObjectTitle">
                    {isTitleEdited && <span className="diff-removed">{originalObjectTitle}</span>}

                    <span className={isTitleEdited ? 'diff-added' : undefined}>{objectTitle}</span>
                </h1>
            </div>

            {
                !isEmpty && (
                    <div className="display-flex justify-center">
                        <div className="size-850 fs-18 w-100" dangerouslySetInnerHTML={innerHTML} />
                    </div>
                )
            }
            {
                isEmpty && (
                    <div className="display-flex justify-center">
                        <div className="size-850 w-100">
                            {isAuthorized ? (
                                <Button
                                    onClick={toggleEditDescription}
                                    startIcon={<FontAwesomeIcon icon={faEdit} />}
                                    className="text-center mt-1 text-tertiary bold"
                                    color="buttonContrast"
                                    size="large">
                                    Add Description
                                </Button>
                            ) : (
                                <>
                                    <span className="bold text-tertiary fs-16">
                                        Selected object has no description.
                                    </span>
                                </>
                            ) }
                        </div>
                    </div>
                )
            }
        </div>
    );
}
