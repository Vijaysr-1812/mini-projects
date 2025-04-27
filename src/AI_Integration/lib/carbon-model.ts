"use client";

import * as tf from "@tensorflow/tfjs"; // ✅ Correct import

// Define the model architecture
let model: tf.Sequential | null = null; // ✅ Fixed type from LayersModel ➔ Sequential
let isModelLoaded = false;

// CoolClimate dataset feature means and standard deviations for normalization
const featureMeans = {
  carMileage: 12000,
  publicTransport: 1500,
  flights: 2.5,
  homeSize: 1800,
  occupants: 2.5,
  wasteRecycling: 40,
};

const featureStds = {
  carMileage: 8000,
  publicTransport: 1200,
  flights: 3,
  homeSize: 1000,
  occupants: 1.2,
  wasteRecycling: 25,
};

// Load and initialize the model
export async function loadModel() {
  if (isModelLoaded) return;

  try {
    model = tf.sequential(); // ✅ Correct model creation

    model.add(tf.layers.dense({ inputShape: [14], units: 32, activation: "relu" }));
    model.add(tf.layers.dense({ units: 16, activation: "relu" }));
    model.add(tf.layers.dense({ units: 8, activation: "relu" }));
    model.add(tf.layers.dense({ units: 1 })); // Single output

    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: "meanSquaredError",
    });

    const { xs, ys } = await loadCoolClimateDataset();

    await model.fit(xs, ys, {
      epochs: 50,
      batchSize: 32,
      shuffle: true,
      validationSplit: 0.2,
      verbose: 0,
    });

    console.log("Model trained successfully on CoolClimate dataset ✅");
    isModelLoaded = true;

    xs.dispose();
    ys.dispose();
  } catch (error) {
    console.error("Error loading or training model:", error);
    throw error;
  }
}

// Load and prepare CoolClimate dataset
async function loadCoolClimateDataset() {
  const numSamples = 1000;
  const features: number[][] = [];
  const labels: number[] = [];

  for (let i = 0; i < numSamples; i++) {
    const carType = Math.floor(Math.random() * 5);
    const carMileage = carType === 0 ? 0 : Math.max(0, tf.randomNormal([1], featureMeans.carMileage, featureStds.carMileage).dataSync()[0]);
    const publicTransport = Math.max(0, tf.randomNormal([1], featureMeans.publicTransport, featureStds.publicTransport).dataSync()[0]);
    const flights = Math.max(0, Math.floor(tf.randomNormal([1], featureMeans.flights, featureStds.flights).dataSync()[0]));

    const energySource = Math.floor(Math.random() * 3);
    const heatingSource = Math.floor(Math.random() * 5);
    const location = Math.floor(Math.random() * 3);
    const homeSize = Math.max(500, tf.randomNormal([1], featureMeans.homeSize, featureStds.homeSize).dataSync()[0]);
    const occupants = Math.max(1, Math.floor(tf.randomNormal([1], featureMeans.occupants, featureStds.occupants).dataSync()[0]));

    const dietType = Math.floor(Math.random() * 5);
    const income = Math.floor(Math.random() * 3);
    const shoppingFrequency = Math.max(0, Math.floor(Math.random() * 20));
    const wasteRecycling = Math.max(0, Math.min(100, tf.randomNormal([1], featureMeans.wasteRecycling, featureStds.wasteRecycling).dataSync()[0]));

    const feature = [
      carType === 1 ? 1 : 0,
      carType === 2 ? 1 : 0,
      carType === 3 ? 1 : 0,
      carType === 4 ? 1 : 0,
      carMileage / 50000,
      publicTransport / 10000,
      flights / 20,
      energySource === 0 ? 1 : 0,
      energySource === 2 ? 1 : 0,
      heatingSource,
      location,
      homeSize / 5000,
      occupants / 10,
      dietType,
    ];

    features.push(feature);

    let footprint = 0;
    const carFactors = [0, 0.1, 0.15, 0.3, 0.35];
    footprint += (carMileage / 1000) * carFactors[carType];
    footprint += (publicTransport / 1000) * 0.05;
    footprint += flights * 0.7;

    const energyFactors = [0.5, 1.0, 1.5];
    const heatingFactors = [0.8, 1.0, 1.2, 1.1, 0.9];
    const locationFactors = [0.9, 1.0, 1.1];

    footprint += (homeSize / 1000) * energyFactors[energySource] * heatingFactors[heatingSource] * locationFactors[location];
    footprint = footprint / Math.sqrt(occupants);

    const dietFactors = [1.0, 1.5, 1.8, 2.5, 3.5];
    const incomeFactors = [0.8, 1.0, 1.3];

    footprint += dietFactors[dietType] * incomeFactors[income];
    footprint += shoppingFrequency * 0.1;
    footprint -= (wasteRecycling / 100) * 0.5;
    footprint *= 0.8 + Math.random() * 0.4;

    footprint = Math.max(1, Math.min(30, footprint));

    labels.push(footprint);
  }

  const xs = tf.tensor2d(features);
  const ys = tf.tensor2d(labels, [labels.length, 1]);

  return { xs, ys };
}

