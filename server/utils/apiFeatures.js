class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword && {
      $or: [
        {
          title: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        },
        {
          description: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        },
        {
          category: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        },
      ],
    };

    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    // Removing some fields for category
    const removeFields = ["keyword", "page", "limit","price", "sort"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter for Price
    if (this.queryStr.price && typeof this.queryStr.price === "string") {
      const priceRange = this.queryStr.price.split("-");
      if (priceRange.length === 2) {
        const [minPrice, maxPrice] = priceRange;
        queryCopy.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
      }
    }

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
  sorting() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("createdAt"); //-createdAt
    }

    return this;
  }
}
export default ApiFeatures;