import HeaderGeneric from "@/src/components/common/headerGeneric";
import { ReactNode } from "react";

interface Params {
  params: Promise<{ comandaId: string; state:string }>;
  children: ReactNode;
}

const RootLayoutClientApp = async ({ children, params }: Params) => {
  const { comandaId,state} = await params;

  return (
    <div>
      {/* Passa todos os valores via props */}
      <HeaderGeneric logoUrl={`/homeNoAuth/${comandaId}`} state={state} />
      <main>{children}</main>
    </div>
  );
};

export default RootLayoutClientApp;