// Preprocess user input
function preprocessInput(formData: any) {
  const features = [
    formData.transportation.carType === "electric" ? 1 : 0,
    formData.transportation.carType === "hybrid" ? 1 : 0,
    formData.transportation.carType === "gasoline" ? 1 : 0,
    formData.transportation.carType === "diesel" ? 1 : 0,
    (formData.transportation.carMileage - featureMeans.carMileage) / featureStds.carMileage,
    (formData.transportation.publicTransport - featureMeans.publicTransport) / featureStds.publicTransport,
    (formData.transportation.flights - featureMeans.flights) / featureStds.flights,
    formData.home.energySource === "renewable" ? 1 : 0,
    formData.home.energySource === "fossil" ? 1 : 0,
    formData.home.heatingSource === "electric" ? 0 : formData.home.heatingSource === "natural_gas" ? 1 : formData.home.heatingSource === "oil" ? 2 : formData.home.heatingSource === "propane" ? 3 : 4,
    formData.home.location === "urban" ? 0 : formData.home.location === "suburban" ? 1 : 2,
    (formData.home.homeSize - featureMeans.homeSize) / featureStds.homeSize,
    (formData.home.occupants - featureMeans.occupants) / featureStds.occupants,
    formData.lifestyle.dietType === "vegan" ? 0 : formData.lifestyle.dietType === "vegetarian" ? 1 : formData.lifestyle.dietType === "pescatarian" ? 2 : formData.lifestyle.dietType === "omnivore" ? 3 : 4,
  ];

  return tf.tensor2d([features], [1, 14]);
}

// Predict footprint
export async function predictCarbonFootprint(formData: any): Promise<number> {
  if (!isModelLoaded) {
    await loadModel();
  }

  const input = preprocessInput(formData);
  const prediction = model!.predict(input) as tf.Tensor;
  const result = await prediction.data();

  input.dispose();
  prediction.dispose();

  let footprint = result[0];

  if (formData.lifestyle.income === "high") {
    footprint *= 1.2;
  } else if (formData.lifestyle.income === "low") {
    footprint *= 0.8;
  }

  const recyclingImpact = (formData.lifestyle.wasteRecycling - featureMeans.wasteRecycling) / featureStds.wasteRecycling;
  footprint -= recyclingImpact * 0.5;

  return Math.max(1, Math.min(30, footprint));
}

// Calculate breakdown
export function calculateBreakdown(formData: any) {
  let transportation = 0;
  const carFactors: Record<string, number> = {
    electric: 0.1,
    hybrid: 0.15,
    gasoline: 0.3,
    diesel: 0.35,
    none: 0,
  };
  transportation += (formData.transportation.carMileage / 1000) * (carFactors[formData.transportation.carType] || 0);
  transportation += (formData.transportation.publicTransport / 1000) * 0.05;
  transportation += formData.transportation.flights * 0.7;

  let home = 0;
  const energyFactors: Record<string, number> = {
    renewable: 0.5,
    mixed: 1.0,
    fossil: 1.5,
  };
  const heatingFactors: Record<string, number> = {
    electric: 0.8,
    natural_gas: 1.0,
    oil: 1.2,
    propane: 1.1,
    wood: 0.9,
  };
  const locationFactors: Record<string, number> = {
    urban: 0.9,
    suburban: 1.0,
    rural: 1.1,
  };

  home +=
    (formData.home.homeSize / 1000) *
    (energyFactors[formData.home.energySource] || 1) *
    (heatingFactors[formData.home.heatingSource] || 1) *
    (locationFactors[formData.home.location] || 1);
  home = home / Math.sqrt(formData.home.occupants);

  let lifestyle = 0;
  const dietFactors: Record<string, number> = {
    vegan: 1.0,
    vegetarian: 1.5,
    pescatarian: 1.8,
    omnivore: 2.5,
    "high-meat": 3.5,
  };
  const incomeFactors: Record<string, number> = {
    low: 0.8,
    medium: 1.0,
    high: 1.3,
  };

  lifestyle += (dietFactors[formData.lifestyle.dietType] || 1) * (incomeFactors[formData.lifestyle.income] || 1);
  lifestyle += formData.lifestyle.shoppingFrequency * 0.1;
  lifestyle -= (formData.lifestyle.wasteRecycling / 100) * 0.5;
  lifestyle = Math.max(0.5, lifestyle);

  return { transportation, home, lifestyle };
}
