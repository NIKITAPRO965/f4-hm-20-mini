
import {getPosts, addPost, updatePost, deletePost,} from "./api/postsApi";



const postsContainer = document.querySelector("#postsContainer");
const form = document.querySelector("#createPostForm");
const searchInput = document.querySelector("#searchInput");
let currentId = null;



function createPostsMarkup(array) {
    const markup = array.map(({ id, title, content }) => {

        return `
        <div class="post item" id="${id}">
            <h2>${title}</h2>
            <p>${content}</p>
            <button type="button" data-action="update">Редагувати</button>
            <button type="button" data-action="delete">Видалити</button>
        </div>
        `;
    }).join("");

    postsContainer.innerHTML = markup;
}


async function loadPosts() {
    const posts = await getPosts();
    createPostsMarkup(posts);
}
loadPosts();



form.addEventListener("submit", async (event) => {

    event.preventDefault();
    const elements = event.currentTarget.elements;
    const postData = {
        title: elements.title.value,
        content: elements.content.value,
    };

    if (currentId === null) {
        await addPost(postData);
        const posts = await getPosts();
        createPostsMarkup(posts);
        form.reset();
        return;
    }

    await updatePost(currentId, postData);
    const posts = await getPosts();
    createPostsMarkup(posts);
    form.reset();
    currentId = null;
});



postsContainer.addEventListener("click", async (event) => {

    if (event.target.nodeName !== "BUTTON") {
        return;
    }

    const action = event.target.dataset.action;
    const post = event.target.closest(".post");
    const id = post.id;

    switch (action) {
        case "update":
            form.elements.title.value = post.children[0].textContent;
            form.elements.content.value = post.children[1].textContent;
            currentId = id;
            break;
            case "delete":
            await deletePost(id);
            const posts =
            await getPosts();
            createPostsMarkup(posts);
            break;
            default:
            return;
    }
});



searchInput.addEventListener("input", async (event) => {

    const posts = await getPosts();
    const filteredPosts = posts.filter(post =>

        post.title.toLowerCase().includes(event.target.value.toLowerCase()) || post.content.toLowerCase().includes(event.target.value.toLowerCase())
    );

    createPostsMarkup(filteredPosts);
});


// // Отримання списку постів
// async function getPosts() {

// try {

// } catch (error) {

// console.error(error);

// }

// }



// // Створення нового поста
// async function createPost(title, content) {

// try {

// } catch (error) {

// console.error(error);

// }

// }



// // Оновлення поста
// async function updatePost(id, title, content) {

// try {

// } catch (error) {

// console.error(error);

// }

// }




// // Видалення поста
// async function deletePost(id) {

// try {

// } catch (error) {

// console.error(error);

// }

// }





// // Додавання коментаря до поста
// async function createComment(postId, comment) {

// try {

// } catch (error) {

// console.error(error);

// }

// }





// // Оновлення відображення постів на сторінці
// function renderPosts(posts) {

// }

// // Обробник події для створення поста
// document.getElementById('createPostForm').addEventListener('submit', cb);

// // Обробник події для редагування поста
// document.addEventListener('click', cb);

// // Обробник події для видалення поста
// document.addEventListener('click', cb);

// // Обробник події для додавання коментаря
// document.addEventListener('submit', cb);

// // Запуск додатку
// async function startApp() {
// const posts = await getPosts();
// renderPosts(posts);

// }

// startApp();