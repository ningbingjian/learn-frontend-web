interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

type AnimalHandler = (animal: Animal) => string;
type DogHandler = (dog: Dog) => string;

const handleAnimal: AnimalHandler = (animal) => `animal:${animal.name}`;
const handleDog: DogHandler = handleAnimal;

const dog: Dog = {
  name: 'Buddy',
  breed: 'Corgi'
};

console.log(handleDog(dog));

interface MethodHandler<T> {
  handle(value: T): string;
}

const dogMethod: MethodHandler<Dog> = {
  handle(value) {
    return `dog:${value.breed}`;
  }
};

const animalMethod: MethodHandler<Animal> = dogMethod;
console.log(animalMethod.handle(dog));
