const chatBox = document.querySelector(".rapper");

const container = document.querySelector(".container");
const sendBtn = document.querySelector(".sendBtn");

const sendReply = document.querySelector(".sendReply");

let usersData = JSON.parse(localStorage.getItem("users"));
let numberofdiv = 0;
/*=============================================================================
                             update Ls                                                  
=============================================================================*/

function updateLs() {
  localStorage.setItem("users", JSON.stringify(usersData));
}

function setData(obj) {
  const chat = ` <div class="chatDiv " data-value=${obj.id}>
<div class="row outsideDiv">
    <div class="col3">
      <!-- plus icons  -->
      <div class="additem">
        <div class="add">
          <img src="./images/icon-plus.svg"   class="add"alt="" srcset="">
        </div>
        <div class="number">
          ${obj.score}
        </div>
        <div class="minus">
          <img src="./images/icon-minus.svg"  class="minus" alt="" srcset="">
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
          <img src="./images/icon-reply.svg" class="reply" alt="">
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
  <div class="last-itmes row">
  <div class="col3">
 
    <div class="additem">
      <div class="add">
        <img src="./images/icon-plus.svg" alt="" srcset="" />
      </div>
      <div class="number2">${obj.score}</div>
      <div class="minus">
        <img src="./images/icon-minus.svg" alt="" srcset="" />
      </div>
    </div>
  </div>
  <div class="col7">
    <div class="col2 row reply">
      <img src="./images/icon-reply.svg" alt="" />
      <div class="reply">Reply</div>
    </div>
  </div>
</div>

</div>`;

  return chat;
}
/*=============================================================================
                             reply comment                                                  
=============================================================================*/

function commentBox(obj) {
  return `     <div class="chatDiv  "data-value= >


  <div class="row outsideDiv">
    <div class="col3">
 
      <div class="additem">
        <div class="add">
          <img src="./images/icon-plus.svg"  class="add" alt="" srcset="">
        </div>
        <div class="number">
        ${obj.score}
        </div>
        <div class="minus">
          <img src="./images/icon-minus.svg" class="minus" alt="" srcset="">
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
          <div class="You">
           You
          </div>
          <div class="time">
          ${obj.createdAt}
          </div>

        </div>
        <div class="col2 row">
          <div class="row delete">

            <img src="./images/icon-delete.svg"  class="delete" alt="">
            <div class="delete">
              Delete
            </div>
          </div>
          <div class="row edit">

            <img src="./images/icon-edit.svg" class="edit" alt="">
            <div class="edit">
              Edit
            </div>
          </div>

        </div>

      </div>

      <p class="comment" contentEditable="false" >
       ${obj.content}

      </p>

    </div>
    
  </div>
  <div class="last-itmes row">
  <div class="col3">
  
    <div class="additem">
      <div class="add">
        <img src="./images/icon-plus.svg" alt="" srcset="" />
      </div>
      <div class="number2">${obj.score}</div>
      <div class="minus">
        <img src="./images/icon-minus.svg" alt="" srcset="" />
      </div>
    </div>
  </div>
  <div class="col7">
    <div class="col2 row">
      <div class="row delete">
        <img src="./images/icon-delete.svg" alt="" />
        <div class="delete">Delete</div>
      </div>
      <div class="row edit">
        <img src="./images/icon-edit.svg" alt="" />
        <div class="edit">Edit</div>
      </div>
    </div>
  </div>
</div>

</div>`;
}
/*=============================================================================
                             reply                                                  
=============================================================================*/

