export interface Recommendation {
    title: string
    description: string
    priority: "low" | "medium" | "high"
  }
  
  export interface CarbonFootprintData {
    transportation: {
      carType: string
      carMileage: number
      publicTransport: number
      flights: number
    }
    home: {
      energySource: string
      homeSize: number
      occupants: number
      heatingSource: string
      location: string
    }
    lifestyle: {
      dietType: string
      shoppingFrequency: number
      wasteRecycling: number
      income: string
    }
  }
  
  