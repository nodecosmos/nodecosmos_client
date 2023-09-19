export function base64ToUint8Array(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function uint8ArrayToBase64(buffer) {
  let binary = '';
  const len = buffer.byteLength;
  for (let i = 0; i < len; i += 1) {
    binary += String.fromCharCode(buffer[i]);
  }
  return window.btoa(binary);
}
