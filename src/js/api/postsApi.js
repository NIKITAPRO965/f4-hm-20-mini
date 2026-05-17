const BASE_URL = "http://localhost:3000/posts";


export const getPosts = async () => {

    const res = await fetch(BASE_URL);

    return res.json();
};




export const addPost = async (postData) => {

    const options = {
        method: "POST",

        body: JSON.stringify(postData),

        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    };

    const res = await fetch(BASE_URL, options);

    return res.json();
};

export const updatePost = async (id, updatedData) => {

    const options = {
        method: "PATCH",

        body: JSON.stringify(updatedData),

        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    };

    const res = await fetch(`${BASE_URL}/${id}`, options);

    return res.json();
};

export const deletePost = async (id) => {

    const options = {
        method: "DELETE",
    };

    const res = await fetch(`${BASE_URL}/${id}`, options);

    return res.json();
};
