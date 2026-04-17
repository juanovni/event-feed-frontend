const isSafeInternalPath = (value: string) =>
  value.startsWith("/") && !value.startsWith("//");

export const getSafeRedirectPath = (
  redirectTo?: string | null,
  fallback = "/"
) => {
  if (!redirectTo) {
    return fallback;
  }

  return isSafeInternalPath(redirectTo) ? redirectTo : fallback;
};
