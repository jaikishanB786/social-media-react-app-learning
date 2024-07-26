import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {

    const { postList, addInitialPosts } = useContext(PostListData);

    // const [dataFetched, setDataFetched] = useState(false);

    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        setFetching(true);

        const controller = new AbortController();
        const signal = controller.signal;

        fetch("https://dummyjson.com/posts", { signal })
            .then((res) => res.json())
            .then((data) => {
                addInitialPosts(data.posts);
                setFetching(false);
            });

        return () => {
            console.log("Cleaning up UseEffect.");
            controller.abort();
        };
    }, []);

    // if (!dataFetched) {
    //     fetch("https://dummyjson.com/posts")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             addInitialPosts(data.posts);
    //         });
    //     setDataFetched(true);
    // }

    // const handleGetPostsClick = () => {
    //     fetch("https://dummyjson.com/posts")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             addInitialPosts(data.posts);
    //         });
    // }

    return (
        <>
            {fetching && <LoadingSpinner />}
            {!fetching && postList.length === 0 && <WelcomeMessage />}
            {!fetching && postList.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </>
    )
}

export default PostList;