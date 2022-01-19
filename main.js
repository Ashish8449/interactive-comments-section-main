const chatBox = document.querySelector(".rapper");
let usersData;

console.log(chatBox);

function setData(obj) {
  const chat = ` <div class="chatDiv " data-value=${obj.id}>


  <div class="row outsideDiv">
    <div class="col3">
      <!-- plus icons  -->
      <div class="additem">
        <div class="add">
          <img src="./images/icon-plus.svg" alt="" srcset="">
        </div>
        <div class="number">
          ${obj.score}
        </div>
        <div class="minus">
          <img src="./images/icon-minus.svg" alt="" srcset="">
        </div>


      </div>

    </div>
    <div class="col7">

      <div class="row headDiv">
        <div class="col8 row">
          <div>

            <img src="${obj.user.image.png}" alt="">
          </div>
          <div class="userName">
           ${obj.user.username}
          </div>
          <div class="time">
          ${obj.createdAt}
          </div>

        </div>
        <div class="col2 row reply">
          <img src="./images/icon-reply.svg" alt="">
          <div class="reply">
            Reply
          </div>

        </div>

      </div>

      <p class="comment">
       ${obj.content}

      </p>

    </div>
  </div>

</div>`;

  return chat;
}
function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function getData() {
  fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      usersData = data;
      console.log(data.comments);
      chatBox.innerHTML = data.comments.forEach((comment) => {
        const div = document.createElement("div");
        div.innerHTML = setData(comment);
        console.log(div);
        chatBox.appendChild(div);
      });

      // console.log(usersData);
    });
}

console.log(document.querySelectorAll(".reply"));

window.addEventListener("load", getData);
