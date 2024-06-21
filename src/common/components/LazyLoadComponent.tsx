import { Box } from '@mui/material';
import React, {
    useState, useEffect, useRef,
} from 'react';

interface LazyLoadComponentProps {
    children: React.ReactNode;
}

export default function LazyLoadComponent({ children }: LazyLoadComponentProps) {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            // Loop over the entries
            entries.forEach(entry => {
                // If the element is visible
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Optional: Stop observing the element after it becomes visible
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.1, // Adjust the "threshold" to when you want it to trigger
        });

        // Start observing the element
        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        // Cleanup function
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            observer.disconnect();
        };
    }, []);

    return (
        <Box height={1} ref={elementRef}>
            {isVisible && children}
        </Box>
    );
}
