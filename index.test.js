/**
 * 3주차 과제 테스트
 * 이 파일은 수정하지 않습니다.
 */
const {
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
} = require("./index");

const books = [
  { title: "어린왕자", author: "생텍쥐페리", year: 1943, category: "소설", price: 12000 },
  { title: "1984", author: "조지 오웰", year: 1949, category: "소설", price: 15000 },
  { title: "수학의 정석", author: "홍성대", year: 1966, category: "교육", price: 20000 },
  { title: "코딩 테스트", author: "나동빈", year: 2021, category: "교육", price: 32000 },
  { title: "해리포터", author: "J.K. 롤링", year: 1997, category: "소설", price: 18000 },
];

// ─────────────────────────────────────────────
// PART 1
// ─────────────────────────────────────────────
describe("PART 1. 배열과 배열 메서드", () => {
  test("getTitlesByCategory — 소설 카테고리 제목 반환", () => {
    expect(getTitlesByCategory(books, "소설")).toEqual(["어린왕자", "1984", "해리포터"]);
  });

  test("getTitlesByCategory — 교육 카테고리 제목 반환", () => {
    expect(getTitlesByCategory(books, "교육")).toEqual(["수학의 정석", "코딩 테스트"]);
  });

  test("getTitlesByCategory — 없는 카테고리는 빈 배열 반환", () => {
    expect(getTitlesByCategory(books, "과학")).toEqual([]);
  });

  test("getTotalPriceAbove — 15000 이상 가격 합계", () => {
    expect(getTotalPriceAbove(books, 15000)).toBe(85000);
  });

  test("getTotalPriceAbove — 0 이상이면 전체 합계", () => {
    expect(getTotalPriceAbove(books, 0)).toBe(97000);
  });

  test("getTotalPriceAbove — 조건에 맞는 책이 없으면 0 반환", () => {
    expect(getTotalPriceAbove(books, 100000)).toBe(0);
  });

  test("isAllSameCategory — 모두 같은 카테고리면 true", () => {
    expect(isAllSameCategory([{ category: "소설" }, { category: "소설" }], "소설")).toBe(true);
  });

  test("isAllSameCategory — 다른 카테고리 포함이면 false", () => {
    expect(isAllSameCategory(books, "소설")).toBe(false);
  });

  test("isAllSameCategory — 빈 배열이면 true (every의 기본 동작)", () => {
    expect(isAllSameCategory([], "소설")).toBe(true);
  });
});

// ─────────────────────────────────────────────
// PART 2
// ─────────────────────────────────────────────
describe("PART 2. 구조 분해 할당", () => {
  test("formatBookLabel — '제목 - 저자' 형식 반환", () => {
    expect(formatBookLabel({ title: "어린왕자", author: "생텍쥐페리", year: 1943 })).toBe(
      "어린왕자 - 생텍쥐페리",
    );
  });

  test("formatBookLabel — 다른 책도 동작 확인", () => {
    expect(formatBookLabel({ title: "1984", author: "조지 오웰", price: 15000 })).toBe(
      "1984 - 조지 오웰",
    );
  });

  test("splitFirstAndRest — first는 첫 번째 책", () => {
    const { first } = splitFirstAndRest(books);
    expect(first).toEqual(books[0]);
  });

  test("splitFirstAndRest — rest는 나머지 책 배열", () => {
    const { rest } = splitFirstAndRest(books);
    expect(rest).toEqual(books.slice(1));
  });

  test("splitFirstAndRest — rest 길이는 books.length - 1", () => {
    const { rest } = splitFirstAndRest(books);
    expect(rest).toHaveLength(books.length - 1);
  });

  test("omitPrice — price 필드 제거된 새 객체 반환", () => {
    const result = omitPrice({ title: "어린왕자", author: "생텍쥐페리", year: 1943, price: 12000 });
    expect(result).toEqual({ title: "어린왕자", author: "생텍쥐페리", year: 1943 });
    expect(result).not.toHaveProperty("price");
  });

  test("omitPrice — 원본 객체를 수정하지 않음", () => {
    const book = { title: "어린왕자", author: "생텍쥐페리", year: 1943, price: 12000 };
    omitPrice(book);
    expect(book).toHaveProperty("price");
  });
});

