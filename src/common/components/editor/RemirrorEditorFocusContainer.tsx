// import useIsMobile from '../../../features/app/hooks/useIsMobile';
// import { RemirrorExtensions } from '../../hooks/editor/useYDoc';
// import { useCommands, useEditorFocus } from '@remirror/react';
// import React, { ReactNode, useCallback } from 'react';
//
// interface RemirrorClickableProps {
//     children: ReactNode;
// }
//
// export default function EditorFocusContainer({ children }: RemirrorClickableProps) {
//     const [isFocused] = useEditorFocus();
//     const commands = useCommands<RemirrorExtensions>();
//     const isMobile = useIsMobile();
//
//     const handleClick = useCallback(() => {
//         if (!isFocused && !isMobile) {
//             commands.focus();
//         }
//     }, [commands, isFocused, isMobile]);
//
//     return (
//         <div className="TextEditor" onClick={handleClick}>
//             {children}
//         </div>
//     );
// }
