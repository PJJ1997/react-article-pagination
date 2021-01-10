import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Post from './components/post/post';
import Pagination from './components/pagination/pagination';
import {Artcle} from './models/article'


const App = ()=> {
  const [post, setPost] = useState<Artcle[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number|string>(1)
  const [perPageNumber, setPerPageNumber] = useState<number>(5)
  const [totalPageNumber, setTotalPageNumber] = useState<number>(0)

  useEffect(()=>{
    const requestPost = async ():Promise<void>=> {
      setLoading(true)
      const res = await axios.get('http://localhost:3001/post', {
        params: {
          currentPage,
          perPageNumber
        }
      })
      setPost(res.data.Content as Artcle[])
      setLoading(false)
      setTotalPageNumber(res.data.TotalPage)
    }

    requestPost()
  },[currentPage])

  const requestPostByPage = (v: number|string)=>{
    if (typeof v === "number") {
        // 边界处理
      if( v === 0 || v > totalPageNumber) return;
      setCurrentPage(v)
    }
  }

  return (
    <div className="container">
      <h1 className="my-posts-title">我的文章</h1>
      <Post article={post} loading={loading} />
      <Pagination currentPage={currentPage} totalPage={totalPageNumber} requestPostByPage={requestPostByPage} />
    </div>
  );
}

export default App;
