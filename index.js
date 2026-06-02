const books = [
  { title: "어린왕자", author: "생텍쥐페리", year: 1943, category: "소설", price: 12000 },
  { title: "1984", author: "조지 오웰", year: 1949, category: "소설", price: 15000 },
  { title: "수학의 정석", author: "홍성대", year: 1966, category: "교육", price: 20000 },
  { title: "코딩 테스트", author: "나동빈", year: 2021, category: "교육", price: 32000 },
  { title: "해리포터", author: "J.K. 롤링", year: 1997, category: "소설", price: 18000 },
];

// ─────────────────────────────────────────────
// PART 1. 배열과 배열 메서드
// ─────────────────────────────────────────────

/**
 * 특정 카테고리의 책 제목만 추출해 배열로 반환합니다.
 * - filter와 map을 사용합니다.
 * - for 반복문 사용 금지.
 *
 * @example
 * getTitlesByCategory(books, "소설") // → ["어린왕자", "1984", "해리포터"]
 */
function getTitlesByCategory(books, category) {
  // 여기를 작성하세요
  return books
    .filter((book) => book.category === category)
    .map((book) => book.title);
}

/**
 * 가격이 threshold 이상인 책의 가격 합계를 반환합니다.
 * - filter와 reduce를 사용합니다.
 * - for 반복문 사용 금지.
 *
 * @example
 * getTotalPriceAbove(books, 15000) // → 85000
 */
function getTotalPriceAbove(books, threshold) {
  // 여기를 작성하세요
  return books
    .filter((book) => book.price >= threshold)
    .reduce((sum, book) => sum + book.price, 0);
}

/**
 * 책 목록이 모두 특정 카테고리인지 확인해 boolean을 반환합니다.
 * - every를 사용합니다.
 *
 * @example
 * isAllSameCategory([{ category: "소설" }, { category: "소설" }], "소설") // → true
 */
function isAllSameCategory(books, category) {
  // 여기를 작성하세요
  return books.every((book) => book.category === category);
}

// ─────────────────────────────────────────────
// PART 2. 구조 분해 할당
// ─────────────────────────────────────────────

/**
 * 도서 객체에서 title과 author만 추출해 포맷된 문자열로 반환합니다.
 * - 객체 구조 분해 할당으로 title, author를 추출합니다.
 * - book.title처럼 점 표기법으로 직접 접근하지 않습니다.
 *
 * @example
 * formatBookLabel({ title: "어린왕자", author: "생텍쥐페리" }) // → "어린왕자 - 생텍쥐페리"
 */
function formatBookLabel(book) {
  // 여기를 작성하세요
  const { title, author } = book;
  return `${title} - ${author}`;
}

/**
 * 첫 번째 책과 나머지 책을 분리해 반환합니다.
 * - 배열 구조 분해 할당과 나머지 문법(rest)을 사용합니다.
 *
 * @example
 * const { first, rest } = splitFirstAndRest(books)
 */
function splitFirstAndRest(books) {
  // 여기를 작성하세요
  const [first, ...rest] = books;
  return { first, rest };
}

/**
 * 책 객체에서 price를 제외한 나머지 정보를 담은 객체를 반환합니다.
 * - 객체 구조 분해 할당과 나머지 문법(rest)을 사용합니다.
 * - delete 연산자 사용 금지.
 *
 * @example
 * omitPrice({ title: "어린왕자", price: 12000 }) // → { title: "어린왕자" }
 */
function omitPrice(book) {
  // 여기를 작성하세요
  const { price, ...rest } = book;
  return rest;
}

// ─────────────────────────────────────────────
// PART 3. Map과 Set
// ─────────────────────────────────────────────

/**
 * 카테고리를 키로, 제목 배열을 값으로 하는 Map을 반환합니다.
 *
 * @example
 * groupByCategory(books)
 * // → Map { "소설" => ["어린왕자", "1984", "해리포터"], "교육" => [...] }
 */
function groupByCategory(books) {
  // 여기를 작성하세요
  const categoryMap = new Map();
  books.forEach((book) => {
    if (!categoryMap.has(book.category)) {
      categoryMap.set(book.category, []);
    }
    categoryMap.get(book.category).push(book.title);
  });
  return categoryMap;
}

/**
 * 두 배열에 모두 포함된 값만 담은 배열(교집합)을 반환합니다.
 * - Set을 사용합니다.
 * - 결과에 중복이 없어야 합니다.
 *
 * @example
 * intersection([1, 2, 3], [2, 3, 4]) // → [2, 3]
 */
function intersection(arrA, arrB) {
  // 여기를 작성하세요
  const setB = new Set(arrB);
  return [...new Set(arrA.filter((item) => setB.has(item)))];
}

/**
 * 배열에서 중복을 제거한 새 배열을 반환합니다.
 * - Set을 사용합니다.
 *
 * @example
 * unique([1, 2, 2, 3]) // → [1, 2, 3]
 */
function unique(arr) {
  // 여기를 작성하세요
  return [...new Set(arr)];
  // 여기를 작성하세요
}

// ─────────────────────────────────────────────
// PART 4. Object.keys / values / entries
// ─────────────────────────────────────────────

/**
 * 재고가 0인 책 제목 배열을 반환합니다.
 * - Object.entries를 사용합니다.
 *
 * @example
 * getOutOfStock({ 어린왕자: 3, "1984": 0 }) // → ["1984"]
 */
