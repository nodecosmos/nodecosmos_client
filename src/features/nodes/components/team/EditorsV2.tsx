import Loader from '../../../../common/components/Loader';
import NcAvatar from '../../../../common/components/NcAvatar';
import { NodecosmosDispatch } from '../../../../store';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { selectUsersByIds } from '../../../users/users.selectors';
import { ShowUser } from '../../../users/users.types';
import { maybeSelectNode } from '../../nodes.selectors';
import { getEditors } from '../../nodes.thunks';
import { faMagnifyingGlass } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Chip, InputAdornment, Link, TextField, Typography,
} from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import { GridRowsProp } from '@mui/x-data-grid/models/gridRows';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

export default function EditorsV2() {
    const { branchId, nodeId } = useBranchContext();
    const node = useSelector(maybeSelectNode(branchId, nodeId));
    const [fetched, setFetched] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const editors = useSelector(selectUsersByIds(Array.from(node?.editorIds || [])));

    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }, []);

    useEffect(() => {
        if (!fetched && node) {
            dispatch(getEditors({
                branchId,
                id: nodeId,
            })).then(() => setFetched(true));
        }
    }, [branchId, dispatch, fetched, node, nodeId]);

    if (!fetched) {
        return <Loader />;
    }

    if (!node) {
        return null;
    }

    const columns: GridColDef<ShowUser>[] = [
        {
            headerName: '',
            field: '',
            flex: 0,
            renderCell: (params: GridRenderCellParams<ShowUser, ShowUser>) => {
                return <NcAvatar
                    size={30}
                    fontSize={18}
                    name={params.row.username}
                    src={params.row.profileImageUrl} />;
            },
        },
        {
            headerName: 'Username',
            field: 'username',
            flex: 0.5,
            minWidth: 150,
            renderCell: (params: GridRenderCellParams<ShowUser, string>) => {
                return (
                    <Link component={RouterLink} to={`/${params.value}`}>
                        <Box display="flex" alignItems="center">
                            <Typography variant="body2" color="text.link" px={2} fontWeight="bold">
                                @{params.value}
                            </Typography>
                        </Box>
                    </Link>
                );
            },
        },
        {
            field: 'firstName',
            minWidth: 150,
            flex: 0.5,
            headerName: 'First Name',
            renderCell: (params: GridRenderCellParams<ShowUser, string>) => {
                return (
                    <Typography variant="body2" color="text.secondary" px={2} fontWeight="bold">
                        {params.value}
                    </Typography>
                );
            },
        },
        {
            field: 'lastName',
            minWidth: 150,
            flex: 0.5,
            headerName: 'Last Name',
            renderCell: (params: GridRenderCellParams<ShowUser, string>) => {
                return (
                    <Typography variant="body2" color="text.secondary" px={2} fontWeight="bold">
                        {params.value}
                    </Typography>
                );
            },
        },
        {
            field: 'createdAt',
            minWidth: 200,
            flex: 1,
            headerName: 'Joined Platform',
            type: 'dateTime',
            valueGetter: (params: string) => {
                return new Date(params);
            },
        },
    ];

    const rows: GridRowsProp<ShowUser> = editors;

    return (
        <Box borderBottom={1} borderColor="borders.3">
            <Box
                display="flex"
                py={2}
                flex={0}
                top={0}
                zIndex={1}>
                <Typography fontWeight="bold" color="text.secondary" px={4}>
                    Editors
                    <Chip
                        component="span"
                        color="button"
                        label={node.editorIds?.size || '0'}
                        size="small"
                        sx={{ ml: 1 }} />
                </Typography>
                <TextField
                    sx={{
                        height: 32,
                        width: '350px',
                        svg: { color: 'toolbar.default' },
                        '.MuiInputBase-root': {
                            borderRadius: 1,
                            borderColor: 'transparent',
                            height: 1,
                        },
                    }}
                    InputProps={{
                        name: 'customSearch',
                        autoComplete: 'off',
                        startAdornment: (
                            <InputAdornment position="start" sx={{ mr: 2 }}>
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                />
                            </InputAdornment>
                        ),
                    }}
                    color="primary"
                    variant="outlined"
                    placeholder="Search"
                    onChange={handleSearch}
                />
            </Box>

            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: { paginationModel: { pageSize: 25 } },
                    sorting: {
                        sortModel: [
                            {
                                field: 'username',
                                sort: 'asc',
                            },
                        ],
                    },
                }}
                checkboxSelection={false}
                rowSelection={false}
                disableColumnMenu
                columnHeaderHeight={48}
                rowHeight={48}
                filterModel={
                    {
                        items: [],
                        quickFilterValues: [searchTerm],
                    }
                }
            />
        </Box>
    );
}
