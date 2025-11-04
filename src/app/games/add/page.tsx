import AddGameForm from "@/components/games/AddGameForm";

export default function AddGamePage() {
  return (
    <div className="flex items-center justify-center ">
      <div className="rounded-2xl p-8 max-w-2xl w-full">
        <AddGameForm />
      </div>
    </div>
  );
}