// ─────────────────────────────────────────────
// PART 3
// ─────────────────────────────────────────────
describe("PART 3. Map과 Set", () => {
  test("groupByCategory — Map 인스턴스 반환", () => {
    expect(groupByCategory(books)).toBeInstanceOf(Map);
  });

  test("groupByCategory — 소설 카테고리 제목 배열", () => {
    expect(groupByCategory(books).get("소설")).toEqual(["어린왕자", "1984", "해리포터"]);
  });

  test("groupByCategory — 교육 카테고리 제목 배열", () => {
    expect(groupByCategory(books).get("교육")).toEqual(["수학의 정석", "코딩 테스트"]);
  });

  test("groupByCategory — 카테고리 수 확인", () => {
    expect(groupByCategory(books).size).toBe(2);
  });

  test("intersection — 교집합 반환", () => {
    const result = intersection([1, 2, 3], [2, 3, 4]);
    expect(result).toHaveLength(2);
    expect(result).toEqual(expect.arrayContaining([2, 3]));
  });

  test("intersection — 공통 원소가 없으면 빈 배열", () => {
    expect(intersection([1, 2], [3, 4])).toEqual([]);
  });

  test("intersection — 중복 입력이 있어도 결과에 중복 없음", () => {
    const result = intersection([1, 1, 2], [1, 2]);
    expect(result).toHaveLength(2);
  });

  test("unique — 중복 제거", () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  });

  test("unique — 이미 고유하면 그대로", () => {
    expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test("unique — 빈 배열 처리", () => {
    expect(unique([])).toEqual([]);
  });
});

// ─────────────────────────────────────────────
// PART 4
// ─────────────────────────────────────────────
describe("PART 4. Object 유틸", () => {
  test("getOutOfStock — 재고 0인 책 반환", () => {
    expect(getOutOfStock({ 어린왕자: 3, 1984: 0, 해리포터: 2 })).toEqual(["1984"]);
  });

  test("getOutOfStock — 모두 재고 있으면 빈 배열", () => {
    expect(getOutOfStock({ 어린왕자: 3, 해리포터: 2 })).toEqual([]);
  });

  test("getOutOfStock — 모두 재고 없으면 전부 반환", () => {
    const result = getOutOfStock({ 어린왕자: 0, 1984: 0 });
    expect(result).toEqual(expect.arrayContaining(["어린왕자", "1984"]));
  });

  test("getTotalStock — 합계 반환", () => {
    expect(getTotalStock({ 어린왕자: 3, 1984: 0, 해리포터: 2 })).toBe(5);
  });

  test("getTotalStock — 모두 0이면 0 반환", () => {
    expect(getTotalStock({ 어린왕자: 0, 1984: 0 })).toBe(0);
  });

  test("removeNullish — null/undefined 키 제거", () => {
    expect(
      removeNullish({ title: "어린왕자", author: null, year: 1943, publisher: undefined }),
    ).toEqual({ title: "어린왕자", year: 1943 });
  });

  test("removeNullish — 빈 값 없으면 그대로", () => {
    expect(removeNullish({ title: "어린왕자", year: 1943 })).toEqual({
      title: "어린왕자",
      year: 1943,
    });
  });

  test("removeNullish — 0이나 false는 제거하지 않음", () => {
    const result = removeNullish({ count: 0, active: false, name: null });
    expect(result).toEqual({ count: 0, active: false });
  });
});

// ─────────────────────────────────────────────
// PART 5
// ─────────────────────────────────────────────
describe("PART 5. 배열 메서드 심화 ★", () => {
  test("getAvgPriceByCategory — 카테고리별 평균 가격", () => {
    expect(getAvgPriceByCategory(books)).toEqual({ 소설: 15000, 교육: 26000 });
  });

  test("getAvgPriceByCategory — 단일 카테고리만 있는 경우", () => {
    const onlyNovels = books.filter(b => b.category === "소설");
    expect(getAvgPriceByCategory(onlyNovels)).toEqual({ 소설: 15000 });
  });

  test("sortBy — price 기준 오름차순", () => {
    const result = sortBy(books, "price");
    expect(result[0].price).toBe(12000);
    expect(result[result.length - 1].price).toBe(32000);
  });

  test("sortBy — year 기준 오름차순", () => {
    const result = sortBy(books, "year");
    expect(result[0].year).toBe(1943);
    expect(result[result.length - 1].year).toBe(2021);
  });

  test("sortBy — 원본 배열을 수정하지 않음", () => {
    const original = books.map(b => ({ ...b }));
    sortBy(books, "price");
    expect(books).toEqual(original);
  });

  test("flattenCategories — 중첩 구조 평탄화 및 category 필드 추가", () => {
    const categories = [
      { category: "소설", books: [{ title: "어린왕자", price: 12000 }] },
      { category: "교육", books: [{ title: "수학의 정석", price: 20000 }] },
    ];
    expect(flattenCategories(categories)).toEqual([
      { title: "어린왕자", price: 12000, category: "소설" },
      { title: "수학의 정석", price: 20000, category: "교육" },
    ]);
  });

  test("flattenCategories — 카테고리별 여러 책", () => {
    const categories = [
      {
        category: "소설",
        books: [
          { title: "어린왕자", price: 12000 },
          { title: "1984", price: 15000 },
        ],
      },
    ];
    const result = flattenCategories(categories);
    expect(result).toHaveLength(2);
    expect(result.every(b => b.category === "소설")).toBe(true);
  });
});

// ─────────────────────────────────────────────
// PART 6
// ─────────────────────────────────────────────
describe("PART 6. 이터러블 & 페이지네이션 ★★", () => {
  test("createBookIterator — next()로 첫 번째 책 반환", () => {
    const iter = createBookIterator(books);
    expect(iter.next()).toEqual({ value: books[0], done: false });
  });

  test("createBookIterator — next()를 연속 호출하면 순서대로 반환", () => {
    const iter = createBookIterator(books);
    expect(iter.next().value).toEqual(books[0]);
    expect(iter.next().value).toEqual(books[1]);
    expect(iter.next().value).toEqual(books[2]);
  });

  test("createBookIterator — 모두 소비하면 done: true", () => {
    const iter = createBookIterator(books);
    for (let i = 0; i < books.length; i++) iter.next();
    expect(iter.next().done).toBe(true);
  });

  test("createBookIterator — for...of 순회 가능", () => {
    const titles = [];
    for (const book of createBookIterator(books)) {
      titles.push(book.title);
    }
    expect(titles).toEqual(books.map(b => b.title));
  });

  test("createBookIterator — 빈 배열이면 첫 next()부터 done: true", () => {
    const iter = createBookIterator([]);
    expect(iter.next().done).toBe(true);
  });

  test("paginate — 1페이지 2개", () => {
    const result = paginate(books, 1, 2);
    expect(result.data).toEqual([books[0], books[1]]);
    expect(result.totalPages).toBe(3);
    expect(result.currentPage).toBe(1);
  });

  test("paginate — 2페이지 2개", () => {
    const result = paginate(books, 2, 2);
    expect(result.data).toEqual([books[2], books[3]]);
    expect(result.currentPage).toBe(2);
  });

  test("paginate — 마지막 페이지 나머지만 반환", () => {
    const result = paginate(books, 3, 2);
    expect(result.data).toEqual([books[4]]);
  });

  test("paginate — page 0이면 에러 throw", () => {
    expect(() => paginate(books, 0, 2)).toThrow("유효하지 않은 페이지 번호입니다.");
  });

  test("paginate — 범위 초과 페이지면 에러 throw", () => {
    expect(() => paginate(books, 99, 2)).toThrow("유효하지 않은 페이지 번호입니다.");
  });
});
