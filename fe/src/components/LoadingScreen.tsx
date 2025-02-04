import { Spinner } from "./Spinner";

export default function LoadingScreen() {
  return (
    <div className="bg-primary fixed top-0 left-0 h-full w-full grid place-items-center">
      <div className="flex justify-center items-center gap-4 ">
        <Spinner className="text-secondary fill-white" />
      </div>
    </div>
  );
}
