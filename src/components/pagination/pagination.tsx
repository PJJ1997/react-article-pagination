import React from "react";
import "./pagination.css";

interface paginationProps {
  totalPage: number;
  currentPage: number | string;
  requestPostByPage: (v: number | string) => void;
}

const Pagination: React.FunctionComponent<paginationProps> = (props) => {
  let liArr: (number | string)[] = [];
  let max = 10;
  const { totalPage, currentPage, requestPostByPage } = props;
  let array: (number | string)[] = [];
  for (let i = 0; i < totalPage; i++) {
    array.push(i + 1);
  }

  // 首先判断总页数 当总页数小于10时
  if (array.length <= max) {
    //[...allPageArr.slice(0,max-3),'…', ...allPageArr.slice(-2)]
    liArr = array;
  } else {
    // 当总页数大于10 当前页小于5时
    if (currentPage < 5) {
      liArr = [...array.slice(0, 5), "…", totalPage];
    } else {
      // 当总页数大于10 当前页小于 totalPage-4 时
      if (currentPage <= totalPage - 4) {
        liArr = [
          1,
          "…",
          ...array.slice(
            (currentPage as number) - 2,
            (currentPage as number) + 1
          ),
          "…",
          totalPage,
        ];
      } else {
        // 当总页数大于10 当前页大于 totalPage-5 时
        liArr = [1, "…", ...array.slice(totalPage - 5, totalPage)];
      }
    }
  }

  return (
    <nav>
      <ul className="list-pages">
        <li
          className="list-pages-item"
          onClick={() => {
            requestPostByPage((currentPage as number) - 1);
          }}
        >
          &lt;
        </li>
        {liArr.map((v, index) => {
          return (
            <li
              key={index}
              className={
                v !== "…"
                  ? v === currentPage
                    ? "list-pages-item list-pages-item-active"
                    : "list-pages-item"
                  : ""
              }
              onClick={() => {
                requestPostByPage(v);
              }}
            >
              {v}
            </li>
          );
        })}
        <li
          className="list-pages-item"
          onClick={() => {
            requestPostByPage((currentPage as number) + 1);
          }}
        >
          &gt;
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
