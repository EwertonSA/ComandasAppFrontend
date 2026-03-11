import HeaderGeneric from "@/src/components/common/headerGeneric";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: Promise<Record<string, string>>;
}

export default async function RootLayoutClientApp({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const comandaId = resolvedParams?.comandaId;

  return (
    <div>
      <HeaderGeneric logoUrl={`/homeNoAuth/${comandaId ?? ""}`} />
      <main>{children}</main>
    </div>
  );
}