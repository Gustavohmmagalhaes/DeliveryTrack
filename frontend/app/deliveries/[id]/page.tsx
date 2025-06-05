"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { fetchDeliveryById, fetchDeliveryLocations } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"
import { AppLayout } from "@/components/layouts/app-layout"
import { DeliveryDetails } from "@/components/deliveries/delivery-details"
import { EmptyState } from "@/components/ui-custom/empty-state"
import { LoadingDeliveryDetails } from "@/components/ui-custom/loading-skeletons"
import type { Delivery, Location } from "@/lib/types"

export default function DeliveryDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [delivery, setDelivery] = useState<Delivery | null>(null)
  const [locations, setLocations] = useState<Location[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchLocationsData = useCallback(async () => {
    try {
      const locationsData = await fetchDeliveryLocations(params.id)
      setLocations(locationsData)
    } catch (error) {
      console.error("Erro ao buscar localizações:", error)
    }
  }, [params.id])

  useEffect(() => {
    // Se não estiver autenticado e não estiver carregando, redireciona para login
    if (!user && !authLoading) {
      router.push("/")
      return
    }

    const getDeliveryData = async () => {
      try {
        const data = await fetchDeliveryById(params.id)
        setDelivery(data)
        await fetchLocationsData()
      } catch (error) {
        console.error("Erro ao buscar detalhes da entrega:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      getDeliveryData()

      // Configurar polling para atualizações em tempo real
      const intervalId = setInterval(fetchLocationsData, 10000) // A cada 10 segundos

      return () => clearInterval(intervalId)
    }
  }, [params.id, router, fetchLocationsData, user, authLoading])

  if (authLoading) {
    return <LoadingDeliveryDetails />
  }

  return (
    <AppLayout>
      <Button variant="outline" size="sm" className="mb-6" onClick={() => router.push("/deliveries")}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      {isLoading ? (
        <LoadingDeliveryDetails />
      ) : delivery ? (
        <DeliveryDetails delivery={delivery} locations={locations} />
      ) : (
        <EmptyState
          icon="package"
          title="Entrega não encontrada"
          description="A entrega que você está procurando não existe ou foi removida."
          action={
            <Button className="mt-6" onClick={() => router.push("/deliveries")}>
              Ver todas as entregas
            </Button>
          }
        />
      )}
    </AppLayout>
  )
}
