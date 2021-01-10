import React, { useEffect, useState } from "react";
import axios from "axios";
import { Artcle } from "./models/article";
import { createContainer } from "unstated-next";

const useApp = () => {
  const [post, setPost] = useState<Artcle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number | string>(1);
  const [perPageNumber, setPerPageNumber] = useState<number>(5);
  const [totalPageNumber, setTotalPageNumber] = useState<number>(0);

  useEffect(() => {
    const requestPost = async (): Promise<void> => {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/post", {
        params: {
          currentPage,
          perPageNumber,
        },
      });
      setPost(res.data.Content as Artcle[]);
      setLoading(false);
      setTotalPageNumber(res.data.TotalPage);
    };

    requestPost();
  }, [currentPage]);

  const requestPostByPage = (v: number | string) => {
    if (typeof v === "number") {
      // 边界处理
      if (v === 0 || v > totalPageNumber) return;
      setCurrentPage(v);
    }
  };

  return {
    post,
    setPost,
    loading,
    setLoading,
    currentPage,
    setCurrentPage,
    totalPageNumber,
    setTotalPageNumber,
    requestPostByPage,
  };
};

const AppContainer = createContainer(useApp);
export default AppContainer;
