import Animal from "./Animal";

class Dog extends Animal {
  constructor(dogPayload) {
    const { id, name, breedGroup, size, lifespan, origin, temperament, colors, description, image } = dogPayload;
    super(id, name, origin, description, image);
    this.breedGroup = breedGroup;
    this.size = size;
    this.lifespan = lifespan;
    this.temperament = temperament;
    this.colors = colors;
  }
}

let objectNames2Labels = {
  "name": "Name",
  "origin": "Origin",
  "description": "Description",
  "image": "Image",
  "breedGroup": "Breed Group",
  "size": "Size",
  "temperament": "Temperament",
  "colors": "Colors",
  "lifespan": "Lifespan"
}

let objectNameOrder = [
  "name",
  "origin",
  "temperament",
  "colors"
]

let detailFields = [
  "description",
  "breedGroup",
  "size",
  "lifespan"
]

let cardDetailFields = [
  "breedGroup",
  "size",
  "lifespan",
  "temperament",
  "colors"
]

export { Dog, objectNames2Labels, objectNameOrder, detailFields, cardDetailFields };