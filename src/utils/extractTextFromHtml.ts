export default function extractTextFromHtml(html: string, maxLength = 255) {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(html, 'text/html');

    // Remove heading elements (h1, h2, h3)
    const headings = htmlDoc.querySelectorAll('h1, h2, h3');
    headings.forEach((heading) => {
        heading.remove();
    });

    // get content of first paragraph
    const firstParagraph = htmlDoc.querySelector('p');
    let text = firstParagraph?.textContent || '';

    if (text.length > maxLength) {
        text = `${text.substring(0, maxLength - 3)}...`;
    }

    return text;
}
