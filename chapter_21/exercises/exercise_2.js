// Exercise 21-2: Comment Field Resets : DONE!!!

/*

  The wholesale redrawing of talks works pretty well because you usually can’t 
  tell the difference between a DOM node and its identical replacement. But 
  there are exceptions. If you start typing something in the comment field for 
  a talk in one browser window and then, in another, add a comment to that talk, 
  the field in the first window will be redrawn, removing both its content and 
  its focus.

  In a heated discussion, where multiple people are adding comments at the same 
  time, this would be annoying. Can you come up with a way to solve it?

  // copied solution.
*/

class Talk {
  constructor(talk, dispatch) {
    this.comments = elt("div");
    this.dom = elt(
      "section", {className: "talk"},
      elt("h2", null, talk.title, " ", elt("button", {
        type: "button",
        onclick: () => dispatch({type: "deleteTalk",
                                 talk: talk.title})
      }, "Delete")),
      elt("div", null, "by ",
          elt("strong", null, talk.presenter)),
      elt("p", null, talk.summary),
      this.comments,
      elt("form", {
        onsubmit(event) {
          event.preventDefault();
          let form = event.target;
          dispatch({type: "newComment",
                    talk: talk.title,
                    message: form.elements.comment.value});
          form.reset();
        }
      }, elt("input", {type: "text", name: "comment"}), " ",
          elt("button", {type: "submit"}, "Add comment")));
    this.syncState(talk);
  }

  syncState(talk) {
    this.talk = talk;
    this.comments.textContent = "";
    for (let comment of talk.comments) {
      this.comments.appendChild(renderComment(comment));
    }
  }
}

class SkillShareApp {
  constructor(state, dispatch) {
    this.dispatch = dispatch;
    this.talkDOM = elt("div", {className: "talks"});
    this.talkMap = Object.create(null);
    this.dom = elt("div", null,
                   renderUserField(state.user, dispatch),
                   this.talkDOM,
                   renderTalkForm(dispatch));
    this.syncState(state);
  }

  syncState(state) {
    if (state.talks == this.talks) return;
    this.talks = state.talks;

    for (let talk of state.talks) {
      let cmp = this.talkMap[talk.title];
      if (cmp && cmp.talk.presenter == talk.presenter &&
          cmp.talk.summary == talk.summary) {
        cmp.syncState(talk);
      } else {
        if (cmp) cmp.dom.remove();
        cmp = new Talk(talk, this.dispatch);
        this.talkMap[talk.title] = cmp;
        this.talkDOM.appendChild(cmp.dom);
      }
    }
    for (let title of Object.keys(this.talkMap)) {
      if (!state.talks.some(talk => talk.title == title)) {
        this.talkMap[title].dom.remove();
        delete this.talkMap[title];
      }
    }
  }
}