export class Stack<T> {
   private storage: T[] = [];

   constructor() { }

   push(item: T): void {
      this.storage.push(item);
   }

   pop(): T | undefined {
      return this.storage.pop();
   }

   peek(): T | undefined {
      return this.storage[this.size() - 1];
   }

   size(): number {
      return this.storage.length;
   }

   toArray(): T[] {
      return [...this.storage];
   }

   fromArray(array: T[]): void {
      this.storage = [...array];
   }

   shuffle(): void {
      for (let i = this.storage.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [this.storage[i], this.storage[j]] = [this.storage[j], this.storage[i]];
      }
   }

   reset(): void {
      this.storage = [];
   }
}