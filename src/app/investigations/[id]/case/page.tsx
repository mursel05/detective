import CaseWorkspace from "@/components/case-workspace";

interface CaseWorkspacePageProps {
  params: Promise<{ id: string }>;
}

export default async function CaseWorkspacePage({
  params,
}: CaseWorkspacePageProps) {
  const { id } = await params;

  return <CaseWorkspace id={id} />;
}
