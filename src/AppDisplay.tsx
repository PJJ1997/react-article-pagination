import "./App.css";
import "./AppContainer";
import Post from "./components/post/post";
import Pagination from "./components/pagination/pagination";
import App from "./App";
import AppContainer from "./AppContainer";

const AppDisplay = () => {
  const {
    post,
    loading,
    currentPage,
    totalPageNumber,
    requestPostByPage,
  } = AppContainer.useContainer();

  return (
    <div className="container">
      <h1 className="my-posts-title">我的文章</h1>
      <Post article={post} loading={loading} />
      <Pagination
        currentPage={currentPage}
        totalPage={totalPageNumber}
        requestPostByPage={requestPostByPage}
      />
    </div>
  );
};

export default AppDisplay;