function getOutOfStock(stock) {
  // 여기를 작성하세요
  return Object.entries(stock)
    .filter(([_, quantity]) => quantity === 0)
    .map(([title, _]) => title);
}

/**
 * 재고 객체의 모든 재고 합계를 반환합니다.
 * - Object.values와 reduce를 사용합니다.
 *
 * @example
 * getTotalStock({ 어린왕자: 3, "1984": 0, 해리포터: 2 }) // → 5
 */
function getTotalStock(stock) {
  // 여기를 작성하세요
  return Object.values(stock).reduce((sum, quantity) => sum + quantity, 0);

}

/**
 * 값이 null이거나 undefined인 키를 제외한 새 객체를 반환합니다.
 * - Object.entries와 Object.fromEntries를 사용합니다.
 *
 * @example
 * removeNullish({ title: "어린왕자", author: null }) // → { title: "어린왕자" }
 */
function removeNullish(obj) {
  // 여기를 작성하세요
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value != null)
  );  
}

// ─────────────────────────────────────────────
// PART 5. 배열 메서드 심화 ★ 도전 과제
// ─────────────────────────────────────────────

/**
 * 카테고리별 평균 가격을 담은 객체를 반환합니다.
 * - reduce 하나로 처리합니다. (filter를 카테고리별로 반복 호출하지 않습니다)
 * - for 반복문 사용 금지.
 *
 * 힌트: reduce의 누적값으로 { 카테고리: { sum, count } } 구조를 쌓아가세요.
 *
 * @example
 * getAvgPriceByCategory(books) // → { 소설: 15000, 교육: 26000 }
 */
function getAvgPriceByCategory(books) {
  // 여기를 작성하세요
    const categoryData = books.reduce((acc, book) => {
    if (!acc[book.category]) {
      acc[book.category] = { sum: 0, count: 0 };
    }
    acc[book.category].sum += book.price;
    acc[book.category].count += 1;
    return acc;
  }, {});

  const avgPriceByCategory = {};
  for (const category in categoryData) {
    avgPriceByCategory[category] = categoryData[category].sum / categoryData[category].count;
  }
  return avgPriceByCategory;
}

/**
 * 특정 키 기준으로 오름차순 정렬한 새 배열을 반환합니다.
 * - 원본 배열을 직접 수정하지 않습니다. (slice 또는 스프레드로 복사 후 정렬)
 * - sort와 비교 함수를 사용합니다.
 *
 * @example
 * sortBy(books, "price")  // → 가격 오름차순 새 배열
 * sortBy(books, "title")  // → 제목 가나다순 새 배열
 */
function sortBy(books, key) {
  // 여기를 작성하세요
  return [...books].sort((a, b) => a[key] - b[key]);
}

/**
 * 중첩된 카테고리 구조를 평탄화한 책 목록을 반환합니다.
 * - flatMap을 사용합니다.
 * - 각 책 객체에 category 필드를 추가합니다.
 *
 * @example
 * flattenCategories([
 *   { category: "소설", books: [{ title: "어린왕자", price: 12000 }] }
 * ])
 * // → [{ title: "어린왕자", price: 12000, category: "소설" }]
 */
function flattenCategories(categories) {
  // 여기를 작성하세요
  return categories.flatMap((cat) =>
    cat.books.map((book) => ({ ...book, category: cat.category }))
  );
}

// ─────────────────────────────────────────────
// PART 6. 이터러블 & 페이지네이션 ★★ 심화 도전
// ─────────────────────────────────────────────

/**
 * 책 목록을 순서대로 하나씩 꺼낼 수 있는 이터레이터를 반환합니다.
 * - Symbol.iterator 또는 제너레이터 함수(function*)를 사용합니다.
 * - for...of 로도 순회 가능해야 합니다.
 *
 * 힌트: function*를 사용하면 훨씬 간단하게 구현할 수 있습니다.
 *
 * @example
 * const iter = createBookIterator(books)
 * iter.next()  // → { value: books[0], done: false }
 *
 * for (const book of createBookIterator(books)) { ... }
 */
function createBookIterator(books) {
  // 여기를 작성하세요
  function* generator() {
    for (const book of books) {
      yield book;
    }
  }
  return generator();
}

/**
 * 책 목록을 size 크기로 나눠 해당 페이지 데이터만 반환합니다.
 * - slice를 사용합니다.
 * - page가 1 미만이거나 totalPages를 초과하면 에러를 throw합니다.
 *   에러 메시지: "유효하지 않은 페이지 번호입니다."
 *
 * @example
 * paginate(books, 1, 2) // → { data: [books[0], books[1]], totalPages: 3, currentPage: 1 }
 */
function paginate(books, page, size) {
  // 여기를 작성하세요
  const totalPages = Math.ceil(books.length / size);
  if (page < 1 || page > totalPages) {
    throw new Error("유효하지 않은 페이지 번호입니다.");
  }
  const startIndex = (page - 1) * size;
  const data = books.slice(startIndex, startIndex + size);
  return { data, totalPages, currentPage: page };
}

// ─────────────────────────────────────────────
// 내보내기 (수정 금지)
// ─────────────────────────────────────────────
module.exports = {
  getTitlesByCategory,
  getTotalPriceAbove,
  isAllSameCategory,
  formatBookLabel,
  splitFirstAndRest,
  omitPrice,
  groupByCategory,
  intersection,
  unique,
  getOutOfStock,
  getTotalStock,
  removeNullish,
  getAvgPriceByCategory,
  sortBy,
  flattenCategories,
  createBookIterator,
  paginate,
};