function replyDiv() {
  return ` <div class="row commentReply">
  <div class="col3 yourImg">
    <img src="./images/avatars/image-juliusomo.png" alt="" srcset="" />
  </div>
  <div class="col8 textArea" contenteditable="true"></div>

  <div class="col3">
    <button class="replyBtn" id="">Reply</button>
  </div>
</div>`;
}
/*=============================================================================
                             updateBtn                                                  
=============================================================================*/
function updateBtn() {
  return `  
  <div class="row flex-end">
    <button class="updateBtn">Update</button>
  </div>
`;
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// function updateBtnFunc
/*=============================================================================
                             comment func                                                  
=============================================================================*/

function commentFunc(e) {
  const target = e.target;
  const currentTarget = e.currentTarget;
  const number = currentTarget.querySelector(".number");
  const chatDiv = currentTarget.querySelector(".chatDiv");
  const boxNum = chatDiv.dataset.value;
  console.log(chatDiv);

  console.log(boxNum);
  if (target.classList.contains("delete")) {
    currentTarget.remove();
  }
  if (target.classList.contains("edit")) {
    const content = currentTarget.querySelector("p");

    if (content.contentEditable == "true") {
      {
        content.contentEditable = "false";
        const updateBtn = currentTarget.querySelector(".update");
        updateBtn.remove();

        content.classList.toggle("editP");
      }
    } else {
      content.contentEditable = "true";
      console.log(currentTarget);
      const updateDiv = document.createElement("div");
      updateDiv.classList.add("update");
      updateDiv.innerHTML = updateBtn();
      currentTarget.querySelector(".chatDiv").appendChild(updateDiv);
      content.classList.toggle("editP");
      const updatebtn = updateDiv.querySelector(".updateBtn");
      updatebtn.addEventListener("click", () => {
        content.contentEditable = "false";
        const updateBtn = currentTarget.querySelector(".update");
        updateBtn.remove();

        content.classList.toggle("editP");
      });
    }
  }
  if (target.classList.contains("add")) {
    number.innerText++;
  }
  if (target.classList.contains("minus")) {
    if (number.innerHTML > 0) number.innerHTML--;
  }
}

/*=============================================================================
                              functions for div                                                  
 =============================================================================*/

function divFunc(e) {
  const currentElement = e.currentTarget;

  console.log(currentElement);
  const chatDiv = currentElement.querySelector(".chatDiv");
  const nextSibling = currentElement.nextSibling;
  const boxNum = chatDiv.dataset.value;
  const target = e.target;
  const number = currentElement.querySelector(".number");
  const number2 = currentElement.querySelector(".number2");
  const obj = {
    content: ``,
    createdAt: `1 min ago`,
    id: numberofdiv,
    replies: [],

    score: 0,
    user: usersData.currentUser,
  };

  /*=============================================================================
                             click on reply                                                  
=============================================================================*/

  if (
    target.classList.contains("reply") &&
    !nextSibling.querySelector(".commentReply")
  ) {
    const div = document.createElement("div");
    div.innerHTML = replyDiv();
    const replyBtn = div.querySelector(".replyBtn");

    insertAfter(currentElement, div);

    /*=============================================================================
                                 add comment div                                                  
    =============================================================================*/
    function addComment(msg) {
      obj.content = msg;
      obj.id = ++numberofdiv;
      const commentDiv = document.createElement("div");

      console.log(e.target);
      console.log(currentElement);
      console.log(boxNum);

      /*=============================================================================
                                   add data to ls                                                  
      =============================================================================*/
      function updateObjInLs(obj, boxNum) {
        usersData.comments.forEach((item) => {
          if (item.id == boxNum) {
            item.replies.push(obj);
          }
        });
        updateLs();
      }

      /*=============================================================================
                                   added succesfully                                                  
      =============================================================================*/

      const comment = commentBox(obj);

      commentDiv.innerHTML = comment;
      commentDiv.addEventListener("click", commentFunc);
      console.log(currentElement.nextSibling.nextSibling);

      currentElement.nextSibling.nextSibling.appendChild(commentDiv);
      div.remove();
    }

    /*=============================================================================
                         input funtions                                                  
=============================================================================*/
    function clickOnReply(e) {
      const input = div.querySelector(".textArea");
      console.log(input);
      const msg = input.innerHTML;
      console.log(msg);
      if (msg) {
        addComment(msg);
      }
    }
    /*=============================================================================
                             events                                                  
=============================================================================*/

    replyBtn.addEventListener("click", clickOnReply);
  }

  if (target.classList.contains("add")) {
    number.innerText = ++number.innerText;
    number2.innerText = ++number2.innerText;
    obj.score = number.innerText - 1;

    updateObjInLs(obj, boxNum);
  }

  if (target.classList.contains("minus")) {
    if (number.innerText > 0) {
      number.innerText = --number.innerText;
      number2.innerText = --number2.innerText;

      obj.score = number.innerText - 1;
      updateObjInLs(obj, boxNum);
    }
    /*=============================================================================
                                 add event lisner on click on add                                                   
    =============================================================================*/
  }
}

/*=============================================================================
                             code start from here                                                  
=============================================================================*/

function getData() {
  fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(usersData);
      if (!usersData) {
        usersData = data;
        console.log("set user data to data");
      }
      usersData.comments.forEach((comment) => {
        const div = document.createElement("div");

        div.innerHTML = setData(comment);

        chatBox.appendChild(div);

        // to store replies
        if (comment.user.username === "juliusomo") {
          div.innerHTML = commentBox(comment);
        }
        const replyDivs = document.createElement("div");
        replyDivs.classList.add("replyDivs");
        let check = 0;
        comment.replies.forEach((reply) => {
          check = 1;
          const replyDiv = document.createElement("div");

          if (reply.user.username == "juliusomo") {
            replyDiv.innerHTML = commentBox(reply);
            /*=============================================================================
                                         event on click  commentBox                                                  
            =============================================================================*/
            replyDiv.addEventListener("click", commentFunc);
          } else {
            replyDiv.innerHTML = setData(reply);

            /*=============================================================================
                                         add event in reply div                                                  
            =============================================================================*/
            replyDiv.addEventListener("click", divFunc);
          }

          replyDivs.appendChild(replyDiv);
        });

        insertAfter(div, replyDivs);
        console.log(div);

        const additem = div.querySelector(".additem");
        console.log(additem);

        /*=============================================================================
                                     addevent listner                                                  
        =============================================================================*/
        if (comment.user.username === "juliusomo") {
          div.addEventListener("click", commentFunc);
        } else div.addEventListener("click", divFunc);
      });
    });
}
/*=============================================================================
                             click on send                                                  
=============================================================================*/
function clickOnSend(e) {
  if (e.target != sendBtn) return;
  const div = e.currentTarget;
  const input = div.querySelector(".textArea");
  console.log(input);
  const msg = input.innerHTML;
  input.innerHTML = "";
  console.log(msg);
  if (msg) {
    const commentDiv = document.createElement("div");

    console.log(e.target);

    const obj = {
      content: `${msg}`,
      createdAt: `1 min ago`,
      id: usersData.comments.length,
      replies: [],

      score: 12,
      user: usersData.currentUser,
    };
    /*=============================================================================
                                   add data to ls                                                  
      =============================================================================*/

    usersData.comments.push(obj);
    updateLs();

    /*=============================================================================
                                   added succesfully                                                  
      =============================================================================*/

    const comment = commentBox(obj);

    commentDiv.innerHTML = comment;
    commentDiv.addEventListener("click", commentFunc);
    chatBox.appendChild(commentDiv);
  }
}

/*=============================================================================
                             main event listners                                                  
=============================================================================*/

window.addEventListener("load", getData);
sendReply.addEventListener("click", clickOnSend);
