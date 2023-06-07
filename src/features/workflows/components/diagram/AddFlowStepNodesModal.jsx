// import React from 'react';
//
// import Box from '@mui/material/Box';
// import CircularProgress from '@mui/material/CircularProgress';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import IconButton from '@mui/material/IconButton';
// import * as PropTypes from 'prop-types';
// import { Form } from 'react-final-form';
//
// import AddRounded from '@mui/icons-material/AddRounded';
// import CloseOutlined from '@mui/icons-material/CloseOutlined';
// import { useDispatch, useSelector } from 'react-redux';
//
// /* mui */
// import {
//   Button,
//   DialogContent, Typography,
// } from '@mui/material';
// import FinalFormCheckboxTree from '../../../../common/components/final-form/FinalFormCheckboxTree';
// import { setAlert } from '../../../app/appSlice';
// /* nodecosmos */
// import {
//   selectChildIdsByParentId, selectNodesById, selectSelectedNode,
// } from '../../../nodes/nodes.selectors';
//
// // Dumb implementation of import feature
// export default function AddFlowStepNodesModal({
//   rootId, nodeId, open, onClose,
// }) {
//   const [loading, setLoading] = React.useState(false);
//
//   const allNodesById = useSelector(selectNodesById);
//
//   const childIdsByParentId = useSelector(selectChildIdsByParentId(rootId));
//   const childIds = childIdsByParentId[id];
//
//   const dispatch = useDispatch();
//
//   const onSubmit = async (formValues) => {
//
//   };
//
//   const checkboxTreeOptions = [];
//
//   const addCheckboxTreeOptions = (nodeId) => ({
//     value: nodeId,
//     label: allNodesById[nodeId].title,
//     children: childIdsByParentId[nodeId].filter((childId) => childId !== id && childIds.indexOf(childId) < 0)
//       .map((childId) => addCheckboxTreeOptions(childId)),
//   });
//
//   childIdsByParentId[rootId].forEach((childId) => {
//     if (childId === id || childIds.indexOf(childId) >= 0) return;
//     checkboxTreeOptions.push(addCheckboxTreeOptions(childId));
//   });
//
//   return (
//     <Dialog
//       fullWidth
//       maxWidth="sm"
//       onClose={onClose}
//       open={open}
//     >
//       <DialogTitle>
//         <Box display="flex" alignItems="center" justifyContent="center">
//           <Typography
//             align="center"
//             variant="body1"
//             ml={1}
//             fontWeight="bold"
//             sx={{
//               overflow: 'hidden',
//               whiteSpace: 'nowrap',
//               textOverflow: 'ellipsis',
//             }}
//           >
//             Add Flow Step Nodes
//           </Typography>
//         </Box>
//         <IconButton
//           disableRipple
//           onClick={onClose}
//           sx={{
//             position: 'absolute',
//             right: 24,
//             top: 8,
//           }}
//         >
//           <CloseOutlined sx={{ color: 'background.4' }} />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <ImportSearchField />
//         <Box mt={2}>
//           <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
//             {({ handleSubmit }) => (
//               <form style={{ height: '100%' }} onSubmit={handleSubmit}>
//                 <FinalFormCheckboxTree name="importedNodeIds" options={checkboxTreeOptions} />
//                 <Button
//                   sx={{ mt: 3, float: 'right' }}
//                   color="success"
//                   variant="contained"
//                   disableElevation
//                   type="submit"
//                   disabled={loading}
//                   startIcon={loading
//                     ? <CircularProgress size={20} sx={{ color: 'text.foreground' }} /> : <AddRounded />}
//                 >
//                   Import
//                 </Button>
//               </form>
//             )}
//           </Form>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// }
//
// AddFlowStepNodesModal.propTypes = {
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   rootId: PropTypes.string.isRequired,
//   nodeId: PropTypes.string.isRequired,
// };
