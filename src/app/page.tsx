import { Suspense } from "react";
import {getQueryClient, trpc} from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Client } from "./Client";



const page = async() => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.hello.queryOptions({text:"Eshiv"}));
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<h1>loading...</h1>}>
        <Client/>
      </Suspense>
    </HydrationBoundary>
  )
}

export default page