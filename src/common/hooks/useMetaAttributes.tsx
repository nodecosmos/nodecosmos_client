import { useEffect } from 'react';

interface MetaProps {
    title?: string;
    description?: string | null;
    image?: string | null;
}

const META_TITLE = 'Innovation Collaboration Platform';
const META_DESCRIPTION = `Nodecosmos is designed as a collaborative space for innovation development,
                          research projects, and knowledge sharing. It is built with the spirit of
                          open-source at its core as it enables free public collaboration in structured
                          manner adopted from open-source software development.`;
const META_IMAGE = 'https://nodecosmos.com/logo.webp';

export default function useMetaAttributes(props: MetaProps) {
    const {
        title, description, image,
    } = props;

    useEffect(() => {
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
            element.setAttribute('content', description || META_DESCRIPTION);
        });
    }, [description]);

    useEffect(() => {
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
            element.setAttribute('content', title || META_TITLE);
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
            element.setAttribute('content', image || META_IMAGE);
        });
    }, [image]);
}
