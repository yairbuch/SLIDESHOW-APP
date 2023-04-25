import { generateUniqId } from "../../utils/algoMethods.js";

class Picture {
  #id;
  url;
  alt;
  credits;
  #price;
  #createdAt;
  likes = [];
  category;
  #user_id;

  constructor(picture, pictures = []) {
    const { url, alt, credits, price, category, user_id } = picture;
    if (!url || !alt || !credits || !price || !user_id)
      throw new Error("Bad Request!");

    this.#id = generateUniqId(pictures, 1_000_000, 9_999_999);
    this.url = url;
    this.alt = alt;
    this.credits = credits;
    this.#price = price;
    this.category = category || "";
    this.#user_id = user_id;
    this.#createdAt = new Date();
  }

  get _id() {
    return this.#id;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get price() {
    return this.#price;
  }

  get user_id() {
    return this.#user_id;
  }
}

export default Picture;
