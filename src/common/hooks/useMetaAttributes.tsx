import { useEffect } from 'react';

interface MetaProps {
    title?: string;
    description?: string | null;
    image?: string | null;
}

export default function useMetaAttributes(props: MetaProps) {
    const {
        title, description, image,
    } = props;

    useEffect(() => {
        if (!description) return;

        // Define the meta tags you want to update
        const descTagsToUpdate = [
            {
                name: 'description',
                property: false,
            },
            {
                name: 'og:description',
                property: true,
            },
            {
                name: 'twitter:description',
                property: true,
            },
        ];

        descTagsToUpdate.forEach(tag => {
            let element = document.head.querySelector(
                `${tag.property ? 'meta[property="' : 'meta[name="'}${tag.name}"]`,
            );
            if (!element) {
                element = document.createElement('meta');
                if (tag.property) {
                    element.setAttribute('property', tag.name);
                } else {
                    element.setAttribute('name', tag.name);
                }
                document.head.appendChild(element);
            }
            element.setAttribute('content', description);
        });
    }, [description]);

    useEffect(() => {
        if (!title) return;

        const titleTagsToUpdate = [
            {
                name: 'title',
                property: false,
            },
            {
                name: 'og:title',
                property: true,
            },
            {
                name: 'twitter:title',
                property: true,
            },
        ];

        titleTagsToUpdate.forEach(tag => {
            let element = document.head.querySelector(
                `${tag.property ? 'meta[property="' : 'meta[name="'}${tag.name}"]`,
            );
            if (!element) {
                element = document.createElement('meta');
                if (tag.property) {
                    element.setAttribute('property', tag.name);
                } else {
                    element.setAttribute('name', tag.name);
                }
                document.head.appendChild(element);
            }
            element.setAttribute('content', title);
        });
    }, [title]);

    useEffect(() => {
        const urlTagsToUpdate = [
            {
                name: 'og:url',
                property: true,
            },
            {
                name: 'twitter:url',
                property: true,
            },
        ];

        urlTagsToUpdate.forEach(tag => {
            let element = document.head.querySelector(
                `${tag.property ? 'meta[property="' : 'meta[name="'}${tag.name}"]`,
            );
            if (!element) {
                element = document.createElement('meta');
                if (tag.property) {
                    element.setAttribute('property', tag.name);
                } else {
                    element.setAttribute('name', tag.name);
                }
                document.head.appendChild(element);
            }
            element.setAttribute('content', window.location.href);
        });
    }, []);

    useEffect(() => {
        if (!image) return;

        const imageTagsToUpdate = [
            {
                name: 'og:image',
                property: true,
            },
            {
                name: 'twitter:image',
                property: true,
            },
        ];

        imageTagsToUpdate.forEach(tag => {
            let element = document.head.querySelector(
                `${tag.property ? 'meta[property="' : 'meta[name="'}${tag.name}"]`,
            );
            if (!element) {
                element = document.createElement('meta');
                if (tag.property) {
                    element.setAttribute('property', tag.name);
                } else {
                    element.setAttribute('name', tag.name);
                }
                document.head.appendChild(element);
            }
            element.setAttribute('content', image);
        });
    }, [image]);
}
