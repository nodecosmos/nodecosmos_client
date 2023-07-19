export default function extractTextFromHtml(html, maxLength = 255) {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(html, 'text/html');
  let text = htmlDoc.body.textContent || '';

  if (text.length > maxLength) {
    text = `${text.substring(0, 252)}...`;
  }

  return text;
}
