import Animal from "./Animal.js";

class Bird extends Animal {
  constructor(birdPayload) {
    const { id, name, species, family, habitat, origin, diet, description, wingspanCm, weightKg, image } = birdPayload;
    super(id, name, origin, description, image);
    this.species = species;
    this.family = family;
    this.diet = diet;
    this.habitat = habitat;
    this.wingspanCm = wingspanCm;
    this.weightKg = weightKg;
  }
}

let objectNames2Labels = {
  "name": "Name",
  "origin": "Origin",
  "description": "Description",
  "image": "Image",
  "species": "Species",
  "family": "Family",
  "diet": "Diet",
  "habitat": "Habitat",
  "wingspanCm": "Wingspan (cm)",
  "weightKg": "Weight (kg)"
}

let objectNameOrder = [
  "name",
  "origin",
  "habitat",
  "wingspanCm",
  "weightKg"
]

let detailFields = [
  "description",
  "species",
  "family",
  "diet"
]

let cardDetailFields = [
  "species",
  "family",
  "diet",
  "habitat",
  "wingspanCm",
  "weightKg"
]

export { Bird, objectNames2Labels, objectNameOrder, detailFields, cardDetailFields };