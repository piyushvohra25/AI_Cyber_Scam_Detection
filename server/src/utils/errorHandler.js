export const errorHandler = (error, _req, res, _next) => {
  const status = error.response?.status || error.status || 500;
  const message =
    error.response?.data?.detail ||
    error.response?.data?.error ||
    error.message ||
    "Unexpected server error";

  console.error(error);

  res.status(status).json({
    error: message,
  });
};
