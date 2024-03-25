import { NodecosmosTheme } from '../../themes/type';
import { withOpacity } from '../../utils/colors';
import { useTheme } from '@mui/material';
import { useCallback } from 'react';

export enum DiffState {
    Added = 'added',
    Removed = 'removed',
    Edited = 'edited',
    Conflict = 'conflict',
}

export default function useDiffColors() {
    const theme: NodecosmosTheme = useTheme();
    const { diff } = theme.palette;

    return useCallback((isSelected: boolean, state: DiffState, extraOp?: number) => {
        return {
            outlineColor: withOpacity(diff[state].fg, extraOp ? extraOp / 1.5 : 0.3),
            color: diff[state].fg,
            backgroundColor: isSelected
                ? withOpacity(diff[state].bg, extraOp ?? 1)
                : withOpacity(diff[state].bg, extraOp ?? 1),
        };
    }, [diff]);
}
