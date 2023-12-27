export const truncateDescription = (text, maxLength) => {
      if (text.length <= maxLength) {
        return text;
      } else {
        // Truncate the text and add ellipsis
        return text.substring(0, maxLength).trim() + '...';
      }
    };