import { createContext, useReducer } from "react";

// const DEFAULT_CONTEXT = {
//     postList: [],
//     addPost: () => { },
//     deletePost: () => { },
// };

export const PostList = createContext({
    postList: [],
    addPost: () => { },
    deletePost: () => { },
});

const postListReducer = (currPostList, action) => {
    let newPostList = currPostList;
    if (action.type === "DELETE_POST") {
        newPostList = currPostList.filter((post) => post.id !== action.payload.postId);
    } else if (action.type === "ADD_POST") {
        newPostList = [action.payload, ...currPostList];
    }

    return newPostList;
}

const PostListProvier = ({ children }) => {
    const [postList, dispatchPostList] = useReducer(postListReducer, DEFAULT_POST_LIST);

    const addPost = (userId, postTitle, postBody, reactions, tags) => {
        // console.log(`${userId} ${postTitle} ${postBody} ${reactions} ${tags}`);

        dispatchPostList({
            type: "ADD_POST",
            payload: {
                id: Date.now(),
                title: postTitle,
                body: postBody,
                reactions: reactions,
                userId: userId,
                tags: tags,
            },
        });
    };

    const deletePost = (postId) => {
        // console.log("Delete post called for id: ", postId);
        dispatchPostList({
            type: "DELETE_POST",
            payload: {
                postId,
            },
        });
    };

    return <PostList.Provider
        value={{
            postList,
            addPost,
            deletePost,
        }}
    >
        {children}
    </PostList.Provider>
}

const DEFAULT_POST_LIST = [
    {
        id: "1",
        title: "Going to Mumbai",
        body: "Hi Friends, I am going to Mumbai for my vacation. Hope to enjoy a lot. peace out.",
        reactions: 2,
        userId: 'user-9',
        tags: ["vacation", "Mumbai", "Enjoying"],
    },
    {
        id: "2",
        title: "Pass ho bhai",
        body: "$ saal ki masti k baad bhi ho gaye hain pass. Hard to beleive",
        reactions: 15,
        userId: "user-12",
        tags: ["Graduating", "Unbelivable"],
    },
]

export default PostListProvier;