import Clientes from "./clientes";



interface PageProps {
  searchParams: Promise<{ page?: string; perPage?: string }>
}

const AllOrders = async ({ searchParams }: PageProps) => {
  const params = await searchParams // await obrigatório

  return (
    <>

      <main>
        <Clientes searchParams={params} />
      </main>
  
    </>
  )
}

export default AllOrders
