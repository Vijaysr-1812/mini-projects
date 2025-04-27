import type { Recommendation } from "./types"

export function getRecommendations(formData: any, footprint: number): Recommendation[] {
  const recommendations: Recommendation[] = []

  // Transportation recommendations
  if (formData.transportation.carType === "gasoline" || formData.transportation.carType === "diesel") {
    recommendations.push({
      title: "Consider switching to a hybrid or electric vehicle",
      description:
        "Electric vehicles can reduce your transportation emissions by up to 50% compared to gasoline vehicles, even when accounting for electricity generation.",
      priority: "medium",
    })
  }

  if (formData.transportation.carMileage > 15000) {
    recommendations.push({
      title: "Reduce car usage",
      description:
        "Your annual car mileage is above average. Consider carpooling, combining trips, or using public transportation more frequently.",
      priority: "high",
    })
  }

  if (formData.transportation.flights > 5) {
    recommendations.push({
      title: "Reduce air travel",
      description:
        "Air travel has a significant carbon impact. Consider alternatives like video conferencing or train travel when possible.",
      priority: "high",
    })
  }

  // Home recommendations
  if (formData.home.energySource === "fossil") {
    recommendations.push({
      title: "Switch to renewable energy",
      description:
        "Consider switching to a renewable energy provider or installing solar panels to significantly reduce your home energy footprint.",
      priority: "high",
    })
  }

  if (formData.home.heatingSource === "oil") {
    recommendations.push({
      title: "Consider upgrading your heating system",
      description:
        "Oil heating systems typically have higher carbon emissions. Consider switching to natural gas, electric heat pumps, or renewable options.",
      priority: "medium",
    })
  }

  if (formData.home.homeSize > 2500 && formData.home.occupants < 3) {
    recommendations.push({
      title: "Consider energy efficiency improvements",
      description:
        "Larger homes require more energy to heat and cool. Improve insulation, upgrade to energy-efficient appliances, and consider smart thermostats.",
      priority: "medium",
    })
  }

  // Lifestyle recommendations
  if (formData.lifestyle.dietType === "high-meat" || formData.lifestyle.dietType === "omnivore") {
    recommendations.push({
      title: "Reduce meat consumption",
      description:
        "Meat production, especially beef, has a high carbon footprint. Consider incorporating more plant-based meals into your diet.",
      priority: formData.lifestyle.dietType === "high-meat" ? "high" : "medium",
    })
  }

  if (formData.lifestyle.income === "high" && formData.lifestyle.shoppingFrequency > 10) {
    recommendations.push({
      title: "Reduce consumption of new goods",
      description:
        "Manufacturing new products requires resources and energy. Consider buying second-hand, repairing items, or extending their lifespan.",
      priority: "medium",
    })
  }

  if (formData.lifestyle.wasteRecycling < 30) {
    recommendations.push({
      title: "Increase recycling rate",
      description:
        "Recycling helps reduce the energy needed to produce new materials. Aim to recycle at least 50% of your waste.",
      priority: "high",
    })
  }

  // General recommendations based on overall footprint
  if (footprint > 20) {
    recommendations.push({
      title: "Your carbon footprint is significantly above average",
      description:
        "Consider making multiple lifestyle changes to reduce your impact. Small changes across transportation, home energy, and consumption can add up.",
      priority: "high",
    })
  } else if (footprint < 8) {
    recommendations.push({
      title: "Your carbon footprint is below average",
      description: "Great job! Continue your sustainable practices and consider sharing your knowledge with others.",
      priority: "low",
    })
  }

  return recommendations
}

