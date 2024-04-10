export const populate = (content: string, data: Object): string => {
  if (content.length) {
    Object.entries(data).forEach(([key, value]) => {
      const regex = new RegExp(`{ ${key} }|{${key}}`, 'gm');

      content = content.replace(regex, value);
    });
  }
  return content;
};
