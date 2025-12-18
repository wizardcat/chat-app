export const validate = (schema, data) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const error = result.error.errors.map(e => e.message).join(', ');
    throw new Error(error);
  }

  return result.data;
};
