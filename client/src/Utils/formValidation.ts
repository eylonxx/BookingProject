export const handleErrorText = (requiredText: string, lengthText?: string, dateText?: string) => {
  return (error: string) => {
    switch (error) {
      case 'required':
        return requiredText;
      case 'minLength':
      case 'maxLength':
        return lengthText;
      case 'validate':
        return dateText;
      case 'min':
      case 'max':
        return lengthText;
      default:
        return '';
    }
  };
};
