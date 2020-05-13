import React from "react";
import { mount } from "enzyme";

import Root from "Root";
import CommentList from "components/CommentList";

let wrapped;

beforeEach(() => {
  const initialState = {
    comments: ["comment 1", "comment 2"],
  };

  wrapped = mount(
    <Root initialState={initialState}>
      <CommentList />
    </Root>
  );
});

it("creates one LI per comment", () => {
  expect(wrapped.find("li").length).toEqual(2);
});
