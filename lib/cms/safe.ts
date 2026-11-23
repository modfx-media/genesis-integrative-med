export async function withCMS<T>(
  fn: () => Promise<T>,
  fallback: T,
  context?: string,
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error(
      context ? `[cms] fetch failed (${context})` : "[cms] fetch failed",
      error,
    );
    return fallback;
  }
}
