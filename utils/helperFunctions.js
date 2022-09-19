export const dateFormatter = (date) => {
  const oldDate = new Date(date);
  const newDate = oldDate.toLocaleDateString('en-IN', {
    // you can use undefined as first argument
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return newDate;
};
