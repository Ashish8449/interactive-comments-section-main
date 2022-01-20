const chatBox = document.querySelector(".rapper");

const container = document.querySelector(".container");

let usersData;

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

</div>`;

  return chat;
}
/*=============================================================================
                             reply comment                                                  
=============================================================================*/

function commentBox(obj) {
  return `     <div class="chatDiv  "data-value=3>


  <div class="row outsideDiv">
    <div class="col3">
 
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
  if (target.classList.contains("delete")) {
    currentTarget.remove();
  } else if (target.classList.contains("edit")) {
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
}

/*=============================================================================
                              functions for div                                                  
 =============================================================================*/
function divFunc(e) {
  const currentElement = e.currentTarget;
  console.log(currentElement);

  console.log(currentElement);
  const chatDiv = currentElement.querySelector(".chatDiv");
  console.log(chatDiv.dataset.value);
  const target = e.target;

  if (target.classList.contains("reply")) {
    const div = document.createElement("div");
    div.innerHTML = replyDiv();
    const replyBtn = div.querySelector(".replyBtn");
    console.log(replyBtn);
    insertAfter(currentElement, div);

    /*=============================================================================
                                 add comment div                                                  
    =============================================================================*/
    function addComment(msg) {
      const commentDiv = document.createElement("div");
      const obj = {
        content: `${msg}`,
        createdAt: `1 min ago`,
        id: 1,
        replies: [],

        score: 12,
        user: usersData.currentUser,
      };

      const comment = commentBox(obj);
      commentDiv.innerHTML = comment;
      insertAfter(currentElement, commentDiv);
      commentDiv.addEventListener("click", commentFunc);
      div.remove();
    }

    /*=============================================================================
                         input funtions                                                  
=============================================================================*/
    function clickOnSend(e) {
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

    replyBtn.addEventListener("click", clickOnSend);
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
      usersData = data;

      data.comments.forEach((comment) => {
        const div = document.createElement("div");

        div.innerHTML = setData(comment);
        chatBox.appendChild(div);

        // to store replies

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
        if (check) {
          insertAfter(div, replyDivs);
        }

        /*=============================================================================
                                     addevent listner                                                  
        =============================================================================*/
        div.addEventListener("click", divFunc);
      });
    });
}

// console.log(document.querySelectorAll(".reply"));

window.addEventListener("load", getData);
