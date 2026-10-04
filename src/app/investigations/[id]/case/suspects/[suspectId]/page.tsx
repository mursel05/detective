import SuspectChat from "@/components/chat";

interface SuspectChatPageProps {
  params: Promise<{ id: string; suspectId: string }>;
}

export default async function SuspectChatPage({
  params,
}: SuspectChatPageProps) {
  const { id, suspectId } = await params;
  return <SuspectChat id={id} suspectId={suspectId} />;
}
