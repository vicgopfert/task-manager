import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { waterMutationKeys } from "../../keys/mutations"
import { waterQueryKeys } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useGetWater = () => {
  return useQuery({
    queryKey: waterQueryKeys.get(),
    queryFn: async () => {
      const { data: water } = await api.get("/water")
      return water
    },
  })
}

export const useUpdateWater = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: waterMutationKeys.update(),
    mutationFn: async (consumed) => {
      const { data: water } = await api.patch("/water", { consumed })
      return water
    },
    onSuccess: (water) => {
      queryClient.setQueryData(waterQueryKeys.get(), water)
    },
    onError: (error) => {
      console.error("Erro ao atualizar água", error)
    },
  })
}
