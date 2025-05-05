export const TestFallback = ({ path }: { path: string }) => {
  console.log("Fallback foi ativado", path);
  return <div>Loading...</div>;
};
