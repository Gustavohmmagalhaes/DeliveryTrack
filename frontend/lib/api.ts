import type { Delivery, Location } from "./types"

// URL base da API (em um ambiente real, isso viria de variáveis de ambiente)
const API_BASE_URL = "https://api.deliverytrack.example"

// Função para buscar todas as entregas do cliente
export async function fetchDeliveries(): Promise<Delivery[]> {
  // Em um ambiente real, você faria uma chamada fetch para a API
  // return fetch(`${API_BASE_URL}/deliveries`).then(res => res.json())

  // Simulação de dados para demonstração
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "d1e2f3g4h5i6j7k8",
          productName: "Smartphone Galaxy S23",
          address: "Av. Paulista, 1000, São Paulo, SP",
          status: "em_transito",
          statusText: "Em trânsito",
          createdAt: "2023-05-15T14:30:00Z",
          estimatedDelivery: "Hoje, até 18h",
          courierName: "João Silva",
          destinationLat: -23.5505,
          destinationLng: -46.6333,
        },
        {
          id: "a1b2c3d4e5f6g7h8",
          productName: "Notebook Dell XPS",
          address: "Rua Augusta, 500, São Paulo, SP",
          status: "pendente",
          statusText: "Pendente",
          createdAt: "2023-05-16T10:15:00Z",
          estimatedDelivery: "Amanhã, até 12h",
          courierName: "Carlos Oliveira",
          destinationLat: -23.5505,
          destinationLng: -46.6333,
        },
        {
          id: "i1j2k3l4m5n6o7p8",
          productName: "Monitor LG 27 polegadas",
          address: "Rua Oscar Freire, 300, São Paulo, SP",
          status: "entregue",
          statusText: "Entregue",
          createdAt: "2023-05-14T09:45:00Z",
          estimatedDelivery: "Entregue em 14/05/2023",
          courierName: "Ana Souza",
          destinationLat: -23.5505,
          destinationLng: -46.6333,
        },
      ])
    }, 1000)
  })
}

// Função para buscar detalhes de uma entrega específica
export async function fetchDeliveryById(id: string): Promise<Delivery> {
  // Em um ambiente real, você faria uma chamada fetch para a API
  // return fetch(`${API_BASE_URL}/deliveries/${id}`).then(res => res.json())

  // Simulação de dados para demonstração
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simula diferentes entregas com base no ID
      if (id === "d1e2f3g4h5i6j7k8") {
        resolve({
          id: "d1e2f3g4h5i6j7k8",
          productName: "Smartphone Galaxy S23",
          address: "Av. Paulista, 1000, São Paulo, SP",
          status: "em_transito",
          statusText: "Em trânsito",
          createdAt: "2023-05-15T14:30:00Z",
          estimatedDelivery: "Hoje, até 18h",
          courierName: "João Silva",
          destinationLat: -23.5505,
          destinationLng: -46.6333,
        })
      } else if (id === "a1b2c3d4e5f6g7h8") {
        resolve({
          id: "a1b2c3d4e5f6g7h8",
          productName: "Notebook Dell XPS",
          address: "Rua Augusta, 500, São Paulo, SP",
          status: "pendente",
          statusText: "Pendente",
          createdAt: "2023-05-16T10:15:00Z",
          estimatedDelivery: "Amanhã, até 12h",
          courierName: "Carlos Oliveira",
          destinationLat: -23.5605,
          destinationLng: -46.6433,
        })
      } else if (id === "i1j2k3l4m5n6o7p8") {
        resolve({
          id: "i1j2k3l4m5n6o7p8",
          productName: "Monitor LG 27 polegadas",
          address: "Rua Oscar Freire, 300, São Paulo, SP",
          status: "entregue",
          statusText: "Entregue",
          createdAt: "2023-05-14T09:45:00Z",
          estimatedDelivery: "Entregue em 14/05/2023",
          courierName: "Ana Souza",
          destinationLat: -23.5705,
          destinationLng: -46.6533,
        })
      } else {
        reject(new Error("Entrega não encontrada"))
      }
    }, 800)
  })
}

// Função para buscar localizações de uma entrega
export async function fetchDeliveryLocations(deliveryId: string): Promise<Location[]> {
  // Em um ambiente real, você faria uma chamada fetch para a API
  // return fetch(`${API_BASE_URL}/deliveries/${deliveryId}/locations`).then(res => res.json())

  // Simulação de dados para demonstração
  return new Promise((resolve) => {
    setTimeout(() => {
      // Gera localizações aleatórias próximas ao destino para simular o movimento
      if (deliveryId === "d1e2f3g4h5i6j7k8") {
        // Entrega em trânsito - gera um caminho simulado
        const now = new Date()
        const baseLatitude = -23.5505
        const baseLongitude = -46.6333

        // Gera 5 pontos para simular o caminho
        const locations: Location[] = []
        for (let i = 0; i < 5; i++) {
          const timestamp = new Date(now.getTime() - (5 - i) * 5 * 60000) // 5 minutos entre cada ponto

          // Simula movimento em direção ao destino
          const latitude = baseLatitude - 0.01 + i * 0.002
          const longitude = baseLongitude - 0.01 + i * 0.002

          locations.push({
            id: `loc_${i}`,
            deliveryId,
            latitude,
            longitude,
            timestamp: timestamp.toISOString(),
          })
        }

        resolve(locations)
      } else if (deliveryId === "a1b2c3d4e5f6g7h8") {
        // Entrega pendente - sem localizações ainda
        resolve([])
      } else if (deliveryId === "i1j2k3l4m5n6o7p8") {
        // Entrega concluída - caminho completo
        const baseLatitude = -23.5705
        const baseLongitude = -46.6533
        const deliveryDate = new Date("2023-05-14T14:30:00Z")

        const locations: Location[] = []
        for (let i = 0; i < 8; i++) {
          const timestamp = new Date(deliveryDate.getTime() - (8 - i) * 10 * 60000)

          // Simula caminho completo até o destino
          const latitude = baseLatitude - 0.02 + i * 0.0025
          const longitude = baseLongitude - 0.02 + i * 0.0025

          locations.push({
            id: `loc_${i}`,
            deliveryId,
            latitude,
            longitude,
            timestamp: timestamp.toISOString(),
          })
        }

        resolve(locations)
      } else {
        resolve([])
      }
    }, 600)
  })
}
