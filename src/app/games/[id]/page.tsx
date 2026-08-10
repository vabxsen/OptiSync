import { GameDetail } from "@/components/game-detail";

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <GameDetail gameId={id} />;
}
