import Animal from "./Animal";

class Cat extends Animal {
  constructor(catPayload) {
    const {id, name, origin, temperament, colors, description, image} = catPayload;
    super(id, name, origin, description, image);
    this.temperament = temperament;
    this.colors = colors;
  }
}

let objectNames2Labels = {
  "name": "Name",
  "origin": "Origin",
  "description": "Description",
  "image": "Image",
  "temperament": "Temperament",
  "colors": "Colors"
}

let objectNameOrder = [
  "name",
  "origin",
  "temperament",
  "colors"
]

let detailFields = ["description"]

let cardDetailFields = ["temperament", "colors"]

export { Cat, objectNames2Labels, objectNameOrder, detailFields, cardDetailFields };