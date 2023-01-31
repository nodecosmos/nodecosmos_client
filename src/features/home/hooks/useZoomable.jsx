// /* eslint-disable no-shadow */
// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { setScrollEnabled } from '../../app/appSlice';
//
// const MINIMUM_ZOOM = 0.5;
//
// // zoom on ctrl + mouse wheel up
// // zoom on pinch
// export default function useZoomable(ref, defaultZoom, setPan, pan) {
//   const [zoom, setZoom] = React.useState(defaultZoom);
//   const [isZooming, setIsZooming] = React.useState(false);
//   const dispatch = useDispatch();
//
//   // handle zoom on mouse wheel up and alt key
//   const handleWheel = (event) => {
//     event.stopPropagation();
//     if (event.altKey) {
//       const { deltaY } = event;
//       const newZoom = zoom + deltaY * -0.001;
//       setZoom(newZoom < MINIMUM_ZOOM ? MINIMUM_ZOOM : newZoom);
//     }
//   };
//
//   const enableScroll = () => {
//     dispatch(setScrollEnabled(true));
//   };
//
//   // handle svg mobile zoom on pinch
//   const handleTouchStart = (event) => {
//     if (event.touches.length !== 2) return;
//     event.preventDefault();
//     event.stopPropagation();
//
//     // handle zoom and pan on pinch
//     const touch1 = event.touches[0];
//     const touch2 = event.touches[1];
//
//     const x1 = touch1.clientX;
//     const y1 = touch1.clientY;
//     const x2 = touch2.clientX;
//     const y2 = touch2.clientY;
//
//     const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
//     const center = {
//       x: (x1 + x2) / 2,
//       y: (y1 + y2) / 2,
//     };
//
//     const handleTouchMove = (event) => {
//       if (event.touches.length !== 2) return;
//       event.preventDefault();
//       event.stopPropagation();
//
//       // handle zoom and pan on pinch
//       const touch1 = event.touches[0];
//       const touch2 = event.touches[1];
//
//       const x1 = touch1.clientX;
//       const y1 = touch1.clientY;
//       const x2 = touch2.clientX;
//       const y2 = touch2.clientY;
//
//       const newDistance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
//       const newCenter = {
//         x: (x1 + x2) / 2,
//         y: (y1 + y2) / 2,
//       };
//
//       const newZoom = newDistance / distance * zoom;
//       setZoom(newZoom < MINIMUM_ZOOM ? MINIMUM_ZOOM : newZoom);
//
//       // const newPan = {
//       //   x: pan.x + (newCenter.x - center.x),
//       //   y: pan.y + (newCenter.y - center.y),
//       // };
//       // setPan(newPan);
//     };
//
//     const handleTouchEnd = () => {
//       setIsZooming(false);
//       window.removeEventListener('touchmove', handleTouchMove);
//       window.removeEventListener('touchend', handleTouchEnd);
//     };
//
//     setIsZooming(true);
//     window.addEventListener('touchmove', handleTouchMove);
//     window.addEventListener('touchend', handleTouchEnd);
//   };
//
//   return {
//     zoom,
//     isZooming,
//     handleTouchStart,
//     handleWheel,
//     enableScroll,
//   };
// }
