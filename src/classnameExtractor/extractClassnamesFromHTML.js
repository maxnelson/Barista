export const extractClassnamesFromHTML = (content, classNames) => {
  const classRegex = /class=["']([^"']+)["']/g;
  let match;
  while ((match = classRegex.exec(content)) !== null) {
    match[1].split(/\s+/).forEach((cls) => classNames.add(cls));
  }
};
